'use strict';

var user = angular.module('user', ['userServices'])

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
})

user.controller('registerController', ['$scope', '$http','userRegister', function ($scope, $http,userRegister) {

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
    $scope.logindata = {};
    $scope.output = {};

    $scope.loginFormSubmit = function () {
      checkLogin.checkLoginFunction($scope.logindata).success(function (data) {
        if (data.status == "success") {
          $location.path('/articleList');
          $rootScope.session = data;
          $cookieStore.put('sessions', $rootScope.session);
        } else {
          $rootScope.loginStatus = data.loginMessage;
        }
      })
              .error(function () {});

    };
  }]);

