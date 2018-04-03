angular.module('myApp').config([ '$routeProvider', function($routeProvider) {
	$routeProvider.when("/fix",
		{templateUrl: _.toHttpGetUrl("content/fix/form.html"),
		controller: FixCtrl});
} ]);

function FixCtrl($rootScope, $scope, $http,$log, $compile, $timeout, $filter, $location,myFunction) {
	$log.info('Enter FixCtrl');
	$scope.id = user_id;
	if (!$rootScope.paging) {
		$rootScope.paging = APP.DEFAULT_PAGING;
	}
	// if (!$rootScope.criteria) {
		$rootScope.criteria = {};
	// }



	$scope.lov_code = "ACTJ";
	$http.get('API/lov/getActiveJob.php?lov_code='+$scope.lov_code).success(function (data){
		$scope.getActiveJobList = data;
	});
	$http.get('API/user/getUserById.php?user_id='+$scope.id).success(function(data){
		$scope.getUserById = data;
		console.log($scope.getUserById);
		$rootScope.criteria.fullName = $scope.getUserById.Pre_name+$scope.getUserById.Mem_name+"  "+$scope.getUserById.Mem_lastname;
		$rootScope.criteria.costName = $scope.getUserById.Cost_name;
		$rootScope.criteria.cost_id = $scope.getUserById.Cost_SKTHM;
		//call department List


		if(user_status == 'admin'||user_status == 'head_admin'){
			$scope.depList($rootScope.criteria.cost_id);
			$http.get('API/lov/getDepartment.php').success(function (data){
				$scope.getDepartmentList = data;
				$scope.adminSelectDepartment = function (id){
					$scope.depList(id);
				}
			})
		}else{
			$scope.depList($rootScope.criteria.cost_id);
		}
	});

	if($scope.user_extra == '1'){
		$scope.durableDetail = null;
		$scope.age_of_durable = null;
		$scope.date_of_p = null;
		$http.get('API/lov/allDurable.php').success(function (resp){
			$scope.getAllDurable = resp;
		});
	}



	$scope.descAllDurable = function (id){
		$http.get('API/fix/getDurableDetailById.php?dur_id='+id).success(function (data){
				$scope.durableDetail = data;
		if($scope.durableDetail.dur_dop != null){
			var dateStr = new Date($scope.durableDetail.dur_dop.date);
			var d = dateStr.getDate();
			var m = dateStr.getMonth();
			var calM = ("0" + (dateStr.getMonth() + 1)).slice(-2);
			var y = dateStr.getFullYear();
			var dateNow = new Date();
			var yNow = dateNow.getFullYear();
			var calYNow = yNow + 543;
			var calAOD = calYNow - y;
			$scope.age_of_durable = calAOD+" ปี";
			$scope.date_of_p = d+"/"+calM+"/"+y;
		}else{
			$scope.date_of_p = 'ไม่มีวันที่';
		}
		});
	}
	$scope.depList = function (cost_id){
		$http.get('API/lov/durableOfDepart.php?dep='+cost_id).success(function (data){
					$scope.wasteOfDepartList = data;
					angular.forEach($scope.wasteOfDepartList, function (item){
						if(item.dur_status == 1){
							item.dis = true;
						}else{
							item.dis = false;
						}
					});
		});
	}
	$scope.descDurable = function(id){
		$http.get('API/fix/getDurableDetailById.php?dur_id='+id).success(function (data){
				$scope.durableDetail = data;
		if($scope.durableDetail.dur_dop != null){
			var dateStr = new Date($scope.durableDetail.dur_dop.date);
			var d = dateStr.getDate();
			var m = dateStr.getMonth();
			var calM = ("0" + (dateStr.getMonth() + 1)).slice(-2);
			var y = dateStr.getFullYear();
			var dateNow = new Date();
			var yNow = dateNow.getFullYear();
			var calYNow = yNow + 543;
			var calAOD = calYNow - y;
			$scope.age_of_durable = calAOD+" ปี";
			$scope.date_of_p = d+"/"+calM+"/"+y;
		}else{
			$scope.date_of_p = 'ไม่มีวันที่';
		}
		});
	}
	$scope.back = function (){
		$location.path('/user');
	}
	$scope.save = function (){
		myFunction.confirmReplaceBox().result.then(function(ok) {
			if (ok) {
		var dateNow = new Date();
		var dayNow = ("0" + dateNow.getDate()).slice(-2);
		var monthNow = ("0" + (dateNow.getMonth() + 1)).slice(-2);
		var yearNow = dateNow.getFullYear();
		var hNow = ("0" + dateNow.getHours()).substr(-2);
		var mNow = ("0" + dateNow.getMinutes()).substr(-2);
		// YYYY/MM/DD เอาไว้เช็คเวลา
		$scope.date_created = yearNow+"/"+monthNow+"/"+dayNow;
		$scope.time_created = hNow+":"+mNow;
		try{
			if($scope.durableDetail.dur_id == undefined){
				$scope.durableError = true;
				$scope.app.addAlert('gritter-error', 'กรุณาเลือกหมายเลขครุภัณฑ์', 4000);
			}else if($rootScope.criteria.waste == undefined){
				$scope.wasteError = true;
				$("#waste").focus();
				$scope.app.addAlert('gritter-error', 'กรุณากรอกอาการเบื้องต้น', 4000);
			}else if($rootScope.criteria.tell == undefined){
				$scope.tellError = true;
				$("#tell").focus();
				$scope.app.addAlert('gritter-error', 'กรุณากรอกเบอร์โทรติดต่อ', 4000);
			}else{
					if(yearNow < 2016){
						alert("วันที่ของท่านไม่เป็นปัจจุบัน")
					}else{
						$http.get('API/fix/saveFixJob.php?job_header='+$rootScope.criteria.waste+
																							"&job_desc="+$rootScope.criteria.wasteDesc+
																							 "&job_dep_of_durable="+$rootScope.criteria.cost_id+
																							 "&job_dep_of_durable="+$scope.durableDetail.dur_department+
																							 "&job_dur_id="+$scope.durableDetail.dur_id+
																							 "&job_user_id="+$scope.id+
																							 "&job_date_created="+$scope.date_created+
																							 "&job_time_created="+$scope.time_created+
																							 "&job_tell="+$rootScope.criteria.tell+
																							 "&job_type="+$rootScope.criteria.job_type).success(function(resp){
						 $scope.saveJob = resp;
						 if($scope.saveJob == 1){
							 if(user_status == 'admin'||user_status == 'head_admin'){
								 $location.path('/');
								 $scope.app.addAlert('gritter-success', 'การแจ้งซ่อมสมบูรณ์', 4000)
							 }else{
								 $location.path('/user');
								 $scope.app.addAlert('gritter-success', 'การแจ้งซ่อมสมบูรณ์', 4000)
							 }
						 }else{
							 $scope.app.addAlert('gritter-error', 'การบันทึกไม่สมบูรณ์', 4000);
						 }
						});
					}

				;
			}
		}
		catch(err) {
    	$scope.app.addAlert('gritter-error', 'กรุณาเลือกหมายเลขครุภัณฑ์', 4000);
		}
			}
	});
	}
	$scope.saveOther = function (){
		myFunction.confirmReplaceBox().result.then(function(ok) {
			if (ok) {
				var dateNow = new Date();
				var dayNow = ("0" + dateNow.getDate()).slice(-2);
				var monthNow = ("0" + (dateNow.getMonth() + 1)).slice(-2);
				var yearNow = dateNow.getFullYear();

				var hNow = ("0" + dateNow.getHours()).substr(-2);
				var mNow = ("0" + dateNow.getMinutes()).substr(-2);
				// YYYY/MM/DD เอาไว้เช็คเวลา
				$scope.date_created = yearNow+"/"+monthNow+"/"+dayNow;
				$scope.time_created = hNow+":"+mNow;
				try{
					if($rootScope.criteria.userRequest == undefined){
						$scope.userRequestError = true;
						$("#userRequest").focus();
						$scope.app.addAlert('gritter-error', 'กรุณากรอกเรื่องที่แจ้ง', 4000);
					}else if($rootScope.criteria.userTell == undefined){
						$scope.userTellError = true;
						$("#userTell").focus();
						$scope.app.addAlert('gritter-error', 'กรุณากรอกเบอร์โทรติดต่อ', 4000);
					}else{
						 $http.get('API/fix/saveFixJob.php?job_header='+$rootScope.criteria.userRequest+
																							 "&job_desc="+$rootScope.criteria.userRequestDesc+
																								"&job_dep_of_durable="+$rootScope.criteria.cost_id+
																								"&job_user_id="+$scope.id+
																								"&job_date_created="+$scope.date_created+
																								"&job_time_created="+$scope.time_created+
																								"&job_tell="+$rootScope.criteria.userTell+
																								"&job_type="+$rootScope.criteria.job_type).success(function(resp){
							$scope.saveJob = resp;
							if($scope.saveJob == 1){
								$location.path('/user');
							}else{
								$scope.app.addAlert('gritter-error', 'การบันทึกไม่สมบูรณ์', 4000);
							}
						 });

						$scope.app.addAlert('gritter-success', 'การแจ้งซ่อมสมบูรณ์', 4000);
					}
				}
				catch(err) {
				}

			}
		})


	}

	$scope.tab = function(type){
		$scope.saveTab = type;
	}
	$scope.tab(1);



}
