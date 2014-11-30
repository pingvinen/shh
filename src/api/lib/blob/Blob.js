#!/usr/bin/env node

function Blob() {
	"use strict";

	this.id = '';
	this.title = '';
	this.body = '';
	this.type = '';
	this.createdAt = null;
	this.updatedAt = null;
	this.owner = '';
}

Blob.prototype.getId = function() {
	return this.id;
};

Blob.prototype.setId = function(id) {
	this.id = id;
};

Blob.prototype.getTitle = function() {
	return this.title;
};

Blob.prototype.setTitle = function(title) {
	this.title = title;
};

Blob.prototype.getType = function() {
	return this.type;
};

Blob.prototype.setType = function(type) {
	this.type = type;
};

Blob.prototype.getBody = function() {
	return this.body;
};

Blob.prototype.setBody = function(body) {
	this.body = body;
};

Blob.prototype.getCreatedAt = function() {
	return this.createdAt;
};

Blob.prototype.setCreatedAt = function(createdAt) {
	this.createdAt = createdAt;
};

Blob.prototype.getUpdatedAt = function() {
	return this.updatedAt;
};

Blob.prototype.setUpdatedAt = function(updatedAt) {
	this.updatedAt = updatedAt;
};

Blob.prototype.getOwner = function() {
	return this.owner;
};

Blob.prototype.setOwner = function(userId) {
	this.owner = userId;
};


Blob.prototype.toJson = function() {
	return {
		  id: this.id
		, title: this.title
		, body: this.body
		, type: this.type
		, owner: this.owner
		, createdAt: this.createdAt
		, updatedAt: this.updatedAt
	};
};


module.exports = Blob;

