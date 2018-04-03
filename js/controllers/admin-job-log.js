angular.module('myApp').config([ '$routeProvider', function($routeProvider) {
	 $routeProvider.when("/admin-job-log", {templateUrl: _.toHttpGetUrl("content/admin/job-log/admin-job-log.html"), controller: JobLogCtrl});
} ]);

function JobLogCtrl($rootScope, $scope, $http, $compile, $timeout, $filter, $location) {

	if (!$rootScope.paging) {
		$rootScope.paging = APP.DEFAULT_PAGING;
	}
	if (!$rootScope.criteria) {
		$rootScope.criteria = {};
	}
	
	$scope.schedulerTypeList = [{"id":"01","name":"Cron 1"},
	                        {"id":"02","name":"Cron 2"}];
	
	$scope.jobTypeList = [{"id":"01","name":"JobType 1"},
	                      {"id":"02","name":"JobType 2"}];
	
	$scope.statusList = [{"id":"01","name":"Complete"},
	                     {"id":"02","name":"Incomplete"}];
	
	
	// Clear Search Criteria
	$scope.clear = function(){
		$rootScope.criteria = {};
	};
	
	$scope.search = function(){
		
		angular.extend($rootScope.criteria, $rootScope.paging);
		//var url = _.toHttpGetUrl('api/jobLog/findjobLog', $rootScope.criteria);
		//$http.get(url).success(function(data){
		
		$scope.jobLogList = [{"jobID":"1","jobName":"BK001CMI_YesFile_001","jobType":"JobType 1","schedulerType":"Cron 1","startDate":"11/08/2558","completeDate":"09/09/2559","desc":"DSPT 22222","jobStatus":"Scheduler","status":"Incomplete"}
		,{"jobID":"2","jobName":"BK001VMI_YesFile_002","jobType":"JobType 2","schedulerType":"Cron 2","startDate":"01/06/2557","completeDate":"01/06/2557","desc":"Create Description","jobStatus":"Scheduler","status":"Complete"}];
		

		if ($scope.criteria.jobName != null) {
			$scope.jobLogList = $filter('filter')($scope.jobLogList, function(value){return (value.jobName == $scope.criteria.jobName);});
		}
		
		if ($scope.criteria.status != null & $scope.criteria.status != "") {
			$scope.jobLogList = $filter('filter')($scope.jobLogList, function(value){return (value.status == $scope.criteria.status);});
		}
		
		if($scope.criteria.startDate != null){
			$scope.jobLogList = $filter('filter')($scope.jobLogList, function(value){return (value.startDate == $scope.criteria.startDate);});	
		}
		if($scope.criteria.jobType != null){
			$scope.jobLogList = $filter('filter')($scope.jobLogList, function(value){return (value.jobType == $scope.criteria.jobType);});
		}
		if($scope.criteria.schedulerType != null){
			$scope.jobLogList = $filter('filter')($scope.jobLogList, function(value){return (value.schedulerType == $scope.criteria.schedulerType);});
		}
		if($scope.criteria.completeDate != null){
			$scope.jobLogList = $filter('filter')($scope.jobLogList, function(value){return (value.completeDate == $scope.criteria.completeDate);});
			
		}
		
		
		$rootScope.paging.totalItems = $scope.jobLogList.length;
		$rootScope.paging.showing = _.getShowing($rootScope.paging.pageNumber, $rootScope.paging.limit, $scope.jobLogList.length);
	};		
	$scope.search();
	
	$scope.selectPage = function(page) {
		$rootScope.paging.pageNumber = page;
		$scope.search();
	};
	
	//Delete jobLog
	$scope.deletejobLog = function(deleteOne) {
		$scope.jobIdList = [];
		if(deleteOne != undefined){
			$scope.jobIdList.push(deleteOne);
		}else{
			$('#dtable_ShowjobLog').find('input:checked[name=row_jobLog]').each(function(index, element) {
				$scope.jobIdList.push(element.value);				
			});
		}
		if ( $scope.jobIdList.length != 0 ) {
		  $scope.app.confirmDeleteBox().open().then(function(result) {
				if (result) {				
					//$http['delete']("api/jobLog/deletejobLog/"+$scope.jobIdList.join(",")+"?jobLogCode="+$scope.authorization.getCurrentjobLogCode()).success(function(data) {
						$scope.app.addAlertSuccessDelete();
						$scope.back(); 
						$scope.checked = false;
					//});
				};
		  });	        	  
		};
	};
};