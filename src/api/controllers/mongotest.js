#!/usr/bin/env node
var config = require('./../config/config');
var MongoConnection = require('./../lib/MongoConnection');

module.exports = function(req, res) {
	"use strict";

	var collectionName = 'documents';
	var connection = new MongoConnection(config);

	connection.connect(function(db) {
		connection.insert(db, collectionName, {b: new Date()}, function(result) {
			connection.find(db, collectionName, {}, function(docs) {
				res.json({
					  "message": new Date()
					, "docs": docs
				});

				db.close();
			});
		});
	});
};

