'use strict';

var article = angular.module('article', ['articleServices', 'ngCookies'])

article.controller('articleController', ['$scope', '$http', 'articleServicesFunction', '$cookieStore', '$routeParams'
          , function ($scope, $http, articleServicesFunction, $cookieStore, $routeParams) {

            $scope.article = {};

            $scope.insertArticle = function () {
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
            $scope.myArticleList = function () {
              $scope.userSession = $cookieStore.get('sessions');
              articleServicesFunction.getMyArticles($scope.userSession.userdetails[0]["user_id"]).success(function (data) {
                $scope.myArticleList = data.myArticleList;
              }).error(function (data) {
                $scope.myArticleList = {};
              });
            };
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
            $scope.sendForReview = function () {
              $scope.userSession = $cookieStore.get('sessions');
              articleServicesFunction.getWaitingForArticleReview().success(function (data) {
                $scope.waitingForArticleReview = data.waitingForArticleReview;
              }).error(function (data) {
                $scope.waitingForApproveList = {};
              });
            };
            
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
            
            $scope.updateArticleStatus = function () {
              $scope.userSession = $cookieStore.get('sessions');
              articleServicesFunction.updateArticleStatus($scope.article).success(function (data) {
                $scope.waitingForApproveList = data.waitingForArticleReview;
              }).error(function (data) {
                $scope.waitingForApproveList = {};
              });
            };
            $scope.editArticle();
            $scope.myArticleList();
            $scope.sendForReview();
            $scope.viewSingleArticle();
          }]);




