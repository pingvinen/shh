#!/usr/bin/env node

var express = require('express');
var router = express.Router();
var config = require('./config/config');

router.get('/', require('./controllers/index'));
router.get('/mongotest', require('./controllers/mongotest'));
router.post('/authenticate', require('./controllers/authenticate'));
router.post('/logout', require('./controllers/logout'));

module.exports = router;

