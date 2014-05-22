// GET, /clients, index
exports.index = function(req, res, models) {
  models.clients.find( {} , function(err, companies) {
    res.json(clients);
  });
};

// GET, /clients/new, new
exports.new = function(req, res, models) {
  console.log('this function currently handled after user sign up');
};

// POST, /clients, create
exports.create = function(req, res, models) {
  var newclient            = new models.clients;
  newclient.name           = req.body.clientname;
  newclient.email          = req.body.clientemail;
  newclient.phoneNumber    = req.body.clientmobile;
  newclient.streetAddress  = req.body.clientstreet;
  newclient.cityAddress    = req.body.clientcity;
  newclient.stateAddress   = req.body.clientstate;
  newclient.save();

  console.log(newclient._id); // empty... 
  //  how to retrieve and make an association?

  // models.users.find({ _id : userId }, function(err, users) {
  //   var user = users[0]; // mongo returns an array of the objects
  //   user.client     = 1;
  //   user.save(); 
  // });
  res.redirect('/users/' + req.user._id +'?created=true');  
};

// GET, /clients/:id, show
exports.show = function (req, res, models) {
	var id = req.params.id;
  models.clients.find({ _id : id }, function(err, client) {
    if (!client.length) {
      res.send('client with an id of ' + id + ' not found.\n');
      return;
    };
    res.json(client);
  });
};

// GET, /clients/:id/edit, edit
exports.edit = function (req, res) {
  res.send('ability to edit client not yet implemented\n');
};

// PUT, /clients/:id, update
exports.update = function (req, res, models) {
  var userId = req.params.id;
  var clientId = req.body;

  models.clients.find( { _id : clientId }, function(err, client) {
    if (!client.length) {
      res.json('client with an id of '+id+' not found\n');
      return;
    }
    var client = client[0];

    client.users.push(userId);  // right way to do this ?
  });
};

// DELETE, /clients/:id, destroy
exports.destroy = function (req, res, models) {
  var id = req.params.id;
    models.clients.find({ _id : id}, function(err, user) {
      res.json('ability to delete client not yet implemented');
      res.redirect('/?delete=true');   
  });
};