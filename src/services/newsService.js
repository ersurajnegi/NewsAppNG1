angular.module('newsApp')
    .service('newsService', ['$http', '$q', 'ngProgressLite', function ($http, $q, ngProgressLite) {
        var get = function (url) {
            ngProgressLite.start();
            return $http.get(url).then(function (result) {
                ngProgressLite.done();
                return result.data;

            },
            function (error) {
                gProgressLite.done();
                return $q.reject(result);

            })
        }

        this.getSources = function () {
            var url = " https://newsapi.org/v1/sources?language=en";
            return get(url);
        }
    }])