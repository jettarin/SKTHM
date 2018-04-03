angular.module('myApp').config([ '$routeProvider', function($routeProvider) {
	$routeProvider.when("/interface-profile", {templateUrl:_.toHttpGetUrl('content/interface/interface-profile/interface-profile-list.html'), controller: InterfaceProfileCtrl});
	$routeProvider.when("/interface-profile/:mode", {templateUrl: _.toHttpGetUrl("content/interface/interface-profile/interface-profile-detail.html"), controller: InterfaceProfileDetailCtrl});
	$routeProvider.when("/interface-profile/:mode/:id", {templateUrl:_.toHttpGetUrl('content/interface/interface-profile/interface-profile-detail.html'), controller: InterfaceProfileDetailCtrl});

} ]);

function InterfaceProfileCtrl($rootScope, $scope, $http, $compile, $timeout, $filter, $location, $log, $route, $routeParams, $translate) {
	$log.info('Enter InterfaceProfileCtrl');
	
	
	
	if(!$rootScope.paging){
		$rootScope.paging = APP.DEFAULT_PAGING;
	}
	if (!$rootScope.criteria) {
		$rootScope.criteria = {};
	}
	

	
	$scope.goToPath = function(id){
		$location.path ('/interface-profile/'+id);
	};


	// Clear Search Criteria
	$scope.clear = function(){
		$rootScope.criteria = {};
	};
	
	//project list
	$scope.projectList = [
	                     {"projectCode":"001","projectName":"ASN"},
	                     {"projectCode":"002","projectName":"ASNKTC"},
	                     {"projectCode":"003","projectName":"I-SERVICE"}];
	
	
	// profile type list
	$scope.profileTypeList = [
		 {"profileTypeCode":"001", "profileTypeName":"Import File"}
		,{"profileTypeCode":"002","profileTypeName":"Export File"}
		,{"profileTypeCode":"003", "profileTypeName":"Import from E-mail"}
	];
	
	// Interface Type List
	$scope.interfaceTypeList = [
		 {"interfaceTypeCode":"001", "interfaceTypeName":"Yes File CV"}
	];
	
	// project List
	$scope.projectList = [
	      {"projectCode":"001", "projectName":"ASN"}
	     ,{"projectCode":"002", "projectName":"ASN KTC"}
	     ,{"projectCode":"003", "projectName":"I-SERV"}
	];
	
$scope.search = function(){
	
		angular.extend($rootScope.criteria, $rootScope.paging);
		
		// Interface Profile List
		$scope.interfaceProfileList = [
	       {"profileId":"00001","profileType":"001","profileTypeNameEn":"Import File","interfaceType":"001","interfaceTypeNameEn":"Yes File CV","project":"001","projectNameEn":"ASN","profile":"profile1","fileName":"File Name1","status":"A"}
	      ,{"profileId":"00002","profileType":"001","profileTypeNameEn":"Import File","interfaceType":"001","interfaceTypeNameEn":"Yes File CV","project":"002","projectNameEn":"ASN KTC","profile":"profile2","fileName":"File Name2","status":"A"}
	      ,{"profileId":"00003","profileType":"002","profileTypeNameEn":"From E-mail","interfaceType":"001","interfaceTypeNameEn":"Yes File CV","project":"003","projectNameEn":"I-SERV","profile":"profile3","fileName":"File Name3","status":"A"}
	      ,{"profileId":"00004","profileType":"002","profileTypeNameEn":"From E-mail","interfaceType":"001","interfaceTypeNameEn":"Yes File CV","project":"003","projectNameEn":"I-SERV","profile":"profile4","fileName":"File Name4","status":"I"}
		];
		
		if ($scope.criteria.profileType != null) {
			$scope.interfaceProfileList = $filter('filter')($scope.interfaceProfileList, function(value){return (value.profileType == $scope.criteria.profileType);});
		}
		if($scope.criteria.interfaceType != null){
			$scope.interfaceProfileList = $filter('filter')($scope.interfaceProfileList, function (value){return (value.interfaceType == $scope.criteria.interfaceType);});
		}	
		if($scope.criteria.project != null){
			$scope.interfaceProfileList = $filter('filter')($scope.interfaceProfileList, function (value){return (value.project == $scope.criteria.project);});
		}	
		if ($scope.criteria.status != null) {
			$scope.interfaceProfileList = $filter('filter')($scope.interfaceProfileList, function(value){return (value.status == $scope.criteria.status);});
		}
		if ($scope.criteria.profile != null) {
			$scope.interfaceProfileList = _.where($scope.interfaceProfileList, {profile: $scope.criteria.profile});
		}
		if ($scope.criteria.fileName != null) {
			$scope.interfaceProfileList = _.where($scope.interfaceProfileList, {fileName: $scope.criteria.fileName});
		}

		
		$rootScope.paging.totalItems = $scope.interfaceProfileList.length;
		$rootScope.paging.showing = _.getShowing($rootScope.paging.pageNumber, $rootScope.paging.limit, $scope.interfaceProfileList.length);
		
	};	
	
	$scope.search();
	
	$scope.selectPage = function(page) {
		$rootScope.paging.pageNumber = page;
		$scope.search();
	};
	
	$scope.gotoCreate = function() {
		$location.path('interface-profile/create');
	};
	
	$scope.gotoEdit = function(no) {
		$location.path('interface-profile/edit/'+no);
	};
	
}

function InterfaceProfileDetailCtrl($rootScope, $scope, $http, $compile, $filter, $timeout, $routeParams, $location, $log) {
	
	
		// Interface Profile List
			$scope.interfaceProfileList = [
		       {"profileId":"00001","profileType":"001","profileTypeNameEn":"Import File","interfaceType":"001","interfaceTypeNameEn":"Yes File CV","project":"001","projectNameEn":"ASN","profile":"profile1","fileName":"File Name1","status":"A","fileFromPath":"C:/AppServ/www/bearded-master","delimeter":"test delimeter 1","enclosure":"","startRowOfData":"Row Of Data 1"}
		      ,{"profileId":"00002","profileType":"001","profileTypeNameEn":"Import File","interfaceType":"001","interfaceTypeNameEn":"Yes File CV","project":"002","projectNameEn":"ASN KTC","profile":"profile2","fileName":"File Name2","status":"A","fileFromPath":"C:/AppServ/www/bearded-master","delimeter":"test delimeter 2","enclosure":"","startRowOfData":"Row Of Data 2"}
		      ,{"profileId":"00003","profileType":"002","profileTypeNameEn":"From E-mail","interfaceType":"001","interfaceTypeNameEn":"Yes File CV","project":"003","projectNameEn":"I-SERV","profile":"profile3","fileName":"File Name3","status":"A","fileFromPath":"C:/AppServ/www/bearded-master","delimeter":"test delimeter 3","enclosure":"","startRowOfData":"Row Of Data 3"}
		      ,{"profileId":"00004","profileType":"002","profileTypeNameEn":"From E-mail","interfaceType":"001","interfaceTypeNameEn":"Yes File CV","project":"003","projectNameEn":"I-SERV","profile":"profile4","fileName":"File Name4","status":"I","fileFromPath":"C:/AppServ/www/bearded-master","delimeter":"test delimeter 4","enclosure":"","startRowOfData":"Row Of Data 4"}
			];
			
		// Function Add row in table
		$scope.addRows = function(){
			    var rows = {
			    		profileId: $scope.profileId,
			    		
			    };
			    
			    $scope.interfaceProfileList.push(rows);
			  };
	
	// upload  
	$('input[id=inputFile]').change(function(){
		$('#upload').val($(this).val());
		});
			  
	// profile type list
	$scope.profileTypeList = [
	                 		 {"profileTypeCode":"001", "profileTypeName":"Import File"}
	                 		,{"profileTypeCode":"002","profileTypeName":"Export File"}
	                 		,{"profileTypeCode":"003", "profileTypeName":"Import from E-mail"}
	                 	];
	
	// Interface Type List
	$scope.interfaceTypeList = [
		 {"interfaceTypeCode":"001", "interfaceTypeName":"Yes File CV"}
	];
	
	// project List
	$scope.projectList = [
	      {"projectCode":"001", "projectName":"ASN"}
	     ,{"projectCode":"002", "projectName":"ASN KTC"}
	     ,{"projectCode":"003", "projectName":"I-SERVE"}
	];
	
	//File type List
	$scope.fileTypeList = [{"fileTypeCode":"001","fileTypeName":"CSV"}
							,{"fileTypeCode":"002","fileTypeName":"TEXT"}
							,{"FileTypeCode":"003","fileTypeName":"DELIMETER"}];
	
	// File Encoding
	$scope.fileEncodeList = [{"enCodeId":"001","encodeType":"UTF-8"},
	                         {"enCodeId":"002","encodeType":"TIS-620"}];
	
	
	//Name in table
	$scope.nameList = [{"nameId":"001","nameInTable":"Data 1"},
	                   {"nameId":"002","nameInTable":"Data 2"},
	                   {"nameId":"002","nameInTable":"Data 3"}];
	
	// Data Type in table
	$scope.dataTypeList = [{"dataTypeId":"001","dataTypeName":"Data Type 1"},
	                       {"dataTypeId":"001","dataTypeName":"Data Type 2"},
	                       {"dataTypeId":"001","dataTypeName":"Data Type 3"},];
	
	$scope.mode = $routeParams.mode;
	$scope.id = $routeParams.id;
		
	if ($scope.mode === 'create') {
		$scope.interfaceProfile = {
			status : 'A'
		};
	} 
	else {
		// Interface Profile List
		$scope.interfaceProfileList = [
	       {"profileId":"00001","profileType":"001","profileTypeNameEn":"Import File","interfaceType":"001","interfaceTypeNameEn":"Yes File CV","project":"001","projectNameEn":"ASN","profile":"profile1","fileName":"File Name1","status":"A","fileFromPath":"C:/AppServ/www/bearded-master","delimeter":"test delimeter 1","enclosure":"","startRowOfData":"Row Of Data 1"}
	      ,{"profileId":"00002","profileType":"001","profileTypeNameEn":"Import File","interfaceType":"001","interfaceTypeNameEn":"Yes File CV","project":"002","projectNameEn":"ASN KTC","profile":"profile2","fileName":"File Name2","status":"A","fileFromPath":"C:/AppServ/www/bearded-master","delimeter":"test delimeter 2","enclosure":"","startRowOfData":"Row Of Data 2"}
	      ,{"profileId":"00003","profileType":"002","profileTypeNameEn":"From E-mail","interfaceType":"001","interfaceTypeNameEn":"Yes File CV","project":"003","projectNameEn":"I-SERV","profile":"profile3","fileName":"File Name3","status":"A","fileFromPath":"C:/AppServ/www/bearded-master","delimeter":"test delimeter 3","enclosure":"","startRowOfData":"Row Of Data 3"}
	      ,{"profileId":"00004","profileType":"002","profileTypeNameEn":"From E-mail","interfaceType":"001","interfaceTypeNameEn":"Yes File CV","project":"003","projectNameEn":"I-SERV","profile":"profile4","fileName":"File Name4","status":"I","fileFromPath":"C:/AppServ/www/bearded-master","delimeter":"test delimeter 4","enclosure":"","startRowOfData":"Row Of Data 4"}
		];
		
		if ($scope.id != null) {
			$scope.interfaceProfile = _.findWhere($scope.interfaceProfileList, {profileId: $scope.id});
		}
		
	}
	
	
	
	$scope.back = function() {
		$location.path('/interface-profile');
	};
	
}

