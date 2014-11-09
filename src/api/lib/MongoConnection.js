#!/usr/bin/env node

var MongoClient = require('mongodb').MongoClient;

/**
 * @param config Config
 * @constructor
 */
function MongoConnection(config) {
	"use strict";

	/**
	 * @var Config
	 */
	this.config = config;
}

MongoConnection.prototype.getUrl = function() {
	"use strict";

	var host = this.config.getMongoHost();
	var port = this.config.getMongoPort();
	var database = this.config.getMongoDatabaseName();

	return 'mongodb://'+host+':'+port+'/'+database;
};

MongoConnection.prototype.connect = function(callback) {
	"use strict";


	// Use connect method to connect to the Server
	MongoClient.connect(this.getUrl(), function(err, db) {

		if (err != null) {
			console.log('Connect error', err);
		}
		else {
			callback(db);
		}
	});
};


MongoConnection.prototype.insert = function(db, collectionName, objectOrObjects, callback) {
	"use strict";

	var collection = db.collection(collectionName);

	collection.insert(objectOrObjects, function(err, result) {
		if (err != null) {
			console.log('Insert error', err);
		}
		else {
			callback(result);
		}
	});
};

MongoConnection.prototype.find = function(db, collectionName, searchDocument, callback) {
	"use strict";

	var collection = db.collection(collectionName);

	collection.find(searchDocument).toArray(function(err, docs) {
		if (err != null) {
			console.log('Find error', err);
		}
		else {
			callback(docs);
		}
	});
};

MongoConnection.prototype.remove = function(db, collectionName, searchDocument, callback) {
	"use strict";

	var collection = db.collection(collectionName);

	collection.removeMany(searchDocument, function(err, result) {
		if (err != null) {
			console.log('Remove error', err);
		}
		else {
			callback(db);
		}
	});
};


module.exports = MongoConnection;
