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

var countries;
file.readFile('./subreddit-support-dict.json').then(function(value) {
		countries = JSON.parse(value);
	}, 
	function(err) {
		countries = null;
		console.log("Unable to load supported subreddit JSON.");
		console.error(err);
});

module.exports = function(app) {

	app.get('/api/reddit/global/', async function(req, res, next) {
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
		
	});

	app.get('/api/reddit/national', function(req, res, next) {
		let alpha2 = req.query.country;
		if (!(alpha2 in countries)) {
			console.error("Provided country code is either invalid or not yet supported.");
		}
		console.log(`le country is ${countries[alpha2]}`);
	});

}