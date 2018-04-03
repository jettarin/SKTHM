function durablePopupCtrl($rootScope, $scope, $modalInstance, $http, $compile, $timeout, $filter, $location, $log, $route, $routeParams, $translate, myFunction, $modal, $window,params_de_id) {
    $log.info('Enter durablePopupCtrl');



    $scope.de_id = params_de_id;

    $http.get('API/admin/popup/getDurableDetail.php?de_id='+$scope.de_id).success(function (data){
      $scope.getDurableDetailObj = data;

      $rootScope.criteria.de_desc = $scope.getDurableDetailObj.de_desc;
    });
    $scope.save = function (){
      $http.get('API/admin/popup/updateDurableDetail.php?de_desc='+$rootScope.criteria.de_desc+'&de_id='+$scope.de_id).success(function (data){
        $scope.updateDurableDetail = data;
        if($scope.updateDurableDetail == 1){
          location.reload();
        }
      });
    }
    $scope.cancel = function () {
        $modalInstance.dismiss('cancel');

    };


}
