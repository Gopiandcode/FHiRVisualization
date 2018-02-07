const IndividualUser = require('../db/models/user').individual;
const LocalStrategy = require('passport-local').Strategy;

const strategy = new LocalStrategy(
    {
        usernameField: 'email'
    },
    (username, password, done) => {
        IndividualUser.findOne({'email': username}, (err, userMatch) => {
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