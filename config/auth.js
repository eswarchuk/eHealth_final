

// export auth using module.exports
module.exports = {

	'facebookAuth' : {
		'clientID' 		: '137506010320031', // your App ID
		'clientSecret' 	: '37c02420625019bb87f60cbb935685ce', // your App Secret
		'callbackURL' 	: 'https://whispering-garden-50090.herokuapp.com/auth/facebook/callback'
	},

	'twitterAuth' : {
		'consumerKey' 		: 'uFipdpZKEbYe0DL9JZ5kLq3qP',
		'consumerSecret' 	: 'WvmSUhnW6sxQhVh7l8QgsG84n0qFty6Q6i1OQiVUf9X8TX1iZL',
		'callbackURL' 		: 'https://whispering-garden-50090.herokuapp.com/auth/twitter/callback'
	},

	'googleAuth' : {
		'clientID' 		: '656346168053-anoch56oufcd1teej328cf948p9hgh1d.apps.googleusercontent.com',
		'clientSecret' 	: 'YJZG9WJIqr20ZMC3ZXtEjMIM',
		'callbackURL' 	: 'https://whispering-garden-50090.herokuapp.com/auth/google/callback'
	}

};
