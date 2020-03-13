/* jshint node:true */
"use strict";

const check = require('express-validator');
const file = require('../utilities/file');

// suported countries list
let newsapiSupportDict = '2';
file.readFile("./middleware/files/newsapi-support-files.json")
    .then((value) => {
        newsapiSupportDict = JSON.parse(value);
    }, (err) => {
        console.error("There is an issue with the newsAPI supporting countries file.\n File was not able to be read");
        console.error(err);
});
exports.newsapiSupportDict = newsapiSupportDict;

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
    // check that code is alpha-2
    check.query("country").exists().withMessage("must have country query param"),
    check.query("country").isAlpha().withMessage("country query value must be alpha"),
    check.query("country").isLength({min:2, max:2}).withMessage("country query value must follow alpha-2 standard"),
    // check that code is of the supported countries
    check.query('country').isIn(Object.keys(newsapiSupportDict)).withMessage("country query value is either not valid or not yet supported"),
    checkValidationResult
];

