const express = require('express');
const bodyParser = require('body-parser');
const routing = require('./routing/routing');
const redis = require('./redishandler/redis');

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

// just to log requests comming in to console - should remove this later or
// switch to an actual logger
app.use(function(req, res, next){
    console.log("HTTP request", req.method, req.url, req.body);
    next();
});

redis.setupWorkers();

// handle all possible routing
app.use('/', routing);

// setup http connection
// TODO: switch to https once hosting figured out
const http = require('http');
const PORT = 5000;
http.createServer(app).listen(PORT, function(err){
    if (err) console.log(err);
    else console.log(`HTTP server on http://localhost:${PORT}`);
});
