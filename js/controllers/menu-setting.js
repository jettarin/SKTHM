angular.module('myApp').config([ '$routeProvider', function($routeProvider) {
    $routeProvider.when("/menu-setting",
        {templateUrl:_.toHttpGetUrl('content/menu-setting/list.html'),
            controller: CompletedListCtrl});
} ]);


function CompletedListCtrl($rootScope, $scope, $http, $compile, $timeout, $filter, $location, $log, $route, $routeParams, $translate,$modal) {
    $log.info('Enter CompletedListCtrl');


    
    
}



