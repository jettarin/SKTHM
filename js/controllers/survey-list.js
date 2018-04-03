angular.module('myApp').config([ '$routeProvider', function($routeProvider) {
	$routeProvider.when("/survey-list", {templateUrl: _.toHttpGetUrl("content/application/survey-list.html"), controller: surveyListCtrl });
	$routeProvider.when('/survey-app-detail/:id', {templateUrl: _.toHttpGetUrl('content/application/survey-app-detail.html'), controller: ApplicationSurveyDetailCtrl});
} ]);

function surveyListCtrl($rootScope, $scope, $http, $compile, $filter, $timeout, $routeParams, $location, $log) {
	$log.info('Enter surveyListCtrl');
	
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
		
		$scope.searchSurvey = function(){		
			//var url = _.toHttpGetUrl('api/user/findUser', $rootScope.criteria);
			//$http.get(url).success(function(data){
			var data = [{"no":"1","branch":"สำนักงานใหญ่","carNo":"กว 9090 กทม","appNo":"OTISCKPI002490001","chassisNo":"33JHSDFKI239","coverDate":"01/01/2557-01/01/2558","assured":"นายวิโรจน์ ชูวงศ์","contactName":"นายวิเชียร เลาหบุตร","premium":"1,074.28","status":"Complete","appointmentDate":"01/01/2557","surveyor":"นายสำเภา นิจจันทร์","status":"นัดหมายได้","remark":""}
			,{"no":"2","branch":"สำนักงานใหญ่","carNo":"จน 5755 กทม","appNo":"OTISCKPI002490002","chassisNo":"SDDFKJO399DSF","coverDate":"01/01/2557-01/01/2558","assured":"นายพงษ์เทพ ธรรมโสพน","contactName":"นายวิเชียร เลาหบุตร","premium":"757.21","status":"Complete","appointmentDate":"01/01/2557","surveyor":"นายสำเภา นิจจันทร์","status":"นัดหมายได้","remark":""}
			,{"no":"3","branch":"สำนักงานใหญ่","carNo":"รว 9900 กทม","appNo":"OBASNKPI002490001","chassisNo":"032SDFJLLJSDF","coverDate":"01/01/2557-01/01/2558","assured":"นายวรวัฒน์ สอนจันทร์","contactName":"นายวิเชียร เลาหบุตร","premium":"757.21","status":"Complete","appointmentDate":"","surveyor":"นายสำเภา นิจจันทร์","status":"นัดหมายไม่ได้","remark":"ติดต่อไม่ได้"}
			,{"no":"4","branch":"สำนักงานเขต1","carNo":"3กก 1 กทม","appNo":"OBASNKPI002490002","chassisNo":"SDFJE93JSLDKF","coverDate":"01/01/2557-01/01/2558","assured":"นายวิชัย ศรีบุรินทร์","contactName":"นายวิเชียร เลาหบุตร","premium":"757.21","status":"Complete","appointmentDate":"","surveyor":"นายสำเภา นิจจันทร์","status":"นัดหมายไม่ได้","remark":"โทรไม่ติด"}
			,{"no":"5","branch":"สำนักงานเขต1","carNo":"3กย 99 กทม","appNo":"OBASNKPI002490003","chassisNo":"9432LDKDSJFFD","coverDate":"01/01/2557-01/01/2558","assured":"นายสงคราม อาจสมบาล","contactName":"นายวิเชียร เลาหบุตร","premium":"757.21","status":"Complete","appointmentDate":"01/01/2557","surveyor":"นายสำเภา นิจจันทร์","status":"นัดหมายได้","remark":""}
			,{"no":"6","branch":"สำนักงานเขต2","carNo":"1กด 191 กทม","appNo":"OAKTCKPI002490001","chassisNo":"SDFJKHDSF93DF","coverDate":"01/01/2557-01/01/2558","assured":"นางจุรีรัตน์ ศรีจันทร์","contactName":"นายวิเชียร เลาหบุตร","premium":"18,900.00","status":"Survey Awaiting","appointmentDate":"","surveyor":"นายสำเภา นิจจันทร์","status":"ยังไม่ได้นัดหมาย","remark":""}
			/*,{"no":"7","branch":"สำนักงานเขต 3","carNo":"3กด 3 กทม","appNo":"OAKTCKPI002490003","chassisNo":"DSFLSKDF93RFJS","coverDate":"01/01/2557-01/01/2558","assured":"น.ส.อรุณรัตน์ ปวรรัตน์","contactName":"นายวิเชียร เลาหบุตร","premium":"8,080.00","status":"New","appointmentDate":"01/01/2557","surveyor":"นายสำเภา นิจจันทร์","status":"นัดหมายได้","remark":""}
			,{"no":"8","branch":"สำนักงานเขต 4","carNo":"3กล 45 กทม","appNo":"OAKTCKPI002490004","chassisNo":"SDF320IDSFL3","coverDate":"01/01/2557-01/01/2558","assured":"นายพงศกร แก้วเก้า","contactName":"นายวิเชียร เลาหบุตร","premium":"3,000.00","status":"Payment Awaiting","appointmentDate":"01/01/2557","surveyor":"นายสำเภา นิจจันทร์","status":"นัดหมายได้","remark":""}
			,{"no":"9","branch":"สำนักงานเขต 4","carNo":"3กบ 54 กทม","appNo":"OAKTCKPI002490005","chassisNo":"SDFLJ2SDF33DF","coverDate":"01/01/2557-01/01/2558","assured":"นายศักดิ์ชัย อำนายศิลป์","contactName":"นายวิเชียร เลาหบุตร","premium":"12,000.00","status":"Payment Awaiting","appointmentDate":"01/01/2557","surveyor":"นายสำเภา นิจจันทร์","status":"นัดหมายได้","remark":""}
			,{"no":"10","branch":"สำนักงานเขต 4","carNo":"2กด 8 กทม","appNo":"OAKTCKPI002490006","chassisNo":"2JLDFK329DFJ","coverDate":"01/01/2557-01/01/2558","assured":"นายกวี อำนวยศิลป์","contactName":"นายวิเชียร เลาหบุตร","premium":"12,000.00","status":"Complete","appointmentDate":"01/01/2557","surveyor":"นายสำเภา นิจจันทร์","status":"นัดหมายได้","remark":""}*/];
			
				var tbody = "";
				_.each(data, function(appList, index){
					
					tbody += '<tr>';
					tbody += '<td>'+appList.branch+'</td>';
					tbody += '<td>'+appList.appNo+'</td>';
					tbody += '<td>'+appList.coverDate+'</td>';
					tbody += '<td>'+appList.carNo+'</td>';
					tbody += '<td>'+appList.chassisNo+'</td>';
					tbody += '<td>'+appList.assured+'</td>';
					tbody += '<td>'+appList.appointmentDate+'</td>';
					tbody += '<td>'+appList.contactName+'</td>';
					tbody += '<td>'+appList.surveyor+'</td>';
					tbody += '<td>'+appList.status+'</td>';
					tbody += '<td>'+appList.remark+'</td>';
					tbody += '<td class="action">';
					tbody += '	<a title="'+$scope.app.lang.convert("Edit")+'" href="#/survey-app-detail/'+appList.appNo+'"><i class="icon-edit"></i></a>';
					tbody += '</td>';
					tbody += '</tr>';
				});
			
				$("#survey_table").dataTable().fnClearTable();
				$('#survey_table_tbody').append($compile(tbody)($scope));
				$("#survey_table").dataTable({
					"bDestroy": true,
			        "oLanguage": $rootScope.app.oLanguage(),
					"sDom": "t<'row-fluid'<'span4'lf><'span4'i><'span4'p>>",
					"aoColumns": [
					    { "sWidth": "65px", "sClass": "text-left"},
					    { "sWidth": "80px", "sClass": "text-left"},
					    { "sWidth": "110px", "sClass": "text-left"},
						{ "sWidth": "65px", "sClass": "text-left"},
						{ "sWidth": "75px", "sClass": "text-left"},
						{ "sWidth": "90px", "sClass": "text-left"},
						{ "sWidth": "70px", "sClass": "text-center"},
						{ "sWidth": "90px", "sClass": "text-left"},
						{ "sWidth": "90px", "sClass": "text-left"},
						{ "sWidth": "80px", "sClass": "text-left"},
						{ "sWidth": "80px", "sClass": "text-left"},
						{ "sWidth": "30px", "sClass": "text-center" , "bSortable": false}
			        ]
				});
				$('.dt_actions').html($compile($('.dt_app_actions').html())($scope));
			//});
		};		
		$scope.searchSurvey();
		
	}, 0);
};

function ApplicationSurveyDetailCtrl($rootScope, $scope, $http, $compile, $timeout, $filter, $location,$routeParams) {
	
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
			$location.path('/survey-list');
		};
	
	}, 0);	
};
