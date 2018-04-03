function sendToPopupCtrl($rootScope, $scope, $modalInstance, $http, $compile, $timeout, $filter, $location, $log, $route, $routeParams, $translate, myFunction, $modal, $window,params_id,params_dur_id) {
    $log.info('Enter sendToPopupCtrl');


    $scope.job_id = params_id;
    $scope.off_id_by = user_id;
    $scope.dur_id = params_dur_id;
    var nd = new Date();
    var gd = ("0" + nd.getDate()).slice(-2);
    var gm = ("0" + (nd.getMonth() + 1)).slice(-2);
    var gy = nd.getFullYear();
    var cy = gy+543;
    $scope.date_now = gd+"/"+gm+"/"+cy;
    $scope.sendTo = function (){
      if ($rootScope.criteria.comment == undefined){
        $scope.app.addAlert('gritter-warning', 'กรุณากรอกเหตุผลที่ส่งต่อ', 4000);
        $scope.commentError = true;
      }else if($rootScope.criteria.job_status == undefined){
        $scope.app.addAlert('gritter-warning', 'กรุณาเลือกสถานะส่งต่อ', 4000);
        $scope.commentErrorS = true;
      }else if($rootScope.criteria.off_id_to == undefined || $rootScope.criteria.off_id_to == null || $rootScope.criteria.off_id_to == ''){
        $scope.app.addAlert('gritter-warning', 'กรุณาเลือกผู้ที่ต้องการส่งต่อ', 4000);
        $scope.commentErrorTo = true;
      }else{
        $http.get('API/user/getNameOfficer.php?officer_id='+$rootScope.criteria.off_id_to).success(function (data){
          $scope.offerName = data;
        });
        console.log($rootScope.criteria.serialNo);
        $http.get('API/admin/popup/saveJobSendTo.php?job_id='+$scope.job_id+
                                                     '&off_id_by='+$scope.off_id_by+
                                                     '&off_id_to='+$rootScope.criteria.off_id_to+
                                                     '&job_status='+$rootScope.criteria.job_status+
                                                     '&comment='+$rootScope.criteria.comment+
                                                     '&date_now='+$scope.date_now).success(function (data){
             $scope.saveJob = data;
          if($scope.saveJob == '1'){
            $scope.app.addAlert('gritter-success', 'ส่งต่อไปที่ '+$scope.offerName+' เรียบร้อย', 4000);

            $http.get('API/admin/popup/updateSerailNo.php?serialNo='+$rootScope.criteria.serialNo+'&dur_id='+$scope.dur_id).success(function (data){
              $scope.updateSerailNo = data;
              console.log($scope.updateSerailNo);
            })
            $modalInstance.dismiss('cancel');
            location.reload();
            $rootScope.criteria = {};
          }else{
            $scope.app.addAlert('gritter-danger', 'บันทึกไม่สำเร็จ', 4000);
          }

        });
      }
    }
    $scope.lov_code = "SST";
    $http.get('API/lov/getStatus.php?lov_code='+$scope.lov_code).success(function (data){
      $scope.getStatus = data;
      angular.forEach($scope.getStatus, function(item){
        if($scope.dur_id==''||$scope.dur_id==null){
          if(item.lov_value != 2){
            item.dis = true;
          }else{
            item.dis = false;
          }
        }
      })
    });
    $scope.showInput = 0;
    $scope.getListStatus = function (id){
      $scope.commentErrorTo = false;
      $scope.officerList = {};
      $scope.showInput = 0;
      if(id==2){
        $scope.showInput = 1;
            $http.get('API/admin/remain/getOfficerList.php?admin_id='+user_id).success(function (data){
              $scope.officerList = data;
            });
      }else{
        $rootScope.criteria.off_id_to = "30002";
        $scope.showInput = 0;
        $http.get('API/user/getNameOfficer.php?officer_id='+30002).success(function (data){
          $rootScope.criteria.headOfficer = data;
        });
      }
    }
    $scope.cancel = function () {
        $modalInstance.dismiss('cancel');

    };


}
