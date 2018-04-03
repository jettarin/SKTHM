angular.module('myApp').config([ '$routeProvider', function($routeProvider) {
	$routeProvider.when("/underwriter-todo-list", {templateUrl: _.toHttpGetUrl('content/risk-survey/underwriter-todo-list.html'), controller: UwToDoListCtrl});
	$routeProvider.when("/underwriter-todo-list/:mode", {templateUrl: _.toHttpGetUrl('content/risk-survey/underwriter-todo-detail.html'), controller: UwTodoListDetailCtrl});
	$routeProvider.when("/underwriter-todo-list/:mode/:id", {templateUrl: _.toHttpGetUrl('content/risk-survey/underwriter-todo-detail.html'), controller: UwTodoListDetailCtrl});
} ]);

function UwToDoListCtrl($rootScope, $scope, $http, $compile, $timeout, $filter, $location, $log, $route, $routeParams) {
	$log.info('Enter UnderWriterTodoListCtrl');
	
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
	
	$scope.taskList = [{"id":"1","name":"Assign Surveyor"},
	                   {"id":"2","name":"Approve Survey Price"},
	                   {"id":"3","name":"Approve Application after Risk Survey"}];
	
	$scope.applicationStatusList = [{"id":"01","name":"Complete"},
	                                {"id":"02","name":"Survey Awaiting"}];
	
	$scope.riskSurveyStatusList = [{"id":"AS","name":"Assigned Task"}
	                               ,{"id":"AC","name":"Accepted Task"}
	                               ,{"id":"RE","name":"Rejected Task"}
	                               ,{"id":"CO","name":"Completed"}
	                              ];
	
	
	$scope.surveyorList = [{"surveyorCode":"00001","surveyorName":"นายสำเภา นิจจันทร์","surveyorType":"outsource","branch":"บึงคุ่ม","province":"กรุงเทพมหานคร","contactNo":"02-22222222","assignDate":"14/07/2557","surveyorAD":"14/07/2557","status":"Accepted"},
	                       {"surveyorCode":"00002","surveyorName":"นายวิชาญ รัตนิพนธ์","surveyorType":"เจ้าหน้าที่","branch":"บึงคุ่ม","province":"กรุงเทพมหานคร","contactNo":"02-22222222","assignDate":"14/07/2557","surveyorAD":"14/07/2557","status":"rejected"},
	                       {"surveyorCode":"00003","surveyorName":"นายนพดล ชัยชนะกิจการ","surveyorType":"outsource","branch":"บึงคุ่ม","province":"กรุงเทพมหานคร","contactNo":"02-22222222","assignDate":"14/07/2557","surveyorAD":"14/07/2557","status":"rejected"},
	                       {"surveyorCode":"00004","surveyorName":"นายอนุพงษ์ เครืองาม","surveyorType":"เจ้าหน้าที่","branch":"บึงคุ่ม","province":"กรุงเทพมหานคร","contactNo":"02-22222222","assignDate":"14/07/2557","surveyorAD":"14/07/2557","status":"rejected"}
						  ];
	if($scope.criteria.surveyorCode != null){
		$scope.surveyorList = filter('filter')($scope.surveyorList, function(value){return (value.surveyorCode ==  $scope.criteria.surveyorCode);});
	}
	
$scope.search = function(){
		
		angular.extend($rootScope.criteria, $rootScope.paging);
		
		$scope.uwToDoList = [{"no":"6","branch":"สำนักงานใหญ่","carNo":"กว 9090 กทม","appNo":"AP5707-00001","chassisNo":"33JHSDFKI239","coverDate":"01/01/2557","coverDateTo":"01/01/2558","assured":"นายวิโรจน์ ชูวงศ์","contactName":"นายวิเชียร เลาหบุตร","contactNo":"02-0020023","contactNameAutho":"นางเวลา บุตร","contactNoAutho":"02-0002000","amount":"200 บาท","premium":"1,074.28","statusNameEn":"Complete","appointmentDate":"01/01/2557","province":"กรุงเทพมหานคร","amphur":"จตุจักร","district":"จันทรเกษม","place":"รัชดาภิเษก 32","branch":"กรุงเทพ","surveyor":"นายสำเภา นิจจันทร์","statusNameLc":"นัดหมายได้","riskSurveyStatus":"Assigned Task","remark":"ติดต่อไม่ได้","telNo":"02-01245115","color":"แดง","mobileNo":"084-54879565"}
	,{"no":"5","branch":"สำนักงานใหญ่","carNo":"จน 5755 กทม","appNo":"AP5707-00002","chassisNo":"SDDFKJO399DSF","coverDate":"10/01/2558","coverDateTo":"01/01/2558","assured":"นายพงษ์เทพ ธรรมโสพน","contactName":"นายวิเชียร เลาหบุตร","premium":"757.21","contactNo":"02-0020023","contactNameAutho":"นางเวลา บุตร","contactNoAutho":"02-0002000","amount":"200 บาท","statusNameEn":"Complete","appointmentDate":"01/01/2557","province":"กรุงเทพมหานคร","amphur":"จตุจักร","district":"จันทรเกษม","place":"รัชดาภิเษก 32","branch":"กรุงเทพ","surveyor":"นายสำเภา นิจจันทร์","statusNameLc":"นัดหมายได้","remark":"ติดต่อไม่ได้","riskSurveyStatus":"Assigned Task","telNo":"02-01245115","color":"ดำ","mobileNo":"084-54879565"}
	,{"no":"4","branch":"สำนักงานใหญ่","carNo":"รว 9900 กทม","appNo":"AP5707-00003","chassisNo":"032SDFJLLJSDF","coverDate":"11/12/2557","coverDateTo":"01/01/2558","assured":"นายวรวัฒน์ สอนจันทร์","contactName":"นายวิเชียร เลาหบุตร","premium":"757.21","contactNo":"02-0020023","contactNameAutho":"นางเวลา บุตร","contactNoAutho":"02-0002000","amount":"200 บาท","statusNameEn":"Complete","appointmentDate":"01/01/2557","province":"กรุงเทพมหานคร","amphur":"จตุจักร","district":"จันทรเกษม","place":"รัชดาภิเษก 32","branch":"กรุงเทพ","surveyor":"นายวิชาญ รัตนิพนธ์","statusNameLc":"นัดหมายไม่ได้","remark":"ติดต่อไม่ได้","riskSurveyStatus":"Accepted Task","telNo":"02-01245115","color":"ฟ้า","mobileNo":"084-54879565"}
	,{"no":"3","branch":"สำนักงานเขต1","carNo":"3กก 1 กทม","appNo":"AP5707-00004","chassisNo":"SDFJE93JSLDKF","coverDate":"12/13/2556","coverDateTo":"01/01/2558","assured":"นายวิชัย ศรีบุรินทร์","contactName":"นายวิเชียร เลาหบุตร","premium":"757.21","contactNo":"02-0020023","contactNameAutho":"นางเวลา บุตร","contactNoAutho":"02-0002000","amount":"200 บาท","statusNameEn":"Complete","appointmentDate":"01/01/2557","province":"กรุงเทพมหานคร","amphur":"จตุจักร","district":"จันทรเกษม","place":"รัชดาภิเษก 32","branch":"กรุงเทพ","surveyor":"นายสำเภา นิจจันทร์","statusNameLc":"นัดหมายไม่ได้","remark":"โทรไม่ติด","riskSurveyStatus":"Accepted Task","telNo":"02-01245115","color":"น้ำเงิน","mobileNo":"084-54879565"}
	,{"no":"2","branch":"สำนักงานเขต1","carNo":"3กย 99 กทม","appNo":"AP5707-00005","chassisNo":"9432LDKDSJFFD","coverDate":"13/14/2555","coverDateTo":"01/01/2558","assured":"นายสงคราม อาจสมบาล","contactName":"นายวิเชียร เลาหบุตร","premium":"757.21","contactNo":"02-0020023","contactNameAutho":"นางเวลา บุตร","contactNoAutho":"02-0002000","amount":"200 บาท","statusNameEn":"Complete","appointmentDate":"01/01/2557","province":"กรุงเทพมหานคร","amphur":"จตุจักร","district":"จันทรเกษม","place":"รัชดาภิเษก 32","branch":"กรุงเทพ","surveyor":"นายนพดล ชัยชนะกิจการ","statusNameLc":"นัดหมายได้","remark":"ติดต่อไม่ได้","riskSurveyStatus":"Accepted Task","telNo":"02-01245115","color":"เหลือง","mobileNo":"084-54879565"}
	,{"no":"1","branch":"สำนักงานเขต2","carNo":"1กด 191 กทม","appNo":"AP5707-00006","chassisNo":"SDFJKHDSF93DF","coverDate":"14/15/2554","coverDateTo":"01/01/2558","assured":"นางจุรีรัตน์ ศรีจันทร์","contactName":"นายวิเชียร เลาหบุตร","contactNo":"02-0020023","contactNameAutho":"นางเวลา บุตร","premium":"18,900.00","contactNoAutho":"02-0002000","amount":"200 บาท","statusNameEn":"Survey Awaiting","appointmentDate":"01/01/2557","province":"กรุงเทพมหานคร","amphur":"จตุจักร","district":"จันทรเกษม","place":"รัชดาภิเษก 32","branch":"กรุงเทพ","surveyor":"นายอนุพงษ์ เครืองาม","statusNameLc":"ยังไม่ได้นัดหมาย","remark":"ติดต่อไม่ได้","riskSurveyStatus":"Accepted Task","telNo":"02-01245115","color":"บรอน","mobileNo":"084-54879565"}
	/*,{"no":"7","branch":"สำนักงานเขต 3","carNo":"3กด 3 กทม","appNo":"OAKTCKPI002490003","chassisNo":"DSFLSKDF93RFJS","coverDate":"01/01/2557-01/01/2558","assured":"น.ส.อรุณรัตน์ ปวรรัตน์","contactName":"นายวิเชียร เลาหบุตร","premium":"8,080.00","status":"New","appointmentDate":"01/01/2557","surveyor":"นายสำเภา นิจจันทร์","status":"นัดหมายได้","remark":""}
	,{"no":"8","branch":"สำนักงานเขต 4","carNo":"3กล 45 กทม","appNo":"OAKTCKPI002490004","chassisNo":"SDF320IDSFL3","coverDate":"01/01/2557-01/01/2558","assured":"นายพงศกร แก้วเก้า","contactName":"นายวิเชียร เลาหบุตร","premium":"3,000.00","status":"Payment Awaiting","appointmentDate":"01/01/2557","surveyor":"นายสำเภา นิจจันทร์","status":"นัดหมายได้","remark":""}
	,{"no":"9","branch":"สำนักงานเขต 4","carNo":"3กบ 54 กทม","appNo":"OAKTCKPI002490005","chassisNo":"SDFLJ2SDF33DF","coverDate":"01/01/2557-01/01/2558","assured":"นายศักดิ์ชัย อำนายศิลป์","contactName":"นายวิเชียร เลาหบุตร","premium":"12,000.00","status":"Payment Awaiting","appointmentDate":"01/01/2557","surveyor":"นายสำเภา นิจจันทร์","status":"นัดหมายได้","remark":""}
	,{"no":"10","branch":"สำนักงานเขต 4","carNo":"2กด 8 กทม","appNo":"OAKTCKPI002490006","chassisNo":"2JLDFK329DFJ","coverDate":"01/01/2557-01/01/2558","assured":"นายกวี อำนวยศิลป์","contactName":"นายวิเชียร เลาหบุตร","premium":"12,000.00","status":"Complete","appointmentDate":"01/01/2557","surveyor":"นายสำเภา นิจจันทร์","status":"นัดหมายได้","remark":""}*/];

		if ($scope.criteria.appNo != null) {
			$scope.uwToDoList = $filter('filter')($scope.uwToDoList, function(value){return (value.appNo == $scope.criteria.appNo);});
		}
		if($scope.criteria.surveyor != null){
			$scope.uwToDoList = $filter('filter')($scope.uwToDoList, function (value){return (value.surveyor == $scope.criteria.surveyor);});
			
		}	
		if($scope.criteria.coverDate != null){
			$scope.uwToDoList = $filter('filter')($scope.uwToDoList, function (value){return (value.coverDate == $scope.criteria.coverDate);});
			
		}	
		if ($scope.criteria.statusNameEn != null) {
			$scope.uwToDoList = $filter('filter')($scope.uwToDoList, function(value){return (value.statusNameEn == $scope.criteria.statusNameEn);});
		}
		if($scope.criteria.riskSurveyStatus != null){
			$scope.uwToDoList = $filter('filter')($scope.uwToDoList, function(value){return (value.riskSurveyStatus == $scope.criteria.riskSurveyStatus);});
		}
		
		$scope.gotoRemark = function(id) {
			$scope.uw = _.findWhere($scope.uwToDoList, {'appNo': id +''});
			$log.debug($scope.uw.remark);
			$scope.uw.remark = $scope.uw.remark;
		};
		
		$rootScope.paging.totalItems = $scope.uwToDoList.length;
		
		$rootScope.paging.showing = _.getShowing($rootScope.paging.pageNumber, $rootScope.paging.limit, $scope.uwToDoList.length);
	};		
	$scope.search();
	
	$scope.selectPage = function(page) {
		$rootScope.paging.pageNumber = page;
		$scope.search();
	};
	
	$scope.gotoEdit = function(no) {
		$location.path('underwriter-todo-list/edit/'+no);
	};
}

function UwTodoListDetailCtrl($rootScope, $scope, $http, $compile, $timeout, $filter, $location, $log, $route, $routeParams) {
	$log.info('Enter UnderWriterTodoListDetailCtrl');
	
	$scope.statusAddcallList = [{"id":"01","name":"นัดได้"},
	                        {"id":"02","name":"นัดไม่ได้"}];
	
	$scope.appointmentList = [{"callTimes":"3","appointmentBy":"นายวิเชียร เลาหบุตร","appointmentDate":"20/07/2557","provinceDistrict":"กรุงเทพมหานคร/จตุจักร","place":"รัชดาภิเษก 32","status":"นัดหมายได้","remark":""},
	                          {"callTimes":"2","appointmentBy":"นายสำเภา นิจจันทร์","appointmentDate":"18/07/2557","provinceDistrict":"กรุงเทพมหานคร/จตุจักร","place":"รัชดาภิเษก 32","status":"นัดหมายไม่ได้","remark":"ติดต่อไม่ได้"},
	                          {"callTimes":"1","appointmentBy":"นายนพดล ชัยชนะกิจการ","appointmentDate":"17/07/2557","provinceDistrict":"กรุงเทพมหานคร/จตุจักร","place":"รัชดาภิเษก 32","status":"นัดหมายไม่ได้","remark":"ติดต่อไม่ได้"}];
	
	
	$scope.surveyorList = [{"surveyorCode":"4","surveyorName":"นายสำเภา นิจจันทร์","surveyorType":"outsource","branch":"บึงคุ่ม","province":"กรุงเทพมหานคร","contactNo":"02-22222222","assignDate":"14/07/2557","surveyorAD":"14/07/2557","status":"Accepted","place":"รัชดาภิเษก"},
	                       {"surveyorCode":"3","surveyorName":"นายวิชาญ รัตนิพนธ์","surveyorType":"เจ้าหน้าที่","branch":"บึงคุ่ม","province":"กรุงเทพมหานคร","contactNo":"02-22222222","assignDate":"14/07/2557","surveyorAD":"14/07/2557","status":"Rejected","place":"จันทรเกษม"},
	                       {"surveyorCode":"2","surveyorName":"นายนพดล ชัยชนะกิจการ","surveyorType":"outsource","branch":"บึงคุ่ม","province":"กรุงเทพมหานคร","contactNo":"02-22222222","assignDate":"14/07/2557","surveyorAD":"14/07/2557","status":"Rejected","place":"รัชดาภิเษก"},
	                       {"surveyorCode":"1","surveyorName":"นายอนุพงษ์ เครืองาม","surveyorType":"เจ้าหน้าที่","branch":"บึงคุ่ม","province":"กรุงเทพมหานคร","contactNo":"02-22222222","assignDate":"14/07/2557","surveyorAD":"14/07/2557","status":"Rejected","place":"จันทรเกษม"}
						  ];
	//rout parameter
	$scope.uwToDoListArr = [{"no":"6","branch":"สำนักงานใหญ่","carNo":"กว 9090 กทม","appNo":"OTISCKPI002490001","chassisNo":"33JHSDFKI239","coverDate":"01/01/57","coverDateTo":"01/01/2558","assured":"นายวิโรจน์ ชูวงศ์","contactName":"นายวิเชียร เลาหบุตร","contactNo":"02-0020023","contactNameAutho":"นางเวลา บุตร","contactNoAutho":"02-0002000","amount":"200 บาท","premium":"1,074.28","statusNameEn":"Complete","appointmentDate":"01/01/2557","province":"กรุงเทพมหานคร","amphur":"จตุจักร","district":"จันทรเกษม","place":"รัชดาภิเษก 32","branch":"กรุงเทพ","surveyor":"นายสำเภา นิจจันทร์","statusNameLc":"นัดหมายได้","remark":"ติดต่อไม่ได้","brand":"BENZ","model":"920","telNo":"02-01245115","color":"แดง","mobileNo":"084-54879565","address":"bangkok"}
	,{"no":"5","branch":"สำนักงานใหญ่","carNo":"จน 5755 กทม","appNo":"OTISCKPI002490002","chassisNo":"SDDFKJO399DSF","coverDate":"10/01/2558","coverDateTo":"01/01/58","assured":"นายพงษ์เทพ ธรรมโสพน","contactName":"นายวิเชียร เลาหบุตร","premium":"757.21","contactNo":"02-0020023","contactNameAutho":"นางเวลา บุตร","contactNoAutho":"02-0002000","amount":"200 บาท","statusNameEn":"Complete","appointmentDate":"01/01/2557","province":"กรุงเทพมหานคร","amphur":"จตุจักร","district":"จันทรเกษม","place":"รัชดาภิเษก 32","branch":"กรุงเทพ","surveyor":"นายสำเภา นิจจันทร์","statusNameLc":"นัดหมายได้","remark":"ติดต่อไม่ได้","brand":"TOYOTA","model":"VIGO","telNo":"02-01245115","color":"ดำ","mobileNo":"084-54879565","address":"bangkok"}
	,{"no":"4","branch":"สำนักงานใหญ่","carNo":"รว 9900 กทม","appNo":"OBASNKPI002490001","chassisNo":"032SDFJLLJSDF","coverDate":"11/12/2557","coverDateTo":"01/01/58","assured":"นายวรวัฒน์ สอนจันทร์","contactName":"นายวิเชียร เลาหบุตร","premium":"757.21","contactNo":"02-0020023","contactNameAutho":"นางเวลา บุตร","contactNoAutho":"02-0002000","amount":"200 บาท","statusNameEn":"Complete","appointmentDate":"01/01/2557","province":"กรุงเทพมหานคร","amphur":"จตุจักร","district":"จันทรเกษม","place":"รัชดาภิเษก 32","branch":"กรุงเทพ","surveyor":"นายสำเภา นิจจันทร์","statusNameLc":"นัดหมายไม่ได้","remark":"ติดต่อไม่ได้","brand":"HONDA","model":"Jazz","telNo":"02-01245115","color":"ขาว","mobileNo":"084-54879565","address":"bangkok"}
	,{"no":"3","branch":"สำนักงานเขต1","carNo":"3กก 1 กทม","appNo":"OBASNKPI002490002","chassisNo":"SDFJE93JSLDKF","coverDate":"12/13/2556","coverDateTo":"01/01/58","assured":"นายวิชัย ศรีบุรินทร์","contactName":"นายวิเชียร เลาหบุตร","premium":"757.21","contactNo":"02-0020023","contactNameAutho":"นางเวลา บุตร","contactNoAutho":"02-0002000","amount":"200 บาท","statusNameEn":"Complete","appointmentDate":"01/01/2557","province":"กรุงเทพมหานคร","amphur":"จตุจักร","district":"จันทรเกษม","place":"รัชดาภิเษก 32","branch":"กรุงเทพ","surveyor":"นายสำเภา นิจจันทร์","statusNameLc":"นัดหมายไม่ได้","remark":"โทรไม่ติด","brand":"NISSAN","model":"NAVARA","telNo":"02-01245115","color":"บรอน","mobileNo":"084-54879565","address":"bangkok"}
	,{"no":"2","branch":"สำนักงานเขต1","carNo":"3กย 99 กทม","appNo":"OBASNKPI002490003","chassisNo":"9432LDKDSJFFD","coverDate":"13/14/2555","coverDateTo":"01/01/58","assured":"นายสงคราม อาจสมบาล","contactName":"นายวิเชียร เลาหบุตร","premium":"757.21","contactNo":"02-0020023","contactNameAutho":"นางเวลา บุตร","contactNoAutho":"02-0002000","amount":"200 บาท","statusNameEn":"Complete","appointmentDate":"01/01/2557","province":"กรุงเทพมหานคร","amphur":"จตุจักร","district":"จันทรเกษม","place":"รัชดาภิเษก 32","branch":"กรุงเทพ","surveyor":"นายสำเภา นิจจันทร์","statusNameLc":"นัดหมายได้","remark":"ติดต่อไม่ได้","brand":"ISUZU","model":"Mu7","telNo":"02-01245115","color":"ฟ้า","mobileNo":"084-54879565","address":"bangkok"}
	,{"no":"1","branch":"สำนักงานเขต2","carNo":"1กด 191 กทม","appNo":"OAKTCKPI002490001","chassisNo":"SDFJKHDSF93DF","coverDate":"14/15/2554","coverDateTo":"01/01/58","assured":"นางจุรีรัตน์ ศรีจันทร์","contactName":"นายวิเชียร เลาหบุตร","contactNo":"02-0020023","contactNameAutho":"นางเวลา บุตร","premium":"18,900.00","contactNoAutho":"02-0002000","amount":"200 บาท","statusNameEn":"Survey Awaiting","appointmentDate":"01/01/2557","province":"กรุงเทพมหานคร","amphur":"จตุจักร","district":"จันทรเกษม","place":"รัชดาภิเษก 32","branch":"กรุงเทพ","surveyor":"นายสำเภา นิจจันทร์","statusNameLc":"ยังไม่ได้นัดหมาย","remark":"ติดต่อไม่ได้","brand":"BENZ","model":"2755i","telNo":"02-01245115","color":"เขียว","mobileNo":"084-54879565","address":"bangkok"}
	/*,{"no":"7","branch":"สำนักงานเขต 3","carNo":"3กด 3 กทม","appNo":"OAKTCKPI002490003","chassisNo":"DSFLSKDF93RFJS","coverDate":"01/01/2557-01/01/2558","assured":"น.ส.อรุณรัตน์ ปวรรัตน์","contactName":"นายวิเชียร เลาหบุตร","premium":"8,080.00","status":"New","appointmentDate":"01/01/2557","surveyor":"นายสำเภา นิจจันทร์","status":"นัดหมายได้","remark":""}
	,{"no":"8","branch":"สำนักงานเขต 4","carNo":"3กล 45 กทม","appNo":"OAKTCKPI002490004","chassisNo":"SDF320IDSFL3","coverDate":"01/01/2557-01/01/2558","assured":"นายพงศกร แก้วเก้า","contactName":"นายวิเชียร เลาหบุตร","premium":"3,000.00","status":"Payment Awaiting","appointmentDate":"01/01/2557","surveyor":"นายสำเภา นิจจันทร์","status":"นัดหมายได้","remark":""}
	,{"no":"9","branch":"สำนักงานเขต 4","carNo":"3กบ 54 กทม","appNo":"OAKTCKPI002490005","chassisNo":"SDFLJ2SDF33DF","coverDate":"01/01/2557-01/01/2558","assured":"นายศักดิ์ชัย อำนายศิลป์","contactName":"นายวิเชียร เลาหบุตร","premium":"12,000.00","status":"Payment Awaiting","appointmentDate":"01/01/2557","surveyor":"นายสำเภา นิจจันทร์","status":"นัดหมายได้","remark":""}
	,{"no":"10","branch":"สำนักงานเขต 4","carNo":"2กด 8 กทม","appNo":"OAKTCKPI002490006","chassisNo":"2JLDFK329DFJ","coverDate":"01/01/2557-01/01/2558","assured":"นายกวี อำนวยศิลป์","contactName":"นายวิเชียร เลาหบุตร","premium":"12,000.00","status":"Complete","appointmentDate":"01/01/2557","surveyor":"นายสำเภา นิจจันทร์","status":"นัดหมายได้","remark":""}*/];

	
	$scope.mode = $routeParams.mode;
	$scope.id = $routeParams.id;
	//check mode
	if($scope.mode == 'create'){
		// Cleart Search Criteria
		$scope.clear = function(){
			$rootScope.criteria = {};
		};
		$scope.uwToDoList ={
				status : 'A'
				
		};
		//Create uwToDoList
		$scope.uwToDoList = function(){
			$scope.isSubmit = true;
			
			if($scope.form.$invalid){ //Validate Form
			
			   $scope.app.addAlert('gritter-error', 'Incorrect data !!!', 4000);
			   return;
			}
			
			//Call Back-End
			$rootScope.isLoading = true;
			_.compactObject($scope.uwToDoList);
			$scope.app.addAlertSuccessInsert();
			$scope.back();
			
		};
		
		//back
		$scope.back = function() {
			$location.path('/underwriter-todo-list');
		};
		
	}else {
		$scope.modeShow = 'edit';
		$scope.uwToDoList = _.findWhere($scope.uwToDoListArr, {'no' : $routeParams.id + ''});
//		$scope.uwToDoList.createdDate = _.toDateTimeStr($scope.uwToDoList.createdDate);
//		$scope.uwToDoList.modifiedDate = _.toDateTimeStr($scope.uwToDoList.modifiedDate);

		//Update Scheduler Job
		$scope.updateUwToDoList = function() {
			$scope.isSubmit = true;
	
			// validate form
			if ($scope.form.$invalid) {
				$scope.app.addAlertInvalid();
				return;
			}
	
			// Call back-end
			$rootScope.isLoading = true;
			_.compactObject($scope.uwToDoList);
			var url = "api/uwToDoList/updateuwToDoList";
			$scope.uwToDoList.modifiedBy = $scope.authorization.getCurrentJobID();
			$http.post(url, $scope.uwToDoList).success(function(data) {
				$scope.app.addAlertSuccessUpdate();
				$scope.back();
			});
		};
		
	}
	
	// function
	$scope.save = function() {
		$scope.isSubmit = true;
		
		// validate form
		if ($scope.form.$invalid) {
			myFunction.alertRequiredFields();
			return;
		}
		
		// insert
		myFunction.confirmSaveBox().result.then(function(ok) {
			if (ok) {
				if ($scope.mode === 'create') {
					$scope.obj.createdUwToDoListId = LoginUwToDoListId.employeeCode;
					$scope.obj.lastUpdatedUwToDoListId = LoginUwToDoListId.employeeCode;
					/*$http.post(APP.CONTEXT_PATH+'/api/listOfValue/insertListOfValue', $scope.obj).success(function(resp) {
						myFunction.alertCreateSuccess();
						$rootScope.isValidateUnsaved = false;
						$scope.back();
					});*/
				}
				else {	// edit
					$scope.obj.lastUpdatedUwToDoListId = LoginUwToDoListId.employeeCode;
					/*$http.post(APP.CONTEXT_PATH+'/api/listOfValue/updateListOfValue', $scope.obj).success(function(resp) {
						myFunction.alertUpdateSuccess();
						$rootScope.isValidateUnsaved = false;
						$scope.back();
					});*/
				}
			};
		});
	};
	
	
	$scope.back = function() {
		$location.path('underwriter-todo-list');
	};
	
}
