#!/usr/bin/env node

var uuid = require('node-uuid');
var crypto = require('crypto');
var UserRepository = require('./../users/UserRepository');

/**
 * @param dbConnection MongoConnection
 * @constructor
 */
function AuthenticationService(dbConnection) {
	this.userRepository = new UserRepository(dbConnection);
}

AuthenticationService.prototype.getHashedPassword = function(plaintext, salt) {
	var hash = crypto
				.createHash('sha256')
				.update(salt + plaintext + salt)
				.digest('hex');

	return hash;
};

AuthenticationService.prototype.authenticate = function(username, password, callback) {
	var that = this;

	this.userRepository.getByUsername(username, function(userList) {
		if (userList.count() == 1) {
			var hashedPassword = that.getHashedPassword(password, username);
			var user = userList.first();

			if (hashedPassword === user.getPassword()) {
				callback(true, user);
			}
			else {
				callback(false, null);
			}
		}
		else {
			callback(false, null);
		}
	});
};

AuthenticationService.prototype.generateToken = function() {
	return uuid();
};

module.exports = AuthenticationService;