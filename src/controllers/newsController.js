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