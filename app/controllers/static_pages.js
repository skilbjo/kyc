// app/controllers/static.js

exports.index = function(req, res) {
  res.render('index.hbs');
};

exports.getLogin = function (req, res) {
  res.render('login.hbs', { message: req.flash('loginMessage') });
};