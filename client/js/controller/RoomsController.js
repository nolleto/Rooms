'use strict';

angular.module('Rooms')
  .controller('RoomsController', ['$scope', 'Authentication', function($scope, Authentication) {

    this.login = function() {
      console.log("começandooo!");
      Authentication.facebookLogin(function() {
        console.log("E aí?");
      });
    };

    this.testClick = function() {
      console.log("Clicou");
    }

  }]);
