'use strict';

angular.module('Rooms')
  .controller('RoomsController', ['$scope', 'Authentication', function($scope, Authentication) {
    this.name = 'Obrigado, <a link="https://github.com/nolleto">@nolleto</a>';
    this.login = function() {
      console.log("começandooo!");
      Authentication.facebookLogin(function() {
        console.log("E aí?");
      });
    };
  }]);
