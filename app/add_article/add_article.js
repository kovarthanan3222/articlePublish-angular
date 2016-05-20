'use strict';

angular.module('myApp.addarticle', ['ngRoute'])

        .directive('fileModel', ['$parse', function ($parse) {
                return {
                    restrict: 'A',
                    link: function (scope, element, attrs) {
                        var model = $parse(attrs.fileModel);
                        var modelSetter = model.assign;

                        element.bind('change', function () {
                            scope.$apply(function () {
                                modelSetter(scope, element[0].files[0]);
                            });
                        });
                    }
                };
            }])

        .service('fileUpload', ['$http', function ($http) {
                this.uploadFileToUrl = function (file, uploadUrl,article) {
                    var fd = new FormData();
                    fd.append('file', file);
//                    fd.append('model',article);
                    fd.append("articleName", article.name);
                    fd.append("category", article.category);
                    fd.append("content", article.content);
                    fd.append("status", article.status);
//                    $http.post(uploadUrl, fd, {
//                        transformRequest: angular.identity,
//                        headers: {'Content-Type': undefined}
//                    })

                    $http({
                    method: 'POST',
                    url: 'server_side/add_article.php',
                    data: fd, //forms user object
                    headers: {'Content-Type': false}
                })
                            .success(function () {
                            })
                            .error(function () {
                            });
                }
            }])
// Controller function and passing $http service and $scope var.
        .controller('articleController', function ($scope, $http, fileUpload) {


            // create a blank object to handle form data.
            $scope.article = {};



            $scope.uploadFile = function(){
        var file = $scope.myFile;
        var otherFormdata = $scope.article;
        console.log('file is ' );
        console.dir(file);
        var uploadUrl = "server_side/add_article.php";
        fileUpload.uploadFileToUrl(file, uploadUrl,otherFormdata);
        };
            // calling our submit function.
            $scope.insertArticle = function () {
                
                
                //   alert("called");
                // Posting data to php file
                $http({
                    method: 'POST',
                    url: 'server_side/add_article.php',
                    data: $scope.article, //forms user object
                    headers: {'Content-Type': false}
                })
                        .success(function (data) {
                            $scope.uploadFile();
                            $scope.successMessage = data.message;
                            $scope.article = {};
                            $scope.addArticleForm.$setPristine();
                        });
            };

            $scope.getArticleCategoryList = function () {
//                   alert("called");
                // Posting data to php file
                $http({
                    url: 'server_side/getCategory.php',
                    headers: {'Content-Type': 'application/x-www-form-urlencoded'}
                })
                        .success(function (data) {
//                            alert(data);
                            $scope.categoryList = data.categoryList;
                        });
            };

            $scope.statusList = function () {
//                   alert("called");
                // Posting data to php file
                $http({
                    url: 'server_side/getStatus.php',
                    headers: {'Content-Type': 'application/x-www-form-urlencoded'}
                })
                        .success(function (data) {
//                            alert(data);
                            $scope.statusList = data.statusList;
                        });
            };

            $scope.articleCategory = $scope.getArticleCategoryList();
            $scope.statusList = $scope.statusList();
        });