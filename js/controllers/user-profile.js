angular.module('myApp').config([ '$routeProvider', function($routeProvider) {
	$routeProvider.when("/user-profile", {templateUrl: _.toHttpGetUrl("content/profile/user-profile.html"), controller: UserProfileCtrl});
} ]);

function UserProfileCtrl($rootScope, $scope, $http, $compile, $timeout, $filter, $location) {
	
	$timeout(function() {
		
		$scope.isSubmit = false;
		$scope.criteria = {};
		
		$scope.getEmployeeProfile = function() {
			var url = _.toHttpGetUrl('rest/user/getEmployeeProfile', {empCode: $rootScope.app.user.empCode});
			$http.get(url).success(function(data) {
				$scope.userProfile = data;
				$rootScope.app.user = data;
				
				$http.get(_.toHttpGetUrl('rest/lookup/getBuTypes/' + $scope.userProfile.buGroup)).success(function(data) {
					$scope.lookupBuType = data;
					$scope.criteria.buTypeCode = $scope.userProfile.buTypeCode;
					$scope.changeBu();
				});
			});
		};
		
		$scope.getEmployeeProfile();
		
		//Get division follow selected Bu type 
		$scope.changeBu = function() {
			$scope.criteria.divCode = [];
			$scope.criteria.deptCode = [];
			var url = _.toHttpGetUrl('rest/lookup/getDivisions',{buTypeCode:$scope.criteria.buTypeCode});
			$http.get(url).success(function(data) {
				$scope.lookupDiv = data;
				$scope.criteria.divCode = $scope.userProfile.divisionCode;
				$scope.changeDiv();
			});	
		};
		
		//Get department follow selected division 
		$scope.changeDiv = function() {
			$scope.criteria.deptCode = [];
			var url = _.toHttpGetUrl('rest/lookup/getDepartments',{buTypeCode:$scope.criteria.buTypeCode,divCode:$scope.criteria.divCode});
			$http.get(url).success(function(data) {
				$scope.lookupDept = data;
			});	
		};
		
		$scope.callModalPerson = function() {
			$scope.criteria = {};
			$scope.criteria.buTypeCode = $scope.userProfile.buTypeCode;
			$scope.criteria.divCode = $scope.userProfile.divisionCode;
			$scope.page.offset = 0;
			$scope.page.nRow = 0;
			$scope.personList = [];
			$('.pagination').bootstrapPaginator({
				currentPage: 1,
	            totalPages: 1
			});
		};
		
		$scope.searchPerson = function() {
			$scope.page.offset = 0;
			$scope.criteria.numLvl = $scope.userProfile.numLvl ;
			$http.post('rest/lookup/findManagers',$scope.criteria).success(function(data){
				$scope.personList = data ;
				if ($scope.personList.length == 0) {
					$scope.page.nRow = 0;
					$('.pagination').bootstrapPaginator({
			            totalPages: 0
					});
				} else {
					$scope.page.nRow = $scope.page.offset+$scope.page.limit;
					if ($scope.page.nRow > $scope.personList.length) {
						$scope.page.nRow = $scope.personList.length;
					}
					$scope.page.nPage = Math.ceil($scope.personList.length/$scope.page.limit);
					for (var i = 0; i<$scope.page.nPage; i++) {
						$scope.page.nPageArr.push(i+1);
					}
					$('.pagination').bootstrapPaginator({
						currentPage: 1,
			            totalPages: $scope.page.nPage,
			            onPageClicked: function(e,originalEvent,type,page){
			            	$scope.app.goPage(page - 1,$scope.personList);
			            	$scope.$apply(); 
			            }
					});
				}
			});	
		};
		
		// Clear criteria modal search Person 
		$scope.clearSearh = function() {
			$scope.criteria = {};
		};
		
		$scope.getPerson = function(empCode) {
			var obj = {} ;
			obj.empCode = empCode ;
			$http.post('rest/lookup/findEmpProfiles', obj).success(function(data) {
				$scope.userProfile.lineManagerCode = data[0].employeeCode;
				$scope.userProfile.lineManagerNameLc = data[0].namEmpLc;
				$scope.userProfile.lineManagerNameEn = data[0].namEmpEn;
			});	
			$('#modalSearchPerson').modal('hide');
		};
		
		$scope.updateProfile = function() {
			$scope.isSubmit = true;
			
			//validate form
			if ($scope.editForm.$invalid) {
				$rootScope.app.addAlert('gritter-error', 'Incomplete information. Please check the data again.', true);
				return;
			}
			
			//Call back-end
			var obj = {
				employeeCode: $scope.userProfile.empCode
				,lineManagerCode: $scope.userProfile.lineManagerCode
				,createdBy: $rootScope.app.user.empCode
				,modifiedBy: $rootScope.app.user.empCode
			};
			_.compactObject(obj);
			
			var url = "rest/user/updateEmployeeProfile";
			$http.post(url, obj).success(function(data) {
				$scope.app.addAlert('gritter-success', 'Update Profile Successful.', true);
				$scope.getEmployeeProfile();
				
				if (!$rootScope.isBackProfile) {
					$rootScope.isBackProfile = true;
					$("#sidebar").show();
					$("#sidebar").removeAttr("style");
					$(".main-content").removeAttr("style");
					
					$scope.back();
				}
			});
		};
		
		//Back
		$scope.back = function() {
			$location.path('/');
		};
		
	}, 0);
	
}