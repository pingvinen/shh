#!/usr/bin/env node

var debug = require('debug')('ssh-api');
var path = require('path');
var express = require('express');
var app = express();
var config = require('./config/config.js');

app.set('x-powered-by', false);

var routes = require('./routes');

app.use(function(req, res, next) {
	"use strict";
	console.log(req.method, req.url, req.headers);
	next();
});

/// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
	app.use(function(err, req, res, next) {
		"use strict";
		res.status(err.status || 500);
		res.render('error', {
			message: err.message,
			error: err
		});
	});
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
	"use strict";
	res.status(err.status || 500);
	res.render('error', {
		message: err.message,
		error: {}
	});
});

app.use(routes);


var server = app.listen(process.env.HTTP_PORT || 3000, function() {
	"use strict";
	console.log('Listening on port', server.address().port);
});
