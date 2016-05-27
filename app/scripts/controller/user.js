'use strict';

var user = angular.module('user', ['userServices']);

user.directive('validPasswordC', function () {
  return {
    require: 'ngModel',
    link: function (scope, elm, attrs, ctrl) {
      ctrl.$parsers.unshift(function (viewValue, $scope) {
        var noMatch = viewValue != scope.userForm.password.$viewValue
        ctrl.$setValidity('noMatch', !noMatch)
      })
    }
  }
});

user.controller('registerController', ['$scope', '$http', 'userRegister', function ($scope, $http, userRegister) {

    $scope.user = {};
    $scope.submitForm = function () {
      userRegister.registerUserFunction($scope.user).success(function (data) {
        if (data.errors) {
          $scope.message = false;
        } else {
          $scope.message = data.message;
          $scope.user = {};
          $scope.userForm.$setPristine();
        }
      });
    };

    $scope.reset = function () {
      $scope.user = angular.copy($scope.user);
    };
    $scope.reset();
  }]);

user.controller('loginController', ['$scope', 'checkLogin', '$rootScope', '$location', '$cookieStore',
  function ($scope, checkLogin, $rootScope, $location, $cookieStore) {
   

    if ($scope.loggedUserType == "admin") {
      $scope.isAdminUser = true;
      $scope.isAuthor = false;
      $scope.loginStatus = true;
    } else if ($scope.loggedUserType == "author") {
      $scope.isAdminUser = false;
      $scope.isAuthor = true;
      $scope.loginStatus = true;
    } else {
      $scope.loginStatus = false;
    }



    $scope.logindata = {};
    $scope.output = {};

    $scope.loginFormSubmit = function () {
      checkLogin.checkLoginFunction($scope.logindata).success(function (data) {
        if (data.status == "success") {
          
          $rootScope.session = data;
          $cookieStore.put('sessions', $rootScope.session);
          $rootScope.handleSession();
          $location.path('/articleList');
        } else {
          $rootScope.loginStatus = data.loginMessage;
        }
      })
              .error(function () {});

    };
  }]);
user.controller('sessionController', ['$scope', '$cookieStore','$rootScope','$location',
  function ($scope, $cookieStore, $rootScope,$location) {
     
    $rootScope.handleSession = function () {
      if ($cookieStore.get('sessions')) {


        $rootScope.userSession = $cookieStore.get('sessions');
        $rootScope.loggedUserId = $scope.userSession.userdetails[0]["user_id"];
        $rootScope.loggedUserType = $scope.userSession.userdetails[0]["user_type"];
        $rootScope.loggedUserName = $scope.userSession.userdetails[0]["name"];

        if ($rootScope.loggedUserType == "admin") {
          $rootScope.isAdminUser = true;
          $rootScope.isAuthor = false;
          $rootScope.loginStatus = true;
        } else if ($scope.loggedUserType == "author") {
          $rootScope.isAdminUser = false;
          $rootScope.isAuthor = true;
          $rootScope.loginStatus = true;
        } else {
          $rootScope.loginStatus = false;
        }
      }
    }
    $rootScope.handleSession();
  
  $scope.logout = function () {
          $cookieStore.remove("sessions");
          $rootScope.userSession = {};
          $rootScope.loggedUserId ={};
          $rootScope.loggedUserType ={};
          $rootScope.loggedUserName ={};
          $rootScope.isAdminUser =false;
          $rootScope.isAuthor =false;
          $rootScope.loginStatus = false;
          
          $location.path('/login');
    };

  }]);

