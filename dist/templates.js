angular.module('newsApp').run(['$templateCache', function($templateCache) {$templateCache.put('newsTemplate.html','<my-select data-ng-if="newsCtrl.options.length > 0" options="newsCtrl.options" index-changed="newsCtrl.indexChanged" selected="newsCtrl.selectedOption">\r\n\r\n</my-select>\r\n<div style="position:relative;">\r\n    <filter data-ng-if="newsCtrl.selectedSource" test="hello" filter-array="newsCtrl.selectedSource.sortBysAvailable" on-filter-changed="newsCtrl.filterChanged(filter)"></filter>\r\n</div>\r\n\r\n<div class="container-fluid news-container">\r\n    <div class="row">\r\n        <div class="col-md-12 col-lg-12">\r\n            HI\r\n        </div>\r\n    </div>\r\n</div>');
$templateCache.put('selectDirectiveTemplate.html','<div class="form-group">\r\n    <select name="mySelect" class="form-control" data-ng-change="optionChanged()"\r\n     ng-model="selectedOption">\r\n        <option value="">--Select News Source--</option>\r\n        <option data-ng-repeat="option in options track by $index" \r\n            value="{{$index}}">\r\n            {{option.name}}\r\n        </option>\r\n        </select>\r\n</div>');}]);