/* jshint node: true */
"use strict";

const redis = require("redis");

// creates a default client running on localhost
const client = redis.createClient();

// redis connection could not be established make sure this is ran as well
client.on("error", function(error){
    // TODO: check the callstack to see where this goes after and if client has error 
    console.error(error);});


exports.fetch = function(req, res, next){
    console.log('entered');
    console.log(client);
    // ensure connection to reddis
    if(client.connected){
        return res.json("you've connected chief");
    }
};


