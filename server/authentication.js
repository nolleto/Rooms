'use strict';

var user = require('./models/User');

module.exports = {
  facebook: function(accessToken, refreshToken, profile, done) {
		// Aqui tem que rolar a autenticação e taus
		user.getUser(profile.id, function(docs) {
			if (docs.length == 0) {
				var name = profile.name.givenName + ' ' + profile.name.familyName;
				user.insertUser(profile.id, name, function(result) {
					console.log(result);
				});
			}
		});
	}
};
