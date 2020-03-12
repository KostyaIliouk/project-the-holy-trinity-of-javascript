const express = require('express');
const bodyParser = require('body-parser');

const app = express();

app.use(bodyParser.json());

app.use(function(req, res, next){
    console.log("HTTP request", req.method, req.url, req.body);
    next();
});

const http = require('http');

http.createServer(app).listen(3000, function(err){
    if (err) console.log(err);
    else console.log(`HTTP server on http://localhost:3000`);
});

