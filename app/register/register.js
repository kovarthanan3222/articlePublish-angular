'use strict';

angular.module('myApp.register', ['ngRoute', 'UserValidation'])

        

angular.module('UserValidation', []).directive('validPasswordC', function () {
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
// Controller function and passing $http service and $scope var.
        .controller('registerController', function ($scope, $http) {
            // create a blank object to handle form data.
            $scope.user = {};

            // calling our submit function.
            $scope.submitForm = function () {
                //   alert("called");
                // Posting data to php file
                $http({
                    method: 'POST',
                    url: 'server_side/registeration.php',
                    data: $scope.user, //forms user object
                    headers: {'Content-Type': 'application/x-www-form-urlencoded'}
                })
                        .success(function (data) {
                            if (data.errors) {
                                // Showing errors.
                                $scope.errorName = data.errors.name;
                                $scope.errorUserName = data.errors.username;
                                $scope.errorEmail = data.errors.email;
                                $scope.message = false;
                            } else {
                                //  alert("success");
                                $scope.message = data.message;
                                $scope.user = {};
                                $scope.userForm.$setPristine();
                                $scope.errorName = false;
                                $scope.errorUserName = false;
                                $scope.errorEmail = false;
                            }
                        });
            };

            $scope.reset = function () {
                $scope.user = angular.copy($scope.user);
            };
            $scope.reset();
        });