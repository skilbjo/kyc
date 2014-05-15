// app/controllers/business.js

// GET, /companies, index
exports.index = function(req, res, models) {
  models.companies.find( {} , function(err, companies) {
    res.json(companies);
  });
};

// GET, /companies/new, new
exports.new = function(req, res, models) {
  console.log('this function currently handled after user sign up');
};

// POST, /companies, create
exports.create = function(req, res, models) {
  var newCompany            = new models.companies;
  newCompany.name           = req.body.companyname;
  newCompany.email          = req.body.companyemail;
  newCompany.phoneNumber    = req.body.companymobile;
  newCompany.streetAddress  = req.body.companystreet;
  newCompany.cityAddress    = req.body.companycity;
  newCompany.stateAddress   = req.body.companystate;
  newCompany.save();

  console.log(newCompany._id); // empty

  // models.users.find({ _id : userId }, function(err, users) {
  //   var user = users[0]; // mongo returns an array of the objects
  //   user.company     = 1;
  //   user.save(); 
  // });
};

// GET, /companies/:id, show
exports.show = function (req, res, models) {
	var id = req.params.id;
  models.companies.find({ _id : id }, function(err, company) {
    if (!company.length) {
      res.send('company with an id of ' + id + ' not found.\n');
      return;
    };

    res.json(company);
  });


  // models.companies.find({ _id : id }, function(err, company) {
  //   var company = company[0]; // mongo returns an array of the objects
  //   console.log(company);
  //   res.json(company); 
  // });
};

// GET, /companies/:id/edit, edit
exports.edit = function (req, res) {
  res.send('ability to edit company not yet implemented\n');
};

// PUT, /companies/:id, update
exports.update = function (req, res, models) {
  var id = req.params.id;
  res.send('ability to edit company not yet implemented\n');
};

// DELETE, /companies/:id, destroy
exports.destroy = function (req, res, models) {
  var id = req.params.id;
    models.companies.find({ _id : id}, function(err, user) {
      res.json('ability to delete company not yet implemented');
      res.redirect('/?delete=true');   
  });
};