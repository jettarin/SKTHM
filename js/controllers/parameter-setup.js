angular.module('myApp').config([ '$routeProvider', function($routeProvider) {
	$routeProvider.when("/parameter-setup-item-allocate", {templateUrl: _.toHttpGetUrl("content/parameter-setup/item-allocate.html"), controller: ItemAllocateCtrl});
    $routeProvider.when("/parameter-setup-store-allocate", {templateUrl: _.toHttpGetUrl("content/parameter-setup/store-allocate.html"), controller: StoreAllocateCtrl});
	$routeProvider.when("/parameter-setup-minimum-allocate", {templateUrl: _.toHttpGetUrl("content/parameter-setup/minimum-allocate.html"), controller: MinimumAllocateCtrl});
	$routeProvider.when("/parameter-setup-timing-e-campaign", {templateUrl: _.toHttpGetUrl("content/parameter-setup/timing-e-campaign.html"), controller: TimingEcampaignCtrl});
	$routeProvider.when("/parameter-setup-abnormal-extra-demand", {templateUrl: _.toHttpGetUrl("content/parameter-setup/abnormal-extra-demand.html"), controller: AbnormalAndExtraDemandCtrl});
} ]);



//####################### ITEM ALLOCATE ##################
function ItemAllocateCtrl($rootScope, $scope, $http, $compile, $timeout, $filter, $location, $log) {
	
	$timeout(function() {
		
		$scope.itemAllocateList = [
			  {"id":"1" ,"buName":"Hyper", "itemsCondition":"Media Type", "DF":false, "HL":false, "HO":true, "SL":true}
			, {"id":"2" ,"buName":"", "itemsCondition":"Campaign Sub Type", "DF":false, "HL":false, "HO":true, "SL":true}
			, {"id":"3" ,"buName":"", "itemsCondition":"Use PFM", "DF":true, "HL":true, "HO":true, "SL":true}
			, {"id":"4" ,"buName":"Market", "itemsCondition":"Media Type", "DF":true, "HL":true, "HO":true, "SL":true}
			, {"id":"5" ,"buName":"", "itemsCondition":"Campaign Sub Type", "DF":true, "HL":true, "HO":true, "SL":true}
			, {"id":"6" ,"buName":"", "itemsCondition":"Use PFM", "DF":true, "HL":true, "HO":true, "SL":true}
			, {"id":"7" ,"buName":"Mini", "itemsCondition":"Media Type", "DF":true, "HL":true, "HO":true, "SL":true}
			, {"id":"8" ,"buName":"", "itemsCondition":"Campaign Sub Type", "DF":true, "HL":true, "HO":true, "SL":true}
			, {"id":"9" ,"buName":"", "itemsCondition":"Use PFM", "DF":true, "HL":true, "HO":true, "SL":true}
			, {"id":"10" ,"buName":"Jumbo", "itemsCondition":"Media Type", "DF":true, "HL":true, "HO":true, "SL":true}
			, {"id":"11" ,"buName":"", "itemsCondition":"Campaign Sub Type", "DF":true, "HL":true, "HO":true, "SL":true}
			, {"id":"12" ,"buName":"", "itemsCondition":"Use PFM", "DF":true, "HL":true, "HO":true, "SL":true}
		];
		
		$scope.genClassCheckBox = function(obj) {
			if (obj.itemsCondition === 'Campaign Sub Type') {
				return 'ace-switch ace-switch-8';
			} else {
				return 'ace-switch ace-switch-7';
			}
		};
		
		$scope.genClassTableStripedX3 = function(index) {
			var highlight = (index+1) % 6;
			if (highlight >= 1 && highlight <= 3)  {
				return 'table-striped-x3';
			}
		};
		
		$scope.saveItemAllocate = function() {
			$scope.app.addAlert('gritter-success', 'Update Success', 4000);
		};
		
	}, 0);
	
};

//####################### STORE ALLOCATE ##################
function StoreAllocateCtrl($rootScope, $scope, $http, $compile, $filter, $timeout, $routeParams, $location) {
	
	$timeout(function() {
		
		$scope.storeAllocateList = [
									{"id":"1", "bu":"Hyper", "link_orderale_check":true, "std_pog":false},
									{"id":"2", "bu":"Market", "link_orderale_check":false, "std_pog":false},
									{"id":"3", "bu":"Mini", "link_orderale_check":true, "std_pog":true},
									{"id":"4", "bu":"Jumbo", "link_orderale_check":true, "std_pog":true}
								  ];
								  
		$scope.saveStoreAllocate = function() {
			$scope.app.addAlert('gritter-success', 'Update Success', 4000);
		};
	
	}, 0);
	
};

//####################### % MINIMUM ALLOCATE ##################
function MinimumAllocateCtrl($rootScope, $scope, $http, $compile, $filter, $timeout, $routeParams, $location) {
	
	$timeout(function() {
		
		$scope.minimumAllocateList = [
									  {"id":"1" , "bu":"Hyper", "df":"50.00", "hl":"50.00", "ho":"50.00", "sl":"50.00"}
									, {"id":"2" , "bu":"Market", "df":"50.00", "hl":"50.00", "ho":"50.00", "sl":"50.00"}
									, {"id":"3" , "bu":"Mini", "df":"50.00", "hl":"50.00", "ho":"50.00", "sl":"50.00"}
									, {"id":"4" , "bu":"Jumbo", "df":"50.00", "hl":"50.00", "ho":"50.00", "sl":"50.00"}
								  ];
								  
		$scope.saveMinimumAllocate = function() {
			$scope.app.addAlert('gritter-success', 'Update Success', 4000);
		};
	
	}, 0);
	
};

//####################### TIMING E-CAMPAIGN ##################
function TimingEcampaignCtrl($rootScope, $scope, $http, $compile, $filter, $timeout, $routeParams, $location) {
	
	$timeout(function() {
		
		$scope.timingEcampaignList = [
									  {"id":"1" , "bu":"Hyper", "df":14, "hl":13, "ho":14, "sl":14}
									, {"id":"2" , "bu":"Market", "df":21, "hl":13, "ho":21, "sl":21}
									, {"id":"3" , "bu":"Mini", "df":14, "hl":13, "ho":14, "sl":14}
									, {"id":"4" , "bu":"Jumbo", "df":14, "hl":13, "ho":14, "sl":14}
								  ];
								  
		$scope.save = function() {
			$scope.app.addAlert('gritter-success', 'Update Success', 4000);
		};
	
	}, 0);
	
};

//####################### ABNORMAL AND EXTRA DEMAND ##################
function AbnormalAndExtraDemandCtrl($rootScope, $scope, $http, $compile, $filter, $timeout, $routeParams, $location) {
	
	$timeout(function() {
		
		$scope.abnormalExtraDemandList = [
									  {"id":"1" , "bu":"Hyper", "df":"5.00", "hl":"5.00", "ho":"5.00", "sl":"5.00"}
									, {"id":"2" , "bu":"Market", "df":"5.00", "hl":"5.00", "ho":"5.00", "sl":"5.00"}
									, {"id":"3" , "bu":"Mini", "df":"5.00", "hl":"5.00", "ho":"5.00", "sl":"5.00"}
									, {"id":"4" , "bu":"Jumbo", "df":"5.00", "hl":"5.00", "ho":"5.00", "sl":"5.00"}
								  ];
								  
		$scope.save = function() {
			$scope.app.addAlert('gritter-success', 'Update Success', 4000);
		};
	
	}, 0);
	
};

