module.exports = function(app, passport, models, controllers) {

// static routes ===============================================================
  app.get('/', controllers.static_pages.index);

  app.get('/logout', controllers.users.logout);

// =============================================================================
// USERS =======================================================================
// =============================================================================
  // RESTful API ======================
  app.get('/users', isAdmin, function(req, res) { controllers.users.index(req, res, models); }); //index method (path is /users) is made available only for admin users and is in hbs view logic

  app.get('/users/new', isLoggedIn, function(req, res) { controllers.users.new(req, res, models); });

  app.post('/users', isLoggedIn,    function(req, res) { controllers.users.create(req, res, models); } ); // add in the additional fields

  app.get('/users/:id([0-9]+)', isLoggedIn, function(req, res) { controllers.users.show(req, res, models); });

  app.get('/users/:id/edit', controllers.users.edit );

  app.post('/users/:id([0-9]+)', isLoggedIn, function(req, res) { controllers.users.update(req, res, models); });

  //app.delete('/users/:id', users.destroy) destroy will not be made available from the application

  // Not RESTful API =================
  app.get('/users/:id/associate', isLoggedIn, function(req, res) { controllers.users.associate(req, res, models); });

// =============================================================================
// COMPANIES ====================================================================
// =============================================================================
  // RESTful API ======================
  app.get('/companies', function(req, res) { controllers.companies.index(req, res, models); }); //index method (path is /users) is made available only for admin users and is in hbs view logic

  app.get('/companies/new', function(req, res) { controllers.companies.new(req, res, models); });

  app.post('/companies',    function(req, res) { controllers.companies.create(req, res, models); }); // add in the additional fields

  app.get('/companies/:id([0-9]+)', function(req, res) { controllers.companies.show(req, res, models); });

  app.get('/companies/:id/edit', controllers.companies.edit );

  app.post('/companies/:id([0-9]+)', function(req, res) { controllers.companies.update(req, res, models); });

// =============================================================================
// CLIENTS =====================================================================
// =============================================================================
  // RESTful API ======================
  app.get('/clients', function(req, res) { controllers.clients.index(req, res, models); }); //index method (path is /users) is made available only for admin users and is in hbs view logic

  app.get('/clients/new', function(req, res) { controllers.clients.new(req, res, models); });

  app.post('/clients',    function(req, res) { controllers.clients.create(req, res, models); }); // add in the additional fields

  app.get('/clients/:id([0-9]+)', function(req, res) { controllers.clients.show(req, res, models); });

  app.get('/clients/:id/edit', controllers.clients.edit );

  app.post('/clients/:id([0-9]+)', function(req, res) { controllers.clients.update(req, res, models); });

// =============================================================================
// AUTHENTICATE (FIRST LOGIN) ==================================================
// =============================================================================
  // facebook -------------------------------
  app.get('/auth/facebook', passport.authenticate('facebook', { scope : 'email' }));   
  app.get('/auth/facebook/callback', passport.authenticate('facebook'), function(req, res) { res.redirect('/users/' + req.user._id); }); 

  // twitter --------------------------------
  app.get('/auth/twitter', passport.authenticate('twitter', { scope : 'email' }));
  app.get('/auth/twitter/callback', passport.authenticate('twitter'),   function(req, res) { res.redirect('/users/' + req.user._id); });

  // google ---------------------------------
  app.get('/auth/google', passport.authenticate('google', { scope : ['profile', 'email'] }));
  app.get('/auth/google/callback', passport.authenticate('google'), function(req, res) { res.redirect('/users/' + req.user._id); });

// =============================================================================
// AUTHORIZE (ALREADY LOGGED IN / CONNECTING OTHER SOCIAL ACCOUNT) =============
// =============================================================================
  // facebook -------------------------------
  app.get('/connect/facebook', passport.authorize('facebook', { scope : 'email' }));
  app.get('/connect/facebook/callback', passport.authorize('facebook'), function(req, res) { res.redirect('/users/' + req.user._id); });

  // twitter --------------------------------
  app.get('/connect/twitter', passport.authorize('twitter', { scope : 'email' }));
  app.get('/connect/twitter/callback', passport.authorize('twitter'), function(req, res) { res.redirect('/users/' + req.user._id); });

  // google ---------------------------------
  app.get('/connect/google', passport.authorize('google', { scope : ['profile', 'email'] }) );
  app.get('/connect/google/callback', passport.authorize('google'), function(req, res) { res.redirect('/users/' + req.user._id); });

// =============================================================================
// UNLINK ACCOUNTS =============================================================
// =============================================================================
  // facebook -------------------------------
  app.get('/unlink/facebook', function(req, res) { controllers.users.unlinkFacebook(req, res); });

  // twitter --------------------------------
  app.get('/unlink/twitter', function(req, res) { controllers.users.unlinkTwitter(req, res); });

  // google ---------------------------------
  app.get('/unlink/google', function(req, res) { controllers.users.unlinkGoogle(req, res); });
};

function isLoggedIn(req, res, next) {
  if (req.isAuthenticated())
          return next();
  res.redirect('/');
}

function isAdmin(req, res, next) {
  if (req.isAuthenticated() && req.user.admin.isAdmin) {
    return next();
  } else {
  res.redirect('/');
  }
}

