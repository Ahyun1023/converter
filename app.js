const express = require('express');
const http = require('http');
const path = require('path');


const app = express();

const static = require('serve-static');

const expressErrorHandler = require('express-error-handler');

app.use('port', process.env.PORT || 3000);
app.set('view engine', 'pug');
app.set('views, views');

let routes = express.Router();

routes.get('/', function(req, res, next) {
    //Do whatever...
});

app.use('/', routes);

app.use(app.router);
routes.initialize(app);

let errorHandler = expressErrorHandler({
    static: {
        '404': './public/404.html'
    }
});

app.use(expressErrorHandler.httpError(404));
app.use(errorHandler);

http.createServer(app).listen(app.get('port'), ()=>{
    console.log('서버 시작, 포트넘버: %d', app.get('port'));
})

module.export = routes;