// config/auth.js

// expose our config directly to our application using module.exports
module.exports = {

	'facebookAuth' : {
		'clientID' 		: '188602714683480', // your App ID
		'clientSecret' 	: '5b9bd9c90937c2c615e5bf8074ec79de', // your App Secret
		'callbackURL' 	: 'http://localhost:8080/auth/facebook/callback'
	},

	'twitterAuth' : {
		'consumerKey' 		: 'N08lR2r8prSHqx6RLb3Qzw',
		'consumerSecret' 	: 'ZM34tiImp5Uth2zervfTqKYV4y2ebAWue2Kzp8N2PU',
		'callbackURL' 		: 'http://localhost:8080/auth/twitter/callback'
	},

	'googleAuth' : {
		'clientID' 		: 'your-secret-clientID-here',
		'clientSecret' 	: 'your-client-secret-here',
		'callbackURL' 	: 'http://localhost:8080/auth/google/callback'
	}

};