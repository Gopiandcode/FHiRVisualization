const CorporateUser = require('../db/models/user').corporate;
const LocalStrategy = require('passport-local').Strategy;

const strategy = new LocalStrategy(
    {
        usernameField: 'email'
    },
    (username, password, done) => {
        CorporateUser.findOne({'email': username}, (err, userMatch) => {
            if (err)
                return done(err);
            if (!userMatch)
                return done(null, false, {message: 'Incorrect Email'});
            if (!userMatch.checkPassword(password))
                return done(null, false, {message: 'Incorrect password'});
            return done(null, userMatch);
        });
    });
module.exports = strategy;