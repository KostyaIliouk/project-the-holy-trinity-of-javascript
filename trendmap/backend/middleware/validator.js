/* jshint node:true */
"use strict";

const check = require('express-validator');
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

// validation function
function checkValidationResult(req, res, next) {
    const errors = check.validationResult(req);
    if(errors.isEmpty()){
        return next();
    } else {
        const errMsg = errors.array({onlyFirstError:true}).map((err)=>{return err.msg;}).join('; ');
        return res.status(400).end(errMsg);
    }
}

exports.validateFetch = [
    // check that code is a country name
    check.query("country").exists().withMessage("must have country query param"),
    check.query("country").isAlpha().withMessage("country query value must be alpha"),
    check.query("country").isLength({min:2, max:2}).withMessage("country query value must be of length 2"),
    // check that the code is supported by at least one of our existing apis
    check.query("country").custom((country) =>{
        return (subredditSupport.alpha2.includes(country.toUpperCase()) ||
            newsapiSupportDict.alpha2.includes(country.toLowerCase()));
    }).withMessage("country query value is either not a country or not yet supported.\n Please try again"),
    checkValidationResult
];
