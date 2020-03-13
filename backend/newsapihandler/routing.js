/* jshint node: true */
"use strict";

const router = require("express").Router();
const newsapi = require("./newsapi");
const validator = require("../middleware/validator");
const consolidator = require("../middleware/consolidator");

router.get('/getHeadlines', validator.newsapiGetHeadlines, newsapi.getHeadlines, consolidator.newsapiGetHeadlines);

module.exports = router;