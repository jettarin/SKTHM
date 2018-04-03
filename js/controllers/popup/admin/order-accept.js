function orderAcceptManagerPopupCtrl ($rootScope, $scope, $modalInstance, $http, $compile, $timeout, $filter, $location, $log, $route, $routeParams, $translate, myFunction, $modal, $window,params_job_id) {
    $log.info('Enter orderAcceptManagerPopupCtrl');


    console.log(params_job_id);


    $http.get('API/admin/getJobById.php?job_id='+params_job_id).success(function (resp){
      $scope.getJobById = resp
      console.log($scope.getJobById);
    })


    $scope.save = function (){
      $http.get('API/admin/order/updateJobByID.php?job_id='+params_job_id+'&manager='+$scope.getJobById.job_manager_response).success(function (resp){
        $scope.updateJobByID = resp
        console.log($scope.updateJobByID);
        if($scope.updateJobByID == 1){
          $scope.app.addAlert('gritter-success', 'การบันทึกเรียบร้อย', 4000);
          $rootScope.list.search()
          $scope.cancel()
        }
      })
    }

    $scope.cancel = function () {
        $modalInstance.dismiss('cancel');
    };
}
