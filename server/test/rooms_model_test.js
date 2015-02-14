var rooms = require('../models/Rooms')
  , should = require('should')
  , baseModel = require('../models/BaseModels')
  ;
rooms.database('rooms_test');

describe('Model: Rooms', function() {

  before(function(done) {
    baseModel.turnDownForWhat(function() {
      done();
    });
  });

  describe('Creation', function() {

    it('should create a new Room only with name', function(done) {
      rooms.create({
        name: 'Pugs & Shitzu'
      }, function(result) {
        result.length.should.equal(1);
        result[0].name.should.equal('Pugs & Shitzu');
        result[0].color.should.equal('#D1D1D1');
        result[0].secret.should.equal(false);
        should.not.exist(result[0].password);
        done();
      });
    });

    it('should create a new Room with name and color', function(done) {
      rooms.create({
        name: 'Node.js',
        color: '#cc82d2'
      }, function(result) {
        result.length.should.equal(1);
        result[0].name.should.equal('Node.js');
        result[0].color.should.equal('#CC82D2');
        result[0].secret.should.equal(false);
        should.not.exist(result[0].password);
        done();
      });
    });

    it('should not create a new Room with name and invalid hex color', function(done) {
      rooms.create({
        name: 'Python',
        color: '#hh82d2'
      }, function(result) {
        should.not.exist(result);
        done();
      });
    });

    it('should not create a new Room without name', function(done) {
      rooms.create({}, function(result) {
        should.not.exist(result);
        done();
      });
    });

    it('should create a new Room with name, color, secret and password', function(done) {
      rooms.create({
        name: 'Samba-canção',
        color: '#Ee3213',
        secret: true,
        password: 'sambapraquetequero'
      }, function(result) {
        result.length.should.equal(1);
        result[0].name.should.equal('Samba-canção');
        result[0].color.should.equal('#EE3213');
        result[0].secret.should.equal(true);
        should.exist(result[0].password);
        result[0].password.should.equal('sambapraquetequero');
        done();
      });
    });

    it('should not create a new Room with name, color and secret but without password',
     function(done) {
       rooms.create({
         name: 'Los Hermanos',
         color: '#d1ee98',
         secret: true
       }, function(result) {
         should.not.exist(result);
         done();
       });
     });
  });

  describe('Search', function() {

    it('should find all the rooms', function(done) {
      rooms.all(function(docs) {
        docs.length.should.equal(3);
        done();
      });
    });

    it('should find the Pugs & Shitzu\'s Room', function(done) {
      rooms.get('Pugs & Shitzu', function(pugs) {
        pugs.length.should.equal(1);
        pugs[0].name.should.equal('Pugs & Shitzu');
        pugs[0].color.should.equal('#D1D1D1');
        pugs[0].secret.should.equal(false);
        should.not.exist(pugs[0].password);

        done();
      });
    });

    it('should find the Node.js and Samba-canção Room', function(done) {
      rooms.get(['Node.js', 'Samba-canção'], function(docs) {
        docs.length.should.equal(2);
        done();
      });
    });

  });
});
