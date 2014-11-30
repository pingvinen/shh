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
 * @param searchDocument Object
 * @param callback Function(UserList)
 */
UserRepository.prototype.get = function(searchDocument, callback) {
	var connection = this.dbConnection;
	var that = this;

	connection.connect(function(db) {
		connection.find(db, 'users', searchDocument, function(docs) {
			var list = new UserList();

			for (var i=0; i<docs.length; i++) {
				list.add(that.dbToUser(docs[i]));
			}

			callback(list);
		});
	});
};

/**
 * @param id string
 * @param callback Function(User)
 */
UserRepository.prototype.getById = function(id, callback) {
	this.get({_id: id}, function(userList) {
		callback(userList.first());
	});
};

/**
 * @param username string
 * @param callback Function(User)
 */
UserRepository.prototype.getByUsername = function(username, callback) {
	this.get({username: username}, function(userList) {
		callback(userList.first());
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