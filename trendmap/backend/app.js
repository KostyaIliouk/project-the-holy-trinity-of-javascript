const express = require('express');
const bodyParser = require('body-parser');
const redis = require('./redishandler/redis');

const app = express();

const http = require('http').createServer(app);
const io = require('socket.io')(http);
const socketio = require('./socketio/socketio')(io);

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

// just to log requests comming in to console - should remove this later or
// switch to an actual logger
app.use(function(req, res, next){
    console.log('HTTP request', req.method, req.url, req.body);
    next();
});

redis.setupWorkers();

// setup http connection
// TODO: switch to https once hosting figured out
const PORT = 5000;
http.listen(PORT, function(err){
    if (err) console.log(err);
    else console.log(`HTTP server on http://localhost:${PORT}`);
});
