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