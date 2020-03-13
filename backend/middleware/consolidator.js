/* jshint node: true */
"use strict";

exports.newsapiGetHeadlines = function(req, res, next){
    let newsapiResult = res.locals.newsapiresult;
    console.log(newsapiResult);
    return res.json(newsapiResult);
};

