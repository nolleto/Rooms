(function() {

  'use strict';

  var Server = require('socket.io')
    , io;

  function connection(socket) {
    console.log('Conectou!');

    socket.on('disconnect', function() {
      console.log('Desconectou');
    });

    socket.on('message sent', function(msg) {
      console.log(msg);
    });
  }

  module.exports = {
    start: function(http) {
      io = new Server(http);
      io.on('connection', connection);
    }
  };

})();
