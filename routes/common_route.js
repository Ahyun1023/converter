const mysql_dbc = require('../DB/db')();
const connection = mysql_dbc.init();

const doLogin = (req, res)=>{
    res.send({result: true});
};

module.exports.doLogin = doLogin;