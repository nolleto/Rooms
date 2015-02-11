'use strict';

var socketIo = require('socket.io')
  , io;

var chat = (function() {

  function connection(socket) {
    console.log('Conectou!');

    socket.on('disconnect', function() {
      console.log('Desconectou');
    });

    socket.on('message sent', function(msg) {
      console.log(msg);
    });
  }

  var c = {
    start: function(http) {
      io = socketIo(http);
      io.on('connection', connection);
    }
  };

  return c;
})();

module.exports = chat;
