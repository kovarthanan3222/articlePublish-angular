'use strict';

angular.module('myApp.login', ['ngRoute'])
.factory('Session', function($http) {
//    var returnData = {};
    return {
        checkLogin: function(postData,rootScope,location){
            
            $http({
                    method: 'POST',
                    url: 'server_side/loginCheck.php',
                    data: postData, //forms user object
                    headers: {'Content-Type': false}
                })
                            .success(function (data) {
                                rootScope.session = data;
                                if (rootScope.session.status == "success") {
                                    location.path('/articleList');
                                }
                                return data;
                            })
                            .error(function () {
                            });
                }
                    
    };
})
        
// Controller function and passing $http service and $scope var.
        .controller('loginController', ['$scope','$http','$rootScope','Session','$location',function ($scope, $http, $rootScope,Session,$location) {
            // create a blank object to handle form data.
            $scope.logindata = {};
            $scope.output ={};
//            $rootScope.session = {};
            // calling our submit function.
            $scope.loginFormSubmit = function () {
//                $rootScope.session = Session.checkLogin($scope.logindata);
                Session.checkLogin($scope.logindata,$rootScope,$location);
            
            }
            
        }]);
        
       