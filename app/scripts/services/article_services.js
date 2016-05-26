'use strict';

var articleServices = angular.module('articleServices', []);

articleServices.factory('articleServicesFunction', ['$http', function ($http) {
        return {
            getArticleCategoryList: function () {
                return $http({
                    url: 'server_side/getCategory.php',
                    method: 'GET'
                });
            },
            statusList: function () {
                return $http({
                    url: 'server_side/getStatus.php',
                    method: 'GET'
                });
            },
            articleList: function () {
                return $http({
                    url: 'server_side/getArticles.php',
                    method: 'GET'
                });
            },
            insertArticleFunction: function (formData) {
                return $http({
                    method: 'POST',
                    url: 'server_side/add_article.php',
                    data: formData
                });
            },
            updateArticleFunction: function (formData) {
                return $http({
                    method: 'POST',
                    url: 'server_side/update_article.php',
                    data: formData
                });
            },
            updateArticleStatus: function (formData) {
                return $http({
                    method: 'POST',
                    url: 'server_side/update_article_status.php',
                    data: formData
                });
            },
            getMyArticles: function (authorId) {
                return $http({
                    method: 'GET',
                    url: 'server_side/getMyArticles.php?authorId='+authorId
                });
            },
            getWaitingForArticleReview: function () {
                return $http({
                    method: 'GET',
                    url: 'server_side/getWaitingForReview.php'
                });
            },
            getEditArticledetails: function (articleId) {
                return $http({
                    method: 'GET',
                    url: 'server_side/getSingleArticle.php?articleId='+articleId
                });
            }

        };
    }]);
