/* jshint node: true */
"use strict";

const NEWSAPI = require('newsapi');
const file = require('../utilities/file');

// get saved api key
// create api connection
let newsapi = {};
file.readFile('./newsapihandler/secret/api.key')
    .then(function(value){
        newsapi.api = new NEWSAPI(value);
    }, function(err){
        console.error("API key for NewsAPI is not present. Empty key defaulted.");
        console.error(err);
});

file.readFile(`./middleware/files/newsapi-support-files.json`)
    .then(function(value){
        newsapi.support = JSON.parse(value);
    }, function(err){
        console.log("API support json not loaded in. set to undefined");
        console.error(err);
});

// getHeadlines first endpoint
exports.getHeadlines = function(req, res, next){
    // query api to return top stories of a given country
    newsapi.api.v2.topHeadlines({
        country: newsapi.support[req.query.country]
    }).then(function(result){
        return res.json(result);
    }, function(err){
        console.error(err);
        return res.status(500).end("internal server error");
    });
};