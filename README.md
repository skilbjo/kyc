##passport

###What

passport is an app that experiments with using the Javascript language for the entire stack. From the `mongo` database and `mongoose` ORM, to server side `node.js` and the `express` framework, and the `handlebars.js` templating engine, to client side `jQuery` and `Angular`, everything will be written using the Javascript programming language.

This app experiments with OAuth (signin with Twitter!) and creating reviews of locations using the Google Maps API.


###Stack

- Angular
- jQuery
- Passport.js
- Express
- EJS
- node.js
- Mongoose.js
- MongoDB

###Install

Clone the repository

	$ git clone https://github.com/skilbjo/passport.git
	
Install modules and dependencies
	
	$ npm install
	
Add secret API keys from the super secret email
	
	$ vim config/auth.js
	
Configure the database (assuming `mongo` is running at )

	$ mongo
	> db.serverCmdLineOpts()

You should get this back:
```
	{
	"argv" : [
		"/usr/local/Cellar/mongodb/2.4.9/mongod",
		"-f",
		"/etc/mongodb.conf"
	],
	"parsed" : {
		"config" : "/etc/mongodb.conf",
		"dbpath" : "/data/db",
		"fork" : "true",
		"journal" : "true",
		"logappend" : "true",
		"logpath" : "/data/log/mongod.log",
		"port" : 27017,
		"quiet" : "true"
	},
	"ok" : 1
	}
```

and
	> db.getParameter
	passport.getParameter
	
Run the app

	$ node app
	
Then view the app your browser:  `http://localhost:8080`