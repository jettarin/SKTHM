function confirmDeletePopupCtrl($rootScope, $scope, $modalInstance, $http, $compile, $timeout, $filter, $location, $log, $route, $routeParams, $translate, myFunction, $modal, $window,params_job_id) {
    $log.info('Enter confirmDeletePopupCtrl');


    $scope.job_id = params_job_id;

    $scope.cancel = function () {
        $modalInstance.dismiss('cancel');

    };


}
