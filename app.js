'use strict';

var app 	= require('express')()
	, http 	= require('http').Server(app)
	, io 		= require('socket.io')(http)
	;

app.get('/', function(req, res) {
	res.sendFile(__dirname + '/index.html');
});

io.on('connection', function(socket) {

	console.log('Conectou!');
	socket.on('disconnect', function() {
		console.log(allSocket[socket] + ' saiu... :(');
	});

	socket.on('chat message', function(msg) {

	});

});

http.listen('3000', function() {
	console.log('Começou o jogo, em localhost:3000');
})
