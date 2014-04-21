// app/controllers/static.js

exports.index = function(req, res) {
  res.render('static_pages/index.hbs');
};

exports.getLogin = function (req, res) {
  res.render('static_pages/login.hbs', { message: req.flash('loginMessage') });
};