const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const bcrypt = require('bcryptjs');
const ObjectId = mongoose.Schema.Types.ObjectId;
mongoose.Promise = Promise;


const VALID_SCHEMAS = [
    "HeartRate", "BodyHeight", "BodyWeight", "BloodPressureSystolicAndDiastolic", "BMI",
    "Observation", "Condition", "FamilyMemberHistory", "MedicationStatement.js", "Patient", "Organization"
];

const VALID_VISUALIZATIONS = [
    "BarChartDaily", "BarChartWeekly", "LineGraphWeekly", "DoughnutDaily", "LineGraphAnnual"
];


const AGGREGATE_VISUALIZATIONS_SECONDARY_NEEDED = {
    "BarChart": false,
    "LineGraph": true,
    "DoughnutChart": false
};

const VALID_AGGREGATE_VISUALIZATIONS = Object.keys(AGGREGATE_VISUALIZATIONS_SECONDARY_NEEDED);
/*[
 "BarChart", "LineGraph", "DoughnutChart"
 ];*/


const COLORS = ['red', 'blue', 'green', 'yellow', 'white'];

const DATA_SPECIFICATION = {
    "HeartRate": {
        name: "Heart Rate",
        profile: "HeartRate",
        validVisualizations: [
            "DoughnutDaily"
        ]
    },
    "BodyHeight": {
        name: "Body Height",
        profile: "BodyHeight",
        validVisualizations: [
            "LineGraphWeekly",
            "LineGraphAnnual"
        ]
    },
    "BodyWeight": {
        name: "Body Weight",
        profile: "BodyWeight",
        validVisualizations: [
            "LineGraphWeekly",
            "LineGraphAnnual"
        ]
    },
    "BloodPressure": {
        name: "Blood Pressure",
        profile: "BloodPressure",
        validVisualizations: [
            "LineGraphWeekly",
            "LineGraphAnnual"
        ]
    },
    "SystolicAndDiastolic": {
        name: "Systolic Blood Pressure",
        profile: "SystolicAndDiastolicSystolicAndDiastolic",
        validVisualizations: [
            "LineGraphWeekly",
            "LineGraphAnnual"
        ]
    },
    "BMI": {
        name: "Body mass Index",
        profile: "BMI",
        validVisualizations: [
            "LineGraphAnnual",
            "BarChartWeekly"
        ]
    }
};

const VALID_DATA_TYPES = Object.keys(DATA_SPECIFICATION);
/*[
 "HeartRate",
 "BodyHeight",
 "BodyWeight",
 "BloodPressureSystolicAndDiastolic",
 "BMI"
 ]; */


module.exports = {
    DATA_SPECIFICATION,
    VALID_DATA_TYPES,
    VALID_SCHEMAS,
    VALID_VISUALIZATIONS,
    VALID_AGGREGATE_VISUALIZATIONS,
    AGGREGATE_VISUALIZATIONS_SECONDARY_NEEDED,
    COLORS
};
