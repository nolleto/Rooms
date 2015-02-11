'use strict';

var express = require('express')
	, app = express()
	, http = require('http').Server(app)
	, path = require('path')

	, passport = require('passport')
	, FacebookStrategy = require('passport-facebook').Strategy

	, routes = require('./server/routes')
	, authentication = require('./server/authentication')
	, chat = require('./server/chat')
	// configuração, vai ficar aqui por enquanto... depois preocupo com organizar o código node (aprender isso, na real rssss)
	, localHost = '192.168.25.24'
	, port = '3000'
	;

passport.use(new FacebookStrategy({
		clientID: '548556098591198',
		clientSecret: '3cb52a37bcd5cd3eb800a807447325d9',
		callbackURL: 'http://' + localHost + ':' + port + '/auth/facebook/callback'
	}, authentication.facebook));

// Torna público o acesso aos JS e isso aqui fez funcionar o client.
app.use("/public", express.static(path.join(__dirname, 'client')));

app.get('/', routes.root);
app.get('/success', routes.success);
app.get('/fail', routes.fail);

// Autenticação por facebook
app.get('/auth/facebook', passport.authenticate('facebook'));
app.get('/auth/facebook/callback', passport.authenticate('facebook',
	{ successRedirect: '/success', failureRedirect: '/fail' })
);

chat.start(http);

http.listen(port, function() {
	console.log('Começou o jogo, em '+ localHost + ':' + port);
});
