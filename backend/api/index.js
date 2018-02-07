module.exports = (env) => {
    const express = require('express');
    const router = express.Router();
    const corporate = (require('./corporate'))(env);
    const individual = (require('./individual'))(env);
    const data = require('./data')(env);
    const visualizations = require('./visualizations')(env);

   router.use((req, res, next) => {
        if(!req.user){
            res.send(403, 'Unauthorized');
        } else {
            next();
        }
    });



    router.use('/corporate', corporate);
    router.use('/individual', individual);
    router.use('/data', data);
    router.use('/visualizations', visualizations);

    return router;
}