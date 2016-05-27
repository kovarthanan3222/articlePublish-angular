'use strict';

var article = angular.module('article', ['articleServices', 'ngCookies'])

article.controller('articleController', ['$scope', '$http', 'articleServicesFunction',
  '$cookieStore', '$routeParams', '$rootScope'
          , function ($scope, $http, articleServicesFunction, $cookieStore, $routeParams, $rootScope) {
            $scope.article = {};

            $scope.insertArticle = function () {
              $scope.article.authorId = $rootScope.loggedUserId;
              articleServicesFunction.insertArticleFunction($scope.article).success(function (data) {
                $scope.successMessage = data.message;
                $scope.article = {};
                $scope.addArticleForm.$setPristine();
              }).error(function (data) {
                $scope.successMessage = "Server Issue. Please try later";
              });
            };

            $scope.updateArticle = function () {
              articleServicesFunction.updateArticleFunction($scope.article).success(function (data) {
                $scope.successMessage = data.message;
              }).error(function (data) {
                $scope.successMessage = "Server Issue. Please try later";
              });
            };

            $scope.updateArticleStatus = function () {
              articleServicesFunction.updateArticleStatus($scope.article).success(function (data) {
                $scope.waitingForApproveList = data.waitingForArticleReview;
              }).error(function (data) {
                $scope.waitingForApproveList = {};
              });
            };
            
          }]);

article.controller('myArticleController', ['$scope', 'articleServicesFunction', '$rootScope'
          , function ($scope, articleServicesFunction, $rootScope) {
            $scope.myArticleList = function () {
              if ($rootScope.loggedUserId) {
                articleServicesFunction.getMyArticles($rootScope.loggedUserId).success(function (data) {
                  $scope.myArticleList = data.myArticleList;
                }).error(function (data) {
                  $scope.myArticleList = {};
                });
              }
              ;
            }
            $scope.myArticleList();
          }]);
        
article.controller('sendForReviewController', ['$scope', 'articleServicesFunction'
          , function ($scope, articleServicesFunction) {
            $scope.sendForReview = function () {
              articleServicesFunction.getWaitingForArticleReview().success(function (data) {
                $scope.waitingForArticleReview = data.waitingForArticleReview;
              }).error(function (data) {
                $scope.waitingForApproveList = {};
              });
            };
            $scope.sendForReview();
          }]);

article.controller('viewSingleArticleController', ['$scope', 'articleServicesFunction', '$routeParams'
          , function ($scope, articleServicesFunction, $routeParams) {
            $scope.viewSingleArticle = function () {
              $scope.editArticleId = $routeParams.articleId;
              articleServicesFunction.getEditArticledetails($scope.editArticleId).success(function (data) {
                $scope.editArticleData = data.editArticleDetails;
                $scope.article.articleName = $scope.editArticleData[0]["artical_name"];
                $scope.article.category = $scope.editArticleData[0]["category_name"];
                $scope.article.content = $scope.editArticleData[0]["content"];
                $scope.article.status = $scope.editArticleData[0]["status"];
                $scope.article.articleId = $scope.editArticleData[0]["artical_id"];
              }).error(function (data) {
                $scope.editArticleData = {};
              });
            };
            $scope.viewSingleArticle();
          }]);
        
article.controller('editArticleController', ['$scope', 'articleServicesFunction', '$routeParams'
          , function ($scope, articleServicesFunction, $routeParams) {
            $scope.editArticle = function () {
              $scope.editArticleId = $routeParams.articleId;
              articleServicesFunction.getEditArticledetails($scope.editArticleId).success(function (data) {
                $scope.editArticleData = data.editArticleDetails;
                $scope.article.articleName = $scope.editArticleData[0]["artical_name"];
                $scope.article.category = $scope.editArticleData[0]["category_name"];
                $scope.article.content = $scope.editArticleData[0]["content"];
                $scope.article.status = $scope.editArticleData[0]["statusId"];
                $scope.article.articleId = $scope.editArticleData[0]["artical_id"];
              }).error(function (data) {
                $scope.editArticleData = {};
              });
            };
            $scope.editArticle();
          }]);




