const express = require('express');
const bodyParser = require('body-parser');

const app = express();

app.use(bodyParser.json());

app.use(function(req, res, next){
    console.log("HTTP request", req.method, req.url, req.body);
    next();
});

// setup http connection
// TODO: switch to https once hosting figured out
const http = require('http');
const PORT = 3000;
http.createServer(app).listen(PORT, function(err){
    if (err) console.log(err);
    else console.log(`HTTP server on http://localhost:${PORT}`);
});

