const express = require('express');
const https = require('https');
const fs = require("fs");

const app = express();


const config = {
    // if they fail then server doesnt start anyway so may as well be sync
    key: fs.readFileSync('./secret/server.key'),
    cert: fs.readFileSync('./secret/server.crt')
};

https.createServer(app, config).listen(3000, function(err){
    if (err) console.log(err);
    else console.log(`HTTPS server on https://localhost:3000`);
});

