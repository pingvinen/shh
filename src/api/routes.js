#!/usr/bin/env node

var express = require('express');
var router = express.Router();
var config = require('./config/config');

router.get('/', require('./controllers/index'));
router.get('/mongotest', require('./controllers/mongotest'));

/**
 * Session
 */
router.post('/session', require('./controllers/session/session_post'));
router.delete('/session', require('./controllers/session/session_delete'));

/**
 * Blob
 */
router.post('/blob', require('./controllers/blob/blob_post'));

module.exports = router;

