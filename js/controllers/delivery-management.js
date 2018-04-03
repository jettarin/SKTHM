angular.module('myApp').config([ '$routeProvider', function($routeProvider) {
	$routeProvider.when('/all-delivery', {templateUrl: _.toHttpGetUrl('content/delivery-management/all-delivery-list.html'), controller: AllDeliveryListCtrl});
	//$routeProvider.when('/regis-document', {templateUrl: _.toHttpGetUrl('content/delivery-management/register-doc-list.html'), controller: AllRegisterDocCtrl});
	$routeProvider.when('/regis-document', {templateUrl: _.toHttpGetUrl('content/delivery-management/register-doc-detail.html'), controller: RegisterDocDetailCtrl});
	$routeProvider.when('/regis-document/:mode', {templateUrl: _.toHttpGetUrl('content/delivery-management/register-doc-detail.html'), controller: RegisterDocDetailCtrl});
	$routeProvider.when('/regis-document/:mode/:id', {templateUrl: _.toHttpGetUrl('content/delivery-management/register-doc-detail.html'), controller: RegisterDocDetailCtrl});
	$routeProvider.when('/regis-doc-return', {templateUrl: _.toHttpGetUrl('content/delivery-management/register-doc-return-list.html'), controller: AllRegisterDocReturnCtrl});
	$routeProvider.when('/regis-doc-return/:mode', {templateUrl: _.toHttpGetUrl('content/delivery-management/register-doc-return-detail.html'), controller: RegisterDocReturnDetailCtrl});
	$routeProvider.when('/regis-doc-return/:mode/:id', {templateUrl: _.toHttpGetUrl('content/delivery-management/register-doc-return-detail.html'), controller: RegisterDocReturnDetailCtrl});
} ]);

function AllDeliveryListCtrl($rootScope, $scope, $http, $compile, $timeout, $filter, $location, $log, $route, $routeParams) {
	$log.info('Enter AllDeliveryListCtrl');

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
	
	$scope.documentList = [{"docCode":"P","docName":"กรมธรรม์"},
	                       {"docCode":"C","docName":"จดหมายแจ้งยกเลิก"},
						  ];
	
	$scope.search = function(){
		$scope.deliveryList = [{"no":"1","docType":"กรมธรรม์","appNo":"OTISCKPI002490001","policyNo":"DM002490001","regisNo":"RT0000100TH","regisDate":"01/07/57","contactName":"นายวิเชียร เลาหบุตร","zipCode":"10400","fee":"20","status":"บันทึกส่งแล้ว","historyLog":"","docCode":"P"}
		,{"no":"2","docType":"กรมธรรม์","appNo":"OTISCKPI002490002","policyNo":"DM002490002","regisNo":"EM0012078TH","regisDate":"01/07/57","contactName":"นายวิเชียร เลาหบุตร","zipCode":"23900","fee":"50","status":"บันทึกส่งแล้ว","historyLog":"","docCode":"P"}
		,{"no":"3","docType":"จดหมายแจ้งยกเลิก","appNo":"OTISCKPI002490003","policyNo":"DM002490003","regisNo":"RG0578123TH","regisDate":"01/07/57","contactName":"นายวิเชียร เลาหบุตร","zipCode":"10000","fee":"30","status":"จดหมายตีกลับ","historyLog":"","docCode":"C"}
		,{"no":"4","docType":"กรมธรรม์","appNo":"OTISCKPI002490004","policyNo":"DM002490004","regisNo":"RG07080123TH","regisDate":"17/07/57","contactName":"นายวิเชียร เลาหบุตร","zipCode":"10890","fee":"30","status":"จดหมายตีกลับ","historyLog":"","docCode":"P"}
		,{"no":"5","docType":"จดหมายแจ้งยกเลิก","appNo":"OTISCKPI002490005","policyNo":"DM002490005","regisNo":"RG00080456TH","regisDate":"17/07/57","contactName":"นายวิเชียร เลาหบุตร","zipCode":"10090","fee":"30","status":"รอบันทึกเลขลงทะเบียน","historyLog":"","docCode":"C"}];
		
		if ($scope.criteria.docType != null) {
			$scope.deliveryList = $filter('filter')($scope.deliveryList, function(value){return (value.docCode == $scope.criteria.docType);});
		}
		
		$scope.gotoRemark = function(id) {
			$scope.deliver = _.findWhere($scope.deliveryList, {'appNo': id +''});
			$scope.deliveryList.historyLog = $scope.deliver.historyLog;
		};
		
		if ($scope.criteria.appNo != null) {
			$scope.deliveryList = $filter('filter')($scope.deliveryList, function(value){return (value.appNo == $scope.criteria.appNo);});
		}
		
		$rootScope.paging.totalItems = $scope.deliveryList.length;
		$rootScope.paging.showing = _.getShowing($rootScope.paging.pageNumber, $rootScope.paging.limit, $scope.deliveryList.length);
		
	};
	
	$scope.search();

}

function AllRegisterDocCtrl($rootScope, $scope, $http, $compile, $timeout, $filter, $location, $log, $route, $routeParams) {
	$log.info('Enter AllRegisterDocCtrl');
	
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
	
	$scope.documentList = [{"docCode":"P","docName":"กรมธรรม์"},
	                       {"docCode":"C","docName":"จดหมายแจ้งยกเลิก"},
						  ];
	
	$scope.search = function(){
		$scope.deliveryList = [{"no":"1","docType":"กรมธรรม์","appNo":"OTISCKPI002490001","policyNo":"DM002490001","regisNo":"RT0000100TH","regisDate":"01/07/57","contactName":"นายวิเชียร เลาหบุตร","zipCode":"10400","fee":"20","status":"WS","statusNameLc":"รอยืนยันการบันทึก","statusNameEn":"รอยืนยันการบันทึก","historyLog":"","docCode":"P"}
		,{"no":"2","docType":"กรมธรรม์","appNo":"OTISCKPI002490002","policyNo":"DM002490002","regisNo":"EM0012078TH","regisDate":"01/07/57","contactName":"นายวิเชียร เลาหบุตร","zipCode":"23900","fee":"50","status":"CS","statusNameLc":"ยกเลิกการบันทึก","statusNameEn":"ยกเลิกการบันทึก","historyLog":"","docCode":"P"}
		,{"no":"3","docType":"จดหมายแจ้งยกเลิก","appNo":"OTISCKPI002490003","policyNo":"DM002490003","regisNo":"RG0578123TH","regisDate":"01/07/57","contactName":"นายวิเชียร เลาหบุตร","zipCode":"10000","fee":"30","status":"WS","statusNameLc":"รอยืนยันการบันทึก","statusNameEn":"รอยืนยันการบันทึก","historyLog":"","docCode":"C"}
		,{"no":"4","docType":"กรมธรรม์","appNo":"OTISCKPI002490004","policyNo":"DM002490004","regisNo":"RG07080123TH","regisDate":"17/07/57","contactName":"นายวิเชียร เลาหบุตร","zipCode":"10890","fee":"30","status":"WR","statusNameLc":"รอบันทึกเลขลงทะเบียน","statusNameEn":"รอบันทึกเลขลงทะเบียน","historyLog":"","docCode":"P"}
		,{"no":"5","docType":"จดหมายแจ้งยกเลิก","appNo":"OTISCKPI002490005","policyNo":"DM002490005","regisNo":"RG00080456TH","regisDate":"17/07/57","contactName":"นายวิเชียร เลาหบุตร","zipCode":"10090","fee":"30","status":"WR","statusNameLc":"รอบันทึกเลขลงทะเบียน","statusNameEn":"รอบันทึกเลขลงทะเบียน","historyLog":"","docCode":"C"}];
		
		if ($scope.criteria.docType != null) {
			$scope.deliveryList = $filter('filter')($scope.deliveryList, function(value){return (value.docCode == $scope.criteria.docType);});
		}
		
		if ($scope.criteria.regisStatus != null & $scope.criteria.regisStatus != "") {
			$scope.deliveryList = $filter('filter')($scope.deliveryList, function(value){return (value.status == $scope.criteria.regisStatus);});
		}
		
		$scope.gotoRemark = function(id) {
			$scope.deliver = _.findWhere($scope.deliveryList, {'appNo': id +''});
			$scope.deliveryList.historyLog = $scope.deliver.historyLog;
		};
		
		if ($scope.criteria.appNo != null) {
			$scope.deliveryList = $filter('filter')($scope.deliveryList, function(value){return (value.appNo == $scope.criteria.appNo);});
		}
		
		$rootScope.paging.totalItems = $scope.deliveryList.length;
		$rootScope.paging.showing = _.getShowing($rootScope.paging.pageNumber, $rootScope.paging.limit, $scope.deliveryList.length);
		
	};
	
	$scope.search();
	
	$scope.gotoCreate = function() {
		$location.path('regis-document/create');
	};
	
	$scope.gotoEdit = function(id) {
		$location.path('regis-document/edit/'+id);
	};
	
	$scope.back = function() {
		$location.path('/regis-document');
	};
	
}

function RegisterDocDetailCtrl($rootScope, $scope, $http, $compile, $timeout, $filter, $location, $log, $route, $routeParams) {
	$log.info('Enter RegisterDocDetailCtrl');
	
	//$scope.mode = $routeParams.mode;
	//$scope.id = $routeParams.id;
	
	$scope.regisDocList = [{"no":"1","ch1":"N","ch2":"Y","ch3":"N","appNo":"AP0157/00001","policyNo":"PL","docType":"","zipCode":"12000","regisNo1":"","regisNo2":"","regisNo3":"","speciaNo":"","emsNo1":"","emsNo2":"","emsNo3":"","emsSpecial":"","fee":"20"}
	,{"no":"2","ch1":"Y","ch2":"N","ch3":"N","appNo":"AP0157/00002","policyNo":"PL","docType":"","zipCode":"50230","regisNo1":"","regisNo2":"","regisNo3":"","speciaNo":"","emsNo1":"","emsNo2":"","emsNo3":"","emsSpecial":"","fee":"20"}
	,{"no":"3","ch1":"N","ch2":"N","ch3":"N","appNo":"AP0157/00003","policyNo":"PL","docType":"","zipCode":"25004","regisNo1":"","regisNo2":"","regisNo3":"","speciaNo":"","emsNo1":"","emsNo2":"","emsNo3":"","emsSpecial":"","fee":"20"}
	,{"no":"4","ch1":"N","ch2":"N","ch3":"N","appNo":"AP0157/00005","policyNo":"PL","docType":"","zipCode":"10000","regisNo1":"","regisNo2":"","regisNo3":"","speciaNo":"","emsNo1":"","emsNo2":"","emsNo3":"","emsSpecial":"","fee":"20"}
	,{"no":"5","ch1":"N","ch2":"N","ch3":"N","appNo":"AP0157/00006","policyNo":"PL","docType":"","zipCode":"10400","regisNo1":"","regisNo2":"","regisNo3":"","speciaNo":"","emsNo1":"","emsNo2":"","emsNo3":"","emsSpecial":"","fee":"20"}
	,{"no":"6","ch1":"N","ch2":"N","ch3":"N","appNo":"AP0157/00007","policyNo":"PL","docType":"","zipCode":"23001","regisNo1":"","regisNo2":"","regisNo3":"","speciaNo":"","emsNo1":"","emsNo2":"","emsNo3":"","emsSpecial":"","fee":"20"}];
	
	/*if ($scope.id != null && $scope.id != "" && $scope.mode == "edit") {
		$scope.regisDocList = $filter('filter')($scope.regisDocList, function(value){return (value.appNo == $scope.id);});
	}*/
	
	$scope.back = function() {
		$location.path('/regis-document');
	};
	
}

function AllRegisterDocReturnCtrl($rootScope, $scope, $http, $compile, $timeout, $filter, $location, $log, $route, $routeParams) {
	$log.info('Enter AllRegisterDocReturnCtrl');
	
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
	
	$scope.documentList = [{"docCode":"P","docName":"กรมธรรม์"},
	                       {"docCode":"C","docName":"จดหมายแจ้งยกเลิก"},
						  ];
	
	$scope.search = function(){
		$scope.deliveryList = [{"no":"1","docType":"กรมธรรม์","appNo":"OTISCKPI002490001","policyNo":"DM002490001","regisNo":"RT0000100TH","regisDate":"01/07/57","contactName":"นายวิเชียร เลาหบุตร","zipCode":"10400","fee":"20","status":"SS","statusName":"บันทึกส่งแล้ว","historyLog":"","docCode":"P"}
		,{"no":"2","docType":"กรมธรรม์","appNo":"OTISCKPI002490002","policyNo":"DM002490002","regisNo":"EM0012078TH","regisDate":"01/07/57","contactName":"นายวิเชียร เลาหบุตร","zipCode":"23900","fee":"50","status":"SS","statusName":"บันทึกส่งแล้ว","historyLog":"","docCode":"P"}
		,{"no":"3","docType":"จดหมายแจ้งยกเลิก","appNo":"OTISCKPI002490003","policyNo":"DM002490003","regisNo":"RG0578123TH","regisDate":"01/07/57","contactName":"นายวิเชียร เลาหบุตร","zipCode":"10000","fee":"30","status":"SS","statusName":"บันทึกส่งแล้ว","historyLog":"","docCode":"C"}
		,{"no":"4","docType":"กรมธรรม์","appNo":"OTISCKPI002490004","policyNo":"DM002490004","regisNo":"RG07080123TH","regisDate":"17/07/57","contactName":"นายวิเชียร เลาหบุตร","zipCode":"10890","fee":"30","status":"CS","statusName":"ยกเลิกส่งกลับ","historyLog":"","docCode":"P"}
		,{"no":"5","docType":"จดหมายแจ้งยกเลิก","appNo":"OTISCKPI002490005","policyNo":"DM002490005","regisNo":"RG00080456TH","regisDate":"17/07/57","contactName":"นายวิเชียร เลาหบุตร","zipCode":"10090","fee":"30","status":"CS","statusName":"ยกเลิกส่งกลับ","historyLog":"","docCode":"C"}];
		
		if ($scope.criteria.docType != null) {
			$scope.deliveryList = $filter('filter')($scope.deliveryList, function(value){return (value.docCode == $scope.criteria.docType);});
		}
		
		$scope.gotoRemark = function(id) {
			$scope.deliver = _.findWhere($scope.deliveryList, {'appNo': id +''});
			$scope.deliveryList.historyLog = $scope.deliver.historyLog;
		};
		
		if ($scope.criteria.appNo != null) {
			$scope.deliveryList = $filter('filter')($scope.deliveryList, function(value){return (value.appNo == $scope.criteria.appNo);});
		}
		
		$rootScope.paging.totalItems = $scope.deliveryList.length;
		$rootScope.paging.showing = _.getShowing($rootScope.paging.pageNumber, $rootScope.paging.limit, $scope.deliveryList.length);
		
	};
	
	$scope.search();
	
	$scope.gotoCreate = function() {
		$location.path('regis-doc-return/create');
	};
	
	$scope.gotoEdit = function(id) {
		$location.path('regis-doc-return/edit/'+id);
	};
	
	$scope.back = function() {
		$location.path('/regis-doc-return');
	};
	
}

function RegisterDocReturnDetailCtrl($rootScope, $scope, $http, $compile, $timeout, $filter, $location, $log, $route, $routeParams) {
	$log.info('Enter RegisterDocReturnDetailCtrl');
	
	$scope.mode = $routeParams.mode;
	$scope.id = $routeParams.id;
	
	$scope.regisDocReturnList = [{"no":"1","docType":"กรมธรรม์","appNo":"OTISCKPI002490001","policyNo":"DM002490001","regisNo":"RT0000100TH","regisDate":"01/07/57","contactName":"นายวิเชียร เลาหบุตร","zipCode":"10400","fee":"20","status":"WS","statusNameLc":"รอยืนยันการบันทึก","statusNameEn":"รอยืนยันการบันทึก","specialCode":"234","docCode":"P"}
	,{"no":"2","docType":"กรมธรรม์","appNo":"OTISCKPI002490002","policyNo":"DM002490002","regisNo":"EM0012078TH","regisDate":"01/07/57","contactName":"นายวิเชียร เลาหบุตร","zipCode":"23900","fee":"50","status":"CS","statusNameLc":"ยกเลิกการบันทึก","statusNameEn":"ยกเลิกการบันทึก","specialCode":"345","docCode":"P"}
	,{"no":"3","docType":"จดหมายแจ้งยกเลิก","appNo":"OTISCKPI002490003","policyNo":"DM002490003","regisNo":"RG0578123TH","regisDate":"01/07/57","contactName":"นายวิเชียร เลาหบุตร","zipCode":"10000","fee":"30","status":"WS","statusNameLc":"รอยืนยันการบันทึก","statusNameEn":"รอยืนยันการบันทึก","specialCode":"567","docCode":"C"}
	,{"no":"4","docType":"กรมธรรม์","appNo":"OTISCKPI002490004","policyNo":"DM002490004","regisNo":"RG07080123TH","regisDate":"17/07/57","contactName":"นายวิเชียร เลาหบุตร","zipCode":"10890","fee":"30","status":"WR","statusNameLc":"รอบันทึกเลขลงทะเบียน","statusNameEn":"รอบันทึกเลขลงทะเบียน","specialCode":"789","docCode":"P"}
	,{"no":"5","docType":"จดหมายแจ้งยกเลิก","appNo":"OTISCKPI002490005","policyNo":"DM002490005","regisNo":"RG00080456TH","regisDate":"17/07/57","contactName":"นายวิเชียร เลาหบุตร","zipCode":"10090","fee":"30","status":"WR","statusNameLc":"รอบันทึกเลขลงทะเบียน","statusNameEn":"รอบันทึกเลขลงทะเบียน","specialCode":"099","docCode":"C"}];
	
	if ($scope.id != null && $scope.id != "" && $scope.mode == "edit") {
		$scope.regisDocReturnList = $filter('filter')($scope.regisDocReturnList, function(value){return (value.appNo == $scope.id);});
	}
	
	$scope.back = function() {
		$location.path('/regis-doc-return');
	};
	
}
