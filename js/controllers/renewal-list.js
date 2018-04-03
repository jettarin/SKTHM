angular.module('myApp').config([ '$routeProvider', function($routeProvider) {
	$routeProvider.when("/renewal-list", {templateUrl:_.toHttpGetUrl('content/renewal/renewal-list/renewal-list.html'), controller: ReNewalListCtrl});
	$routeProvider.when("/renewal-list/:mode", {templateUrl:_.toHttpGetUrl('content/renewal/renewal-list/renewal-detail.html'), controller: ReNewalListDetailCtrl});
	$routeProvider.when("/renewal-list/:mode/:id", {templateUrl:_.toHttpGetUrl('content/renewal/renewal-list/renewal-detail.html'), controller: ReNewalListDetailCtrl});
} ]);


function ReNewalListCtrl($rootScope, $scope, $http, $compile, $timeout, $filter, $location, $log, $route, $routeParams, $translate) {
	$log.info('Enter ReNewalListCtrl');
	
	
	if (!$rootScope.paging) {
		$rootScope.paging = APP.DEFAULT_PAGING;
	}
	if (!$rootScope.criteria) {
		$rootScope.criteria = {};
	}
	
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
	
	$scope.productList = [{"productId":"1P01","productName":"พ.ร.บ."},
	                      {"productId":"1P02","productName":"ภาคสมัครใจชั้น 1"},
	                      {"productId":"1P03","productName":"ภาคสมัครใจชั้น 2"},
	                      {"productId":"1P04","productName":"ภาคสมัครใจชั้น 3"},
	                      {"productId":"1P05","productName":"ภาคสมัครใจชั้น 4"},
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
	
	// project List
	$scope.projectList = [
	      {"projectCode":"001", "projectName":"ASN"}
	     ,{"projectCode":"002", "projectName":"ASN KTC"}
	     ,{"projectCode":"003", "projectName":"I-SERV"}
	];
	
	
	// Clear Search Criteria
	$scope.clear = function(){
		$rootScope.criteria = {};
	};
	
	$scope.search = function(){
		
		angular.extend($rootScope.criteria, $rootScope.paging);
		//var url = _.toHttpGetUrl('api/jobLog/findjobLog', $rootScope.criteria);
		//$http.get(url).success(function(data){
		
		$scope.reNewalList = [{"no":"1","project":"ASN","renewFile":"RN5708-ASN-001.xlsx","projectCode":"001","makeModel":"TOYOTA/ALTIS","carNo":"กด 2545 กรุงเทพ","voluntary":"18000","compulsory":"600","discount":"1000","netPremium":"16500","totalV":"17725.62","totalC":"600","totalVC":"18325.62","createdDate":"01/01/2557 08:25:05","assured":"นายพงษ์เทพ ธรรมโสพน","assuredType":"0001","counselor":"นายวิเชียร เลาหบุตร","premium":"1,074.28","amt":"100","createDate":"01/01/2557 08:00:00"}
		,{"no":"2","project":"ASN_KTC","renewFile":"RN5708-ASN_KTC-001.xlsx","projectCode":"002","makeModel":"HONDA/JAZZ","carNo":"พอ  4478 กรุงเทพ","voluntary":"17900","compulsory":"600","discount":"1000","netPremium":"20000","totalV":"21485.60","totalC":"600","totalVC":"22085.60","createdDate":"02/02/2557 09:09:09","assured":"นายพงษ์เทพ ธรรมโสพน","assuredType":"0002","counselor":"นายวิเชียร เลาหบุตร","premium":"757.21","amt":"150 ","createDate":"01/01/2557 08:00:00"}
		];
		


		
		if($scope.criteria.projectCode != null){
			$scope.reNewalList = $filter('filter')($scope.reNewalList, function(value){return (value.projectCode == $scope.criteria.projectCode);});
		}
		if($scope.criteria.carNo != null){
			$scope.reNewalList = $filter('filter')($scope.reNewalList, function(value){return (value.carNo == $scope.criteria.carNo);});
		}
		if($scope.criteria.endCoverageDate != null){
			$scope.reNewalList = $filter('filter')($scope.reNewalList, function(value){return (value.endCoverageDate == $scope.criteria.endCoverageDate);});
		}
		if($scope.criteria.status != null){
			$scope.reNewalList = $filter('filter')($scope.reNewalList, function(value){return (value.status == $scope.criteria.status);});
		}
		
		$rootScope.paging.totalItems = $scope.reNewalList.length;
		$rootScope.paging.showing = _.getShowing($rootScope.paging.pageNumber, $rootScope.paging.limit, $scope.reNewalList.length);
	};		
	$scope.search();
	
	$scope.selectPage = function(page) {
		$rootScope.paging.pageNumber = page;
		$scope.search();
	};
	
	$scope.gotoCreate = function() {
		$location.path('renewal-list/create');
	};
	
	$scope.gotoView = function(no) {
		$location.path('renewal-list/view/'+no);
	};
	
	
	
}


function ReNewalListDetailCtrl($rootScope, $scope, $http, $compile, $filter, $timeout, $routeParams, $location, $log) {
	
	
		// Interface Profile List
			$scope.reNewalList = [{"no":"1","projectId":"001","projectName":"ASN","broker":"TISCO","policyType":"พ.ร.บ","appNo":"OTISCKPI002490001","refNo":"00000001","policyNo":"01AHI00124","coverDate":"01/01/2557-01/01/2558","assured":"นายพงษ์เทพ ธรรมโสพน","assuredType":"0001","counselor":"นายวิเชียร เลาหบุตร","premium":"1,074.28","status":"Complete","createDate":"01/01/2557 08:00:00"}
			,{"no":"2","projectId":"002","projectName":"ASN_KTC","broker":"TISCO","policyType":"พ.ร.บ","appNo":"OTISCKPI002490002","refNo":"00000002","policyNo":"01AHI00124","coverDate":"01/01/2557-01/01/2558","assured":"นายพงษ์เทพ ธรรมโสพน","assuredType":"0002","counselor":"นายวิเชียร เลาหบุตร","premium":"757.21","status":"Complete","createDate":"01/01/2557 08:00:00"}
			,{"no":"3","projectId":"003","projectName":"ASN_KTC","broker":"ASN","policyType":"พ.ร.บ","appNo":"OBASNKPI002490001","refNo":"00000002","policyNo":"01AHI00124","coverDate":"01/01/2557-01/01/2558","assured":"นายวรวัฒน์ สอนจันทร์","assuredType":"0003","counselor":"นายวิเชียร เลาหบุตร","premium":"757.21","status":"Complete","createDate":"01/01/2557 08:00:00"}
			];
		
	$scope.mode = $routeParams.mode;
	$scope.id = $routeParams.id;
		
	if ($scope.mode === 'create') {
		$scope.lapsePolicy = {
			status : 'A'
		};
	} 
	else {
	
		
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
		
		
		$scope.reNewalList =  [{"no":"1","projectId":"001","projectName":"ASN","licenseNo":"กด 2545 กรุงเทพ","makeModel":"TOYOTA/ALTIS","voluntary":"18000","compulsory":"600","totalV":"17725.62","totalC":"600","policyNo":"01AHI00124","insuredName":"นายวิโรจน์ ชูวงศ์","broker":"TISCO","policyType":"พ.ร.บ","appNo":"OTISCKPI002490001","refNo":"00000001","policyNo":"01AHI00124","coverDate":"01/01/2557-01/01/2558","assured":"นายพงษ์เทพ ธรรมโสพน","assuredType":"0001","counselor":"นายวิเชียร เลาหบุตร","premium":"1,074.28","status":"Complete","createDate":"01/01/2557 08:00:00"}
		,{"no":"2","projectId":"002","projectName":"ASN_KTC","licenseNo":"ยน 2775 อยุธยา","makeModel":"HONDA/CIVIC","broker":"TISCO","voluntary":"19000","compulsory":"700","totalV":"17725.62","totalC":"600","policyNo":"01AHI00125","insuredName":"นายพงษ์เทพ ธรรมโสพล","policyType":"พ.ร.บ","appNo":"OTISCKPI002490002","refNo":"00000002","policyNo":"01AHI00124","coverDate":"01/01/2557-01/01/2558","assured":"นายพงษ์เทพ ธรรมโสพน","assuredType":"0002","counselor":"นายวิเชียร เลาหบุตร","premium":"757.21","status":"Complete","createDate":"01/01/2557 08:00:00"}
		];
		if ($scope.id != null) {
			$scope.lapsePolicy = _.findWhere($scope.reNewalList, {projectId: $scope.id});
		}
		
	}
	
	
	$scope.back = function() {
		$location.path('renewal-list');
	};
	
	
}


