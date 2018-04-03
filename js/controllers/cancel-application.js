angular.module('myApp').config([ '$routeProvider', function($routeProvider) {
	$routeProvider.when("/cancel-application", {templateUrl: _.toHttpGetUrl("content/application/cancel-application/cancel-application.html"), controller: CancelApplicationCtrl });
	$routeProvider.when("/cancel-application-detail", {templateUrl: _.toHttpGetUrl("content/application/cancel-application-detail.html"), controller: CancelApplicationDetailCtrl });
	$routeProvider.when('/cancel-application-detail/:id', {templateUrl: _.toHttpGetUrl('content/application/cancel-application-detail.html'), controller: CancelApplicationDetailCtrl});
} ]);

function CancelApplicationCtrl($rootScope, $scope, $http, $compile, $filter, $timeout, $routeParams, $location, $log) {
	$log.info('Enter CancelApplicationCtrl');
	
	$rootScope.criteria.dateFrom = _.toDateStr(moment()); //set default date form
	$rootScope.criteria.dateTo = _.toDateStr(moment()); //set default date to
	
	if (!$rootScope.paging) {
		$rootScope.paging = APP.DEFAULT_PAGING;
	}
	if (!$rootScope.criteria) {
		$rootScope.criteria = {};
	}
	
    $scope.classList = [{"classId":"001","className":"MV"},
	                    {"classId":"002","className":"MC"},
	                    {"ClassId":"003","className":"NM"}];

	$scope.renewTypeList = [
		  {"id":"1" , "name":"New"}
		, {"id":"2" , "name":"Renew"}
	];
	
	$scope.productTypeList = [{"id":"1", "name":"พ.ร.บ."}
  							,{"id":"2", "name":"ประกันภัยชั้น 1"}
  							,{"id":"3", "name":"ประกันภัยชั้น 2"}];
	
	$scope.projectList = [{"projCode":"ASN","projName":"ASN"},
	                      {"projCode":"ASNKTC","projName":"ASN_KTC"},
	                      {"projCode":"IServe","projName":"I-SERVE"}];
	
	$scope.renewTypeList = [
		  {"id":"1" , "name":"New"}
		, {"id":"2" , "name":"Renew"}
	];
	$scope.branchList = [{"branchCode":"0001" , "branchName":"สำนักงานใหญ่"},
	                     {"branchCode":"0002" , "branchName":"สำนักงานเขต1"},
	                     {"branchCode":"0003" , "branchName":"สำนักงานเขต2"}];
	

	$scope.statusList = [{"id":"01","name":"รอการชำระเงิน"},
	                     {"id":"02","name":"ชำระเงินไม่ผ่าน"},
	                     {"id":"03","name":"รอยืนยันจากธนาคาร"},
	                     {"id":"04","name":"ชำระแล้ว"},
	                     {"id":"05","name":"รอตรวจสภาพรถ"},
	                     {"id":"06","name":"รออนุมัติผลตรวจสภาพรถ"},
	                     {"id":"07","name":"ตรวจสภาพรถผ่าน"},
	                     {"id":"08","name":"ตรวจสภาพรถไม่ผ่าน"},
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


	$scope.clear = function(){
		$rootScope.criteria = {};
	};
	
	$scope.search = function(){		
		//var url = _.toHttpGetUrl('api/user/findUser', $rootScope.criteria);
		//$http.get(url).success(function(data){
		$scope.cancelAppList = 
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
			
			
		$rootScope.paging.totalItems = $scope.cancelAppList.length;
		$rootScope.paging.showing = _.getShowing($rootScope.paging.pageNumber, $rootScope.paging.limit, $scope.cancelAppList.length);
	};
	$scope.search();
	
	$scope.selectPage = function(page) {
		$rootScope.paging.pageNumber = page;
		$scope.search();
	};
	
	$scope.gotoEdit = function(id) {
		$location.path('cancel-app-detail/'+id);
	};
	
};

function CancelApplicationDetailCtrl($rootScope, $scope, $http, $compile, $timeout, $filter, $location,$routeParams) {
	
/*	$scope.canList = $scope.app.user.userFunction.indexOf('$errormessage.list') > -1;
	$scope.canEdit = $scope.app.user.userFunction.indexOf('$errormessage.edit') > -1;*/
	$scope.isSubmit = false;//Submit flag
	$scope.renewTypeList = [{"id":"1" , "name":"New"},
	                        {"id":"2" , "name":"Renew"}];
	
	$scope.policyTypeList = [{"policyCode":"0001", "policyName":"พ.ร.บ."}
	                  		,{"policyCode":"0002", "policyName":"ประกันภัยชั้น 1"}
	                  		,{"policyCode":"0003", "policyName":"ประกันภัยชั้น 2"}];
	              	
  	$scope.productTypeList = [{"id":"1", "name":"พ.ร.บ."},
  	                          {"id":"2", "name":"ประกันภัยชั้น 1"},
  	                          {"id":"3", "name":"ประกันภัยชั้น 2"}];
  	
  	$scope.projectList = [{"projCode":"ASN","projName":"ASN"},
  	                      {"projCode":"ASNKTC","projName":"ASN_KTC"},
  	                      {"projCode":"IServe","projName":"I-SERVE"}];
  	
  	$scope.renewTypeList = [{"id":"1" , "name":"New"},
  	                        {"id":"2" , "name":"Renew"}];
  	
  	$scope.paymentDetailList = [{"paymentNo":"5","creditNo":"5407169125641347","cardHolder":"สมชาย  กิจสมบูรณ์สุข","amount":"-70","transactionDate":"02/10/2552","transactionCode":"89","details":"Refund ตามความต้องการของลูกค้า"},
	                            {"paymentNo":"4","creditNo":"5407169125641347","cardHolder":"สมชาย  กิจสมบูรณ์สุข","amount":"70","transactionDate":"25/09/2552","transactionCode":"00","details":"KPI สามารถตัดเบี้ยได้"},
	                            {"paymentNo":"3","creditNo":"5407169125641347","cardHolder":"สมชาย  กิจสมบูรณ์สุข","amount":"70","transactionDate":"25/08/2552","transactionCode":"00","details":"KPI สามารถตัดเบี้ยได้"},
	                            {"paymentNo":"2","creditNo":"5407169125641347","cardHolder":"สมชาย  กิจสมบูรณ์สุข","amount":"70","transactionDate":"24/07/2552","transactionCode":"00","details":"KPI สามารถตัดเบี้ยได้"},
	                            {"paymentNo":"1","creditNo":"5407169125641347","cardHolder":"สมชาย  กิจสมบูรณ์สุข","amount":"70","transactionDate":"25/06/2552","transactionCode":"00","details":"KPI สามารถตัดเบี้ยได้"}];
	
	$scope.cancelAppList = [{"no":"1","project":"ASN","policyType":"0001","appNo":"OTISCKPI002490001","policyNo":"001-57-00000100","coverDateF":"01/01/2557","coverDateT":"01/01/2558","assured":"นายวิโรจน์ ชูวงศ์","counselor":"นายวิเชียร เลาหบุตร","premium":"1,074.28","status":"Complete","createDate":"01/01/2557 08:00:00","carType":"รถยนต์นั่งโดยสารเกิน 7 คน","usageType":"ใช้ส่วนบุคคล ไม่ใช่รับจ้างหรือให้เช่า","capacity":"1600 CC","carNo":"1กว 9999","province":"กรุงเทพมหานคร","year":"2014","brand":"TOYOTA","model":"COROLLA","color":"ขาว","chassisNo":"JSDFJOI329DSFOFE","engineNo":"DFLKSJDFOSID39","birthDateD1":"09/02/2525","birthDateD2":"09/09/2528","driverName1":"นายวิชาญ รัตนิพนธ์","driverName2":"นายนพดล ชัยชนะกิจการ","cancelReason":"","cancelDate":"02/01/2557"}
	,{"no":"2","project":"I-SERVE","policyType":"0001","appNo":"OTISCKPI002490002","policyNo":"001-57-00000101","coverDateF":"01/01/2557","coverDateT":"01/01/2558","assured":"นายพงษ์เทพ ธรรมโสพน","counselor":"นายวิเชียร เลาหบุตร","premium":"757.21","status":"Complete","createDate":"01/01/2557 08:00:00","birthDateD1":"08/05/2520","birthDateD2":"20/10/2520","driverName1":"นายชวิน เหลืองขจร","driverName2":"นายประทีป แท้วิริยะกุล","carType":"รถยนต์นั่งโดยสารเกิน 7 คน","usageType":"ใช้ส่วนบุคคล ไม่ใช่รับจ้างหรือให้เช่า","capacity":"1600 CC","carNo":"1กว 9999","province":"กรุงเทพมหานคร","year":"2014","brand":"TOYOTA","model":"COROLLA","color":"ขาว","chassisNo":"JSDFJOI329DSFOFE","engineNo":"DFLKSJDFOSID39","cancelDate":"03/01/2557"}
	,{"no":"3","project":"ASN KTC","policyType":"0001","appNo":"OBASNKPI002490001","policyNo":"001-57-00000102","coverDateF":"01/01/2557","coverDateT":"01/01/2558","assured":"นายวรวัฒน์ สอนจันทร์","counselor":"นายวิเชียร เลาหบุตร","premium":"757.21","status":"Complete","createDate":"01/01/2557 08:00:00","birthDateD1":"20/07/2532","birthDateD2":"09/05/2532","driverName1":"น.ส.วาสนา ทรพับ","driverName2":"นายวิชาญ รัตนิพนธ์","carType":"รถยนต์นั่งโดยสารเกิน 7 คน","usageType":"ใช้ส่วนบุคคล ไม่ใช่รับจ้างหรือให้เช่า","capacity":"1600 CC","carNo":"1กว 9999","province":"กรุงเทพมหานคร","year":"2014","brand":"TOYOTA","model":"COROLLA","color":"ขาว","chassisNo":"JSDFJOI329DSFOFE","engineNo":"DFLKSJDFOSID39","cancelDate":"01/01/2557"}
	,{"no":"4","project":"I-SERVE","policyType":"0003","appNo":"OBASNKPI002490002","policyNo":"001-57-00000103","coverDateF":"01/01/2557","coverDateT":"01/01/2558","assured":"นายวิชัย ศรีบุรินทร์","counselor":"นายวิเชียร เลาหบุตร","premium":"757.21","status":"Complete","createDate":"01/01/2557 08:00:00","birthDateD1":"14/02/2530","birthDateD2":"07/08/2525","driverName1":"นายนพดล ชัยชนะกิจการ","driverName2":"นายชวิน เหลืองขจร","carType":"รถยนต์นั่งโดยสารเกิน 7 คน","usageType":"ใช้ส่วนบุคคล ไม่ใช่รับจ้างหรือให้เช่า","capacity":"1600 CC","carNo":"1กว 9999","province":"กรุงเทพมหานคร","year":"2014","brand":"TOYOTA","model":"COROLLA","color":"ขาว","chassisNo":"JSDFJOI329DSFOFE","engineNo":"DFLKSJDFOSID39","cancelDate":"02/01/2557"}
	,{"no":"5","project":"ASN","policyType":"0001","appNo":"OBASNKPI002490003","policyNo":"","coverDate":"01/01/2557-01/01/2558","assured":"นายสงคราม อาจสมบาล","counselor":"นายวิเชียร เลาหบุตร","premium":"757.21","status":"Complete","createDate":"01/01/2557 08:00:00","birthDateD1":"25/10/2528","birthDateD2":"17/03/2530","driverName1":"นายประทีป แท้วิริยะกุล","driverName2":"น.ส.วาสนา ทรพับ","carType":"รถยนต์นั่งโดยสารเกิน 7 คน","usageType":"ใช้ส่วนบุคคล ไม่ใช่รับจ้างหรือให้เช่า","capacity":"1600 CC","carNo":"1กว 9999","province":"กรุงเทพมหานคร","year":"2014","brand":"TOYOTA","model":"COROLLA","color":"ขาว","chassisNo":"JSDFJOI329DSFOFE","engineNo":"DFLKSJDFOSID39","cancelDate":"05/01/2557"}
	,{"no":"6","project":"ASN KTC","policyType":"0002","appNo":"OAKTCKPI002490001","policyNo":"","coverDate":"01/01/2557-01/01/2558","assured":"นางจุรีรัตน์ ศรีจันทร์","counselor":"นายวิเชียร เลาหบุตร","premium":"18,900.00","status":"Survey Awaiting","createDate":"01/01/2557 08:00:00","birthDateD1":"16/12/2521","birthDateD2":"07/08/2525","driverName1":"นายนพดล ชัยชนะกิจการ","driverName2":"นายชวิน เหลืองขจร","carType":"รถยนต์นั่งโดยสารเกิน 7 คน","usageType":"ใช้ส่วนบุคคล ไม่ใช่รับจ้างหรือให้เช่า","capacity":"1600 CC","carNo":"1กว 9999","province":"กรุงเทพมหานคร","year":"2014","brand":"TOYOTA","model":"COROLLA","color":"ขาว","chassisNo":"JSDFJOI329DSFOFE","engineNo":"DFLKSJDFOSID39","cancelDate":"06/01/2557"}];
	
	$scope.cancelAppList = _.findWhere($scope.cancelAppList, {'appNo': $routeParams.id +''});
  	
	//Call back-end by storeId
	//$http.get(_.toHttpGetUrl('rest/errormsg/getErrorMessage/'+$routeParams.id)).success(function(data) {
		$scope.application = {"no":"2","broker":"TISCO","policyType":"พ.ร.บ","appNo":"OTISCKPI002490002","policyNo":"001-57-00000100","coverDateF":"01/01/2557","coverDateT":"01/01/2558","assured":"นายพงษ์เทพ ธรรมโสพน","counselor":"นายวิเชียร เลาหบุตร","premium":"757.21","status":"Complete","createDate":"01/01/2557 08:00:00","carType":"รถยนต์นั่งโดยสารเกิน 7 คน","usageType":"ใช้ส่วนบุคคล ไม่ใช่รับจ้างหรือให้เช่า","capacity":"1600 CC","carNo":"1กว 9999","province":"กรุงเทพมหานคร","year":"2014","brand":"TOYOTA","model":"COROLLA","color":"ขาว","chassisNo":"JSDFJOI329DSFOFE","engineNo":"DFLKSJDFOSID39"};
		
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
		$location.path('/cancel-app');
	};

};