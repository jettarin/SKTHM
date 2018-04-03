angular.module('myApp').config([ '$routeProvider', function($routeProvider) {
	$routeProvider.when("/admin-role", {templateUrl: _.toHttpGetUrl("content/admin/role/admin-role.html"), controller: AdminRoleCtrl});
    $routeProvider.when("/admin-role/:mode", {templateUrl: _.toHttpGetUrl("content/admin/role/admin-role-detail.html"), controller: AdminRoleDetailCtrl});
    $routeProvider.when("/admin-role/:mode/:id", {templateUrl: _.toHttpGetUrl("content/admin/role/admin-role-detail.html"), controller: AdminRoleDetailCtrl});
} ]);

function AdminRoleCtrl($rootScope, $scope, $http, $compile, $timeout, $filter, $location) {

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
	
	$scope.search = function(){
		
		angular.extend($rootScope.criteria, $rootScope.paging);
		//var url = _.toHttpGetUrl('api/user/findUser', $rootScope.criteria);
		//$http.get(url).success(function(data){
		
		$scope.roleList = [{"roleId":4,"createdBy":null,"createdDate":null,"modifiedBy":"KPI00001","modifiedDate":1387788699000,"roleCode":"BROKER_USER","roleDesc":"For Broker Users","roleName":"Broker User","rolegrpId":null,"status":"A","createdByNameLc":null,"createdByNameEn":null,"modifiedByNameLc":"à¸™à¸²à¸¢à¸§à¸´à¸Šà¸±à¸¢ à¹€à¸šà¸�à¸�à¸²à¸”à¸´à¸¥à¸�","modifiedByNameEn":"นายบรรชา สารสิน","statusNameLc":"Active","statusNameEn":"Active","userList":null,"bandBuList":null,"functionIdList":null}
		,{"roleId":9,"createdBy":null,"createdDate":null,"modifiedBy":"KPI00001","modifiedDate":1386145552000,"roleCode":"UW_USER","roleDesc":"For Underwriter Users","roleName":"UW User","rolegrpId":null,"status":"A","createdByNameLc":null,"createdByNameEn":null,"modifiedByNameLc":"à¸™.à¸ª.à¸”à¸§à¸‡à¹�à¸‚ à¹�à¸ˆà¸§à¸ªà¸�à¸¸à¸¥","modifiedByNameEn":"นายบรรชา สารสิน","statusNameLc":"Active","statusNameEn":"Active","userList":null,"bandBuList":null,"functionIdList":null}
		,{"roleId":8,"createdBy":null,"createdDate":null,"modifiedBy":"KPI00001","modifiedDate":1386145552000,"roleCode":"FINANCE_USER","roleDesc":"For Finance Users","roleName":"Finance User","rolegrpId":null,"status":"A","createdByNameLc":null,"createdByNameEn":null,"modifiedByNameLc":"à¸™.à¸ª.à¸”à¸§à¸‡à¹�à¸‚ à¹�à¸ˆà¸§à¸ªà¸�à¸¸à¸¥","modifiedByNameEn":"นายบรรชา สารสิน","statusNameLc":"Active","statusNameEn":"Active","userList":null,"bandBuList":null,"functionIdList":null}
		,{"roleId":6,"createdBy":null,"createdDate":null,"modifiedBy":"KPI00001","modifiedDate":1387788728000,"roleCode":"MARKETTING_USER","roleDesc":"For Marketting User","roleName":"Marketing User","rolegrpId":null,"status":"A","createdByNameLc":null,"createdByNameEn":null,"modifiedByNameLc":"à¸™à¸²à¸¢à¸§à¸´à¸Šà¸±à¸¢ à¹€à¸šà¸�à¸�à¸²à¸”à¸´à¸¥à¸�","modifiedByNameEn":"นายบรรชา สารสิน","statusNameLc":"Active","statusNameEn":"Active","userList":null,"bandBuList":null,"functionIdList":null}
		,{"roleId":2,"createdBy":null,"createdDate":null,"modifiedBy":"KPI00001","modifiedDate":1388638787000,"roleCode":"KPI_ADMIN","roleDesc":"For KPI ADMIN Users","roleName":"KPI Admin","rolegrpId":null,"status":"A","createdByNameLc":null,"createdByNameEn":null,"modifiedByNameLc":"à¸™.à¸ª.à¸”à¸§à¸‡à¹�à¸‚ à¹�à¸ˆà¸§à¸ªà¸�à¸¸à¸¥","modifiedByNameEn":"นายบรรชา สารสิน","statusNameLc":"Active","statusNameEn":"Active","userList":null,"bandBuList":null,"functionIdList":null}
		];
		
		if ($scope.criteria.roleCode != null) {
			$scope.roleList = $filter('filter')($scope.roleList, function(value){return (value.roleCode == $scope.criteria.roleCode);});
		}
		if ($scope.criteria.roleName != null) {
			$scope.roleList = $filter('filter')($scope.roleList, function(value){return (value.roleName == $scope.criteria.roleName);});
		}
		
		if ($scope.criteria.status != null & $scope.criteria.status != "") {
			$scope.roleList = $filter('filter')($scope.roleList, function(value){return (value.status == $scope.criteria.status);});
		}
		
		$rootScope.paging.totalItems = $scope.roleList.length;
		$rootScope.paging.showing = _.getShowing($rootScope.paging.pageNumber, $rootScope.paging.limit, $scope.roleList.length);
	};
	
	$scope.search();
	
	$scope.selectPage = function(page) {
		$rootScope.paging.pageNumber = page;
		$scope.search();
	};
	
	//Delete Role
	$scope.deleteRole = function(deleteOne) {
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
		$location.path('admin-role/create');
	};
	
	$scope.gotoEdit = function(roleCode) {
		$location.path('admin-role/edit/'+roleCode);
	};
};


function AdminRoleDetailCtrl($rootScope, $scope, $http, $compile, $filter, $timeout, $routeParams, $location) {
	
	$scope.isSubmit = false;
	$scope.criteria = {};
	
	$scope.clear = function() {
		$rootScope.criteria = {};
	};
	// route parameter
	$scope.roleList = [{"userCode":"000010","createdBy":"KPIADM","createdDate":1385005799296,"email":"","status":"I","telephone":"00485775","modifiedBy":"KPIADM","modifiedDate":1386649451607,"userNameLc":"นายวิชาญ รัตนิพนธ์","userNameEn":"MR. VICHAN RATANIPHON","positionNameLc":"ผู้จัดการฝ่ายบริการลูกค้า","positionNameEn":"Customer Service Manager","statusNameLc":"ไม่ใช้งาน","statusNameEn":"Inactive","noOfAssignRole":0},{"userCode":"000011","createdBy":"KPIADM","createdDate":1384854199609,"email":"","status":"A","telephone":"","modifiedBy":"KPIADM","modifiedDate":1386306556843,"userNameLc":"น.ส.รัตติยา ไววิทย์","userNameEn":"MISS RATTIYA VAIVIT","positionNameLc":"ผู้จัดการฝ่ายบริการลูกค้า","positionNameEn":"Customer Service Manager","statusNameLc":"ใช้งาน","statusNameEn":"Active","noOfAssignRole":1},{"userCode":"000013","createdBy":"KPIADM","createdDate":1384854219843,"email":"","status":"A","telephone":"","modifiedBy":"KPIADM","modifiedDate":1385620237843,"userNameLc":"นางยุพิน ผลดี","userNameEn":"MRS. YUPIN PHONDEE","positionNameLc":"ผู้จัดการฝ่ายบริการลูกค้า","positionNameEn":"Customer Service Manager","statusNameLc":"ใช้งาน","statusNameEn":"Active","noOfAssignRole":1},{"userCode":"000014","createdBy":"KPIADM","createdDate":1384854230125,"email":"","status":"A","telephone":"","modifiedBy":"KPIADM","modifiedDate":1384942902657,"userNameLc":"นางปราณี ก่อวงษ์","userNameEn":"MRS. PRANEE KOWONG","positionNameLc":"ผู้จัดการฝ่ายบริการลูกค้า","positionNameEn":"Customer Service Manager","statusNameLc":"ใช้งาน","statusNameEn":"Active","noOfAssignRole":2},{"userCode":"000016","createdBy":"KPIADM","createdDate":1384854643741,"email":"","status":"A","telephone":"","modifiedBy":"KPIADM","modifiedDate":1384942911704,"userNameLc":"น.ส.วาสนา ทรพับ","userNameEn":"MISS VASANA THONPUB","positionNameLc":"ผู้จัดการฝ่ายบริการลูกค้า","positionNameEn":"Customer Service Manager","statusNameLc":"ใช้งาน","statusNameEn":"Active","noOfAssignRole":1},	{"userCode":"000017","createdBy":"KPIADM","createdDate":1384854675992,"email":"","status":"A","telephone":"","modifiedBy":"KPIADM","modifiedDate":1384942920266,"userNameLc":"นายนครชัย ชำกุล","userNameEn":"MR. NAKORCHAI CHOMKUL","positionNameLc":"ผู้จัดการฝ่ายบริการลูกค้า","positionNameEn":"Customer Service Manager","statusNameLc":"ใช้งาน","statusNameEn":"Active","noOfAssignRole":1},{"userCode":"000205","createdBy":"KPIADM","createdDate":1386324846640,"email":"","status":"A","telephone":"","modifiedBy":"KPIADM","modifiedDate":1386324846640,"userNameLc":"นายชวิน เหลืองขจร","userNameEn":"MR. CHAWIN LOUNGKAJON","positionNameLc":"ผู้จัดการฝ่ายบริการลูกค้า","positionNameEn":"Customer Service Manager","statusNameLc":"ใช้งาน","statusNameEn":"Active","noOfAssignRole":0},{"userCode":"000220","createdBy":"KPIADM","createdDate":1386320661359,"email":"","status":"A","telephone":"","modifiedBy":"KPIADM","modifiedDate":1386320661359,"userNameLc":"น.ส.พัสวีภาสุ์ อัปมาเต","userNameEn":"MISS PASSAWEEPA APPAMATE","positionNameLc":"ผู้จัดการฝ่ายบริการลูกค้า","positionNameEn":"Customer Service Manager","statusNameLc":"ใช้งาน","statusNameEn":"Active","noOfAssignRole":0},{"userCode":"000300","createdBy":"KPIADM","createdDate":1386328621281,"email":"","status":"A","telephone":"","modifiedBy":"KPIADM","modifiedDate":1386328942406,"userNameLc":"นายประทีป แท้วิริยะกุล","userNameEn":"MR. PRATEEP THAEVIRYAKUL","positionNameLc":"ผู้จัดการฝ่ายบริการลูกค้า","positionNameEn":"Customer Service Manager","statusNameLc":"ใช้งาน","statusNameEn":"Active","noOfAssignRole":0},{"userCode":"000306","createdBy":"KPIADM","createdDate":1386324558781,"email":"","status":"A","telephone":"","modifiedBy":"KPIADM","modifiedDate":1386324558781,"userNameLc":"นางจินดามณี มีทรัพย์","userNameEn":"MRS. JINDAMANEE MEESAP","positionNameLc":"ผู้จัดการฝ่ายบริการลูกค้า","positionNameEn":"Customer Service Manager","statusNameLc":"ใช้งาน","statusNameEn":"Active","noOfAssignRole":0},{"userCode":"027480","createdBy":"KPIADM","createdDate":1386303838640,"email":"","status":"A","telephone":"","modifiedBy":"KPIADM","modifiedDate":1386314112906,"userNameLc":"นายพิทักษ์ มีดอนไทย","userNameEn":"MR. PHITHAK MEEDONTHAI","positionNameLc":"ผู้จัดการฝ่ายบริการลูกค้า","positionNameEn":"Customer Service Manager","statusNameLc":"ใช้งาน","statusNameEn":"Active","noOfAssignRole":0},{"userCode":"071222","createdBy":"KPIADM","createdDate":1384333583859,"email":"","status":"A","telephone":"","modifiedBy":"KPIADM","modifiedDate":1384749063835,"userNameLc":"น.ส.เพ็ญนภา เทอดไพรสันต์","userNameEn":"MISS PENNAPA TURDPRISANT","positionNameLc":"ผู้จัดการฝ่ายบริการลูกค้า","positionNameEn":"Customer Service Manager","statusNameLc":"ใช้งาน","statusNameEn":"Active","noOfAssignRole":0},{"userCode":"148449","createdBy":"KPIADM","createdDate":1384327876578,"email":"","status":"A","telephone":"","modifiedBy":"KPIADM","modifiedDate":1384327876578,"userNameLc":"นายนพดล ชัยชนะกิจการ","userNameEn":"MR. NOPPADOL CHAICHANAKIDKARN","positionNameLc":"ผู้จัดการฝ่ายบริการลูกค้า","positionNameEn":"Customer Service Manager","statusNameLc":"ใช้งาน","statusNameEn":"Active","noOfAssignRole":0},{"userCode":"EX0055","createdBy":"KPIADM","createdDate":1385992081531,"email":"","status":"A","telephone":"","modifiedBy":"KPIADM","modifiedDate":1385992081531,"userNameLc":"นายอนุพงษ์ เครืองาม","userNameEn":"MR. ANUPONG KRUANGAM","positionNameLc":"ผู้จัดการฝ่ายบริการลูกค้า","positionNameEn":"Customer Service Manager","statusNameLc":"ใช้งาน","statusNameEn":"Active","noOfAssignRole":0},{"userCode":"KPIADM","createdBy":"SYSTEM","createdDate":1360126350734,"email":"n@n.com","status":"A","telephone":"089","modifiedBy":"KPIADM","modifiedDate":1387170905408,"userNameLc":"KPI Admin","userNameEn":"KPI ผู้ดูแลระบบ","statusNameLc":"ใช้งาน","statusNameEn":"Active","noOfAssignRole":2}];
	
	$scope.roleGroupList = [{"roleGrpId":1,"roleGrpName":"Admin"},{"roleGrpId":2,"roleGrpName":"Broker"},{"roleGrpId":3,"roleGrpName":"Underwriter"},{"roleGrpId":4,"roleGrpName":"Finance"},{"roleGrpId":5,"roleGrpName":"Marketting"}];
	
	$scope.allUserList = [{"userCode":"000010","createdBy":"PIMADM","createdDate":1385005799296,"email":"","status":"I","telephone":"00485775","updatedBy":"PIMADM","updatedDate":1386649451607,"userNameLc":"นายวิชาญ รัตนิพนธ์","userNameEn":"MR. VICHAN RATANIPHON","statusNameLc":"ไม่ใช้งาน","statusNameEn":"Inactive","noOfAssignRole":0},{"userCode":"000011","createdBy":"PIMADM","createdDate":1384854199609,"email":"","status":"A","telephone":"","updatedBy":"PIMADM","updatedDate":1386306556843,"userNameLc":"น.ส.รัตติยา ไววิทย์","userNameEn":"MISS RATTIYA VAIVIT","statusNameLc":"ใช้งาน","statusNameEn":"Active","noOfAssignRole":1},{"userCode":"000013","createdBy":"PIMADM","createdDate":1384854219843,"email":"","status":"A","telephone":"","updatedBy":"PIMADM","updatedDate":1385620237843,"userNameLc":"นางยุพิน ผลดี","userNameEn":"MRS. YUPIN PHONDEE","statusNameLc":"ใช้งาน","statusNameEn":"Active","noOfAssignRole":1},{"userCode":"000014","createdBy":"PIMADM","createdDate":1384854230125,"email":"","status":"A","telephone":"","updatedBy":"PIMADM","updatedDate":1384942902657,"userNameLc":"นางปราณี ก่อวงษ์","userNameEn":"MRS. PRANEE KOWONG","statusNameLc":"ใช้งาน","statusNameEn":"Active","noOfAssignRole":2},{"userCode":"000016","createdBy":"PIMADM","createdDate":1384854643741,"email":"","status":"A","telephone":"","updatedBy":"PIMADM","updatedDate":1384942911704,"userNameLc":"น.ส.วาสนา ทรพับ","userNameEn":"MISS VASANA THONPUB","statusNameLc":"ใช้งาน","statusNameEn":"Active","noOfAssignRole":1},{"userCode":"000017","createdBy":"PIMADM","createdDate":1384854675992,"email":"","status":"A","telephone":"","updatedBy":"PIMADM","updatedDate":1384942920266,"userNameLc":"นายนครชัย ชำกุล","userNameEn":"MR. NAKORCHAI CHOMKUL","statusNameLc":"ใช้งาน","statusNameEn":"Active","noOfAssignRole":1},{"userCode":"000205","createdBy":"PIMADM","createdDate":1386324846640,"email":"","status":"A","telephone":"","updatedBy":"PIMADM","updatedDate":1386324846640,"userNameLc":"นายชวิน เหลืองขจร","userNameEn":"MR. CHAWIN LOUNGKAJON","statusNameLc":"ใช้งาน","statusNameEn":"Active","noOfAssignRole":0},{"userCode":"000220","createdBy":"PIMADM","createdDate":1386320661359,"email":"","status":"A","telephone":"","updatedBy":"PIMADM","updatedDate":1386320661359,"userNameLc":"น.ส.พัสวีภาสุ์ อัปมาเต","userNameEn":"MISS PASSAWEEPA APPAMATE","statusNameLc":"ใช้งาน","statusNameEn":"Active","noOfAssignRole":0},{"userCode":"000300","createdBy":"PIMADM","createdDate":1386328621281,"email":"","status":"A","telephone":"","updatedBy":"PIMADM","updatedDate":1386328942406,"userNameLc":"นายประทีป แท้วิริยะกุล","userNameEn":"MR. PRATEEP THAEVIRYAKUL","statusNameLc":"ใช้งาน","statusNameEn":"Active","noOfAssignRole":0},{"userCode":"000306","createdBy":"PIMADM","createdDate":1386324558781,"email":"","status":"A","telephone":"","updatedBy":"PIMADM","updatedDate":1386324558781,"userNameLc":"นางจินดามณี มีทรัพย์","userNameEn":"MRS. JINDAMANEE MEESAP","statusNameLc":"ใช้งาน","statusNameEn":"Active","noOfAssignRole":0},{"userCode":"027480","createdBy":"PIMADM","createdDate":1386303838640,"email":"","status":"A","telephone":"","updatedBy":"PIMADM","updatedDate":1386314112906,"userNameLc":"นายพิทักษ์ มีดอนไทย","userNameEn":"MR. PHITHAK MEEDONTHAI","statusNameLc":"ใช้งาน","statusNameEn":"Active","noOfAssignRole":0},{"userCode":"071222","createdBy":"PIMADM","createdDate":1384333583859,"email":"","status":"A","telephone":"","updatedBy":"PIMADM","updatedDate":1384749063835,"userNameLc":"น.ส.เพ็ญนภา เทอดไพรสันต์","userNameEn":"MISS PENNAPA T๊URDPRISANT","statusNameLc":"ใช้งาน","statusNameEn":"Active","noOfAssignRole":0},{"userCode":"148449","createdBy":"PIMADM","createdDate":1384327876578,"email":"","status":"A","telephone":"","updatedBy":"PIMADM","updatedDate":1384327876578,"userNameLc":"นายนพดล ชัยชนะกิจการ","userNameEn":"MR. NOPPADOL CHAICHANAKIDKARN","statusNameLc":"ใช้งาน","statusNameEn":"Active","noOfAssignRole":0},{"userCode":"EX0055","createdBy":"PIMADM","createdDate":1385992081531,"email":"","status":"A","telephone":"","updatedBy":"PIMADM","updatedDate":1385992081531,"userNameLc":"นายอนุพงษ์ เครืองาม","userNameEn":"MR. ANUPONG KRUANGAM","statusNameLc":"ใช้งาน","statusNameEn":"Active","noOfAssignRole":0},{"userCode":"PIMADM","createdBy":"SYSTEM","createdDate":1360126350734,"email":"n@n.com","status":"A","telephone":"089","updatedBy":"PIMADM","updatedDate":1387170905408,"userNameLc":"Admin","userNameEn":"ผู้ดูแลระบบ","statusNameLc":"ใช้งาน","statusNameEn":"Active","noOfAssignRole":2}];
	
	$scope.mode = $routeParams.mode;
	$scope.id = $routeParams.id;
	// check mode
	if ($scope.mode === 'create') {
		// Clear Search Criteria
		$scope.clear = function(){
			$rootScope.criteria = {};
		};
		$scope.roleDataList = {
			status : 'A'
		};
		
		//Clear Form
		$scope.clearNewForm = function() {
			$scope.roleDataList = {
				roleCode : "",
				roleNameLc : "",
				roleNameEn : "",
				statusNameLc : "",
				statusNameEn : "",
				email: "",
				telephone: "",
				status : 'A'
			};
		
		};	
		$scope.clearNewForm();	
		
		$scope.roleCodeKeyUp = function() {
			$scope.roleDataList.roleNameEn = "";
			$scope.roleDataList.roleNameLc = "";
			$scope.roleDataList.telephone = "";
			$scope.roleDataList.email = "";
		};
		
		$('.code').on('keyup', function(){	
			if($scope.roleDataList.roleCode != ''){
				$scope.isSubmit = false;				
			}	
			$scope.$apply();    	
		});
		
			
		//Create Role
		$scope.createRole = function() {
			$scope.isSubmit = true;
		
			if ($scope.form.$invalid) { // validate form
				$scope.app.addAlert('gritter-error', 'Incorrect data !!!', 4000);
				return;
			}
	
			//Call back-end
			$rootScope.isLoading = true;
			_.compactObject($scope.role);
			//var url = "api/user/insertUser";
			
			$scope.roleDataList.createdBy = $scope.authorization.getCurrentUserCode();
			$scope.roleDataList.modifiedBy = $scope.authorization.getCurrentUserCode();
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
			$location.path('/admin-role');
		};
	}
	else {	
		
		$scope.roleCode = $routeParams.id;
		if ($scope.roleCode) {
			// Set Tab 1
			var data = [
             {"roleId":4,"createdBy":null,"createdDate":null,"modifiedBy":"KPI00001","modifiedDate":1387788699000,"roleCode":"BROKER_USER","roleDesc":"For Broker Users","roleName":"Broker User","rolegrpId":null,"status":"A","createdByNameLc":null,"createdByNameEn":null,"modifiedByNameLc":"à¸™à¸²à¸¢à¸§à¸´à¸Šà¸±à¸¢ à¹€à¸šà¸�à¸�à¸²à¸”à¸´à¸¥à¸�","modifiedByNameEn":"นายบรรชา สารสิน","statusNameLc":"Active","statusNameEn":"Active","userList":null,"bandBuList":null,"functionIdList":null}
			,{"roleId":9,"createdBy":null,"createdDate":null,"modifiedBy":"KPI00001","modifiedDate":1386145552000,"roleCode":"UW_USER","roleDesc":"For Underwriter Users","roleName":"UW User","rolegrpId":null,"status":"A","createdByNameLc":null,"createdByNameEn":null,"modifiedByNameLc":"à¸™.à¸ª.à¸”à¸§à¸‡à¹�à¸‚ à¹�à¸ˆà¸§à¸ªà¸�à¸¸à¸¥","modifiedByNameEn":"นายบรรชา สารสิน","statusNameLc":"Active","statusNameEn":"Active","userList":null,"bandBuList":null,"functionIdList":null}
			,{"roleId":8,"createdBy":null,"createdDate":null,"modifiedBy":"KPI00001","modifiedDate":1386145552000,"roleCode":"FINANCE_USER","roleDesc":"For Finance Users","roleName":"Finance User","rolegrpId":null,"status":"A","createdByNameLc":null,"createdByNameEn":null,"modifiedByNameLc":"à¸™.à¸ª.à¸”à¸§à¸‡à¹�à¸‚ à¹�à¸ˆà¸§à¸ªà¸�à¸¸à¸¥","modifiedByNameEn":"นายบรรชา สารสิน","statusNameLc":"Active","statusNameEn":"Active","userList":null,"bandBuList":null,"functionIdList":null}
			,{"roleId":6,"createdBy":null,"createdDate":null,"modifiedBy":"KPI00001","modifiedDate":1387788728000,"roleCode":"MARKETTING_USER","roleDesc":"For Marketting User","roleName":"Marketing User","rolegrpId":null,"status":"A","createdByNameLc":null,"createdByNameEn":null,"modifiedByNameLc":"à¸™à¸²à¸¢à¸§à¸´à¸Šà¸±à¸¢ à¹€à¸šà¸�à¸�à¸²à¸”à¸´à¸¥à¸�","modifiedByNameEn":"นายบรรชา สารสิน","statusNameLc":"Active","statusNameEn":"Active","userList":null,"bandBuList":null,"functionIdList":null}
			,{"roleId":2,"createdBy":null,"createdDate":null,"modifiedBy":"KPI00001","modifiedDate":1388638787000,"roleCode":"KPI_ADMIN","roleDesc":"For KPI ADMIN Users","roleName":"KPI Admin","rolegrpId":null,"status":"A","createdByNameLc":null,"createdByNameEn":null,"modifiedByNameLc":"à¸™.à¸ª.à¸”à¸§à¸‡à¹�à¸‚ à¹�à¸ˆà¸§à¸ªà¸�à¸¸à¸¥","modifiedByNameEn":"นายบรรชา สารสิน","statusNameLc":"Active","statusNameEn":"Active","userList":null,"bandBuList":null,"functionIdList":null}
			];
			
			$scope.roleData = data;
			$scope.roleDatatList = _.findWhere($scope.roleData, {'roleCode': $scope.roleCode +''});
				
				// Set Tab 2
//				$scope.getFunc(data.rolegrpId);
				
				// Set Tab 3
				//$scope.tab3List = data.bandBuList;
				$scope.tab3List = [];
				_.each(data.bandBuList, function(obj, index) {
					var item = {
						id 				: index+1,
						buGroup 		: obj.buGroup,
						bandCode 		: obj.bandCode,
						buGroupNameEn 	: obj['buGroupName'+$scope.app.lang.currentLang],
						bandNameEn 		: obj['bandName'+$scope.app.lang.currentLang]
					};
					$scope.tab3List.push(item);
				});
				
				// Set Tab 4
				$scope.selectedUserList = [];
				$scope.allUserList = [];
				_.each(data.userList, function(obj, index) {
					$scope.selectedUserList.push(obj);
				});
				
			//});
		}
		
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
	
	//------------- Tab 1 ----------------
	
	// select roleGroup
	$scope.roleGroupChange = function() {
		$scope.getFunc($scope.role.rolegrpId);
		if($scope.roleData.rolegrpId != 2 && $scope.roleData.rolegrpId != 3){
			$scope.selectData.buGroup = '';
			$scope.selectData.band = '';
			$('ul.nav-tabs > li:eq(2) a').removeAttr('data-toggle').css('cursor','not-allowed');
			
			$scope.tab3List = [];
		}else{
			$('ul.nav-tabs > li:eq(2) a').attr('data-toggle','tab').css('cursor','pointer');
		}
		
		if($scope.roleData.rolegrpId > 5){
			$('ul.nav-tabs > li:eq(3) a').removeAttr('data-toggle').css('cursor','not-allowed');
			
			$scope.allUserList = [];
			$scope.selectedUserList = [];
		}else{
			$('ul.nav-tabs > li:eq(3) a').attr('data-toggle','tab').css('cursor','pointer');
		}
	};
	
	$scope.getFunc = function( i ){
		$scope.roleFunctionCriteria = {};
		$scope.roleFunctionCriteria.roleGroupId = i;
		$scope.roleFunctionCriteria.roleId = '';
		
		//var url = _.toHttpGetUrl('rest/role/getFunctionsByRoleGroupIdAndRoleId',$scope.roleFunctionCriteria);
		//$http.get(url).success(function(data) {
		$scope.treeData = [{"title":"Home","isFolder": true,"key": "1","children": [],"select": false,"expand": true},
		                   {"title":"Application",
									"isFolder": true,
									"key": "2",
									"children": [{
												"title": "All Application List",
												"isFolder": true,
												"key": "3",
												"children": [{"title":"Application Review",
															  "isFolder": false,
															  "key": "4",
															  "children": [],
															  "select": false,
															  "expand": true},
															{"title": "Application Edit",
															 "isFolder": false,
															 "key": "5",
															 "children": [],
															 "select": false,
															 "expand": true}],
												"select": false,
												"expand": true},
											  {
												"title": "Application for UW Review",
												"isFolder": true,
												"key": "6",
												"children": [{"title": "Application Review",
															"isFolder": false,
													        "key": "7",
													        "children": [],
													        "select": false,
													        "expand": true},
													        
												           {"title": "Application Accept",
													        "isFolder": false,
													        "key": "8",
													        "children": [],
													        "select": false,
													        "expand": true},
													        
												           {"title": "Application Reject",
														    "isFolder": false,
														    "key": "8",
														    "children": [],
														    "select": false,
														    "expand": true}],
												"select": false,
												"expand": true},
											  {
												"title": "Application for Surveyor",
												"isFolder": true,
												"key": "9",
												"children": [{"title": "Application Review",
													          "isFolder": false,
													          "key": "10",
													          "children": [],
													          "select": false,
													          "expand": true},
													          
														     {"title": "Application Edit",
															  "isFolder": false,
															  "key": "11",
															  "children": [],
															  "select": false,
															  "expand": true}],
												"select": false,
												"expand": true}],
										"select": false,
										"expand": true
									  },
									  {
										"title": "System Setup",
										"isFolder": true,
										"key": "213",
										"children": [
										  {
											"title": "User Setting List",
											"isFolder": true,
											"key": "232",
											"children": [
											  {
												"title": "User Setting Create",
												"isFolder": false,
												"key": "233",
												"children": [],
												"select": false,
												"expand": true
											  },
											  {
												"title": "User Setting Edit",
												"isFolder": false,
												"key": "234",
												"children": [],
												"select": false,
												"expand": true
											  },
											  {
												"title": "User Setting Delete",
												"isFolder": false,
												"key": "234",
												"children": [],
												"select": false,
												"expand": true
											  }
											],
											"select": false,
											"expand": true
										  },
										  {
											"title": "Role Setting List",
											"isFolder": true,
											"key": "235",
											"children": [
											  {
												"title": "Role Setting Create",
												"isFolder": false,
												"key": "236",
												"children": [],
												"select": false,
												"expand": true
											  },
											  {
												"title": "Role Setting Edit",
												"isFolder": false,
												"key": "237",
												"children": [],
												"select": false,
												"expand": true
											  },
											  {
												"title": "Role Setting Delete",
												"isFolder": false,
												"key": "238",
												"children": [],
												"select": false,
												"expand": true
											  }
											],
											"select": false,
											"expand": true
										  }
										],
										"select": true,
										"expand": true
									  }
								];
			$scope.writeDynatree();
		//});
	};
	
	//------------- Tab 2 ----------------
	
	$scope.writeDynatree = function(){
		$('#funtions_tree').dynatree({
			checkbox: true, 
			selectMode: 3, 
			children: $scope.treeData, 
			onSelect: function(select, node) { 
				var selKeys = $.map(node.tree.getSelectedNodesWithSubSel(), function(node) {
					return node.data.key; 
				}); 
				$("#functionIdStr").val(selKeys.join(","));
			}, 
			onDblClick: function(node, event) {
				node.toggleSelect(); 
			}, 
			onKeydown: function(node, event) {
				if( event.which == 32 ) { 
					node.toggleSelect(); 
					return false; 
				} 
			}
		});
		
		$("#funtions_tree").dynatree("getTree").reload();
		
		//Expand all dynatree
		$("#funtions_tree").dynatree("getRoot").visit(function(node){
			node.expand(true);
		});
		
	};
	
	//------------- Tab 3 ----------------
	
	$scope.tab3Add = function(g, b){
		//if( !$scope.tab3.$invalid){
		if( $('#buGroup').val() != '' && $('#band').val() != '' ){
			
			var str = true; var dup = '';
			var temp1 = {}; var temp2 = {};
			
			temp1 = _.findWhere($scope.BuGroup,{value1: $scope.selectData.buGroup});
			
			// Check duplicate
			if(b == 'A'){
				var addAllBand = $scope.getBand.slice(0);
				addAllBand.shift();
				
				_.each($scope.tab3List, function(obj1, index1) {
					_.each(addAllBand, function(obj2, index2) {
						if(obj1.buGroup == temp1.value1 && obj1.bandCode == obj2.bandCode){
							str = false;
							dup = obj1.buGroupNameEn +' & '+ obj1['bandName'+$scope.app.lang.currentLang];
							return false;
						}
					});
					if(!str)
						return false;
				});
				
			}else{
				temp2 = _.findWhere($scope.getBand,{bandCode: $scope.selectData.band});
				
				_.each($scope.tab3List, function(obj, index) {
					if(obj.buGroup == temp1.value1 && obj.bandCode == temp2.bandCode){
						str = false;
						dup = obj.buGroupNameEn +' & '+ obj['bandName'+$scope.app.lang.currentLang];
					}
				});
			}
			
			// Add array
			if(str){
				
				if(b == 'A'){
					
					_.each(addAllBand, function(obj, index) {
						var id = $scope.tab3List.length+1;
						$scope.tab3List.push({ 
							id : id,
							buGroup : obj.buGroup,
							bandCode : obj.bandCode,
							buGroupNameEn : temp1['listOfValueName'+$scope.app.lang.currentLang],
							bandNameEn : obj['bandName'+$scope.app.lang.currentLang]
						});
					});
					
				}else{
					var id = $scope.tab3List.length+1;
					$scope.tab3List.push({ 
						id : id,
						buGroup : $scope.selectData.buGroup,
						bandCode : $scope.selectData.band,
						buGroupNameEn : temp1['listOfValueName'+$scope.app.lang.currentLang],
						bandNameEn : temp2['bandName'+$scope.app.lang.currentLang]
					});
				}
				
				/*$scope.selectData.buGroup = '';
				$scope.selectData.band = '';*/
			}else{
				$scope.app.addAlert('gritter-warning', dup +' Duplicate', 3000);
				/*$scope.selectData.buGroup = '';
				$scope.selectData.band = '';*/
			}
		} else {
			$scope.app.addAlert('gritter-warning', 'Please Select BU Group & Band', 3000);
		}
		//alert($filter('json')($scope.tab3List));
	};
	
	// Delete
	$scope.tab3Del = function(i){
		$scope.app.confirmDeleteBox().open().then(function(result) {
			if (result) {
				/*i -= 1;
				$scope.tab3List.splice(i,1);*/
				var removeItem = i;
				$scope.tab3List = jQuery.grep($scope.tab3List, function(value) {
				  return value.id != removeItem;
				});
			};
		});
	};
	
	$scope.tab3DelAll = function() {
		$scope.app.confirmDeleteBox().open().then(function(result) {
			if (result) {
				$scope.buMapID = [];
				$('#tb3 tbody').find('input:checkbox:checked').each(function(index, element) {
					$scope.buMapID.push(element.value);
				});
				
				if ( $scope.buMapID.length > 0 ) {
					_.each($scope.buMapID, function(obj, index){
						var removeItem = obj;
						$scope.tab3List = jQuery.grep($scope.tab3List, function(value) {
						  return value.id != removeItem;
						});
					});
					//alert($filter('json')($scope.tab3List));
				}
				
				$('#chk_all').prop('checked', false);
			}
		});
	};
	
	$scope.change = function(){
		//$http.get('rest/lookup/getBands/'+$scope.selectData.buGroup).success(function(data) {
			var data = [{"buGroup":"ST","buGroupNameLc":null,"buGroupNameEn":null,"bandCode":"10","bandNameLc":"Operational","bandNameEn":"Operational","minLvl":"0","maxLvl":"30","bandDesc":"less than or equal 30"},{"buGroup":"ST","buGroupNameLc":null,"buGroupNameEn":null,"bandCode":"20","bandNameLc":"Supervisory","bandNameEn":"Supervisory","minLvl":"31","maxLvl":"40","bandDesc":"granther than  30 and less than or equal 40"},{"buGroup":"ST","buGroupNameLc":null,"buGroupNameEn":null,"bandCode":"30","bandNameLc":"Managerial","bandNameEn":"Managerial","minLvl":"41","maxLvl":"44","bandDesc":"granther than  40 and less than or equal 44"},{"buGroup":"ST","buGroupNameLc":null,"buGroupNameEn":null,"bandCode":"40","bandNameLc":"Area","bandNameEn":"Area","minLvl":"45","maxLvl":"50","bandDesc":"granther than  44 and less than or equal 50"},{"buGroup":"ST","buGroupNameLc":null,"buGroupNameEn":null,"bandCode":"50","bandNameLc":"SGM","bandNameEn":"SGM","minLvl":"51","maxLvl":"72","bandDesc":"granther than  50 and less than or equal 72"},{"buGroup":"ST","buGroupNameLc":null,"buGroupNameEn":null,"bandCode":"60","bandNameLc":"Executive","bandNameEn":"Executive","minLvl":"73","maxLvl":"80","bandDesc":"granther than  72 and less than or equal 80"},{"buGroup":"ST","buGroupNameLc":null,"buGroupNameEn":null,"bandCode":"70","bandNameLc":"Top Executive","bandNameEn":"Top Executive","minLvl":"80","maxLvl":"100","bandDesc":"granther than  80  "}];
			
			var obj = { bandCode: 'A', bandNameEn: 'All', bandNameLc: 'All' };
			data.unshift(obj);
			
			$scope.getBand = data;
		//});
	};
	
	//------------- Tab 4 ----------------
	
	// Search User
	$scope.userSearch = function(){
		//if( ($scope.criteria.empCode != undefined && $scope.criteria.empCode != '') || ($scope.criteria.empName != undefined && $scope.criteria.empName != '')){
			//$http.post('rest/user/findUsersByCriteria',$scope.criteria).success(function(data) {
				$scope.allUserList = [];
				//if (data) {
					//alert($filter('json')(data));
				$scope.allUserList = [{"userCode":"000010","createdBy":"PIMADM","createdDate":1385005799296,"email":"","status":"I","telephone":"00485775","updatedBy":"PIMADM","updatedDate":1386649451607,"userNameLc":"นายวิชาญ รัตนิพนธ์","userNameEn":"MR. VICHAN RATANIPHON","statusNameLc":"ไม่ใช้งาน","statusNameEn":"Inactive","noOfAssignRole":0},{"userCode":"000011","createdBy":"PIMADM","createdDate":1384854199609,"email":"","status":"A","telephone":"","updatedBy":"PIMADM","updatedDate":1386306556843,"userNameLc":"น.ส.รัตติยา ไววิทย์","userNameEn":"MISS RATTIYA VAIVIT","statusNameLc":"ใช้งาน","statusNameEn":"Active","noOfAssignRole":1},{"userCode":"000013","createdBy":"PIMADM","createdDate":1384854219843,"email":"","status":"A","telephone":"","updatedBy":"PIMADM","updatedDate":1385620237843,"userNameLc":"นางยุพิน ผลดี","userNameEn":"MRS. YUPIN PHONDEE","statusNameLc":"ใช้งาน","statusNameEn":"Active","noOfAssignRole":1},{"userCode":"000014","createdBy":"PIMADM","createdDate":1384854230125,"email":"","status":"A","telephone":"","updatedBy":"PIMADM","updatedDate":1384942902657,"userNameLc":"นางปราณี ก่อวงษ์","userNameEn":"MRS. PRANEE KOWONG","statusNameLc":"ใช้งาน","statusNameEn":"Active","noOfAssignRole":2},{"userCode":"000016","createdBy":"PIMADM","createdDate":1384854643741,"email":"","status":"A","telephone":"","updatedBy":"PIMADM","updatedDate":1384942911704,"userNameLc":"น.ส.วาสนา ทรพับ","userNameEn":"MISS VASANA THONPUB","statusNameLc":"ใช้งาน","statusNameEn":"Active","noOfAssignRole":1},{"userCode":"000017","createdBy":"PIMADM","createdDate":1384854675992,"email":"","status":"A","telephone":"","updatedBy":"PIMADM","updatedDate":1384942920266,"userNameLc":"นายนครชัย ชำกุล","userNameEn":"MR. NAKORCHAI CHOMKUL","statusNameLc":"ใช้งาน","statusNameEn":"Active","noOfAssignRole":1},{"userCode":"000205","createdBy":"PIMADM","createdDate":1386324846640,"email":"","status":"A","telephone":"","updatedBy":"PIMADM","updatedDate":1386324846640,"userNameLc":"นายชวิน เหลืองขจร","userNameEn":"MR. CHAWIN LOUNGKAJON","statusNameLc":"ใช้งาน","statusNameEn":"Active","noOfAssignRole":0},{"userCode":"000220","createdBy":"PIMADM","createdDate":1386320661359,"email":"","status":"A","telephone":"","updatedBy":"PIMADM","updatedDate":1386320661359,"userNameLc":"น.ส.พัสวีภาสุ์ อัปมาเต","userNameEn":"MISS PASSAWEEPA APPAMATE","statusNameLc":"ใช้งาน","statusNameEn":"Active","noOfAssignRole":0},{"userCode":"000300","createdBy":"PIMADM","createdDate":1386328621281,"email":"","status":"A","telephone":"","updatedBy":"PIMADM","updatedDate":1386328942406,"userNameLc":"นายประทีป แท้วิริยะกุล","userNameEn":"MR. PRATEEP THAEVIRYAKUL","statusNameLc":"ใช้งาน","statusNameEn":"Active","noOfAssignRole":0},{"userCode":"000306","createdBy":"PIMADM","createdDate":1386324558781,"email":"","status":"A","telephone":"","updatedBy":"PIMADM","updatedDate":1386324558781,"userNameLc":"นางจินดามณี มีทรัพย์","userNameEn":"MRS. JINDAMANEE MEESAP","statusNameLc":"ใช้งาน","statusNameEn":"Active","noOfAssignRole":0},{"userCode":"027480","createdBy":"PIMADM","createdDate":1386303838640,"email":"","status":"A","telephone":"","updatedBy":"PIMADM","updatedDate":1386314112906,"userNameLc":"นายพิทักษ์ มีดอนไทย","userNameEn":"MR. PHITHAK MEEDONTHAI","statusNameLc":"ใช้งาน","statusNameEn":"Active","noOfAssignRole":0},{"userCode":"071222","createdBy":"PIMADM","createdDate":1384333583859,"email":"","status":"A","telephone":"","updatedBy":"PIMADM","updatedDate":1384749063835,"userNameLc":"น.ส.เพ็ญนภา เทอดไพรสันต์","userNameEn":"MISS PENNAPA T๊URDPRISANT","statusNameLc":"ใช้งาน","statusNameEn":"Active","noOfAssignRole":0},{"userCode":"148449","createdBy":"PIMADM","createdDate":1384327876578,"email":"","status":"A","telephone":"","updatedBy":"PIMADM","updatedDate":1384327876578,"userNameLc":"นายนพดล ชัยชนะกิจการ","userNameEn":"MR. NOPPADOL CHAICHANAKIDKARN","statusNameLc":"ใช้งาน","statusNameEn":"Active","noOfAssignRole":0},{"userCode":"EX0055","createdBy":"PIMADM","createdDate":1385992081531,"email":"","status":"A","telephone":"","updatedBy":"PIMADM","updatedDate":1385992081531,"userNameLc":"นายอนุพงษ์ เครืองาม","userNameEn":"MR. ANUPONG KRUANGAM","statusNameLc":"ใช้งาน","statusNameEn":"Active","noOfAssignRole":0},{"userCode":"PIMADM","createdBy":"SYSTEM","createdDate":1360126350734,"email":"n@n.com","status":"A","telephone":"089","updatedBy":"PIMADM","updatedDate":1387170905408,"userNameLc":"Admin","userNameEn":"ผู้ดูแลระบบ","statusNameLc":"ใช้งาน","statusNameEn":"Active","noOfAssignRole":2}];
					$scope.cutAlluserListBySelected();
				//}
			//});
		//}
	};
	
	//Splice allUserList
	$scope.cutAlluserListBySelected = function() {
		//Cut already selected from allUserList
		_.each($scope.selectedUserList, function(obj1, index1) {
			_.each($scope.allUserList, function(obj2, index2) {
				if ( obj1.empCode == obj2.empCode ){
					$scope.allUserList.splice(index2, 1);
				}
			});
		});
	};
	
	
	//===================================== Beginning Run =============================//
	
	$scope.back = function() {
		$location.path('admin-role');
	};
		
};