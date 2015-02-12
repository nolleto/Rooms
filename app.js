'use strict';

var express = require('express')
	, app = express()
	, http = require('http').Server(app)
	, path = require('path')

	, Grant = require('grant').express()

	, passport = require('passport')
	, FacebookStrategy = require('passport-facebook').Strategy

	, routes = require('./server/routes')
	, authentication = require('./server/authentication')
	, chat = require('./server/chat')
	// configuração, vai ficar aqui por enquanto... depois preocupo com organizar o código node (aprender isso, na real rssss)
	, localHost = '192.168.25.24'
	, port = '3000'
	;

var grant = new Grant(require('./server/grant_config.json'));
app.use(grant);

app.get('/handle_facebook_callback', authentication.facebook);

// Torna público o acesso aos JS e isso aqui fez funcionar o client.
app.use("/public", express.static(path.join(__dirname, 'client')));

app.get('/', routes.root);

chat.start(http);

http.listen(port, function() {
	console.log('Começou o jogo, em '+ localHost + ':' + port);
});
