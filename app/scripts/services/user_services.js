'use strict';

var userServices = angular.module('userServices', []);

userServices.factory('checkLogin', ['$http', function ($http) {
    return {
      checkLoginFunction: function (postData) {

        return $http({
          method: 'POST',
          url: 'server_side/loginCheck.php',
          data: postData
        });

      }

    };
  }]);

userServices.factory('userRegister', ['$http', function ($http) {
    return {
      registerUserFunction: function (registerData) {

        return $http({
          method: 'POST',
          url: 'server_side/registeration.php',
          data: registerData
        });

      }

    };
  }]);