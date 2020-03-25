/* jshint node: true */
"use strict";

const NEWSAPI = require('newsapi');
const file = require('../../utilities/file');

// get saved api key
// create api connection
let newsapi = {};
file.readFile('./apihandler/newsapihandler/secret/api.key')
    .then(function(value){
        newsapi.api = new NEWSAPI(value);
    }, function(err){
        console.error("API key for NewsAPI is not present. Empty key defaulted.");
        console.error(err);
});

// get supported countries object
file.readFile(`./apihandler/newsapihandler/files/newsapi-support-list.json`)
    .then(function(value){
        newsapi.support = JSON.parse(value);
    }, function(err){
        console.log("API support json not loaded in. set to undefined");
        console.error(err);
});

// getHeadlines first endpoint
exports.getHeadlines = function(alpha2){
    // query api to return top stories of a given country
    return newsapi.api.v2.topHeadlines({
        country: alpha2
    }).then(function(result){
        return JSON.stringify(result.articles.map((item) => {
            return {
                "source" : item.source.name,
                "title" : (item.title.lastIndexOf('-') > 0) ? item.title.slice(0, item.title.lastIndexOf('-')).trim() : item.title,
                "description" : item.description,
                "url": item.url,
                "urlToImage": item.urlToImage,
                "publishedAt": item.publishedAt
            };
        }));
    }, function(err){
        console.error(err);
        return null;
    });
};