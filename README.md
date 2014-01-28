##passport
========

###What

passport is an app that experiments with using the Javascript language for the entire stack. From the Mongo database, to server side node.js and Express, to client side jQuery and Angular, everything will be written using the Javascript programming languages.

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
	
Configure the database

	$ mongo
	
Run the app

	$ node app
	
Then view the app your browser:  `http://localhost:8080`