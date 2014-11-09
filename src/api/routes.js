#!/usr/bin/env node

var express = require('express');
var router = express.Router();
var config = require('./config/config');

router.get('/', require('./controllers/index'));
router.get('/mongotest', require('./controllers/mongotest'));
router.post('/session', require('./controllers/session/session_post'));
router.delete('/session', require('./controllers/session/session_delete'));

module.exports = router;

