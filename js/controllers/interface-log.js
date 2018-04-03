angular.module('myApp').config([ '$routeProvider', function($routeProvider) {
	$routeProvider.when("/interface-log", {templateUrl: _.toHttpGetUrl("content/interface/interface-log-list.html"), controller: InterfaceLogListCtrl });
} ]);

function InterfaceLogListCtrl($rootScope, $scope, $http, $compile, $filter, $timeout, $routeParams, $location, $log) {
	$log.info('Enter InterfaceLogListCtrl');
	
	if (!$rootScope.paging) {
		$rootScope.paging = APP.DEFAULT_PAGING;
	}
	if (!$rootScope.criteria) {
		$rootScope.criteria = {};
	}
	
	$scope.interfaceTypeList = [{"id":"01","name":"Manual Import File"},
	                            {"id":"02","name":"Import form Email"},
	                            {"id":"03","name":"Scheduler"}];
	
	
	$scope.policyTypeList = [
	          			  {"id":"1" , "name":"Yes File"}
	          			, {"id":"2" , "name":"CMI Endorsement"}
	          			, {"id":"3" , "name":"VMI Endorsement"}
	          			, {"id":"4" , "name":"CMI Cancel"}
	          			, {"id":"5" , "name":"VMI Cancel"}
	          		];
	$scope.statusList = [
	                     {"id":"1" , "name":"Active"}
	       			, {"id":"2" , "name":"Inactive"}
	       		];
	
	// Clear Search Criteria
	$scope.clear = function(){
		$rootScope.criteria = {};
	};
	
	$scope.search = function(){
		
		angular.extend($rootScope.criteria, $rootScope.paging);
		//var url = _.toHttpGetUrl('api/jobLog/findjobLog', $rootScope.criteria);
		//$http.get(url).success(function(data){
		
		$scope.interfaceLogList = [{"no":"1","interfaceType":"Scheduler","profile":"BK001_CMIYESFILE","broker":"BK001:TISCO","fileName":"YESFILE_20140501.txt","status":"Active","product":"","project":"Project 1","branch":"Bangkok","policyType":"Yes File","importDate":"01/01/2557 08:00:00"}
		,{"no":"2","interfaceType":"Manual Import File","profile":"BK001_VMIYESFILE","broker":"BK002:TISCO","fileName":"YESFILE_20140502.txt","status":"Active","product":"","project":"Project 2","branch":"Bangkok","policyType":"CMI Endorsement","importDate":"01/01/2557 08:00:00"}
		,{"no":"3","interfaceType":"Import form Email","profile":"BK001_PA01YESFILE","broker":"BK003:TISCO","fileName":"YESFILE_20140503.txt","status":"Active","product":"","project":"Project 3","branch":"Bangkok","policyType":"VMI Endorsement","importDate":"01/01/2557 08:00:00"}
		,{"no":"4","interfaceType":"Scheduler","profile":"BK001_CMIEndorse","broker":"BK004:TISCO","fileName":"CMIEndorse_20140501.txt","status":"Active","product":"","project":"Project 4","branch":"Bangkok","policyType":"CMI Cancel","importDate":"01/01/2557 08:00:00"}
		,{"no":"5","interfaceType":"Manual Import File","profile":"BK001_CMIEndorse","broker":"BK005:TISCO","fileName":"CMIEndorse_20140502.txt","status":"Active","product":"","project":"Project 5","branch":"Bangkok","policyType":"VMI Cancel","importDate":"01/01/2557 08:00:00"}
		,{"no":"6","interfaceType":"Import form Email","profile":"BK001_CMIEndorse","broker":"BK006:TISCO","fileName":"CMIEndorse_20140503.txt","status":"Inactive","product":"","project":"Project 6","branch":"Bangkok","policyType":"Yes File","importDate":"01/01/2557 08:00:00"}
		,{"no":"7","interfaceType":"Scheduler","profile":"BK001_VMIEndorse","broker":"BK007:TISCO","fileName":"VMIEndorse_20140501.txt","status":"Active","product":"","project":"Project 7","branch":"Bangkok","policyType":"New","importDate":"01/01/2557 08:00:00"}
		,{"no":"8","interfaceType":"Manual Import File","profile":"BK001_VMIEndorse","broker":"BK008:TISCO","fileName":"VMIEndorse_20140502.txt","status":"Active","product":"","project":"Project 8","branch":"Bangkok","policyType":"Yes File","importDate":"01/01/2557 08:00:00"}
		,{"no":"9","interfaceType":"Manual Import File","profile":"BK001_CMICancel","broker":"BK009:TISCO","fileName":"CMICancel_20140501.txt","status":"Inactive","product":"","project":"Project 9","branch":"Bangkok","policyType":"VMI Cancel","importDate":"01/01/2557 08:00:00"}
		,{"no":"10","interfaceType":"Scheduler","profile":"BK001_CMICancel","broker":"BK0010:TISCO","fileName":"CMICancel_20140502.txt","status":"Active","product":"","project":"Project 10","branch":"Bangkok","policyType":"Yes File","importDate":"01/01/2557 08:00:00"}
		,{"no":"11","interfaceType":"Scheduler","profile":"BK001_VMICancel","broker":"BK0011:TISCO","fileName":"VMICancel_20140503.txt","status":"Active","product":"","project":"Project 11","branch":"Bangkok","policyType":"Yes File","importDate":"01/01/2557 08:00:00"}];
		


		if ($scope.criteria.interfaceType != null) {
			$scope.interfaceLogList = $filter('filter')($scope.interfaceLogList, function(value){return (value.interfaceType == $scope.criteria.interfaceType);});
		}
		
		if($scope.criteria.policyType !=null){
			$scope.interfaceLogList = $filter('filter')($scope.interfaceLogList, function(value){return (value.policyType == $scope.criteria.policyType);});
		}
		if($scope.criteria.status !=null){
			$scope.interfaceLogList = $filter('filter')($scope.interfaceLogList, function(value){return (value.status == $scope.criteria.status);});
		}
		
		if($scope.criteria.project != null){
			$scope.interfaceLogList = $filter('filter')($scope.interfaceLogList, function(value){return (value.project == $scope.criteria.project);});
		}
		if($scope.criteria.broker != null){
			$scope.interfaceLogList = $filter('filter')($scope.interfaceLogList, function(value){return (value.broker == $scope.criteria.broker);});
		}
		
		
		$rootScope.paging.totalItems = $scope.interfaceLogList.length;
		$rootScope.paging.showing = _.getShowing($rootScope.paging.pageNumber, $rootScope.paging.limit, $scope.interfaceLogList.length);
	};		
	$scope.search();
	
	//Delete Interface
	/*$scope.deleteSelected = function() {
		var deleteList = [];
		$('input:checked[name=row_sel]').each(function(index, element) {
			deleteList.push(element.value);
		});
		
		if (deleteList.length > 0) {
			myFunction.confirmDeleteBox().result.then(function(ok) {
				if (ok) {
					//$http.post(APP.CONTEXT_PATH+'/api/listOfValue/deleteListOfValue', deleteList).success(function(resp) {
						myFunction.alertDeleteSuccess();
						$scope.search();
					//});
				};
			});
		}
	};*/
	
	$scope.selectPage = function(page) {
		$rootScope.paging.pageNumber = page;
		$scope.search();
	};
	
};
