const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const bcrypt = require('bcryptjs');
const Data = require('./data');
const ObjectId = mongoose.Schema.Types.ObjectId;
mongoose.Promise = Promise;


const individualPreferenceSchema = new Schema({
    user: {type: ObjectId, ref: 'IndividualUser', required: true},
    dataType: {
        type: String, enum: Data.VALID_DATA_TYPES,
        required: true,
    },
    colour: {type: String, enum: Data.COLORS, required: true},
    visualization: [{type: String, enum: Data.VALID_VISUALIZATIONS}]
}, { usePushEach: true });

const corporatePreferenceSchema = new Schema({
    user: {type: ObjectId, ref: 'CorporateUser', required: true},
    mainDataType: {type: String, enum: Data.VALID_DATA_TYPES, required: true},
    secondaryDataType: {type: String, enum: [...Data.VALID_DATA_TYPES, "Time"], required: false},
    colour: {type: String, enum: Data.COLORS, required: true},
    visualization: {type: String, enum: Data.VALID_AGGREGATE_VISUALIZATIONS, required: true}
}, { usePushEach: true });


const IndividualVisualizationPreference = mongoose.model('IndividualVisualizationPreference', individualPreferenceSchema);
const CorporateVisualizationPreference = mongoose.model('CorporateVisualizationPreference', corporatePreferenceSchema);

module.exports = {
    individual: IndividualVisualizationPreference,
    corporate: CorporateVisualizationPreference
};
