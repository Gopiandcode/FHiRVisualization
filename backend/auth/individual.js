function sanitizeUser(user) {
    return {
        email: user.email,
        name: user.name
    };
}
module.exports = (env, passport) => {
    const express = require('express');
    const router = express.Router();
    const IndividualUser = require('../db/models/user').individual;
    const sanitizeError = require('../sanitizeError');

    router.post('/login',
        passport.authenticate('individual'),
        (req, res) => {
            res.json({user: sanitizeUser(req.user)});
        });

    router.post('/logout', (req, res) => {
        if (req.user) {
            req.session.destroy();
            res.clearCookie();
            return res.json({msg: 'LOGGED_OUT'});
        } else {
            res.json({error: 'NO_USER'});
        }
    });

    router.post('/signup', (req, res) => {
        const {email, password, name} = req.body;


        IndividualUser.findOne({'email': email}, (err, userMatch) => {
            if (err) {
                return res.json(sanitizeError(env, err));
            }
            if (userMatch) {
                return res.json({
                    error: 'USER_EXISTS'
                });
            }

            const newUser = new IndividualUser({
                'email': email,
                'password': password,
                "name": name
            });


            newUser.save((err, savedUser) => {
                if (err) {
                    return res.json(sanitizeError(env, err));
                } else {
                    return res.json({
                        email: savedUser.email,
                        name: savedUser.name
                    });
                }
            });
        });
    });


    return router;
};