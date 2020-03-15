/* jshint node: true */
"use strict";

const router = require("express").Router();
const reddit = require("./reddit");

// get headlines of given country
router.get('/global', reddit.getGlobal);
router.get('/national', reddit.getNational);

module.exports = router;