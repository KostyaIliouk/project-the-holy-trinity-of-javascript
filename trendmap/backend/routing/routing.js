/* jshint node: true */
"use strict";

const router = require("express").Router();
const newsapirouting = require("../newsapihandler/routing");
<<<<<<< HEAD
=======
const redditrouting = require("../reddithandler/routing");
>>>>>>> a3178e71f393b141a6ccdf7bc0dffe98b388130c

// split the routing between different api sections

// newsapi routing
router.use('/newsapi', newsapirouting);
<<<<<<< HEAD
=======
router.use('/reddit', redditrouting);
>>>>>>> a3178e71f393b141a6ccdf7bc0dffe98b388130c

module.exports = router;