angular.module('myApp').config([ '$routeProvider', function($routeProvider) {
	$routeProvider.when('/all-review', {templateUrl: _.toHttpGetUrl('content/risk-survey/all-review-list.html'), controller: AllReviewListCtrl});
	$routeProvider.when("/all-review/:mode", {templateUrl: _.toHttpGetUrl('content/risk-survey/all-review-detail.html'), controller: AllReviewListDetailCtrl});
	$routeProvider.when("/all-review/:mode/:id", {templateUrl: _.toHttpGetUrl('content/risk-survey/all-review-detail.html'), controller: AllReviewListDetailCtrl});
} ]);

function AllReviewListCtrl($rootScope, $scope, $http, $compile, $timeout, $filter, $location, $log, $route, $routeParams) {
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
		$scope.surveyList = [{"no":"1","branch":"สำนักงานใหญ่","carNo":"กว 9090 กทม","appNo":"AP5708-00001","chassisNo":"33JHSDFKI239","coverDate":"31/08/2557","assured":"นายวิโรจน์ ชูวงศ์","contactName":"นายวิเชียร เลาหบุตร","premium":"18,900.00","status":"Complete","appointmentDate":"10/09/2557","surveyor":"นายสำเภา นิจจันทร์","status":"นัดหมายได้","remark":""}
		,{"no":"2","branch":"สำนักงานใหญ่","carNo":"จน 5755 กทม","appNo":"AP5708-00002","chassisNo":"SDDFKJO399DSF","coverDate":"31/08/2557","assured":"นายพงษ์เทพ ธรรมโสพน","contactName":"นายวิเชียร เลาหบุตร","premium":"19,000.00","status":"Complete","appointmentDate":"10/09/2557","surveyor":"นายวิชาญ รัตนิพนธ์","status":"นัดหมายได้","remark":""}
		,{"no":"3","branch":"สำนักงานใหญ่","carNo":"รว 9900 กทม","appNo":"AP5708-00003","chassisNo":"032SDFJLLJSDF","coverDate":"31/08/2557","assured":"นายวรวัฒน์ สอนจันทร์","contactName":"นายวิเชียร เลาหบุตร","premium":"16,700.00","status":"Complete","appointmentDate":"","surveyor":"นายสำเภา นิจจันทร์","status":"นัดหมายไม่ได้","remark":"ติดต่อไม่ได้"}
		,{"no":"4","branch":"สำนักงานเขต1","carNo":"3กก 1 กทม","appNo":"AP5708-00004","chassisNo":"SDFJE93JSLDKF","coverDate":"31/08/2557","assured":"นายวิชัย ศรีบุรินทร์","contactName":"นายวิเชียร เลาหบุตร","premium":"18,900.00","status":"Complete","appointmentDate":"","surveyor":"นายสำเภา นิจจันทร์","status":"นัดหมายไม่ได้","remark":"โทรไม่ติด"}
		,{"no":"5","branch":"สำนักงานเขต1","carNo":"3กย 99 กทม","appNo":"AP5708-00005","chassisNo":"9432LDKDSJFFD","coverDate":"31/08/2557","assured":"นายสงคราม อาจสมบาล","contactName":"นายวิเชียร เลาหบุตร","premium":"17,900.00","status":"Complete","appointmentDate":"10/09/2557","surveyor":"นายสำเภา นิจจันทร์","status":"นัดหมายได้","remark":""}
		,{"no":"6","branch":"สำนักงานเขต2","carNo":"1กด 191 กทม","appNo":"AP5708-00006","chassisNo":"SDFJKHDSF93DF","coverDate":"31/08/2557","assured":"นางจุรีรัตน์ ศรีจันทร์","contactName":"นายวิเชียร เลาหบุตร","premium":"18,900.00","status":"Survey Awaiting","appointmentDate":"","surveyor":"นายสำเภา นิจจันทร์","status":"ยังไม่ได้นัดหมาย","remark":""}];
		
		if ($scope.criteria.surveyor != null) {
			$scope.surveyList = $filter('filter')($scope.surveyList, function(value){return (value.surveyor == $scope.criteria.surveyor);});
		}
		
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
		$location.path('all-review/edit/'+id);
	};
}

function AllReviewListDetailCtrl($rootScope, $scope, $http, $compile, $timeout, $filter, $location, $log, $route, $routeParams) {
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
	
	$('input[id=inputFile]').change(function() {
		$('#upload').val($(this).val());
	});
	
	/*$('#chkDate').datetimepicker();*/
	
	$scope.back = function() {
		$location.path('/all-review');
	};
	
}
