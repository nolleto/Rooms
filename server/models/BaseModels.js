(function() {
  'use strict';

  var MongoClient = require('mongodb').MongoClient
    , url = 'mongodb://localhost:27017/'
    , database = 'rooms'
    ;

  /**
   * Método base para conexão ao Mongo. A questão é ter a base de
   * conexão e passar uma function callback, que recebe o objeto
   * db para ser usado.
   * @param callback: function com parametro "db" para ser usado.
   */
  function onConnect(callback) {
    MongoClient.connect(url + database, function(err, db) {
      if (err == null) {
        // Chama o callback do sujeito
        callback.call(this, db);
      }
    });
  }

  function dropDatabase(callback) {
    MongoClient.connect(url + database, function(err, db) {
      if (err == null) {
        // Chama o callback do sujeito
        db.dropDatabase();
        callback();
        db.close();
      }
    });
  }

  var baseModel = {
    connect: onConnect,
    database: function(db) {
      database = db || 'rooms';
    },
    turnDownForWhat: dropDatabase
  };

  module.exports = baseModel;
})();
