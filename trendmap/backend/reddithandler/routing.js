/* jshint node: true */
"use strict";

const router = require("express").Router();
const validator = require("../middleware/validator");
const reddit = require("./reddit");

// get headlines of given country
router.get('/global', reddit.getGlobal);
router.get('/national', validator.validateCountry, reddit.getNational);
router.get('/dev', reddit.all);

module.exports = router;