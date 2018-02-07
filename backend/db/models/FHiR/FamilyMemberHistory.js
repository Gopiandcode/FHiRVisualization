const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const bcrypt = require('bcryptjs');
const ObjectId = mongoose.Schema.Types.ObjectId;
let snowmed = require('./SnowmedCodes');

const familyMemberSchema = new Schema({
    // identifier is implicitly present
    status: {
        type: mongoose.Schema.Types.String,
        enum: ["registered", "preliminary", "final", "amended"],
        required: true
    },
    patient: {type: ObjectId, ref: 'IndividualUser', required: true},
    date: {type: mongoose.Schema.Types.Date},
    relationship: {
        required: true,
        type: [{
            coding: {
                required: true,
                type: [{snowmedCT: {type: String, enum: snowmed.snowmedRelationshipCodes}}]
            }
        }]
    },
    gender: {
        type: mongoose.Schema.Types.String
    },
    age: {
        type: mongoose.Schema.Types.String
    },
    estimatedAge: {
        type: mongoose.Schema.Types.String
    },
    deceased: {
        type: mongoose.Schema.Types.String
    },
    condition: {
        type: [{
            coding: {
                required: true,
                type: [{snowmedCT: {type: String, enum: snowmed.snowmedConditionCodes}}]
            },
            outcome: {type: mongoose.Schema.Types.String},
            onset: {type: mongoose.Schema.Types.String}
        }]
    },
    recorder: {
        type: ObjectId,
        required: true
    },
});


const FamilyMember = mongoose.model('FamilyMember', familyMemberSchema);
module.exports = FamilyMember;
