'use strict';

var user = require('./models/User');

module.exports = {
  facebook: function(accessToken, refreshToken, profile, done) {
    user.getUser(profile.id, function(docs) {
      if (docs.length == 0) {
        var name = profile.name.givenName + ' ' + profile.name.familyName;
        user.insert(profile.id, name, function(result) {
            console.log(result);
        });
      }
    });
  }
};
