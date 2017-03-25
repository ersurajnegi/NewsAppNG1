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
            test: '@',
            onFilterChanged: '&'
        },
    //     template: `<ul style="position:absolute;right:10px;">
    //     <li style="display:inline-block;padding: 0 3px;text-transform: capitalize;" 
    //         ng-repeat="filter in $ctrl.filterArray track by $index" 
    //         ng-click="$ctrl.filterSelected(filter)">
    //    <a> {{filter}} </a>|
    //     </li>
    //     </ul>`
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
angular.module('newsApp').controller('mainController',['$scope',function($scope){
    var vm  = this;
    vm.hello = "Suraj";
}
]);
angular.module('newsApp').controller('newsController', ['$scope', 'newsService', function ($scope, newsService) {
    var vm = this;
    vm.test = "reloaded";
    vm.options = [];

    vm.indexChanged = function (index) {
        vm.selectedSource = vm.options[index];
    }

    vm.getSources = newsService.getSources().then(function (data) {
        vm.options = data.sources;
        console.log(vm.options)
    },
        function (error) {

        });

    vm.filterChanged = function (filter) {
        alert(filter);
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
            templateUrl: '../../src/directives/selectTemplate.html',
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