angular.module('myApp').config([ '$routeProvider', function($routeProvider) {
    $routeProvider.when("/completed-list",
        {templateUrl:_.toHttpGetUrl('content/completed/completed-list.html'),
            controller: CompletedListCtrl});
    $routeProvider.when("/complete/more-detail/:id", {templateUrl:_.toHttpGetUrl('content/completed/more-detail.html'), controller: MoreDetailCtrl});

} ]);


function CompletedListCtrl($rootScope, $scope, $http, $compile, $timeout, $filter, $location, $log, $route, $routeParams, $translate,$modal) {
    $log.info('Enter CompletedListCtrl');

    if (!$rootScope.paging) {
			$rootScope.paging = APP.DEFAULT_PAGING;
		}
		if (!$rootScope.criteria) {
			$rootScope.criteria = {};
		}

    $scope.user_id = user_id;
    $scope.search = function (page_number){
      if(page_number == undefined){
				var page_number = '1';
			}
			angular.extend($rootScope.criteria, $rootScope.paging);

      $http.get('API/admin/completed/getJobComplete.php?user_id='+$scope.user_id+"&page_number="+page_number).success(function (data){
        $scope.getJobComplete = data;
        console.log($scope.getJobComplete);
        angular.forEach($scope.getJobComplete,function (item){
            $http.get('API/admin/getUserDepartment.php?cost_id='+item.job_dep_of_durable).success(function (data){
              $scope.CostName = data;
              item.dur_DepartmentStr = $scope.CostName.substring(0, 10)+"..";
              item.costName = $scope.CostName;
              var dateStr = new Date(item.job_date_created);
              var gd = dateStr.getDate();
              var gm = ("0" + (dateStr.getMonth() + 1)).slice(-2);
              var gy = dateStr.getFullYear();
              var cy = gy+543;
              item.date_create = gd+"/"+gm+"/"+cy;
            });
        });
        $http.get('API/admin/completed/getTotalComplete.php?user_id='+$scope.user_id).success(function (data){
          $scope.getTotalComplete = data;
          $rootScope.paging.totalItems = $scope.getTotalComplete.totalC;
          $rootScope.paging.showing = _.getShowing($rootScope.paging.pageNumber, $rootScope.paging.limit, $scope.getTotalComplete.totalC);
        });


      });
    }
    $scope.search();



    $scope.selectPage = function(page) {
      $rootScope.paging.pageNumber = page;
      $scope.search(page);
    };
    //Call Pop up
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

    $scope.gotoMoreDetail = function (id){
      $location.path('complete/more-detail/'+id);
    }

}



function MoreDetailCtrl($rootScope, $scope, $http, $compile, $timeout, $filter, $location, $log, $route, $routeParams, $translate,$modal) {
    $log.info('Enter MoreDetailCtrl');
    $scope.job_id = $routeParams.id;
    $http.get('API/admin/getJobSuccessById.php?job_id='+$scope.job_id).success(function (data){
      $scope.getJobById = data;
	  console.log($scope.getJobById);
      $http.get('API/admin/getUserDepartment.php?cost_id='+$scope.getJobById.dur_department).success(function (data){
        $scope.getJobById.costName = data;
      });
      $http.get('API/user/getNameOfficer.php?officer_id='+$scope.getJobById.job_acc_by).success(function (data){
        $scope.getJobById.userName = data;
      });
	  $http.get('API/user/getNameOfficer.php?officer_id='+$scope.getJobById.officer_finish).success(function (data){
        $scope.getJobById.officerName = data;
      });
    });
    $scope.sendToOfficer = function (id) {
        var modalInstance = $modal.open({
            templateUrl: 'content/popup/remain/sendTo-popup.html',
            controller: sendToPopupCtrl,
            backdrop: 'static',
            windowClass: 'large',
            keyboard: false,
            resolve: {
                params_id: function () {
                    return id;
                }
            }
        });
        modalInstance.result.then(function (isClose) {
        }, function () {
            $log.info('Modal dismissed at: ' + new Date());
        });
    };
    $scope.finishJob = function (job_id){
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
              params_dur_id: function () {
                      return dur_id;
              }
          }
      });
      modalInstance.result.then(function (isClose) {
      }, function () {
          $log.info('Modal dismissed at: ' + new Date());
      });
    }
    $scope.back = function (){
      $location.path('/completed-list');
    }
}
