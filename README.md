##passport

###What

passport is an app that experiments with using the Javascript language for the entire stack. From the `mongo` database and `mongoose` ORM, to server side `node.js` and the `express` framework, and the `handlebars.js` templating engine, to client side `jQuery` and `Angular`, everything will be written using the Javascript programming language.

This app experiments with OAuth (signin with Twitter!) and creating reviews of locations using the Google Maps API.


###Stack

- MV* framework:				[Angular](http://docs.angularjs.org/api)
- Javascript library:			[jQuery](http://api.jquery.com/)
- Templating engine:			[handlebars.js](http://handlebarsjs.com/)
- OAuth library:				[passport.js](http://passportjs.org/guide/)
- MVC framework:				[express](http://expressjs.com/api.html)
- Server side language:			[node.js](http://nodejs.org/api/)
- Object-relational mapping: 	[mongoose.js](http://mongoosejs.com/docs/api.html)
- Database:  					[MongoDB](http://docs.mongodb.org/manual/)

###Install

Clone the repository

	$ git clone https://github.com/skilbjo/passport.git
	
Install modules and dependencies
	
	$ npm install
	
Add secret API keys from the super secret email
	
	$ vim config/auth.js
	
Configure the database (assuming `mongo` is running at `/usr/local/bin/mongo`)

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
```
	> db.getParameter
	passport.getParameter
```
	
Run the app

	$ node app
	
Then view the app your browser:  `http://localhost:8080`

###Useful tricks

If for some reason you get something like this:

```
events.js:72
        throw er; // Unhandled 'error' event
              ^
Error: listen EADDRINUSE
```

there are likely two `node` servers running. Close a terminal window and start again. But in case that doesn't work... `$ killall node`


Another issue gets you this error:
```
events.js:72
        throw er; // Unhandled 'error' event
              ^
Error: failed to connect to [localhost:27017]
```

Just run this: `$ mongod --fork` to start the database (and to kill the database process, run `$ killall mongod`)
