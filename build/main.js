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
angular.module('newsApp')
    .component('filter', {
        //templateurl: 'filterTemplate.html',
        controller: filterController,
        bindings: {
            filterArray: '<',
            onFilterChanged: '&'
        },
        template: `<ol class="breadcrumb">
                        <li>Sort By:</li>
                        <li ng-repeat="filter in $ctrl.filterArray track by $index" ng-click="$ctrl.filterSelected(filter)">
                            <a >{{filter}}</a>
                        </li>
                    </ol>`
        });

function filterController() {
    var ctrl = this;
    ctrl.filterSelected = function (val) {
        ctrl.onFilterChanged({ filter: val });
    }
    ctrl.$onInit = function () {

    };
}


angular.module('newsApp')
    .component('newsItem', {
        controller: itemController,
        bindings: {
            items: '<'
        },
        template: `<div class="media" style="padding: 10px;border-bottom: 1px solid #e7e7e7;" data-ng-repeat="item in $ctrl.items track by $index">
                        <div class="media-left" style="float: left;margin-right: 20px;">
                            <a href="#">
                            <img class="media-object" style="height:50px;width:50px;border-radius:100%;" src="{{item.urlToImage}}" alt="...">
                            </a>
                        </div>
                        <div class="media-body">
                            <h4 class="media-heading">{{item.title}}</h4>
                            {{item.description}}
                        </div>
                    </div>`
    });

function itemController() {
    var ctrl = this;
    ctrl.$onInit = function () {

    };
}


angular.module('newsApp')
.constant('apiConstans',{
        sourcesUrl : "https://newsapi.org/v1/sources?language=en",
        articleUrl : "https://newsapi.org/v1/articles",
        apiKey: "cc85f31c0d014a04b807ec14cace3869"
});
angular.module('newsApp').controller('mainController',['$scope',function($scope){
    var vm  = this;
    vm.hello = "Suraj";
}
]);
angular.module('newsApp').controller('newsController', ['$scope', 'newsService', function ($scope, newsService) {
    var vm = this;
    vm.test = "reloaded";
    vm.options = [];
    vm.filter = null;
    vm.articles = null;

    vm.indexChanged = function (index) {
        vm.selectedSource = vm.options[index];
        vm.articles = null;
        vm.filter = null;
        vm.getArticles();
    }

    vm.getSources = newsService.getSources().then(function (data) {
        vm.options = data.sources;
    },
    function (error) {
        alert("Error Getting Sources");
    });

    vm.filterChanged = function (filter) {
        vm.filter = filter;
        vm.getArticles();
    }
    vm.getArticles = function () {
        var requestObject = {
            source: vm.selectedSource.id,
            filter: vm.filter ? vm.filter : ""
        }
        newsService.getArticles(requestObject).then(function (data) {
            console.log(data);
            vm.articles = data.articles;
        },
            function (error) {
                alert("Error Getting Articles");
            })
    }
}

]);
angular.module('newsApp')
    .directive('mySelect', function () {
        return {
            restrict: 'E',
            scope: {
                indexChanged: '=',
                options: '='
            },
          //templateUrl: '../../src/directives/selectTemplate.html',
            templateUrl: '../../NewsAppNG1/src/directives/selectTemplate.html',
            link: function (scope, $element, attrs) {
                scope.optionChanged = function (index) {
                    if (scope.indexChanged) {
                        scope.indexChanged(scope.selectedOption);
                    }
                }
            }
        }
    });
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