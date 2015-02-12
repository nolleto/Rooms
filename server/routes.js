'use strict';

var user = require('./models/User')
  , path = require('path');


module.exports = {
  root: function(req, res) {
    res.sendFile('index.html', { root: path.join(__dirname, '../client') });
  }
};
