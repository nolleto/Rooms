'use strict';

var user = require('./models/User')
  , request = require('request')
  ;

var auth = (function() {

  /**
   * Tendo o Access Token busca os dados do usuário logado. O objeto é pegar o ID do facebook
   * e o nome completo do mesmo, para inserir na base de dados.
   */
  function getFacebookData(accessToken, callback) {
    var requestUrl = 'https://graph.facebook.com/v2.2/me?access_token=' + accessToken;
    request(requestUrl, function(error, response, body) {
      if (!error && response.statusCode == 200) {
        var data = JSON.parse(body);
        callback(data.id, data.first_name + ' ' + data.last_name, accessToken);
      }
    });
  }

  return {

    /**
     * Callback da autenticação via facebook.
     */
    facebook: function (req, res) {

      getFacebookData(req.query.access_token, function(id, name, accessToken) {
        user.getUser(id, function(docs) {

          console.log(docs);

          if (docs.length == 0) {
            user.insert(id, name, accessToken, function(result) {
                console.log(result);
            });
          }
        });

        res.redirect('/');
      });
    }
  };

})();

module.exports = auth;
