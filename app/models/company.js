// app/models/company.js

// load the things we need
var mongoose 		= require('mongoose'),
    autoIncrement   = require('mongoose-auto-increment');

// define the schema for our company model
var companySchema = mongoose.Schema({

    attributes              : {
        name                : String,
        email               : String,
        streetAddress       : String,
        cityAddress 		: String,
        stateAddress		: String,
        phoneNumber         : String,
        updated             : { type: Date, default: Date.now }
    },
    users : { type: Number, ref: 'User' }
});

// autoIncrement the primary key
companySchema.plugin(autoIncrement.plugin, 'Company');

// methods ======================

// create the model for company and expose it to our app
module.exports = mongoose.model('Company', companySchema);
