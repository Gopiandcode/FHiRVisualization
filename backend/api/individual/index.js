module.exports = (env) => {
    const express = require('express');
    const router = express.Router();
    const preferences = require('./preferences');
    const associations = require('./associations');
    const goals = require('./goals');

    router.use((req, res, next) => {
        if (req.user.isCorporate) {
            res.send(403, 'Unauthorized');
        } else {
            next();
        }
    });

    preferences(env, router);
    associations(env, router);
    goals(env, router);


    return router;
};