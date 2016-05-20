'use strict';

// Declare app level module which depends on views, and components
angular.module('myApp', [
  'ngRoute',
  'myApp.register',
  'myApp.login',
  'myApp.addarticle',
  'myApp.articleList'
  
  
]).
config(['$routeProvider', function($routeProvider) {
        $routeProvider.when('/articleList', {
                    templateUrl: 'add_article/article_list_view.html',
                    controller: 'articleListController'
                }).
                        when('/addArticle', {
                    templateUrl: 'add_article/add_article_view.html',
                    controller: 'articleController'
                }).
                when('/login', {
                    templateUrl: 'register/login.html',
                    controller: 'loginController'
                }).
                when('/register', {
                    templateUrl: 'register/register_view.html',
                    controller: 'registerController'
                }).
                otherwise({redirectTo: '/articleList'});
}]);

$rootScope.session = {};
