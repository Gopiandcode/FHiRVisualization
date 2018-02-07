const express = require('express');
const path = require('path');
const webpack = require('webpack');
const env = require('./env');
const http = require('http');


function onError(error) {
    if(error.syscall !== 'listen') {
        throw error;
    }

    let bind =  typeof port === 'string' ? 'Pipe ' + port : 'Port ' + port;

    switch(error.code) {
        case 'EACCES':
        console.error(bind + " requires elevated priveleges");

        process.exit(1);
        break;

        case 'EADDRINUSE':
        console.error(bind + " is already in use");
        process.exit(1);
        break;
        default:
        throw error;
    }
}

function onListening(){
    let addr = server.address();
    let bind = typeof addr === 'String' 
    ? 'pipe ' + addr
    : 'port ' + addr.port;
    console.log("listening on " + bind);
}

const app = express();
const main = require('./app')(env);





app.use(main);


if (!env.PRODUCTION) {
    const webpackMiddleware = require('webpack-dev-middleware');
    const webpackDevMiddleware = require('webpack-hot-middleware');

    let config = require('../webpack.config.dev');
    let compiler = webpack(config);
    let DIR_DIST = path.resolve(__dirname, '../frontend', 'dist');

    app.use((req, res, next) => {
        console.log("Request Body: " + JSON.stringify(req.body));
        next();
    });

    app.use(webpackMiddleware(compiler, {
        publicPath: config.output.publicPath
    }));

    app.use(webpackDevMiddleware(compiler));
    app.use('/images', express.static(path.join(__dirname, '../frontend/src/images')));


    app.get('*', (req, res, next) => {
        const filename = path.join(DIR_DIST, 'index.html');

        compiler.outputFileSystem.readFile(filename, (err, result) => {
            if (err) {
                return next(err);
            }

            res.set('content-type', 'text/html');
            res.send(result);
            res.end();
        });

    })

}
else {

    app.use('/static', express.static(path.join(__dirname, '../frontend/dist')));


    app.get('/', (req, res) => {
        res.sendFile(path.join(__dirname, '../frontend/dist/index.html'))
    });


    app.get('*', (req, res) => {
        res.sendFile(path.join(__dirname, '../frontend/dist/index.html'));
    });
} 


console.log("Starting the server on port " + env.PORT + ", w type "  + typeof(env.PORT));

const server = http.createServer(app);
server.on('error', onError);
server.on('listen', onListening);
console.log("Going to run Express " + env.PRODUCTION + " app listening on port " + env.PORT);
app.listen(env.PORT);
console.log("Express " + env.PRODUCTION + " app listening on port " + env.PORT);