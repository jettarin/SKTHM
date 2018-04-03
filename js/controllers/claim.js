angular.module('myApp').config([ '$routeProvider', function($routeProvider) {
    $routeProvider.when("/claim-list",{templateUrl:_.toHttpGetUrl('content/claim/list.html'),controller: ClaimListCtrl});
    $routeProvider.when("/p-claim-list",{templateUrl:_.toHttpGetUrl('content/claim/p-list.html'),controller: PusClaimListCtrl});
    $routeProvider.when("/claim-history",{templateUrl:_.toHttpGetUrl('content/claim/history.html'),controller: ClaimHistoryCtrl});
    $routeProvider.when("/repair-history/:id/:dur_id",{templateUrl:_.toHttpGetUrl('content/repair/history-detail.html'),controller: RepairHistoryDetailCtrl});
    $routeProvider.when("/repair/more-detail/:id",{templateUrl:_.toHttpGetUrl('content/repair/more-detail.html'),controller: RepairMoreDetailCtrl});
    $routeProvider.when("/claim/from/:id",{templateUrl:_.toHttpGetUrl('content/claim/from.html'),controller: ClaimFromCtrl});
    $routeProvider.when("/repair/report",{templateUrl:_.toHttpGetUrl('content/repair/report.html'),controller: ReportCtrl});
    $routeProvider.when("/deliver-form/:id/:job_id",{templateUrl:_.toHttpGetUrl('content/claim/p-deliver.html'),controller: DeliveryClaimCtrl});
} ]);


function ClaimListCtrl($rootScope, $scope, $http, $compile, $timeout, $filter, $location, $log, $route, $routeParams, $translate,$modal) {
    $log.info('Enter ClaimListCtrl');
    if (!$rootScope.paging) {
  		$rootScope.paging = APP.DEFAULT_PAGING;
  	}
  	if (!$rootScope.criteria) {
  		$rootScope.criteria = {};
  	}
    $http.get('API/lov/getDepartment.php').success(function (data){
      $scope.getDepartment = data;
    })
    $scope.search = function (page_number){
      if(page_number == undefined){
        var page_number = '1';
    }
  angular.extend($rootScope.criteria, $rootScope.paging);
  $http.get('API/admin/claim/getJobByAccStatus.php?page_number='+page_number+'&dur_numoe='+$rootScope.criteria.dur_numoe
            +'&paper='+$rootScope.criteria.paper
            +'&dep='+$rootScope.criteria.dep
            +'&date_f='+$rootScope.criteria.date_f
            +'&date_t='+$rootScope.criteria.date_t).success(function (resp){
    $scope.jobList = resp;
    console.log($scope.jobList);
    angular.forEach($scope.jobList,function (item){
      var nd = new Date(item.job_date_created);
      var gd = ("0" + nd.getDate()).slice(-2);
      var gm = ("0" + (nd.getMonth() + 1)).slice(-2);
      var gy = nd.getFullYear();
      var cy = gy+543;
      item.job_date_created = gd+"/"+gm+"/"+cy;

      $http.get('API/user/getNameOfficer.php?officer_id='+item.job_acc_after).success(function (data){
        item.nameOfficer = data;
      });
      $http.get('API/admin/getUserDepartment.php?cost_id='+item.job_dep_of_durable).success(function (data){
        item.nameOfDepartment = data;
        item.dur_DepartmentStr = item.nameOfDepartment .substring(0, 14)+"..";
      });
    });
    $http.get('API/admin/claim/getJobByAccTotal.php').success(function(resp){
      $scope.jobTotal = resp;
      $rootScope.paging.totalItems = $scope.jobTotal.totalC;
      $rootScope.paging.showing = _.getShowing($rootScope.paging.pageNumber, $rootScope.paging.limit, $scope.jobTotal.totalC);
    });
  });
}
$scope.search();
$scope.selectPage = function(page) {
  $rootScope.paging.pageNumber = page;
  $scope.search(page);
};
$scope.clear = function (){
  $rootScope.criteria = {}
  $scope.search()
}
$scope.gotoMoreDetail = function (id){
  $location.path('/repair/more-detail/'+id)
}
$scope.gotoClaim = function (id){
  $location.path('/claim/from/'+id)
}
}

// พัสดุ
function PusClaimListCtrl($rootScope, $scope, $http, $compile, $timeout, $filter, $location, $log, $route, $routeParams, $translate,$modal) {
    $log.info('Enter PusClaimListCtrl');

    if (!$rootScope.paging) {
      $rootScope.paging = APP.DEFAULT_PAGING;
    }
    if (!$rootScope.criteria) {
      $rootScope.criteria = {};

    }
    $scope.search = function (){
      $http.get('API/admin/claim/getJobByJobStatus.php?job_header='+$rootScope.criteria.job_header+
                                                                     '&dur_list='+$rootScope.criteria.dur_list+
                                                                     '&dep='+$rootScope.criteria.dep+
                                                                     '&dur_numoe='+$rootScope.criteria.dur_numoe+
                                                                     '&date_f='+$rootScope.criteria.date_f+
                                                                     '&date_t='+$rootScope.criteria.date_t).success(function (data){
        $scope.getPlist = data;
        angular.forEach($scope.getPlist ,function (item){
          $http.get('API/admin/getUserDepartment.php?cost_id='+item.job_dep_of_durable).success(function (data){
            item.nameOfDepartment = data;
          });
          $http.get('API/user/getNameOfficer.php?officer_id='+item.job_user_id).success(function (data){
            $scope.getNameOfficer = data;
            item.offerName =  $scope.getNameOfficer;
          });
        })
      });
      $http.get('API/lov/getDepartment.php').success(function (data){
        $scope.getDepartment = data;
      })
    }
    $scope.search();
    $scope.gotoDeliver = function (id,job_id){
      $location.path('/deliver-form/'+id+'/'+job_id);
    }
    $scope.clear = function (){
        $rootScope.criteria = {};
        $scope.search();
    }
}
// ประวัติการซ่อม
function ClaimHistoryCtrl($rootScope, $scope, $http, $compile, $timeout, $filter, $location, $log, $route, $routeParams, $translate,$modal) {
    $log.info('Enter ClaimHistoryCtrl');
    if (!$rootScope.paging) {
      $rootScope.paging = APP.DEFAULT_PAGING;
    }
    if (!$rootScope.criteria) {
      $rootScope.criteria = {};
    }
    $http.get('API/lov/getDepartment.php').success(function (data){
      $scope.getDepartment = data;
    })

    $scope.search = function (page_number){
      if(page_number == undefined){
        var page_number = '1';
      }
      $http.get('API/admin/claim/getJobHistory.php?page_number='+page_number+'&dur_numoe='+$rootScope.criteria.dur_numoe+
                                                                              '&dep='+$rootScope.criteria.dep+
                                                                              '&dur_naoe='+$rootScope.criteria.dur_naoe+
                                                                              '&user_id='+$rootScope.criteria.user_id+
                                                                              '&date_f='+$rootScope.criteria.date_f+
                                                                              '&date_t='+$rootScope.criteria.date_t).success(function (data){
        $scope.getJobHistoryList = data;
        angular.forEach($scope.getJobHistoryList ,function (item){
          $http.get('API/admin/getUserDepartment.php?cost_id='+item.job_dep_of_durable).success(function (data){
            item.nameOfDepartment = data;
          });
          $http.get('API/user/getNameOfficer.php?officer_id='+item.job_user_id).success(function (data){
            $scope.getNameOfficerRepair = data;
            item.offerName =  $scope.getNameOfficerRepair;
          });
          $http.get('API/user/getNameOfficer.php?officer_id='+item.job_acc_by).success(function (data){
            $scope.getNameAcc = data;
            item.offerNameAcc =  $scope.getNameAcc;
          });
        })
        $http.get('API/admin/claim/getTotalJobDeliver.php').success(function(resp){
          $scope.jobTotal = resp;
          $rootScope.paging.totalItems = $scope.jobTotal.totalC;
          $rootScope.paging.showing = _.getShowing($rootScope.paging.pageNumber, $rootScope.paging.limit, $scope.jobTotal.totalC);
        });
      });
    }
    $scope.search();
    $scope.selectPage = function(page) {
      $rootScope.paging.pageNumber = page;
      $scope.search(page);
    };
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
    $scope.clear = function (){
        $rootScope.criteria = {};
        $scope.search();
    }
    $scope.gotoHistoryDetail = function (job_id,dur_id){
      $location.path('repair-history/'+job_id+'/'+dur_id)
    }
}

function ClaimFromCtrl($rootScope, $scope, $http, $compile, $timeout, $filter, $location, $log, $route, $routeParams, $translate,$modal,myFunction ) {
  $log.info('Enter ClaimFromCtrl');

      $scope.job_id = $routeParams.id;
      $scope.search = function (){
        $http.get('API/admin/getJobById.php?job_id='+$scope.job_id).success(function (data){
          $scope.getJobById = data;
          console.log($scope.getJobById);
          $http.get('API/admin/getUserDepartment.php?cost_id='+$scope.getJobById.dur_department).success(function (data){
            $scope.getJobById.costName = data;
          });
          $http.get('API/user/getNameOfficer.php?officer_id='+$scope.getJobById.job_acc_after).success(function (data){
            $scope.getJobById.userName = data;
          });
          var thmonth = new Array ("มกราคม","กุมภาพันธ์","มีนาคม",
          "เมษายน","พฤษภาคม","มิถุนายน", "กรกฎาคม","สิงหาคม","กันยายน",
          "ตุลาคม","พฤศจิกายน","ธันวาคม");
          var ndj = new Date($scope.getJobById.job_date_created);
          var gdj = ("0"+ndj.getDate()).slice(-2);
          var gmj = ("0"+(ndj.getMonth() + 1)).slice(-2);
          var gyj = ndj.getFullYear();
          var cyj = gyj+543;
          $scope.getJobById.dateStr = gdj;
          $scope.getJobById.monthStr = thmonth[ndj.getMonth()]
          $scope.getJobById.yearStr = cyj;
          $scope.getJobById.yearCal = (parseInt(ndj.getFullYear().toString().substr(2,2))+43)-$scope.getJobById.dur_year;

        });
        $http.get('API/admin/repair/getJobSendToByStatus.php?job_id='+$scope.job_id).success(function (data){
          $scope.getSendTo = data;
          var nd = new Date($scope.getSendTo.st_date_created);
          var gd = ("0"+nd.getDate()).slice(-2);
          var gm = ("0"+(nd.getMonth() + 1)).slice(-2);
          var gy = nd.getFullYear();
          var cy = gy+543;
          var gh = ("0" + nd.getHours()).slice(-2);
          var gmin = ("0" + nd.getMinutes()).slice(-2);
          $scope.getSendTo.timeStr = gh+":"+gmin;
          $scope.getSendTo.dateStr = gd+"/"+gm+"/"+cy;
          $http.get('API/user/getNameOfficer.php?officer_id='+$scope.getSendTo.st_off_id_by).success(function (data){
            $scope.getSendTo.userName = data;
          });
        });
        $http.get('API/admin/repair/getLastPaperPrint.php').success(function (data){
          $scope.getLastPaperPrint = data;
          $scope.c = $scope.getLastPaperPrint.c_time;
          var nd = new Date();
          var gy = nd.getFullYear();
          var cy = gy+543;
          var cyStr = cy.toString();
          var res = cyStr.substring(2);
          // convert to INT
          $scope.yearNow = parseInt(res);
          $scope.yearDB = parseInt($scope.getLastPaperPrint.c_year);
          if($scope.yearNow == $scope.yearDB){
            $scope.c++
          }else{
            $scope.c = 1;
          }
        });
      }
      $scope.search();
      $scope.Claim = function (id){
        myFunction.confirmSaveBox().result.then(function(ok) {
          if (ok) {
            $http.get('API/admin/claim/updateJobStatusByJobId.php?job_id='+$scope.job_id+"&job_status=70"+'&header='+$rootScope.criteria.head_pap+'&dur_id='+$scope.getJobById.dur_id).success(function (data){
              $scope.updateJobStatusByJobId = data;
              if($scope.updateJobStatusByJobId == 1){
                $scope.app.addAlert('gritter-success', 'การส่งเคลมประกันเสร็จสมบูรณ์', 4000);
                $scope.search();
                $location.path('/p-claim-list')
              }else{
                $scope.app.addAlert('gritter-error', 'เกิดข้อผิดพลาด', 4000);
              }
            });
          };
        });
      }
      $scope.saveJobDetail = function (){
        $http.get('API/admin/replace/updateJobDetail.php?job_header='+$scope.getJobById.job_header
                 +'&job_desc='+$scope.getJobById.job_desc
                 +'&job_id='+$scope.job_id).success(function (data){
          $scope.updateJobDetail = data;
          console.log($scope.updateJobDetail);
          if($scope.updateJobDetail == 1){
            $scope.app.addAlert('gritter-success', 'แก้ไขเรียบร้อย', 4000);
          }
        })
      }
      // PDF TAB

      $scope.back = function (){
        $location.path('/claim-list');
      }
}

function ReportCtrl($rootScope, $scope, $http, $compile, $timeout, $filter, $location, $log, $route, $routeParams, $translate,$modal) {
  $log.info('Enter ReportCtrl');
}
function DeliveryClaimCtrl($rootScope, $scope, $http, $compile, $timeout, $filter, $location, $log, $route, $routeParams, $translate,$modal,myFunction ) {
  $log.info('Enter DeliveryClaimCtrl');

  $scope.deli_his = [];
  $scope.dur_id = $routeParams.id;
  $scope.job_id = $routeParams.job_id;
  var nd = new Date();
  var gd = ("0" + nd.getDate()).slice(-2);
  var gm = ("0" + (nd.getMonth() + 1)).slice(-2);
  var gy = nd.getFullYear();
  var cy = gy+543;
  $scope.date_now = gd+"/"+gm+"/"+cy;
  $http.get('API/lov/getDurableById.php?dur_id='+$scope.dur_id).success(function (data){
    $scope.getDurableById = data;
    var nd = new Date($scope.getDurableById.dur_dop.date);
    var gd = ("0" + nd.getDate()).slice(-2);
    var gm = ("0" + (nd.getMonth() + 1)).slice(-2);
    var gy = nd.getFullYear();
    $scope.dur_date = gd+"/"+gm+"/"+gy;
  })
  $scope.search = function (){
    $http.get('API/lov/getJobByDurId.php?dur_id='+$scope.dur_id+'&job_id='+$scope.job_id).success(function (data){
      $scope.getJobObj = data;
      $http.get('API/admin/claim/getHistoryDeliver.php?dur_id='+$scope.dur_id+'&job_id='+$scope.getJobObj.job_id).success(function (data){
        $scope.getHistoryObj = data;
        console.log($scope.getHistoryObj);
      })
    });
  }
  $scope.search();
  $scope.companys = function (val){
    $scope.comVal = val;
    $http.get('API/lov/getCompanyById.php?com_id='+$scope.comVal).success(function (data){
      $scope.getCompanyById = data;
      console.log($scope.getCompanyById);
    })
  }
  $http.get('API/lov/getCompany.php').success(function (data){
    $scope.getCompanyList = data;
    console.log($scope.getCompanyList);
  });
  $scope.clearInput = function (){
    $rootScope.criteria = {};
  }
    $scope.i=1;
      $("#add_row").click(function(){
        if($scope.comVal == undefined){
          $scope.app.addAlert('gritter-warning', 'กรุณาเลือก บริษัท/ร้านค้า', 4000);
        }else{
          $('#addr'+$scope.i).html("<td colspan='3'>"+ $scope.date_now +"</td><td colspan='2'><input name='deli_his"+$scope.i+"' type='text'  class='form-control input-xs'  /></td><td colspan='2'><input  name='deli_num"+$scope.i+"' type='text'   class='form-control input-xs'></td><td colspan='2'>"+$scope.comVal+"</td><td colspan='2'><input  name='deli_bill"+$scope.i+"' type='text'   class='form-control input-xs'></td><td colspan='2'><input  name='deli_total"+$scope.i+"' type='text'   class='form-control input-xs'></td>");
          $('#tab_logic').append('<tr id="addr'+($scope.i+1)+'"></tr>');
          $scope.i++;
        }

   });
      $("#delete_row").click(function(){
          if($scope.i>1){
          $("#addr"+($scope.i-1)).html('');
          $scope.i--;
      }
  });
  $scope.save = function (){
    console.log($scope.comVal);
    myFunction.confirmDeliver().result.then(function(ok) {
      if (ok) {
        for (i = 0; i < $scope.i; i++) {
          $http.get('API/admin/claim/saveDeliver.php?dur_id='+$scope.dur_id
                                                          +'&deli_job_id='+$scope.getJobObj.job_id
                                                          +'&deli_history='+$("[name='deli_his"+i+"']").val()
                                                          +'&deli_num='+$("[name='deli_num"+i+"']").val()
                                                          +'&deli_company='+$scope.comVal
                                                          +'&deli_bill='+$("[name='deli_bill"+i+"']").val()
                                                          +'&deli_total='+$("[name='deli_total"+i+"']").val()
                                                          +'&deli_date='+$scope.date_now).success(function (data){
            $scope.saveDeliver = data;
          });
        }
        $scope.job_status = "2";
        $scope.job_last_status = "707";
        $http.get('API/lov/updateJobStatus.php?job_status='+$scope.job_status+'&job_id='+$scope.getJobObj.job_id+'&job_last_status='+$scope.job_last_status).success(function (data){
          $scope.updateJobStatus = data;
          if($scope.updateJobStatus == 1){
            $scope.app.addAlert('gritter-success', 'การรับส่งมอบเสร็จสมบูรณ์', 4000);
            $scope.search();
            location.reload();
          }
        });
      };
    });
  }
  $scope.back = function (){
    $location.path('/p-claim-list');
  }
}
