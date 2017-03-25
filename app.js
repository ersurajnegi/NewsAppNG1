angular.module('newsApp', ['ngRoute','ngProgressLite'])
    .config(['ngProgressLiteProvider','$routeProvider',function(ngProgressLiteProvider,$routeProvider) {
    $routeProvider
    .when("/", {
        templateUrl : "./src/templates/newsTemplate.html",
        controller:'newsController as newsCtrl'
    })
    .otherwise({redirectTo:'/'});
    ngProgressLiteProvider.settings.speed = 1500;
}]);