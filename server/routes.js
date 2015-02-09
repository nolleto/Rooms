'use strict';

var user = require('./models/User')
  , path = require('path');


module.exports = {
  root: function(req, res) {
    res.sendFile('index.html', { root: path.join(__dirname, '../client') });
    user.getUser('100000470968012', function(docs) {
      console.log(docs);
    });
  },

  success: function(req, res) {

  },

  fail: function(req, res) {

  }
};
