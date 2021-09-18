const mysql_dbc = require('../DB/db')();
const connection = mysql_dbc.init();

const crypto = require('crypto');

const doLogin = (req, res)=>{
    let loginInfo = req.body.login_data;

    console.log(loginInfo);

    loginInfo = JSON.parse(loginInfo);
    loginInfo.password = crypto.createHash('sha256').update(loginInfo.password).digest('hex');

    console.log(loginInfo.password);
    
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

module.exports.doLogin = doLogin;