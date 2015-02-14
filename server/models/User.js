(function() {
  'use strict';

  var base = require('./BaseModels');

  function onUserConnect(callback) {
    base.connect(function(db) {
      callback.call(this, db, db.collection('users'));
    });
  }

  module.exports = {
    /**
     * Pesquisa um usuário pelo ID do facebook, o resultado estará no
     * objeto callback. Se não encontrar nada o parametro é null.
     * @param facebookId - ID do facebook;
     * @param callback - função com o parâmetro que é o objeto encontrado.
     */
    getUser: function(facebookId, callback) {
      var that = this;
      callback = callback || function() {};

      onUserConnect(function(db, users) {
        users.find({'facebook_id': facebookId})
          .toArray(function(err, docs) {
            if (err != null) {
              // TODO: precisa tratar, sepá
            }

            callback.call(that, docs);
            db.close();
          });
      });
    },

    /**
     * Cria um novo documento na coleção de usuários.
     * @param facebookId - ID do facebook;
     * @param name - o nome do usuário, vindo do Facebook;
     * @param callback - função com o parâmetro do resultado.
     */
    insertUser: function(facebookId, name, facebookAccessToken, callback) {
      var that = this;
      callback = callback || function() {};

      onUserConnect(function(db, users) {
        var data = {
          facebook_id: facebookId,
          name: name,
          rooms: []
        };
        if (facebookAccessToken != null)
          data['facebook_access_token'] = facebookAccessToken;
        users.insert(data, function(err, result) {
          if (err != null) {
            // TODO: precisa tratar, sepá
          }

          callback.call(that, result);
          db.close();
        });
      });
    },

    /**
     * Pesquisa um usuário pelo ID do facebook, o resultado estará no
     * objeto callback. Se não encontrar nada o parametro é null.
     * @param facebookId - ID do facebook;
     * @param callback - função com o parâmetro que é o objeto encontrado.
     */
    removeUser: function(facebookId, callback) {
      var that = this;
      callback = callback || function() {};

      onUserConnect(function(db, users) {
        users.remove({'facebook_id': facebookId}, function(err, result) {
          if (err != null) {
            // TODO: precisa tratar, sepá
          }

          callback.call(that, err);
          db.close();
        });
      });
    }
  };

})();
