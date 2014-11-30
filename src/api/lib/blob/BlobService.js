#!/usr/bin/env node

var uuid = require('node-uuid');
var Blob = require('./Blob');

/**
 * @param dbConnection MongoConnection
 * @constructor
 */
function BlobService(dbConnection) {
	/**
	 * @var MongoConnection
	 */
	this.dbConnection = dbConnection;
}


/**
 * @param blob Blob
 * @param callback Function(bool wasSuccessful, Blob blob)
 */
BlobService.prototype.insert = function(blob, callback) {
	var connection = this.dbConnection;

	connection.connect(function(db) {
		var now = new Date();

		var blobDocument = {
			  _id: uuid()
			, type: blob.getType()
			, title: blob.getTitle()
			, body: blob.getBody()
			, createdAt: now
			, updatedAt: now
		};

		connection.insert(db, 'blobs', blobDocument, function(result) {
			var wasSuccess = true;

			blob.setId(blobDocument._id);
			blob.setCreatedAt(blobDocument.createdAt);
			blob.setUpdatedAt(blobDocument.updatedAt);

			callback(wasSuccess, blob);
		});
	});
};

module.exports = BlobService;