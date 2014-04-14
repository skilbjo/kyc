// app/routes.js

module.exports = function(app, passport, models, controllers) {

// normal routes ===============================================================
  app.get('/', controllers.static_pages.index);

  app.get('/login', controllers.static_pages.getLogin);
  
  app.post('/login', passport.authenticate('local-login'), function(req, res) { res.redirect('/users/' + req.user._id) });

  app.get('/logout', controllers.users.logout);

// =============================================================================
// USERS =======================================================================
// =============================================================================
  // RESTful API

  //app.get('/users', users.show); index method (path is /users) is made available only for admin users and is in hbs view logic

  app.get('/users/new', controllers.users.new );

  app.post('/users', passport.authenticate('local-signup'), function(req, res) { controllers.users.create(req, res) } );

  app.get('/users/:id([0-9]+)', isLoggedIn, function(req, res) { controllers.users.show(req, res, models) } );

  app.get('/users/:id/edit', controllers.users.edit );

  app.post('/users/:id([0-9]+)', isLoggedIn, function(req, res) { controllers.users.update(req, res, models) } );

  //app.delete('/users/:id', users.destroy) destroy will not be made available from the application

// =============================================================================
// AUTHENTICATE (FIRST LOGIN) ==================================================
// =============================================================================
  // facebook -------------------------------
  app.get('/auth/facebook', passport.authenticate('facebook', { scope : 'email' }));    
  app.get('/auth/facebook/callback', passport.authenticate('facebook'), function(req, res) { res.redirect('/users/' + req.user._id) } );

  // twitter --------------------------------
  app.get('/auth/twitter', passport.authenticate('twitter', { scope : 'email' }));
  app.get('/auth/twitter/callback', passport.authenticate('twitter'),   function(req, res) { res.redirect('/users/' + req.user._id) } );

  // google ---------------------------------
  app.get('/auth/google', passport.authenticate('google', { scope : ['profile', 'email'] }));
  app.get('/auth/google/callback', passport.authenticate('google'), function(req, res) { res.redirect('/users/' + req.user._id) } );

// =============================================================================
// AUTHORIZE (ALREADY LOGGED IN / CONNECTING OTHER SOCIAL ACCOUNT) =============
// =============================================================================
  // locally --------------------------------
  app.get('/connect/local', function(req, res) { res.render('connect-local.hbs', { message: req.flash('loginMessage') , user : req.user }); });
  app.post('/connect/local', passport.authenticate('local-signup'), function(req, res) { res.redirect('/users/' + req.user._id) } );

  // facebook -------------------------------
  app.get('/connect/facebook', passport.authorize('facebook', { scope : 'email' }));
  app.get('/connect/facebook/callback', passport.authorize('facebook'), function(req, res) { res.redirect('/users/' + req.user._id) } );

  // twitter --------------------------------
  app.get('/connect/twitter', passport.authorize('twitter', { scope : 'email' }));
  app.get('/connect/twitter/callback', passport.authorize('twitter'), function(req, res) { res.redirect('/users/' + req.user._id) } );

  // google ---------------------------------
  app.get('/connect/google', passport.authorize('google', { scope : ['profile', 'email'] }) );
  app.get('/connect/google/callback', passport.authorize('google'), function(req, res) { res.redirect('/users/' + req.user._id) } );

// =============================================================================
// UNLINK ACCOUNTS =============================================================
// =============================================================================
  // local -----------------------------------
  app.get('/unlink/local', function(req, res) { controllers.users.unlinkLocal(req, res) } );

  // facebook -------------------------------
  app.get('/unlink/facebook', function(req, res) { controllers.users.unlinkFacebook(req, res) } );

  // twitter --------------------------------
  app.get('/unlink/twitter', function(req, res) { controllers.users.unlinkTwitter(req, res) } );

  // google ---------------------------------
  app.get('/unlink/google', function(req, res) { controllers.users.unlinkGoogle(req, res) } );

};

// route middleware to ensure user is logged in
function isLoggedIn(req, res, next) {
  if (req.isAuthenticated())
          return next();
  res.redirect('/');
}