/* jshint node: true */
"use strict";

const router = require("express").Router();
const newsapirouting = require("../newsapihandler/routing");
const redditrouting = require("../redditapi/routing");

// split the routing between different api sections

// newsapi routing
router.use('/newsapi', newsapirouting);
router.use('/reddit', redditrouting);

module.exports = router;