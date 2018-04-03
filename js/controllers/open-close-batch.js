angular.module('myApp').config([ '$routeProvider', function($routeProvider) {
	$routeProvider.when("/open-close-batch", {templateUrl:_.toHttpGetUrl('content/payment/open-close-batch/open-close-batch-list.html'), controller: OpenCloseBatchListCtrl});
	$routeProvider.when("/open-close-batch/:mode", {templateUrl:_.toHttpGetUrl('content/payment/open-close-batch/open-close-batch-detail.html'), controller: OpenCloseBatchDetailCtrl});
	$routeProvider.when("/open-close-batch/:mode/:id", {templateUrl:_.toHttpGetUrl('content/payment/open-close-batch/open-close-batch-detail.html'), controller: OpenCloseBatchDetailCtrl});
} ]);


function OpenCloseBatchListCtrl($rootScope, $scope, $http, $compile, $timeout, $filter, $location, $log, $route, $routeParams, $translate) {
	$log.info('Enter OpenCloseBatchListCtrl');
	
	
	if (!$rootScope.paging) {
		$rootScope.paging = APP.DEFAULT_PAGING;
	}
	if (!$rootScope.criteria) {
		$rootScope.criteria = {};
	}
	
	
	$scope.statusList = [
	                     {"id":"1" , "name":"Opened"}
	       			, {"id":"2" , "name":"Reserved"}
	       		];
	
	// Clear Search Criteria
	$scope.clear = function(){
		$rootScope.criteria = {};
	};
	
	$scope.search = function(){
		
		angular.extend($rootScope.criteria, $rootScope.paging);
		//var url = _.toHttpGetUrl('api/jobLog/findjobLog', $rootScope.criteria);
		//$http.get(url).success(function(data){
		
		$scope.openCloseBatchList = [{"batchId":"001","openDate":"22/11/2556","closeDate":"22/12/2556","projectId":"001","projectName":"KTC","broker":"TISCO","policyType":"พ.ร.บ","appNo":"OTISCKPI002490001","refNo":"00000001","policyNo":"01AHI00124","coverDate":"01/01/2557-01/01/2558","assured":"นายพงษ์เทพ ธรรมโสพน","assuredType":"0001","remark":"ติดต่อไม่ได้","counselor":"นายวิเชียร เลาหบุตร","premium":"1,074.28","status":"Opened","createDate":"01/01/2557 08:00:00"}
		,{"batchId":"002","openDate":"12/12/2554","closeDate":"12/11/2558","projectId":"002","projectName":"KTB","broker":"TISCO","policyType":"พ.ร.บ","appNo":"OTISCKPI002490002","refNo":"00000002","policyNo":"01AHI00124","coverDate":"01/01/2557-01/01/2558","assured":"นายพงษ์เทพ ธรรมโสพน","assuredType":"0002","counselor":"นายวิเชียร เลาหบุตร","remark":"โทรไม่ติด","premium":"757.21","status":"Opened","createDate":"01/01/2557 08:00:00"}
		,{"batchId":"003","openDate":"01/01/2557","closeDate":"31/12/2557","projectId":"003","projectName":"GTMM","broker":"ASN","policyType":"พ.ร.บ","appNo":"OBASNKPI002490001","refNo":"00000002","policyNo":"01AHI00124","coverDate":"01/01/2557-01/01/2558","assured":"นายวรวัฒน์ สอนจันทร์","assuredType":"0003","counselor":"นายวิเชียร เลาหบุตร","remark":"ติดต่อไม่ได้","premium":"757.21","status":"Reserved","createDate":"01/01/2557 08:00:00"}
		];


		
		if($scope.criteria.projectId != null){
			$scope.openCloseBatchList = $filter('filter')($scope.openCloseBatchList, function(value){return (value.projectId == $scope.criteria.projectId);});
		}
		if($scope.criteria.closeDate != null){
			$scope.openCloseBatchList = $filter('filter')($scope.openCloseBatchList, function(value){return (value.closeDate == $scope.criteria.closeDate);});
		}
		if($scope.criteria.refNo != null){
			$scope.openCloseBatchList = $filter('filter')($scope.openCloseBatchList, function(value){return (value.refNo == $scope.criteria.refNo);});
		}
		if($scope.criteria.status != null){
			$scope.openCloseBatchList = $filter('filter')($scope.openCloseBatchList, function(value){return (value.status == $scope.criteria.status);});
		}
		
		$rootScope.paging.totalItems = $scope.openCloseBatchList.length;
		$rootScope.paging.showing = _.getShowing($rootScope.paging.pageNumber, $rootScope.paging.limit, $scope.openCloseBatchList.length);
	};		
	$scope.search();
	
	$scope.selectPage = function(page) {
		$rootScope.paging.pageNumber = page;
		$scope.search();
	};
	
	$scope.gotoCreate = function() {
		$location.path('open-close-batch/create');
	};
	
	$scope.gotoEdit = function(batchId) {
		$location.path('open-close-batch/edit/'+batchId);
	};
	
	
	
}


function OpenCloseBatchDetailCtrl($rootScope, $scope, $http, $compile, $filter, $timeout, $routeParams, $location, $log) {
	$log.info('Enter OpenCloseBatchDetailCtrl');
	
	
	
	
	
	
		// Interface Profile List
			$scope.openCloseBatchList = [{"no":"001","batchId":"001","refNo":"12345","projectName":"KTC","broker":"TISCO","policyType":"พ.ร.บ","appNo":"OTISCKPI002490001","requestDate":"17/07/2557","policyNo":"01AHI00124","coverDate":"01/01/2557","name":"นายพงษ์เทพ ธรรมโสพน","licenseNo":"กว-8132 กรุงเทพ","accountNo":"567045-8901-7888","expireDate":"20/07/2560","period":"6","counselor":"นายวิเชียร เลาหบุตร","premium":"1,074.28","status":"Open","createDate":"01/01/2557 08:00:00"}
			,{"no":"002","batchId":"002","refNo":"12346","projectName":"KTB","broker":"TISCO","policyType":"พ.ร.บ","appNo":"OTISCKPI002490002","policyNo":"01AHI00124","requestDate":"17/07/2557","coverDate":"01/01/2557","name":"นายพงษ์เทพ ธรรมโสพน","licenseNo":"กว-8132 กรุงเทพ","counselor":"นายวิเชียร เลาหบุตร","accountNo":"567045-8901-7888","expireDate":"20/07/2560","period":"4","premium":"757.21","status":"Close","createDate":"01/01/2557 08:00:00"}
			,{"no":"003","batchId":"003","refNo":"12347","projectName":"GTMM","broker":"ASN","policyType":"พ.ร.บ","appNo":"OBASNKPI002490001","policyNo":"01AHI00124","requestDate":"17/07/2557","coverDate":"01/01/2557","name":"นายวรวัฒน์ สอนจันทร์","licenseNo":"กว-8132 กรุงเทพ","counselor":"นายวิเชียร เลาหบุตร","accountNo":"567045-8901-7888","expireDate":"20/07/2560","period":"2","premium":"757.21","status":"Open","createDate":"01/01/2557 08:00:00"}
			];
		
	$scope.mode = $routeParams.mode;
	$scope.id = $routeParams.id;
		
	if ($scope.mode === 'create') {
		$scope.openCloseBatch = {
			status : 'A'
		};
	} 
	else {
		
	
	
		$scope.openCloseBatchList =  [{"no":"001","batchId":"001","refNo":"12345","projectName":"KTC","broker":"TISCO","policyType":"พ.ร.บ","appNo":"OTISCKPI002490001","requestDate":"17/07/2557","policyNo":"01AHI00124","openDate":"01/01/2557","name":"นายพงษ์เทพ ธรรมโส","licenseNo":"กว-8132 กรุงเทพ","accountNo":"567045-8901-7888","expireDate":"20/07/2560","period":"8","counselor":"นายวิเชียร เลาหบุตร","premium":"1,074.28","status":"O","remark":"ติดต่อไม่ได้","createDate":"01/01/2557 08:00:00","rebill":"N","approve":""}
		
		];
	
		if ($scope.id != null) {
			$scope.openCloseBatch = _.findWhere($scope.openCloseBatchList, {batchId: $scope.id});
		}
		
	}
	
	$scope.back = function() {
		$location.path('open-close-batch');
	};
	
	
	
}


