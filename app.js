var express = require('express');
var app = express();
var hbs = require('hbs');
passport = require("passport");
LocalStrategy = require('passport-local').Strategy;
FacebookStrategy = require('passport-facebook').Strategy;

mongoose.connect("mongodb://localhost/myapp");

app.use(express.cookieParser());
app.use(express.bodyParser());
app.use(express.session({ secret: 'SECRET' }));
app.use(passport.initialize());
app.use(passport.session());
 
app.set('view engine', 'html');
app.engine('html', hbs.__express);
app.use(express.bodyParser());
 
app.get('/', function(req, res) {
   res.render('index',{title:"Passport"});
});
 
app.get('/about', function(req, res) {
   res.render('about', {title:"About Me"});
});

app.post('/login',
  passport.authenticate('local'),
  function(req, res) {
app.post('/login',
  passport.authenticate('local', { successRedirect: '/',
                                   failureRedirect: '/login' }));
    res.redirect('/users/' + req.user.username);
  });
  
app.listen(3000);