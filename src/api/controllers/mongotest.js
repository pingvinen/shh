#!/usr/bin/env node
var config = require('./../config/config');
var MongoClient = require('mongodb').MongoClient;
var assert = require('assert');

var mongoUrl = 'mongodb://'+process.env.MONGO_HOST+':'+process.env["SHH-MONGO_PORT_27017_TCP_PORT"]+'/myproject';



var insertDocuments = function(db, callback) {
	var collection = db.collection('documents');

	collection.insert([
		{a : 1}
		, {a : 2}
		, {a : 3}
	], function(err, result) {
		assert.equal(err, null);
		assert.equal(3, result.result.n);
		assert.equal(3, result.ops.length);
		console.log('inserted',result.result.n,'documents into the document collection');
		callback(result);
	});
};


var findDocuments = function(db, callback) {
	var collection = db.collection('documents');

	collection.find({}).toArray(function(err, docs) {
		assert.equal(err, null);
		console.log("found the following records");
		console.dir(docs);
		callback(docs);
	})
};


module.exports = function(req, res) {
	"use strict";

	// Use connect method to connect to the Server
	MongoClient.connect(mongoUrl, function(err, db) {
		assert.equal(null, err);
		console.log("Connected correctly to server", new Date());

		insertDocuments(db, function() {

			findDocuments(db, function(docs) {
				res.json({
					"message": new Date()
					, "docs": docs
				});

				db.close();
			});
		});
	});
};

