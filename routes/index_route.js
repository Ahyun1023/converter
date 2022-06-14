const express = require('express');
const router = express.Router();

const main = require('./main_route');
const users = require('./user_route');

router.use('/', main);
router.use('/users', users);

module.exports = router;