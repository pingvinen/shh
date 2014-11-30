#!/usr/bin/env node
var config = require('./../../config/config');
var MongoConnection = require('./../../lib/MongoConnection');
var checksumService = require('./../../lib/authentication/ChecksumService');
var BlobService = require('./../../lib/blob/BlobService');
var Blob = require('./../../lib/blob/Blob');
var UserRepository = require('./../../lib/users/UserRepository');

module.exports = function(req, res) {
	"use strict";

	var session = req.session || {};
	var checksum = req.body.checksum || "***";
	var blobTitle = req.body.title || '';
	var blobBody = req.body.body || '';
	var blobType = req.body.type || 'plaintext';

	if (!session.isAuthenticated) {
		res.json({
			"error": {
				  "code": "NotAuthenticated"
				, "message": "You must login"
			}
		});
		return;
	}

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
	var userRepository = new UserRepository(dbConnection);

	userRepository.getById(session.userId, function(user) {
		if (user == null) {
			res.json({
				"error": {
					  "code": "NoSuchUser"
					, "message": "Could not find the current user"
				}
			});
		}
		else {
			var blob = new Blob();
			blob.setBody(blobBody);
			blob.setTitle(blobTitle);
			blob.setType(blobType);
			blob.setOwner(user.getId());

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
		}
	});
};
