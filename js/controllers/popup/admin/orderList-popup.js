function orderListPopupCtrl($rootScope, $scope, $modalInstance, $http, $compile, $timeout, $filter, $location, $log, $route, $routeParams, $translate, myFunction, $modal, $window,params_job_id,params_dur_id) {
    $log.info('Enter orderListPopupCtrl');


    $scope.job_id = params_job_id;
    $scope.dur_id = params_dur_id;
    $scope.i=1;
    $scope.clickAdd = function (){
      $('#addr'+$scope.i).html("<td>"+ $scope.i +"</td><td ><input name='order_list"+$scope.i+"' type='text'  class='form-control input-xs'  /></td><td><input  name='order_num"+$scope.i+"' type='text'   class='form-control input-xs'></td>");
      $('#tab_logic').append('<tr id="addr'+($scope.i+1)+'"></tr>');
      $scope.i++;
    }
    $scope.clickDelete = function (){
      if($scope.i>1){
      $("#addr"+($scope.i-1)).html('');
      $scope.i--;
    }
    }
    $scope.save = function (){
      for (i = 1; i < $scope.i; i++) {
        $http.get('API/admin/order/saveOrder.php?order_list='+$("[name='order_list"+i+"']").val()
                                                +'&order_num='+$("[name='order_num"+i+"']").val()
                                                +'&job_id='+$scope.job_id
                                                +'&dur_id='+$scope.dur_id).success(function (data){
        $scope.saveOrder = data;
      });
      }
      $scope.app.addAlert('gritter-success', 'บันทึกรายการเรียบร้อย', 4000);
      $modalInstance.dismiss('cancel');
      location.reload();
    }
    $scope.cancel = function () {
        $modalInstance.dismiss('cancel');
    };
}

function orderPopupCtrl($rootScope, $scope, $modalInstance, $http, $compile, $timeout, $filter, $location, $log, $route, $routeParams, $translate, myFunction, $modal, $window,params_order_id) {
    $log.info('Enter orderPopupCtrl');
    $scope.order_id = params_order_id;
    $http.get('API/admin/order/getOrderById.php?order_id='+$scope.order_id).success(function (data){
      $scope.getOrderById = data;
    });
    $scope.editOrder = function (){
      $http.get('API/admin/order/updateOrder.php?order_id='+$scope.order_id+
                                                          '&order_list='+$scope.getOrderById.order_list+
                                                          '&order_num='+$scope.getOrderById.order_num).success(function (data){
                $scope.updateOrder = data;
                if($scope.updateOrder == 1){
                  $scope.app.addAlert('gritter-success', 'การแก้ไขเรียบร้อย', 4000);
                  $modalInstance.dismiss('cancel');
                  location.reload();
                }
      });
    }
    $scope.cancel = function () {
        $modalInstance.dismiss('cancel');

    };
}
