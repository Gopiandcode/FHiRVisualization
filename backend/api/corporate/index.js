module.exports = (env) => {
    const express = require('express');
    const router = express.Router();
    const preferences = require('./preferences');
    const associations = require('./associations');
    const data = require('./data');

    router.use((req, res, next) => {
        console.log("Accessing api");
        if (!req.user.isCorporate) {
            res.send(403, 'Unauthorized');
        } else {
            next();
        }
    });


    preferences(env, router);
    associations(env, router);
    data(env, router);

    return router;
};