#!/usr/bin/env node

/**
 * @param users User[]
 * @constructor
 */
function UserList(users) {
	/**
	 * @var User[]
	 */
	this.items = users || [];
}

UserList.prototype.count = function() {
	return this.items.length;
};

UserList.prototype.isEmpty = function() {
	return this.count() == 0;
};

/**
 * @param user User
 */
UserList.prototype.add = function(user) {
	this.items.push(user);
};

/**
 * @returns User|null
 */
UserList.prototype.first = function() {
	if (this.isEmpty()) {
		return null;
	}

	return this.items[0];
};

module.exports = UserList;