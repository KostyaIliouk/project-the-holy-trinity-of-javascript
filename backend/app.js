const express = require('express');
const bodyParser = require('body-parser');
const routing = require('./routing/routing');

const app = express();

app.use(bodyParser.json());

// just to log requests comming in to console - should remove this later or
// switch to an actual logger
app.use(function(req, res, next){
    console.log("HTTP request", req.method, req.url, req.body);
    next();
});

// paths
app.use('/', routing);

// setup http connection
// TODO: switch to https once hosting figured out
const http = require('http');
const PORT = 3000;
http.createServer(app).listen(PORT, function(err){
    if (err) console.log(err);
    else console.log(`HTTP server on http://localhost:${PORT}`);
});

