angular.module('myApp').config([ '$routeProvider', function($routeProvider) {
	$routeProvider.when("/admin-scheduler-job", {templateUrl: _.toHttpGetUrl("content/admin/schedule-job/admin-schedule-job.html"), controller: AdminScheduleJobCtrl});
    $routeProvider.when("/admin-scheduler-job/:mode", {templateUrl: _.toHttpGetUrl("content/admin/schedule-job/admin-schedule-job-detail.html"), controller: AdminScheduleJobDetaillCtrl});
    $routeProvider.when("/admin-scheduler-job/:mode/:id", {templateUrl: _.toHttpGetUrl("content/admin/schedule-job/admin-schedule-job-detail.html"), controller: AdminScheduleJobDetaillCtrl});
} ]);

function AdminScheduleJobCtrl($rootScope, $scope, $http, $compile, $timeout, $filter, $location) {

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
	
	
	$scope.statusList = [{"id":"01","name":"Active"},
	                     {"id":"02","name":"Inactive"}];
	
	$scope.jobStatusList = [{"id":"01","name":"Running"},
	                    {"id":"02","name":"End"},
	                    {"id":"03","name":"Schedule"}];
	
	
	// Clear Search Criteria
	$scope.clear = function(){
		$rootScope.criteria = {};
	};
	
	$scope.search = function(){
		
		angular.extend($rootScope.criteria, $rootScope.paging);
		//var url = _.toHttpGetUrl('api/jobLog/findjobLog', $rootScope.criteria);
		//$http.get(url).success(function(data){
		
		$scope.schedulerJobList = [{"jobID":"1","jobName":"BK001CMI_YesFile_001","jobType":"JobType 1","schedulerType":"Cron 1","nextRun":"01/06/2557 08:00:00","desc":"This description","jobStatus":"Schedule","statusEn":"Inactive","status":"I","createdBy":"KPIADM","createdDate":1385005799296,"modifiedBy":"KPIADM","modifiedDate":1386649451607}
		,{"jobID":"2","jobName":"BK001VMI_YesFile_002","jobType":"JobType 2","schedulerType":"Cron 2","nextRun":"01/06/2557 08:10:00","desc":"","jobStatus":"Running","statusEn":"Active","status":"A","createdBy":"KPIADM","createdDate":1385005799296,"modifiedBy":"KPIADM","modifiedDate":1386649451607}];
		
		
		if ($scope.criteria.jobName != null) {
			$scope.schedulerJobList = $filter('filter')($scope.schedulerJobList, function(value){return (value.jobName == $scope.criteria.jobName);});
		}
		if($scope.criteria.jobType != null){
			$scope.schedulerJobList = $filter('filter')($scope.schedulerJobList, function (value){return (value.jobType == $scope.criteria.jobType);});
			
		}
		if($scope.criteria.schedulerType != null){
			$scope.schedulerJobList = $filter('filter')($scope.schedulerJobList, function (value){return (value.schedulerType == $scope.criteria.schedulerType);});
		}
		if($scope.criteria.nextRun != null){
			$scope.schedulerJobList = $filter('filter')($scope.schedulerJobList, function (value){return (value.nextRun == $scope.criteria.nextRun);});
			
		}
		if ($scope.criteria.status != null & $scope.criteria.status != "") {
			$scope.schedulerJobList = $filter('filter')($scope.schedulerJobList, function(value){return (value.status == $scope.criteria.status);});
		}
		if($scope.criteria.jobStatus != null){
			$scope.schedulerJobList = $filter('filter')($scope.schedulerJobList, function(value){return (value.jobStatus == $scope.criteria.jobStatus);});
		}
		
		$rootScope.paging.totalItems = $scope.schedulerJobList.length;
		$rootScope.paging.showing = _.getShowing($rootScope.paging.pageNumber, $rootScope.paging.limit, $scope.schedulerJobList.length);
	};		
	$scope.search();
	
	$scope.selectPage = function(page) {
		$rootScope.paging.pageNumber = page;
		$scope.search();
	};
	
	//Delete schedulerJob
	$scope.deleteSchedulerJob = function(deleteOne) {
		$scope.jobIDList = [];
		if(deleteOne != undefined){
			$scope.jobIDList.push(deleteOne);
		}else{
			$('#dtable_ShowSchedulerJob').find('input:checked[name=row_schedulerJob]').each(function(index, element) {
				$scope.jobIDList.push(element.value);				
			});
		}
		if ( $scope.jobIDList.length != 0 ) {
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
	
	$scope.gotoCreate = function() {
		$location.path('/admin-scheduler-job/create');
	};
	
	$scope.gotoEdit = function(jobID) {
		$location.path('/admin-scheduler-job/edit/'+jobID);
	};
};

function AdminScheduleJobDetaillCtrl($rootScope, $scope, $http, $compile, $filter, $timeout, $routeParams, $location,$log) {

	$scope.jobTypeList = [{"id":"01","name":"JobType 1"},
	                      {"id":"02","name":"JobType 2"}];
	
	$scope.schedulerTypeList = [{"id":"01","name":"Cron 1"},
		                        {"id":"02","name":"Cron 2"}];
	
	
	// route parameter\
	$scope.schedulerJobList = [{"jobID":"1","jobName":"BK001CMI_YesFile_001","jobType":"JobType 1","schedulerType":"Cron 1","nextRun":"01/06/2557 08:00:00","desc":"This description","jobStatus":"Scheduler","statusEn":"Inactive","status":"I","createdBy":"KPIADM","createdDate":1385005799296,"modifiedBy":"KPIADM","modifiedDate":1386649451607}
	,{"jobID":"2","jobName":"BK001VMI_YesFile_002","jobType":"JobType 2","schedulerType":"Cron 2","nextRun":"01/06/2557 08:10:00","desc":"","jobStatus":"Running","statusEn":"Active","status":"A","createdBy":"KPIADM","createdDate":1385005799296,"modifiedBy":"KPIADM","modifiedDate":1386649451607}];;
	$scope.mode = $routeParams.mode;
	$scope.id = $routeParams.id;
	
	//check mode
	if($scope.mode == 'create'){
		// Cleart Search Criteria
		$scope.clear = function(){
			$rootScope.criteria = {};
		};
		$scope.schedulerJob ={
			status : 'A'
		};
		
		//Create SchedulerJob
		$scope.createSchedulerJob = function(){
			$scope.isSubmit = true;
			
			if($scope.form.$invalid){ //Validate Form
			
			   $scope.app.addAlert('gritter-error', 'Incorrect data !!!', 4000);
			   return;
			}
			
			//Call Back-End
			$rootScope.isLoading = true;
			_.compactObject($scope.schedulerJob);
		

			$scope.schedulerJob.createdBy = $scope.authorization.getCurrentJobID();
			$scope.schedulerJob.modifiedBy = $scope.authorization.getCurrentJobID();
			
			$scope.app.addAlertSuccessInsert();
			$scope.back();
			
		};
		
		//back
		$scope.back = function() {
			$location.path('/admin-scheduler-job');
		};
		
	}else {
		$scope.modeShow = 'edit';
		$scope.schedulerJob = _.findWhere($scope.schedulerJobList, {'jobID' : $routeParams.id + ''});
		$log.debug($scope.schedulerJob);
		$scope.schedulerJob.createdDate = _.toDateTimeStr($scope.schedulerJob.createdDate);
		$scope.schedulerJob.modifiedDate = _.toDateTimeStr($scope.schedulerJob.modifiedDate);

		//Update Scheduler Job
		$scope.updateSchedulerJob = function() {
			$scope.isSubmit = true;
	
			// validate form
			if ($scope.form.$invalid) {
				$scope.app.addAlertInvalid();
				return;
			}
	
			// Call back-end
			$rootScope.isLoading = true;
			_.compactObject($scope.schedulerJob);
			var url = "api/schedulerJob/updateSchedulerJob";
			$scope.SchedulerJob.modifiedBy = $scope.authorization.getCurrentJobID();
			$http.post(url, $scope.SchedulerJob).success(function(data) {
				$scope.app.addAlertSuccessUpdate();
				$scope.back();
			});
		};
	}
	
	//function
	$scope.save = function() {
		$scope.isSubmit = true;
		
		// validate form
		if ($scope.form.$invalid) {
			myFunction.alertRequiredFields();
			return;
		}
		
		// insert
		myFunction.confirmSaveBox().result.then(function(ok) {
			if (ok) {
				if ($scope.mode === 'create') {
					$scope.obj.createdSchrdulerJobId = LoginSchrdulerJob.employeeCode;
					$scope.obj.lastUpdatedSchrdulerJobId = LoginSchrdulerJob.employeeCode;
					/*$http.post(APP.CONTEXT_PATH+'/api/listOfValue/insertListOfValue', $scope.obj).success(function(resp) {
						myFunction.alertCreateSuccess();
						$rootScope.isValidateUnsaved = false;
						$scope.back();
					});*/
				}
				else {	// edit
					$scope.obj.lastUpdatedSchrdulerJobId = LoginSchrdulerJob.employeeCode;
					/*$http.post(APP.CONTEXT_PATH+'/api/listOfValue/updateListOfValue', $scope.obj).success(function(resp) {
						myFunction.alertUpdateSuccess();
						$rootScope.isValidateUnsaved = false;
						$scope.back();
					});*/
				}
			};
		});
	};
	
	$scope.back = function() {
		$location.path('/admin-scheduler-job');
	};
};
