angular.module('myApp').config([ '$routeProvider', function($routeProvider) {
	$routeProvider.when("/surveyor-todo-list", {templateUrl: _.toHttpGetUrl('content/risk-survey/surveyor-todo-list.html'), controller: SurveyorTodoListCtrl});
	$routeProvider.when("/surveyor-todo-list/:mode", {templateUrl: _.toHttpGetUrl('content/risk-survey/surveyor-todo-detail.html'), controller: SurveyorTodoListDetailCtrl});
	$routeProvider.when("/surveyor-todo-list/:mode/:id", {templateUrl: _.toHttpGetUrl('content/risk-survey/surveyor-todo-detail.html'), controller: SurveyorTodoListDetailCtrl});
} ]);

function SurveyorTodoListCtrl($rootScope, $scope, $http, $compile, $timeout, $filter, $location, $log, $route, $routeParams) {
	$log.info('Enter AllReviewListCtrl');
	
	if (!$rootScope.paging) {
		$rootScope.paging = APP.DEFAULT_PAGING;
	}
	if (!$rootScope.criteria) {
		$rootScope.criteria = {};
	}
	
	// Clear Search Criteria
	$scope.clear = function(){
		$rootScope.criteria = {};
	};
	
	$scope.surveyorList = [{"surveyorCode":"00001","surveyorName":"นายสำเภา นิจจันทร์"},
	                       {"surveyorCode":"00002","surveyorName":"นายวิชาญ รัตนิพนธ์"},
	                       {"surveyorCode":"00003","surveyorName":"นายนพดล ชัยชนะกิจการ"},
	                       {"surveyorCode":"00004","surveyorName":"นายอนุพงษ์ เครืองาม"}
						  ];
	
	$scope.search = function(){
		$scope.surveyList = [{"no":"6","branch":"สำนักงานใหญ่","carNo":"กว 9090 กทม","appNo":"AP5707-00001","chassisNo":"33JHSDFKI239","coverDate":"01/01/2557","coverDateTo":"01/01/2558","assured":"นายวิโรจน์ ชูวงศ์","contactName":"นายวิเชียร เลาหบุตร","contactNo":"02-0020023","contactNameAutho":"นางเวลา บุตร","contactNoAutho":"02-0002000","amount":"200 บาท","premium":"1,074.28","statusNameEn":"Complete","appointmentDate":"01/01/2557","province":"กรุงเทพมหานคร","amphur":"จตุจักร","district":"จันทรเกษม","place":"รัชดาภิเษก 32","branch":"กรุงเทพ","surveyor":"นายสำเภา นิจจันทร์","statusNameLc":"นัดหมายได้","riskSurveyStatus":"Assigned Task","remark":"ติดต่อไม่ได้","telNo":"02-01245115","color":"แดง","mobileNo":"084-54879565"}
	,{"no":"5","branch":"สำนักงานใหญ่","carNo":"จน 5755 กทม","appNo":"AP5707-00002","chassisNo":"SDDFKJO399DSF","coverDate":"10/01/2558","coverDateTo":"01/01/2558","assured":"นายพงษ์เทพ ธรรมโสพน","contactName":"นายวิเชียร เลาหบุตร","premium":"757.21","contactNo":"02-0020023","contactNameAutho":"นางเวลา บุตร","contactNoAutho":"02-0002000","amount":"200 บาท","statusNameEn":"Complete","appointmentDate":"01/01/2557","province":"กรุงเทพมหานคร","amphur":"จตุจักร","district":"จันทรเกษม","place":"รัชดาภิเษก 32","branch":"กรุงเทพ","surveyor":"นายสำเภา นิจจันทร์","statusNameLc":"นัดหมายได้","remark":"ติดต่อไม่ได้","riskSurveyStatus":"Assigned Task","telNo":"02-01245115","color":"ดำ","mobileNo":"084-54879565"}
	,{"no":"4","branch":"สำนักงานใหญ่","carNo":"รว 9900 กทม","appNo":"AP5707-00003","chassisNo":"032SDFJLLJSDF","coverDate":"11/12/2557","coverDateTo":"01/01/2558","assured":"นายวรวัฒน์ สอนจันทร์","contactName":"นายวิเชียร เลาหบุตร","premium":"757.21","contactNo":"02-0020023","contactNameAutho":"นางเวลา บุตร","contactNoAutho":"02-0002000","amount":"200 บาท","statusNameEn":"Complete","appointmentDate":"01/01/2557","province":"กรุงเทพมหานคร","amphur":"จตุจักร","district":"จันทรเกษม","place":"รัชดาภิเษก 32","branch":"กรุงเทพ","surveyor":"นายวิชาญ รัตนิพนธ์","statusNameLc":"นัดหมายไม่ได้","remark":"ติดต่อไม่ได้","riskSurveyStatus":"Accepted Task","telNo":"02-01245115","color":"ฟ้า","mobileNo":"084-54879565"}
	,{"no":"3","branch":"สำนักงานเขต1","carNo":"3กก 1 กทม","appNo":"AP5707-00004","chassisNo":"SDFJE93JSLDKF","coverDate":"12/13/2556","coverDateTo":"01/01/2558","assured":"นายวิชัย ศรีบุรินทร์","contactName":"นายวิเชียร เลาหบุตร","premium":"757.21","contactNo":"02-0020023","contactNameAutho":"นางเวลา บุตร","contactNoAutho":"02-0002000","amount":"200 บาท","statusNameEn":"Complete","appointmentDate":"01/01/2557","province":"กรุงเทพมหานคร","amphur":"จตุจักร","district":"จันทรเกษม","place":"รัชดาภิเษก 32","branch":"กรุงเทพ","surveyor":"นายสำเภา นิจจันทร์","statusNameLc":"นัดหมายไม่ได้","remark":"โทรไม่ติด","riskSurveyStatus":"Accepted Task","telNo":"02-01245115","color":"น้ำเงิน","mobileNo":"084-54879565"}
	,{"no":"2","branch":"สำนักงานเขต1","carNo":"3กย 99 กทม","appNo":"AP5707-00005","chassisNo":"9432LDKDSJFFD","coverDate":"13/14/2555","coverDateTo":"01/01/2558","assured":"นายสงคราม อาจสมบาล","contactName":"นายวิเชียร เลาหบุตร","premium":"757.21","contactNo":"02-0020023","contactNameAutho":"นางเวลา บุตร","contactNoAutho":"02-0002000","amount":"200 บาท","statusNameEn":"Complete","appointmentDate":"01/01/2557","province":"กรุงเทพมหานคร","amphur":"จตุจักร","district":"จันทรเกษม","place":"รัชดาภิเษก 32","branch":"กรุงเทพ","surveyor":"นายนพดล ชัยชนะกิจการ","statusNameLc":"นัดหมายได้","remark":"ติดต่อไม่ได้","riskSurveyStatus":"Accepted Task","telNo":"02-01245115","color":"เหลือง","mobileNo":"084-54879565"}
	,{"no":"1","branch":"สำนักงานเขต2","carNo":"1กด 191 กทม","appNo":"AP5707-00006","chassisNo":"SDFJKHDSF93DF","coverDate":"14/15/2554","coverDateTo":"01/01/2558","assured":"นางจุรีรัตน์ ศรีจันทร์","contactName":"นายวิเชียร เลาหบุตร","contactNo":"02-0020023","contactNameAutho":"นางเวลา บุตร","premium":"18,900.00","contactNoAutho":"02-0002000","amount":"200 บาท","statusNameEn":"Survey Awaiting","appointmentDate":"01/01/2557","province":"กรุงเทพมหานคร","amphur":"จตุจักร","district":"จันทรเกษม","place":"รัชดาภิเษก 32","branch":"กรุงเทพ","surveyor":"นายอนุพงษ์ เครืองาม","statusNameLc":"ยังไม่ได้นัดหมาย","remark":"ติดต่อไม่ได้","riskSurveyStatus":"Accepted Task","telNo":"02-01245115","color":"บรอน","mobileNo":"084-54879565"}
	];
		
		$scope.gotoRemark = function(id) {
			$scope.survey = _.findWhere($scope.surveyList, {'appNo': id +''});
			$scope.surveyList.remark = $scope.survey.remark;
		};
		
		if ($scope.criteria.appNo != null) {
			$scope.surveyList = $filter('filter')($scope.surveyList, function(value){return (value.appNo == $scope.criteria.appNo);});
		}
		
		$rootScope.paging.totalItems = $scope.surveyList.length;
		$rootScope.paging.showing = _.getShowing($rootScope.paging.pageNumber, $rootScope.paging.limit, $scope.surveyList.length);
		
	};
	
	$scope.search();
	
	$scope.gotoEdit = function(id) {
		$location.path('surveyor-todo-list/edit/'+id);
	};
	
	$scope.rejectSelected = function() {
		var deleteList = [];
		$('input:checked[name=row_sel]').each(function(index, element) {
			deleteList.push(element.value);
		});
		
		if (deleteList.length > 0) {
			myFunction.confirmRejectBox().result.then(function(ok) {
				if (ok) {
					myFunction.alertRejectSuccess();
					/*$http.post(APP.CONTEXT_PATH+'/api/listOfValue/deleteListOfValue', deleteList).success(function(resp) {
						myFunction.alertDeleteSuccess();
						$scope.search();
					});*/
				};
			});
		}
	};
	
}

function SurveyorTodoListDetailCtrl($rootScope, $scope, $http, $compile, $timeout, $filter, $location, $log, $route, $routeParams) {
	$log.info('Enter AllReviewListDetailCtrl');
	
	$scope.surveyList = [{"no":"1","branch":"สำนักงานใหญ่","carNo":"กว 9090 กทม","appNo":"OTISCKPI002490001","chassisNo":"33JHSDFKI239","coverDate":"01/01/57-01/01/58","assured":"นายวิโรจน์ ชูวงศ์","contactName":"นายวิเชียร เลาหบุตร","premium":"1,074.28","status":"Complete","appointmentDate":"01/01/57","surveyor":"นายสำเภา นิจจันทร์","status":"นัดหมายได้","remark":"","appointmentStatus":true}
	,{"no":"2","branch":"สำนักงานใหญ่","carNo":"จน 5755 กทม","appNo":"OTISCKPI002490002","chassisNo":"SDDFKJO399DSF","coverDate":"01/01/57-01/01/58","assured":"นายพงษ์เทพ ธรรมโสพน","contactName":"นายวิเชียร เลาหบุตร","premium":"757.21","status":"Complete","appointmentDate":"01/01/57","surveyor":"นายสำเภา นิจจันทร์","status":"นัดหมายได้","remark":"","appointmentStatus":false}
	,{"no":"3","branch":"สำนักงานใหญ่","carNo":"รว 9900 กทม","appNo":"OBASNKPI002490001","chassisNo":"032SDFJLLJSDF","coverDate":"01/01/57-01/01/58","assured":"นายวรวัฒน์ สอนจันทร์","contactName":"นายวิเชียร เลาหบุตร","premium":"757.21","status":"Complete","appointmentDate":"","surveyor":"นายสำเภา นิจจันทร์","status":"นัดหมายไม่ได้","remark":"ติดต่อไม่ได้","appointmentStatus":false}
	,{"no":"4","branch":"สำนักงานเขต1","carNo":"3กก 1 กทม","appNo":"OBASNKPI002490002","chassisNo":"SDFJE93JSLDKF","coverDate":"01/01/57-01/01/58","assured":"นายวิชัย ศรีบุรินทร์","contactName":"นายวิเชียร เลาหบุตร","premium":"757.21","status":"Complete","appointmentDate":"","surveyor":"นายสำเภา นิจจันทร์","status":"นัดหมายไม่ได้","remark":"โทรไม่ติด","appointmentStatus":true}
	,{"no":"5","branch":"สำนักงานเขต1","carNo":"3กย 99 กทม","appNo":"OBASNKPI002490003","chassisNo":"9432LDKDSJFFD","coverDate":"01/01/57-01/01/58","assured":"นายสงคราม อาจสมบาล","contactName":"นายวิเชียร เลาหบุตร","premium":"757.21","status":"Complete","appointmentDate":"01/01/57","surveyor":"นายสำเภา นิจจันทร์","status":"นัดหมายได้","remark":"","appointmentStatus":true}
	,{"no":"6","branch":"สำนักงานเขต2","carNo":"1กด 191 กทม","appNo":"OAKTCKPI002490001","chassisNo":"SDFJKHDSF93DF","coverDate":"01/01/57-01/01/58","assured":"นางจุรีรัตน์ ศรีจันทร์","contactName":"นายวิเชียร เลาหบุตร","premium":"18,900.00","status":"Survey Awaiting","appointmentDate":"","surveyor":"นายสำเภา นิจจันทร์","status":"ยังไม่ได้นัดหมาย","remark":"","appointmentStatus":false}];
	
	$("[name='appMentStatus']").bootstrapSwitch();
	$scope.mode = $routeParams.mode;
	$scope.detailList = _.findWhere($scope.surveyList, {'appNo': $routeParams.id +''});
	
//	$('#coverDate').prop('readonly', 'readonly');
	
	$scope.back = function() {
		$location.path('/surveyor-todo-list');
	};
	
}
