function userPopupCtrl($rootScope, $scope, $modalInstance, $http, $compile, $timeout, $filter, $location, $log, $route, $routeParams, $translate, myFunction, $modal, $window,params_id,params_officer_id,params_dur_id) {
    $log.info('Enter userPopupCtrl');

    $scope.job_id = params_id;
    $scope.officer_id = params_officer_id;
    $scope.dur_id = params_dur_id;
    $http.get('API/user/popup/getNameOfficer.php?officer_id='+$scope.officer_id).success(function (data){
      $scope.getNameOfficer = data;
      $scope.nameOfficer = $scope.getNameOfficer.Mem_name+ " " + $scope.getNameOfficer.Mem_lastname;
    });
    $http.get('API/user/popup/getDurableById.php?dur_id='+$scope.dur_id).success(function (data){
      $scope.getDurableById = data;
    });
    $http.get('API/user/popup/getJobById.php?job_id='+$scope.job_id).success(function (data){
      $scope.getJobById = data;
      console.log($scope.getJobById);
      if($scope.job_dur_id == '' || $scope.job_dur_id == null){
        $scope.otherJob = '1';
      }
      if($scope.getJobById.job_status == 1 || $scope.getJobById.job_status == 2){
        $scope.statusStr = 'กำลังดำเนินการ...';
        $scope.per = "20";
      }else if($scope.getJobById.job_status == 3){
        $scope.statusStr = 'วิเคาะห์อาการแล้วต้องส่งซ่อมภายนอก...';
        $scope.per = "40";
      }else if($scope.getJobById.job_status == 30){
        $scope.statusStr = 'กำลังส่งซ่อมนอก...';
        $scope.per = "40";
      }else if($scope.getJobById.job_status == 4){
        $scope.statusStr = 'วิเคาะห์อาการแล้วต้องสั่งซื้ออุปกรณ์...';
        $scope.per = "40";
      }else if($scope.getJobById.job_status == 5){
        $scope.statusStr = 'วิเคาะห์อาการแล้วต้องสั่งซื้อทดแทน...';
        $scope.per = "40";
      }else if($scope.getJobById.job_status == 50){
        $scope.statusStr = 'กำลังดำเนินการสั่งซื้อทดแทน...';
        $scope.per = "40";
      }else if($scope.getJobById.job_status == 40){
        $scope.statusStr = 'กำลังำเนินการสั่งซื้ออุปกรณ์...';
        $scope.per = "40";
      }else if($scope.getJobById.job_status == 6 || $scope.getJobById.job_status == 7 || $scope.getJobById.job_status == 8){
        $scope.statusStr = 'รับส่งมอบแล้ว...';
          $scope.per = "80";
      }else if($scope.getJobById.job_status == 99){
        $scope.statusStr = 'ปิดงานแล้ว...';
          $scope.per = "100";
      }
    });
    $http.get('API/user/popup/getJobSuccess.php?job_id='+$scope.job_id).success(function (data){
      $scope.getJjobSuccess = data;
    });
    $scope.cancel = function () {
        $modalInstance.dismiss('cancel');
    };
}
