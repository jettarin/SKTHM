angular.module('myApp').config([ '$routeProvider', function($routeProvider) {
	$routeProvider.when("/admin-printing-setup", {templateUrl: _.toHttpGetUrl("content/admin/printing/admin-printing-setup.html"), controller: PrintingSetupListCtrl });
	$routeProvider.when("/admin-printing-setup-detail/:id", {templateUrl: _.toHttpGetUrl("content/admin/printing/admin-printing-setup-detail.html"), controller: PrintingSetupDetailCtrl });
	$routeProvider.when("/printer-setup/:id", {templateUrl: _.toHttpGetUrl("content/admin/printing/printer-setup.html"), controller: PrinterSetupListCtrl });
	$routeProvider.when("/document-setup/:id", {templateUrl: _.toHttpGetUrl("content/admin/printing/document-type-setup.html"), controller: DocumentTypeSetupListCtrl });
	$routeProvider.when("/document-setup-detail/:id", {templateUrl: _.toHttpGetUrl("content/admin/printing/document-type-setup-detail.html"), controller: DocumentTypeSetupDetailCtrl });
	$routeProvider.when("/documentname-setup/:id", {templateUrl: _.toHttpGetUrl("content/admin/printing/documentname-setup.html"), controller: DocumentNameSetupListCtrl });
} ]);

function PrintingSetupListCtrl($rootScope, $scope, $http, $compile, $filter, $timeout, $routeParams, $location, $log) {
	$log.info('Enter PrintingSetupListCtrl');
	
	$timeout(function() {
		
		$rootScope.criteria.dateFrom = _.toDateStr(moment()); //set default date form
		$rootScope.criteria.dateTo = _.toDateStr(moment()); //set default date to
				
		$scope.renewTypeList = [
			  {"id":"1" , "name":"New"}
			, {"id":"2" , "name":"Renew"}
		];
		
		$scope.dataList = [
            {"id":"0001", "bu":"Hyper", "newStore":"11219:suphanburi", "dateForm":"01/01/2014", "dateTo":"05/01/2014", "storeModelList":[{"division":"Hard Line", "store":"11101:ÃƒÂ Ã‚Â¸Ã‚ÂªÃƒÂ Ã‚Â¸Ã‚Â²ÃƒÂ Ã‚Â¸Ã¢â‚¬Å¡ÃƒÂ Ã‚Â¸Ã‚Â²ÃƒÂ Ã‚Â¸Ã‚Â§ÃƒÂ Ã‚Â¸Ã¢â‚¬Â¡ÃƒÂ Ã‚Â¸Ã‚Â¨ÃƒÂ Ã‚Â¹Ã…â€™ÃƒÂ Ã‚Â¸Ã‚ÂªÃƒÂ Ã‚Â¸Ã‚Â§ÃƒÂ Ã‚Â¹Ã‹â€ ÃƒÂ Ã‚Â¸Ã‚Â²ÃƒÂ Ã‚Â¸Ã¢â‚¬Â¡", "percent":"100.00"}, {"division":"Home Line", "store":"11101:ÃƒÂ Ã‚Â¸Ã‚ÂªÃƒÂ Ã‚Â¸Ã‚Â²ÃƒÂ Ã‚Â¸Ã¢â‚¬Å¡ÃƒÂ Ã‚Â¸Ã‚Â²ÃƒÂ Ã‚Â¸Ã‚Â§ÃƒÂ Ã‚Â¸Ã¢â‚¬Â¡ÃƒÂ Ã‚Â¸Ã‚Â¨ÃƒÂ Ã‚Â¹Ã…â€™ÃƒÂ Ã‚Â¸Ã‚ÂªÃƒÂ Ã‚Â¸Ã‚Â§ÃƒÂ Ã‚Â¹Ã‹â€ ÃƒÂ Ã‚Â¸Ã‚Â²ÃƒÂ Ã‚Â¸Ã¢â‚¬Â¡", "percent":"100.00"}, {"division":"Dry Food", "store":"11101:ÃƒÂ Ã‚Â¸Ã‚ÂªÃƒÂ Ã‚Â¸Ã‚Â²ÃƒÂ Ã‚Â¸Ã¢â‚¬Å¡ÃƒÂ Ã‚Â¸Ã‚Â²ÃƒÂ Ã‚Â¸Ã‚Â§ÃƒÂ Ã‚Â¸Ã¢â‚¬Â¡ÃƒÂ Ã‚Â¸Ã‚Â¨ÃƒÂ Ã‚Â¹Ã…â€™ÃƒÂ Ã‚Â¸Ã‚ÂªÃƒÂ Ã‚Â¸Ã‚Â§ÃƒÂ Ã‚Â¹Ã‹â€ ÃƒÂ Ã‚Â¸Ã‚Â²ÃƒÂ Ã‚Â¸Ã¢â‚¬Â¡", "percent":"100.00"}, {"division":"Soft Line", "store":"11101:ÃƒÂ Ã‚Â¸Ã‚ÂªÃƒÂ Ã‚Â¸Ã‚Â²ÃƒÂ Ã‚Â¸Ã¢â‚¬Å¡ÃƒÂ Ã‚Â¸Ã‚Â²ÃƒÂ Ã‚Â¸Ã‚Â§ÃƒÂ Ã‚Â¸Ã¢â‚¬Â¡ÃƒÂ Ã‚Â¸Ã‚Â¨ÃƒÂ Ã‚Â¹Ã…â€™ÃƒÂ Ã‚Â¸Ã‚ÂªÃƒÂ Ã‚Â¸Ã‚Â§ÃƒÂ Ã‚Â¹Ã‹â€ ÃƒÂ Ã‚Â¸Ã‚Â²ÃƒÂ Ã‚Â¸Ã¢â‚¬Â¡", "percent":"100.00"}] }
           ,{"id":"0002", "bu":"Hyper", "newStore":"11027:kalasin", "dateForm":"01/01/2014", "dateTo":"05/01/2014", "storeModelList":[{"division":"Hard Line", "store":"11102:ÃƒÂ Ã‚Â¸Ã‚ÂªÃƒÂ Ã‚Â¸Ã‚Â²ÃƒÂ Ã‚Â¸Ã¢â‚¬Å¡ÃƒÂ Ã‚Â¸Ã‚Â²ÃƒÂ Ã‚Â¹Ã¯Â¿Â½ÃƒÂ Ã‚Â¸Ã‹â€ ÃƒÂ Ã‚Â¹Ã¢â‚¬Â°ÃƒÂ Ã‚Â¸Ã¢â‚¬Â¡ÃƒÂ Ã‚Â¸Ã‚Â§ÃƒÂ Ã‚Â¸Ã‚Â±ÃƒÂ Ã‚Â¸Ã¢â‚¬â„¢ÃƒÂ Ã‚Â¸Ã¢â€žÂ¢ÃƒÂ Ã‚Â¸Ã‚Â°", "percent":"100.00"}, {"division":"Home Line", "store":"11103:ÃƒÂ Ã‚Â¸Ã‚ÂªÃƒÂ Ã‚Â¸Ã‚Â²ÃƒÂ Ã‚Â¸Ã¢â‚¬Å¡ÃƒÂ Ã‚Â¸Ã‚Â²ÃƒÂ Ã‚Â¸Ã‚Â£ÃƒÂ Ã‚Â¸Ã‚Â²ÃƒÂ Ã‚Â¸Ã‚Â©ÃƒÂ Ã‚Â¸Ã¯Â¿Â½ÃƒÂ Ã‚Â¸Ã‚Â£ÃƒÂ Ã‚Â¹Ã…â€™ÃƒÂ Ã‚Â¸Ã…Â¡ÃƒÂ Ã‚Â¸Ã‚Â¹ÃƒÂ Ã‚Â¸Ã‚Â£ÃƒÂ Ã‚Â¸Ã¢â‚¬Å“ÃƒÂ Ã‚Â¸Ã‚Â°", "percent":"100.00"}, {"division":"Dry Food", "store":"11101:ÃƒÂ Ã‚Â¸Ã‚ÂªÃƒÂ Ã‚Â¸Ã‚Â²ÃƒÂ Ã‚Â¸Ã¢â‚¬Å¡ÃƒÂ Ã‚Â¸Ã‚Â²ÃƒÂ Ã‚Â¸Ã‚Â§ÃƒÂ Ã‚Â¸Ã¢â‚¬Â¡ÃƒÂ Ã‚Â¸Ã‚Â¨ÃƒÂ Ã‚Â¹Ã…â€™ÃƒÂ Ã‚Â¸Ã‚ÂªÃƒÂ Ã‚Â¸Ã‚Â§ÃƒÂ Ã‚Â¹Ã‹â€ ÃƒÂ Ã‚Â¸Ã‚Â²ÃƒÂ Ã‚Â¸Ã¢â‚¬Â¡", "percent":"100.00"}, {"division":"Soft Line", "store":"11104:ÃƒÂ Ã‚Â¸Ã‚ÂªÃƒÂ Ã‚Â¸Ã‚Â²ÃƒÂ Ã‚Â¸Ã¢â‚¬Å¡ÃƒÂ Ã‚Â¸Ã‚Â²ÃƒÂ Ã‚Â¸Ã…Â¾ÃƒÂ Ã‚Â¸Ã‚Â±ÃƒÂ Ã‚Â¸Ã¢â‚¬â€�ÃƒÂ Ã‚Â¸Ã‚Â¢ÃƒÂ Ã‚Â¸Ã‚Â²", "percent":"100.00"}] }
        ];
		
		$scope.clear = function(){
			$rootScope.criteria = {};
		};
		
		$scope.searchPrinter = function(){		
			//var url = _.toHttpGetUrl('api/user/findUser', $rootScope.criteria);
			//$http.get(url).success(function(data){
			var data = [{"code":"PT001","svcname":"","desc":"","status":""}
					   ,{"code":"PT002","svcname":"","desc":"","status":""}
					   ,{"code":"PT003","svcname":"","desc":"","status":""}
					   ,{"code":"PT004","svcname":"","desc":"","status":""}
					   ,{"code":"PT005","svcname":"","desc":"","status":""}
					   ,{"code":"PT006","svcname":"","desc":"","status":""}];
			
				var tbody = "";
				_.each(data, function(printerList, index){
					tbody += '<tr>';
					tbody += '<td>'+(index+1)+'</td>';
					tbody += '<td>'+printerList.code+'</td>';
					tbody += '<td>'+printerList.svcname+'</td>';
					tbody += '<td>'+printerList.desc+'</td>';
					tbody += '<td>'+printerList.status+'</td>';
					tbody += '<td class="action">';
					tbody += '	<a title="'+$scope.app.lang.convert("Edit")+'" href="#/all-app-detail/'+appList.appNo+'"><i class="icon-eye-open"></i></a>';
					tbody += '</td>';
					tbody += '</tr>';
				});
			
				$("#printersetup_table").dataTable().fnClearTable();
				$('#printersetup_table_tbody').append($compile(tbody)($scope));
				$("#printersetup_table").dataTable({
					"bDestroy": true,
			        "oLanguage": $rootScope.app.oLanguage(),
					"sDom": "t<'row-fluid'<'span4'lf><'span4'i><'span4'p>>",
					"aoColumns": [
					    { "sWidth": "3px", "sClass": "text-center" , "bSortable": false },
					    { "sWidth": "60px", "sClass": "text-center"},
					    { "sWidth": "110px", "sClass": "text-left"},
						{ "sWidth": "150px", "sClass": "text-left" },
						{ "sWidth": "70px", "sClass": "text-left" },
						{ "sWidth": "30px", "sClass": "text-center" , "bSortable": false}
			        ]
				});
				$('.dt_actions').html($compile($('.dt_app_actions').html())($scope));
			//});
		};		
		$scope.searchPrinter();
		
	}, 0);
};

function PrintingSetupDetailCtrl($rootScope, $scope, $http, $compile, $filter, $timeout, $routeParams, $location, $log) {
	$log.info('Enter DocumentSetupListCtrl');

	
	$timeout(function() {
		
		$rootScope.criteria.dateFrom = _.toDateStr(moment()); //set default date form
		$rootScope.criteria.dateTo = _.toDateStr(moment()); //set default date to

		$scope.trayList = [
      		 {"id":"1","trayName":"tray1", "displayName":"Manual Feed"}
      		,{"id":"1","trayName":"tray2", "displayName":"Tray2-A4"}
      		,{"id":"1","trayName":"tray3", "displayName":"Tray3-Letter"}
      		,{"id":"1","trayName":"tray4", "displayName":"Tray4-A4 Logo"}
      	];
		
		$scope.printerList = [{"code":"PT001","svcname":"HP LaserJet M1530 MFP Series PCL 6","desc":"","status":"Active","sumtray":"5"}
		   ,{"code":"PT002","svcname":"HP Color LaserJet 2700 Series PCL6","desc":"","status":"Active","sumtray":"4"}
		   ,{"code":"PT003","svcname":"Ricoh Aficio MP 2500 PCL","desc":"","status":"Active","sumtray":"4"}
		   ,{"code":"PT004","svcname":"NPI6FEF83 (HP LaserJet P2055dn)","desc":"","status":"Inactive","sumtray":"1"}
		   ,{"code":"PT005","svcname":"HP LaserJet Professional M1530 MFP Series Fax","desc":"","status":"Active","sumtray":"2"}
		   ,{"code":"PT006","svcname":"HP LaserJet M1530 MFP Series PCL 6","desc":"","status":"Active","sumtray":"4"}];
		
		$scope.documentList = [{"name":"ใบปะหน้า"}
							  ,{"name":"หน้าตารางกรมธรรม์"}
							  ,{"name":"ใบชนแล้วแยก"}
							  ,{"name":"ใบแจ้งหนี้"}];
		
		$scope.selectedDocumentList = [{"name":"ใบปะหน้า"}
									  ,{"name":"หน้าตารางกรมธรรม์"}
									  ,{"name":"ใบชนแล้วแยก"}
									  ,{"name":"ใบแจ้งหนี้"}];
		
		$scope.clear = function(){
			$rootScope.criteria = {};
		};
		
		$scope.searchDocument = function(){		
//			var test = encodeURI($location.path('/admin-printing-setup?การก่หสดหสกด่หนหก'));
			
			//var url = _.toHttpGetUrl('api/user/findUser', $rootScope.criteria);
			//$http.get(url).success(function(data){
			var data = [{"code":"DC001","name":"VMI1 New","project":"VMI","polpackage":"VMI1","poltype":"New","status":"Active","sumtray":"5"}
					   ,{"code":"DC002","name":"VMI1 Endorse","project":"VMI","polpackage":"VMI1","poltype":"Endorse","status":"Active","sumtray":"4"}
					   ,{"code":"DC003","name":"VMI1 Renew","project":"VMI","polpackage":"VMI1","poltype":"Renew","status":"Active","sumtray":"4"}
					   ,{"code":"DC004","name":"CMI New","project":"CMI","polpackage":"CMI","poltype":"New","status":"Inactive","sumtray":"1"}
					   ,{"code":"DC005","name":"CMI Endorse","project":"CMI","polpackage":"CMI","poltype":"Endorse","status":"Active","sumtray":"2"}
					   ,{"code":"DC006","name":"CMI Renew","project":"CMI","polpackage":"CMI","poltype":"Renew","status":"Active","sumtray":"4"}];
			
				var tbody = "";
				_.each(data, function(documentList, index){
					tbody += '<tr>';
					tbody += '<td><input type="checkbox" ng-checked="chk" value="'+documentList.code+'"><span class="lbl"></span></td>';
					tbody += '<td>'+(index+1)+'</td>';
					tbody += '<td>'+documentList.code+'</td>';
					tbody += '<td>'+documentList.name+'</td>';
					tbody += '<td>'+documentList.project+'</td>';
					tbody += '<td>'+documentList.polpackage+'</td>';
					tbody += '<td>'+documentList.poltype+'</td>';
					tbody += '<td>'+documentList.status+'</td>';
					tbody += '<td class="action">';
					tbody += '	<a title="'+$scope.app.lang.convert("Edit")+'" href="#/all-app-detail/'+documentList.code+'"><i class="icon-edit"></i></a>';
					tbody += '	&nbsp;&nbsp;<a title="'+$scope.app.lang.convert("Delete")+'" href="" ng-click="deleteUser(\''+documentList.code+'\')"><i class="icon-trash"></i></a>';
					tbody += '</td>';
					tbody += '</tr>';
				});
			
				$("#documentsetup_table").dataTable().fnClearTable();
				$('#documentsetup_table_tbody').append($compile(tbody)($scope));
				$("#documentsetup_table").dataTable({
					"bDestroy": true,
			        "oLanguage": $rootScope.app.oLanguage(),
					"sDom": "t<'row-fluid'<'span4'lf><'span4'i><'span4'p>>",
					"aoColumns": [
					    { "sWidth": "3px", "sClass": "text-center" , "bSortable": false },
					    { "sWidth": "3px", "sClass": "text-center" , "bSortable": false },
					    { "sWidth": "60px", "sClass": "text-center"},
					    { "sWidth": "100px", "sClass": "text-left"},
						{ "sWidth": "80px", "sClass": "text-left" },
						{ "sWidth": "80px", "sClass": "text-left" },
						{ "sWidth": "50px", "sClass": "text-left" },
						{ "sWidth": "50px", "sClass": "text-left" },
						{ "sWidth": "20px", "sClass": "text-center" , "bSortable": false}
			        ]
				});
				$('.dt_actions').html($compile($('.dt_app_actions').html())($scope));
			//});
		};		
		$scope.searchDocument();
		
		$scope.back = function() {
			$location.path('/admin-printing-setup');
		};
		
	}, 0);
	
};

function PrinterSetupListCtrl($rootScope, $scope, $http, $compile, $filter, $timeout, $routeParams, $location, $log) {
	$log.info('Enter PrinterSetupListCtrl');
	
	$timeout(function() {
		
		$rootScope.criteria.dateFrom = _.toDateStr(moment()); //set default date form
		$rootScope.criteria.dateTo = _.toDateStr(moment()); //set default date to
		
		$scope.trayList = [
      		 {"trayName":"tray1", "displayName":"Manual Feed"}
      		,{"trayName":"tray2", "displayName":"Tray2-A4"}
      		,{"trayName":"tray3", "displayName":"Tray3-Letter"}
      	];
		
		
		$scope.clear = function(){
			$rootScope.criteria = {};
		};
		
		$scope.searchPrinter = function(){		
			
			var data = [{"code":"PT001","svcname":"HP LaserJet M1530 MFP Series PCL 6","desc":"","status":"Active","sumtray":"5"}
					   ,{"code":"PT002","svcname":"HP Color LaserJet 2700 Series PCL6","desc":"","status":"Active","sumtray":"4"}
					   ,{"code":"PT003","svcname":"Ricoh Aficio MP 2500 PCL","desc":"","status":"Active","sumtray":"4"}
					   ,{"code":"PT004","svcname":"NPI6FEF83 (HP LaserJet P2055dn)","desc":"","status":"Inactive","sumtray":"1"}
					   ,{"code":"PT005","svcname":"HP LaserJet Professional M1530 MFP Series Fax","desc":"","status":"Active","sumtray":"2"}
					   ,{"code":"PT006","svcname":"HP LaserJet M1530 MFP Series PCL 6","desc":"","status":"Active","sumtray":"4"}];
			
				var tbody = "";
				_.each(data, function(printerList, index){
					tbody += '<tr>';
					tbody += '<td><input type="checkbox" ng-checked="chk" value="'+printerList.code+'"><span class="lbl"></span></td>';
					tbody += '<td>'+(index+1)+'</td>';
					tbody += '<td>'+printerList.code+'</td>';
					tbody += '<td>'+printerList.svcname+'</td>';
					tbody += '<td>'+printerList.sumtray+'</td>';
					tbody += '<td>'+printerList.desc+'</td>';
					tbody += '<td>'+printerList.status+'</td>';
					tbody += '<td class="action">';
					tbody += '	<a title="'+$scope.app.lang.convert("Edit")+'" href="#" target="self" data-target="#newEventPopup" data-toggle="modal"><i class="icon-edit"></i></a>';
					tbody += '	&nbsp;&nbsp;<a title="'+$scope.app.lang.convert("Delete")+'" href="" ng-click="deleteUser(\''+printerList.code+'\')"><i class="icon-trash"></i></a>';
					tbody += '</td>';
					tbody += '</tr>';
				});
			
				$("#printersetup_table").dataTable().fnClearTable();
				$('#printersetup_table_tbody').append($compile(tbody)($scope));
				$("#printersetup_table").dataTable({
					"bDestroy": true,
			        "oLanguage": $rootScope.app.oLanguage(),
					"sDom": "t<'row-fluid'<'span4'lf><'span4'i><'span4'p>>",
					"aoColumns": [
					    { "sWidth": "3px", "sClass": "text-center" , "bSortable": false },
					    { "sWidth": "3px", "sClass": "text-center" , "bSortable": false },
					    { "sWidth": "60px", "sClass": "text-center"},
					    { "sWidth": "110px", "sClass": "text-left"},
						{ "sWidth": "30px", "sClass": "text-right" },
						{ "sWidth": "160px", "sClass": "text-left" },
						{ "sWidth": "50px", "sClass": "text-left" },
						{ "sWidth": "20px", "sClass": "text-center" , "bSortable": false}
			        ]
				});
				$('.dt_actions').html($compile($('.dt_app_actions').html())($scope));
			//});
		};		
		$scope.searchPrinter();
		
		$scope.back = function() {
			$location.path('/admin-printing-setup');
		};
		
	}, 0);
};

function DocumentTypeSetupListCtrl($rootScope, $scope, $http, $compile, $filter, $timeout, $routeParams, $location, $log) {
	$log.info('Enter DocumentSetupListCtrl');
	
	$timeout(function() {
		
		$rootScope.criteria.dateFrom = _.toDateStr(moment()); //set default date form
		$rootScope.criteria.dateTo = _.toDateStr(moment()); //set default date to
		
		$scope.trayList = [
      		 {"trayName":"tray1", "displayName":"Manual Feed"}
      		,{"trayName":"tray2", "displayName":"Tray2-A4"}
      		,{"trayName":"tray3", "displayName":"Tray3-Letter"}
      	];
		
		$scope.documentList = [{"name":"ใบปะหน้า"}
							  ,{"name":"หน้าตารางกรมธรรม์"}
							  ,{"name":"ใบชนแล้วแยก"}
							  ,{"name":"ใบแจ้งหนี้"}];
		
		$scope.selectedDocumentList = [{"name":"ใบปะหน้า"}
									  ,{"name":"หน้าตารางกรมธรรม์"}
									  ,{"name":"ใบชนแล้วแยก"}
									  ,{"name":"ใบแจ้งหนี้"}];
		
		$scope.clear = function(){
			$rootScope.criteria = {};
		};
		
		$scope.searchDocument = function(){		
			//var url = _.toHttpGetUrl('api/user/findUser', $rootScope.criteria);
			//$http.get(url).success(function(data){
			var data = [{"code":"DC001","name":"VMI1 New","project":"VMI","polpackage":"VMI1","poltype":"New","status":"Active","sumtray":"5"}
					   ,{"code":"DC002","name":"VMI1 Endorse","project":"VMI","polpackage":"VMI1","poltype":"Endorse","status":"Active","sumtray":"4"}
					   ,{"code":"DC003","name":"VMI1 Renew","project":"VMI","polpackage":"VMI1","poltype":"Renew","status":"Active","sumtray":"4"}
					   ,{"code":"DC004","name":"CMI New","project":"CMI","polpackage":"CMI","poltype":"New","status":"Inactive","sumtray":"1"}
					   ,{"code":"DC005","name":"CMI Endorse","project":"CMI","polpackage":"CMI","poltype":"Endorse","status":"Active","sumtray":"2"}
					   ,{"code":"DC006","name":"CMI Renew","project":"CMI","polpackage":"CMI","poltype":"Renew","status":"Active","sumtray":"4"}];
			
				var tbody = "";
				_.each(data, function(documentList, index){
					tbody += '<tr>';
					tbody += '<td><input type="checkbox" ng-checked="chk" value="'+documentList.code+'"><span class="lbl"></span></td>';
					tbody += '<td>'+(index+1)+'</td>';
					tbody += '<td>'+documentList.code+'</td>';
					tbody += '<td>'+documentList.name+'</td>';
					tbody += '<td>'+documentList.project+'</td>';
					tbody += '<td>'+documentList.polpackage+'</td>';
					tbody += '<td>'+documentList.poltype+'</td>';
					tbody += '<td>'+documentList.status+'</td>';
					tbody += '<td class="action">';
					tbody += '	<a title="'+$scope.app.lang.convert("Edit")+'" href="#" target="self" data-target="#newEventPopup" data-toggle="modal"><i class="icon-edit"></i></a>';
					tbody += '	&nbsp;&nbsp;<a title="'+$scope.app.lang.convert("Delete")+'" href="" ng-click="deleteUser(\''+documentList.code+'\')"><i class="icon-trash"></i></a>';
					tbody += '</td>';
					tbody += '</tr>';
				});
			
				$("#documentsetup_table").dataTable().fnClearTable();
				$('#documentsetup_table_tbody').append($compile(tbody)($scope));
				$("#documentsetup_table").dataTable({
					"bDestroy": true,
			        "oLanguage": $rootScope.app.oLanguage(),
					"sDom": "t<'row-fluid'<'span4'lf><'span4'i><'span4'p>>",
					"aoColumns": [
					    { "sWidth": "3px", "sClass": "text-center" , "bSortable": false },
					    { "sWidth": "3px", "sClass": "text-center" , "bSortable": false },
					    { "sWidth": "60px", "sClass": "text-center"},
					    { "sWidth": "100px", "sClass": "text-left"},
						{ "sWidth": "80px", "sClass": "text-left" },
						{ "sWidth": "80px", "sClass": "text-left" },
						{ "sWidth": "50px", "sClass": "text-left" },
						{ "sWidth": "50px", "sClass": "text-left" },
						{ "sWidth": "20px", "sClass": "text-center" , "bSortable": false}
			        ]
				});
				$('.dt_actions').html($compile($('.dt_app_actions').html())($scope));
			//});
		};		
		$scope.searchDocument();
		
		$scope.back = function() {
			$location.path('/admin-printing-setup');
		};
		
	}, 0);
	
};

function DocumentTypeSetupDetailCtrl($rootScope, $scope, $http, $compile, $filter, $timeout, $routeParams, $location, $log) {
	$log.info('Enter DocumentTypeSetupDetailCtrl');
	$timeout(function() {
		
		$rootScope.criteria.dateFrom = _.toDateStr(moment()); //set default date form
		$rootScope.criteria.dateTo = _.toDateStr(moment()); //set default date to
		
		$scope.trayList = [{"id":"1","trayName":"tray1", "displayName":"Manual Feed"}
		            		,{"id":"1","trayName":"tray2", "displayName":"Tray2-A4"}
		            		,{"id":"1","trayName":"tray3", "displayName":"Tray3-Letter"}
		            		,{"id":"1","trayName":"tray4", "displayName":"Tray4-A4 Logo"}];
		      		
  		$scope.printerList = [{"code":"PT001","svcname":"HP LaserJet M1530 MFP Series PCL 6","desc":"","status":"Active","sumtray":"5"}
				  		   ,{"code":"PT002","svcname":"HP Color LaserJet 2700 Series PCL6","desc":"","status":"Active","sumtray":"4"}
				  		   ,{"code":"PT003","svcname":"Ricoh Aficio MP 2500 PCL","desc":"","status":"Active","sumtray":"4"}
				  		   ,{"code":"PT004","svcname":"NPI6FEF83 (HP LaserJet P2055dn)","desc":"","status":"Inactive","sumtray":"1"}
				  		   ,{"code":"PT005","svcname":"HP LaserJet Professional M1530 MFP Series Fax","desc":"","status":"Active","sumtray":"2"}
				  		   ,{"code":"PT006","svcname":"HP LaserJet M1530 MFP Series PCL 6","desc":"","status":"Active","sumtray":"4"}];
		
		$scope.documentList = [{"id":"1","code":"001", "displayName":"ใบปะหน้า"}
							,{"id":"2","code":"002", "displayName":"หน้าตารางกรมธรรม์"}
							,{"id":"3","code":"003", "displayName":"ใบชนแล้วแยก"}
							,{"id":"4","code":"004", "displayName":"ใบแจ้งหนี้"}];
		
		$scope.back = function() {
			$location.path('/admin-printing-setup');
		};
		
		
		 var printerData = [
		                 {title: "HP LaserJet M1530 MFP Series PCL 6", key: "HP LaserJet M1530 MFP Series PCL 6", activate: true, expand:false,
		                       children: [
		                         {title: "Manual Feed", key: "Tray1" },
		                         {title: "Tray2", key: "Tray2" },
		                         {title: "Tray3", key: "Tray3" },
		                         {title: "Tray4", key: "Tray4" },
		                         {title: "Tray5", key: "Tray5" }
		                       ]
		                     }
		                 ,{title: "HP Color LaserJet 2700 Series PCL6", key: "HP Color LaserJet 2700 Series PCL6", activate: true, expand:true,
		                       children: [
		                         {title: "Manual Feed", key: "Tray1" },
		                         {title: "Tray2", key: "Tray2" }
		                       ]
		                     }
		                 ,{title: "Ricoh Aficio MP 2500 PCL", key: "Ricoh Aficio MP 2500 PCL", activate: true, expand:true,
		                       children: [
		                         {title: "Tray1", key: "Tray1" },
		                         {title: "Tray2", key: "Tray2" }
		                       ]
		                     }
		               ];
		$scope.selectPrinter = function(idx){
			$("#tree2_"+idx).dynatree({
	               checkbox: true,
	               selectMode: 3,
	               children: printerData,
	               onSelect: function(select, node) {
	                 // Get a list of all selected nodes, and convert to a key array:
	                 var selKeys = $.map(node.tree.getSelectedNodes(), function(node, index){
	                   if(node.getLevel() == 1){
	                	  return node.data.key;
	                   }
	                   else return null;
	                 });
	                
	                 $("#displayText"+idx).val(selKeys.join(", "));
	               },
	               onDblClick: function(node, event) {
	                 node.toggleSelect();
	               },
	               onKeydown: function(node, event) {
	                 if( event.which == 32 ) {
	                   node.toggleSelect();
	                   return false;
	                 }
	               },
			});

            var tree = $("#tree2_"+idx);
            if (tree.css("display") == "none")
            {
               tree.css("display", "block"); 
            } else {
               tree.css("display", "none");
            }
		};
		
//           $(function(){
//        	   $("#tree30").dynatree({
//                   checkbox: true,
//                   selectMode: 3,
//                   children: treeData,
//                   onSelect: function(select, node) {
//                     // Get a list of all selected nodes, and convert to a key array:
//                     var selKeys = $.map(node.tree.getSelectedNodes(), function(node){
//                       return node.data.key;
//                     });
//                     $("#displayText0").val(selKeys.join(", "));
//                   },
//                   onDblClick: function(node, event) {
//                     node.toggleSelect();
//                   },
//                   onKeydown: function(node, event) {
//                     if( event.which == 32 ) {
//                       node.toggleSelect();
//                       return false;
//                     }
//                   },
//                 });
//
//                 $("#opener0").click(function() {
//                    var tree = $("#tree30");
//                    if (tree.css("display") == "none")
//                    {
//                       tree.css("display", "block") 
//                    } else {
//                       tree.css("display", "none");
//                    }
//                 });
//         });
		
		
	}, 0);
	
};

function DocumentNameSetupListCtrl($rootScope, $scope, $http, $compile, $filter, $timeout, $routeParams, $location, $log) {
	$log.info('Enter DocumentSetupListCtrl');
	
	$timeout(function() {
		
		$rootScope.criteria.dateFrom = _.toDateStr(moment()); //set default date form
		$rootScope.criteria.dateTo = _.toDateStr(moment()); //set default date to
		
		$scope.polTypeList = [{"id":"001","name":"New"}
							  ,{"id":"002","name":"Renew"}
							  ,{"id":"003","name":"Endorse"}
							  ,{"id":"004","name":"Cancel"}];
		
		$scope.selectedPolTypeList = [{"id":"001","name":"New"}
							  ,{"id":"002","name":"Renew"}
							  ,{"id":"003","name":"Endorse"}
							  ,{"id":"004","name":"Cancel"}];

		$scope.clear = function(){
			$rootScope.criteria = {};
		};
		
		$scope.searchDocument = function(){		
			//var url = _.toHttpGetUrl('api/user/findUser', $rootScope.criteria);
			//$http.get(url).success(function(data){
			var data = [{"code":"DC001","name":"VMI1 New","project":"VMI","polpackage":"VMI1","poltype":"New","status":"Active","sumtray":"5"}
					   ,{"code":"DC002","name":"VMI1 Endorse","project":"VMI","polpackage":"VMI1","poltype":"Endorse","status":"Active","sumtray":"4"}
					   ,{"code":"DC003","name":"VMI1 Renew","project":"VMI","polpackage":"VMI1","poltype":"Renew","status":"Active","sumtray":"4"}
					   ,{"code":"DC004","name":"CMI New","project":"CMI","polpackage":"CMI","poltype":"New","status":"Inactive","sumtray":"1"}
					   ,{"code":"DC005","name":"CMI Endorse","project":"CMI","polpackage":"CMI","poltype":"Endorse","status":"Active","sumtray":"2"}
					   ,{"code":"DC006","name":"CMI Renew","project":"CMI","polpackage":"CMI","poltype":"Renew","status":"Active","sumtray":"4"}];
			
				var tbody = "";
				_.each(data, function(documentList, index){
					tbody += '<tr>';
					tbody += '<td><input type="checkbox" ng-checked="chk" value="'+documentList.code+'"><span class="lbl"></span></td>';
					tbody += '<td>'+(index+1)+'</td>';
					tbody += '<td>'+documentList.code+'</td>';
					tbody += '<td>'+documentList.name+'</td>';
					tbody += '<td>'+documentList.project+'</td>';
					tbody += '<td>'+documentList.polpackage+'</td>';
					tbody += '<td>'+documentList.poltype+'</td>';
					tbody += '<td>'+documentList.status+'</td>';
					tbody += '<td class="action">';
					tbody += '	<a title="'+$scope.app.lang.convert("Edit")+'" href="#" target="self" data-target="#newEventPopup" data-toggle="modal"><i class="icon-edit"></i></a>';
					tbody += '	&nbsp;&nbsp;<a title="'+$scope.app.lang.convert("Delete")+'" href="" ng-click="deleteUser(\''+documentList.code+'\')"><i class="icon-trash"></i></a>';
					tbody += '</td>';
					tbody += '</tr>';
				});
				
				$("#documentsetup_table").dataTable().fnClearTable();
				$('#documentsetup_table_tbody').append($compile(tbody)($scope));
				$("#documentsetup_table").dataTable({
					"bDestroy": true,
			        "oLanguage": $rootScope.app.oLanguage(),
					"sDom": "t<'row-fluid'<'span4'lf><'span4'i><'span4'p>>",
					"aoColumns": [
					    { "sWidth": "3px", "sClass": "text-center" , "bSortable": false },
					    { "sWidth": "3px", "sClass": "text-center" , "bSortable": false },
					    { "sWidth": "60px", "sClass": "text-center"},
					    { "sWidth": "100px", "sClass": "text-left"},
						{ "sWidth": "80px", "sClass": "text-left" },
						{ "sWidth": "80px", "sClass": "text-left" },
						{ "sWidth": "50px", "sClass": "text-left" },
						{ "sWidth": "50px", "sClass": "text-left" },
						{ "sWidth": "20px", "sClass": "text-center" , "bSortable": false}
			        ]
				});
				$('.dt_actions').html($compile($('.dt_app_actions').html())($scope));
			//});
		};		
		$scope.searchDocument();
		
		$scope.back = function() {
			$location.path('/admin-printing-setup');
		};
		
	}, 0);
	
};
