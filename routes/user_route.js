const mysql_dbc = require('../DB/db')();
const connection = mysql_dbc.init();
const logger = require('../logging/log_info');

const crypto = require('crypto');

const doLogin = (req, res)=>{
    let loginInfo = req.body.login_data;

    loginInfo = JSON.parse(loginInfo);
    loginInfo.password = crypto.createHash('sha256').update(loginInfo.password).digest('hex');

    connection.query('SELECT * FROM USER_TB WHERE ID = ? AND PW = ?;', [loginInfo.id, loginInfo.password], (err, results)=>{
        if(err){
            console.log(err);
        } else{
            if(results == 0){
                res.send({result: false});
            } else{
                res.send({result: true});
            }
        }
    });
};

const checkOverlapId = (req, res) => {
    let idInfo = req.body.id;

    idInfo = JSON.parse();
}

const doSignup = (req, res)=>{
    let userInfo = req.body.user_data;

    userInfo = JSON.parse(userInfo);
}

module.exports.doLogin = doLogin;
module.exports.checkOverlapId = checkOverlapId;
module.exports.doSignup = doSignup;