function editStatusPopupCtrl ($rootScope, $scope, $modalInstance, $http, $compile, $timeout, $filter, $location, $log, $route, $routeParams, $translate, myFunction, $modal, $window) {
    $log.info('Enter editStatusPopupCtrl');


    

    $scope.cancel = function () {
        $modalInstance.dismiss('cancel');
    };
}
