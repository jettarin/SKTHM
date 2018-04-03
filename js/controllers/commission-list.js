angular.module('myApp').config([ '$routeProvider', function($routeProvider) {
	$routeProvider.when("/commission-list", {templateUrl: _.toHttpGetUrl("content/commission/commission-display-list.html"), controller: CommDisplayListCtrl });
} ]);

function CommDisplayListCtrl($rootScope, $scope, $http, $compile, $filter, $timeout, $routeParams, $location, $log) {
	$log.info('Enter InterfaceProListCtrl');
	
	$timeout(function() {
		
		$rootScope.criteria.dateFrom = _.toDateStr(moment()); //set default date form
		$rootScope.criteria.dateTo = _.toDateStr(moment()); //set default date to
		
		$scope.profileList = [
      		 {"id":"1", "name":"Manual Import File"}
      		,{"id":"2", "name":"Import from E-Mail"}
      		,{"id":"3", "name":"Scheduler"}
      	];
		
		$scope.interfaceList = [
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

		$scope.gotoDetail = function(item) {
			$location.path('parameter-setup-new-store-setup-detail/'+ item.id);
		};
		
		$scope.dataList = [
            {"id":"0001", "bu":"Hyper", "newStore":"11219:suphanburi", "dateForm":"01/01/2014", "dateTo":"05/01/2014", "storeModelList":[{"division":"Hard Line", "store":"11101:à¸ªà¸²à¸‚à¸²à¸§à¸‡à¸¨à¹Œà¸ªà¸§à¹ˆà¸²à¸‡", "percent":"100.00"}, {"division":"Home Line", "store":"11101:à¸ªà¸²à¸‚à¸²à¸§à¸‡à¸¨à¹Œà¸ªà¸§à¹ˆà¸²à¸‡", "percent":"100.00"}, {"division":"Dry Food", "store":"11101:à¸ªà¸²à¸‚à¸²à¸§à¸‡à¸¨à¹Œà¸ªà¸§à¹ˆà¸²à¸‡", "percent":"100.00"}, {"division":"Soft Line", "store":"11101:à¸ªà¸²à¸‚à¸²à¸§à¸‡à¸¨à¹Œà¸ªà¸§à¹ˆà¸²à¸‡", "percent":"100.00"}] }
           ,{"id":"0002", "bu":"Hyper", "newStore":"11027:kalasin", "dateForm":"01/01/2014", "dateTo":"05/01/2014", "storeModelList":[{"division":"Hard Line", "store":"11102:à¸ªà¸²à¸‚à¸²à¹�à¸ˆà¹‰à¸‡à¸§à¸±à¸’à¸™à¸°", "percent":"100.00"}, {"division":"Home Line", "store":"11103:à¸ªà¸²à¸‚à¸²à¸£à¸²à¸©à¸�à¸£à¹Œà¸šà¸¹à¸£à¸“à¸°", "percent":"100.00"}, {"division":"Dry Food", "store":"11101:à¸ªà¸²à¸‚à¸²à¸§à¸‡à¸¨à¹Œà¸ªà¸§à¹ˆà¸²à¸‡", "percent":"100.00"}, {"division":"Soft Line", "store":"11104:à¸ªà¸²à¸‚à¸²à¸žà¸±à¸—à¸¢à¸²", "percent":"100.00"}] }
        ];
		
		$scope.clear = function(){
			$rootScope.criteria = {};
		};
		
		$scope.searchInterProfile = function(){		
			//var url = _.toHttpGetUrl('api/user/findUser', $rootScope.criteria);
			//$http.get(url).success(function(data){
			var data = [{"no":"1","interfaceType":"YES File","profile":"BK001_CMIYESFILE","broker":"BK001:TISCO","fileName":"YESFILE_20140501.txt","status":"Active","product":"","project":"","branch":"Bangkok","policyType":"New","importDate":"01/01/2557 08:00:00"}
			,{"no":"2","interfaceType":"YES File","profile":"BK001_VMIYESFILE","broker":"BK001:TISCO","fileName":"YESFILE_20140502.txt","status":"Active","product":"","project":"","branch":"Bangkok","policyType":"New","importDate":"01/01/2557 08:00:00"}
			,{"no":"3","interfaceType":"YES File","profile":"BK001_PA01YESFILE","broker":"BK001:TISCO","fileName":"YESFILE_20140503.txt","status":"Active","product":"","project":"","branch":"Bangkok","policyType":"New","importDate":"01/01/2557 08:00:00"}
			,{"no":"4","interfaceType":"CMI Endorsement","profile":"BK001_CMIEndorse","broker":"BK001:TISCO","fileName":"CMIEndorse_20140501.txt","status":"Active","product":"","project":"","branch":"Bangkok","policyType":"New","importDate":"01/01/2557 08:00:00"}
			,{"no":"5","interfaceType":"CMI Endorsement","profile":"BK001_CMIEndorse","broker":"BK001:TISCO","fileName":"CMIEndorse_20140502.txt","status":"Active","product":"","project":"","branch":"Bangkok","policyType":"New","importDate":"01/01/2557 08:00:00"}
			,{"no":"6","interfaceType":"CMI Endorsement","profile":"BK001_CMIEndorse","broker":"BK001:TISCO","fileName":"CMIEndorse_20140503.txt","status":"Inactive","product":"","project":"","branch":"Bangkok","policyType":"New","importDate":"01/01/2557 08:00:00"}
			,{"no":"7","interfaceType":"VMI Endorsement","profile":"BK001_VMIEndorse","broker":"BK001:TISCO","fileName":"VMIEndorse_20140501.txt","status":"Active","product":"","project":"","branch":"Bangkok","policyType":"New","importDate":"01/01/2557 08:00:00"}
			,{"no":"8","interfaceType":"VMI Endorsement","profile":"BK001_VMIEndorse","broker":"BK001:TISCO","fileName":"VMIEndorse_20140502.txt","status":"Active","product":"","project":"","branch":"Bangkok","policyType":"New","importDate":"01/01/2557 08:00:00"}
			,{"no":"9","interfaceType":"CMI Cancel","profile":"BK001_CMICancel","broker":"BK001:TISCO","fileName":"CMICancel_20140501.txt","status":"Inactive","product":"","project":"","branch":"Bangkok","policyType":"New","importDate":"01/01/2557 08:00:00"}
			,{"no":"10","interfaceType":"CMI Cancel","profile":"BK001_CMICancel","broker":"BK001:TISCO","fileName":"CMICancel_20140502.txt","status":"Active","product":"","project":"","branch":"Bangkok","policyType":"New","importDate":"01/01/2557 08:00:00"}
			,{"no":"11","interfaceType":"VMI Cancel","profile":"BK001_VMICancel","broker":"BK001:TISCO","fileName":"VMICancel_20140503.txt","status":"Active","product":"","project":"","branch":"Bangkok","policyType":"New","importDate":"01/01/2557 08:00:00"}];
			
				var tbody = "";
				_.each(data, function(interLog, index){
					
					tbody += '<tr>';
					tbody += '<td>'+interLog.no+'</td>';
					tbody += '<td>'+interLog.interfaceType+'</td>';
					tbody += '<td>'+interLog.project+'</td>';
					tbody += '<td>'+interLog.product+'</td>';
					tbody += '<td>'+interLog.broker+'</td>';
					tbody += '<td>'+interLog.branch+'</td>';
					tbody += '<td>'+interLog.policyType+'</td>';
					tbody += '<td>'+interLog.fileName+'</td>';
					tbody += '<td>'+interLog.importDate+'</td>';
					tbody += '<td>'+interLog.status+'</td>';
					tbody += '</tr>';
				});
			
				$("#interLog_table").dataTable().fnClearTable();
				$('#interLog_table_tbody').append($compile(tbody)($scope));
				$("#interLog_table").dataTable({
					"bDestroy": true,
			        "oLanguage": $rootScope.app.oLanguage(),
					"sDom": "t<'row-fluid'<'span4'lf><'span4'i><'span4'p>>",
					"aoColumns": [
					    { "sWidth": "5px", "sClass": "text-center" , "bSortable": false },
					    { "sWidth": "100px", "sClass": "text-left"},
					    { "sWidth": "80px", "sClass": "text-left"},
						{ "sWidth": "80px", "sClass": "text-left" },
						{ "sWidth": "100px", "sClass": "text-left" },
						{ "sWidth": "100px", "sClass": "text-left" },
						{ "sWidth": "100px", "sClass": "text-left" },
						{ "sWidth": "120px", "sClass": "text-left" },
						{ "sWidth": "100px", "sClass": "text-left" },
						{ "sWidth": "50px", "sClass": "text-center" , "bSortable": false}
			        ]
				});
				$('.dt_actions').html($compile($('.dt_app_actions').html())($scope));
			//});
		};		
		$scope.searchInterProfile();
		
	}, 0);
};
