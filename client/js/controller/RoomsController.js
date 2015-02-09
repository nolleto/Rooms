'use strict';

angular.module('Rooms')
  .controller('RoomsController', ['$scope', 'Authentication', function($scope, Authentication) {
    $scope.name = 'Militar Foda';
    $scope.login = function() {
      Authentication.facebookLogin(function() {
        console.log("E aí?");
      });
    };
  }]);
