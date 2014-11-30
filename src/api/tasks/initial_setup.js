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
