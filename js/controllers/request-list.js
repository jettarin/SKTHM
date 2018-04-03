angular.module('myApp').config([ '$routeProvider', function($routeProvider) {
	$routeProvider.when("/request-list", {templateUrl: _.toHttpGetUrl("content/request/request-list.html"), controller: RequestListCtrl });
	$routeProvider.when("/request-detail", {templateUrl: _.toHttpGetUrl("content/request/request-detail.html"), controller: RequestDetailCtrl });
	$routeProvider.when('/request-detail/:id', {templateUrl: _.toHttpGetUrl('content/request/request-detail.html'), controller: RequestDetailCtrl});
} ]);

function RequestListCtrl($rootScope, $scope, $http, $compile, $filter, $timeout, $routeParams, $location, $log) {
	$log.info('Enter RequestListCtrl');
	
	$timeout(function() {
		
		$rootScope.criteria.dateFrom = _.toDateStr(moment()); //set default date form
		$rootScope.criteria.dateTo = _.toDateStr(moment()); //set default date to
		
		if (!$rootScope.paging) {
			$rootScope.paging = APP.DEFAULT_PAGING;
		}
		if (!$rootScope.criteria) {
			$rootScope.criteria = {};
		}
		
		$scope.policyTypeList = [
      		 {"id":"1", "name":"พ.ร.บ."}
      		,{"id":"2", "name":"ประกันภัยชั้น 1"}
      		,{"id":"3", "name":"ประกันภัยชั้น 2"}
      	];
		
		$scope.renewTypeList = [
			  {"id":"1" , "name":"New"}
			, {"id":"2" , "name":"Renew"}
		];
		
		$scope.dataList = [
            {"id":"0001", "bu":"Hyper", "newStore":"11219:suphanburi", "dateForm":"01/01/2014", "dateTo":"05/01/2014", "storeModelList":[{"division":"Hard Line", "store":"11101:Ã Â¸ÂªÃ Â¸Â²Ã Â¸â€šÃ Â¸Â²Ã Â¸Â§Ã Â¸â€¡Ã Â¸Â¨Ã Â¹Å’Ã Â¸ÂªÃ Â¸Â§Ã Â¹Ë†Ã Â¸Â²Ã Â¸â€¡", "percent":"100.00"}, {"division":"Home Line", "store":"11101:Ã Â¸ÂªÃ Â¸Â²Ã Â¸â€šÃ Â¸Â²Ã Â¸Â§Ã Â¸â€¡Ã Â¸Â¨Ã Â¹Å’Ã Â¸ÂªÃ Â¸Â§Ã Â¹Ë†Ã Â¸Â²Ã Â¸â€¡", "percent":"100.00"}, {"division":"Dry Food", "store":"11101:Ã Â¸ÂªÃ Â¸Â²Ã Â¸â€šÃ Â¸Â²Ã Â¸Â§Ã Â¸â€¡Ã Â¸Â¨Ã Â¹Å’Ã Â¸ÂªÃ Â¸Â§Ã Â¹Ë†Ã Â¸Â²Ã Â¸â€¡", "percent":"100.00"}, {"division":"Soft Line", "store":"11101:Ã Â¸ÂªÃ Â¸Â²Ã Â¸â€šÃ Â¸Â²Ã Â¸Â§Ã Â¸â€¡Ã Â¸Â¨Ã Â¹Å’Ã Â¸ÂªÃ Â¸Â§Ã Â¹Ë†Ã Â¸Â²Ã Â¸â€¡", "percent":"100.00"}] }
           ,{"id":"0002", "bu":"Hyper", "newStore":"11027:kalasin", "dateForm":"01/01/2014", "dateTo":"05/01/2014", "storeModelList":[{"division":"Hard Line", "store":"11102:Ã Â¸ÂªÃ Â¸Â²Ã Â¸â€šÃ Â¸Â²Ã Â¹ï¿½Ã Â¸Ë†Ã Â¹â€°Ã Â¸â€¡Ã Â¸Â§Ã Â¸Â±Ã Â¸â€™Ã Â¸â„¢Ã Â¸Â°", "percent":"100.00"}, {"division":"Home Line", "store":"11103:Ã Â¸ÂªÃ Â¸Â²Ã Â¸â€šÃ Â¸Â²Ã Â¸Â£Ã Â¸Â²Ã Â¸Â©Ã Â¸ï¿½Ã Â¸Â£Ã Â¹Å’Ã Â¸Å¡Ã Â¸Â¹Ã Â¸Â£Ã Â¸â€œÃ Â¸Â°", "percent":"100.00"}, {"division":"Dry Food", "store":"11101:Ã Â¸ÂªÃ Â¸Â²Ã Â¸â€šÃ Â¸Â²Ã Â¸Â§Ã Â¸â€¡Ã Â¸Â¨Ã Â¹Å’Ã Â¸ÂªÃ Â¸Â§Ã Â¹Ë†Ã Â¸Â²Ã Â¸â€¡", "percent":"100.00"}, {"division":"Soft Line", "store":"11104:Ã Â¸ÂªÃ Â¸Â²Ã Â¸â€šÃ Â¸Â²Ã Â¸Å¾Ã Â¸Â±Ã Â¸â€”Ã Â¸Â¢Ã Â¸Â²", "percent":"100.00"}] }
        ];
		
		$scope.clear = function(){
			$rootScope.criteria = {};
		};
		
		$scope.searchRequest = function(){		
			//var url = _.toHttpGetUrl('api/user/findUser', $rootScope.criteria);
			//$http.get(url).success(function(data){
			var data = [{"no":"1","broker":"TISCO","policyType":"พ.ร.บ","appNo":"OTISCKPI002490001","requestNo":"57/1001","coverDate":"01/01/57-01/01/58","assured":"นายวิโรจน์ ชูวงศ์","counselor":"นายวิเชียร เลาหบุตร","premium":"1,074.28","status":"Waiting Confirm","requestDate":"01/01/2557"}
			,{"no":"2","broker":"TISCO","policyType":"พ.ร.บ","appNo":"OTISCKPI002490002","requestNo":"57/1002","coverDate":"01/01/57-01/01/58","assured":"นายพงษ์เทพ ธรรมโสพน","counselor":"นายวิเชียร เลาหบุตร","premium":"757.21","status":"Waiting Confirm","requestDate":"01/01/2557"}
			,{"no":"3","broker":"ASN","policyType":"พ.ร.บ","appNo":"OBASNKPI002490001","requestNo":"57/1003","coverDate":"01/01/57-01/01/58","assured":"นายวรวัฒน์ สอนจันทร์","counselor":"นายวิเชียร เลาหบุตร","premium":"757.21","status":"Waiting Confirm","requestDate":"01/01/2557"}
			,{"no":"4","broker":"ASN","policyType":"พ.ร.บ","appNo":"OBASNKPI002490002","requestNo":"57/1004","coverDate":"01/01/57-01/01/58","assured":"นายวิชัย ศรีบุรินทร์","counselor":"นายวิเชียร เลาหบุตร","premium":"757.21","status":"Waiting Confirm","requestDate":"01/01/2557"}
			,{"no":"5","broker":"ASN","policyType":"พ.ร.บ","appNo":"OBASNKPI002490003","requestNo":"57/1005","coverDate":"01/01/57-01/01/58","assured":"นายสงคราม อาจสมบาล","counselor":"นายวิเชียร เลาหบุตร","premium":"757.21","status":"Waiting Confirm","requestDate":"01/01/2557"}
			,{"no":"6","broker":"ASNKTC","policyType":"ประกันภัยชั้น 1","appNo":"OAKTCKPI002490001","requestNo":"57/1006","coverDate":"01/01/57-01/01/58","assured":"นางจุรีรัตน์ ศรีจันทร์","counselor":"นายวิเชียร เลาหบุตร","premium":"18,900.00","status":"Waiting Confirm","requestDate":"01/01/2557"}
			/*,{"no":"7","broker":"ASNKTC","policyType":"ประกันภัยชั้น 2+","appNo":"OAKTCKPI002490003","policyNo":"","coverDate":"01/01/2557-01/01/2558","assured":"น.ส.อรุณรัตน์ ปวรรัตน์","counselor":"นายวิเชียร เลาหบุตร","premium":"8,080.00","status":"New","createDate":"01/01/2557 08:00:00"}
			,{"no":"8","broker":"ASNKTC","policyType":"ประกันภัยชั้น 3","appNo":"OAKTCKPI002490004","policyNo":"","coverDate":"01/01/2557-01/01/2558","assured":"นายพงศกร แก้วเก้า","counselor":"นายวิเชียร เลาหบุตร","premium":"3,000.00","status":"Payment Awaiting","createDate":"01/01/2557 08:00:00"}
			,{"no":"9","broker":"ASNKTC","policyType":"อุ่นใจ1","appNo":"OAKTCKPI002490005","policyNo":"","coverDate":"01/01/2557-01/01/2558","assured":"นายศักดิ์ชัย อำนายศิลป์","counselor":"นายวิเชียร เลาหบุตร","premium":"12,000.00","status":"Payment Awaiting","createDate":"01/01/2557 08:00:00"}
			,{"no":"10","broker":"ASNKTC","policyType":"อุ่้นใจ2","appNo":"OAKTCKPI002490006","policyNo":"","coverDate":"01/01/2557-01/01/2558","assured":"นายกวี อำนวยศิลป์","counselor":"นายวิเชียร เลาหบุตร","premium":"12,000.00","status":"Complete","createDate":"01/01/2557 08:00:00"}*/];
			
			$scope.requestList = data;
			
			$rootScope.paging.totalItems = $scope.requestList.length;
			$rootScope.paging.showing = _.getShowing($rootScope.paging.pageNumber, $rootScope.paging.limit, $scope.requestList.length);
			//});
		};		
		$scope.searchRequest();
		
		$scope.selectPage = function(page) {
			$rootScope.paging.pageNumber = page;
			$scope.search();
		};
		
		$scope.gotoEdit = function(id) {
			$location.path('request-detail/'+id);
		};
		
	}, 0);
};

function RequestDetailCtrl($rootScope, $scope, $http, $compile, $timeout, $filter, $location,$routeParams,$log) {
	
	$timeout(function() {
		
		$scope.policyTypeList = [
		                  		 {"id":"001", "name":"พ.ร.บ."}
		                  		,{"id":"002", "name":"ประกันภัยชั้น 1"}
		                  		,{"id":"003", "name":"ประกันภัยชั้น 2"}
		                  	];
		
		$scope.isSubmit = false;//Submit flag
		
		//Call back-end by storeId
		//$http.get(_.toHttpGetUrl('rest/errormsg/getErrorMessage/'+$routeParams.id)).success(function(data) {
			$scope.requestList = [{"no":"1","broker":"TISCO","policyType":"001","appNo":"OTISCKPI002490001","requestNo":"57/1001","coverDateF":"01/01/57","coverDateT":"01/01/58","assured":"นายวิโรจน์ ชูวงศ์","counselor":"นายวิเชียร เลาหบุตร","premium":"1,074.28","status":"Waiting Confirm","requestDate":"01/01/2557","createDate":"01/01/2557 08:00:00","carType":"รถยนต์นั่งโดยสารเกิน 7 คน","usageType":"ใช้ส่วนบุคคล ไม่ใช่รับจ้างหรือให้เช่า","capacity":"1600 CC","carNo":"1กว 9999","province":"กรุงเทพมหานคร","year":"2014","brand":"TOYOTA","model":"COROLLA","color":"ขาว","chassisNo":"JSDFJOI329DSFOFE","engineNo":"DFLKSJDFOSID39"}
			,{"no":"2","broker":"TISCO","policyType":"001","appNo":"OTISCKPI002490002","requestNo":"57/1002","coverDateF":"01/01/2557","coverDateT":"01/01/2558","assured":"นายพงษ์เทพ ธรรมโสพน","counselor":"นายวิเชียร เลาหบุตร","premium":"757.21","status":"Complete","createDate":"01/01/2557 08:00:00","carType":"รถยนต์นั่งโดยสารเกิน 7 คน","usageType":"ใช้ส่วนบุคคล ไม่ใช่รับจ้างหรือให้เช่า","capacity":"1600 CC","carNo":"1กว 9999","province":"กรุงเทพมหานคร","year":"2014","brand":"TOYOTA","model":"COROLLA","color":"ขาว","chassisNo":"JSDFJOI329DSFOFE","engineNo":"DFLKSJDFOSID39"}
			,{"no":"3","broker":"ASN","policyType":"001","appNo":"OBASNKPI002490001","requestNo":"57/1003","coverDateF":"01/01/57","coverDateT":"01/01/58","assured":"นายวรวัฒน์ สอนจันทร์","counselor":"นายวิเชียร เลาหบุตร","premium":"757.21","status":"Waiting Confirm","requestDate":"01/01/2557","createDate":"01/01/2557 08:00:00","carType":"รถยนต์นั่งโดยสารเกิน 7 คน","usageType":"ใช้ส่วนบุคคล ไม่ใช่รับจ้างหรือให้เช่า","capacity":"1600 CC","carNo":"1กว 9999","province":"กรุงเทพมหานคร","year":"2014","brand":"TOYOTA","model":"COROLLA","color":"ขาว","chassisNo":"JSDFJOI329DSFOFE","engineNo":"DFLKSJDFOSID39"}
			,{"no":"4","broker":"ASN","policyType":"001","appNo":"OBASNKPI002490002","requestNo":"57/1004","coverDateF":"01/01/57","coverDateT":"01/01/58","assured":"นายวิชัย ศรีบุรินทร์","counselor":"นายวิเชียร เลาหบุตร","premium":"757.21","status":"Waiting Confirm","requestDate":"01/01/2557","createDate":"01/01/2557 08:00:00","carType":"รถยนต์นั่งโดยสารเกิน 7 คน","usageType":"ใช้ส่วนบุคคล ไม่ใช่รับจ้างหรือให้เช่า","capacity":"1600 CC","carNo":"1กว 9999","province":"กรุงเทพมหานคร","year":"2014","brand":"TOYOTA","model":"COROLLA","color":"ขาว","chassisNo":"JSDFJOI329DSFOFE","engineNo":"DFLKSJDFOSID39"}
			,{"no":"5","broker":"ASN","policyType":"001","appNo":"OBASNKPI002490003","requestNo":"57/1005","coverDateF":"01/01/57","coverDateT":"01/01/58","assured":"นายสงคราม อาจสมบาล","counselor":"นายวิเชียร เลาหบุตร","premium":"757.21","status":"Waiting Confirm","requestDate":"01/01/2557","createDate":"01/01/2557 08:00:00","carType":"รถยนต์นั่งโดยสารเกิน 7 คน","usageType":"ใช้ส่วนบุคคล ไม่ใช่รับจ้างหรือให้เช่า","capacity":"1600 CC","carNo":"1กว 9999","province":"กรุงเทพมหานคร","year":"2014","brand":"TOYOTA","model":"COROLLA","color":"ขาว","chassisNo":"JSDFJOI329DSFOFE","engineNo":"DFLKSJDFOSID39"}
			,{"no":"6","broker":"ASNKTC","policyType":"002","appNo":"OAKTCKPI002490001","requestNo":"57/1006","coverDateF":"01/01/57","coverDateT":"01/01/58","assured":"นางจุรีรัตน์ ศรีจันทร์","counselor":"นายวิเชียร เลาหบุตร","premium":"18,900.00","status":"Waiting Confirm","requestDate":"01/01/2557","createDate":"01/01/2557 08:00:00","carType":"รถยนต์นั่งโดยสารเกิน 7 คน","usageType":"ใช้ส่วนบุคคล ไม่ใช่รับจ้างหรือให้เช่า","capacity":"1600 CC","carNo":"1กว 9999","province":"กรุงเทพมหานคร","year":"2014","brand":"TOYOTA","model":"COROLLA","color":"ขาว","chassisNo":"JSDFJOI329DSFOFE","engineNo":"DFLKSJDFOSID39"}];
			//});
			
		$scope.request = _.findWhere($scope.requestList, {'appNo': $routeParams.id +''});

		//Update ErrorMsg
		$scope.updateErrorMsg  = function() {
			$scope.isSubmit = true;
			//validate form
			if ($scope.editForm.$invalid) {
				$scope.app.addAlert('gritter-error', 'Incorrect data', 4000);
				return;
			}
			
			//Call back-end
			_.compactObject($scope.errormsg);
			var url = "rest/errormsg/updateErrorMsg";
			//alert();
			$scope.errormsg.modifiedBy = $scope.app.user.empCode; 
			$http.post(url, $scope.errormsg).success(function(data) {
				$scope.app.addAlert('gritter-success', 'Update Success', 4000);
				$scope.back();
			});
		};
			
		$scope.back = function() {
			$location.path('/request-list');
		};
		
		$('input[type="checkbox"].minimal, input[type="radio"].minimal').iCheck({
            checkboxClass: 'icheckbox_minimal',
            radioClass: 'iradio_minimal'
        });
	
	}, 0);	
};

