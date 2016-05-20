'use strict';

angular.module('myApp.articleList', ['ngRoute'])

//        .config(['$routeProvider', function ($routeProvider) {
//
//                $routeProvider.when('/articleList', {
//                    templateUrl: 'add_article/article_list_view.html',
//                    controller: 'articleListController'
//                });
//            }])
        
// Controller function and passing $http service and $scope var.
        .controller('articleListController', function ($scope, $http, fileUpload) {

            
            $scope.getArticleList = function () {
//                   alert("called");
                // Posting data to php file
                $http({
                    url: 'server_side/getArticles.php',
                    headers: {'Content-Type': 'application/x-www-form-urlencoded'}
                })
                        .success(function (data) {
//                            alert(data);
                            console.log(data);
                            $scope.articleList = data.articleList;
                        });
            };
            
            $scope.toJsDate = function (str) {
                alert(str);
                if (!str)
                    return null;
                return new Date(str);
            };

            $scope.articleList = $scope.getArticleList();
            
        });