const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const bcrypt = require('bcryptjs');
const ObjectId = mongoose.Schema.Types.ObjectId;
mongoose.Promise = Promise;


const individualUserSchema = new Schema({
  email: { type: String, unique: true, required: true },
  password: { type: String, unique: false, required: true },
  name: {
        type: String,
        required: true
  }
});

const corporateUserSchema = new Schema({
  email: { type: String, unique: true, required: true },
  password: { type: String, unique: false, required: true },
  company:  {type: ObjectId, ref: 'Company', required: true}
});


individualUserSchema.methods = {
    checkPassword: function(inputPassword) {
        return bcrypt.compareSync(inputPassword, this.password);
    },
    hashPassword: function(plainTextPassword) {
        return bcrypt.hashSync(plainTextPassword, 10);
    }
};

individualUserSchema.pre('save', function(next) {
    if(!(this.password)){
        next();
    } else {
        this.password = this.hashPassword(this.password);
        next();
    }
});


corporateUserSchema.methods = {
    checkPassword: function(inputPassword) {
        return bcrypt.compareSync(inputPassword, this.password);
    },
    hashPassword: function(plainTextPassword) {
        return bcrypt.hashSync(plainTextPassword, 10);
    }
};

corporateUserSchema.pre('save', function(next) {
    if(!(this.password)){
        next();
    } else {
        this.password = this.hashPassword(this.password);
        next();
    }
});

individualUserSchema.virtual('isCorporate').get(function() { return false;});
corporateUserSchema.virtual('isCorporate').get(function() {return true;});

const IndividualUser = mongoose.model('IndividualUser', individualUserSchema);
const CorporateUser = mongoose.model('CorporateUser', corporateUserSchema);
module.exports = {
    individual: IndividualUser,
    corporate: CorporateUser
};