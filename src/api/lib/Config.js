#!/usr/bin/env node

function Config() {
	"use strict";

	this.mongoDatabaseName = 'shh';
}

Config.prototype.getMongoHost = function() {
	return process.env.MONGO_HOST;
};

Config.prototype.getMongoPort = function() {
	return process.env["SHH-MONGO_PORT_27017_TCP_PORT"];
};

Config.prototype.getMongoDatabaseName = function() {
	return this.mongoDatabaseName;
};

module.exports = Config;

