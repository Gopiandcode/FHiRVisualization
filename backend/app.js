module.exports = (env) => {
    const express = require('express');
    const bodyParser = require('body-parser');
    const session = require('express-session');
    const morgan = require('morgan');
    const dbConnection = require('./db')(env);
    const methodOverride = require('method-override');
    const MongoStore = require('connect-mongo')(session);


    // main application
    const router = express.Router();
    const PORT = env.PORT;

    // add middleware for passport, api's etc

    // Allow CORS
    router.use(methodOverride());
    router.use((req, res, next) => {
        res.header('Access-Control-Allow-Credentials', true);
        res.header('Access-Control-Allow-Origin', req.headers.origin);
        res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
        res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization');

        if ('OPTIONS' === req.method) {
            res.send(200);
        } else {
            next();
        }
    });

    router.use(
        bodyParser.urlencoded({
            extended: true
        })
    );
    // Body parser

    router.use(bodyParser.json());

    router.use(session({
        secret: env.SECRET,
        store: new MongoStore({mongooseConnection: dbConnection}),
        resave: false,
        saveUninitialized: false
    }));


    // logging middleware
    if (env.PRODUCTION) {
        let accessLogStream = fs.createWriteStream(path.join(env.LOGDIR), {flags: 'a'});
        router.use(morgan(':method :url :status :res[content-length] - :response-time ms', {stream: accessLogStream}));
    }

    const passport = require('./passport')(env);
    router.use(passport.initialize());
    router.use(passport.session());


    // Authentication Middleware
    const auth = require('./auth')(env, passport);
    router.use('/auth', auth);

    // API Middleware
    const api = require('./api')(env);
    router.use('/api', api);

    // TODO: Error handling
    router.use((err, req, res, next) => {
        console.log('=========== ERROR ============');
        console.error(err.stack);
        res.status(500);
    });


    return router;
};