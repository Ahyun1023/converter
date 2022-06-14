const express = require('express');
const router = express.Router();

const mysql_dbc = require('../DB/db')();
const connection = mysql_dbc.init();
const logger = require('../logging/log_info');

const crypto = require('crypto');

/* 메인화면으로 이동 */
router.get('/', function(req, res){
    res.render('index');
});

module.exports = router;