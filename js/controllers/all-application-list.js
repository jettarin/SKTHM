angular.module('myApp').config([ '$routeProvider', function($routeProvider) {
	 $routeProvider.when("/all-application-list", {templateUrl: _.toHttpGetUrl("content/application/all-application-list/all-application-list.html"), controller: AllApplicationListCtrl});
	 $routeProvider.when('/all-app-detail/:id', {templateUrl: _.toHttpGetUrl('content/application/all-app-detail.html'), controller: ApplicationDetailCtrl});
} ]);

function AllApplicationListCtrl($rootScope, $scope, $http, $compile, $timeout, $filter, $location) {

	if (!$rootScope.paging) {
		$rootScope.paging = APP.DEFAULT_PAGING;
	}
	if (!$rootScope.criteria) {
		$rootScope.criteria = {};
	}
	
	
	$scope.classList = [{"classId":"001","className":"MV"},
	                    {"classId":"002","className":"MC"},
	                    {"ClassId":"003","className":"NM"}];
	
	$scope.schedulerTypeList = [{"id":"01","name":"Cron 1"},
	                        {"id":"02","name":"Cron 2"}];
	
	$scope.jobTypeList = [{"id":"01","name":"JobType 1"},
	                      {"id":"02","name":"JobType 2"}];
	
	$scope.statusList = [{"id":"01","name":"รอการชำระเงิน"},
                     {"id":"02","name":"ชำระเงินไม่ผ่าน"},
                     {"id":"03","name":"รอยืนยันจากธนาคาร"},
                     {"id":"04","name":"ชำระแล้ว"},
                     {"id":"05","name":"รอตรวจสภาพรถ"},
                     {"id":"06","name":"รออนุมัติผลตรวจสภาพรถ"},
                     {"id":"07","name":"ตรวจสภาพรถผ่าน"},
                     {"id":"08","name":" "},
                     {"id":"09","name":"รอออกกรมธรรม์"},
                     {"id":"010","name":"สร้างกรมธรรม์"},
                     {"id":"011","name":"ยกเลิก"}
                     ];
	

	$scope.projectList = 
		[{"projectId":"001","projectName":"ASN"},
		 {"projectId":"002","projectName":"ASN-KTC"},
		 {"projectId":"003","projectName":"I-SERVE"},
		 {"projectId":"004","projectName":"KTC"},
		 {"projectId":"005","projectName":"KTB"},
		 {"projectId":"006","projectName":"GTMM"},
		 {"projectId":"007","projectName":"KTC-3RD"},
		 {"projectId":"008","projectName":"IDMC"},
		 {"projectId":"009","projectName":"IDMC2"},
		 {"projectId":"010","projectName":"STB"},
		 {"projectId":"011","projectName":"KTB-InHouse"},
		 {"projectId":"012","projectName":"KTC-IDMC"},
		 {"projectId":"013","projectName":"KTC-InHouse"},
		 {"projectId":"014","projectName":"ASN-KTC"},
		 {"projectId":"015","projectName":"InHouse Non"}];

	$scope.productList = [{"ProjectId":"001","productId":"001","productName":"พรบ"},
			  {"ProjectId":"001","productId":"002","productName":"ภาคสมัครใจชั้น 1"},
			  {"ProjectId":"001","productId":"003","productName":"ภาคสมัครใจชั้น 2"},
			  {"ProjectId":"001","productId":"004","productName":"ภาคสมัครใจชั้น 2+"},
			  {"ProjectId":"001","productId":"005","productName":"ภาคสมัครใจชั้น 3"},
			  {"ProjectId":"001","productId":"006","productName":"ภาคสมัครใจชั้น 3+"},
			  {"ProjectId":"001","productId":"007","productName":"ภาคสมัครใจชั้น 4"},
			  {"ProjectId":"002","productId":"008","productName":"พรบ"},
			  {"ProjectId":"002","productId":"009","productName":"ภาคสมัครใจชั้น 1"},
			  {"ProjectId":"002","productId":"010","productName":"ภาคสมัครใจชั้น 2"},
			  {"ProjectId":"002","productId":"011","productName":"ภาคสมัครใจชั้น 2+"},
			  {"ProjectId":"002","productId":"012","productName":"ภาคสมัครใจชั้น 3"},
			  {"ProjectId":"002","productId":"013","productName":"ภาคสมัครใจชั้น 3+"},
			  {"ProjectId":"002","productId":"014","productName":"ภาคสมัครใจชั้น 4"},
			  {"ProjectId":"003","productId":"015","productName":"พรบ"},
			  {"ProjectId":"003","productId":"016","productName":"ภาคสมัครใจชั้น 1"},
			  {"ProjectId":"003","productId":"017","productName":"ภาคสมัครใจชั้น 2"},
			  {"ProjectId":"003","productId":"018","productName":"ภาคสมัครใจชั้น 2+"},
			  {"ProjectId":"003","productId":"019","productName":"ภาคสมัครใจชั้น 3"},
			  {"ProjectId":"003","productId":"020","productName":"ภาคสมัครใจชั้น 3+"},
			  {"ProjectId":"003","productId":"021","productName":"ภาคสมัครใจชั้น 4"},
			  {"ProjectId":"004","productId":"023","productName":"1P01 : พิทักษ์ภัย"},
			  {"ProjectId":"004","productId":"024","productName":"1P02 : ทวีทรัพย์"},
			  {"ProjectId":"004","productId":"025","productName":"1P03 : ครอบครัวอุ่นใจ"},
			  {"ProjectId":"004","productId":"026","productName":"1P04 : ทวีสิทธิ์"},
			  {"ProjectId":"004","productId":"027","productName":"1P05 : คุ้มครองเพิ่มค่า"},
			  {"ProjectId":"004","productId":"028","productName":"1P06 : พิทักษ์งาน"},
			  {"ProjectId":"004","productId":"029","productName":"1P07 : ชดเชยเพิ่มค่า"},
			  {"ProjectId":"004","productId":"030","productName":"1B01 : เพิ่มค่าทวีสุข"},
			  {"ProjectId":"004","productId":"031","productName":"1H01 : Home Care Plan"},
			  {"ProjectId":"004","productId":"032","productName":"1M01 : Cancer Plus"},
			  {"ProjectId":"005","productId":"033","productName":"2P01 : กรุงไทยชดเชยเพิ่มทรัพย์"},
			  {"ProjectId":"005","productId":"035","productName":"2P02 : กรุงไทยโบนัสสุขใจ"},
			  {"ProjectId":"005","productId":"036","productName":"2P03 : กรุงไทยเอ็กซ์ตร้าแคร์"},
			  {"ProjectId":"005","productId":"037","productName":"2P04 : กรุงไทยห่วงใยให้คืน"},
			  {"ProjectId":"005","productId":"038","productName":"2P05 : คุ้มครองสองเท่า"},
			  {"ProjectId":"005","productId":"039","productName":"2H01 : แผนกรุงไทยชดเชยรายได้"},
			  {"ProjectId":"005","productId":"040","productName":"2M01 : แผนกรุงไทยคุ้มครองมะเร็ง"},
			  {"ProjectId":"006","productId":"041","productName":"3P01 : ห่วงใยเพิ่มค่า"},
			  {"ProjectId":"007","productId":"042","productName":"4P01 : ครอบครัวสุขใจ"},
			  {"ProjectId":"007","productId":"043","productName":"4P02 : PA Future Plus"},
			  {"ProjectId":"007","productId":"044","productName":"4P03 : PA Extra Protect"},
			  {"ProjectId":"007","productId":"045","productName":"4M01 : สุขภาพปลอดภัย"},
			  {"ProjectId":"008","productId":"046","productName":"5P01 : PA Happy Life"},
			  {"ProjectId":"008","productId":"047","productName":"5P02 : PA Happy Bonus"},
			  {"ProjectId":"008","productId":"048","productName":"5H01 : Medicare"},
			  {"ProjectId":"008","productId":"049","productName":"5M01 : Cancer Care"},
			  {"ProjectId":"009","productId":"050","productName":"6P01 : PA Happy Bonus"},
			  {"ProjectId":"010","productId":"051","productName":"7P01 : PA ยิ้มได้สุขใจ"},
			  {"ProjectId":"010","productId":"052","productName":"7P02 : Senior Care"},
			  {"ProjectId":"010","productId":"053","productName":"7H01 : Healthy Benefit"},
			  {"ProjectId":"010","productId":"054","productName":"7H02 : Healthy Benefit"},
			  {"ProjectId":"011","productId":"055","productName":"8H01 : Medicare Plus"},
			  {"ProjectId":"012","productId":"056","productName":"9P01 : PA Future Plus"},
			  {"ProjectId":"012","productId":"057","productName":"9H01 : Medicare Plue"},
			  {"ProjectId":"013","productId":"058","productName":"10PA : PA Future Plus"},
			  {"ProjectId":"014","productId":"059","productName":"11HE : Happy Health"},
			  {"ProjectId":"014","productId":"060","productName":"11PA : PA Extra Protect 2"},
			  {"ProjectId":"014","productId":"061","productName":"12PA : Smart PA"},
			  {"ProjectId":"015","productId":"062","productName":"13PA : PA Double Care 1"}
			  ];

	// Clear Search Criteria
	$scope.clear = function(){
		$rootScope.criteria = {};
	};
	
	$scope.search = function(){
		
		angular.extend($rootScope.criteria, $rootScope.paging);
		//var url = _.toHttpGetUrl('api/jobLog/findjobLog', $rootScope.criteria);
		//$http.get(url).success(function(data){
		
		$scope.allApplicationList = 
			[{"no":"1","appNo":"AP5705-00010","seqNo":"1","project":"ASN KTC","productId":"001","product":"ภาคสมัครใจชั้น 1","class":"MV","reqNo":"ASNKC000086449","assured":"นายวิโรจน์ ชูวงศ์","effectiveDate":"01/06/2557","expireDate":"01/06/2558","requestDate":"01/05/2557","premium":"18,900.00","status":"รอการชำระเงิน"}
			,{"no":"2","appNo":"AP5705-00009","seqNo":"1","project":"ASN KTC","productId":"002","product":"ภาคสมัครใจชั้น 2","class":"MV","reqNo":"ASNKC000086450","assured":"นายพงษ์เทพ ธรรมโสพล","effectiveDate":"01/06/2557","expireDate":"01/06/2558","requestDate":"01/05/2557","premium":"7,900.00","status":"ชำระไม่ผ่าน"}
			,{"no":"3","appNo":"AP5705-00008","seqNo":"1","project":"ASN KTC","productId":"003","product":"ภาคสมัครใจชั้น 3","class":"MV","reqNo":"ASNKC000086451","assured":"นางจันทร์ฉาย สมส่วน","effectiveDate":"01/06/2557","expireDate":"01/06/2558","requestDate":"01/05/2557","premium":"3,400.00","status":"รอยืนยันจากธนาคาร"}
			,{"no":"4","appNo":"AP5705-00007","seqNo":"1","project":"ASN KTC","productId":"004","product":"พรบ","class":"MC","reqNo":"ASNKC000086452","assured":"นายวิชัย ศรีบุรินทร์","effectiveDate":"01/06/2557","expireDate":"01/06/2558","requestDate":"01/05/2557","premium":"600.00","status":"สร้างกรมธรรม์"}
			,{"no":"5","appNo":"AP5705-00006","seqNo":"1","project":"ASN","productId":"001","product":"ภาคสมัครใจชั้น 1","class":"MV","reqNo":"ASNKC000086453","assured":"นายสงคราม อาจสมบาล","effectiveDate":"01/06/2557","expireDate":"01/06/2558","requestDate":"01/05/2557","premium":"16,345.00","status":"รอตรวจสภาพรถ"}
			,{"no":"6","appNo":"AP5705-00005","seqNo":"1","project":"ASN","productId":"002","product":"ภาคสมัครใจชั้น 3","class":"MV","reqNo":"ASNKC000086454","assured":"นางจุรีรัตน์ ศรีจันทร์","effectiveDate":"01/06/2557","expireDate":"01/06/2558","requestDate":"01/05/2557","premium":"3,500.00","status":"ตรวจสภาพรถผ่าน"}
			,{"no":"7","appNo":"AP5705-00004","seqNo":"1","project":"ASN","productId":"005","product":"ภาคสมัครใจชั้น 3+","class":"MV","reqNo":"ASNKC000086455","assured":"นายวิเชียร เลาหบุตร","effectiveDate":"01/06/2557","expireDate":"01/06/2558","requestDate":"01/05/2557","premium":"4,000.00","status":"สร้างกรมธรรม์"}
			,{"no":"8","appNo":"AP5705-00003","seqNo":"1","project":"ASN","productId":"004","product":"พรบ","class":"MC","reqNo":"ASNKC000086456","assured":"นายวรวัฒน์ สอนจันทร์","effectiveDate":"01/06/2557","expireDate":"01/06/2558","requestDate":"01/05/2557","premium":"700.00","status":"รออนุมัติผลตรวจสภาพรถ"}
			,{"no":"9","appNo":"KPIST01608","seqNo":"1","project":"KTC","productId":"004","product":"Cancer Plus","class":"NM","reqNo":"ASNKC000086456","assured":"นายสมชาย กิจสมบูรณ์","effectiveDate":"01/05/2554","expireDate":"01/06/2556","requestDate":"01/05/2554","premium":"70.00","status":"รอออกกรมธรรม์"}
			,{"no":"10","appNo":"KPIST01609","seqNo":"1","project":"KTC","productId":"004","product":"Cancer Plus","class":"NM","reqNo":"ASNKC000086456","assured":"นายสมชาย กิจสมบูรณ์","effectiveDate":"01/05/2550","expireDate":"01/06/2552","requestDate":"01/05/2550","premium":"70.00","status":"รอออกกรมธรรม์"}];
			

		if ($scope.criteria.project != null) {
			$scope.allApplicationList = $filter('filter')($scope.allApplicationList, function(value){return (value.project == $scope.criteria.project);});
		}
		if ($scope.criteria.product != null) {
			$scope.allApplicationList = $filter('filter')($scope.allApplicationList, function(value){return (value.product == $scope.criteria.product);});
		}
		if ($scope.criteria.project != null) {
			$scope.allApplicationList = $filter('filter')($scope.allApplicationList, function(value){return (value.project == $scope.criteria.project);});
		}
		
		if ($scope.criteria.status != null & $scope.criteria.status != "") {
			$scope.allApplicationList = $filter('filter')($scope.allApplicationList, function(value){return (value.status == $scope.criteria.status);});
		}
		
		
		
		
		$rootScope.paging.totalItems = $scope.allApplicationList.length;
		$rootScope.paging.showing = _.getShowing($rootScope.paging.pageNumber, $rootScope.paging.limit, $scope.allApplicationList.length);
	};		
	$scope.search();
	
	$scope.selectPage = function(page) {
		$rootScope.paging.pageNumber = page;
		$scope.search();
	};
	
	$scope.gotoView = function(id) {
		$location.path('all-app-detail/'+id);
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
};

function ApplicationDetailCtrl($rootScope, $scope, $http, $compile, $timeout, $filter, $location,$routeParams ,$log) {
	
	
	/*	$scope.canList = $scope.app.user.userFunction.indexOf('$errormessage.list') > -1;
		$scope.canEdit = $scope.app.user.userFunction.indexOf('$errormessage.edit') > -1;*/
		$scope.isSubmit = false;//Submit flag
		
		$scope.statusPayment = [{"statusCode":"awaiting","statusName":"รอการชำระเงิน"},
		                        {"statusCode":"payment","statusName":"ชำระเงินแล้ว"},
		                        {"statusCode":"overPayment","statusName":"ชำระเงินเกิน"},
		                        {"statusCode":"partialPayments","statusName":"ชำระเงินบางส่วน"}];
		
		$scope.productList = [
		                  		 {"productCode":"0001", "productName":"พ.ร.บ."}
		                  		,{"productCode":"0002", "productName":"ประกันภัยชั้น 1"}
		                  		,{"productCode":"0003", "productName":"ประกันภัยชั้น 2"}];
		                	
		$scope.renewTypeList = [
			  {"id":"1" , "name":"New"}
			, {"id":"2" , "name":"Renew"}];
		
		$scope.projectList = [{"projCode":"ASN","projName":"ASN"},
		                      {"projCode":"ASNKTC","projName":"ASN_KTC"},
		                      {"projCode":"IServe","projName":"I-SERVE"}];
		
		$scope.paymentStatusList = [{"statusCode":"waitPayment","statusName":"รอการชำระ"},
		                        {"statusCode":"bankConf","statusName":"รอยืนยันจากธนาคาร"},
		                        {"statusCode":"paid","statusName":"ชำระแล้ว"},
		                        {"statusCode":"paidFail","statusName":"ชำระไม่ผ่าน"},
		                        {"statusCode":"waitIVehicle.","statusName":"รอตรวจสภาพรถ"},
		                        {"statusCode":"wait","statusName":"รออนุมัติผลตรวจสภาพ"},
		                        {"statusCode":"pass","statusName":"ตรวจสภาพรถผ่าน"},
		                        {"statusCode":"fail","statusName":"ตรวจสภาพรถไม่ผ่าน"},
		                        {"statusCode":"cancel","statusName":"ยกเลิก"},
		                        {"statusCode":"WaitPolicy","statusName":"รอออกกรมธรรม์"},
		                        {"statusCode":"policy","statusName":"ออกกรมธรรม์แล้ว"}];
		
		$scope.paymentDetailList = [{"paymentNo":"5","batchNo":"","confirmPayDate":"02/10/2552","amount":"-70","transactionDate":"02/10/2552","transactionCode":"89","status":"รอการสร้าง batch"},
		                            {"paymentNo":"4","batchNo":"","confirmPayDate":"25/09/2552","amount":"70","transactionDate":"25/09/2552","transactionCode":"00","status":"รอการตัดเงิน"},
		                            {"paymentNo":"3","batchNo":"","confirmPayDate":"26/08/2552","amount":"70","transactionDate":"25/08/2552","transactionCode":"00","status":"รอการยืนยันการตัดเงิน"},
		                            {"paymentNo":"2","batchNo":"","confirmPayDate":"24/07/2552","amount":"70","transactionDate":"24/07/2552","transactionCode":"00","status":"ยืนยันและส่งธนาคารแล้ว"},
		                            {"paymentNo":"1","batchNo":"","confirmPayDate":"25/06/2552","amount":"70","transactionDate":"25/06/2552","transactionCode":"00","status":"ชำระไม่ผ่าน"}];
		
		//Call back-end by storeId
		//$http.get(_.toHttpGetUrl('rest/errormsg/getErrorMessage/'+$routeParams.id)).success(function(data) {
		$scope.applicationList = [{"seqNo":"5","project":"ASN","product":"0001","appNo":"OTISCKPI002490001","policyNo":"001-57-00000100","requestDate":"1391140205000","effectiveDate":"1391226605000","expireDate":"1422762605000","assured":"นายวิโรจน์ ชูวงศ์","counselor":"นายวิเชียร เลาหบุตร","premium":"1,074.28","status":"Complete","createDate":"01/01/2557 08:00:00","carType":"รถยนต์นั่งโดยสารเกิน 7 คน","usageType":"ใช้ส่วนบุคคล ไม่ใช่รับจ้างหรือให้เช่า","capacity":"1600 CC","carNo":"1กว 9999","province":"กรุงเทพมหานคร","year":"2014","brand":"TOYOTA","model":"COROLLA","color":"ขาว","chassisNo":"JSDFJOI329DSFOFE","engineNo":"DFLKSJDFOSID39","birthDateD1":"09/02/2525","birthDateD2":"09/09/2528","driverName1":"นายวิชาญ รัตนิพนธ์","driverName2":"นายนพดล ชัยชนะกิจการ","paymentChannel":"flexi","paymentStatus":"waitPayment","creditCardNo":"5407-1691-2564-1347","cardHolder":"สมชาย  กิจสมบูรณ์สุข"}
		,{"seqNo":"4","project":"IServe","product":"0001","appNo":"OTISCKPI002490002","policyNo":"001-57-00000101","requestDate":"1391140205000","effectiveDate":"1391226605000","expireDate":"1422762605000","assured":"นายพงษ์เทพ ธรรมโสพน","counselor":"นายวิเชียร เลาหบุตร","premium":"757.21","status":"Complete","createDate":"01/01/2557 08:00:00","birthDateD1":"08/05/2520","birthDateD2":"20/10/2520","driverName1":"นายชวิน เหลืองขจร","driverName2":"นายประทีป แท้วิริยะกุล","carType":"รถยนต์นั่งโดยสารเกิน 7 คน","usageType":"ใช้ส่วนบุคคล ไม่ใช่รับจ้างหรือให้เช่า","capacity":"1600 CC","carNo":"1กว 9999","province":"กรุงเทพมหานคร","year":"2014","brand":"TOYOTA","model":"COROLLA","color":"ขาว","chassisNo":"JSDFJOI329DSFOFE","engineNo":"DFLKSJDFOSID39","paymentChannel":"flexi","paymentStatus":"paid","creditCardNo":"5407-1691-2564-1347","cardHolder":"สมชาย  กิจสมบูรณ์สุข"}
		,{"seqNo":"3","project":"ASNKTC","product":"0001","appNo":"OBASNKPI002490001","policyNo":"001-57-00000102","requestDate":"1391140205000","effectiveDate":"1391226605000","expireDate":"1422762605000","assured":"นายวรวัฒน์ สอนจันทร์","counselor":"นายวิเชียร เลาหบุตร","premium":"757.21","status":"Complete","createDate":"01/01/2557 08:00:00","birthDateD1":"20/07/2532","birthDateD2":"09/05/2532","driverName1":"น.ส.วาสนา ทรพับ","driverName2":"นายวิชาญ รัตนิพนธ์","carType":"รถยนต์นั่งโดยสารเกิน 7 คน","usageType":"ใช้ส่วนบุคคล ไม่ใช่รับจ้างหรือให้เช่า","capacity":"1600 CC","carNo":"1กว 9999","province":"กรุงเทพมหานคร","year":"2014","brand":"TOYOTA","model":"COROLLA","color":"ขาว","chassisNo":"JSDFJOI329DSFOFE","engineNo":"DFLKSJDFOSID39","paymentChannel":"flexi","paymentStatus":"paidFail","creditCardNo":"5407-1691-2564-1347","cardHolder":"สมชาย  กิจสมบูรณ์สุข"}
		,{"seqNo":"2","project":"IServe","product":"0003","appNo":"OBASNKPI002490002","policyNo":"001-57-00000103","requestDate":"1391140205000","effectiveDate":"1391226605000","expireDate":"1422762605000","assured":"นายวิชัย ศรีบุรินทร์","counselor":"นายวิเชียร เลาหบุตร","premium":"757.21","status":"Complete","createDate":"01/01/2557 08:00:00","birthDateD1":"14/02/2530","birthDateD2":"07/08/2525","driverName1":"นายนพดล ชัยชนะกิจการ","driverName2":"นายชวิน เหลืองขจร","carType":"รถยนต์นั่งโดยสารเกิน 7 คน","usageType":"ใช้ส่วนบุคคล ไม่ใช่รับจ้างหรือให้เช่า","capacity":"1600 CC","carNo":"1กว 9999","province":"กรุงเทพมหานคร","year":"2014","brand":"TOYOTA","model":"COROLLA","color":"ขาว","chassisNo":"JSDFJOI329DSFOFE","engineNo":"DFLKSJDFOSID39","paymentChannel":"flexi","paymentStatus":"cancel","creditCardNo":"5407-1691-2564-1347","cardHolder":"สมชาย  กิจสมบูรณ์สุข"}
		,{"seqNo":"1","project":"ASN","product":"0001","appNo":"OBASNKPI002490003","policyNo":"","requestDate":"1391140205000","effectiveDate":"1391226605000","expireDate":"1422762605000","assured":"นายสงคราม อาจสมบาล","counselor":"นายวิเชียร เลาหบุตร","premium":"757.21","status":"Complete","createDate":"01/01/2557 08:00:00","birthDateD1":"25/10/2528","birthDateD2":"17/03/2530","driverName1":"นายประทีป แท้วิริยะกุล","driverName2":"น.ส.วาสนา ทรพับ","carType":"รถยนต์นั่งโดยสารเกิน 7 คน","usageType":"ใช้ส่วนบุคคล ไม่ใช่รับจ้างหรือให้เช่า","capacity":"1600 CC","carNo":"1กว 9999","province":"กรุงเทพมหานคร","year":"2014","brand":"TOYOTA","model":"COROLLA","color":"ขาว","chassisNo":"JSDFJOI329DSFOFE","engineNo":"DFLKSJDFOSID39","paymentChannel":"flexi","paymentStatus":"fail","creditCardNo":"5407-1691-2564-1347","cardHolder":"สมชาย  กิจสมบูรณ์สุข"}];
			
		
		$scope.applicationList.requestDate = _.toDateStr($scope.applicationList.requestDate);
		$scope.applicationList.effectiveDate = _.toDateStr($scope.applicationList.effectiveDate);
		
		$scope.allAppList = [{"no":"1","appNo":"AP0157/00001","seqNo":"1","project":"ASN KTC","productId":"001","product":"ภาคสมัครใจชั้น 1","newRenew":"New","assured":"นายวิโรจน์ ชูวงศ์","effectiveDate":"01/06/2557","expireDate":"01/06/2558","requestDate":"01/05/2557","premium":"18,900.00","status":"รอการชำระเงิน"}
		,{"no":"2","appNo":"AP0157/00002","seqNo":"1","project":"ASN KTC","productId":"002","product":"ภาคสมัครใจชั้น 2","newRenew":"New","assured":"นายพงษ์เทพ ธรรมโสพล","effectiveDate":"01/06/2557","expireDate":"01/06/2558","requestDate":"01/05/2557","premium":"7,900.00","status":"ชำระไม่ผ่าน"}
		,{"no":"3","appNo":"AP0157/00003","seqNo":"1","project":"ASN KTC","productId":"003","product":"ภาคสมัครใจชั้น 3","newRenew":"New","assured":"นายวรวัฒน์ สอนจันทร์","effectiveDate":"01/06/2557","expireDate":"01/06/2558","requestDate":"01/05/2557","premium":"3,400.00","status":"รอยืนยันจากธนาคาร"}
		,{"no":"4","appNo":"AP0157/00004","seqNo":"1","project":"ASN KTC","productId":"004","product":"พรบ","newRenew":"New","assured":"นายวิชัย ศรีบุรินทร์","effectiveDate":"01/06/2557","expireDate":"01/06/2558","requestDate":"01/05/2557","premium":"600.00","status":"สร้างกรมธรรม์"}
		,{"no":"5","appNo":"AP0157/00005","seqNo":"1","project":"ASN","productId":"001","product":"ภาคสมัครใจชั้น 1","newRenew":"New","assured":"นายสงคราม อาจสมบาล","effectiveDate":"01/06/2557","expireDate":"01/06/2558","requestDate":"01/05/2557","premium":"16,345.00","status":"รอตรวจสภาพรถ"}
		,{"no":"6","appNo":"AP0157/00006","seqNo":"1","project":"ASN","productId":"002","product":"ภาคสมัครใจชั้น 3","newRenew":"Renew","assured":"นางจุรีรัตน์ ศรีจันทร์","effectiveDate":"01/06/2557","expireDate":"01/06/2558","requestDate":"01/05/2557","premium":"3,500.00","status":"สร้างกรมธรรม์"}
		,{"no":"7","appNo":"AP0157/00007","seqNo":"1","project":"ASN","productId":"005","product":"ภาคสมัครใจชั้น 3+","newRenew":"Renew","assured":"นายวิเชียร เลาหบุตร","effectiveDate":"01/06/2557","expireDate":"01/06/2558","requestDate":"01/05/2557","premium":"4,000.00","status":"สร้างกรมธรรม์"}
		,{"no":"8","appNo":"AP0157/00008","seqNo":"1","project":"ASN","productId":"004","product":"พรบ","newRenew":"New","assured":"นางจันทร์ฉาย สมส่วน","effectiveDate":"01/06/2557","expireDate":"01/06/2558","requestDate":"01/05/2557","premium":"700.00","status":"สร้างกรมธรรม์"}];
		
		//});
			
		$scope.applicationList = _.findWhere($scope.applicationList, {'appNo': $routeParams.id +''});

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
			$location.path('/application-list');
		};
		
		$('input[type="checkbox"].minimal, input[type="radio"].minimal').iCheck({
	        checkboxClass: 'icheckbox_minimal',
	        radioClass: 'iradio_minimal'
	    });
		
	};