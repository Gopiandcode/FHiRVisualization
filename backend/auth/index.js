function sanitizeUser(user) {

    return {
        email: user.email,
        type: user.isCorporate ? 'CORPORATE' : 'INDIVIDUAL'
    };
}

module.exports = (env, passport) => {
    const express = require('express');
    const router = express.Router();
    const Individual = require('./individual')(env, passport);
    const Corporate  = require('./corporate')(env, passport);

    router.get('/user', (req,res,next) => {
        if(req.user) {
            return res.json(sanitizeUser(req.user));
        } else {
            return res.json(null);
        }
    });


        router.post('/logout', (req,res) =>{
            if(req.user) {
                req.session.destroy();
                res.clearCookie();
                return res.json({msg: 'LOGGED_OUT'});
            } else {
                res.json({error: 'NO_USER'});
            }
        });

        router.use('/individual', Individual);
        router.use('/corporate', Corporate);

        return router;
}