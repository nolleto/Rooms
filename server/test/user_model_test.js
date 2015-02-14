var user = require('../models/User')
  , should = require('should')
  , baseModel = require('../models/BaseModels')
  ;
user.database('rooms_test');

describe('Model: User', function() {

  var facebookId = 'It doesn\'t real!';

  describe('Creation', function() {

    it('should create a new user', function(done) {
      user.insert(facebookId, 'Bruno Konrad', 'Token',
        function(result) {
          result.length.should.equal(1);
          done();
        });
    });

    it('should add a room to the user', function(done) {
      user.addRoom({
        facebookId: facebookId,
        room: 'Pugs & Shitzu',
        nickname: 'Pew Die Pug'
      }, function(result) {
        result.should.equal(1);
        done();
      });
    });

  });

  describe('Search', function() {

    it('should find the last user created with the room', function(done) {
      user.get(facebookId, function(docs) {
        docs.length.should.equal(1);
        var bruno = docs[0];
        bruno.rooms.length.should.equal(1);
        bruno.rooms[0].room_name.should.equal('Pugs & Shitzu');
        bruno.rooms[0].nickname.should.equal('Pew Die Pug');
        done();
      });
    });

  });

  describe('Delete', function() {

    it('should remove the room from a user', function(done) {
      user.leaveRoom(facebookId, 'Pugs & Shitzu', function(result) {
        result.should.equal(1);
        done();
      });
    });

    it('should check if the room was really removed', function(done) {
      user.get(facebookId, function(docs) {
        docs.length.should.equal(1);
        var bruno = docs[0];
        bruno.rooms.length.should.equal(0);
        done();
      })
    });

  });

});
