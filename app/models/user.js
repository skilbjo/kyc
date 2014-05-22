var mongoose        = require('mongoose'),
    bcrypt          = require('bcrypt-nodejs'),
    autoIncrement   = require('mongoose-auto-increment');

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
    info            : {
        firstName       : String,
        lastName        : String,
        mobileNo        : String,
        streetAddress   : String,
        cityAddress     : String,
        stateAddress    : String        
    },
    admin            : {  isAdmin : Boolean },
    company          : { type: Number, ref: 'Company'}
});

// autoIncrement the primary key
userSchema.plugin(autoIncrement.plugin, 'User');

// methods ======================
userSchema.methods.generateHash = function(password) {
    return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
};

userSchema.methods.validPassword = function(password) {
    return bcrypt.compareSync(password, this.local.password);
};

module.exports = mongoose.model('User', userSchema);
