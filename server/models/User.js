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
    get: function(facebookId, callback) {
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
    insert: function(facebookId, name, facebookAccessToken, callback) {
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
    remove: function(facebookId, callback) {
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
    },

    /**
     * @param options: {facebookId: '', room: '', nickname: ''}
     */
    addRoom: function(options, callback) {
      if (options.facebookId && options.room && options.nickname) {

          onUserConnect(function(db, users) {
            users.update({'facebook_id': options.facebookId},
            {
              $push: {
                rooms: {
                  room_name: options.room,
                  nickname: options.nickname
                }
              }
            }, function(err, result) {
              if (err != null) {
                console.log('Erro a adicionar uma Room: ' + options);
              }
              callback(result);
            });
          });

      } else {
        callback(0);
      }
    },

    /**
     * @param facebookId:
     */
    leaveRoom: function(facebookId, roomName, callback) {
      if (facebookId && roomName) {

        onUserConnect(function(db, users) {
          users.update({'facebook_id': facebookId},
          {
            $pull: {
              rooms: {
                room_name: roomName
              }
            }
          }, function(err, result) {
            if (err != null) {

            }
            callback(result);
          });
        });

      } else {
        callback(0);
      }
    },

    database: function(db) {
      base.database(db);
    }
  };

})();
