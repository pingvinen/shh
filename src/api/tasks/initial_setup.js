#!/usr/bin/env node
var config = require('./../config/config.js');

var MongoConnection = require('./../lib/MongoConnection');
var connection = new MongoConnection(config);
var uuidGen = require('node-uuid');
var authService = new (require('./../lib/authentication/AuthenticationService'))(connection);


/**
 * Setup initial user
 */
connection.connect(function (db) {
	var user = {
		  "_id": uuidGen()
		, "username": 'firstuser@shh.com'
		, "password": 'qwe'
	};

	user.password = authService.getHashedPassword(user.password, user.username);

	connection.remove(db, 'users', {}, function(db) {
		connection.insert(db, 'users', user, function(result) {

			console.log('all done with them users');

			db.close();
		});
	});
});



/**
 * Remove exisiting blobs
 */
connection.connect(function (db) {
	connection.remove(db, 'blobs', {}, function(db) {
		console.log('removed all blobs');

		db.close();
	});
});



/**
 * Remove session tokens
 */
connection.connect(function (db) {
	connection.remove(db, 'sessionTokens', {}, function(db) {
		console.log('removed all session tokens');

		db.close();
	});
});