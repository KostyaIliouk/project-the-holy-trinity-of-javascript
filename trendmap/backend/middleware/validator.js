/* jshint node:true */
"use strict";

const file = require('../utilities/file');

// suported countries list for newsapi
let newsapiSupportDict;
file.readFile("./apihandler/newsapihandler/files/newsapi-support-list.json")
    .then((value) => {
        newsapiSupportDict = JSON.parse(value);
    }, (err) => {
        console.error("There is an issue with the newsAPI supporting countries file.\n File was not able to be read");
        console.error(err);
        newsapiSupportDict = [];
});

let subredditSupport;
file.readFile("./apihandler/reddithandler/files/subreddit-support-list.json")
    .then((value) => {
        subredditSupport = JSON.parse(value);
    }, (err) => {
        console.error("Could not load supported countries for subreddits.");
        console.err(err);
        subredditSupport = [];
});

exports.validate = function(countryCode) {
    var errors = [];
    if (!countryCode) {
        errors.push("country code is empty");
    }
    if (!(/^[a-zA-Z()]+$/.test(countryCode))) {
        errors.push("country code value must be alpha");
    }
    if (countryCode.length !== 2) {
        errors.push("country code value must be of length 2");
    }
    if (!subredditSupport.alpha2.includes(countryCode.toUpperCase()) && !newsapiSupportDict.alpha2.includes(countryCode.toLowerCase())) {
        errors.push("country code value is either not a country or not yet supported.\n Please try again");
    }
    if (!errors.length) {
        return [true, null, null];
    } else {
        const errMsg = errors.map((err)=>{return err.msg;}).join('; ');
        console.error(errMsg);
        return [false, 400, errMsg];
    }
}