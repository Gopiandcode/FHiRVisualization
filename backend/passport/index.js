module.exports = (env) => {
    const passport = require('passport');
    const IndividualLocalStrategy = require('./individualLocalStrategy');
    const CorporateLocalStrategy = require('./corporateLocalStrategy');
    const User = require('../db/models/user');

    // Multiple User types
    // Reference:  https://github.com/jaredhanson/passport/issues/50
    passport.serializeUser((user, done) => {
        let type = "company" in user ? 'CORPORATE' : 'INDIVIDUAL';
        done(null, { id: user._id, type });
    });

    passport.deserializeUser((key, done) => {
        console.log("Deserializing user");
        if(key.type == 'CORPORATE') {
           User.corporate.findOne({_id: key.id}, (err, user) => { 
               done(null, user)
            }) ;
        } else if(key.type == 'INDIVIDUAL') {
           User.individual.findOne({_id: key.id}, (err, user) => { 
               done(null, user)
            });
        } else {
            done(null, null);
        }
   });


    passport.use('individual', IndividualLocalStrategy);
    passport.use('corporate', CorporateLocalStrategy);

    return passport;
}