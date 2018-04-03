angular.module('myApp').config([ '$routeProvider', function($routeProvider) {
    $routeProvider.when("/all-job",{templateUrl:_.toHttpGetUrl('content/job/all-job.html'),controller: AllJobDCtrl});
    $routeProvider.when("/job/:id",{templateUrl:_.toHttpGetUrl('content/job/job-detail.html'),controller: JobDetailCtrl});
    $routeProvider.when("/job/detail/:dur_id", {templateUrl:_.toHttpGetUrl('content/job/job-durable.html'), controller: JobDurableCtrl});
    $routeProvider.when("/job/history/:job_id", {templateUrl:_.toHttpGetUrl('content/job/job-history.html'), controller: JobHistoryCtrl});


} ]);

function AllJobDCtrl($rootScope, $scope, $http, $compile, $timeout, $filter, $location, $log, $route, $routeParams, $translate,$modal,myFunction) {
    $log.info('Enter AllJobDCtrl');

    $http.get('API/admin/getAllJob.php').success(function (data){
      $scope.getAllJob = data;
    });
    $scope.user_id = user_id;
    if (!$rootScope.paging) {
  		$rootScope.paging = APP.DEFAULT_PAGING;
  	}
  	if (!$rootScope.criteria) {
  		$rootScope.criteria = {};
  	}

    $scope.keydown = function (event) {
      if (event.keyCode === 13) {
        $scope.search();
      }
    };


      $http({
        url:'API/lov/getDepartment.php',
        method:'POST'
      }).then(function (resp){
        $scope.depList = resp.data;
        console.log($scope.depList);
      })

      $http({
        url:'API/lov/getAllStatus.php',
        method:'POST'
      }).then(function (resp){
        $scope.allStatusList = resp.data;
        console.log($scope.allStatusList);
      })

  	$scope.search = function (page_number){
      if(page_number == undefined){
        var page_number = '1';
    }

      angular.extend($rootScope.criteria, $rootScope.paging);


      console.log($rootScope.criteria.dur_numoe);

        $http({
          url:'API/admin/getAllJob.php',
          method:'POST',
          data:{
            'page_number':page_number,
            'dur_numoe':$rootScope.criteria.dur_numoe,
            'dep':$rootScope.criteria.dep,
            'status':$rootScope.criteria.status

          }
        }).success(function (data){
          $scope.getAllJobList = data;
        console.log($scope.getAllJobList)
          angular.forEach($scope.getAllJobList, function (item) {
                      item.dateThai = myFunction.serviceDate(item.job_date_created)
        })
            $http.get('API/admin/getJobTotal.php').success(function(resp){
    					$scope.jobTotal = resp;
              $rootScope.paging.totalItems = $scope.jobTotal.totalC;
    					$rootScope.paging.showing = _.getShowing($rootScope.paging.pageNumber, $rootScope.paging.limit, $scope.jobTotal.totalC);
    				});
  			 });


  	}

    $scope.search();
    $scope.selectPage = function(page) {
      $rootScope.paging.pageNumber = page;
      $scope.search(page);
    };

    $scope.gotoEditStatus = function (id){
      console.log(id);
      myFunction.confirmAcceptJobBox().result.then(function(ok) {
        if (ok) {
           $http.get('API/admin/job/saveStatusToAccept.php?job_id='+id).success(function (resp){
             $scope.updated = resp
             console.log($scope.updated);
             if($scope.updated == 1){
               $scope.app.addAlert('gritter-success', 'เปลี่ยนสถานะเป็นรับงานแล้ว', 4000);
               $scope.search()
             }
           })
        }
      })
    }
    $scope.confirmJob = function (job_id){
			var modalInstance = $modal.open({
					templateUrl: 'content/popup/admin/confirmJob-popup.html',
					controller: confirmJobPopupCtrl,
					backdrop: 'static',
					windowClass: 'large',
					keyboard: false,
					resolve: {
							params_job_id: function () {
									return job_id;
							},
							params_officer_id : function () {
								return $scope.user_id;
							}
					}
			});
			modalInstance.result.then(function (isClose) {
			}, function () {
					$log.info('Modal dismissed at: ' + new Date());
			});
		}

    $scope.clear = function (){
      $rootScope.criteria = {}
      $scope.search()
    }
}

function JobDetailCtrl($rootScope, $scope, $http, $compile, $timeout, $filter, $location, $log, $route, $routeParams, $translate,$modal) {
    $log.info('Enter JobDetailCtrl');
  $scope.job_id = $routeParams.id;
  $scope.id = user_id;
  try{
    $http.get('API/user/getUserById.php?user_id='+$scope.id).success(function(data){
		$scope.getUserById = data;
    $rootScope.criteria.fullName = $scope.getUserById.Pre_name+$scope.getUserById.Mem_name+"  "+$scope.getUserById.Mem_lastname;
		});
  }catch(err){
    location.reload();
  }


  try{
    $http.get('API/user/getJobById.php?job_id='+$scope.job_id).success(function (data){
      $scope.jobObj = data;
      $rootScope.criteria.waste = $scope.jobObj.job_header;
          $http.get('API/admin/getUserDepartment.php?cost_id='+$scope.jobObj.job_dep_of_durable).success(function (data){
              $scope.getDeartment = data;
              $rootScope.criteria.costName = $scope.getDeartment;
          });
    });
  }catch (error){
    location.reload();
  }
  $scope.gotoDashboard = function (){
    $location.path("/");
  }
}


function JobDurableCtrl($rootScope, $scope, $http, $compile, $timeout, $filter, $location, $log, $route, $routeParams, $translate,$modal) {
    $log.info('Enter JobDurableCtrl');
    $scope.dur_id = $routeParams.dur_id;

    $http.get('API/fix/getDurableDetailById.php?dur_id='+$scope.dur_id).success(function (data){
      $scope.getDurableDetailById = data;
    });
    $http.get('API/admin/getJobByDurId.php?dur_id='+$scope.dur_id).success(function (data){
      $scope.getJobByDurId = data;
      angular.forEach($scope.getJobByDurId,function (item){
        $http.get('API/user/getNameOfficer.php?officer_id='+item.officer_finish).success(function (data) {
            $scope.nameOfficer = data;
            item.nameOfficerStr = $scope.nameOfficer;
        });
        $http.get('API/user/getNameOfficer.php?officer_id='+item.job_user_id).success(function (data) {
            $scope.nameUser = data;
            item.nameUserStr = $scope.nameUser;
        });


        var nd = new Date(item.job_date_created);
        var gd = ("0"+nd.getDate()).slice(-2);
        var gm = ("0" + (nd.getMonth() + 1)).slice(-2)
        var gy = nd.getFullYear();
        var cy = gy+543;
        item.dateThai = gd+"/"+gm+"/"+cy;
      });
    });
    $scope.gotoDurableHis = function (){
      window.open('./mpdf/report/durableHistory.php?dur_id='+$scope.dur_id, '_blank');
    }
    $scope.gotoMoreDetail = function (id){
      alert(id);
      $location.path('/job/history/'+id)
    }
}

function JobHistoryCtrl($rootScope, $scope, $http, $compile, $timeout, $filter, $location, $log, $route, $routeParams, $translate,$modal) {
    $log.info('Enter JobHistoryCtrl');
    $scope.job_id = $routeParams.job_id;
    $http.get('API/admin/job/getJobHistory.php?job_id='+$scope.job_id).success(function (data){
      $scope.getJobHistoryList = data;
    })
}
