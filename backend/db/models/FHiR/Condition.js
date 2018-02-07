const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const bcrypt = require('bcryptjs');
const ObjectId = mongoose.Schema.Types.ObjectId;
let snowmed = require('./SnowmedCodes');

const conditionSchema = new Schema({
    // identifier is implicitly present
    status: {
        type: mongoose.Schema.Types.String,
        enum: ["registered", "preliminary", "final", "amended"],
        required: true
    },
    code: {
        required: true,
        type: [{
            coding: {
                required: true,
                type: [{snowmedCT: {type: String, enum: snowmed.snowmedCTCodes}}]
            }
        }]
    },
    subject: {
        type: ObjectId, ref: 'IndividualUser', required: true
    },
    onset: {
        type: mongoose.Schema.Types.String
    },
    assertedDate: {
        type: mongoose.Schema.Types.Date,
        required: true
    },
    asserter: {
        type: ObjectId,
        ref: 'Company',
        required: true
    },
    stage: {
        type: mongoose.Schema.Types.String
    }
});


const Condition = mongoose.model('Condition', conditionSchema);
module.exports = Condition;
