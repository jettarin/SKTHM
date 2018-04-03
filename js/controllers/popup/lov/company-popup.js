function addCompanyPopupCtrl($rootScope, $scope, $modalInstance, $http, $compile, $timeout, $filter, $location, $log, $route, $routeParams, $translate, myFunction, $modal, $window) {
    $log.info('Enter addCompanyPopupCtrl');



    $scope.save = function (){
      $http.get('API/lov/saveCompany.php?com_name='+$rootScope.criteria.com_name+'&com_address='+$rootScope.criteria.com_address+'&com_tell='+$rootScope.criteria.com_tell).success(function (data){
        $scope.saveCompany = data;
        if($scope.saveCompany==1){
          location.reload();
        }
      })
    }
    $scope.cancel = function () {
        $modalInstance.dismiss('cancel');
    };
}
function editCompanyPopupCtrl($rootScope, $scope, $modalInstance, $http, $compile, $timeout, $filter, $location, $log, $route, $routeParams, $translate, myFunction, $modal, $window , params_com_id) {
    $log.info('Enter editCompanyPopupCtrl');

    $scope.com_id = params_com_id;
    $http.get('API/lov/getCompanyById.php?com_id='+$scope.com_id).success(function (data){
      $scope.updateCompany = data;
      $rootScope.criteria.com_name = $scope.updateCompany.com_name;
      $rootScope.criteria.com_address = $scope.updateCompany.com_address;
      $rootScope.criteria.com_tell = $scope.updateCompany.com_tell;
    })
    $scope.edit = function (){
      $http.get('API/lov/updateCompany.php?com_id='+$scope.com_id+'&com_name='+$rootScope.criteria.com_name+'&com_address='+$rootScope.criteria.com_address+'&com_tell='+$rootScope.criteria.com_tell).success(function (data){
        $scope.updateCompany = data;
        if($scope.updateCompany == 1){
          location.reload();
        }
      });
    }
    $scope.cancel = function () {
        $modalInstance.dismiss('cancel');
    };
}
