'use strict';

function unpackData() {
	var tmp = phantom.args.toString(),
		args = {};
	tmp.split(',').forEach(function(item) {
		var parts = item.split(':');
		args[parts[0]] = parts[1];
	});
	if (args.url) {
		args.url = decodeURIComponent(args.url);
	}
	return args;
}

var openPromise;
var args = unpackData();

var page = require('webpage').create();
page.viewportSize = { width: 800, height: 800 };

page.onInitialized = function() {
  openPromise = page.evaluate(function() {
    return new Promise(function(resolve) {
    	document.addEventListener('DOMContentLoaded', function() {
	      resolve();
	    }, false);
    });
  });
};
page.onNavigationRequested = function(url) {

};

function step1() {
	page.open(args.url, function() {
		openPromise.then(function() {
			page.evaluate(function(args) {

			}, args);
			setTimeout(slimer.exit, 2000);
		});
	});
}

step1();
