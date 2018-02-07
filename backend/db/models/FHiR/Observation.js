const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const bcrypt = require('bcryptjs');
const ObjectId = mongoose.Schema.Types.ObjectId;
let snowmed = require('./SnowmedCodes');

const observationSchema = new Schema({
    // identifier is implicitly present
    status: {type: String, enum: ["registered", "preliminary", "final", "amended"], required: true},
    category: {
        type: [{
            coding: {
                type: [{snowmedCT: {type: String, enum: snowmed.snowmedCategoryCodes}}]
            }
        }]
    },
    code: {
        type: [{
            coding: {
                type: [{snowmedCT: {type: String, enum: snowmed.snowmedCTCodes, required: true}}],
                required: true
            }
        }]
    },
    subject: {
        type: ObjectId, ref: 'IndividualUser', required: true
    },
    effective: {
        type: mongoose.Schema.Types.Date,
        required: true
    },
    issued: {
        type: mongoose.Schema.Types.Date,
        required: true
    },
    performer: {
        type: ObjectId,
        ref: 'Company',
        required: true
    },
    value: {
        type: String,
        required: true
    },
    comment: {
        type: String
    },
    bodySite: {
        type: [{
            coding: {
                type: [{snowmedCT: {type: String, enum: snowmed.snowmedBodySiteCodes}}]
            }
        }]
    },
    method: {
        type: [{
            coding: {
                type: [{snowmedCT: {type: String, enum: snowmed.snowmedMethodCodes}}]
            },
            text: {type: String}
        }]
    },
    device: {
        type: String
    }
});


const Observation = mongoose.model('Observation', observationSchema);
module.exports = Observation;
