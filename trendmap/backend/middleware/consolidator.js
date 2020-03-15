/* jshint node: true */
"use strict";

exports.newsapiGetHeadlines = function(req, res, next){
    let newsapiResult = res.locals.newsapiresult;
    return res.json(newsapiResult.articles.map((item) => {
        return {
            "source" : item.source.name,
<<<<<<< HEAD
            "title" : item.title,
=======
            "title" : (item.title.lastIndexOf('-') > 0) ? item.title.slice(0, item.title.lastIndexOf('-')).trim() : item.title,
>>>>>>> a3178e71f393b141a6ccdf7bc0dffe98b388130c
            "description" : item.description,
            "url": item.url,
            "urlToImage": item.urlToImage,
            "publishedAt": item.publishedAt
        };
    }));
};

