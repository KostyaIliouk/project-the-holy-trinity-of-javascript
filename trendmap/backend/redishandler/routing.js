/* jshint node: true */
"use strict";

const router = require('express').Router();
const redis = require('./redis');
const validator = require('../middleware/validator');

// fetch data from redis
router.get('/fetch', validator.validateFetch, redis.fetch);
router.get('/global', redis.global);

module.exports = router;