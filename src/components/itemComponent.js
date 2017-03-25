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

