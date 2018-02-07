module.exports = (env) => {
    const mongoose = require('mongoose');
    mongoose.Promise = Promise;

    if(env.PRODUCTION) {
        console.log("Connecting to " + env.MONGODB_URL);
        mongoose.connect(env.MONGODB_URL, { useMongoClient: true});
    } else {
        console.log("Connecting to " + env.MONGODB_DEV_URL);
        mongoose.connect(env.MONGODB_DEV_URL, { useMongoClient: true});
    }

    const db = mongoose.connection;

    db.on('error', err => {
        console.log('There was an error connecting to the database: ' + err);
    });

    db.once('open', () => {
        console.log("Successfully connected to the database");
    });

    return db;
}