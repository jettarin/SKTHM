function serailNoCtrl ($rootScope, $scope, $modalInstance, $http, $compile, $timeout, $filter, $location, $log, $route, $routeParams, $translate, myFunction, $modal, $window,params_order_id) {
    $log.info('Enter serailNoCtrl');


    $scope.order_id = params_order_id;
    $http.get('API/admin/popup/getOrderById.php?order_id='+$scope.order_id).success(function (data){
      $scope.order = data;
      console.log($scope.order);
      $rootScope.criteria.order_serial = $scope.order.order_serial
    })
    console.log($scope.order_id);
    $scope.save = function (){
      $http({
        url:'API/admin/popup/updateOrderSerial.php',
        method:'POST',
        data:{
          'order_id':$scope.order_id,
          'order_serial':$rootScope.criteria.order_serial
        }
      }).success(function (data){
        $scope.updateSerial = data;
        if($scope.updateSerial == 1){
          $scope.cancel()
          location.reload()
        }
        console.log($scope.updateSerial);
      })
    }

    $scope.cancel = function () {
        $modalInstance.dismiss('cancel');
    };
}
