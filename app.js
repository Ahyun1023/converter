const express = require('express');
const http = require('http');
const path = require('path');

const app = express();

const static = require('serve-static');

const expressErrorHandler = require('express-error-handler');

//app.use('port', process.env.PORT || 3000);
app.set('view engine', 'pug');
app.set('views, views');

app.use('/public', static(path.join(__dirname, 'public')));

router = express.Router();

router.get('/', function(req, res, next) {
    //Do whatever...
});

app.use('/', router);

/*let errorHandler = expressErrorHandler({
    static: {
        '404': './public/404.html'
    }
});*/

/*app.use(expressErrorHandler.httpError(404));
app.use(errorHandler);*/

http.createServer(app).listen(app.get('port'), ()=>{
    console.log('서버 시작, 포트넘버: %d', 3000/*app.get('port')*/);
})