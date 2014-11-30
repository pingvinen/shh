#!/usr/bin/env node
var config = require('./../../config/config');
var MongoConnection = require('./../../lib/MongoConnection');
var checksumService = require('./../../lib/authentication/ChecksumService');
var BlobService = require('./../../lib/blob/BlobService');
var Blob = require('./../../lib/blob/Blob');

module.exports = function(req, res) {
	"use strict";

	var session = req.session || {};
	var checksum = req.body.checksum || "***";
	var blobTitle = req.body.title || '';
	var blobBody = req.body.body || '';
	var blobType = req.body.type || 'plaintext';

	if (!checksumService.check(checksum, session.token, [blobTitle, blobBody, blobType])) {
		res.json({
			"error": {
				  "code": "InvalidChecksum"
				, "message": "Checksum was invalid"
			}
		});
		return;
	}

	var dbConnection = new MongoConnection(config);

	var blobService = new BlobService(dbConnection);

	var blob = new Blob();
	blob.setBody(blobBody);
	blob.setTitle(blobTitle);
	blob.setType(blobType);

	blobService.insert(blob, function(wasSuccessful, updatedBlob) {
		if (wasSuccessful) {
			res.json({
				"blob": updatedBlob.toJson()
			});
		}
		else {
			res.json({
				"error": {
					  "code": "CouldNotCreateBlob"
					, "message": "Could not create the blob"
				}
			});
		}
	});
};
