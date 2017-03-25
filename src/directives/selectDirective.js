angular.module('newsApp')
    .directive('mySelect', function () {
        return {
            restrict: 'E',
            scope: {
                indexChanged: '=',
                options: '='
            },
            templateUrl: '/src/templates/selectDirectiveTemplate.html',
            link: function (scope, $element, attrs) {
                scope.optionChanged = function (index) {
                    if (scope.indexChanged) {
                        scope.indexChanged(scope.selectedOption);
                    }
                }
            }
        }
    });