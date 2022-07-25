const express = require('express');
const router = express.Router();

const mysql_dbc = require('../DB/db')();
const connection = mysql_dbc.init();
const logger = require('../logging/log_info');
const global = require('../global/global_variable.json');

const crypto = require('crypto');
const nodemailer = require('nodemailer');

const mailSender = {
    sendGmail: function(param){
        let transPort = nodemailer.createTransport({
            service: 'gmail',
            host: 'smtp.gmail.com',
            port: 587,
            secure: false,
            requireTLS: true,
            auth: {
                user: global.email_user,
                pass: global.email_pass
            }
        });

        let mailOpitons = {
            from:global.email_user,
            to: param.toEmail,
            subject: param.subject,
            text: param.text
        }

        transPort.sendMail(mailOpitons, function(error, info){
            if(error){
                logger.error(error);
            } else {
                logger.debug('Email sent: ' + info.response);
            }
        })
    }
}

/* 로그인화면으로 이동 */
router.get('/login', function(req, res){
    res.render('login');
});

/* 로그인 */
router.post('/doLogin', function(req, res){
    let id = req.body.id;
    let password = req.body.password;

    password = crypto.createHash('sha256').update(password).digest('hex');

    connection.query('SELECT * FROM USER_TB WHERE ID = ? AND PASSWORD = ?;', [id, password], (err, results)=>{
        if(err){
            logger.error(err);
        } else{
            if(results == 0){
                res.send(JSON.stringify(false));
            } else{
                res.send(JSON.stringify(true));
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
    let idInfo = req.query.id;

    connection.query('SELECT ID FROM USER_TB WHERE ID = ?;', [idInfo], (err, results)=>{
        if(err){
            logger.error(err);
        } else{
            if(results.length > 0){
                res.send(JSON.stringify(false));
            } else{
                res.send(JSON.stringify(true));
            }
        }
    });
});

/* 이메일 인증 */
router.post('/emailCertificate', function(req, res){
    let email = req.body;

    let emailParam = {
        toEmail: email,
        subject: '이메일 인증번호를 확인해주세요',
        text: '우히힉'
    };

    mailSender.sendGmail(emailParam);
    
    res.send(JSON.stringify(true));
});


/* 회원가입 */
router.post('/doSignup', function(req, res){
    let userInfo = req.body;
    userInfo.password = crypto.createHash('sha256').update(userInfo.password).digest('hex');

    connection.query('INSERT INTO USER_TB SET ?;', userInfo, (err, results)=>{
        if(err){
            logger.error(err);
        } else{
            res.send(JSON.stringify(true));
        }
    });
})

module.exports = router;