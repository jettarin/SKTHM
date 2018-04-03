function finishJobCtrl($rootScope, $scope, $modalInstance, $http, $compile, $timeout, $filter, $location, $log, $route, $routeParams, $translate, myFunction, $modal, $window,params_job_id,params_dur_id,params_job_type) {
    $log.info('Enter finishJobCtrl');


    $scope.job_id = params_job_id;
    $scope.dur_id = params_dur_id;
    $scope.user_id = user_id;
    $scope.job_type = params_job_type;

    var dateNow = new Date();
    var d = ("0" + dateNow.getDate()).slice(-2)
    var calM = ("0" + (dateNow.getMonth() + 1)).slice(-2);
    var y = dateNow.getFullYear();
    var calYear = y + 543;
    var h = dateNow.getHours();
    var min = dateNow.getMinutes();

    $scope.date_of_p = d+"/"+calM+"/"+calYear;
    $scope.date_of_t = h+":"+min;
    $scope.lov_code = "ACTJ";
    $http.get('API/lov/getActiveJob.php?lov_code='+$scope.lov_code).success(function (data){
      $scope.getActiveJobList = data;
    });
    $rootScope.criteria.job_type = $scope.job_type;

    $scope.finishJob = function (){
      if($rootScope.criteria.comment == undefined){
        $scope.app.addAlert('gritter-warning', 'กรุณากรอกเหตุผลที่ปิดงาน', 4000);
        $scope.commentError = true;
      }else{
        $http.get('API/admin/popup/finishJob.php?job_id='+$scope.job_id+
                                              "&comment="+$rootScope.criteria.comment+
                                              "&description="+$rootScope.criteria.finishJobDesc+
                                              "&job_id="+$scope.job_id+
                                              "&officer_finish="+$scope.user_id+
                                              "&finish_date="+$scope.date_of_p+
                                              "&finish_time="+$scope.date_of_t+
                                              "&dur_id="+$scope.dur_id+
                                              "&job_type="+$rootScope.criteria.job_type).success(function(data){
          $scope.finishJob = data;
          if($scope.finishJob == '1'){
            $scope.app.addAlert('gritter-success', 'ปิดงานเรียบร้อย', 4000);
            $rootScope.criteria = {};
            $modalInstance.dismiss('cancel');
            location.reload();
          }else{
            $scope.app.addAlert('gritter-danger', 'บันทึกไม่สำเร็จ', 4000);
          }
        });
      }
    };
    $scope.cancel = function () {
        $modalInstance.dismiss('cancel');
    };
}
