angular.module('myApp').config([ '$routeProvider', function($routeProvider) {
	$routeProvider.when("/application-uw-list", {templateUrl: _.toHttpGetUrl("content/application/application-uw-list.html"), controller: ApplicationUWListCtrl });
	$routeProvider.when("/uw-app-detail", {templateUrl: _.toHttpGetUrl("content/application/uw-app-detail.html"), controller: ApplicationUWDetailCtrl });
	$routeProvider.when('/uw-app-detail/:id', {templateUrl: _.toHttpGetUrl('content/application/uw-app-detail.html'), controller: ApplicationUWDetailCtrl});
} ]);

function ApplicationUWListCtrl($rootScope, $scope, $http, $compile, $filter, $timeout, $routeParams, $location, $log) {
	$log.info('Enter ApplicationUWListCtrl');
	
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
		
		$scope.dataList1 = [{"no":"1","broker":"TISCO","policyType":"ประกันอุ่นใจ 1","appNo":"OTISCKPI002490001","policyNo":"","coverDate":"01/01/2557-01/01/2558","assured":"นายวิโรจน์ ชูวงศ์","counselor":"นายวิเชียร เลาหบุตร","premium":"1,074.28","status":"UW Awaiting","createDate":"01/01/2557 08:00:00"}
		,{"no":"2","broker":"TISCO","policyType":"ประกันอุ่นใจ 1","appNo":"OTISCKPI002490002","policyNo":"","coverDate":"01/01/2557-01/01/2558","assured":"นายพงษ์เทพ ธรรมโสพน","counselor":"นายวิเชียร เลาหบุตร","premium":"757.21","status":"UW Awaiting","createDate":"01/01/2557 08:00:00"}
		,{"no":"3","broker":"ASN","policyType":"ประกันอุ่นใจ 2","appNo":"OBASNKPI002490001","policyNo":"","coverDate":"01/01/2557-01/01/2558","assured":"นายวรวัฒน์ สอนจันทร์","counselor":"นายวิเชียร เลาหบุตร","premium":"757.21","status":"UW Awaiting","createDate":"01/01/2557 08:00:00"}
		,{"no":"4","broker":"ASN","policyType":"ประกันอุ่นใจ 2","appNo":"OBASNKPI002490002","policyNo":"","coverDate":"01/01/2557-01/01/2558","assured":"นายวิชัย ศรีบุรินทร์","counselor":"นายวิเชียร เลาหบุตร","premium":"757.21","status":"UW Awaiting","createDate":"01/01/2557 08:00:00"}
		,{"no":"5","broker":"ASN","policyType":"ประกันภัยชั้น 1","appNo":"OBASNKPI002490003","policyNo":"","coverDate":"01/01/2557-01/01/2558","assured":"นายสงคราม อาจสมบาล","counselor":"นายวิเชียร เลาหบุตร","premium":"757.21","status":"UW Awaiting","createDate":"01/01/2557 08:00:00"}
		,{"no":"6","broker":"ASNKTC","policyType":"ประกันภัยชั้น 1","appNo":"OAKTCKPI002490001","policyNo":"","coverDate":"01/01/2557-01/01/2558","assured":"นางจุรีรัตน์ ศรีจันทร์","counselor":"นายวิเชียร เลาหบุตร","premium":"18,900.00","status":"UW Awaiting","createDate":"01/01/2557 08:00:00"}
		/*,{"no":"7","broker":"ASNKTC","policyType":"ประกันภัยชั้น 2+","appNo":"OAKTCKPI002490003","policyNo":"","coverDate":"01/01/2557-01/01/2558","assured":"น.ส.อรุณรัตน์ ปวรรัตน์","counselor":"นายวิเชียร เลาหบุตร","premium":"8,080.00","status":"New","createDate":"01/01/2557 08:00:00"}
		,{"no":"8","broker":"ASNKTC","policyType":"ประกันภัยชั้น 3","appNo":"OAKTCKPI002490004","policyNo":"","coverDate":"01/01/2557-01/01/2558","assured":"นายพงศกร แก้วเก้า","counselor":"นายวิเชียร เลาหบุตร","premium":"3,000.00","status":"Payment Awaiting","createDate":"01/01/2557 08:00:00"}
		,{"no":"9","broker":"ASNKTC","policyType":"อุ่นใจ1","appNo":"OAKTCKPI002490005","policyNo":"","coverDate":"01/01/2557-01/01/2558","assured":"นายศักดิ์ชัย อำนายศิลป์","counselor":"นายวิเชียร เลาหบุตร","premium":"12,000.00","status":"Payment Awaiting","createDate":"01/01/2557 08:00:00"}
		,{"no":"10","broker":"ASNKTC","policyType":"อุ่้นใจ2","appNo":"OAKTCKPI002490006","policyNo":"","coverDate":"01/01/2557-01/01/2558","assured":"นายกวี อำนวยศิลป์","counselor":"นายวิเชียร เลาหบุตร","premium":"12,000.00","status":"Complete","createDate":"01/01/2557 08:00:00"}*/];
		
		$scope.clear = function(){
			$rootScope.criteria = {};
		};
		
		$scope.searchApplicationUW = function(){		
			//var url = _.toHttpGetUrl('api/user/findUser', $rootScope.criteria);
			//$http.get(url).success(function(data){
			var data = [];
			if ($scope.criteria.applicationCode != null) {
				// find by id
				data.push(_.findWhere($scope.dataList1, {'appNo':$rootScope.criteria.applicationCode+''}));
			
				
			}
			else{
				data = $scope.dataList1;
			}
				var tbody = "";
				_.each(data, function(appList, index){
					
					tbody += '<tr>';
					tbody += '<td><input type="checkbox" ng-checked="chk" value="'+appList.appNo+'"><span class="lbl"></span></td>';
					tbody += '<td>'+appList.broker+'</td>';
					tbody += '<td>'+appList.policyType+'</td>';
					tbody += '<td>'+appList.appNo+'</td>';
					tbody += '<td>'+appList.policyNo+'</td>';
					tbody += '<td>'+appList.coverDate+'</td>';
					tbody += '<td>'+appList.assured+'</td>';
					tbody += '<td>'+appList.counselor+'</td>';
					tbody += '<td>'+appList.premium+'</td>';
					tbody += '<td>'+appList.createDate+'</td>';
					tbody += '<td>'+appList.status+'</td>';
					tbody += '<td class="action">';
					tbody += '	<a title="'+$scope.app.lang.convert("Edit")+'" href="#/uw-app-detail/'+appList.appNo+'"><i class="icon-edit"></i></a>';
					tbody += '</td>';
					tbody += '</tr>';
				});
			
				$("#application_table").dataTable().fnClearTable();
				$('#application_table_tbody').append($compile(tbody)($scope));
				$("#application_table").dataTable({
					"bDestroy": true,
			        "oLanguage": $rootScope.app.oLanguage(),
					"sDom": "t<'row-fluid'<'span4'lf><'span4'i><'span4'p>>",
					"aoColumns": [
					    { "sWidth": "3px", "sClass": "text-center" , "bSortable": false },
					    { "sWidth": "60px", "sClass": "text-left"},
					    { "sWidth": "67px", "sClass": "text-left"},
						{ "sWidth": "80px", "sClass": "text-left" },
						{ "sWidth": "70px", "sClass": "text-left" },
						{ "sWidth": "110px", "sClass": "text-center" },
						{ "sWidth": "100px", "sClass": "text-left" },
						{ "sWidth": "100px", "sClass": "text-left" },
						{ "sWidth": "85px", "sClass": "text-right" },
						{ "sWidth": "100px", "sClass": "text-center" },
						{ "sWidth": "80px", "sClass": "text-left" },
						{ "sWidth": "30px", "sClass": "text-center" , "bSortable": false}
			        ]
				});
				$('.dt_actions').html($compile($('.dt_app_actions').html())($scope));
			//});
		};		
		$scope.searchApplicationUW();
		
	}, 0);
};

function ApplicationUWDetailCtrl($rootScope, $scope, $http, $compile, $timeout, $filter, $location,$routeParams) {
	
	$timeout(function() {
		
	/*	$scope.canList = $scope.app.user.userFunction.indexOf('$errormessage.list') > -1;
		$scope.canEdit = $scope.app.user.userFunction.indexOf('$errormessage.edit') > -1;*/
		$scope.isSubmit = false;//Submit flag
		
		//Call back-end by storeId
		//$http.get(_.toHttpGetUrl('rest/errormsg/getErrorMessage/'+$routeParams.id)).success(function(data) {
			$scope.application = {"no":"2","broker":"TISCO","policyType":"พ.ร.บ","appNo":"OTISCKPI002490002","policyNo":"001-57-00000100","coverDateF":"01/01/2557","coverDateT":"01/01/2558","assured":"นายพงษ์เทพ ธรรมโสพน","counselor":"นายวิเชียร เลาหบุตร","premium":"757.21","status":"Complete","createDate":"01/01/2557 08:00:00","carType":"รถยนต์นั่งโดยสารเกิน 7 คน","usageType":"ใช้ส่วนบุคคล ไม่ใช่รับจ้างหรือให้เช่า","capacity":"1600 CC","carNo":"1กว 9999","province":"กรุงเทพมหานคร","year":"2014","brand":"TOYOTA","model":"COROLLA","color":"ขาว","chassisNo":"JSDFJOI329DSFOFE","engineNo":"DFLKSJDFOSID39"}
			
			//});

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
			$location.path('/application-uw-list');
		};
	
	}, 0);	
};