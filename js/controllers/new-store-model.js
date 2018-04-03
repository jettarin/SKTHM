angular.module('myApp').config([ '$routeProvider', function($routeProvider) {
	$routeProvider.when("/parameter-setup-new-store-setup-list", {templateUrl: _.toHttpGetUrl("content/new-store-model/new-store-setup-list.html"), controller: NewstoreSetupListCtrl});
	$routeProvider.when("/parameter-setup-new-store-setup-detail/:id", {templateUrl: _.toHttpGetUrl("content/new-store-model/new-store-setup-detail.html"), controller: NewstoreSetupDetailCtrl});
} ]);



//####################### New Store Setup(new model) List ##################
function NewstoreSetupListCtrl($rootScope, $scope, $http, $compile, $filter, $timeout, $routeParams, $location, $log) {
	$log.info('Enter NewstoreSetupListCtrl');
	
	$timeout(function() {
		
		$rootScope.criteria.dateFrom = _.toDateStr(moment()); //set default date form
		$rootScope.criteria.dateTo = _.toDateStr(moment()); //set default date to
		
		$scope.BUlist = [
      		 {"buid":"1", "bu":"Hyper"}
      		,{"buid":"2", "bu":"Market"}
      		,{"buid":"3", "bu":"Mini"}
      		,{"buid":"4", "bu":"Jumbo"}
      	];
		
		$scope.newStoreList = [
			  {"storeId":"15011" , "storeName":"Thepkasattri"}
			, {"storeId":"15013" , "storeName":"Kamala"}
			, {"storeId":"15015" , "storeName":"Pluak Daeng"}
			, {"storeId":"11219" , "storeName":"suphanburi"}
			, {"storeId":"11027" , "storeName":"kalasin"}
		];

		$scope.MSlist = [
             {"storeId":"11101", "storeCode":"11101","storeName":"สาขาวงศ์สว่าง"}
			,{"storeId":"11102", "storeCode":"11102","storeName":"สาขาแจ้งวัฒนะ"}
			,{"storeId":"11103", "storeCode":"11103","storeName":"สาขาราษฏร์บูรณะ"}
			,{"storeId":"11104", "storeCode":"11104","storeName":"สาขาพัทยา"}
			,{"storeId":"11105", "storeCode":"11105","storeName":"สาขาบางพลี"}
		];

		$scope.gotoDetail = function(item) {
			$location.path('parameter-setup-new-store-setup-detail/'+ item.id);
		};
		
		$scope.dataList = [
            {"id":"0001", "bu":"Hyper", "newStore":"11219:suphanburi", "dateForm":"01/01/2014", "dateTo":"05/01/2014", "storeModelList":[{"division":"Hard Line", "store":"11101:สาขาวงศ์สว่าง", "percent":"100.00"}, {"division":"Home Line", "store":"11101:สาขาวงศ์สว่าง", "percent":"100.00"}, {"division":"Dry Food", "store":"11101:สาขาวงศ์สว่าง", "percent":"100.00"}, {"division":"Soft Line", "store":"11101:สาขาวงศ์สว่าง", "percent":"100.00"}] }
           ,{"id":"0002", "bu":"Hyper", "newStore":"11027:kalasin", "dateForm":"01/01/2014", "dateTo":"05/01/2014", "storeModelList":[{"division":"Hard Line", "store":"11102:สาขาแจ้งวัฒนะ", "percent":"100.00"}, {"division":"Home Line", "store":"11103:สาขาราษฏร์บูรณะ", "percent":"100.00"}, {"division":"Dry Food", "store":"11101:สาขาวงศ์สว่าง", "percent":"100.00"}, {"division":"Soft Line", "store":"11104:สาขาพัทยา", "percent":"100.00"}] }
        ];
		
		$scope.clear = function(){
			$rootScope.criteria = {};
		};
		
	}, 0);
	
};

//####################### New Store Setup(new model) Detail ##################
function NewstoreSetupDetailCtrl($rootScope, $scope, $http, $compile, $filter, $timeout, $routeParams, $location, $log) {
	$log.info('Enter NewstoreSetupDetailCtrl');
	
	$timeout(function() {
		
		$scope.dataList = [
	           {"id":"0001", "buId":"1", "bu":"Hyper","newStoreId":"11219", "newStore":"21274:MBC BCP Vibha Km.12", "startDate":"01/01/2014", "endDate":"05/01/2014"
	        	   , "storeModelList":[
                         {"divisionCode":"01", "storeId":"11101", "percent":"100.00"}
                       , {"divisionCode":"02", "storeId":"11101", "percent":"100.00"}
                       , {"divisionCode":"03", "storeId":"11101", "percent":"100.00"}
                       , {"divisionCode":"04", "storeId":"11101", "percent":"100.00"}
    	            ]
	           }
	           ,{"id":"0002", "buId":"1", "bu":"Hyper","newStoreId":"11027", "newStore":"21275:MBC BCP Vibha Km.17", "startDate":"01/01/2014", "endDate":"05/01/2014"
	        	   , "storeModelList":[
                         {"divisionCode":"01", "storeId":"11101", "percent":"100.00"}
                       , {"divisionCode":"02", "storeId":"11102", "percent":"100.00"}
                       , {"divisionCode":"03", "storeId":"11103", "percent":"100.00"}
                       , {"divisionCode":"04", "storeId":"11104", "percent":"100.00"}
                   ] 
	           }
        ];
		
		$scope.divList = [
			 {"divisionCode":"02", "divisionName":"Hard Line","inbox":"100.00"}
			,{"divisionCode":"03", "divisionName":"Home Line","inbox":"100.00"}
            ,{"divisionCode":"01", "divisionName":"Dry Food","inbox":"100.00"}
			,{"divisionCode":"04", "divisionName":"Soft Line","inbox":"100.00"}
		];
		
		$scope.titleList = [
              {'groupName':'TITLE_ROW', 'value':'1', 'name': 'Model Store'}
            , {'groupName':'TITLE_ROW', 'value':'2', 'name': '%'}
        ];
		
		$scope.BUlist = [
      		 {"buid":"1", "bu":"Hyper"}
      		,{"buid":"2", "bu":"Market"}
      		,{"buid":"3", "bu":"Mini"}
      		,{"buid":"4", "bu":"Jumbo"}
      	];
		
		$scope.newStoreList = [
	          {"storeId":"11209" , "storeName":"Chanthaburi"}
			, {"storeId":"15011" , "storeName":"Thepkasattri"}
			, {"storeId":"15013" , "storeName":"Kamala"}			
			, {"storeId":"15015" , "storeName":"Pluak Daeng"}
			, {"storeId":"11219" , "storeName":"suphanburi"}
			, {"storeId":"11027" , "storeName":"kalasin"}
		];

		$scope.storeList = [
             {"storeId":"11101", "storeCode":"11101","storeName":"สาขาวงศ์สว่าง"}
			,{"storeId":"11102", "storeCode":"11102","storeName":"สาขาแจ้งวัฒนะ"}
			,{"storeId":"11103", "storeCode":"11103","storeName":"สาขาราษฏร์บูรณะ"}
			,{"storeId":"11104", "storeCode":"11104","storeName":"สาขาพัทยา"}
			,{"storeId":"11105", "storeCode":"11105","storeName":"สาขาบางพลี"}	
		];
		
		// ----- mod edit ----- // 
		if ($routeParams.id != 'new') {
			$log.info('mode edit id: '+ $routeParams.id);
			
			$scope.modeShow = 'edit';
			
			// find by id
			$scope.dataDetailObj = _.findWhere($scope.dataList, {'id': $routeParams.id +''});
			
			$scope.dataDetailObj.startDateStr = _.toDateStr($scope.dataDetailObj.startDate);
			$scope.dataDetailObj.endDateStr = _.toDateStr($scope.dataDetailObj.endDate);
			
		}
		
		// ----- mod new ----- //
		else {
			$log.info('mode new');
			
			$scope.modeShow = 'new';
			
			$scope.dataDetailObj = {"id":"0001", "buId":"", "bu":"Hyper","newStoreId":"", "newStore":"", "startDate":"", "endDate":""
					        	   , "storeModelList":[
						                       {"divisionCode":"", "storeId":"", "percent":"100.00"}
						                     , {"divisionCode":"", "storeId":"", "percent":"100.00"}
						                     , {"divisionCode":"", "storeId":"", "percent":"100.00"}
						                     , {"divisionCode":"", "storeId":"", "percent":"100.00"}
					                     ]
									};
			
			$scope.dataDetailObj.startDateStr = _.toDateStr(moment());
			$scope.dataDetailObj.endDateStr = _.toDateStr(moment());
			
		}
		
		$scope.clear = function(){
			$rootScope.criteria = {};
		};
		
		$scope.save = function() {
			
			$scope.isSubmit = true;
			
			if ($scope.dataDetailObj.startDateStr) {
				$scope.dataDetailObj.startDate = moment($scope.dataDetailObj.startDateStr, 'DD/MM/YYYY').valueOf();
			}
			if ($scope.dataDetailObj.endDateStr) {
				$scope.dataDetailObj.endDate = moment($scope.dataDetailObj.endDateStr, 'DD/MM/YYYY').valueOf();
			}
			
			if ($scope.form.$invalid) {
				$scope.app.addAlert('gritter-error', 'Incorrect data !!!', 4000);
				return;
			}
			
			$scope.app.addAlert('gritter-success', 'Update Success', 4000);
		};
		
		$scope.back = function() {
			$location.path('parameter-setup-new-store-setup-list');
		};
		
	}, 0);
	
};

