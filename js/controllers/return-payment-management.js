angular.module('myApp').config([ '$routeProvider', function($routeProvider) {
	$routeProvider.when('/refund-batch-open-list', {templateUrl: _.toHttpGetUrl('content/return-payment-management/batch-open-list.html'), controller: RefundBatchOpenListCtrl});
	$routeProvider.when('/refund-batch-open/:mode/:id', {templateUrl: _.toHttpGetUrl('content/return-payment-management/batch-open-detail.html'), controller: RefundBatchOpenDetailCtrl});
	$routeProvider.when('/refund-open-close-batch', {templateUrl: _.toHttpGetUrl('content/return-payment-management/open-close-batch-list.html'), controller: RefundOpenCloseBatchListCtrl});
	$routeProvider.when('/refund-open-close-batch/:mode', {templateUrl: _.toHttpGetUrl('content/return-payment-management/open-close-batch-new.html'), controller: RefundOpenCloseBatchDetailCtrl});
	$routeProvider.when('/refund-open-close-batch/:mode/:id', {templateUrl: _.toHttpGetUrl('content/return-payment-management/open-close-batch-edit.html'), controller: RefundOpenCloseBatchDetailCtrl});
} ]);

function RefundBatchOpenListCtrl($rootScope, $scope, $http, $compile, $timeout, $filter, $location, $log, $route, $routeParams) {
	$log.info('Enter BatchOpenListCtrl');

	if (!$rootScope.paging) {
		$rootScope.paging = APP.DEFAULT_PAGING;
	}
	if (!$rootScope.criteria) {
		$rootScope.criteria = {};
	}
	
	// Clear Search Criteria
	$scope.clear = function(){
		$rootScope.criteria = {};
	};
	
	$scope.search = function(){
		$scope.batchOpenList = [{"batchID":"0001","openDate":"21/07/2557","remark":"Return Payment","status":"R","statusName":"Reserved","reservedBy":"นายประกัน กรุงไทย"}
		, {"batchID":"0002","openDate":"21/07/2557","remark":"Return Payment","status":"R","statusName":"Reserved","reservedBy":"นายประกัน ปลอดภัย"}
		, {"batchID":"0003","openDate":"01/07/2557","remark":"Return Payment","status":"O","statusName":"Opening","reservedBy":"นายสมชาย แก่นดี"}
		, {"batchID":"0004","openDate":"05/07/2557","remark":"Return Payment","status":"O","statusName":"Opening","reservedBy":"นางพุทธา ยอดดี"}
		, {"batchID":"0005","openDate":"21/07/2557","remark":"Return Payment","status":"R","statusName":"Reserved","reservedBy":"นายเนตร มั่นคง"}
		, {"batchID":"0006","openDate":"18/07/2557","remark":"Return Payment","status":"O","statusName":"Opening","reservedBy":"นางสาวหัสยา แก้วดี"}];
		
		if ($scope.criteria.status != null && $scope.criteria.status != "") {
			$scope.batchOpenList = $filter('filter')($scope.batchOpenList, function(value){return (value.status == $scope.criteria.status);});
		}
		
		$rootScope.paging.totalItems = $scope.batchOpenList.length;
		$rootScope.paging.showing = _.getShowing($rootScope.paging.pageNumber, $rootScope.paging.limit, $scope.batchOpenList.length);
		
	};
	
	$scope.search();
	
	$scope.gotoEdit = function(id) {
		$location.path('refund-batch-open/edit/'+id);
	};
	
	$scope.back = function() {
		$location.path('/refund-batch-open-list');
	};

}

function RefundBatchOpenDetailCtrl($rootScope, $scope, $http, $compile, $timeout, $filter, $location, $log, $route, $routeParams) {
	$log.info('Enter BatchOpenDetailCtrl');
	
	$scope.mode = $routeParams.mode;
	$scope.id = $routeParams.id;
	
	$scope.batchDetailList = [{"batchID":"0001","openDate":"21/07/2557","remark":"Return Payment","status":"R","statusName":"Reserved","reservedBy":"นายประกัน กรุงไทย","refNo":"Q11111111","policyNo":"DM002490001","endorseNo":"002490001","assured":"นางกรุงไทย ใจสมาน","creditCard":"2222222222222","paymentDate":"21/07/2557","amount":"12,000","apprCode":"12345","reason":"01","totalList":"12,000"}
	, {"batchID":"0002","openDate":"21/07/2557","remark":"Return Payment","status":"R","statusName":"Reserved","reservedBy":"นายประกัน ปลอดภัย","refNo":"Q11111112","policyNo":"DM002490002","endorseNo":"002490002","assured":"นายประกัน ปลอดภัย","creditCard":"1200000456666","paymentDate":"21/07/2557","amount":"2,000","apprCode":"33333","reason":"01","totalList":"2,000"}
	, {"batchID":"0003","openDate":"01/07/2557","remark":"Return Payment","status":"O","statusName":"Opening","reservedBy":"นายสมชาย แก่นดี","refNo":"Q11111113","policyNo":"DM002490003","endorseNo":"002490003","assured":"นางแก้วมณี แก่นดี","creditCard":"3566669900543","paymentDate":"01/07/2557","amount":"22,000","apprCode":"1244444","reason":"01","totalList":"22,000"}
	, {"batchID":"0004","openDate":"05/07/2557","remark":"Return Payment","status":"O","statusName":"Opening","reservedBy":"นางพุทธา ยอดดี","refNo":"Q11111114","policyNo":"DM002490004","endorseNo":"002490004","assured":"นางสาวสิณี ยอดดี","creditCard":"2300444411111","paymentDate":"05/07/2557","amount":"10,000","apprCode":"66666","reason":"01","totalList":"10,000"}
	, {"batchID":"0005","openDate":"21/07/2557","remark":"Return Payment","status":"R","statusName":"Reserved","reservedBy":"นายเนตร มั่นคง","refNo":"Q11111115","policyNo":"DM002490005","endorseNo":"002490005","assured":"นางกมล มั่นคง","creditCard":"3434111110098","paymentDate":"21/07/2557","amount":"8,000","apprCode":"4354534","reason":"01","totalList":"8,000"}
	, {"batchID":"0006","openDate":"18/07/2557","remark":"Return Payment","status":"O","statusName":"Opening","reservedBy":"นางสาวหัสยา แก้วดี","refNo":"Q11111116","policyNo":"DM002490006","endorseNo":"002490006","assured":"นางสาวอุ่นใจ แก้วดี","creditCard":"1500992222222","paymentDate":"18/07/2557","amount":"7,500","apprCode":"5555555","reason":"01","totalList":"7,500"}];
	
	if ($scope.id != null && $scope.id != "" && $scope.mode == "edit") {
		$scope.batchDetailList = $filter('filter')($scope.batchDetailList, function(value){return (value.batchID == $scope.id);});
	}
	
	$scope.back = function() {
		$location.path('/refund-batch-open-list');
	};
	
	$scope.detail = _.findWhere($scope.batchDetailList, {'batchID': $scope.id +''});
	$scope.reasonList = [{"reasonCode":"01","reasonName":"จ่ายเกิน"}];
	
	$scope.save = function() {
		$location.path('/refund-batch-open-list');
	};
	
}

function RefundOpenCloseBatchListCtrl($rootScope, $scope, $http, $compile, $timeout, $filter, $location, $log, $route, $routeParams) {
	$log.info('Enter OpenCloseBatchListCtrl');
	
	if (!$rootScope.paging) {
		$rootScope.paging = APP.DEFAULT_PAGING;
	}
	if (!$rootScope.criteria) {
		$rootScope.criteria = {};
	}
	
	// Clear Search Criteria
	$scope.clear = function(){
		$rootScope.criteria = {};
	};
	
	$scope.search = function(){
		$scope.batchOCList = [{"batchID":"0001","openDate":"21/07/2557","closeDate":"21/07/2557","remark":"Return Payment","status":"R","statusName":"Reserved","assured":"นายประกัน กรุงไทย"}
		, {"batchID":"0002","openDate":"21/07/2557","closeDate":"21/07/2557","remark":"Return Payment","status":"R","statusName":"Reserved","assured":"นายประกัน ปลอดภัย"}
		, {"batchID":"0003","openDate":"01/07/2557","closeDate":"21/07/2557","remark":"Return Payment","status":"O","statusName":"Opening","assured":"นายสมชาย แก่นดี"}
		, {"batchID":"0004","openDate":"05/07/2557","closeDate":"21/07/2557","remark":"Return Payment","status":"O","statusName":"Opening","assured":"นางพุทธา ยอดดี"}
		, {"batchID":"0005","openDate":"21/07/2557","closeDate":"21/07/2557","remark":"Return Payment","status":"R","statusName":"Reserved","assured":"นายเนตร มั่นคง"}
		, {"batchID":"0006","openDate":"18/07/2557","closeDate":"21/07/2557","remark":"Return Payment","status":"O","statusName":"Opening","assured":"นางสาวหัสยา แก้วดี"}];
		
		if ($scope.criteria.status != null && $scope.criteria.status != "") {
			$scope.batchOCList = $filter('filter')($scope.batchOCList, function(value){return (value.status == $scope.criteria.status);});
		}
		
		$rootScope.paging.totalItems = $scope.batchOCList.length;
		$rootScope.paging.showing = _.getShowing($rootScope.paging.pageNumber, $rootScope.paging.limit, $scope.batchOCList.length);
		
	};
	
	$scope.search();
	
	$scope.gotoCreate = function() {
		$location.path('refund-open-close-batch/create');
	};
	
	$scope.gotoEdit = function(id) {
		$location.path('refund-open-close-batch/edit/'+id);
	};
	
	$scope.back = function() {
		$location.path('/refund-open-close-batch');
	};
	
}

function RefundOpenCloseBatchDetailCtrl($rootScope, $scope, $http, $compile, $timeout, $filter, $location, $log, $route, $routeParams) {
	$log.info('Enter OpenCloseBatchDetailCtrl');
	
	$scope.mode = $routeParams.mode;
	$scope.id = $routeParams.id;
	
	$scope.batchNewList = [{"batchID":"0001","openDate":"21/07/2557","remark":"Return Payment","status":"R","statusName":"Reserved","reservedBy":"นายประกัน กรุงไทย","refNo":"Q11111111","policyNo":"DM002490001","endorseNo":"002490001","assured":"นางกรุงไทย ใจสมาน","creditCard":"2222222222222","paymentDate":"21/07/2557","amount":"12,000","apprCode":"12345","reasonCode":"01","reasonName":"จ่ายเกิน","totalList":"12,000"}
	, {"batchID":"0002","openDate":"21/07/2557","remark":"Return Payment","status":"R","statusName":"Reserved","reservedBy":"นายประกัน ปลอดภัย","refNo":"Q11111112","policyNo":"DM002490002","endorseNo":"002490002","assured":"นายประกัน ปลอดภัย","creditCard":"1200000456666","paymentDate":"21/07/2557","amount":"2,000","apprCode":"33333","reasonCode":"01","reasonName":"จ่ายเกิน","totalList":"2,000"}
	, {"batchID":"0003","openDate":"01/07/2557","remark":"Return Payment","status":"O","statusName":"Opening","reservedBy":"นายสมชาย แก่นดี","refNo":"Q11111113","policyNo":"DM002490003","endorseNo":"002490003","assured":"นางแก้วมณี แก่นดี","creditCard":"3566669900543","paymentDate":"01/07/2557","amount":"22,000","apprCode":"1244444","reasonCode":"01","reasonName":"จ่ายเกิน","totalList":"22,000"}
	, {"batchID":"0004","openDate":"05/07/2557","remark":"Return Payment","status":"O","statusName":"Opening","reservedBy":"นางพุทธา ยอดดี","refNo":"Q11111114","policyNo":"DM002490004","endorseNo":"002490004","assured":"นางสาวสิณี ยอดดี","creditCard":"2300444411111","paymentDate":"05/07/2557","amount":"10,000","apprCode":"66666","reasonCode":"01","reasonName":"จ่ายเกิน","totalList":"10,000"}
	, {"batchID":"0005","openDate":"21/07/2557","remark":"Return Payment","status":"R","statusName":"Reserved","reservedBy":"นายเนตร มั่นคง","refNo":"Q11111115","policyNo":"DM002490005","endorseNo":"002490005","assured":"นางกมล มั่นคง","creditCard":"3434111110098","paymentDate":"21/07/2557","amount":"8,000","apprCode":"4354534","reasonCode":"01","reasonName":"จ่ายเกิน","totalList":"8,000"}
	, {"batchID":"0006","openDate":"18/07/2557","remark":"Return Payment","status":"O","statusName":"Opening","reservedBy":"นางสาวหัสยา แก้วดี","refNo":"Q11111116","policyNo":"DM002490006","endorseNo":"002490006","assured":"นางสาวอุ่นใจ แก้วดี","creditCard":"1500992222222","paymentDate":"18/07/2557","amount":"7,500","apprCode":"5555555","reasonCode":"01","reasonName":"จ่ายเกิน","totalList":"7,500"}];
	
	if($scope.mode == 'create'){		
		
	}else{
		$scope.detail = _.findWhere($scope.batchNewList, {'batchID': $scope.id +''});
	}

	$scope.back = function() {
		$location.path('/refund-open-close-batch');
	};
	
	$scope.save = function() {
		$location.path('/refund-open-close-batch');
	};
	
}
