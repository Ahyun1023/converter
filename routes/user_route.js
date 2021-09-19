const mysql_dbc = require('../DB/db')();
const connection = mysql_dbc.init();

const crypto = require('crypto');

const doLogin = (req, res)=>{
    let loginInfo = req.body.login_data;

    loginInfo = JSON.parse(loginInfo);
    loginInfo.password = crypto.createHash('sha256').update(loginInfo.password).digest('hex');
    
    connection.query('SELECT * FROM user WHERE id = ? AND password = ?;', [loginInfo.id, loginInfo.password], (err, results)=>{
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

const doSignup = (req, res)=>{
    
}

module.exports.doLogin = doLogin;