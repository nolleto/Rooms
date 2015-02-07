'use strict';

var app = require('express')()
	, http = require('http').Server(app)
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
				user.saveUser(profile.id, name, function(result) {
					console.log(result);
				});
			}
		});
	}
));

app.get('/', function(req, res) {
	res.sendFile(__dirname + '/view/index.html');
	user.getUser('100000470968012', function(docs) {
		console.log(docs);
	});
});

// Autenticação por facebook
app.get('/auth/facebook', passport.authenticate('facebook'));
app.get('/auth/facebook/callback', passport.authenticate('facebook', { successRedirect: '/', failureRedirect: '/' }));


io.on('connection', function(socket) {

	console.log('Conectou!');
	socket.on('disconnect', function() {

	});

});

http.listen(port, function() {
	console.log('Começou o jogo, em localhost:3000');
})
