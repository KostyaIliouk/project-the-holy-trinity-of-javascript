/* jshint node: true */
"use strict";

const router = require("express").Router();
const snoowrapapi = require("./reddit");

// get headlines of given country
router.get('/hot', snoowrapapi.hot);

module.exports = router;