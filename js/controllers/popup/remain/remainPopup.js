function remainPopupCtrl($rootScope, $scope, $modalInstance, $http, $compile, $timeout, $filter, $location, $log, $route, $routeParams, $translate, myFunction, $modal, $window,params_id) {
    $log.info('Enter remainPopupCtrl');




    $scope.cancel = function () {
        $modalInstance.dismiss('cancel');

    };


}
