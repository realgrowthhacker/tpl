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

var page = require("webpage").create();
page.viewportSize = { width: 800, height: 800 };

page.onInitialized = function(a) {
  openPromise = page.evaluate(function() {
    return new Promise(function(resolve) {
    	document.addEventListener('DOMContentLoaded', function() {
	      resolve();
	    }, false);
    });
  });
};
page.onLoadStarted = function(url) {
	
};

function step1() {
	page.open('', function() {
		openPromise.then(function() {
			page.evaluate(function(args) {
				
			}, args);
			slimer.exit();
		});
	});
}

step1();
