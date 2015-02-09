'use strict';

angular.module('Rooms')
  .service('Authentication', ['$http', function($http) {
    this.facebookLogin = function(callback) {
      $http.get('/auth/facebook').success(function() {
        callback();
      });
    };
  }]);
