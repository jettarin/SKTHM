function insureListPopupCtrl($rootScope, $scope, $modalInstance, $http, $compile, $timeout, $filter, $location, $log, $route, $routeParams, $translate, myFunction, $modal, $window,params_job_id,params_dur_id) {
    $log.info('Enter insureListPopupCtrl');


    $scope.job_id = params_job_id;
    $scope.dur_id = params_dur_id;
    $scope.i=1;
    $scope.clickAdd = function (){
      $('#addr'+$scope.i).html("<td>"+ $scope.i +"</td><td ><input name='insure_list"+$scope.i+"' type='text'  class='form-control input-xs'  /></td><td><input  name='insure_num"+$scope.i+"' type='text'   class='form-control input-xs'></td>");
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
        $http.get('API/admin/insure/saveInsure.php?insure_list='+$("[name='insure_list"+i+"']").val()
                                                +'&insure_num='+$("[name='insure_num"+i+"']").val()
                                                +'&job_id='+$scope.job_id
                                                +'&dur_id='+$scope.dur_id).success(function (data){
        $scope.saveInsure = data;
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

function insurePopupCtrl($rootScope, $scope, $modalInstance, $http, $compile, $timeout, $filter, $location, $log, $route, $routeParams, $translate, myFunction, $modal, $window,params_order_id) {
    $log.info('Enter insurePopupCtrl');
    $scope.order_id = params_order_id;
    $http.get('API/admin/insure/getInsureById.php?insure_id='+$scope.order_id).success(function (data){
      $scope.getInsureById = data;
    });
    $scope.editInsure = function (){
      $http.get('API/admin/insure/updateInsure.php?insyre_id='+$scope.order_id+
                                                          '&insure_list='+$scope.getInsureById.order_list+
                                                          '&insure_num='+$scope.getInsureById.order_num).success(function (data){
                $scope.updateInsure = data;
                if($scope.updateInsure == 1){
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
