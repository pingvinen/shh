#!/usr/bin/env node

var debug = require('debug')('ssh-api');
var path = require('path');
var express = require('express');
var bodyParser = require('body-parser');
var session = require('express-session');
var uuid = require('node-uuid');
var app = express();
var config = require('./config/config.js');

app.set('x-powered-by', false);

var routes = require('./routes');

// parse request body as json
app.use(bodyParser.json());

app.use(session({
	  secret: config.getSessionSecret()
	, genid: function(req) {
		return uuid();
	}

	  // http://stackoverflow.com/questions/24477035/express-4-0-express-session-with-odd-warning-message
	, saveUninitialized: true
	, resave: true
}));

app.use(function(req, res, next) {
	"use strict";
	console.log(req.method, req.url);
	console.log('#### headers ####');
	console.log(req.headers);
	console.log('#### body ####');
	console.log(req.body);
	console.log('#### /body ####');
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
