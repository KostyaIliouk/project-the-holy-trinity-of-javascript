/* jshint node: true */
"use strict";

const router = require("express").Router();
const redisrouting = require("../redishandler/routing");

// all incoming calls go through redis
router.use('/api', redisrouting)

module.exports = router;