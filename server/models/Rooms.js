(function() {
  'use strict';

  var base = require('./BaseModels.js');

  function onRoomsConnect(callback) {
    base.connect(function(db) {
      callback.call(this, db, db.collection('rooms'));
    });
  }

  var roomsModel = {
    /**
     * Cria uma nova sala, se o nome não existir (que é a validação de ter
     * outra sala criada);
     * @param options: objeto no modelo das opções de um Room (ver na Wiki)
     */
    create: function(options, callback) {
      var fail = function() {
        callback();
      }

      if (!options || !options.name) {
        fail();
        return;
      }

      // seta o valor default
      options.color = options.color || '#D1D1D1';
      options.color = options.color.toUpperCase();
      
      options.secret = options.secret || false;

      if (options.secret && !options.password) {
        fail();
        return;
      }

      roomsModel.getRoom(options.name, function(docs) {
        if (docs.length > 0) {
          fail();
          return;
        }

        onRoomsConnect(function(db, rooms) {
          var data = {
            name: options.name,
            color: options.color,
            secret: options.secret
          };
          if (options.secret) {
            data['password'] = options.password;
          }

          rooms.insert(data, function(err, result) {
            if (err != null) {
              // TODO: precisa tratar, sepá
            }

            callback(result);
            db.close();
          });
        });

      });
    },

    getRoom: function(name, callback) {
      onRoomsConnect(function(db, rooms) {
        rooms.find({'name': name})
          .toArray(function(err, docs) {
            if (err != null) {
              console.log('Erro na busca de um Room: ' + name);

              callback([]);
              return;
            }

            callback(docs);
            db.close();
          });
      });
    },

    all: function(callback) {
      onRoomsConnect(function(db, rooms) {

      });
    },

    database: function(db) {
      base.database(db);
    }
  };

  module.exports = roomsModel;

})();
