'use strict';

// Declare app level module which depends on views, and components
var articleApp = angular.module('articleApp', [
 'ngRoute',
 'ngCookies',
 'user',
 'userServices',
 'article',
 'articleServices',
 'articleDirectives'
])
articleApp.config(['$routeProvider', function($routeProvider) {
 $routeProvider
  .when('/articleList', {
   templateUrl: 'views/article_list_view.html',
   controller: 'articleController'
  })
  .when('/addArticle', {
   templateUrl: 'views/add_article_view.html',
   controller: 'articleController'
  })
  .when('/login', {
   templateUrl: 'views/login.html',
   controller: 'loginController'
  })
  .when('/register', {
   templateUrl: 'views/register_view.html',
   controller: 'registerController'
  })
  .when('/myArticle', {
   templateUrl: 'views/my_article_list_view.html',
   controller: 'articleController'
  })
  .when('/waitingForReview', {
   templateUrl: 'views/waiting_for_review_list_view.html',
   controller: 'articleController'
  })
  .when('/editArticle/:articleId', {
   templateUrl: 'views/edit_article_view.html',
   controller: 'articleController'
  })
  .when('/reviewArticle/:articleId', {
   templateUrl: 'views/update_article_status_view.html',
   controller: 'articleController'
  })
  .otherwise({
   redirectTo: '/articleList'
  });
}]);