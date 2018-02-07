const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const bcrypt = require('bcryptjs');
const ObjectId = mongoose.Schema.Types.ObjectId;
mongoose.Promise = Promise;


const companySchema = new Schema({
    domain: {type: String, required: true},
    name: {type: String, required: true}
});


const Company = mongoose.model('Company', companySchema);
module.exports = Company;