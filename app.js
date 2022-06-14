const express = require('express');
const http = require('http');
const path = require('path');
const logger = require('./logging/log_info');

const app = express();

const static = require('serve-static');
const bodyParser = require('body-parser');

const expressErrorHandler = require('express-error-handler');

const routes = require('./routes/index_route');

app.set('port', process.env.PORT || 8090);
app.set('view engine', 'pug');
app.set('views, views');
//app.engine('html', require('pug'));

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use('/', static(path.join(__dirname, 'views')));

app.use(express.urlencoded({extended:false}));
app.use(express.json());

app.use('/', routes);

/*let errorHandler = expressErrorHandler({
    static: {
        '404': './404.html'
    }
});*/

/*app.use(expressErrorHandler.httpError(404));
app.use(errorHandler);*/

http.createServer(app).listen(app.get('port'), ()=>{
    logger.info('서버 시작, 포트넘버: ' + app.get('port'));
})

//url : http://localhost:8090/