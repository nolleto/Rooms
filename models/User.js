'use strict';

var MongoClient = require('mongodb').MongoClient
  , assert = require('assert')
  , url = 'mongodb://localhost:27017/rooms'
  , userModule
  ;

userModule = (function() {
  /**
   * Método base para conexão ao Mongo. A questão é ter a base de
   * conexão e passar uma function callback, que recebe o objeto
   * db para ser usado.
   * @param callback: function com parametro "db" para ser usado.
   */
  function onConnect(callback) {
    MongoClient.connect(url, function(err, db) {
      assert.equal(null, err);
      console.log('conexão aberta');

      // Chama o callback do sujeito
      callback.call(this, db);
    });
  }

  function onUserConnect(callback) {
    onConnect(function(db) {
      callback.call(this, db, db.collection('users'));
    });
  }

  return {
    /**
     * Pesquisa um usuário pelo ID do facebook, o resultado estará no
     * objeto callback. Se não encontrar nada o parametro é null.
     * @param facebookId - ID do facebook;
     * @param callback - função com o parâmetro que é o objeto encontrado.
     */
    getUser: function(facebookId, callback) {
      var that = this;
      onUserConnect(function(db, users) {
        users.find({'facebook_id': facebookId})
          .toArray(function(err, docs) {
            assert.equal(null, err);
            callback.call(that, docs);
            db.close();
          });
      });
    },
    saveUser: function(facebookId, name, callback) {
      var that = this;
      onUserConnect(function(db, users) {
        users.insert({
          facebook_id: facebookId,
          name: name,
          rooms: []
        }, function(err, result) {
          // copiando as validações do tutorial. Vai que, né. Ver se precisa
          assert.equal(null, err);
          console.log(result);
          console.log('salvei');

          callback.call(that, result);
          db.close();
        });
      })
    }
  };
})();

module.exports = userModule;
