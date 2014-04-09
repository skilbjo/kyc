// app/routes.js

module.exports = function(app, passport, models, controllers) {

// normal routes ===============================================================
  app.get('/', controllers.static_pages.index);

  app.get('/login', controllers.static_pages.getLogin);
  
  app.post('/login', passport.authenticate('local-login'), function(req, res) { res.redirect('/profile/' + req.user._id) });

  app.get('/logout', controllers.users.logout);

// =============================================================================
// USERS =======================================================================
// =============================================================================
  // index method (path is /users) is made available only for admin users and is in hbs view logic

  app.get('/users/new', controllers.users.new );

  app.post('/users', passport.authenticate('local-signup'), function(req, res) { controllers.users.create(req, res) } );

  app.get('/profile/:id([0-9]+)', isLoggedIn, function(req, res) { controllers.users.show(req, res, models) } );

  app.get('/profile/:id/edit', controllers.users.edit );

  app.post('/profile/:id([0-9]+)', isLoggedIn, function(req, res) { controllers.users.update(req, res, models) } );

  // destroy will not be made available from the application

// =============================================================================
// AUTHENTICATE (FIRST LOGIN) ==================================================
// =============================================================================
  // facebook -------------------------------
  app.get('/auth/facebook', passport.authenticate('facebook', { scope : 'email' }));
        
  app.get('/auth/facebook/callback', passport.authenticate('facebook'), function(req, res) { res.redirect('/profile/' + req.user._id) } );

  // twitter --------------------------------
  app.get('/auth/twitter', passport.authenticate('twitter', { scope : 'email' }));

  app.get('/auth/twitter/callback', passport.authenticate('twitter'),   function(req, res) { res.redirect('/profile/' + req.user._id) } );

  // google ---------------------------------
  app.get('/auth/google', passport.authenticate('google', { scope : ['profile', 'email'] }));

  // the callback after google has authenticated the user
  app.get('/auth/google/callback', passport.authenticate('google'),     function(req, res) { res.redirect('/profile/' + req.user._id) } );

// =============================================================================
// AUTHORIZE (ALREADY LOGGED IN / CONNECTING OTHER SOCIAL ACCOUNT) =============
// =============================================================================
  // locally --------------------------------
    app.get('/connect/local', function(req, res) {
            res.render('connect-local.hbs', { message: req.flash('loginMessage') });
    });
    app.post('/connect/local', passport.authenticate('local-signup', {
            successRedirect : '/profile', // redirect to the secure profile section
            failureRedirect : '/connect/local', // redirect back to the signup page if there is an error
            failureFlash : 'Invalid username or password.' // allow flash messages
    }));

  // facebook -------------------------------
    // send to facebook to do the authentication
    app.get('/connect/facebook', passport.authorize('facebook', { scope : 'email' }));

    // handle the callback after facebook has authorized the user
    app.get('/connect/facebook/callback',
            passport.authorize('facebook', {
                    successRedirect : '/profile',
                    failureRedirect : '/'
            }));

  // twitter --------------------------------
    // send to twitter to do the authentication
    app.get('/connect/twitter', passport.authorize('twitter', { scope : 'email' }));

    // handle the callback after twitter has authorized the user
    app.get('/connect/twitter/callback',
            passport.authorize('twitter', {
                    successRedirect : '/profile',
                    failureRedirect : '/'
            }));


  // google ---------------------------------
    // send to google to do the authentication
    app.get('/connect/google', passport.authorize('google', { scope : ['profile', 'email'] }));

    // the callback after google has authorized the user
    app.get('/connect/google/callback',
            passport.authorize('google', {
                    successRedirect : '/profile/:id',
                    failureRedirect : '/'
            }));



// =============================================================================
// UNLINK ACCOUNTS =============================================================
// =============================================================================
  // local -----------------------------------
  app.get('/unlink/local', function(req, res) {
          var user            = req.user;
          user.local.email    = undefined;
          user.local.password = undefined;
          user.save(function(err) {
                  res.redirect('/profile');
          });
  });

  // facebook -------------------------------
  app.get('/unlink/facebook', function(req, res) {
          var user            = req.user;
          user.facebook.token = undefined;
          user.save(function(err) {
                  res.redirect('/profile');
          });
  });

  // twitter --------------------------------
  app.get('/unlink/twitter', function(req, res) {
          var user           = req.user;
          user.twitter.token = undefined;
          user.save(function(err) {
                  res.redirect('/profile');
            });
  });

  // google ---------------------------------
  app.get('/unlink/google', function(req, res) {
          var user          = req.user;
          user.google.token = undefined;
          user.save(function(err) {
                  res.redirect('/profile');
          });
  });


};

// route middleware to ensure user is logged in
function isLoggedIn(req, res, next) {
  if (req.isAuthenticated())
          return next();

  res.redirect('/');
}