'use strict';

var articleDirectives = angular.module('articleDirectives', ['articleServices']);

articleDirectives.directive('category', ['articleServicesFunction', function (articleServicesFunction) {
        return {
            template: '<select name="articlecategory" ng-model="article.category" ng-options="val.category_id as val.category_name for val in categoryList" required replace:true>\n\
                <option value="">Select</option></select>',
            restrict: 'E',
            link: function (scope) {

                articleServicesFunction.getArticleCategoryList().success(function (data) {
                    scope.categoryList = data.categoryList;
                }).error(function (data) {
                    scope.categoryList = '';
                });
            }
        };
    }]);
articleDirectives.directive('status', ['articleServicesFunction', function (articleServicesFunction) {
        return {
            template: '<select name="articleStatus" ng-model="article.status" ng-options="val.status_id as val.status for val in statusList" required>\n\
                <option value="">Select</option></select>',
            restrict: 'E',
            link: function (scope) {

                articleServicesFunction.statusList().success(function (data) {
                    scope.statusList = data.statusList;
                }).error(function (data) {
                    scope.statusList = '';
                });

            }
        };
    }]);
articleDirectives.directive('articleList', ['articleServicesFunction', function (articleServicesFunction) {
        return {
            template: '<div ng-repeat="cat in articleList">\n\
                        <h4>Article Name: {{cat.artical_name}}</h4>\n\
                        <h5>Author Name:{{cat.name}}</h5>\n\
                        <h5>Category:{{cat.category_name}}</h5>\n\
                        <h6>Created Date: {{ cat.created_date}}</h6>\n\
                        <p> {{cat.content}} </p><br></div>',
            restrict: 'E',
            link: function (scope) {
                articleServicesFunction.articleList().success(function (data) {
                    scope.articleList = data.articleList;
                }).error(function (data) {
                    scope.articleList = '';
                });

            }
        };
    }]);