// app/models/business.js

// load the things we need
var mongoose 		= require('mongoose'),
    autoIncrement   = require('mongoose-auto-increment');

// define the schema for our business model
var companySchema = mongoose.Schema({

    attributes              : {
        name                : String,
        email               : String,
        address             : String,
        phoneNumber         : String,
        updated             : { type: Date, default: Date.now }
    },
    user : { type: Number, ref: 'User' }
});

// autoIncrement the primary key
companySchema.plugin(autoIncrement.plugin, 'Company');

// methods ======================

// create the model for business and expose it to our app
module.exports = mongoose.model('Company', companySchema);
