function sanitizeUser(user) {
    return {
        email: user.email
    };
}

module.exports = (env, passport) => {
    const express = require('express');
    const router = express.Router();
    const CorporateUser = require('../db/models/user').corporate;
    const Company = require('../db/models/company');
    const sanitizeError = require('../sanitizeError');

    function storeUser(username, password, id, callback) {
        const newUser = new CorporateUser({
            'email': username,
            'password': password,
            'company': id
        });


        newUser.save((err, savedUser) => {
            if (err) {
                if (!env.PRODUCTION) {
                    return callback({error: err});
                } else {
                    return callback({error: 'UNKNOWN'});
                }
            } else {
                return callback(sanitizeUser(savedUser));
            }
        });
    }

    router.post('/login',
        (req, res, next) => {
            console.log("Got request");
            next();
        },
        passport.authenticate('corporate'),
        (req, res) => {
            // Needed to get remove all Mongoose bindings
            return res.json({user: sanitizeUser(req.user)});
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
        const {email, password, domain, name} = req.body;


        CorporateUser.findOne({'email': email}, (err, userMatch) => {
            if (err)
                return res.json(sanitizeError(env, err));
            if (userMatch) {
                return res.json({
                    error: 'USER_EXISTS'
                });
            }

            Company.findOne({"domain": domain}, (err, companyMatch) => {
                if (err)
                    return res.json(sanitizeError(env, err));
                if (companyMatch) {
                    if (companyMatch.name != name) {
                        return res.json({
                            error: 'COMPANY_NAME_DOES_NOT_MATCH'
                        });
                    }
                    storeUser(email, password, companyMatch._id, (data) => {
                        return res.json(data);
                    })

                } else {
                    new Company({
                        'domain': domain,
                        'name': name
                    }).save((err, savedCompany) => {
                        if (err) {
                            return res.json(sanitizeError(env, err));
                        }

                        storeUser(email, password, savedCompany._id, (data) => {
                            return res.json(data);
                        })
                    });


                }
            });
        });
    });


    return router;
};