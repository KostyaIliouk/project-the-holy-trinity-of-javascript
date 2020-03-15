/* jshint node:true */
"use strict";

const check = require('express-validator');
const file = require('../utilities/file');

// suported countries list for newsapi
let newsapiSupportDict;
<<<<<<< HEAD
file.readFile("./newsapihandler/files/newsapi-support-files.json")
=======
file.readFile("./newsapihandler/files/newsapi-support-list.json")
>>>>>>> a3178e71f393b141a6ccdf7bc0dffe98b388130c
    .then((value) => {
        newsapiSupportDict = JSON.parse(value);
    }, (err) => {
        console.error("There is an issue with the newsAPI supporting countries file.\n File was not able to be read");
        console.error(err);
        newsapiSupportDict = [];
});

<<<<<<< HEAD
=======
let subredditSupport;
file.readFile("./reddithandler/files/subreddit-support-list.json")
    .then((value) => {
        subredditSupport = JSON.parse(value);
    }, (err) => {
        console.error("Could not load supported countries for subreddits.");
        console.err(err);
        subredditSupport = [];
});

>>>>>>> a3178e71f393b141a6ccdf7bc0dffe98b388130c
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

// validate /newsapi/getHeadlines GET call
exports.newsapiGetHeadlines = [
    // check that code is a country name
    check.query("country").exists().withMessage("must have country query param"),
<<<<<<< HEAD
    check.query("country").custom((country) =>{
        const pat = /^([A-Z' ]+)$/i;
        return pat.test(country);
    }).withMessage("country query value must be alpha with spaces and/or apostrophes"),
    // check that code is of the supported countries
    check.query("country").custom((country) =>{
        return (country in newsapiSupportDict);
=======
    check.query("country").isAlpha().withMessage("country query value must be alpha"),
    check.query("country").isLength({min:2, max:2}).withMessage("country query value must be of length 2"),
    // check that code is of the supported countries
    check.query("country").custom((country) =>{
        return (newsapiSupportDict.alpha2.includes(country));
>>>>>>> a3178e71f393b141a6ccdf7bc0dffe98b388130c
    }).withMessage("country query value is either not a country or not yet supported"),
    checkValidationResult
];

<<<<<<< HEAD
=======
exports.validateCountry = [// check that code is a country name
    check.query("country").exists().withMessage("must have country query param"),
    check.query("country").isAlpha().withMessage("country query value must be alpha"),
    check.query("country").isLength({min:2, max:2}).withMessage("country query value must be of length 2"),
    // check that code is of the supported countries
    check.query("country").custom((country) =>{
        return (subredditSupport.alpha2.includes(country));
    }).withMessage("country query value is either not a country or not yet supported."),
    checkValidationResult
];

>>>>>>> a3178e71f393b141a6ccdf7bc0dffe98b388130c
