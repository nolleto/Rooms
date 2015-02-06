'use strict';

var app = require('express')()
	, http = require('http').Server(app)
	, io = require('socket.io')(http)
	, passport = require('passport')
	, FacebookStrategy = require('passport-facebook').Strategy
	;

passport.use(new FacebookStrategy({
		clientID: '548556098591198',
		clientSecret: '3cb52a37bcd5cd3eb800a807447325d9',
		callbackURL: 'http://192.168.1.22:3000/auth/facebook/callback'
	}, function(accessToken, refreshToken, profile, done) {
		// Aqui tem que rolar a autenticação e taus
	}
));

app.get('/', function(req, res) {
	res.sendFile(__dirname + '/view/index.html');
});

app.get('/auth/facebook', passport.authenticate('facebook'));

app.get('/auth/facebook/callback', passport.authenticate('facebook', { successRedirect: '/', failureRedirect: '/' }));

io.on('connection', function(socket) {

	console.log('Conectou!');
	socket.on('disconnect', function() {
		
	});

	socket.on('chat message', function(msg) {

	});

});

http.listen('3000', function() {
	console.log('Começou o jogo, em localhost:3000');
})
