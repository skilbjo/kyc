// app/models/company.js
var mongoose 		= require('mongoose'),
    autoIncrement   = require('mongoose-auto-increment');

// define the schema for our company model
var clientSchema = mongoose.Schema({
    name                : String,
    email               : String,
    streetAddress       : String,
    cityAdldress 		: String,
    stateAddress		: String,
    phoneNumber         : String,
    updated             : { type: Date, default: Date.now },
    users : { type: Number, ref: 'User' }
});

// autoIncrement the primary key
clientSchema.plugin(autoIncrement.plugin, 'Client');

// methods ======================
module.exports = mongoose.model('Client', clientSchema);