// server.js

// set up ======================================================================
var 
	express  = require('express'),
	app      = express(),
	passport = require('passport'),
	flash 	 = require('connect-flash'),
	mongoose = require('mongoose'),
	hbs  	 = require('hbs'),
    http     = require('http');
	configDB = require('./config/database.js');

// configuration ===============================================================
mongoose.connect(configDB.url); // connect to our database

app.configure(function() {

	// set up our express application
    app.set('port', process.env.PORT || 8080);
	app.use(express.logger('dev')); // log every request to the console
	app.use(express.cookieParser()); // read cookies (needed for auth)
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

// handlebars stuff ===========================================================
hbs.handlebars === require('handlebars');

// register handlebars helpers =================================================

hbs.registerHelper('compare', function (lvalue, operator, rvalue, options) {

    var operators, result;
    
    if (arguments.length < 3) {
        throw new Error("Handlerbars Helper 'compare' needs 2 parameters");
    }
    
    if (options === undefined) {
        options = rvalue;
        rvalue = operator;
        operator = "===";
    }
    
    operators = {
        '==': function (l, r) { return l == r; },
        '===': function (l, r) { return l === r; },
        '!=': function (l, r) { return l != r; },
        '!==': function (l, r) { return l !== r; },
        '<': function (l, r) { return l < r; },
        '>': function (l, r) { return l > r; },
        '<=': function (l, r) { return l <= r; },
        '>=': function (l, r) { return l >= r; },
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
require('./app/routes.js')(app, passport); // load our routes and pass in our app and fully configured passport
require('./config/passport')(passport); // pass passport for configuration

// launch ======================================================================

// development only
if ('development' == app.get('env')) {
  app.use(express.errorHandler());
}

http.createServer(app).listen(app.get('port'), function(){
  console.log('The magic happens on port ' + app.get('port'));
});

// app.listen(port);
// console.log('The magic happens on port ' + port);