angular.module('myApp').config([ '$routeProvider', function($routeProvider) {
	$routeProvider.when("/batch-open-list", {templateUrl:_.toHttpGetUrl('content/payment/batch-open-list/batch-open-list.html'), controller: BatchOpenListCtrl});
	$routeProvider.when("/batch-open-list/:mode", {templateUrl:_.toHttpGetUrl('content/payment/batch-open-list/batch-open-detail.html'), controller: BatchOpenListDetailCtrl});
	$routeProvider.when("/batch-open-list/:mode/:id", {templateUrl:_.toHttpGetUrl('content/payment/batch-open-list/batch-open-detail.html'), controller: BatchOpenListDetailCtrl});
} ]);


function BatchOpenListCtrl($rootScope, $scope, $http, $compile, $timeout, $filter, $location, $log, $route, $routeParams, $translate) {
	$log.info('Enter BatchOpenListCtrl');
	
	
	if (!$rootScope.paging) {
		$rootScope.paging = APP.DEFAULT_PAGING;
	}
	if (!$rootScope.criteria) {
		$rootScope.criteria = {};
	}
	
	
	$scope.statusList = [
	                     {"id":"1" , "name":"Open"}
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
		
		$scope.batchOpenList = [{"id":"1","batchId":"001","openDate":"22/11/2556 08:00:00","closeDate":"22/12/2556 08:00:00","projectId":"001","projectName":"KTC","broker":"TISCO","policyType":"พ.ร.บ","appNo":"OTISCKPI002490001","refNo":"00000001","policyNo":"01AHI00124","coverDate":"01/01/2557-01/01/2558","assured":"นายพงษ์เทพ ธรรมโสพน","assuredType":"0001","remark":"ติดต่อไม่ได้","counselor":"นายวิเชียร เลาหบุตร","premium":"1,074.28","status":"Reserved","reserv":"นายวิเชียร เลาหบุตร","createDate":"01/01/2557 08:00:00"}
		
		];


		
		if($scope.criteria.openDate != null){
			$scope.batchOpenList = $filter('filter')($scope.batchOpenList, function(value){return (value.openDate == $scope.criteria.openDate);});
		}
		if($scope.criteria.appNo != null){
			$scope.batchOpenList = $filter('filter')($scope.batchOpenList, function(value){return (value.appNo == $scope.criteria.appNo);});
		}
		if($scope.criteria.refNo != null){
			$scope.batchOpenList = $filter('filter')($scope.batchOpenList, function(value){return (value.refNo == $scope.criteria.refNo);});
		}
		if($scope.criteria.status != null){
			$scope.batchOpenList = $filter('filter')($scope.batchOpenList, function(value){return (value.status == $scope.criteria.status);});
		}
		
		$rootScope.paging.totalItems = $scope.batchOpenList.length;
		$rootScope.paging.showing = _.getShowing($rootScope.paging.pageNumber, $rootScope.paging.limit, $scope.batchOpenList.length);
	};		
	$scope.search();
	
	$scope.selectPage = function(page) {
		$rootScope.paging.pageNumber = page;
		$scope.search();
	};
	
	
	$scope.gotoEdit = function(batchId) {
		$location.path('batch-open-list/edit/'+batchId);
	};
	
	
	
}


function BatchOpenListDetailCtrl($rootScope, $scope, $http, $compile, $filter, $timeout, $routeParams, $location, $log) {
	$log.info('Enter BatchOpenListDetailCtrl');
	
	
	
	
	
	
		// Interface Profile List
			$scope.batchOpenList = [{"no":"001","batchId":"001","refNo":"12345","projectName":"KTC","broker":"TISCO","policyType":"พ.ร.บ","appNo":"OTISCKPI002490001","requestDate":"17/07/2557","policyNo":"01AHI00124","coverDate":"01/01/2557","name":"นายพงษ์เทพ ธรรมโสพน","licenseNo":"กว-8132 กรุงเทพ","accountNo":"567045-8901-7888","expireDate":"20/07/2560","period":"6","counselor":"นายวิเชียร เลาหบุตร","premium":"1,074.28","status":"Open","createDate":"01/01/2557 08:00:00"}
			,{"no":"002","batchId":"002","refNo":"12346","projectName":"KTB","broker":"TISCO","policyType":"พ.ร.บ","appNo":"OTISCKPI002490002","policyNo":"01AHI00124","requestDate":"17/07/2557","coverDate":"01/01/2557","name":"นายพงษ์เทพ ธรรมโสพน","licenseNo":"กว-8132 กรุงเทพ","counselor":"นายวิเชียร เลาหบุตร","accountNo":"567045-8901-7888","expireDate":"20/07/2560","period":"4","premium":"757.21","status":"Close","createDate":"01/01/2557 08:00:00"}
			,{"no":"003","batchId":"003","refNo":"12347","projectName":"GTMM","broker":"ASN","policyType":"พ.ร.บ","appNo":"OBASNKPI002490001","policyNo":"01AHI00124","requestDate":"17/07/2557","coverDate":"01/01/2557","name":"นายวรวัฒน์ สอนจันทร์","licenseNo":"กว-8132 กรุงเทพ","counselor":"นายวิเชียร เลาหบุตร","accountNo":"567045-8901-7888","expireDate":"20/07/2560","period":"2","premium":"757.21","status":"Open","createDate":"01/01/2557 08:00:00"}
			];
		
	$scope.mode = $routeParams.mode;
	$scope.id = $routeParams.id;
		
	if ($scope.mode === 'create') {
		$scope.batchOpenList = {
			status : 'A'
		};
	} 
	else {
		
	
	
		$scope.batchOpenList =  [{"no":"001","batchId":"001","refNo":"12345","projectName":"KTC","broker":"TISCO","policyType":"พ.ร.บ","appNo":"OTISCKPI002490001","requestDate":"17/07/2557","policyNo":"01AHI00124","openDate":"01/01/2557","name":"นายพงษ์เทพ ธรรมโส","licenseNo":"กว-8132 กรุงเทพ","accountNo":"567045-8901-7888","expireDate":"20/07/2560","coverDate":"21/07/2557","period":"8","counselor":"นายวิเชียร เลาหบุตร","premium":"1,074.28","status":"O","remark":"ติดต่อไม่ได้","createDate":"01/01/2557 08:00:00","rebill":"N","approve":""}
		
		];
	
		if ($scope.id != null) {
			$scope.batchOpen = _.findWhere($scope.batchOpenList, {batchId: $scope.id});
		}
		
	}
	
	$scope.back = function() {
		$location.path('batch-open-list');
	};
	
	
	
}


