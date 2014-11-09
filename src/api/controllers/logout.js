#!/usr/bin/env node
var config = require('./../config/config');
var MongoConnection = require('./../lib/MongoConnection');
var checksumService = require('./../lib/authentication/ChecksumService');


module.exports = function(req, res) {
	"use strict";

	var checksum = req.body.checksum || "***";
	var session = req.session || {};

	if (!checksumService.check(checksum, session.token, ["/logout"])) {
		res.json({
			"error": {
				  "code": "InvalidChecksum"
				, "message": "Checksum was invalid"
			}
		});
		return;
	}

	var dbConnection = new MongoConnection(config);

	dbConnection.connect(function(db) {
		var doc = {
			"sessionId": session.id
		};

		dbConnection.remove(db, 'sessionTokens', doc, function(db) {
			session.destroy();
			db.close();

			res.json({
				"status": "ok"
			});
		});
	});
};
