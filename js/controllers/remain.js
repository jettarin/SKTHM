angular.module('myApp').config([ '$routeProvider', function($routeProvider) {
    $routeProvider.when("/remain-list",{templateUrl:_.toHttpGetUrl('content/remain/list.html'),
            controller: RemainListCtrl});
    $routeProvider.when("/remain-list/more-detail/:id",{templateUrl:_.toHttpGetUrl('content/remain/more-detail.html'),
            controller: RemainMoreDetailCtrl});

} ]);


function RemainListCtrl($rootScope, $scope, $http, $compile, $timeout, $filter, $location, $log, $route, $routeParams, $translate,$modal) {
    $log.info('Enter RemainListCtrl');

    if (!$rootScope.paging) {
    		$rootScope.paging = APP.DEFAULT_PAGING;
    }
    if (!$rootScope.criteria) {
    		$rootScope.criteria = {};
    }
    $scope.adminId = user_id;
	console.log($scope.adminId);
    $scope.search = function(page_number){
      $scope.sendToTotalOut == $scope.sendToTotalIn;
      $scope.finishTotalOut == $scope.finishTotalIn;
			if(page_number == undefined){
				var page_number = '1';
			}
			angular.extend($rootScope.criteria, $rootScope.paging);
      $http.get('API/admin/remain/getJobByAdminId.php?admin_id='+$scope.adminId).success(function (data){
      $scope.remainList = data;
	  console.log($scope.remainList);
      angular.forEach($scope.remainList, function (item) {
                $http.get('API/admin/getUserDepartment.php?cost_id='+item.job_dep_of_durable).success(function (data){
                  $scope.getUserDepartment = data;
                  item.nameCost = $scope.getUserDepartment;
                if(item.job_acc_status == "1"){
                  item.jobStatusStr = 'รับมา';
                  item.colorStatus = 'orange';
                }else if(item.job_acc_status == "2"){
                  item.jobStatusStr = 'ถูกส่งต่อมา';
                  item.colorStatus = 'green';
                }
                if(item.job_last_status != '0' ){
                  if(item.job_last_status == '6'){
                    item.jobStatusStr = 'รับส่งมอบส่งซ่อม';
                    item.colorStatus = 'blue';
                  }else if(item.job_last_status == '7'){
                    item.jobStatusStr = 'รับส่งมอบสั่งซื้ออุปกรณ์';
                    item.colorStatus = 'blue';
                  }else if(item.job_last_status == '8'){
                    item.jobStatusStr = 'รับส่งมอบสั่งซื้อทดแทน';
                    item.colorStatus = 'blue';
                  }
                }
                  var dateNow = new Date(item.job_date_created);
              		var dayNow = ("0" + dateNow.getDate()).slice(-2);
              		var monthNow = ("0" + (dateNow.getMonth() + 1)).slice(-2);
                  var calY = dateNow.getFullYear();
              		var yearNow = calY + 543;
                  item.dateRequest = dayNow+"/"+monthNow+"/"+yearNow;
                });
        });
				$http.get('API/user/getTotalJob.php?user_id='+$scope.id).success(function(resp){
					$scope.jobTotal = resp;
					$rootScope.paging.totalItems = $scope.remainList.length;
					$rootScope.paging.showing = _.getShowing($rootScope.paging.pageNumber, $rootScope.paging.limit, $scope.remainList.length);
				});
				});
        $http.get('API/admin/remain/getSendToTotal.php').success(function (data){
          $scope.stTotal = data;
          $scope.sendToTotalOut = $scope.stTotal.totalC;
        });
        $http.get('API/admin/remain/getFinishTotal.php').success(function (data){
          $scope.fnTotalOut = data;
          $scope.finishTotalOut = $scope.fnTotalOut.totalJS;
        });
			}
      $scope.search();
      $scope.selectPage = function(page) {
        $rootScope.paging.pageNumber = page;
        $scope.search(page);
      };
    $scope.gotoRemainPopup = function (id) {
        var modalInstance = $modal.open({
            templateUrl: 'content/popup/remain/remain-popup.html',
            controller: remainPopupCtrl,
            backdrop: 'static',
            windowClass: 'large',
            keyboard: false,
            resolve: {
                params_id: function () {
                    return id;
                },
                params_allPeriod: function(){
                    $scope.periodList = [{"dis":$scope.period1,"nameB":"08:10","nameF":"09:00","value":"1"},
                        {"dis":$scope.period2,"nameB":"09:00","nameF":"09:50","value":"2"},
                        {"dis":$scope.period3,"nameB":"09:50","nameF":"10:40","value":"3"},
                        {"dis":$scope.period4,"nameB":"10:40","nameF":"11:30","value":"4"},
                        {"dis":$scope.period5,"nameB":"11:30","nameF":"12:30","value":"5"},
                        {"dis":$scope.period6,"nameB":"12:30","nameF":"13:20","value":"6"},
                        {"dis":$scope.period7,"nameB":"13:20","nameF":"14:10","value":"7"},
                        {"dis":$scope.period8,"nameB":"14:10","nameF":"15:00","value":"8"},
                        {"dis":$scope.period9,"nameB":"15:00","nameF":"15:50","value":"9"},
                        {"dis":$scope.period10,"nameB":"15:50","nameF":"16:30","value":"10"},];
                    return $scope.periodList;
                }
            }
        });
        modalInstance.result.then(function (isClose) {
        }, function () {
            $log.info('Modal dismissed at: ' + new Date());
        });
    };
    $scope.sendToOfficer = function (id,dur_id) {
        var modalInstance = $modal.open({
            templateUrl: 'content/popup/remain/sendTo-popup.html',
            controller: sendToPopupCtrl,
            backdrop: 'static',
            windowClass: 'large',
            keyboard: false,
            resolve: {
                params_id: function () {
                    return id;
                },
                params_dur_id: function () {
                    return dur_id;
                }
            }
        });
        modalInstance.result.then(function (isClose) {
        }, function () {
            $log.info('Modal dismissed at: ' + new Date());
        });
    };
  (function my_func() {
    $http.get('API/admin/remain/getSendToTotal.php').success(function (data){
      $scope.stTotalIn = data;
      $scope.sendToTotalIn = $scope.stTotalIn.totalC;
    });
    $http.get('API/admin/remain/getFinishTotal.php').success(function (data){
      $scope.fnTotalIn = data;
      $scope.finishTotalIn = $scope.fnTotalIn.totalJS;
    });
    if($scope.finishTotalOut == $scope.finishTotalIn){
    }else if($scope.finishTotalOut < $scope.finishTotalIn){
      $scope.search();
    }
    if($scope.sendToTotalOut == $scope.sendToTotalIn){
    }else if($scope.sendToTotalOut < $scope.sendToTotalIn){
      $scope.search();
    }
  setTimeout( my_func, 1000 );
    })();
    $scope.finishJob = function (job_id,dur_id,job_type){
      var modalInstance = $modal.open({
          templateUrl: 'content/popup/remain/finishJob-popup.html',
          controller: finishJobCtrl,
          backdrop: 'static',
          windowClass: 'large',
          keyboard : false,
          resolve : {
            params_job_id: function () {
            return job_id;
            },
            params_dur_id:function (){
            return dur_id;
            },
            params_job_type:function (){
            return job_type;
            }
          }
      });
      modalInstance.result.then(function (isClose) {
      }, function () {
          $log.info('Modal dismissed at: ' + new Date());
      });
    }
    $scope.gotoMoreDetail = function (id){
      $location.path('/remain-list/more-detail/'+id);
    }
}


function RemainMoreDetailCtrl($rootScope, $scope, $http, $compile, $timeout, $filter, $location, $log, $route, $routeParams, $translate,$modal) {
    $log.info('Enter RemainMoreDetailCtrl');

    $scope.job_id = $routeParams.id;
    $scope.lov_code = "ACTJ";
    $http.get('API/admin/getJobById.php?job_id='+$scope.job_id).success(function (data){
      $scope.getJobById = data;
      $http.get('API/admin/getJobType.php?lov_code='+$scope.lov_code+'&lov_value='+$scope.getJobById.job_type).success(function (data){
        $scope.getJobById.job_typeStr = data;
      });

      $http.get('API/admin/getUserDepartment.php?cost_id='+$scope.getJobById.dur_department).success(function (data){
        $scope.getJobById.costName = data;
      });
      $http.get('API/user/getNameOfficer.php?officer_id='+$scope.getJobById.job_acc_by).success(function (data){
        $scope.getJobById.userName = data;
      });
    });
    $scope.sendToOfficer = function (id,dur_id) {
        var modalInstance = $modal.open({
            templateUrl: 'content/popup/remain/sendTo-popup.html',
            controller: sendToPopupCtrl,
            backdrop: 'static',
            windowClass: 'large',
            keyboard: false,
            resolve: {
                params_id: function () {
                    return id;
                },
                params_dur_id: function () {
                    return dur_id;
                }
            }
        });
        modalInstance.result.then(function (isClose) {
        }, function () {
            $log.info('Modal dismissed at: ' + new Date());
        });
    };
    $scope.finishJob = function (){
      var modalInstance = $modal.open({
          templateUrl: 'content/popup/remain/finishJob-popup.html',
          controller: finishJobCtrl,
          backdrop: 'static',
          windowClass: 'large',
          keyboard : false,
          resolve : {
              params_job_id: function () {
                  return $scope.getJobById.job_id;
              },
              params_dur_id: function () {
                      return $scope.getJobById.dur_id;
              },
              params_job_type: function () {
                      return $scope.getJobById.job_type;
              }
          }
      });
      modalInstance.result.then(function (isClose) {
      }, function () {
          $log.info('Modal dismissed at: ' + new Date());
      });
    }
    $scope.back = function (){
      $location.path('/remain-list');
    }
}
