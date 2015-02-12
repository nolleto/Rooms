'use strict';

angular.module('Rooms')
  .service('Authentication', ['$http', function($http) {
    this.facebookLogin = function(callback) {
      $http.get('/connect/facebook').success(function() {
        callback();
      });
    };
  }]);
