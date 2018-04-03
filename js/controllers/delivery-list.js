angular.module('myApp').config([ '$routeProvider', function($routeProvider) {
	$routeProvider.when("/delivery-list", {templateUrl: _.toHttpGetUrl("content/policy/delivery-list.html"), controller: DeliveryListCtrl });
	$routeProvider.when("/delivery-detail", {templateUrl: _.toHttpGetUrl("content/policy/delivery-detail.html"), controller: DeliveryDetailCtrl });
	$routeProvider.when("/delivery-detail/:id", {templateUrl: _.toHttpGetUrl("content/policy/delivery-detail.html"), controller: DeliveryDetailCtrl });
} ]);

function DeliveryListCtrl($rootScope, $scope, $http, $compile, $filter, $timeout, $routeParams, $location, $log) {
	$log.info('Enter DeliveryListCtrl');
	
	$timeout(function() {
		
		$rootScope.criteria.dateFrom = _.toDateStr(moment()); //set default date form
		$rootScope.criteria.dateTo = _.toDateStr(moment()); //set default date to
		
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
		
		$scope.searchDelivery = function(){		
			//var url = _.toHttpGetUrl('api/user/findUser', $rootScope.criteria);
			//$http.get(url).success(function(data){
			var data = [{"no":"1","broker":"TISCO","policyType":"พ.ร.บ","appNo":"OTISCKPI002490001","policyNo":"","coverDate":"01/01/2557-01/01/2558","assured":"นายวิโรจน์ ชูวงศ์","counselor":"นายวิเชียร เลาหบุตร","premium":"1,074.28","status":"ยังไม่บันทึกเลขลงทะเบียน","regisDate":"","regisNo":""}
			,{"no":"2","broker":"TISCO","policyType":"พ.ร.บ","appNo":"OTISCKPI002490002","policyNo":"","coverDate":"01/01/2557-01/01/2558","assured":"นายพงษ์เทพ ธรรมโสพน","counselor":"นายวิเชียร เลาหบุตร","premium":"757.21","status":"ยังไม่บันทึกเลขลงทะเบียน","regisDate":"","regisNo":""}
			,{"no":"3","broker":"ASN","policyType":"พ.ร.บ","appNo":"OBASNKPI002490001","policyNo":"","coverDate":"01/01/2557-01/01/2558","assured":"นายวรวัฒน์ สอนจันทร์","counselor":"นายวิเชียร เลาหบุตร","premium":"757.21","status":"ยังไม่บันทึกเลขลงทะเบียน","regisDate":"","regisNo":""}
			,{"no":"4","broker":"ASN","policyType":"พ.ร.บ","appNo":"OBASNKPI002490002","policyNo":"","coverDate":"01/01/2557-01/01/2558","assured":"นายวิชัย ศรีบุรินทร์","counselor":"นายวิเชียร เลาหบุตร","premium":"757.21","status":"ยังไม่บันทึกเลขลงทะเบียน","regisDate":"","regisNo":""}
			,{"no":"5","broker":"ASN","policyType":"พ.ร.บ","appNo":"OBASNKPI002490003","policyNo":"","coverDate":"01/01/2557-01/01/2558","assured":"นายสงคราม อาจสมบาล","counselor":"นายวิเชียร เลาหบุตร","premium":"757.21","status":"ยังไม่บันทึกเลขลงทะเบียน","regisDate":"","regisNo":""}
			,{"no":"6","broker":"ASNKTC","policyType":"ประกันภัยชั้น 1","appNo":"OAKTCKPI002490001","policyNo":"","coverDate":"01/01/2557-01/01/2558","assured":"นางจุรีรัตน์ ศรีจันทร์","counselor":"นายวิเชียร เลาหบุตร","premium":"18,900.00","status":"ยังไม่บันทึกเลขลงทะเบียน","regisDate":"","regisNo":""}
			,{"no":"7","broker":"ASNKTC","policyType":"ประกันภัยชั้น 2+","appNo":"OAKTCKPI002490003","policyNo":"","coverDate":"01/01/2557-01/01/2558","assured":"น.ส.อรุณรัตน์ ปวรรัตน์","counselor":"นายวิเชียร เลาหบุตร","premium":"8,080.00","status":"ยังไม่บันทึกเลขลงทะเบียน","regisDate":"","regisNo":""}
			,{"no":"8","broker":"ASNKTC","policyType":"ประกันภัยชั้น 3","appNo":"OAKTCKPI002490004","policyNo":"","coverDate":"01/01/2557-01/01/2558","assured":"นายพงศกร แก้วเก้า","counselor":"นายวิเชียร เลาหบุตร","premium":"3,000.00","status":"ยังไม่บันทึกเลขลงทะเบียน","regisDate":"","regisNo":""}
			,{"no":"9","broker":"ASNKTC","policyType":"อุ่นใจ1","appNo":"OAKTCKPI002490005","policyNo":"","coverDate":"01/01/2557-01/01/2558","assured":"นายศักดิ์ชัย อำนายศิลป์","counselor":"นายวิเชียร เลาหบุตร","premium":"12,000.00","status":"บันทึกเลขลงทะเบียนแล้ว","regisDate":"01/01/2557 08:00:00","regisNo":"RD2020120284TH"}
			,{"no":"10","broker":"ASNKTC","policyType":"อุ่้นใจ2","appNo":"OAKTCKPI002490006","policyNo":"","coverDate":"01/01/2557-01/01/2558","assured":"นายกวี อำนวยศิลป์","counselor":"นายวิเชียร เลาหบุตร","premium":"12,000.00","status":"บันทึกเลขลงทะเบียนแล้ว","regisDate":"01/01/2557 08:00:00","regisNo":"RD2034320284TH"}];
			
				var tbody = "";
				_.each(data, function(appList, index){
					
					tbody += '<tr>';
					if(appList.regisNo == ""){
						tbody += '<td></td>';
					}
					else{
						tbody += '<td><input type="checkbox" ng-checked="chk" value="'+appList.appNo+'"><span class="lbl"></span></td>';
					}
					tbody += '<td>'+(index+1)+'</td>';
					tbody += '<td>'+appList.policyType+'</td>';
					tbody += '<td>'+appList.appNo+'</td>';
					tbody += '<td>'+appList.policyNo+'</td>';
					tbody += '<td>'+appList.coverDate+'</td>';
					tbody += '<td>'+appList.assured+'</td>';
					tbody += '<td>'+appList.regisNo+'</td>';
					tbody += '<td>'+appList.regisDate+'</td>';
					tbody += '<td>'+appList.status+'</td>';
					tbody += '<td class="action">';
					tbody += '	<a title="'+$scope.app.lang.convert("Edit")+'" href="#/delivery-detail/'+appList.appNo+'"><i class="icon-edit"></i></a>';
					tbody += '</td>';
					tbody += '</tr>';
				});
			
				$("#delivery_table").dataTable().fnClearTable();
				$('#delivery_table_tbody').append($compile(tbody)($scope));
				$("#delivery_table").dataTable({
					"bDestroy": true,
			        "oLanguage": $rootScope.app.oLanguage(),
					"sDom": "t<'row-fluid'<'span4'lf><'span4'i><'span4'p>>",
					"aoColumns": [
					    { "sWidth": "5px", "sClass": "text-center" , "bSortable": false },
					    { "sWidth": "5px", "sClass": "text-center" , "bSortable": false },
					    { "sWidth": "65px", "sClass": "text-left"},
						{ "sWidth": "70px", "sClass": "text-center" },
						{ "sWidth": "60px", "sClass": "text-left" },
						{ "sWidth": "100px", "sClass": "text-center" },
						{ "sWidth": "100px", "sClass": "text-left" },
						{ "sWidth": "60px", "sClass": "text-center" },
						{ "sWidth": "90px", "sClass": "text-center" },
						{ "sWidth": "100px", "sClass": "text-left" },
						{ "sWidth": "35px", "sClass": "text-center" , "bSortable": false}
			        ]
				});
				$('.dt_actions').html($compile($('.dt_app_actions').html())($scope));
			//});
		};		
		$scope.searchDelivery();
		
	}, 0);
};

function DeliveryDetailCtrl($rootScope, $scope, $http, $compile, $timeout, $filter, $location,$routeParams) {
	
	$timeout(function() {
		
	/*	$scope.canList = $scope.app.user.userFunction.indexOf('$errormessage.list') > -1;
		$scope.canEdit = $scope.app.user.userFunction.indexOf('$errormessage.edit') > -1;*/
		$scope.isSubmit = false;//Submit flag
		
		//Call back-end by storeId
		//$http.get(_.toHttpGetUrl('rest/errormsg/getErrorMessage/'+$routeParams.id)).success(function(data) {
			$scope.application = {"no":"2","broker":"TISCO","policyType":"พ.ร.บ","appNo":"OTISCKPI002490002","policyNo":"001-57-00000100","coverDateF":"01/01/2557","coverDateT":"01/01/2558","assured":"นายพงษ์เทพ ธรรมโสพน","counselor":"นายวิเชียร เลาหบุตร","premium":"757.21","status":"Complete","createDate":"01/01/2557 08:00:00","carType":"รถยนต์นั่งโดยสารเกิน 7 คน","usageType":"ใช้ส่วนบุคคล ไม่ใช่รับจ้างหรือให้เช่า","capacity":"1600 CC","carNo":"1กว 9999","province":"กรุงเทพมหานคร","year":"2014","brand":"TOYOTA","model":"COROLLA","color":"ขาว","chassisNo":"JSDFJOI329DSFOFE","engineNo":"DFLKSJDFOSID39"}
			
			//});
			
			$scope.registrationList = function(){		
				//var url = _.toHttpGetUrl('api/user/findUser', $rootScope.criteria);
				//$http.get(url).success(function(data){
				var regisdata = [{"regisNo":"RD029304205TH","policyNo":"001-0000020-57","policyType":"ประกันภัยชั้น 1","coverDate":"01/05/2557-01/05/2558","assured":"นายสมชาย แถลงไข"}
				,{"regisNo":"RD029304206TH","policyNo":"001-0000021-57","policyType":"ประกันภัยชั้น 1","coverDate":"01/05/2557-01/05/2558","assured":"นางวรรลภา สมบัติ"}
				,{"regisNo":"RD029304207TH","policyNo":"001-0000022-57","policyType":"ประกันภัยชั้น 1","coverDate":"01/05/2557-01/05/2558","assured":"นายมาโนช ไม้กลัด"}
				,{"regisNo":"RD029304208TH","policyNo":"001-0000023-57","policyType":"ประกันภัยชั้น 1","coverDate":"01/05/2557-01/05/2558","assured":"นายบรรจง สมบัติ"}
				,{"regisNo":"RD029304209TH","policyNo":"001-0000024-57","policyType":"ประกันภัยชั้น 1","coverDate":"01/05/2557-01/05/2558","assured":"นายธรรมนูญ วันพระ"}];

					var tbody = "";
					_.each(regisdata, function(regisList, index){
						
						tbody += '<tr>';
						tbody += '<td><input type="checkbox" ng-checked="chk" value="'+regisList.regisNo+'"><span class="lbl"></span></td>';
						tbody += '<td>'+(index+1)+'</td>';
						tbody += '<td>'+regisList.regisNo+'</td>';
						tbody += '<td>'+regisList.policyNo+'</td>';
						tbody += '<td>'+regisList.policyType+'</td>';
						tbody += '<td>'+regisList.coverDate+'</td>';
						tbody += '<td>'+regisList.assured+'</td>';
						tbody += '</tr>';
					});
				
					$("#registration_table").dataTable().fnClearTable();
					$('#registration_table_tbody').append($compile(tbody)($scope));
					$("#registration_table").dataTable({
						"bDestroy": true,
				        "oLanguage": $rootScope.app.oLanguage(),
						"sDom": "t<'row-fluid'<'span4'lf><'span4'i><'span4'p>>",
						"aoColumns": [
						    { "sWidth": "5px", "sClass": "text-center" , "bSortable": false },
						    { "sWidth": "5px", "sClass": "text-center" , "bSortable": false },
						    { "sWidth": "80px", "sClass": "text-center"},
							{ "sWidth": "80px", "sClass": "text-center" },
							{ "sWidth": "80px", "sClass": "text-left" },
							{ "sWidth": "110px", "sClass": "text-center" },
							{ "sWidth": "110px", "sClass": "text-left" }
				        ]
					});
					$('.dt_actions').html($compile($('.dt_app_actions').html())($scope));
				//});
			};		
			$scope.registrationList();
			
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
			$location.path('/delivery-list');
		};
	
	}, 0);	
};