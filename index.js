const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const webpack = require('webpack');
const app = express();

app.use(bodyParser.json());

if (process.env.NODE_ENV == 'development') {
    const webpackMiddleware = require('webpack-dev-middleware');
    const webpackDevMiddleware = require('webpack-hot-middleware');

    let config = require('./webpack.config.dev');
    let compiler = webpack(config);
    let DIR_DIST = path.resolve(__dirname, 'frontend', 'dist');

    app.use((req, res, next) => {
        console.log(req.body);
        next();
    });

    app.use(webpackMiddleware(compiler, {
        publicPath: config.output.publicPath
    }));

    app.use(webpackDevMiddleware(compiler));

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
else if (process.env.NODE_ENV == 'production') {

    app.use('/static', express.static(path.join(__dirname, './frontend/dist')))

    app.get('/', (req, res) => {
        res.sendFile(path.join(__dirname, './frontend/dist/index.html'))
    });


    app.get('*', (req, res) => {
        res.redirect('/');
    })
} else {
    throw new Error('Invalid Value for NODE_ENV');
}



app.listen(8080, () => {
    console.log("Express app listening on port " + 80);
})
