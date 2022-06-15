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

/* caseConvert로 이동 */
router.get('/caseConvert', function(req, res){
    res.render('caseConvert');
})

/* uniConvert로 이동 */
router.get('/uniConvert', function(req, res){
    res.render('uniConvert');
})

/* queryConvert로 이동 */
router.get('/queryConvert', function(req, res){
    res.render('queryConvert');
})

module.exports = router;