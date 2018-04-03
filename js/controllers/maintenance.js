angular.module('myApp').config([ '$routeProvider', function($routeProvider) {
  $routeProvider.when("/maintenance", {templateUrl: _.toHttpGetUrl("content/maintenance/form.html"), controller: MaintenanceFormCtrl});
	$routeProvider.when("/maintenance-list", {templateUrl: _.toHttpGetUrl("content/maintenance/list.html"), controller: MaintenanceListCtrl});
} ]);

function MaintenanceFormCtrl($rootScope, $scope, $http, $compile, $timeout, $filter, $location, $log, myFunction) {
$log.info('Enter MaintenanceFormCtrl');

$scope.id = user_id;
if (!$rootScope.paging) {
  $rootScope.paging = APP.DEFAULT_PAGING;
}
if (!$rootScope.criteria) {
$rootScope.criteria = {};
 }

$scope.selectMulti = function (val){
  $scope.serviceStr = val.toString();
  console.log($scope.serviceStr);
}
var dateStr = new Date();
var d = ("0" + (dateStr.getDate())).slice(-2);
var m = dateStr.getMonth();
var calM = ("0" + (dateStr.getMonth() + 1)).slice(-2);
var y = dateStr.getFullYear();
var calYNow = y + 543;
$rootScope.criteria.date_created = y+"/"+calM+"/"+d;
console.log($rootScope.criteria.date_created);

$scope.lov_code = "ACTJ";
$http.get('API/lov/getActiveJobMain.php?lov_code='+$scope.lov_code).success(function (data){
  $scope.getActiveJobList = data;
  console.log($scope.getActiveJobList);
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

$http.get('API/lov/getLovMList.php').success(function (data){
  $scope.getLovMList = data;
  console.log($scope.getLovMList);
})


$scope.descAllDurable = function (id){
  $http.get('API/maintenance/getDurableDetailById.php?dur_id='+id).success(function (data){
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
        console.log($scope.wasteOfDepartList);
        angular.forEach($scope.wasteOfDepartList, function (item){
          $http.get('API/maintenance/getMainDateCreated.php?m_dur_id='+item.dur_id).success(function (data){
            $scope.m_date = data;
            item.date_created = $scope.m_date.m_created
            console.log(item.date_created);
            if(item.date_created != undefined){
               item.date_dis = new Date(item.date_created)
               var dateDis = new Date(item.date_dis)
               var dateNow = new Date()
               var a = moment(dateNow);
               var b = moment(dateDis);
               item.period = a.diff(b, 'days')
               if(item.period <= 180){
                 if(item.period == 0 ){
                   item.periodStr = 'วันนี้'
                 }else {
                   item.periodStr = item.period+" วันแล้ว"
                 }
                 item.dis = true;
               }else{
                 item.dis = false;
               }
             }
          })
        });
  });
}
$scope.descDurable = function(id){
  $http.get('API/maintenance/getDurableDetailById.php?dur_id='+id).success(function (data){
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
  $location.path('/maintenance-list');
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
    if($rootScope.criteria.service == undefined){
      $scope.serviceError = true;
      $scope.app.addAlert('gritter-error', 'กรุณาเลือกวิธีซ่อมบำรุง', 4000);
    }else{
       $http.get('API/maintenance/saveMaintenance.php?m_service='+$scope.serviceStr+
                                         "&m_user_id="+$scope.id+
                                          "&m_dur_id="+$scope.dur_id+
                                          "&m_dep_id="+$rootScope.criteria.cost_id+
                                          "&m_other="+$rootScope.criteria.other+
                                          "&m_created="+$rootScope.criteria.date_created).success(function(resp){
        $scope.saveMaintenance = resp;
        console.log($scope.saveMaintenance);
        if($scope.saveMaintenance == 1){
          $scope.app.addAlert('gritter-success', 'การเก็บข้อมูลซ่อมบำรุงสมบูรณ์', 4000);
          $location.path('/maintenance-list')
        }

       });
      ;
    }
  }
  catch(err) {
    $scope.app.addAlert('gritter-error', 'กรุณาเลือกหมายเลขครุภัณฑ์', 4000);
  }
    }
});
}




};

function MaintenanceListCtrl($rootScope, $scope, $http, $compile, $timeout, $filter, $location, $log, myFunction) {
$log.info('Enter MaintenanceListCtrl');

if (!$rootScope.paging) {
  $rootScope.paging = APP.DEFAULT_PAGING;
}
if (!$rootScope.criteria) {
  $rootScope.criteria = {};
}

$http.get('API/maintenance/getOfficerCom.php').success(function (data){
  $scope.officerComList = data;
  console.log($scope.officerComList);
})
$http.get('API/lov/getDepartment.php').success(function (data){
  $scope.departmentList = data;
  console.log($scope.departmentList);
})

$scope.search = function (){
  if(page_number == undefined){
    var page_number = '1';
}
// search
console.log($rootScope.criteria.dep);
console.log($rootScope.criteria.officerCom);
console.log($rootScope.criteria.dur_numoe);
console.log($rootScope.criteria.date_f);
console.log($rootScope.criteria.date_t);
angular.extend($rootScope.criteria, $rootScope.paging);
$http.get('API/maintenance/getAllMaintenance.php?page_number='+page_number+
'&dep_id='+$rootScope.criteria.dep+
'&officer_id='+$rootScope.criteria.officerCom+
'&dur_numoe='+$rootScope.criteria.dur_numoe+
'&date_from='+$rootScope.criteria.date_f+
'&date_to='+$rootScope.criteria.date_t).success(function (data){
  $scope.mainList = data;
  angular.forEach($scope.mainList, function (item){
    $http.get('API/maintenance/getDepName.php?cost_id='+item.m_dep_id).success(function (data){
      $scope.getDepName = data;
      item.depName = $scope.getDepName.Cost_name
    })
    $http.get('API/maintenance/getUserName.php?user_id='+item.m_user_id).success(function (data){
        $scope.getUserName = data;
        item.userName = $scope.getUserName.Mem_name+" "+$scope.getUserName.Mem_lastname
    })
    $http.get('API/maintenance/getDurableDetailById.php?dur_id='+item.m_dur_id).success(function (data){
      $scope.getDurableNo = data;
      item.durableNo = $scope.getDurableNo.dur_numoe
    })
  })
  console.log($scope.mainList);
})

$http.get('API/maintenance/getAllMaintenanceTotal.php').success(function(resp){
  $scope.jobTotal = resp;
  $rootScope.paging.totalItems = $scope.jobTotal.totalC;
  $rootScope.paging.showing = _.getShowing($rootScope.paging.pageNumber, $rootScope.paging.limit, $scope.jobTotal.totalC);
});

}
$scope.search()

$scope.gotoReport = function () {
  window.open('./mpdf/report/MaintenanceReport.php', '_blank');

}
$scope.gotoReportDur = function (m_dur_id){
  window.open('./mpdf/report/MaintenanceReportById.php?dur_id='+m_dur_id, '_blank');
}

$scope.delete = function (m_id){
  myFunction.confirmDeleteBox().result.then(function(ok) {
    if (ok) {
      $http.get('API/maintenance/delete.php?m_id='+m_id).success(function (data){
        $scope.deleteData = data;
        console.log($scope.deleteData);
        if($scope.deleteData == 1){
          $scope.app.addAlert('gritter-success', 'การลบเสร็จสมบูรณ์', 4000);
          $scope.search()
        }else {
          $scope.app.addAlert('gritter-error', 'การลบไม่สมบูรณ์', 4000);
        }
      })
    }
  })
}
$scope.clear = function (){
  $rootScope.criteria = {}
  $scope.search()
}
$scope.gotoFrm = function (){
  $location.path('/maintenance')
}

};
