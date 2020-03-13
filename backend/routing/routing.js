/* jshint node: true */
"use strict";

const router = require("express").Router();
const newsapirouting = require("../newsapihandler/routing");

// split the routing between different api sections
router.use('/newsapi', newsapirouting);

module.exports = router;