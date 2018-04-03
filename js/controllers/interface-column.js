angular.module('myApp').config([ '$routeProvider', function($routeProvider) {
	$routeProvider.when("/interface-column", {templateUrl: _.toHttpGetUrl("content/interface/interface-column-list.html"), controller: InterfaceColumnListCtrl });
    $routeProvider.when("/interface-column/:mode", {templateUrl: "content/interface/interface-column-detail.html", controller: InterfaceColumnDetailCtrl});
} ]);

function InterfaceColumnListCtrl($rootScope, $scope, $http, $compile, $filter, $timeout, $routeParams, $location, $log) {
	$log.info('Enter InterfaceColumnListCtrl');
	
	if(!$rootScope.paging){
		$rootScope.paging = APP.DEFAULT_PAGING;
	}
	if (!$rootScope.criteria) {
		$rootScope.criteria = {};
	}
	
	// Clear Search Criteria
	$scope.clear = function(){
		$rootScope.criteria = {};
	};
	
	if($scope.criteria.dataType != null){		
		$scope.dataTypeList = $filter('filter')($scope.dataTypeList, function(value){return (value.typeCode == $scope.criteria.dataType);});		
	}
	
	$scope.search = function(){
		$scope.dataTypeList = [{"typeCode":"N","typeName":"Number"},
		                       {"typeCode":"S","typeName":"String"},
							  ];
		
		angular.extend($rootScope.criteria, $rootScope.paging);
		
		$scope.dataColumnList = [{"no":"1","code":"REFNO","dataType":"String","desc":"Reference Number","refColumn":"REFERENCE_NO","type":"S","status":"A","statusNameLc":"ใช้งาน","statusNameEn":"Active"},
		                         {"no":"2","code":"APPNO","dataType":"String","desc":"Application Number","refColumn":"APPLICATION_NO","type":"S","status":"A","statusNameLc":"ใช้งาน","statusNameEn":"Active"},
		                         {"no":"3","code":"ASSURED","dataType":"String","desc":"Assured Number","refColumn":"ASSURED_NAME","type":"S","status":"A","statusNameLc":"ใช้งาน","statusNameEn":"Active"},
							  ];
		
		if ($scope.criteria.code != null) {
			$scope.dataColumnList = $filter('filter')($scope.dataColumnList, function(value){return (value.code == $scope.criteria.code);});
		}
		
		if ($scope.criteria.dataType != null) {
			$scope.dataColumnList = $filter('filter')($scope.dataColumnList, function(value){return (value.type == $scope.criteria.dataType);});
		}
		
		if ($scope.criteria.status != null & $scope.criteria.status != "") {
			$scope.dataColumnList = $filter('filter')($scope.dataColumnList, function(value){return (value.status == $scope.criteria.status);});
		}
		
		$rootScope.paging.totalItems = $scope.dataColumnList.length;
		$rootScope.paging.showing = _.getShowing($rootScope.paging.pageNumber, $rootScope.paging.limit, $scope.dataColumnList.length);
	};
	
	$scope.search();
	
	$scope.selectPage = function(page) {
		$rootScope.paging.pageNumber = page;
		$scope.search();
	};
	
	$scope.gotoCreate = function() {
		$location.path('interface-column/create');
	};
	
};

//####################### New Store Setup(new model) Detail ##################
function InterfaceColumnDetailCtrl($rootScope, $scope, $http, $compile, $filter, $timeout, $routeParams, $location, $log) {
	$log.info('Enter InterfaceColumnDetailCtrl');
	
	$scope.dataTypeList = [{"typeCode":"N","typeName":"Number"},
	                       {"typeCode":"S","typeName":"String"},
						  ];
	
	$scope.mode = $routeParams.mode;
	$scope.id = $routeParams.id;

	//check mode
	if($scope.mode == 'create'){
		// Cleart Search Criteria
		$scope.clear = function(){
			$rootScope.criteria = {};
		};
		$scope.col ={
				status : 'A'				
		};
	}else {
		$scope.dedailList = [{"no":"1","code":"REFNO","typeName":"String","desc":"Reference Number","refColumn":"REFERENCE_NO","type":"S","status":"A","statusNameLc":"ใช้งาน","statusNameEn":"Active"},
	                         {"no":"2","code":"APPNO","typeName":"String","desc":"Application Number","refColumn":"APPLICATION_NO","type":"S","status":"A","statusNameLc":"ใช้งาน","statusNameEn":"Active"},
	                         {"no":"3","code":"ASSURED","typeName":"String","desc":"Assured Number","refColumn":"ASSURED_NAME","type":"S","status":"A","statusNameLc":"ใช้งาน","statusNameEn":"Active"},
						  ];

		$scope.col = _.findWhere($scope.dedailList, {'code': $scope.id +''});
		$('input[name="code"]').prop('readonly', true);
	}
	
	// function
	$scope.save = function() {
		$scope.isSubmit = true;		
		// validate form
		if ($scope.form.$invalid) {
			myFunction.alertRequiredFields();
			return;
		}
		myFunction.confirmSaveBox().result.then(function(ok) {
			if (ok) {
				if ($scope.mode === 'create') {
					myFunction.alertCreateSuccess();
					$scope.back();
				}
				else {	// edit
					myFunction.alertUpdateSuccess();
					$scope.back();
				}
			};
		});
	};	
	
	$scope.back = function() {
		$location.path('interface-column');
	};
	
};
