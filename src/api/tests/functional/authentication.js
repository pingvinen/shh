#!/usr/bin/env node

var http = require('http');
var checksumService = require('./../../lib/authentication/ChecksumService');

var callAuthenticate = function(next) {
	var options = {
		  host: 'api.shh.local'
		, path: '/session'
		, method: 'POST'
		, headers: {
			'Content-Type': 'application/json'
		}
	};

	var body = {
		  username: 'firstuser@shh.com'
		, password: 'qwe'
	};

	var req = http.request(options, function callback(response) {
			var str = '';

			response.on('data', function onData(chunk) {
				str += chunk;
			});

			response.on('end', function onEnd() {
				console.log(str);

				var cookies = response.headers['set-cookie'] || [];

				var result = JSON.parse(str);

				if (result.error) {
					throw new Error(result.error.message, result.error.code);
				}

				next(cookies, result);
			});

	});

	req.write(JSON.stringify(body));
	req.end();
};




var callLogout = function(cookies, authenticateResponse) {
	console.log(cookies);
	console.log(authenticateResponse);

	var options = {
		  host: 'api.shh.local'
		, path: '/session'
		, method: 'DELETE'
		, headers: {
			  'Content-Type': 'application/json'
			, Cookie: cookies
		}
	};

	var body = {
		checksum: checksumService.calculate(authenticateResponse.token, ['/session'])
	};

	var req = http.request(options, function callback(response) {
		var str = '';

		response.on('data', function onData(chunk) {
			str += chunk;
		});

		response.on('end', function onEnd() {
			console.log(str);

			var result = JSON.parse(str);

			if (result.error) {
				throw new Error(result.error.message, result.error.code);
			}
		});

	});

	req.write(JSON.stringify(body));
	req.end();
};




callAuthenticate(callLogout);
