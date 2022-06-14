const express = require('express');
const router = express.Router();

const mysql_dbc = require('../DB/db')();
const connection = mysql_dbc.init();
const logger = require('../logging/log_info');

const crypto = require('crypto');

/* 로그인화면으로 이동 */
router.get('/login', function(req, res){
    res.render('login');
});

/* 로그인 */
router.post('/doLogin', function(req, res){
    let loginInfo = req.body.login_data;

    loginInfo = JSON.parse(loginInfo);
    loginInfo.password = crypto.createHash('sha256').update(loginInfo.password).digest('hex');

    connection.query('SELECT * FROM USER_TB WHERE ID = ? AND PW = ?;', [loginInfo.id, loginInfo.password], (err, results)=>{
        if(err){
            logger.error(err);
        } else{
            if(results == 0){
                res.send({result: false});
            } else{
                res.send({result: true});
            }
        }
    });
});
/* 회원가입 화면으로 이동 */
router.get('/signup', function(req, res){
    res.render('signup');
});

/* 아이디 중복 체크 */
router.get('/checkOverlapId', function(req, res){
    let idInfo = req.body.id;

    idInfo = JSON.parse();
});


/* 회원가입 */
router.get('/doSignup', function(req, res){
    let userInfo = req.body.user_data;

    userInfo = JSON.parse(userInfo);
})

module.exports = router;