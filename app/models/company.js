// app/models/company.js

// load the things we need
var mongoose 		= require('mongoose'),
    autoIncrement   = require('mongoose-auto-increment');

// define the schema for our company model
var companySchema = mongoose.Schema({

    name                : String,
    email               : String,
    streetAddress       : String,
    cityAddress 		: String,
    stateAddress		: String,
    phoneNumber         : String,
    updated             : { type: Date, default: Date.now },
    users : { type: Number, ref: 'User' }
});

// autoIncrement the primary key
companySchema.plugin(autoIncrement.plugin, 'Company');

// methods ======================

// create the model for company and expose it to our app
module.exports = mongoose.model('Company', companySchema);


/*

<div id="mycompanies">
<a id="company5">asdfasdf</a>
<a id="company7">asdfasdf</a>
<a id="company8">asdfasdf</a>

</div>

$("#mycompanies").on("click", function(evt) {
 var id = evt.srcElement.attr("id")
  $.ajax({
    type: "POST",
    timeout: 50000,
    url: "/companies/257",
      data: {"name":"bernhard","phone":"22341234" },
    success: function (data) {
        document.getElementById("testimg2").src = data
        //console.log(JSON.stringify(data))
        return false;
    }
    error:function(msg){
 }

});


}

*/
