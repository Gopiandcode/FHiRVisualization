const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const bcrypt = require('bcryptjs');
const ObjectId = mongoose.Schema.Types.ObjectId;
mongoose.Promise = Promise;


const associationSchema = new Schema({
    user: {type: ObjectId, ref: 'IndividualUser', required: true},
    company: [{type: ObjectId, ref: 'Company'}]
});


const CompanyAssociation = mongoose.model('CompanyAssociation', associationSchema);
module.exports = CompanyAssociation;