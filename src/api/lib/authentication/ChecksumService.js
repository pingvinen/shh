#!/usr/bin/env node

var util = require('util');
var crypto = require('crypto');

function ChecksumService() {
}

ChecksumService.prototype.calculate = function(token, parts) {
	if (!util.isArray(parts)) {
		parts = [parts];
	}
	var value = parts.join() + token;

	return crypto
		.createHash('sha256')
		.update(value)
		.digest('hex');
};

ChecksumService.prototype.check = function(suppliedChecksum, token, parts) {
	var calculated = this.calculate(token, parts);

	return suppliedChecksum === calculated;
};


module.exports = new ChecksumService();
