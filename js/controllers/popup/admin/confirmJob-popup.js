function confirmJobPopupCtrl($rootScope, $scope, $modalInstance, $http, $compile, $timeout, $filter, $location, $log, $route, $routeParams, $translate, myFunction, $modal, $window,params_job_id,params_officer_id) {
    $log.info('Enter confirmJobPopupCtrl');


    var dateNow = new Date();
		var dayNow = ("0" + dateNow.getDate()).slice(-2);
		var monthNow = ("0" + (dateNow.getMonth() + 1)).slice(-2);
		var yearNow = dateNow.getFullYear();
		var calYear = yearNow + 543;
		var hNow = ("0" + dateNow.getHours()).slice(-2);
		var mNow = ("0" + dateNow.getMinutes()).substr(-2);
		$scope.date_created = dayNow+"/"+monthNow+"/"+calYear;
		$scope.time_created = hNow+":"+mNow;
    $scope.job_id = params_job_id;

    $http.get('API/user/popup/getJobById.php?job_id='+$scope.job_id).success(function (data){
      $scope.jobObj = data;
      $rootScope.criteria.dur_id = $scope.jobObj.job_dur_id;
      $http.get('API/user/popup/getUserNameById.php?user_id='+$scope.jobObj.job_user_id).success(function (data){
        $scope.userNameStr = data;
      $rootScope.criteria.userName = $scope.userNameStr;
      });

      $http.get('API/user/popup/getDepartmentName.php?cost_id='+$scope.jobObj.job_dep_of_durable).success(function (data){
        $scope.costName = data;
      $rootScope.criteria.department = $scope.costName +" (โทร."+$scope.jobObj.job_tell+")";
      });
      $rootScope.criteria.job_header = $scope.jobObj.job_header;
      $rootScope.criteria.job_desc = $scope.jobObj.job_desc;
      $http.get('API/user/popup/getDurableById.php?dur_id='+$scope.jobObj.job_dur_id).success(function (data){
        $scope.getDurableById = data;
        $rootScope.criteria.dur_numoe = $scope.getDurableById.dur_numoe;
        $rootScope.criteria.dur_list = $scope.getDurableById.dur_list;
      });
      $http.get('API/admin/popup/countFix.php?dur_id='+$scope.jobObj.job_dur_id).success(function (data){
        $scope.countFixObj = data;
        $rootScope.criteria.countFix = $scope.countFixObj.total_dur;
      });

    });

    $scope.gotoJobDurable = function (dur_id){
        $modalInstance.dismiss('cancel');
        $location.path('/job/detail/'+dur_id);
    }

    $scope.officer_id = params_officer_id;
    $scope.acceptJob = function (){
      if($scope.jobObj.job_delete_status == 1){
        $scope.errorMessage = "งานนี้ถูกลบไปแล้ว";
      }else{
        $http.get('API/admin/updateJobByOfficer.php?job_acc_by='+$scope.officer_id+"&job_id="+$scope.job_id+"&job_date_acc="+$scope.date_created+"&job_time_acc="+$scope.time_created).success(function (data){
           $scope.updateJob = data;
           if($scope.updateJob == 1){
             $modalInstance.dismiss('cancel');
             $location.path('/remain-list');

           }else{
             $scope.errorMessage = "การตอบรับผิดพลาด";
           }
        });
      }

    }



    $scope.cancel = function () {
        $modalInstance.dismiss('cancel');

    };


}
