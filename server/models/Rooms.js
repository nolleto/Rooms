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
      var hexColorRegex = /^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/
        , fail = function() {
            callback();
          }
        ;

      if (!options || !options.name) {
        fail();
        return;
      }

      // seta o valor default
      options.color = options.color || '#D1D1D1';
      if (!hexColorRegex.test(options.color)) {
        fail();
        return;
      }
      options.color = options.color.toUpperCase();

      options.secret = options.secret || false;

      if (options.secret && !options.password) {
        fail();
        return;
      }

      roomsModel.get(options.name, function(docs) {
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
              console.log('erro ao inserir um Room: ' + options);
            }

            callback(result);
            db.close();
          });
        });

      });
    },

    /**
     * Pesquisa salas pelo nome. Pode ser tanto um nome como vários, em um array.
     * @param name: array de string ou uma string só.
     */
    get: function(name, callback) {

      onRoomsConnect(function(db, rooms) {
        var findFunction;

        if (typeof name === 'object' && 'length' in name) {
          findFunction = rooms.find({'name': { $in: name }});
        } else {
          findFunction = rooms.find({'name': name});
        }

        findFunction.toArray(function(err, docs) {
          if (err != null) {
            console.log('Erro na busca de um Room: ' + name);
            callback([]);
          }

          callback(docs);
          db.close();
        });
      });
    },

    /**
     * Pesquisa TODAS as salas criadas. TODAS!
     */
    all: function(callback) {
      onRoomsConnect(function(db, rooms) {
        rooms.find({})
          .toArray(function(err, docs) {
            if (err != null) {
              console.log('Erro ao buscar todos os Rooms');
            }

            callback(docs);
            db.close();
          });
      });
    },

    database: function(db) {
      base.database(db);
    }
  };

  module.exports = roomsModel;

})();
