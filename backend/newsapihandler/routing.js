/* jshint node: true */
"use strict";

const router = require("express").Router();
const newsapi = require("./newsapi");
const validator = require("../middleware/validator");

router.get('/getHeadlines', validator.newsapiGetHeadlines, newsapi.getHeadlines);

module.exports = router;