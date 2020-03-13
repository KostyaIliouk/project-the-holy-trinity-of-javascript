/* jshint node:true */
"use strict";

const check = require('express-validator');
const file = require('../utilities/file');

// suported countries list
let newsapiSupportDict;
file.readFile("./newsapihandler/files/newsapi-support-files.json")
    .then((value) => {
        newsapiSupportDict = JSON.parse(value);
    }, (err) => {
        console.error("There is an issue with the newsAPI supporting countries file.\n File was not able to be read");
        console.error(err);
        newsapiSupportDict = [];
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

exports.newsapiGetHeadlines = [
    // check that code is a country name
    check.query("country").exists().withMessage("must have country query param"),
    check.query("country").custom((country) =>{
        const pat = /^([A-Z' ]+)$/i;
        return pat.test(country);
    }).withMessage("country query value must be alpha with spaces and/or apstrophes"),
    // check that code is of the supported countries
    check.query("country").custom((country) =>{
        return (country in newsapiSupportDict);
    }).withMessage("country query value is either not valid or not yet supported"),
    checkValidationResult
];

