// app/controllers/test.js

var something = function(a, res) { 
	res.send(a);
	// return a;
};

exports.getTest = something;
