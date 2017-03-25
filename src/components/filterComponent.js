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

