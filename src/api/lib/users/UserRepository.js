#!/usr/bin/env node

var UserList = require('./UserList');
var User = require('./User');

/**
 * @param dbConnection MongoConnection
 * @constructor
 */
function UserRepository(dbConnection) {
	/**
	 * @var MongoConnection
	 */
	this.dbConnection = dbConnection;
}

/**
 * @param username string
 * @param callback Function(UserList)
 */
UserRepository.prototype.getByUsername = function(username, callback) {
	var connection = this.dbConnection;
	var that = this;

	connection.connect(function(db) {
		connection.find(db, 'users', {username: username}, function(docs) {
			var list = new UserList();

			for (var i=0; i<docs.length; i++) {
				list.add(that.dbToUser(docs[i]));
			}

			callback(list);
		});
	});
};

UserRepository.prototype.dbToUser = function(userDoc) {
	var user = new User();
	user.setId(userDoc._id);
	user.setUsername(userDoc.username);
	user.setPassword(userDoc.password);

	return user;
};


module.exports = UserRepository;