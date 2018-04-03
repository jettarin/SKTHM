angular.module('myApp').config([ '$routeProvider', function($routeProvider) {
	$routeProvider.when("/lapse-policy-list", {templateUrl:_.toHttpGetUrl('content/policy/lapse-policy-list/lapse-policy-list.html'), controller: LapsePolicyListCtrl});
	$routeProvider.when("/lapse-policy-list/:mode", {templateUrl:_.toHttpGetUrl('content/policy/lapse-policy-list/lapse-policy-detail.html'), controller: LapsePolicyListDetailCtrl});
	$routeProvider.when("/lapse-policy-list/:mode/:id", {templateUrl:_.toHttpGetUrl('content/policy/lapse-policy-list/lapse-policy-detail.html'), controller: LapsePolicyListDetailCtrl});
} ]);


function LapsePolicyListCtrl($rootScope, $scope, $http, $compile, $timeout, $filter, $location, $log, $route, $routeParams, $translate) {
	$log.info('Enter LapsePolicyListCtrl');
	
	
	
	if (!$rootScope.paging) {
		$rootScope.paging = APP.DEFAULT_PAGING;
	}
	if (!$rootScope.criteria) {
		$rootScope.criteria = {};
	}
	

	$scope.goToPath = function(id){
		$location.path ('/lapse-policy-list/'+id);
	};


	$scope.projectList = [{"projectId":"001","projectName":"KTC"},
	                      {"projectId":"002","projectName":"KTB"},
	                      {"projectId":"003","projectName":"GTMM"},
	                      {"projectId":"004","projectName":"KTC-3RD"},
	                      {"projectId":"005","projectName":"IDMC"},
	                      {"projectId":"006","projectName":"IDMC2"},
	                      {"projectId":"007","projectName":"STB"},
	                      {"projectId":"008","projectName":"KTB InHouse"},
	                      {"projectId":"009","projectName":"KTC-IDMC"},
	                      {"projectId":"010","projectName":"ASN-KTC"},
	                      {"projectId":"011","projectName":"InHouse Non"},	                      
	                      ];
	
	$scope.productList = [{"productId":"1P01","productName":"พิทักษ์ภัย"},
	                      {"productId":"1P02","productName":"ทวีทรัพย์"},
	                      {"productId":"1P03","productName":"ครอบครัวอุ่นใจ"},
	                      {"productId":"1P04","productName":"ทวีสิทธฺ์"},
	                      {"productId":"1P05","productName":"คุ้มครองเพิ่มค่า"},
	                      {"productId":"1P06","productName":"พิทักษ์งาน"},
	                      {"productId":"1P07","productName":"ชดเชยเพิ่มค่า"},
	                      {"productId":"1B01","productName":"เพิ่มค่าทวีสุข"},
	                      {"productId":"1H01","productName":"Home Care Plan"},
	                      {"productId":"1M01","productName":"Cancer Plus"},
	                      ];
	
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
		
		$scope.lapsePolicyList = [{"no":"001","projectId":"001","projectName":"KTC","broker":"TISCO","policyType":"พ.ร.บ","appNo":"OTISCKPI002490001","refNo":"00000001","policyNo":"01AHI00124","coverDate":"01/01/2557-01/01/2558","assured":"นายพงษ์เทพ ธรรมโสพน","assuredType":"0001","counselor":"นายวิเชียร เลาหบุตร","premium":"1,074.28","status":"Complete","createDate":"01/01/2557 08:00:00"}
		,{"no":"002","projectId":"002","projectName":"KTB","broker":"TISCO","policyType":"พ.ร.บ","appNo":"OTISCKPI002490002","refNo":"00000002","policyNo":"01AHI00124","coverDate":"01/01/2557-01/01/2558","assured":"นายพงษ์เทพ ธรรมโสพน","assuredType":"0002","counselor":"นายวิเชียร เลาหบุตร","premium":"757.21","status":"Complete","createDate":"01/01/2557 08:00:00"}
		,{"no":"003","projectId":"003","projectName":"GTMM","broker":"ASN","policyType":"พ.ร.บ","appNo":"OBASNKPI002490001","refNo":"00000002","policyNo":"01AHI00124","coverDate":"01/01/2557-01/01/2558","assured":"นายวรวัฒน์ สอนจันทร์","assuredType":"0003","counselor":"นายวิเชียร เลาหบุตร","premium":"757.21","status":"Complete","createDate":"01/01/2557 08:00:00"}
		,{"no":"004","projectId":"004","projectName":"KTC-3RD","broker":"ASN","policyType":"พ.ร.บ","appNo":"OBASNKPI002490002","refNo":"00000003","policyNo":"01AHI00124","coverDate":"01/01/2557-01/01/2558","assured":"นายวิชัย ศรีบุรินทร์","assuredType":"0004","counselor":"นายวิเชียร เลาหบุตร","premium":"757.21","status":"Complete","createDate":"01/01/2557 08:00:00"}
		,{"no":"005","projectId":"005","projectName":"IDMC","broker":"ASN","policyType":"พ.ร.บ","appNo":"OBASNKPI002490003","refNo":"00000004","policyNo":"01AHI00124","coverDate":"01/01/2557-01/01/2558","assured":"นายสงคราม อาจสมบาล","assuredType":"0005","counselor":"นายวิเชียร เลาหบุตร","premium":"757.21","status":"Complete","createDate":"01/01/2557 08:00:00"}
		,{"no":"006","projectId":"006","projectName":"IDMC2","broker":"ASNKTC","policyType":"ประกันภัยชั้น 1","appNo":"OAKTCKPI002490001","refNo":"00000005","policyNo":"01AHI00124","coverDate":"01/01/2557-01/01/2558","assured":"นางจุรีรัตน์ ศรีจันทร์","assuredType":"0006","counselor":"นายวิเชียร เลาหบุตร","premium":"18,900.00","status":"Survey Awaiting","createDate":"01/01/2557 08:00:00"}
		,{"no":"007","projectId":"007","projectName":"STB","broker":"ASNKTC","policyType":"ประกันภัยชั้น 2+","appNo":"OAKTCKPI002490003","refNo":"00000006","policyNo":"01AHI00124","coverDate":"01/01/2557-01/01/2558","assured":"น.ส.อรุณรัตน์ ปวรรัตน์","assuredType":"0007","counselor":"นายวิเชียร เลาหบุตร","premium":"8,080.00","status":"New","createDate":"01/01/2557 08:00:00"}
		,{"no":"008","projectId":"008","projectName":"KTB InHouse","broker":"ASNKTC","policyType":"ประกันภัยชั้น 3","appNo":"OAKTCKPI002490004","refNo":"00000007","policyNo":"01AHI00124","coverDate":"01/01/2557-01/01/2558","assured":"นายพงศกร แก้วเก้า","assuredType":"0008","counselor":"นายวิเชียร เลาหบุตร","premium":"3,000.00","status":"Payment Awaiting","createDate":"01/01/2557 08:00:00"}
		,{"no":"009","projectId":"009","projectName":"KTC-IDMC","broker":"ASNKTC","policyType":"อุ่นใจ1","appNo":"OAKTCKPI002490005","refNo":"00000008","policyNo":"01AHI00124","coverDate":"01/01/2557-01/01/2558","assured":"นายศักดิ์ชัย อำนายศิลป์","assuredType":"0009","counselor":"นายวิเชียร เลาหบุตร","premium":"12,000.00","status":"Payment Awaiting","createDate":"01/01/2557 08:00:00"}
		,{"no":"010","projectId":"010","projectName":"ASN-KTC","broker":"ASNKTC","policyType":"อุ่้นใจ2","appNo":"OAKTCKPI002490006","refNo":"00000009","policyNo":"01AHI00124","coverDate":"01/01/2557-01/01/2558","assured":"นายกวี อำนวยศิลป์","assuredType":"0010","counselor":"นายวิเชียร เลาหบุตร","premium":"12,000.00","status":"Complete","createDate":"01/01/2557 08:00:00"}];
		


		
		if($scope.criteria.projectId != null){
			$scope.lapsePolicyList = $filter('filter')($scope.lapsePolicyList, function(value){return (value.projectId == $scope.criteria.projectId);});
		}
		if($scope.criteria.appNo != null){
			$scope.lapsePolicyList = $filter('filter')($scope.lapsePolicyList, function(value){return (value.appNo == $scope.criteria.appNo);});
		}
		if($scope.criteria.refNo != null){
			$scope.lapsePolicyList = $filter('filter')($scope.lapsePolicyList, function(value){return (value.refNo == $scope.criteria.refNo);});
		}
		if($scope.criteria.assured != null){
			$scope.lapsePolicyList = $filter('filter')($scope.lapsePolicyList, function(value){return (value.assured == $scope.criteria.assured);});
		}
		
		$rootScope.paging.totalItems = $scope.lapsePolicyList.length;
		$rootScope.paging.showing = _.getShowing($rootScope.paging.pageNumber, $rootScope.paging.limit, $scope.lapsePolicyList.length);
	};		
	$scope.search();
	
	$scope.selectPage = function(page) {
		$rootScope.paging.pageNumber = page;
		$scope.search();
	};
	
	$scope.gotoCreate = function() {
		$location.path('lapse-policy-list/create');
	};
	
	$scope.gotoEdit = function(projectId) {
		$location.path('lapse-policy-list/edit/'+projectId);
	};
	
	
	
}


function LapsePolicyListDetailCtrl($rootScope, $scope, $http, $compile, $filter, $timeout, $routeParams, $location, $log) {
	
	
	
		// Interface Profile List
			$scope.lapsePolicyList = [{"no":"001","projectId":"001","projectName":"KTC","broker":"TISCO","policyType":"พ.ร.บ","appNo":"OTISCKPI002490001","refNo":"00000001","policyNo":"01AHI00124","coverDate":"01/01/2557-01/01/2558","assured":"นายพงษ์เทพ ธรรมโสพน","assuredType":"0001","counselor":"นายวิเชียร เลาหบุตร","premium":"1,074.28","status":"Complete","createDate":"01/01/2557 08:00:00"}
			,{"no":"002","projectId":"002","projectName":"KTB","broker":"TISCO","policyType":"พ.ร.บ","appNo":"OTISCKPI002490002","refNo":"00000002","policyNo":"01AHI00124","coverDate":"01/01/2557-01/01/2558","assured":"นายพงษ์เทพ ธรรมโสพน","assuredType":"0002","counselor":"นายวิเชียร เลาหบุตร","premium":"757.21","status":"Complete","createDate":"01/01/2557 08:00:00"}
			,{"no":"003","projectId":"003","projectName":"GTMM","broker":"ASN","policyType":"พ.ร.บ","appNo":"OBASNKPI002490001","refNo":"00000002","policyNo":"01AHI00124","coverDate":"01/01/2557-01/01/2558","assured":"นายวรวัฒน์ สอนจันทร์","assuredType":"0003","counselor":"นายวิเชียร เลาหบุตร","premium":"757.21","status":"Complete","createDate":"01/01/2557 08:00:00"}
			,{"no":"004","projectId":"004","projectName":"KTC-3RD","broker":"ASN","policyType":"พ.ร.บ","appNo":"OBASNKPI002490002","refNo":"00000003","policyNo":"01AHI00124","coverDate":"01/01/2557-01/01/2558","assured":"นายวิชัย ศรีบุรินทร์","assuredType":"0004","counselor":"นายวิเชียร เลาหบุตร","premium":"757.21","status":"Complete","createDate":"01/01/2557 08:00:00"}
			,{"no":"005","projectId":"005","projectName":"IDMC","broker":"ASN","policyType":"พ.ร.บ","appNo":"OBASNKPI002490003","refNo":"00000004","policyNo":"01AHI00124","coverDate":"01/01/2557-01/01/2558","assured":"นายสงคราม อาจสมบาล","assuredType":"0005","counselor":"นายวิเชียร เลาหบุตร","premium":"757.21","status":"Complete","createDate":"01/01/2557 08:00:00"}
			,{"no":"006","projectId":"006","projectName":"IDMC2","broker":"ASNKTC","policyType":"ประกันภัยชั้น 1","appNo":"OAKTCKPI002490001","refNo":"00000005","policyNo":"01AHI00124","coverDate":"01/01/2557-01/01/2558","assured":"นางจุรีรัตน์ ศรีจันทร์","assuredType":"0006","counselor":"นายวิเชียร เลาหบุตร","premium":"18,900.00","status":"Survey Awaiting","createDate":"01/01/2557 08:00:00"}
			,{"no":"007","projectId":"007","projectName":"STB","broker":"ASNKTC","policyType":"ประกันภัยชั้น 2+","appNo":"OAKTCKPI002490003","refNo":"00000006","policyNo":"01AHI00124","coverDate":"01/01/2557-01/01/2558","assured":"น.ส.อรุณรัตน์ ปวรรัตน์","assuredType":"0007","counselor":"นายวิเชียร เลาหบุตร","premium":"8,080.00","status":"New","createDate":"01/01/2557 08:00:00"}
			,{"no":"008","projectId":"008","projectName":"KTB InHouse","broker":"ASNKTC","policyType":"ประกันภัยชั้น 3","appNo":"OAKTCKPI002490004","refNo":"00000007","policyNo":"01AHI00124","coverDate":"01/01/2557-01/01/2558","assured":"นายพงศกร แก้วเก้า","assuredType":"0008","counselor":"นายวิเชียร เลาหบุตร","premium":"3,000.00","status":"Payment Awaiting","createDate":"01/01/2557 08:00:00"}
			,{"no":"009","projectId":"009","projectName":"KTC-IDMC","broker":"ASNKTC","policyType":"อุ่นใจ1","appNo":"OAKTCKPI002490005","refNo":"00000008","policyNo":"01AHI00124","coverDate":"01/01/2557-01/01/2558","assured":"นายศักดิ์ชัย อำนายศิลป์","assuredType":"0009","counselor":"นายวิเชียร เลาหบุตร","premium":"12,000.00","status":"Payment Awaiting","createDate":"01/01/2557 08:00:00"}
			,{"no":"010","projectId":"010","projectName":"ASN-KTC","broker":"ASNKTC","policyType":"อุ่้นใจ2","appNo":"OAKTCKPI002490006","refNo":"00000009","policyNo":"01AHI00124","coverDate":"01/01/2557-01/01/2558","assured":"นายกวี อำนวยศิลป์","assuredType":"0010","counselor":"นายวิเชียร เลาหบุตร","premium":"12,000.00","status":"Complete","createDate":"01/01/2557 08:00:00"}];
			
		
	$scope.mode = $routeParams.mode;
	$scope.id = $routeParams.id;
		
	if ($scope.mode === 'create') {
		$scope.lapsePolicy = {
			status : 'A'
		};
	} 
	else {
	
		$scope.lapsePolicyList =  [{"no":"001","projectId":"001","projectName":"KTC","broker":"TISCO","policyType":"พ.ร.บ","appNo":"OTISCKPI002490001","refNo":"00000001","policyNo":"01AHI00124","coverDate":"01/01/2557-01/01/2558","assured":"นายพงษ์เทพ ธรรมโสพน","assuredType":"0001","counselor":"นายวิเชียร เลาหบุตร","premium":"1,074.28","status":"Complete","createDate":"01/01/2557 08:00:00"}
		,{"no":"002","projectId":"002","projectName":"KTB","broker":"TISCO","policyType":"พ.ร.บ","appNo":"OTISCKPI002490002","refNo":"00000002","policyNo":"01AHI00124","coverDate":"01/01/2557-01/01/2558","assured":"นายพงษ์เทพ ธรรมโสพน","assuredType":"0002","counselor":"นายวิเชียร เลาหบุตร","premium":"757.21","status":"Complete","createDate":"01/01/2557 08:00:00"}
		,{"no":"003","projectId":"003","projectName":"GTMM","broker":"ASN","policyType":"พ.ร.บ","appNo":"OBASNKPI002490001","refNo":"00000002","policyNo":"01AHI00124","coverDate":"01/01/2557-01/01/2558","assured":"นายวรวัฒน์ สอนจันทร์","assuredType":"0003","counselor":"นายวิเชียร เลาหบุตร","premium":"757.21","status":"Complete","createDate":"01/01/2557 08:00:00"}
		,{"no":"004","projectId":"004","projectName":"KTC-3RD","broker":"ASN","policyType":"พ.ร.บ","appNo":"OBASNKPI002490002","refNo":"00000003","policyNo":"01AHI00124","coverDate":"01/01/2557-01/01/2558","assured":"นายวิชัย ศรีบุรินทร์","assuredType":"0004","counselor":"นายวิเชียร เลาหบุตร","premium":"757.21","status":"Complete","createDate":"01/01/2557 08:00:00"}
		,{"no":"005","projectId":"005","projectName":"IDMC","broker":"ASN","policyType":"พ.ร.บ","appNo":"OBASNKPI002490003","refNo":"00000004","policyNo":"01AHI00124","coverDate":"01/01/2557-01/01/2558","assured":"นายสงคราม อาจสมบาล","assuredType":"0005","counselor":"นายวิเชียร เลาหบุตร","premium":"757.21","status":"Complete","createDate":"01/01/2557 08:00:00"}
		,{"no":"006","projectId":"006","projectName":"IDMC2","broker":"ASNKTC","policyType":"ประกันภัยชั้น 1","appNo":"OAKTCKPI002490001","refNo":"00000005","policyNo":"01AHI00124","coverDate":"01/01/2557-01/01/2558","assured":"นางจุรีรัตน์ ศรีจันทร์","assuredType":"0006","counselor":"นายวิเชียร เลาหบุตร","premium":"18,900.00","status":"Survey Awaiting","createDate":"01/01/2557 08:00:00"}
		,{"no":"007","projectId":"007","projectName":"STB","broker":"ASNKTC","policyType":"ประกันภัยชั้น 2+","appNo":"OAKTCKPI002490003","refNo":"00000006","policyNo":"01AHI00124","coverDate":"01/01/2557-01/01/2558","assured":"น.ส.อรุณรัตน์ ปวรรัตน์","assuredType":"0007","counselor":"นายวิเชียร เลาหบุตร","premium":"8,080.00","status":"New","createDate":"01/01/2557 08:00:00"}
		,{"no":"008","projectId":"008","projectName":"KTB InHouse","broker":"ASNKTC","policyType":"ประกันภัยชั้น 3","appNo":"OAKTCKPI002490004","refNo":"00000007","policyNo":"01AHI00124","coverDate":"01/01/2557-01/01/2558","assured":"นายพงศกร แก้วเก้า","assuredType":"0008","counselor":"นายวิเชียร เลาหบุตร","premium":"3,000.00","status":"Payment Awaiting","createDate":"01/01/2557 08:00:00"}
		,{"no":"009","projectId":"009","projectName":"KTC-IDMC","broker":"ASNKTC","policyType":"อุ่นใจ1","appNo":"OAKTCKPI002490005","refNo":"00000008","policyNo":"01AHI00124","coverDate":"01/01/2557-01/01/2558","assured":"นายศักดิ์ชัย อำนายศิลป์","assuredType":"0009","counselor":"นายวิเชียร เลาหบุตร","premium":"12,000.00","status":"Payment Awaiting","createDate":"01/01/2557 08:00:00"}
		,{"no":"010","projectId":"010","projectName":"ASN-KTC","broker":"ASNKTC","policyType":"อุ่้นใจ2","appNo":"OAKTCKPI002490006","refNo":"00000009","policyNo":"01AHI00124","coverDate":"01/01/2557-01/01/2558","assured":"นายกวี อำนวยศิลป์","assuredType":"0010","counselor":"นายวิเชียร เลาหบุตร","premium":"12,000.00","status":"Complete","createDate":"01/01/2557 08:00:00"}];
		
		if ($scope.id != null) {
			$scope.lapsePolicy = _.findWhere($scope.lapsePolicyList, {projectId: $scope.id});
		}
		
	}
	
	$scope.back = function() {
		$location.path('lapse-policy-list');
	};
	
	
	
}


