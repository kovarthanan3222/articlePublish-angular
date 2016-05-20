'use strict';

angular.module('myApp.sessionService', ['ngRoute'])

.factory('Session', function($http, postData) {    
    return {
        checkLogin: function(postData)
            $http({
                    method: 'POST',
                    url: 'server_side/add_article.php',
                    data: postData, //forms user object
                    headers: {'Content-Type': false}
                })
                            .success(function (data) {
                                return data;
                            })
                            .error(function () {
                            })
                    
    }
});



        