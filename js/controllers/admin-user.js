angular.module('myApp').config([ '$routeProvider', function($routeProvider) {
	$routeProvider.when('/admin-user', {templateUrl: _.toHttpGetUrl('content/admin/user/admin-user.html'), controller: AdminUserListCtrl});
	$routeProvider.when('/admin-user/:mode', {templateUrl: _.toHttpGetUrl('content/admin/user/admin-user-detail.html'), controller: AdminuserDetailCtrl});
	$routeProvider.when('/admin-user/:mode/:id', {templateUrl: _.toHttpGetUrl('content/admin/user/admin-user-detail.html'), controller: AdminuserDetailCtrl});
} ]);

function AdminUserListCtrl($rootScope, $scope, $http, $compile, $timeout, $filter, $location, $log, $route, $routeParams) {
	$log.info('Enter AdminUserListCtrl');
	
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
	
	$scope.allRoleList = [{"roleCode":"BROKER_USER", "roleName":"Broker User"}
	                		,{"roleCode":"UW_USER", "roleName":"UW User"}
	                		,{"roleCode":"FINANCE_USER", "roleName":"Finance User"}
	                		,{"roleCode":"MARKETTING_USER", "roleName":"Maketting User"}
	                		,{"roleCode":"KPI_ADMIN", "roleName":"KPI Admin"}
	                	];
	
	$scope.search = function(){
		
		angular.extend($rootScope.criteria, $rootScope.paging);
		//var url = _.toHttpGetUrl('api/user/findUser', $rootScope.criteria);
		//$http.get(url).success(function(data){
		
		$scope.userList = [{"userCode":"000010","createdBy":"KPIADM","createdDate":1385005799296,"email":"","status":"I","telephone":"00485775","modifiedBy":"KPIADM","modifiedDate":1386649451607,"userNameLc":"นายวิชาญ รัตนิพนธ์","userNameEn":"MR. VICHAN RATANIPHON","positionNameLc":"ผู้จัดการฝ่ายบริการลูกค้า","positionNameEn":"Customer Service Manager","statusNameLc":"ไม่ใช้งาน","statusNameEn":"Inactive","noOfAssignRole":0},{"userCode":"000011","createdBy":"KPIADM","createdDate":1384854199609,"email":"","status":"A","telephone":"","modifiedBy":"KPIADM","modifiedDate":1386306556843,"userNameLc":"น.ส.รัตติยา ไววิทย์","userNameEn":"MISS RATTIYA VAIVIT","positionNameLc":"ผู้จัดการฝ่ายบริการลูกค้า","positionNameEn":"Customer Service Manager","statusNameLc":"ใช้งาน","statusNameEn":"Active","noOfAssignRole":1},{"userCode":"000013","createdBy":"KPIADM","createdDate":1384854219843,"email":"","status":"A","telephone":"","modifiedBy":"KPIADM","modifiedDate":1385620237843,"userNameLc":"นางยุพิน ผลดี","userNameEn":"MRS. YUPIN PHONDEE","positionNameLc":"ผู้จัดการฝ่ายบริการลูกค้า","positionNameEn":"Customer Service Manager","statusNameLc":"ใช้งาน","statusNameEn":"Active","noOfAssignRole":1},{"userCode":"000014","createdBy":"KPIADM","createdDate":1384854230125,"email":"","status":"A","telephone":"","modifiedBy":"KPIADM","modifiedDate":1384942902657,"userNameLc":"นางปราณี ก่อวงษ์","userNameEn":"MRS. PRANEE KOWONG","positionNameLc":"ผู้จัดการฝ่ายบริการลูกค้า","positionNameEn":"Customer Service Manager","statusNameLc":"ใช้งาน","statusNameEn":"Active","noOfAssignRole":2},{"userCode":"000016","createdBy":"KPIADM","createdDate":1384854643741,"email":"","status":"A","telephone":"","modifiedBy":"KPIADM","modifiedDate":1384942911704,"userNameLc":"น.ส.วาสนา ทรพับ","userNameEn":"MISS VASANA THONPUB","positionNameLc":"ผู้จัดการฝ่ายบริการลูกค้า","positionNameEn":"Customer Service Manager","statusNameLc":"ใช้งาน","statusNameEn":"Active","noOfAssignRole":1},	{"userCode":"000017","createdBy":"KPIADM","createdDate":1384854675992,"email":"","status":"A","telephone":"","modifiedBy":"KPIADM","modifiedDate":1384942920266,"userNameLc":"นายนครชัย ชำกุล","userNameEn":"MR. NAKORCHAI CHOMKUL","positionNameLc":"ผู้จัดการฝ่ายบริการลูกค้า","positionNameEn":"Customer Service Manager","statusNameLc":"ใช้งาน","statusNameEn":"Active","noOfAssignRole":1},{"userCode":"000205","createdBy":"KPIADM","createdDate":1386324846640,"email":"","status":"A","telephone":"","modifiedBy":"KPIADM","modifiedDate":1386324846640,"userNameLc":"นายชวิน เหลืองขจร","userNameEn":"MR. CHAWIN LOUNGKAJON","positionNameLc":"ผู้จัดการฝ่ายบริการลูกค้า","positionNameEn":"Customer Service Manager","statusNameLc":"ใช้งาน","statusNameEn":"Active","noOfAssignRole":0},{"userCode":"000220","createdBy":"KPIADM","createdDate":1386320661359,"email":"","status":"A","telephone":"","modifiedBy":"KPIADM","modifiedDate":1386320661359,"userNameLc":"น.ส.พัสวีภาสุ์ อัปมาเต","userNameEn":"MISS PASSAWEEPA APPAMATE","positionNameLc":"ผู้จัดการฝ่ายบริการลูกค้า","positionNameEn":"Customer Service Manager","statusNameLc":"ใช้งาน","statusNameEn":"Active","noOfAssignRole":0},{"userCode":"000300","createdBy":"KPIADM","createdDate":1386328621281,"email":"","status":"A","telephone":"","modifiedBy":"KPIADM","modifiedDate":1386328942406,"userNameLc":"นายประทีป แท้วิริยะกุล","userNameEn":"MR. PRATEEP THAEVIRYAKUL","positionNameLc":"ผู้จัดการฝ่ายบริการลูกค้า","positionNameEn":"Customer Service Manager","statusNameLc":"ใช้งาน","statusNameEn":"Active","noOfAssignRole":0},{"userCode":"000306","createdBy":"KPIADM","createdDate":1386324558781,"email":"","status":"A","telephone":"","modifiedBy":"KPIADM","modifiedDate":1386324558781,"userNameLc":"นางจินดามณี มีทรัพย์","userNameEn":"MRS. JINDAMANEE MEESAP","positionNameLc":"ผู้จัดการฝ่ายบริการลูกค้า","positionNameEn":"Customer Service Manager","statusNameLc":"ใช้งาน","statusNameEn":"Active","noOfAssignRole":0},{"userCode":"027480","createdBy":"KPIADM","createdDate":1386303838640,"email":"","status":"A","telephone":"","modifiedBy":"KPIADM","modifiedDate":1386314112906,"userNameLc":"นายพิทักษ์ มีดอนไทย","userNameEn":"MR. PHITHAK MEEDONTHAI","positionNameLc":"ผู้จัดการฝ่ายบริการลูกค้า","positionNameEn":"Customer Service Manager","statusNameLc":"ใช้งาน","statusNameEn":"Active","noOfAssignRole":0},{"userCode":"071222","createdBy":"KPIADM","createdDate":1384333583859,"email":"","status":"A","telephone":"","modifiedBy":"KPIADM","modifiedDate":1384749063835,"userNameLc":"น.ส.เพ็ญนภา เทอดไพรสันต์","userNameEn":"MISS PENNAPA TURDPRISANT","positionNameLc":"ผู้จัดการฝ่ายบริการลูกค้า","positionNameEn":"Customer Service Manager","statusNameLc":"ใช้งาน","statusNameEn":"Active","noOfAssignRole":0},{"userCode":"148449","createdBy":"KPIADM","createdDate":1384327876578,"email":"","status":"A","telephone":"","modifiedBy":"KPIADM","modifiedDate":1384327876578,"userNameLc":"นายนพดล ชัยชนะกิจการ","userNameEn":"MR. NOPPADOL CHAICHANAKIDKARN","positionNameLc":"ผู้จัดการฝ่ายบริการลูกค้า","positionNameEn":"Customer Service Manager","statusNameLc":"ใช้งาน","statusNameEn":"Active","noOfAssignRole":0},{"userCode":"EX0055","createdBy":"KPIADM","createdDate":1385992081531,"email":"","status":"A","telephone":"","modifiedBy":"KPIADM","modifiedDate":1385992081531,"userNameLc":"นายอนุพงษ์ เครืองาม","userNameEn":"MR. ANUPONG KRUANGAM","positionNameLc":"ผู้จัดการฝ่ายบริการลูกค้า","positionNameEn":"Customer Service Manager","statusNameLc":"ใช้งาน","statusNameEn":"Active","noOfAssignRole":0},{"userCode":"KPIADM","createdBy":"SYSTEM","createdDate":1360126350734,"email":"n@n.com","status":"A","telephone":"089","modifiedBy":"KPIADM","modifiedDate":1387170905408,"userNameLc":"KPI Admin","userNameEn":"KPI ผู้ดูแลระบบ","statusNameLc":"ใช้งาน","statusNameEn":"Active","noOfAssignRole":2}];
		
		if ($scope.criteria.userCode != null) {
			$scope.userList = $filter('filter')($scope.userList, function(value){return (value.userCode == $scope.criteria.userCode);});
		}
		
		if ($scope.criteria.userName != null) {
			$scope.userList = $filter('filter')($scope.userList, function(value){return (value.userNameEn == $scope.criteria.userName || value.userNameLc === $scope.criteria.userName);});
		}
		
		if ($scope.criteria.status != null & $scope.criteria.status != "") {
			$scope.userList = $filter('filter')($scope.userList, function(value){return (value.status == $scope.criteria.status);});
		}
		
		$rootScope.paging.totalItems = $scope.userList.length;
		$rootScope.paging.showing = _.getShowing($rootScope.paging.pageNumber, $rootScope.paging.limit, $scope.userList.length);
	};
	
	$scope.search();
	
	$scope.selectPage = function(page) {
		$rootScope.paging.pageNumber = page;
		$scope.search();
	};
	
	//Delete User
	$scope.deleteUser = function(deleteOne) {
		$scope.jobIdList = [];
		if(deleteOne != undefined){
			$scope.jobIdList.push(deleteOne);
		}else{
			$('#dtable_ShowUser').find('input:checked[name=row_user]').each(function(index, element) {
				$scope.jobIdList.push(element.value);				
			});
		}
		if ( $scope.jobIdList.length != 0 ) {
		  $scope.app.confirmDeleteBox().open().then(function(result) {
				if (result) {				
					//$http['delete']("api/user/deleteUser/"+$scope.jobIdList.join(",")+"?userCode="+$scope.authorization.getCurrentUserCode()).success(function(data) {
						$scope.app.addAlertSuccessDelete();
						$scope.back(); 
						$scope.checked = false;
					//});
				};
		  });	        	  
		};
	};
	
	$scope.gotoCreate = function() {
		$location.path('admin-user/create');
	};
	
	$scope.gotoEdit = function(userCode) {
		$location.path('admin-user/edit/'+userCode);
	};
	
}


function AdminuserDetailCtrl($rootScope, $scope, $http, $compile, $timeout, $filter, $location, $log, $route, $routeParams) {
	$log.info('Enter AdminuserDetailCtrl');
	
	// route parameter
	$scope.userList = [{"userCode":"000010","createdBy":"KPIADM","createdDate":1385005799296,"email":"","status":"I","telephone":"00485775","modifiedBy":"KPIADM","modifiedDate":1386649451607,"userNameLc":"นายวิชาญ รัตนิพนธ์","userNameEn":"MR. VICHAN RATANIPHON","positionNameLc":"ผู้จัดการฝ่ายบริการลูกค้า","positionNameEn":"Customer Service Manager","statusNameLc":"ไม่ใช้งาน","statusNameEn":"Inactive","noOfAssignRole":0},{"userCode":"000011","createdBy":"KPIADM","createdDate":1384854199609,"email":"","status":"A","telephone":"","modifiedBy":"KPIADM","modifiedDate":1386306556843,"userNameLc":"น.ส.รัตติยา ไววิทย์","userNameEn":"MISS RATTIYA VAIVIT","positionNameLc":"ผู้จัดการฝ่ายบริการลูกค้า","positionNameEn":"Customer Service Manager","statusNameLc":"ใช้งาน","statusNameEn":"Active","noOfAssignRole":1},{"userCode":"000013","createdBy":"KPIADM","createdDate":1384854219843,"email":"","status":"A","telephone":"","modifiedBy":"KPIADM","modifiedDate":1385620237843,"userNameLc":"นางยุพิน ผลดี","userNameEn":"MRS. YUPIN PHONDEE","positionNameLc":"ผู้จัดการฝ่ายบริการลูกค้า","positionNameEn":"Customer Service Manager","statusNameLc":"ใช้งาน","statusNameEn":"Active","noOfAssignRole":1},{"userCode":"000014","createdBy":"KPIADM","createdDate":1384854230125,"email":"","status":"A","telephone":"","modifiedBy":"KPIADM","modifiedDate":1384942902657,"userNameLc":"นางปราณี ก่อวงษ์","userNameEn":"MRS. PRANEE KOWONG","positionNameLc":"ผู้จัดการฝ่ายบริการลูกค้า","positionNameEn":"Customer Service Manager","statusNameLc":"ใช้งาน","statusNameEn":"Active","noOfAssignRole":2},{"userCode":"000016","createdBy":"KPIADM","createdDate":1384854643741,"email":"","status":"A","telephone":"","modifiedBy":"KPIADM","modifiedDate":1384942911704,"userNameLc":"น.ส.วาสนา ทรพับ","userNameEn":"MISS VASANA THONPUB","positionNameLc":"ผู้จัดการฝ่ายบริการลูกค้า","positionNameEn":"Customer Service Manager","statusNameLc":"ใช้งาน","statusNameEn":"Active","noOfAssignRole":1},	{"userCode":"000017","createdBy":"KPIADM","createdDate":1384854675992,"email":"","status":"A","telephone":"","modifiedBy":"KPIADM","modifiedDate":1384942920266,"userNameLc":"นายนครชัย ชำกุล","userNameEn":"MR. NAKORCHAI CHOMKUL","positionNameLc":"ผู้จัดการฝ่ายบริการลูกค้า","positionNameEn":"Customer Service Manager","statusNameLc":"ใช้งาน","statusNameEn":"Active","noOfAssignRole":1},{"userCode":"000205","createdBy":"KPIADM","createdDate":1386324846640,"email":"","status":"A","telephone":"","modifiedBy":"KPIADM","modifiedDate":1386324846640,"userNameLc":"นายชวิน เหลืองขจร","userNameEn":"MR. CHAWIN LOUNGKAJON","positionNameLc":"ผู้จัดการฝ่ายบริการลูกค้า","positionNameEn":"Customer Service Manager","statusNameLc":"ใช้งาน","statusNameEn":"Active","noOfAssignRole":0},{"userCode":"000220","createdBy":"KPIADM","createdDate":1386320661359,"email":"","status":"A","telephone":"","modifiedBy":"KPIADM","modifiedDate":1386320661359,"userNameLc":"น.ส.พัสวีภาสุ์ อัปมาเต","userNameEn":"MISS PASSAWEEPA APPAMATE","positionNameLc":"ผู้จัดการฝ่ายบริการลูกค้า","positionNameEn":"Customer Service Manager","statusNameLc":"ใช้งาน","statusNameEn":"Active","noOfAssignRole":0},{"userCode":"000300","createdBy":"KPIADM","createdDate":1386328621281,"email":"","status":"A","telephone":"","modifiedBy":"KPIADM","modifiedDate":1386328942406,"userNameLc":"นายประทีป แท้วิริยะกุล","userNameEn":"MR. PRATEEP THAEVIRYAKUL","positionNameLc":"ผู้จัดการฝ่ายบริการลูกค้า","positionNameEn":"Customer Service Manager","statusNameLc":"ใช้งาน","statusNameEn":"Active","noOfAssignRole":0},{"userCode":"000306","createdBy":"KPIADM","createdDate":1386324558781,"email":"","status":"A","telephone":"","modifiedBy":"KPIADM","modifiedDate":1386324558781,"userNameLc":"นางจินดามณี มีทรัพย์","userNameEn":"MRS. JINDAMANEE MEESAP","positionNameLc":"ผู้จัดการฝ่ายบริการลูกค้า","positionNameEn":"Customer Service Manager","statusNameLc":"ใช้งาน","statusNameEn":"Active","noOfAssignRole":0},{"userCode":"027480","createdBy":"KPIADM","createdDate":1386303838640,"email":"","status":"A","telephone":"","modifiedBy":"KPIADM","modifiedDate":1386314112906,"userNameLc":"นายพิทักษ์ มีดอนไทย","userNameEn":"MR. PHITHAK MEEDONTHAI","positionNameLc":"ผู้จัดการฝ่ายบริการลูกค้า","positionNameEn":"Customer Service Manager","statusNameLc":"ใช้งาน","statusNameEn":"Active","noOfAssignRole":0},{"userCode":"071222","createdBy":"KPIADM","createdDate":1384333583859,"email":"","status":"A","telephone":"","modifiedBy":"KPIADM","modifiedDate":1384749063835,"userNameLc":"น.ส.เพ็ญนภา เทอดไพรสันต์","userNameEn":"MISS PENNAPA TURDPRISANT","positionNameLc":"ผู้จัดการฝ่ายบริการลูกค้า","positionNameEn":"Customer Service Manager","statusNameLc":"ใช้งาน","statusNameEn":"Active","noOfAssignRole":0},{"userCode":"148449","createdBy":"KPIADM","createdDate":1384327876578,"email":"","status":"A","telephone":"","modifiedBy":"KPIADM","modifiedDate":1384327876578,"userNameLc":"นายนพดล ชัยชนะกิจการ","userNameEn":"MR. NOPPADOL CHAICHANAKIDKARN","positionNameLc":"ผู้จัดการฝ่ายบริการลูกค้า","positionNameEn":"Customer Service Manager","statusNameLc":"ใช้งาน","statusNameEn":"Active","noOfAssignRole":0},{"userCode":"EX0055","createdBy":"KPIADM","createdDate":1385992081531,"email":"","status":"A","telephone":"","modifiedBy":"KPIADM","modifiedDate":1385992081531,"userNameLc":"นายอนุพงษ์ เครืองาม","userNameEn":"MR. ANUPONG KRUANGAM","positionNameLc":"ผู้จัดการฝ่ายบริการลูกค้า","positionNameEn":"Customer Service Manager","statusNameLc":"ใช้งาน","statusNameEn":"Active","noOfAssignRole":0},{"userCode":"KPIADM","createdBy":"SYSTEM","createdDate":1360126350734,"email":"n@n.com","status":"A","telephone":"089","modifiedBy":"KPIADM","modifiedDate":1387170905408,"userNameLc":"KPI Admin","userNameEn":"KPI ผู้ดูแลระบบ","statusNameLc":"ใช้งาน","statusNameEn":"Active","noOfAssignRole":2}];
	$scope.mode = $routeParams.mode;
	$scope.id = $routeParams.id;
	
	// Clear Search Criteria
	$scope.clear = function(){
		$rootScope.criteria = {};
	};
	// check mode
	if ($scope.mode == 'create') {
		$scope.user = {
			status : 'A'
		};
		
		//Create User
		$scope.createUser = function() {
			$scope.isSubmit = true;
		
			if ($scope.form.$invalid) { // validate form
				$scope.app.addAlert('gritter-error', 'Incorrect data !!!', 4000);
				return;
			}
	
			//Call back-end
			$rootScope.isLoading = true;
			_.compactObject($scope.user);
			//var url = "api/user/insertUser";
			
			$scope.user.createdBy = $scope.authorization.getCurrentUserCode();
			$scope.user.modifiedBy = $scope.authorization.getCurrentUserCode();
			//alert($filter('json')($scope.userNew));
			//$http.post(url, $scope.userNew).success(function(data) {
				$scope.app.addAlertSuccessInsert();
				$scope.back();
			//});
		};
		
		
//------------- Tab Authorization Setting ----------------
		
		//Splice allBuList
		$scope.cutAllBuListBySelected = function() {
			//Cut already selected from allBuList
			_.each($scope.selectedBuList, function(obj1, index1) {
				_.each($scope.allBuList, function(obj2, index2) {
					if ( obj1.buCode == obj2.buCode ){
						$scope.allBuList.splice(index2, 1);
					}
				});
			});
		};
		
		//Splice allDivisionList
		$scope.cutAllDivisionListBySelected = function() {
			//Cut already selected from allDivisionList
			_.each($scope.selectDivisionList, function(obj1, index1) {
				_.each($scope.allDivisionList, function(obj2, index2) {
					if ( obj1.divCode == obj2.divCode ){
						$scope.allDivisionList.splice(index2, 1);
					}
				});
			});
		};
		
		$scope.allRoleList = [
 		     {"roleCode":"BROKER_USER", "roleName":"Broker User"}
       		,{"roleCode":"UW_USER", "roleName":"UW User"}
       		,{"roleCode":"FINANCE_USER", "roleName":"Finance User"}
       		,{"roleCode":"MARKETTING_USER", "roleName":"Maketting User"}
       		,{"roleCode":"KPI_ADMIN", "roleName":"KPI Admin"}
       	];
 		$scope.selectedRoleList = [
 		    {"roleCode":"", "roleName":""}
 		];
// 		$scope.cutAllRoleListBySelected();
 		
		
		//Back
		$scope.back = function() {
			$location.path('/admin-user');
		};
	}
	else {	// edit
		/*$http.get(_.toHttpGetUrl(APP.CONTEXT_PATH+'/api/listOfValue/findListOfValueById/'+$scope.id)).success(function(resp) {
			$scope.obj = resp;
		});*/
		
		$scope.user = _.findWhere($scope.userList, {'userCode': $routeParams.id +''});
		$scope.user.createdDate = _.toDateTimeStr($scope.user.createdDate);
		$scope.user.modifiedDate = _.toDateTimeStr($scope.user.modifiedDate);
		//$http.get(_.toHttpGetUrl('api/user/findUserById/' + $routeParams.id)).success(function(data) {		
		//});
	
		//Update User
		$scope.updateUser = function() {
			$scope.isSubmit = true;
	
			// validate form
			if ($scope.form.$invalid) {
				$scope.app.addAlertInvalid();
				return;
			}
	
			// Call back-end
			$rootScope.isLoading = true;
			_.compactObject($scope.user);
			var url = "api/user/updateUser";
			$scope.user.modifiedBy = $scope.authorization.getCurrentUserCode();
			$http.post(url, $scope.user).success(function(data) {
				$scope.app.addAlertSuccessUpdate();
				$scope.back();
			});
		};
		
		////Reset Password
		$scope.resetPassword = function() {
			$scope.app.confirmBox('Are you sure you want to reset password?', 'Cancel', 'Reset').open().then(function(result) {
				if (result) {
					$rootScope.isLoading = true;
					$http.post('api/user/resetPassword', $scope.user.userCode).success(function(data) {
						$scope.app.addAlertSuccessResetPassword();
						//$rootScope.isLoading = false;
					});
				}
			});
		};
		
		//------------- Tab Authorization Setting ----------------
		
		//Splice allRoleList
		$scope.cutAllRoleListBySelected = function() {
			//Cut already selected from allBuList
			_.each($scope.selectedRoleList, function(obj1, index1) {
				_.each($scope.allRoleList, function(obj2, index2) {
					if ( obj1.roleCode == obj2.roleCode ){
						$scope.allRoleList.splice(index2, 1);
					}
				});
			});
		};
		
		
		$scope.allRoleList = [
		     {"roleCode":"BROKER_USER", "roleName":"Broker User"}
      		,{"roleCode":"UW_USER", "roleName":"UW User"}
      		,{"roleCode":"FINANCE_USER", "roleName":"Finance User"}
      		,{"roleCode":"MARKETTING_USER", "roleName":"Maketting User"}
      		,{"roleCode":"KPI_ADMIN", "roleName":"KPI Admin"}
      	];
		$scope.selectedRoleList = [
		    {"roleCode":"", "roleName":""}
		];
		$scope.cutAllRoleListBySelected();
		
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
					$scope.obj.createdUserId = LoginUser.employeeCode;
					$scope.obj.lastUpdatedUserId = LoginUser.employeeCode;
					/*$http.post(APP.CONTEXT_PATH+'/api/listOfValue/insertListOfValue', $scope.obj).success(function(resp) {
						myFunction.alertCreateSuccess();
						$rootScope.isValidateUnsaved = false;
						$scope.back();
					});*/
				}
				else {	// edit
					$scope.obj.lastUpdatedUserId = LoginUser.employeeCode;
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
		$location.path('admin-user');
	};
}

