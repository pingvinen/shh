#!/usr/bin/env node

var uuid = require('node-uuid');
var crypto = require('crypto');

/**
 * @param dbConnection MongoConnection
 * @constructor
 */
function AuthenticationService(dbConnection) {
	/**
	 * @var MongoConnection
	 */
	this.dbConnection = dbConnection;
}

AuthenticationService.prototype.getHashedPassword = function(plaintext, salt) {
	var hash = crypto
				.createHash('sha256')
				.update(salt + plaintext + salt)
				.digest('hex');

	return hash;
};

AuthenticationService.prototype.authenticate = function(username, password, callback) {
	var connection = this.dbConnection;
	var that = this;
	connection.connect(function(db) {
		connection.find(db, 'users', {username: username}, function(docs) {
			if (docs.length == 1) {

				var hashedPassword = that.getHashedPassword(password, username);

				if (hashedPassword === docs[0].password) {
					callback(true, docs[0]);
				}
				else {
					callback(false, null);
				}
			}
			else {
				callback(false, null);
			}
		});
	});
};

AuthenticationService.prototype.generateToken = function() {
	return uuid();
};

module.exports = AuthenticationService;