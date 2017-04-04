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