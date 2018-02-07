const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const Data   = require('./data');
const ObjectId = mongoose.Schema.Types.ObjectId;
const Number = mongoose.Schema.Types.Number;
mongoose.Promise = Promise;


const GOAL_PERIODS = ['DAY', 'WEEK', 'FORTNIGHT', 'MONTH'];

const goalSchema = new Schema({
    user: {type: ObjectId, ref: 'IndividualUser', required: true},
    dataType: {type: String, enum: Data.VALID_DATA_TYPES},
    name: { type: String, required: true, unique: true},
    value: { type: Number , required: true},
    period:  { type: String, enum: GOAL_PERIODS, required: true},
    colour:  { type: String, enum: Data.COLORS, required: true}
});


const Goal = mongoose.model('Goal', goalSchema);

module.exports = {
    Goal: Goal,
    GOAL_PERIODS: GOAL_PERIODS
};
