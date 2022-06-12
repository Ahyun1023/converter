const express = require('express');
const http = require('http');
const path = require('path');
const logger = require('./logging/log_info');

const app = express();

const static = require('serve-static');

const expressErrorHandler = require('express-error-handler');

const user_rountes = require('./routes/user_route');

app.set('port', process.env.PORT || 8090);
app.set('view engine', 'pug');
//app.set('views, views');

app.use('/public', static(path.join(__dirname, 'public')));

app.use(express.urlencoded({extended:false}));
app.use(express.json());

router = express.Router();

router.route('/doLogin').post(user_rountes.doLogin);
router.route('/checkOverlapId').post(user_rountes.checkOverlapId);
router.route('/doSignup').post(user_rountes.doSignup);

app.use('/', router);

/*let errorHandler = expressErrorHandler({
    static: {
        '404': './public/404.html'
    }
});*/

/*app.use(expressErrorHandler.httpError(404));
app.use(errorHandler);*/

http.createServer(app).listen(app.get('port'), ()=>{
    logger.info('서버 시작, 포트넘버: ' + app.get('port'));
})

//url : http://localhost:8090/public/