// app/models/user.js

// load the things we need
var mongoose        = require('mongoose'),
    bcrypt          = require('bcrypt-nodejs'),
    autoIncrement   = require('mongoose-auto-increment');

// configuration ===============================================================

// define the schema for our user model
var userSchema = mongoose.Schema({
    facebook         : {
        id              : String,
        token           : String,
        email           : String,
        name            : String
    },
    twitter          : {
        id              : String,
        token           : String,
        displayName     : String,
        username        : String
    },
    google           : {
        id              : String,
        token           : String,
        email           : String,
        name            : String
    },
    info            : {
        firstName       : String,
        lastName        : String,
        mobileNo        : String,
        streetAddress   : String,
        cityAddress     : String,
        stateAddress    : String        
    },
    admin            : {
        isAdmin         : Boolean
    },
    // local            : {   // no more local
    //     email           : String,
    //     password        : String,
    //     salt            : String
    // },
});

// autoIncrement the primary key
userSchema.plugin(autoIncrement.plugin, 'User');

// methods ======================
// generating a hash
userSchema.methods.generateHash = function(password) {
    return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
};

// checking if password is valid
userSchema.methods.validPassword = function(password) {
    return bcrypt.compareSync(password, this.local.password);
};

// validation... should this go in config/passport.js or in the model?
function emailValidation(email, next, err) {
    if ( email == /^\w+([-+.']\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/ ) {
        next();
    } else {
        throw err;
    };
};

function phoneValidation(phone, next, err) {
    if ( phone == /^[0-9]+$/ /*regex for phone number*/ ) {
        next();
    } else {
        throw err;
    };
};

// create the model for users and expose it to our app
module.exports = mongoose.model('User', userSchema);
