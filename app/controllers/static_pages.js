// app/controllers/static.js

exports.index = function(req, res) {
  res.render('static_pages/index');
};

exports.getLogin = function (req, res) {
  res.render('static_pages/login', { message: req.flash('loginMessage') });
};