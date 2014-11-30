#!/usr/bin/env node

function User() {
	"use strict";

	this.id = '';
	this.username = '';
	this.password = '';
}

User.prototype.getId = function() {
	return this.id;
};

User.prototype.setId = function(id) {
	this.id = id;
};

User.prototype.getUsername = function() {
	return this.username;
};

User.prototype.setUsername = function(username) {
	this.username = username;
};

User.prototype.getPassword = function() {
	return this.password;
};

User.prototype.setPassword = function(password) {
	this.password = password;
};

User.prototype.toJson = function() {
	return {
		  id: this.id
		, username: this.username
	};
};


module.exports = User;

