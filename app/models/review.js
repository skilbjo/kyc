// app/models/review.js

// load the things we need
var mongoose = require('mongoose');

// define the schema for our review model
var reviewSchema = mongoose.Schema({

    attributes              : {
        business_Id         : String,
        user_Id             : String,
        review 				: String
    },

});

// methods ======================

// create the model for business and expose it to our app
module.exports = mongoose.model('Review', reviewSchema);
