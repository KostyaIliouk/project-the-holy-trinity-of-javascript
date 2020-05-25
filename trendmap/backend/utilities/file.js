/* jshint node: true */
"use strict";

const fs = require('fs');

/*
 * Reads a file with filename
 * Returns a promise.
 */
exports.readFile = function(filename){
    return new Promise(function(resolve, reject){
        fs.readFile(filename, 'utf-8', function(err, data){
            if (err) reject(err);
            else resolve(data);
        });
});};