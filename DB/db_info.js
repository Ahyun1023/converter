const global = require('../global/global_variable.json');

module.exports = (()=> {
    return {
        local: { //개발 서버용
            host: 'localhost',
            port: 3306,
            user: global.db_userId,
            password: global.db_password,
            database: 'converter'
        },

        real: { //실 서버용
            host: '',
            port: '',
            user: '',
            password: '',
            database: ''
        },

        dev: { //테스트 서버용
            host: '',
            port: '',
            user: '',
            password: '',
            database: ''
        }
    }
})();