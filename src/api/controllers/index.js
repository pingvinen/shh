#!/usr/bin/env node
var config = require('./../config/config');

module.exports = function(req, res) {
	"use strict";
	res.json({
		"message": new Date()
	});
};

