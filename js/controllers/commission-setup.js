angular.module('myApp').config([ '$routeProvider', function($routeProvider) {
	$routeProvider.when("/commission-setup-list", {templateUrl: _.toHttpGetUrl("content/commission/commission-setup-list.html"), controller: ProjectListCtrl });
	$routeProvider.when("/commission-setup-detail", {templateUrl: _.toHttpGetUrl("content/commission/commission-setup-detail.html"), controller: CommSetupDetailCtrl });
	$routeProvider.when("/commission-setup-detail/:id", {templateUrl: _.toHttpGetUrl("content/commission/commission-setup-detail.html"), controller: CommSetupDetailCtrl });
} ]);

function ProjectListCtrl($rootScope, $scope, $http, $compile, $filter, $timeout, $routeParams, $location, $log) {
	$log.info('Enter CommSetupListCtrl');
	
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
            {"id":"0001", "bu":"Hyper", "newStore":"11219:suphanburi", "dateForm":"01/01/2014", "dateTo":"05/01/2014", "storeModelList":[{"division":"Hard Line", "store":"11101:Ã Â¸ÂªÃ Â¸Â²Ã Â¸â€šÃ Â¸Â²Ã Â¸Â§Ã Â¸â€¡Ã Â¸Â¨Ã Â¹Å’Ã Â¸ÂªÃ Â¸Â§Ã Â¹Ë†Ã Â¸Â²Ã Â¸â€¡", "percent":"100.00"}, {"division":"Home Line", "store":"11101:Ã Â¸ÂªÃ Â¸Â²Ã Â¸â€šÃ Â¸Â²Ã Â¸Â§Ã Â¸â€¡Ã Â¸Â¨Ã Â¹Å’Ã Â¸ÂªÃ Â¸Â§Ã Â¹Ë†Ã Â¸Â²Ã Â¸â€¡", "percent":"100.00"}, {"division":"Dry Food", "store":"11101:Ã Â¸ÂªÃ Â¸Â²Ã Â¸â€šÃ Â¸Â²Ã Â¸Â§Ã Â¸â€¡Ã Â¸Â¨Ã Â¹Å’Ã Â¸ÂªÃ Â¸Â§Ã Â¹Ë†Ã Â¸Â²Ã Â¸â€¡", "percent":"100.00"}, {"division":"Soft Line", "store":"11101:Ã Â¸ÂªÃ Â¸Â²Ã Â¸â€šÃ Â¸Â²Ã Â¸Â§Ã Â¸â€¡Ã Â¸Â¨Ã Â¹Å’Ã Â¸ÂªÃ Â¸Â§Ã Â¹Ë†Ã Â¸Â²Ã Â¸â€¡", "percent":"100.00"}] }
           ,{"id":"0002", "bu":"Hyper", "newStore":"11027:kalasin", "dateForm":"01/01/2014", "dateTo":"05/01/2014", "storeModelList":[{"division":"Hard Line", "store":"11102:Ã Â¸ÂªÃ Â¸Â²Ã Â¸â€šÃ Â¸Â²Ã Â¹ï¿½Ã Â¸Ë†Ã Â¹â€°Ã Â¸â€¡Ã Â¸Â§Ã Â¸Â±Ã Â¸â€™Ã Â¸â„¢Ã Â¸Â°", "percent":"100.00"}, {"division":"Home Line", "store":"11103:Ã Â¸ÂªÃ Â¸Â²Ã Â¸â€šÃ Â¸Â²Ã Â¸Â£Ã Â¸Â²Ã Â¸Â©Ã Â¸ï¿½Ã Â¸Â£Ã Â¹Å’Ã Â¸Å¡Ã Â¸Â¹Ã Â¸Â£Ã Â¸â€œÃ Â¸Â°", "percent":"100.00"}, {"division":"Dry Food", "store":"11101:Ã Â¸ÂªÃ Â¸Â²Ã Â¸â€šÃ Â¸Â²Ã Â¸Â§Ã Â¸â€¡Ã Â¸Â¨Ã Â¹Å’Ã Â¸ÂªÃ Â¸Â§Ã Â¹Ë†Ã Â¸Â²Ã Â¸â€¡", "percent":"100.00"}, {"division":"Soft Line", "store":"11104:Ã Â¸ÂªÃ Â¸Â²Ã Â¸â€šÃ Â¸Â²Ã Â¸Å¾Ã Â¸Â±Ã Â¸â€”Ã Â¸Â¢Ã Â¸Â²", "percent":"100.00"}] }
        ];
		
		$scope.clear = function(){
			$rootScope.criteria = {};
		};
		
		$scope.searchInterProfile = function(){		
			//var url = _.toHttpGetUrl('api/user/findUser', $rootScope.criteria);
			//$http.get(url).success(function(data){
			var data = [{"commNo":"001","project":"พ.ร.บ.","commType":"Legal Commission","rateType":"Percentage","effectiveDate":"01/01/2557","expireDate":"01/01/2558"}
			,{"commNo":"002","project":"ภาคสมัครใจชั้น 1","commType":"Incentive","rateType":"Fix Amount","effectiveDate":"01/01/2557","expireDate":"01/01/2558"}
			,{"commNo":"003","project":"ภาคสมัครใจชั้น 2","commType":"Incentive","rateType":"Fix Amount","effectiveDate":"01/01/2557","expireDate":"01/01/2558"}
			,{"commNo":"004","project":"ภาคสมัครใจชั้น 2+","commType":"Legal Commission","rateType":"Percentage","effectiveDate":"01/01/2557","expireDate":"01/01/2558"}
			,{"commNo":"005","project":"ภาคสมัครใจชั้น 3","commType":"Legal Commission","rateType":"Percentage","effectiveDate":"01/01/2557","expireDate":"01/01/2558"}
			,{"commNo":"006","project":"ภาคสมัครใจชั้น 3+","commType":"Legal Commission","rateType":"Percentage","effectiveDate":"01/01/2557","expireDate":"01/01/2558"}
			,{"commNo":"007","project":"อุ่นใจ 1","commType":"Legal Commission","rateType":"Percentage","effectiveDate":"01/01/2557","expireDate":"01/01/2558"}
			,{"commNo":"008","project":"อุ่นใจ 2","commType":"Legal Commission","rateType":"Percentage","effectiveDate":"01/01/2557","expireDate":"01/01/2558"}];
			
				var tbody = "";
				_.each(data, function(commission, index){
					
					tbody += '<tr>';
					tbody += '<td>'+(index+1)+'</td>';
					tbody += '<td>'+commission.project+'</td>';
					tbody += '<td>'+commission.commType+'</td>';
					tbody += '<td>'+commission.rateType+'</td>';
					tbody += '<td>'+commission.effectiveDate+'</td>';
					tbody += '<td>'+commission.expireDate+'</td>';
					tbody += '<td class="action">';
					tbody += '	<a title="'+$scope.app.lang.convert("Edit")+'" href="#/commission-setup-detail/'+commission.commNo+'"><i class="icon-edit"></i></a>';
					tbody += '</td>';
					tbody += '</tr>';
				});
			
				$("#commission_table").dataTable().fnClearTable();
				$('#commission_table_tbody').append($compile(tbody)($scope));
				$("#commission_table").dataTable({
					"bDestroy": true,
			        "oLanguage": $rootScope.app.oLanguage(),
					"sDom": "t<'row-fluid'<'span4'lf><'span4'i><'span4'p>>",
					"aoColumns": [
					    { "sWidth": "5px", "sClass": "text-center" , "bSortable": false },
					    { "sWidth": "100px", "sClass": "text-left"},
					    { "sWidth": "100px", "sClass": "text-left"},
						{ "sWidth": "100px", "sClass": "text-left" },
						{ "sWidth": "100px", "sClass": "text-center" },
						{ "sWidth": "100px", "sClass": "text-center" },
						{ "sWidth": "30px", "sClass": "text-center" , "bSortable": false}
			        ]
				});
				$('.dt_actions').html($compile($('.dt_app_actions').html())($scope));
			//});
		};		
		$scope.searchInterProfile();
		
	}, 0);
};

function CommSetupDetailCtrl($rootScope, $scope, $http, $compile, $filter, $timeout, $routeParams, $location, $log) {
	$log.info('Enter CommSetupListCtrl');
	
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
            {"id":"0001", "bu":"Hyper", "newStore":"11219:suphanburi", "dateForm":"01/01/2014", "dateTo":"05/01/2014", "storeModelList":[{"division":"Hard Line", "store":"11101:Ã Â¸ÂªÃ Â¸Â²Ã Â¸â€šÃ Â¸Â²Ã Â¸Â§Ã Â¸â€¡Ã Â¸Â¨Ã Â¹Å’Ã Â¸ÂªÃ Â¸Â§Ã Â¹Ë†Ã Â¸Â²Ã Â¸â€¡", "percent":"100.00"}, {"division":"Home Line", "store":"11101:Ã Â¸ÂªÃ Â¸Â²Ã Â¸â€šÃ Â¸Â²Ã Â¸Â§Ã Â¸â€¡Ã Â¸Â¨Ã Â¹Å’Ã Â¸ÂªÃ Â¸Â§Ã Â¹Ë†Ã Â¸Â²Ã Â¸â€¡", "percent":"100.00"}, {"division":"Dry Food", "store":"11101:Ã Â¸ÂªÃ Â¸Â²Ã Â¸â€šÃ Â¸Â²Ã Â¸Â§Ã Â¸â€¡Ã Â¸Â¨Ã Â¹Å’Ã Â¸ÂªÃ Â¸Â§Ã Â¹Ë†Ã Â¸Â²Ã Â¸â€¡", "percent":"100.00"}, {"division":"Soft Line", "store":"11101:Ã Â¸ÂªÃ Â¸Â²Ã Â¸â€šÃ Â¸Â²Ã Â¸Â§Ã Â¸â€¡Ã Â¸Â¨Ã Â¹Å’Ã Â¸ÂªÃ Â¸Â§Ã Â¹Ë†Ã Â¸Â²Ã Â¸â€¡", "percent":"100.00"}] }
           ,{"id":"0002", "bu":"Hyper", "newStore":"11027:kalasin", "dateForm":"01/01/2014", "dateTo":"05/01/2014", "storeModelList":[{"division":"Hard Line", "store":"11102:Ã Â¸ÂªÃ Â¸Â²Ã Â¸â€šÃ Â¸Â²Ã Â¹ï¿½Ã Â¸Ë†Ã Â¹â€°Ã Â¸â€¡Ã Â¸Â§Ã Â¸Â±Ã Â¸â€™Ã Â¸â„¢Ã Â¸Â°", "percent":"100.00"}, {"division":"Home Line", "store":"11103:Ã Â¸ÂªÃ Â¸Â²Ã Â¸â€šÃ Â¸Â²Ã Â¸Â£Ã Â¸Â²Ã Â¸Â©Ã Â¸ï¿½Ã Â¸Â£Ã Â¹Å’Ã Â¸Å¡Ã Â¸Â¹Ã Â¸Â£Ã Â¸â€œÃ Â¸Â°", "percent":"100.00"}, {"division":"Dry Food", "store":"11101:Ã Â¸ÂªÃ Â¸Â²Ã Â¸â€šÃ Â¸Â²Ã Â¸Â§Ã Â¸â€¡Ã Â¸Â¨Ã Â¹Å’Ã Â¸ÂªÃ Â¸Â§Ã Â¹Ë†Ã Â¸Â²Ã Â¸â€¡", "percent":"100.00"}, {"division":"Soft Line", "store":"11104:Ã Â¸ÂªÃ Â¸Â²Ã Â¸â€šÃ Â¸Â²Ã Â¸Å¾Ã Â¸Â±Ã Â¸â€”Ã Â¸Â¢Ã Â¸Â²", "percent":"100.00"}] }
        ];
		
		$scope.clear = function(){
			$rootScope.criteria = {};
		};
		
		$scope.searchInterProfile = function(){		
			//var url = _.toHttpGetUrl('api/user/findUser', $rootScope.criteria);
			//$http.get(url).success(function(data){
			var data = [{"commNo":"001","project":"พ.ร.บ.","commType":"Legal Commission","rateType":"Percentage","effectiveDate":"01/01/2557","expireDate":"01/01/2558","status":"Active"}
			,{"commNo":"002","project":"ภาคสมัครใจชั้น 1","commType":"Incentive","rateType":"Fix Amount","effectiveDate":"01/01/2557","expireDate":"01/01/2558","status":"Active"}
			,{"commNo":"003","project":"ภาคสมัครใจชั้น 2","commType":"Incentive","rateType":"Fix Amount","effectiveDate":"01/01/2557","expireDate":"01/01/2558","status":"Active"}
			,{"commNo":"004","project":"ภาคสมัครใจชั้น 2+","commType":"Legal Commission","rateType":"Percentage","effectiveDate":"01/01/2557","expireDate":"01/01/2558","status":"Active"}
			,{"commNo":"005","project":"ภาคสมัครใจชั้น 3","commType":"Legal Commission","rateType":"Percentage","effectiveDate":"01/01/2557","expireDate":"01/01/2558","status":"Active"}
			,{"commNo":"006","project":"ภาคสมัครใจชั้น 3+","commType":"Legal Commission","rateType":"Percentage","effectiveDate":"01/01/2557","expireDate":"01/01/2558","status":"Active"}
			,{"commNo":"007","project":"อุ่นใจ 1","commType":"Legal Commission","rateType":"Percentage","effectiveDate":"01/01/2557","expireDate":"01/01/2558","status":"Active"}
			,{"commNo":"008","project":"อุ่นใจ 2","commType":"Legal Commission","rateType":"Percentage","effectiveDate":"01/01/2557","expireDate":"01/01/2558","status":"Active"}];
			
				var tbody = "";
				_.each(data, function(commission, index){
					
					tbody += '<tr>';
					tbody += '<td><input type="checkbox" ng-checked="chk" value="'+commission.commNo+'"><span class="lbl"></span></td>';
					tbody += '<td>'+(index+1)+'</td>';
					tbody += '<td>'+commission.commType+'</td>';
					tbody += '<td>'+commission.rateType+'</td>';
					tbody += '<td>'+commission.effectiveDate+'</td>';
					tbody += '<td>'+commission.expireDate+'</td>';
					tbody += '<td>'+commission.status+'</td>';
					tbody += '<td class="action">';
					tbody += '<i class="icon-edit" style="margin-right: 5px;" ng-click="changeTab('+"'detail'"+')"></i>';
//					tbody += '	<a title="'+$scope.app.lang.convert("Edit")+'" target="_self" href="#/commission-setup-detail/" ng-click="ddd('+commission.commNo+')"><i class="icon-edit"></i></a>';
					tbody += '</td>';
					tbody += '</tr>';
				});
			
				$("#commission_table").dataTable().fnClearTable();
				$('#commission_table_tbody').append($compile(tbody)($scope));
				$("#commission_table").dataTable({
					"bDestroy": true,
			        "oLanguage": $rootScope.app.oLanguage(),
					"sDom": "t<'row-fluid'<'span4'lf><'span4'i><'span4'p>>",
					"aoColumns": [
					    { "sWidth": "5px", "sClass": "text-center" , "bSortable": false },
					    { "sWidth": "5px", "sClass": "text-center" , "bSortable": false },
					    { "sWidth": "100px", "sClass": "text-left"},
					    { "sWidth": "100px", "sClass": "text-left"},
						{ "sWidth": "100px", "sClass": "text-center" },
						{ "sWidth": "100px", "sClass": "text-center" },
						{ "sWidth": "80px", "sClass": "text-left" },
						{ "sWidth": "30px", "sClass": "text-center" , "bSortable": false}
			        ]
				});
				$('.dt_actions').html($compile($('.dt_app_actions').html())($scope));
			//});
		};		
		$scope.searchInterProfile();
		
		
		$scope.changeTab = function(activeTab){
			
			if(activeTab == "detail"){
				//#### inactive
				$('#listTab').removeClass('active');
				$('#listTab').addClass('disabled disabledTab');
				$('#commissionListTab').removeClass('active');
				$('#projectTab').removeClass('cursor');
				$('#projectTab').addClass('disabled disabledTab');
				 
				//#### new active
				$('#detailTab').removeClass('disabled disabledTab');
				$('#detailTab').addClass('active');
				$('#commissionDetailTab').addClass('active');
			}
			else{
				//#### inactive
				$('#detailTab').addClass('disabled disabledTab');
				$('#detailTab').removeClass('active');
				$('#commissionDetailTab').removeClass('active');
				
				//#### active
				$('#listTab').addClass('active');
				$('#listTab').removeClass('disabled disabledTab');
				$('#commissionListTab').addClass('active');
				$('#projectTab').addClass('cursor');
				$('#projectTab').removeClass('disabled disabledTab');
			}
			
		};
		
		$scope.listSourceOfBu = function(){		
			//var url = _.toHttpGetUrl('api/user/findUser', $rootScope.criteria);
			//$http.get(url).success(function(data){
			var data = [{"commNo":"001","project":"พ.ร.บ.","commType":"Legal Commission","rateType":"Percentage","effectiveDate":"01/01/2557","expireDate":"01/01/2558","status":"Active"}
			,{"commNo":"002","project":"ภาคสมัครใจชั้น 1","commType":"Incentive","rateType":"Fix Amount","effectiveDate":"01/01/2557","expireDate":"01/01/2558","status":"Active"}
			,{"commNo":"003","project":"ภาคสมัครใจชั้น 2","commType":"Incentive","rateType":"Fix Amount","effectiveDate":"01/01/2557","expireDate":"01/01/2558","status":"Active"}
			,{"commNo":"004","project":"ภาคสมัครใจชั้น 2+","commType":"Legal Commission","rateType":"Percentage","effectiveDate":"01/01/2557","expireDate":"01/01/2558","status":"Active"}
			,{"commNo":"005","project":"ภาคสมัครใจชั้น 3","commType":"Legal Commission","rateType":"Percentage","effectiveDate":"01/01/2557","expireDate":"01/01/2558","status":"Active"}
			,{"commNo":"006","project":"ภาคสมัครใจชั้น 3+","commType":"Legal Commission","rateType":"Percentage","effectiveDate":"01/01/2557","expireDate":"01/01/2558","status":"Active"}
			,{"commNo":"007","project":"อุ่นใจ 1","commType":"Legal Commission","rateType":"Percentage","effectiveDate":"01/01/2557","expireDate":"01/01/2558","status":"Active"}
			,{"commNo":"008","project":"อุ่นใจ 2","commType":"Legal Commission","rateType":"Percentage","effectiveDate":"01/01/2557","expireDate":"01/01/2558","status":"Active"}];
			
				var tbody = "";
				_.each(data, function(commission, index){
					
					tbody += '<tr>';
					tbody += '<td>'+(index+1)+'</td>';
					tbody += '<td>'+commission.commType+'</td>';
					tbody += '<td><input type="text" class="span12" ng-model="input.rate'+index+'" ></td>';
					tbody += '<td>%</td>';
					tbody += '</tr>';
				});
			
				$("#rateofsource_table").dataTable().fnClearTable();
				$('#rateofsource_table_tbody').append($compile(tbody)($scope));
				$("#rateofsource_table").dataTable({
					"bDestroy": true,
			        "oLanguage": $rootScope.app.oLanguage(),
					"sDom": "t<'row-fluid'<'span4'lf><'span4'i><'span4'p>>",
					"aoColumns": [
					    { "sWidth": "5px", "sClass": "text-center" , "bSortable": false },
					    { "sWidth": "100px", "sClass": "text-left"},
						{ "sWidth": "100px", "sClass": "text-center" },
					    { "sWidth": "1px", "sClass": "text-center" , "bSortable": false }
			        ]
				});
				$('.dt_actions').html($compile($('.dt_app_actions').html())($scope));
			//});
		};		
		$scope.listSourceOfBu();
	}, 0);
};
