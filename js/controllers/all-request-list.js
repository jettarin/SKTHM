angular.module('myApp').config([ '$routeProvider', function($routeProvider) {
	 $routeProvider.when("/all-request-list",
		 {templateUrl: _.toHttpGetUrl("content/request/all-request-list/all-request-list.html"), controller: AllRequestListCtrl});
	 $routeProvider.when("/all-request-list/:mode", {templateUrl:_.toHttpGetUrl('content/request/all-request-list/all-request-detail.html'), controller: AllRequestListDetailCtrl});
	 $routeProvider.when("/all-request-list/:mode/:id", {templateUrl:_.toHttpGetUrl('content/request/all-request-list/all-request-detail.html'), controller: AllRequestListDetailCtrl});

} ]);

function AllRequestListCtrl($rootScope, $scope, $http, $compile, $timeout, $filter, $location) {

	if (!$rootScope.paging) {
		$rootScope.paging = APP.DEFAULT_PAGING;
	}
	if (!$rootScope.criteria) {
		$rootScope.criteria = {};
	}
	
	
	$scope.historyList = [
	                      {"historyNo":"2","status":"Not Pass","date":"31/07/2557 05:05:00","rejReason":"ER001: Invalid Data Not Avaliable Value;ER002: Invalid Data"},
	                      {"historyNo":"1","status":"New","date":"31/07/2557 08:35:15","rejReason":""}];
	
	$scope.schedulerTypeList = [{"id":"01","name":"Cron 1"},
	                        {"id":"02","name":"Cron 2"}];
	
	$scope.jobTypeList = [{"id":"01","name":"JobType 1"},
	                      {"id":"02","name":"JobType 2"}];
	
	$scope.statusList = [{"id":"01","name":"New"},
						 {"id":"02","name":"Pass"},
	                     {"id":"03","name":"Not Pass"}];
	
	$scope.channelList = [{"id":"001","name":"K System"},
							 {"id":"002","name":"Interface File"}];
	// Clear Search Criteria
	$scope.clear = function(){
		$rootScope.criteria = {};
	};
	
	$scope.search = function(){
		
		angular.extend($rootScope.criteria, $rootScope.paging);
		//var url = _.toHttpGetUrl('api/jobLog/findjobLog', $rootScope.criteria);
		//$http.get(url).success(function(data){
		
		$scope.allRequestList = 
		[{"no":"1","reqNo":"ASNKC000086455","reqNoTicket":"ASNKC000086449","itfChannel":"K System","project":"","profileName":"","ref":"TK25570731-002","newRenew":"New","assured":"นายวิโรจน์ ชูวงศ์","effectiveDate":"01/06/2557","expireDate":"01/06/2557","createDate":"31/07/2557","premium":"18,900.00","status":"New","rejReason":"ER001: Invalid Data","fileName":"YESFILE_20140501.txt","historyNo":"2","date":"31/07/2557 05:05:00","rejReason":"ER001: Invalid Data Not Avaliable Value;ER002: Invalid Data"}
		,{"no":"2","reqNo":"ASNKC000086455","reqNoTicket":"ASNKC000086450","itfChannel":"K System","project":"ASN KTC","profileName":"","ref":"TK25570731-001","newRenew":"New","assured":"นายพงษ์เทพ ธรรมโสพล","effectiveDate":"01/06/2557","expireDate":"01/06/2557","createDate":"31/07/2557","premium":"7,900.00","status":"Pass","rejReason":"ER002: Invalid Data","fileName":"YESFILE_20140502.txt","historyNo":"2","date":"31/07/2557 05:05:00","rejReason":"ER022: Invalid Data Not Avaliable Value;ER023: Invalid Data"}
		,{"no":"3","reqNo":"ASNKC000086455","reqNoTicket":"ASNKC000086451","itfChannel":"Interface File","project":"ASN KTC","profileName":"ASN-KTC แจ้งงานใหม่ภาคสมัครใจ","ref":"YesFile_KTC_KPIA_MOTORINS_310757.txt","newRenew":"New","assured":"นายวรวัฒน์ สอนจันทร์","effectiveDate":"01/06/2557","expireDate":"01/06/2557","createDate":"31/07/2557","premium":"3,400.00","status":"Pass","rejReason":"ER003: Invalid Data","fileName":"YESFILE_20140503.txt","historyNo":"2","date":"31/07/2557 05:05:00","rejReason":"ER033: Invalid Data Not Avaliable Value;ER034: Invalid Data"}
		,{"no":"4","reqNo":"ASNKC000086455","reqNoTicket":"ASNKC000086452","itfChannel":"Interface File","project":"ASN KTC","profileName":"ASN-KTC แจ้งต่ออายุภาคสมัครใจ","ref":"YesFile_KTC_KPIA_MOTORINS_310757.txt","newRenew":"New","assured":"นายวิชัย ศรีบุรินทร์","effectiveDate":"01/06/2557","expireDate":"01/06/2557","createDate":"31/07/2557","premium":"600.00","status":"Pass","rejReason":"ER004: Invalid Data","fileName":"CMIEndorse_20140501.txt","historyNo":"2","date":"31/07/2557 05:05:00","rejReason":"ER044: Invalid Data Not Avaliable Value;ER045: Invalid Data"}
		,{"no":"5","reqNo":"ASNKC000086455","reqNoTicket":"ASNKC000086453","itfChannel":"Interface File","project":"ASN","profileName":"ASN-KTC แจ้งงานใหม่ พรบ","ref":"YesFile_KTC_KPIA_MOTORINS_310757.txt","newRenew":"New","assured":"นายสงคราม อาจสมบาล","effectiveDate":"01/06/2557","expireDate":"01/06/2557","createDate":"31/07/2557","premium":"16,345.00","status":"Not Pass","rejReason":"ER005: Invalid Data","fileName":"VMICancel_20140503.txt","historyNo":"2","date":"31/07/2557 05:05:00","rejReason":"ER055: Invalid Data Not Avaliable Value;ER056: Invalid Data"}
		,{"no":"6","reqNo":"ASNKC000086455","reqNoTicket":"ASNKC000086454","itfChannel":"Interface File","project":"ASN","profileName":"ASN-KTC แจ้งงานใหม่ภาคสมัครใจ","ref":"UPDATE_KTC_KPIA_MOTORINS_300757.txt","newRenew":"Renew","assured":"นางจุรีรัตน์ ศรีจันทร์","effectiveDate":"01/06/2557","expireDate":"01/06/2557","createDate":"30/07/2557","premium":"3,500.00","status":"Pass","rejReason":"ER006: Invalid Data","fileName":"CMIEndorse_20140503.txt","historyNo":"2","date":"31/07/2557 05:05:00","rejReason":"ER066: Invalid Data Not Avaliable Value;ER067: Invalid Data"}
		,{"no":"7","reqNo":"ASNKC000086455","reqNoTicket":"ASNKC000086455","itfChannel":"Interface File","project":"ASN","profileName":"ASN-KTC แจ้งยกเลิกภาคสมัครใจ","ref":"UPDATE_KTC_KPIA_MOTORINS_300757.txt","newRenew":"Renew","assured":"นายวิเชียร เลาหบุตร","effectiveDate":"01/06/2557","expireDate":"01/06/2557","createDate":"30/07/2557","premium":"4,000.00","status":"Not Pass","rejReason":"ER007: Invalid Data","fileName":"VMIEndorse_20140501","historyNo":"2","date":"31/07/2557 05:05:00","rejReason":"ER077: Invalid Data Not Avaliable Value;ER078: Invalid Data"}
		];
		

		if ($scope.criteria.jobName != null) {
			$scope.allRequestList = $filter('filter')($scope.allRequestList, function(value){return (value.jobName == $scope.criteria.jobName);});
		}
		
		if ($scope.criteria.status != null & $scope.criteria.status != "") {
			$scope.allRequestList = $filter('filter')($scope.allRequestList, function(value){return (value.status == $scope.criteria.status);});
		}
		
		if($scope.criteria.startDate != null){
			$scope.allRequestList = $filter('filter')($scope.allRequestList, function(value){return (value.startDate == $scope.criteria.startDate);});	
		}
		if($scope.criteria.jobType != null){
			$scope.allRequestList = $filter('filter')($scope.allRequestList, function(value){return (value.jobType == $scope.criteria.jobType);});
		}
		if($scope.criteria.schedulerType != null){
			$scope.allRequestList = $filter('filter')($scope.allRequestList, function(value){return (value.schedulerType == $scope.criteria.schedulerType);});
		}
		if($scope.criteria.completeDate != null){
			$scope.allRequestList = $filter('filter')($scope.allRequestList, function(value){return (value.completeDate == $scope.criteria.completeDate);});
			
		}
		
		
		$rootScope.paging.totalItems = $scope.allRequestList.length;
		$rootScope.paging.showing = _.getShowing($rootScope.paging.pageNumber, $rootScope.paging.limit, $scope.allRequestList.length);
	};		
	$scope.search();
	
	$scope.selectPage = function(page) {
		$rootScope.paging.pageNumber = page;
		$scope.search();
	};
	
	//Delete jobLog
	$scope.deletejobLog = function(deleteOne) {
		$scope.jobIdList = [];
		if(deleteOne != undefined){
			$scope.jobIdList.push(deleteOne);
		}else{
			$('#dtable_ShowjobLog').find('input:checked[name=row_jobLog]').each(function(index, element) {
				$scope.jobIdList.push(element.value);				
			});
		}
		if ( $scope.jobIdList.length != 0 ) {
		  $scope.app.confirmDeleteBox().open().then(function(result) {
				if (result) {				
					//$http['delete']("api/jobLog/deletejobLog/"+$scope.jobIdList.join(",")+"?jobLogCode="+$scope.authorization.getCurrentjobLogCode()).success(function(data) {
						$scope.app.addAlertSuccessDelete();
						$scope.back(); 
						$scope.checked = false;
					//});
				};
		  });	        	  
		};
	};
	
	
	$scope.gotoCreate = function() {
		$location.path('all-request-list/create');
	};
	
	$scope.gotoEdit = function(no) {
		$location.path('all-request-list/edit/'+no);
	};
	
	$scope.gotoInterfaceLog = function() {
		$location.path('interface-log');
	};
	
	
	
};

function AllRequestListDetailCtrl($rootScope, $scope, $http, $compile, $filter, $timeout, $routeParams, $location, $log) {
	$log.info('Enter AllRequestListDetailCtrl');
	
	
			
	
	
		// Interface Profile List
			$scope.allRequestList = [{"no":"001","batchId":"001","refNo":"12345","projectName":"KTC","broker":"TISCO","policyType":"พ.ร.บ","appNo":"OTISCKPI002490001","requestDate":"17/07/2557","policyNo":"01AHI00124","coverDate":"01/01/2557","name":"นายพงษ์เทพ ธรรมโสพน","licenseNo":"กว-8132 กรุงเทพ","accountNo":"567045-8901-7888","expireDate":"20/07/2560","period":"6","counselor":"นายวิเชียร เลาหบุตร","premium":"1,074.28","status":"Open","createDate":"01/01/2557 08:00:00"}
			,{"no":"002","batchId":"002","refNo":"12346","projectName":"KTB","broker":"TISCO","policyType":"พ.ร.บ","appNo":"OTISCKPI002490002","policyNo":"01AHI00124","requestDate":"17/07/2557","coverDate":"01/01/2557","name":"นายพงษ์เทพ ธรรมโสพน","licenseNo":"กว-8132 กรุงเทพ","counselor":"นายวิเชียร เลาหบุตร","accountNo":"567045-8901-7888","expireDate":"20/07/2560","period":"4","premium":"757.21","status":"Close","createDate":"01/01/2557 08:00:00"}
			,{"no":"003","batchId":"003","refNo":"12347","projectName":"GTMM","broker":"ASN","policyType":"พ.ร.บ","appNo":"OBASNKPI002490001","policyNo":"01AHI00124","requestDate":"17/07/2557","coverDate":"01/01/2557","name":"นายวรวัฒน์ สอนจันทร์","licenseNo":"กว-8132 กรุงเทพ","counselor":"นายวิเชียร เลาหบุตร","accountNo":"567045-8901-7888","expireDate":"20/07/2560","period":"2","premium":"757.21","status":"Open","createDate":"01/01/2557 08:00:00"}
			];
		
	$scope.mode = $routeParams.mode;
	$scope.id = $routeParams.id;
		
	if ($scope.mode === 'create') {
		$scope.allRequest = {
			status : 'A'
		};
	} 
	else {
		
		//History popup List
		$scope.historyList = [{"historyNo":"2","status":"Rejected","date":"31/07/2557"},
		                      {"historyNo":"1","status":"New","date":"31/07/2557"}];
	
		$scope.allRequestList =  [{"no":"001","batchId":"001","refNo":"12345","projectName":"KTC","broker":"TISCO","policyType":"พ.ร.บ","appNo":"OTISCKPI002490001","requestDate":"17/07/2557","policyNo":"01AHI00124","openDate":"01/01/2557","name":"นายพงษ์เทพ ธรรมโส","licenseNo":"กว-8132 กรุงเทพ","accountNo":"567045-8901-7888","expireDate":"20/07/2560","period":"8","counselor":"นายวิเชียร เลาหบุตร","premium":"1,074.28","status":"O","remark":"ติดต่อไม่ได้","createDate":"01/01/2557 08:00:00","rebill":"N","approve":""}
		
		];
	
		if ($scope.id != null) {
			$scope.allRequest = _.findWhere($scope.allRequestList, {batchId: $scope.id});
		}
		
	}
	
	$scope.back = function() {
		$location.path('all-request-list');
	};
	
	
	
}