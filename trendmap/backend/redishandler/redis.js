/* jshint node: true */
"use strict";

const redis = require("redis");
const Bull = require('bull');
const file = require('../utilities/file');
const reddit = require('../apihandler/reddithandler/reddit');
const newsapi = require('../apihandler/newsapihandler/newsapi');


/********************
 * Handles /api/fetch call.
 * Since incoming calls are multithreaded, we would want each thread to have an independent
 * connection to redis to handle more than one call coming in at the same time so as to not
 * have to share that connection
 * 
 * Redis *should* have been populated by data at any moment of an incoming call.
 * If at any moment there is no data for a given country, then something went wrong and an
 * error should be returned.
 * Incoming calls should not be able to have write access to Redis - only read access.
 * 
 * // TODO: dont forget to add connection string when deploying
 * // TODO: setup retry connection to createClient()
 * // TODO: figure out global call
 ********************/
exports.fetch = function(req, res, next){
    // create connection to redis
    const client = redis.createClient(); 
    client.on('connect', () =>{
        // set up a multi command
        client.multi()
            // get reddit
            .hget('reddit', req.query.country.toUpperCase())
            // get newsapi
            .hget('newsapi', req.query.country.toLowerCase())
            // execute multicommand
            .exec((err, reply) => {
                // add exit client to exec queue
                client.quit();
                if(err) {
                    console.error(`error with incoming call to redis: ${err}`);
                    return res.status(500).end("redis error, please try again");
                }
                return res.json([
                    {source: 'reddit',
                    data: reply[0]},
                    {source: 'newsapi',
                    data: reply[1]}
                ]);
            });
    });
    client.on('errer', (err) => {
        console.error(`error with incoming call to redis:\n${err}`);
        return res.status(500).end("redis error, please try again");
    });
};

/**********************
 * Sets up the recurring jobs, workers, and listeners for repopulating redis with our api data.
 * All of the jobs must have been completed at least once prior to initial start of the server.
 * This is to ensure that we have a proper set up redis before running the backend server live.
 * 
 **********************/
exports.setupWorkers = () =>{
    // create two seperate job queues, one for reddit & one for newsapi
    let redditQueue = new Bull('reddit-queue');
    let newsapiQueue = new Bull('newsapi-queue');

    // create the consumers for each queue, these will populate our redis instance
    consumers(redditQueue, newsapiQueue);

    // create completed listener
    listeners(redditQueue, newsapiQueue);
    
    // create all the jobs for our queus
    producers(redditQueue, newsapiQueue);

    return;
};

let consumers = (redditQueue, newsapiQueue) => {

    // define a reddit consumer/worker  
    redditQueue.process((job, done) => {
        // get data & figure out key
        let data = (job.data.country)? reddit.getNational(job.data.country.toUpperCase()) : reddit.getGlobal(); 
        let key = (job.data.country)? job.data.country.toUpperCase() : 'GLOBAL';
        data
         .then(value =>{
            let client = redis.createClient();
            client.on('connect', () => {
                client.hmset('reddit', key, value, err=>{
                    if(err) console.error(`r~ hmset error:\n${err}`);
                });
                client.quit();
            });
            client.on('error', err=>console.error(`r~ random error: ${err}`));
            done(`reddit~ ${job.data.country} done`);
         })
         .catch(err => {
            console.error(`r~ data is not availble: ${err}`);
            done();
         });
    });

    // define a newsapi consumer/worker
    newsapiQueue.process((job, done) =>{
        let data = newsapi.getHeadlines(job.data.country);
        let key = job.data.country;
        data
         .then(value => {
            let client = redis.createClient();
            client.on('connect', () => {
                client.hmset('newsapi', key, value, err=>{
                    if(err) console.error(`r~ hmset error:\n${err}`);
                });
                client.quit();
            });
            client.on('error', err=>console.error(`n~ random error: ${err}`));
            done(`newsapi~ ${job.data.country} done`);
         })
         .catch(err => {
            console.error(`n~ data is not availble: ${err}`);
            done();
         });
    });
};

let listeners = (redditQueue, newsapiQueue) =>{

    redditQueue.on('global:completed', jobId => {
        console.log(`${jobId} completed`);
    });

    newsapiQueue.on('global:completed', jobId => {
        console.log(`${jobId} completed`);
    });

    return;
};

let producers = async (redditQueue, newsapiQueue) => {
    // promises to read all these files
    let filePromises = [
        file.readFile(`./apihandler/newsapihandler/files/newsapi-support-list.json`),
        file.readFile(`./apihandler/reddithandler/files/subreddit-support-list.json`)
    ];

    await Promise.all(filePromises).then( async values => {
        let api = {};
        api.newsapi = JSON.parse(values[0]);
        api.reddit = JSON.parse(values[1]);

        // add all jobs for newsapi
        let repeat = {repeat:{cron: '*/1 * * * *'}};      // repeat every 1 minutes
        api.newsapi.alpha2.forEach(async code => {
            await newsapiQueue.add({country: code});    // recommended to use this await1
        });
        
        // add all the jobs for reddit
        api.reddit.alpha2.forEach(async code => {
            await redditQueue.add({country: code});     // recomment to user await here
        });
        // dont forget about global
        await redditQueue.add({}, repeat);
        
        return;
    }).catch(error => {
        console.error(`An error has occured reading support lists.`);
        console.error(error);
        return;
    });
    return;

};  