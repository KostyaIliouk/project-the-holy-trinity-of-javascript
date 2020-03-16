/* jshint node: true */
"use strict";

const router = require("express").Router();
const newsapi = require("./newsapi");
const validator = require("../middleware/validator");
const consolidator = require("../middleware/consolidator");

// get headlines of given country
router.get('/getHeadlines', validator.validateCountry, newsapi.getHeadlines, consolidator.newsapiGetHeadlines);

module.exports = router;