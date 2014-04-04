// app/models/review.js

// load the things we need
var mongoose = require('mongoose'),
    autoIncrement   = require('mongoose-auto-increment');

// define the schema for our review model
var reviewSchema = mongoose.Schema({

    attributes              : {
        business_Id         : String,
        user_Id             : String,
        review 				: String
    },

});

// autoIncrement the primary key
reviewSchema.plugin(autoIncrement.plugin, 'Review');

// methods ======================

// create the model for business and expose it to our app
module.exports = mongoose.model('Review', reviewSchema);
