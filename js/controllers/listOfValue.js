angular.module('myApp').config([ '$routeProvider', function($routeProvider) {
    $routeProvider.when("/company",{templateUrl:_.toHttpGetUrl('content/lov/company.html'),controller: CompanyListCtrl});


} ]);


function CompanyListCtrl($rootScope, $scope, $http, $compile, $timeout, $filter, $location, $log, $route, $routeParams, $translate,$modal,myFunction) {
    $log.info('Enter CompanyListCtrl');

    $scope.search = function (){
      $http.get('API/lov/getCompany.php').success(function (data){
        $scope.getCompanyList = data;
      });
    }
    $scope.search();



    $scope.addCompany = function (){
      var modalInstance = $modal.open({
          templateUrl: 'content/popup/lov/addCompany.html',
          controller: addCompanyPopupCtrl,
          backdrop: 'static',
          windowClass: 'large',
          keyboard: false,
          resolve: {
              params_job_id: function () {
                  return true;
              }
          }
      });
      modalInstance.result.then(function (isClose) {
      }, function () {
          $log.info('Modal dismissed at: ' + new Date());
      });
    }
    $scope.editCompany = function (com_id){
      var modalInstance = $modal.open({
          templateUrl: 'content/popup/lov/editCompany.html',
          controller: editCompanyPopupCtrl,
          backdrop: 'static',
          windowClass: 'large',
          keyboard: false,
          resolve: {
              params_com_id: function () {
                  return com_id;
              }
          }
      });
      modalInstance.result.then(function (isClose) {
      }, function () {
          $log.info('Modal dismissed at: ' + new Date());
      });
    }


    	$scope.deleteCompany = function (com_id){
    		myFunction.confirmDeleteBox().result.then(function(ok) {
    			if (ok) {

            $http.get('API/lov/deleteCompany.php?com_id='+com_id).success(function (data){
              $scope.deleteCompany = data;
              if($scope.deleteCompany == 1){
                $scope.app.addAlert('gritter-success', 'การลบเรียบร้อย', 4000);
                $scope.search();
              }
            });

    			};
    		});
    	}
}
