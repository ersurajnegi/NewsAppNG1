angular.module('newsApp')
    .service('newsService', ['$http', '$q', 'ngProgressLite', 'apiConstans', function ($http, $q, ngProgressLite, apiConstans) {

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
            var url = apiConstans.sourcesUrl;
            return get(url);
        }
        this.getArticles = function (reqObject) {
            var url = apiConstans.articleUrl + '?source=' + reqObject.source +
                '&apiKey=' + apiConstans.apiKey + "&sortBy=" + reqObject.filter;
                return get(url);
        }



        
    }])