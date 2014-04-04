// app/models/business.js

// load the things we need
var mongoose 		= require('mongoose'),
    autoIncrement   = require('mongoose-auto-increment');

// define the schema for our business model
var businessSchema = mongoose.Schema({

    attributes              : {
        name                : String,
        email               : String,
        address             : String,
        phoneNumber         : String,
        updated             : { type: Date, default: Date.now }
    },

});

// autoIncrement the primary key
businessSchema.plugin(autoIncrement.plugin, 'Business');

// methods ======================

// create the model for business and expose it to our app
module.exports = mongoose.model('Business', businessSchema);
