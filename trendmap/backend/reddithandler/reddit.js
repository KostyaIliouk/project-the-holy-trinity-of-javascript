/* jshint node: true */
'use strict';

const snoowrap = require('snoowrap');

const r = new snoowrap({
	userAgent: 'trendmap',
	accessToken: '-W2dL5L2xpC_dGD8j6vmdUHn_7R0',
});

exports.hot = function(req, res, next) {
		//r.getHot({ limit: 1 }).then(console.log);
		console.log("hello world~");
		r.getBest({limit: 1}).then((value) =>{
			console.log(value);
			return res.json(value);
		});
	};