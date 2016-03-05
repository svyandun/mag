var _ = require('ramda');
var $ = require('jquery');

////////////////////////////////////////////
// Utils

var Impure = {
	getJSON: _.curry(function(callback, url) {
		$.getJSON(url, callback);
	}),

	setHtml: _.curry(function(sel, html) {
		$(sel).html(html);
	}),
};

var img = function(url) {
	return $('<img />', {
		src: url,
	});
};

var trace = _.curry(function(tag, x) {
	console.log(tag, x);
	return x;
});

////////////////////////////////////////////

var url = function(t) {
	return 'http://api.flickr.com/services/feeds/photos_public.gne?tags=' +
	t + '&format=json&jsoncallback=?';
};

var mediaUrl = _.compose(_.prop('m'), _.prop('media'));

var mediaToImg = _.compose(img, mediaUrl);

var images = _.compose(_.map(mediaToImg), _.prop('items'));

var renderImages = _.compose(Impure.setHtml('body'), images);

var app = _.compose(Impure.getJSON(renderImages), url);

app('dogs');

