angular.module('myApp').config([ '$routeProvider', function($routeProvider) {
	$routeProvider.when('/home-dashboard',
		{templateUrl: _.toHttpGetUrl('content/home/dashboard.html'),
		controller: DashboardCtrl});
	$routeProvider.when('/',
		{templateUrl: _.toHttpGetUrl('content/home/dashboard.html'),
		controller: DashboardCtrl});
} ]);

function DashboardCtrl($rootScope, $scope, $http, $compile, $timeout, $filter, $location, $log, $route,$modal,myFunction) {
	$log.info('Enter DashboardCtrl');
	if(user_status == 'user'){
		$location.path('/user');
	}else if(user_status == 'sot'){
		$location.path('/event-list');
	}
	if (!$rootScope.paging) {
		$rootScope.paging = APP.DEFAULT_PAGING;
	}

	if (!$rootScope.criteria) {
		$rootScope.criteria = {};

	}
	$scope.user_id = user_id;
	// GET THIS DAY
	var d = new Date();
	var n = ("0" + d.getDate()).slice(-2)
	var m = d.getMonth();
	var cm = m+1;
	if (cm < 10){cm = "0" + cm.toString();}
	var y = d.getFullYear();
	var cy = y+543;
	$scope.dateNow = n+"/"+cm+"/"+cy;
	$scope.search = function (){
		try {
			angular.extend($rootScope.criteria, $rootScope.paging);
			$http.get('API/admin/getAllJobByDate.php').success(function (data){
					$scope.allJob = data;
					console.log($scope.allJob);
					angular.forEach($scope.allJob, function (item) {
											if(item.job_acc_status == 0){
												item.statusAcc = 'รอการตอบรับ';
												item.colorStatus = 'orange';
											}else if(item.job_acc_by != 0){
												try{
													$http.get('API/user/getNameOfficer.php?officer_id='+item.job_acc_by_new).success(function (data) {
															$scope.nameOfficer = data;
															if(item.job_status == "3"){
																item.statusAcc = "ส่งซ่อมนอกโดย "+$scope.nameOfficer;
																item.colorStatus = 'blue';
															}else{
																item.statusAcc = "รับงานโดย "+$scope.nameOfficer;
																item.colorStatus = 'green';
															}
													});
											}
												catch(err) {
												  location.reload();
												}
											}
										try {
											$http.get('API/admin/getUserDepartment.php?cost_id='+item.job_dep_of_durable).success(function (data) {
													$scope.nameCost = data;
													item.nameCost = 	$scope.nameCost;
											});
										}
										catch(err) {
										  location.reload();
										}
					});
					$rootScope.paging.totalItems = $scope.allJob.length;
					$scope.checkTotalHome = $rootScope.paging.totalItems;
					$rootScope.paging.showing = _.getShowing($rootScope.paging.pageNumber, $rootScope.paging.limit, $scope.allJob.length);
			});
		}
		catch(err) {
		  location.reload();
		}
		try{
			$http.get('API/admin/getJobSendToBy.php?admin_id='+$scope.user_id).success(function (data){
				$scope.jobSendToList = data;
				angular.forEach($scope.jobSendToList,function(item){
					$http.get('API/admin/getUserDepartment.php?cost_id='+item.job_dep_of_durable).success(function (data) {
							$scope.nameCost = data;
							item.nameCost = 	$scope.nameCost;
					});
					$http.get('API/user/getNameOfficer.php?officer_id='+item.job_acc_after).success(function (data) {
							$scope.nameOfficer = data;
							item.nameOfficerAcc = $scope.nameOfficer;
							item.colorStatus = 'blue';
					});

				});
			});
		}catch(err){
		}
	}
			$scope.search();
			$scope.selectPage = function(page) {
				$rootScope.paging.pageNumber = page;
				$scope.search();
			};
	$scope.confirmDelete = function (job_id){
		var modalInstance = $modal.open({
				templateUrl: 'content/popup/admin/confirmDelete-popup.html',
				controller: confirmDeletePopupCtrl,
				backdrop: 'static',
				windowClass: 'small',
				keyboard: false,
				resolve: {
						params_job_id: function () {
								return job_id;
						}
				}
		});
		modalInstance.result.then(function (isClose) {
		}, function () {
				$log.info('Modal dismissed at: ' + new Date());
		});
	}
		$scope.finishJob = function (job_id,dur_id,job_type){
			var modalInstance = $modal.open({
					templateUrl: 'content/popup/remain/finishJob-popup.html',
					controller: finishJobCtrl,
					backdrop: 'static',
					windowClass: 'large',
					keyboard : false,
					resolve : {
							params_job_id: function () {
									return job_id;
							},
							params_dur_id: function () {
									return dur_id;
							},
							params_job_type: function () {
									return job_type;
							}
					}
			});
			modalInstance.result.then(function (isClose) {
			}, function () {
					$log.info('Modal dismissed at: ' + new Date());
			});
		}
	// Clear Search Criteria
	$scope.clear = function(){
		$rootScope.criteria = {};
	};
	//Back
	$scope.back = function() {
		$route.reload();
	};
	// POPUP Alert
	if(user_status == 'head_admin' || user_status == 'admin'){

		var c = 0;
		( $scope.my_func = function() {
		c++;
			$http.get('API/admin/countJob.php').success(function(data){
					$scope.countJob = data;
					$scope.totalJob = $scope.countJob.job_total;
			});
			$http.get('API/admin/getLastJobId.php').success(function(data){
								$scope.getLastJobId = data;
								$scope.jobIdAlert = $scope.getLastJobId.job_id;
								$scope.jobIdAlertMes = $scope.getLastJobId.job_header;
								$scope.jobIdAlertDep = $scope.getLastJobId.Cost_name;
			});
					if($scope.checkTotalHome == $scope.totalJob){
					}else if($scope.checkTotalHome  < $scope.totalJob){
						if(user_id == '30002') {
							$http.get('API/LINE/lineNotify.php?message='+$scope.jobIdAlertMes+"&dep="+$scope.jobIdAlertDep).success(function (data){
											$scope.lineNotify = data;
						})
						location.reload();
						}
								// if (!Notification) {
								// 	alert('Desktop notifications not available in your browser. Try Chromium.');
								// 	return;
								// }
								// if (Notification.permission !== "granted")
								// 	Notification.requestPermission();
								// else {
								// 		var notification = new Notification('ระบบแจ้งซ่อมออนไลน์', {
								// 			icon: 'img/logo.jpg',
								// 			body: $scope.jobIdAlertMes,
								// 		});

								// 		notification.onclick = function () {
								// 			// $location.path("/job/"+	$scope.jobIdAlert);
								// 			$scope.confirmJob($scope.jobIdAlert);

								// 		};
								// 		location.reload();
								// }


				}
		  $scope.timer =  setTimeout( $scope.my_func, 1000 );
			})();
	}
		$scope.confirmJob = function (job_id){
			var modalInstance = $modal.open({
					templateUrl: 'content/popup/admin/confirmJob-popup.html',
					controller: confirmJobPopupCtrl,
					backdrop: 'static',
					windowClass: 'large',
					keyboard: false,
					resolve: {
							params_job_id: function () {
									return job_id;
							},
							params_officer_id : function () {
								return $scope.user_id;
							}
					}
			});
			modalInstance.result.then(function (isClose) {
			}, function () {
					$log.info('Modal dismissed at: ' + new Date());
			});
		}
		$scope.gotoMoreDetail = function (id){
			$location.path('/remain-list/more-detail/'+id);
		}
		$scope.deleteJob = function (id){
			myFunction.confirmDeleteBox().result.then(function(ok) {
				if (ok) {
					$http.get('API/user/deleteJobByUser.php?job_id='+id).success(function(resp) {
						myFunction.alertDeleteSuccess();
						$scope.search();
					});
				};
			});
		}
}
