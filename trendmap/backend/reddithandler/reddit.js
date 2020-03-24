'use strict';
var snoowrap = require('snoowrap');
const file = require('../utilities/file');

var reddit;
snoowrap.fromApplicationOnlyAuth({
	userAgent: 'trendmap',
	clientId: '26quE0VO8RS1rw',
	clientSecret: '6hiXyTJf-ySLnxdh_7Gw_FbBtu0',
	grantType: snoowrap.grantType.CLIENT_CREDENTIALS
}).then(r => reddit = r);

function compare(a, b) {
	let diffA = a.upvotes - a.downvotes;
	let diffB = b.upvotes - b.downvotes;
	if (diffA < diffB) return 1;
	if (diffA > diffB) return -1;
	return 0;
}

var api = {};
file.readFile(`./reddithandler/files/subreddit-support-dict.json`)
    .then(function(value){
        api.countries = JSON.parse(value);
    }, function(err){
        console.log("API support json not loaded in. set to undefined");
        console.error(err);
});

file.readFile(`./reddithandler/files/source-blacklist`)
	.then(function(value) {
		api.blacklist = value;
	}, function(err) {
		console.log("API support json not loaded in. set to undefined");
	    console.error(err);
	});

exports.all = function(req, res, next) {
	// return reddit.getSubmission('fj0h04').fetch().then(sub => res.json(sub));
	return reddit.getHot('Antigua_and_Barbuda', { limit: 10 }).then(posts => res.json(posts));
}

exports.getGlobal = async function(req, res, next) {
	let master = [];
	let worldNews = await reddit.getHot('worldnews', { limit: 10 });
	let news = await reddit.getHot('news', { limit: 10 });
	news.concat(worldNews).forEach(function(post) {
		master.push({
			"source": post.domain,
			"title": post.title,
			"description": "N/A",
			"url": post.url,
			"urlToImage": (post.preview) ? post.preview.images[0].source.url : null,
			"publishedAt": new Date(post.created_utc * 1000),
			"subreddit": post.subreddit.display_name,
			"upvotes": post.ups,
			"downvotes": post.downs,
		});
	});
	return res.json(master.sort(compare).slice(0, 10));
}

exports.getNational = function(req, res, next) {
	let alpha2 = req.query.country.toUpperCase();
	let blacklist = new RegExp(api.blacklist);
	return reddit.getHot(`${api.countries[alpha2]}`, { limit : 10 }).then(posts => {
		let master = [];
		posts.forEach(function(post) {
			if (post.domain.match(blacklist)) return;
			master.push({
				"source": post.domain,
				"title": post.title,
				"description": "N/A",
				"url": post.url,
				"urlToImage": (post.preview) ? post.preview.images[0].source.url : null,
				"publishedAt": new Date(post.created_utc * 1000),
				"subreddit": post.subreddit.display_name,
				"upvotes": post.ups,
				"downvotes": post.downs,
			});
		});
		return res.json(master.sort(compare));
	}).catch(function(error) {
		res.status(500).end(error);
	});
}