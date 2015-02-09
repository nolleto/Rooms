'use strict';

var express = require('express')
	, app = express()
	, http = require('http').Server(app)
	, path = require('path')
	, io = require('socket.io')(http)

	, passport = require('passport')
	, FacebookStrategy = require('passport-facebook').Strategy

	, user = require('./models/User')
	// configuração, vai ficar aqui por enquanto... depois preocupo com organizar o código node (aprender isso, na real rssss)
	, localHost = '192.168.25.24'
	, port = '3000'
	;

passport.use(new FacebookStrategy({
		clientID: '548556098591198',
		clientSecret: '3cb52a37bcd5cd3eb800a807447325d9',
		callbackURL: 'http://' + localHost + ':' + port + '/auth/facebook/callback'
	}, function(accessToken, refreshToken, profile, done) {
		// Aqui tem que rolar a autenticação e taus
		user.getUser(profile.id, function(docs) {
			if (docs.length == 0) {
				var name = profile.name.givenName + ' ' + profile.name.familyName;
				user.insertUser(profile.id, name, function(result) {
					console.log(result);
				});
			}
		});
	}
));

// Torna público o acesso aos JS e isso aqui fez funcionar o client.
app.use("/client", express.static(path.join(__dirname, 'client')));

app.get('/', function(req, res) {
	res.sendFile(__dirname + '/client/index.html');
	user.getUser('100000470968012', function(docs) {
		console.log(docs);
	});
});

app.get('/success', function(req, res) {
	res.send('oi');
});

app.get('/fail', function(req, res) {
	res.send('ops');
});

// Autenticação por facebook
app.get('/auth/facebook', passport.authenticate('facebook'));
app.get('/auth/facebook/callback', passport.authenticate('facebook',
	{ successRedirect: '/success', failureRedirect: '/fail' })
);


io.on('connection', function(socket) {

	console.log('Conectou!');
	socket.on('disconnect', function() {

	});

});

http.listen(port, function() {
	console.log('Começou o jogo, em localhost:3000');
});
