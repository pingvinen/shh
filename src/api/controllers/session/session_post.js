#!/usr/bin/env node
var config = require('./../../config/config');
var MongoConnection = require('./../../lib/MongoConnection');
var AuthenticationService = require('./../../lib/authentication/AuthenticationService');

var getExpiresAt = function() {
	var now = (new Date()).getTime();

	var expiresTime = now + 3600; // in 1 hour

	return new Date(expiresTime);
};

module.exports = function(req, res) {
	"use strict";

	var username = req.body.username || "null";
	var password = req.body.password || "***";
	var session = req.session || {};

	var dbConnection = new MongoConnection(config);

	var authService = new AuthenticationService(dbConnection);

	authService.authenticate(username, password, function(wasSuccessful, user) {
		session.isAuthenticated = wasSuccessful;

		if (wasSuccessful) {
			session.token = authService.generateToken();
			session.userId = user.getId();

			// TODO figure out how to generate a new ID for the current session

			dbConnection.connect(function(db) {
				var tokenDoc = {
					  token: session.token
					, username: username
					, userId: user.getId()
					, sessionId: session.id
					, expiresAt: getExpiresAt()
				};

				dbConnection.insert(db, 'sessionTokens', tokenDoc, function () {
					res.json({
						  "sessionId": session.id
						, "token": session.token
					});
				});
			});
		}
		else {
			res.json({
				"error": {
					  "code": "InvalidCredentials"
					, "message": "Invalid credentials"
				}
			});
		}
	});
};
