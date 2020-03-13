/* jshint node: true */
"use strict";

exports.newsapiGetHeadlines = function(req, res, next){
    let newsapiResult = res.locals.newsapiresult;
    return res.json(newsapiResult.articles.map((item) => {
        return {
            "source" : item.source.name,
            "title" : item.title,
            "description" : item.description,
            "url": item.url,
            "urlToImage": item.urlToImage,
            "publishedAt": item.publishedAt
        };
    }));
};

