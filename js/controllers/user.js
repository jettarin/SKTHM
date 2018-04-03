angular.module('myApp').config([ '$routeProvider', function($routeProvider) {
	$routeProvider.when("/user",
		{templateUrl: _.toHttpGetUrl("content/user/list.html"),
		controller: UserCtrl});
} ]);

function UserCtrl($rootScope, $scope, $http,$log, $compile, $timeout, $filter, $location,$modal,myFunction) {
	$log.info('Enter UserCtrl');


		if (!$rootScope.paging) {
			$rootScope.paging = APP.DEFAULT_PAGING;
		}
		if (!$rootScope.criteria) {
			$rootScope.criteria = {};
		}
		$scope.id = user_id;
		$http.get('API/user/getUserById.php?user_id='+$scope.id).success(function(data){
		$scope.getUserById = data;
		});
		$scope.search = function(page_number){
			if(page_number == undefined){
				var page_number = '1';
			}
			angular.extend($rootScope.criteria, $rootScope.paging);
			$http.get('API/user/getJobByUserId.php?job_dep_of_durable='+$scope.userData.Cost_SKTHM+'&page_number='+page_number).success(function (data){
				$scope.getJobByUserId = data;
				if($scope.getJobByUserId.job_acc_status == 0){
					$scope.headTable = 'ลบ';
				}else{
					$scope.headTable = 'Active';
				}
				console.log($scope.getJobByUserId);
				angular.forEach($scope.getJobByUserId, function (item) {
					var nd = new Date(item.job_date_created);
					var gd = ("0" + nd.getDate()).slice(-2);
					var gm = ("0" + (nd.getMonth() + 1)).slice(-2);
					var gy = nd.getFullYear();
					var cy = gy+543;
					item.job_date_created = gd+"/"+gm+"/"+cy;
										if(item.job_acc_status == 0){
											item.statusAcc = 'รอการตอบรับ';
										}else if(item.job_status == 99){
										 item.flag = 'true';
											$http.get('API/user/getNameOfficer.php?officer_id='+item.job_acc_by_new).success(function (data) {
													$scope.nameOfficerF = data;
													item.statusAcc = "ปิดงานโดย "+$scope.nameOfficerF;
											});
										}else if(item.job_acc_by != 0){

											try{
												$http.get('API/user/getNameOfficer.php?officer_id='+item.job_acc_by_new).success(function (data) {
														$scope.nameOfficerUser = data;
														item.statusAcc = "รับงานโดย "+$scope.nameOfficerUser;
												});
											}catch(err){
												location.reload();
											}


										}

				});

				$http.get('API/user/getTotalJob.php?job_dep_of_durable='+$scope.userData.Cost_SKTHM).success(function(resp){
					$scope.jobTotal = resp;
					$rootScope.paging.totalItems = $scope.jobTotal.totalC;
					$rootScope.paging.showing = _.getShowing($rootScope.paging.pageNumber, $rootScope.paging.limit, $scope.jobTotal.totalC);
				});
				});
			}
			$scope.search();
			$scope.gotoFix = function (){
				$location.path('/fix');
			}
			$scope.selectPage = function(page) {
				$rootScope.paging.pageNumber = page;
				$scope.search(page);
			};
			$scope.gotoUserPopup = function (id,id_officer,dur_id) {
			var modalInstance = $modal.open({
					templateUrl: 'content/popup/user/user-popup.html',
					controller: userPopupCtrl,
					backdrop: 'static',
					windowClass: 'medium',
					keyboard: false,
					resolve: {
							params_id: function () {
									return id;
							},
							params_officer_id: function(){
								 return id_officer;
							},
							params_dur_id: function(){
								 return dur_id;
							}
					}
			});
			modalInstance.result.then(function (isClose) {
			}, function () {
					$log.info('Modal dismissed at: ' + new Date());
			});
	};
	$scope.deleteJob = function (id,dur_id){
		$http({
			url:'API/user/checkJobAcc.php',
			method:'POST',
			data:{
				'job_id':id
			}
		}).success(function (data){
			$scope.checkJobAcc = data;
			console.log($scope.checkJobAcc);
			if($scope.checkJobAcc.job_acc_status != 0){
				$scope.app.addAlert('gritter-error', 'งานของคุณถูกตอบรับงานแล้ว', 4000);
			}else{
				myFunction.confirmDeleteBox().result.then(function(ok) {
					if (ok) {
						$http.get('API/user/deleteJobByUser.php?job_id='+id+'&dur_id='+dur_id).success(function(resp) {
							myFunction.alertDeleteSuccess();
							$scope.search();
						});
					};
				});
			}
		})

	}

	$scope.gotoFixReport = function (id){
		window.open('./mpdf/report/fixRPT.php?id='+id, '_blank');
	}
  $scope.gotoEdit = function (id){
		$location.path('/job/'+id);
	}
}
