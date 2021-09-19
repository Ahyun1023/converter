const express = require('express');
const http = require('http');
const path = require('path');

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

app.use('/', router);

/*let errorHandler = expressErrorHandler({
    static: {
        '404': './public/404.html'
    }
});*/

/*app.use(expressErrorHandler.httpError(404));
app.use(errorHandler);*/

http.createServer(app).listen(app.get('port'), ()=>{
    console.log('서버 시작, 포트넘버: %d', app.get('port'));
})

//url : http://localhost:8090/public/