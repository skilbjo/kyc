// server.js

// set up ======================================================================
var 
    http            = require('http'),
    flash           = require('connect-flash'),
    express         = require('express'),
    app             = module.exports = express(),
    hbs  	        = require('hbs'),
    passport        = require('passport'),
    configDB        = require('./config/database.js')
    mongoose        = require('mongoose'),
    autoIncrement   = require('mongoose-auto-increment');

// configuration ===============================================================
var connection = mongoose.connect(configDB.url); // connect to our database
autoIncrement.initialize(connection);

app.configure(function() {
	// set up our express application
    app.set('port', process.env.PORT || 8080);
    app.use(express.favicon());
    app.use(express.logger('dev')); // log every request to the console
	app.use(express.cookieParser()); // read cookies (needed for auth)
    app.use(express.methodOverride());
	app.use(express.urlencoded()); // get information from html forms
	app.use(express.json());

	// handlebars engine for templating :-}
	app.set('view engine', 'hbs');
	app.set('views', __dirname + '/app/views');

	// required for passport
	app.use(express.session({ secret: 'passportapp' })); // session secret
	app.use(passport.initialize());
	app.use(passport.session()); // persistent login sessions
	app.use(flash()); // use connect-flash for flash messages stored in session
});

// register handlebars helpers =================================================
hbs.handlebars === require('handlebars');
hbs.registerHelper('compare', function (lvalue, operator, rvalue, options) {
    var operators, result;
    
    if (options === undefined) {
        options = rvalue;
        rvalue = operator;
        operator = "===";
    }
    
    operators = {
        '=='    : function (l, r) { return l == r; },
        '==='   : function (l, r) { return l === r; },
        '!='    : function (l, r) { return l != r; },
        '!=='   : function (l, r) { return l !== r; },
        '<'     : function (l, r) { return l < r; },
        '>'     : function (l, r) { return l > r; },
        '<='    : function (l, r) { return l <= r; },
        '>='    : function (l, r) { return l >= r; },
        'typeof': function (l, r) { return typeof l == r; }
    };
    
    if (!operators[operator]) {
        throw new Error("Handlerbars Helper 'compare' doesn't know the operator " + operator);
    }
    
    result = operators[operator](lvalue, rvalue);
    
    if (result) {
        return options.fn(this);
    } else {
        return options.inverse(this);
    }

});

// routes ======================================================================
// models =============
var models = {
    users       : require('./app/models/user.js'),
    business    : require('./app/models/business.js'),
    reviews     : require('./app/models/review.js')
};

// controllers ========
var controllers = {
    static_pages  : require('./app/controllers/static_pages.js'),
    users         : require('./app/controllers/users.js'),
    business      : require('./app/controllers/business.js'),
    reviews       : require('./app/controllers/review.js'),
};

require('./app/routes.js')(app, passport, models, controllers);
require('./config/passport')(passport); // pass passport for configuration

// launch ======================================================================
if ('development' == app.get('env')) {
  app.use(express.errorHandler());
}

http.createServer(app).listen(app.get('port'), function(){
  console.log('The magic happens on port ' + app.get('port'));
});




