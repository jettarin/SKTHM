angular.module('myApp').config([ '$routeProvider', function($routeProvider) {
    $routeProvider.when("/repair-list",{templateUrl:_.toHttpGetUrl('content/repair/list.html'),controller: RepairListCtrl});
    $routeProvider.when("/p-repair-list",{templateUrl:_.toHttpGetUrl('content/repair/p-list.html'),controller: PusRepairListCtrl});
    $routeProvider.when("/repair-history",{templateUrl:_.toHttpGetUrl('content/repair/history.html'),controller: RepairHistoryCtrl});
    $routeProvider.when("/repair-history/:id/:dur_id",{templateUrl:_.toHttpGetUrl('content/repair/history-detail.html'),controller: RepairHistoryDetailCtrl});
    $routeProvider.when("/repair/more-detail/:id",{templateUrl:_.toHttpGetUrl('content/repair/more-detail.html'),controller: RepairMoreDetailCtrl});
    $routeProvider.when("/repair/from/:id",{templateUrl:_.toHttpGetUrl('content/repair/from.html'),controller: RepairFromCtrl});
    $routeProvider.when("/repair/report",{templateUrl:_.toHttpGetUrl('content/repair/report.html'),controller: ReportCtrl});
    $routeProvider.when("/deliver-form/:id/:job_id",{templateUrl:_.toHttpGetUrl('content/repair/p-deliver.html'),controller: DeliveryCtrl});
} ]);


function RepairListCtrl($rootScope, $scope, $http, $compile, $timeout, $filter, $location, $log, $route, $routeParams, $translate,$modal) {
    $log.info('Enter RepairListCtrl');
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
  $http.get('API/admin/repair/getJobByAccStatus.php?page_number='+page_number+'&dur_numoe='+$rootScope.criteria.dur_numoe
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
      $http.get('API/admin/repair/getPaperPrint.php?job_id='+item.job_id+'&dur_id='+item.job_dur_id).success(function (data){
        $scope.paperP = data;
        item.paper = $scope.paperP.paper
      })
      $http.get('API/user/getNameOfficer.php?officer_id='+item.job_acc_after).success(function (data){
        item.nameOfficer = data;
      });
      $http.get('API/admin/getUserDepartment.php?cost_id='+item.job_dep_of_durable).success(function (data){
        item.nameOfDepartment = data;
        item.dur_DepartmentStr = item.nameOfDepartment .substring(0, 14)+"..";
      });
    });
    $http.get('API/admin/repair/getJobByAccTotal.php').success(function(resp){
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
$scope.gotoRepair = function (id){
  $location.path('/repair/from/'+id)
}
}

// พัสดุ
function PusRepairListCtrl($rootScope, $scope, $http, $compile, $timeout, $filter, $location, $log, $route, $routeParams, $translate,$modal,myFunction) {
    $log.info('Enter PusRepairListCtrl');

    if (!$rootScope.paging) {
      $rootScope.paging = APP.DEFAULT_PAGING;
    }
    if (!$rootScope.criteria) {
      $rootScope.criteria = {};

    }
    $rootScope.list.search = function (){
      $http.get('API/admin/repair/getJobByJobStatus.php?job_header='+$rootScope.criteria.job_header+
                                                                     '&dur_list='+$rootScope.criteria.dur_list+
                                                                     '&dep='+$rootScope.criteria.dep+
                                                                     '&dur_numoe='+$rootScope.criteria.dur_numoe+
                                                                     '&date_f='+$rootScope.criteria.date_f+
                                                                     '&date_t='+$rootScope.criteria.date_t).success(function (data){
        $scope.getPlist = data;
        console.log($scope.getPlist)
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
    $rootScope.list.search();
    $scope.change = function (id){
      var modalInstance = $modal.open({
          templateUrl: 'content/popup/order/order-accept-manager.html',
          controller: orderAcceptManagerPopupCtrl,
          backdrop: 'static',
          windowClass: 'medium',
          keyboard: false,
          resolve: {
              params_job_id: function () {
                  return id;
              }
          }
      });
      modalInstance.result.then(function (isClose) {
      }, function () {
          $log.info('Modal dismissed at: ' + new Date());
      });

    }

    $scope.gotoDeliver = function (id,job_id){
      $location.path('/deliver-form/'+id+'/'+job_id);
    }
    $scope.clear = function (){
        $rootScope.criteria = {};
        $rootScope.list.search();
    }

      $scope.deleteJob = function (id,dur_id){
        myFunction.confirmDeleteBox().result.then(function(ok) {
          if (ok) {
            $http.get('API/user/deleteJobByUser.php?job_id='+id+'&dur_id='+dur_id).success(function(resp) {
              myFunction.alertDeleteSuccess();
              console.log(resp)
              $scope.search();
            });
          };
        });



  }
}

// ประวัติการซ่อม
function RepairHistoryCtrl($rootScope, $scope, $http, $compile, $timeout, $filter, $location, $log, $route, $routeParams, $translate,$modal) {
    $log.info('Enter RepairHistoryCtrl');
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
      $http.get('API/admin/repair/getJobHistory.php?page_number='+page_number+'&dur_numoe='+$rootScope.criteria.dur_numoe+
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
        $http.get('API/admin/repair/getTotalJobDeliver.php').success(function(resp){
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

function RepairHistoryDetailCtrl($rootScope, $scope, $http, $compile, $timeout, $filter, $location, $log, $route, $routeParams, $translate,$modal) {
  $log.info('Enter RepairHistoryDetailCtrl');

  $scope.deli_his = [];
  $scope.dur_id = $routeParams.dur_id;
  $scope.job_id = $routeParams.id;
  var nd = new Date();
  var gd = ("0" + nd.getDate()).slice(-2);
  var gm = ("0" + (nd.getMonth() + 1)).slice(-2);
  var gy = nd.getFullYear();
  var cy = gy+543;
  $scope.date_now = gd+"/"+gm+"/"+cy;
  $http.get('API/lov/getDurableById.php?dur_id='+$scope.dur_id).success(function (data){
    $scope.getDurableById = data;
    if($scope.getDurableById.dur_dop != null){
      var nd = new Date($scope.getDurableById.dur_dop.date);
      var gd = ("0" + nd.getDate()).slice(-2);
      var gm = ("0" + (nd.getMonth() + 1)).slice(-2);
      var gy = nd.getFullYear();
      $scope.dur_date = gd+"/"+gm+"/"+gy;
    }else{
      $scope.dur_date = 'ไม่มีข้อมูล';
    }

  })
  $scope.search = function (){
    $http.get('API/lov/getJobByDurId.php?dur_id='+$scope.dur_id+'&job_id='+$scope.job_id).success(function (data){
      $scope.getJobObj = data;
      $http.get('API/admin/repair/getHistoryDeliver.php?dur_id='+$scope.dur_id+'&job_id='+$scope.getJobObj.job_id).success(function (data){
        $scope.getHistoryObj = data;
        angular.forEach($scope.getHistoryObj, function (item){
          $http.get('API/lov/getCompanyById.php?com_id='+item.deli_company).success(function (data){
            $scope.comName = data;
            item.deli_company = $scope.comName.com_name;
            console.log($scope.comName);
          })
        })
        console.log($scope.getHistoryObj);
      })
      $http.get('API/admin/getUserDepartment.php?cost_id='+$scope.getJobObj.job_dep_of_durable).success(function (data){
        $scope.getJobObj.nameOfDepartment = data;
      });
    });
  }
  $scope.search();
  $scope.back = function (){
    $location.path('repair-history');
  }
}



function RepairMoreDetailCtrl($rootScope, $scope, $http, $compile, $timeout, $filter, $location, $log, $route, $routeParams, $translate,$modal) {
    $log.info('Enter RepairMoreDetailCtrl');

    $scope.job_id = $routeParams.id;
    $http.get('API/admin/getJobById.php?job_id='+$scope.job_id).success(function (data){
      $scope.getJobById = data;
      $http.get('API/admin/getUserDepartment.php?cost_id='+$scope.getJobById.dur_department).success(function (data){
        $scope.getJobById.costName = data;
      });
      $http.get('API/user/getNameOfficer.php?officer_id='+$scope.getJobById.job_acc_by).success(function (data){
        $scope.getJobById.userName = data;
      });
    });
    $scope.sendToOfficer = function (id) {

        var modalInstance = $modal.open({
            templateUrl: 'content/popup/remain/sendTo-popup.html',
            controller: sendToPopupCtrl,
            backdrop: 'static',
            windowClass: 'large',
            keyboard: false,
            resolve: {
                params_id: function () {
                    return id;
                }
            }
        });
        modalInstance.result.then(function (isClose) {
        }, function () {
            $log.info('Modal dismissed at: ' + new Date());
        });
    };
    $scope.finishJob = function (job_id){
      var modalInstance = $modal.open({
          templateUrl: 'content/popup/remain/finishJob-popup.html',
          controller: finishJobCtrl,
          backdrop: 'static',
          windowClass: 'large',
          keyboard : false,
          resolve : {
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
    $scope.back = function (){
      $location.path('/repair-list');
    }
}

function RepairFromCtrl($rootScope, $scope, $http, $compile, $timeout, $filter, $location, $log, $route, $routeParams, $translate,$modal,myFunction ) {
  $log.info('Enter RepairFromCtrl');

      $scope.job_id = $routeParams.id;
      $scope.search = function (){
        $http.get('API/admin/getJobById.php?job_id='+$scope.job_id).success(function (data){
          $scope.getJobById = data;
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
      $scope.sendToOfficer = function (id) {
          var modalInstance = $modal.open({
              templateUrl: 'content/popup/remain/sendTo-popup.html',
              controller: sendToPopupCtrl,
              backdrop: 'static',
              windowClass: 'large',
              keyboard: false,
              resolve: {
                  params_id: function () {
                      return id;
                  }
              }
          });
          modalInstance.result.then(function (isClose) {
          }, function () {
              $log.info('Modal dismissed at: ' + new Date());
          });
      };
      $scope.finishJob = function (job_id){
        var modalInstance = $modal.open({
            templateUrl: 'content/popup/remain/finishJob-popup.html',
            controller: finishJobCtrl,
            backdrop: 'static',
            windowClass: 'large',
            keyboard : false,
            resolve : {
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
      $scope.sendToFix = function (id){
        myFunction.confirmSendToFix().result.then(function(ok) {
          if (ok) {
            $http.get('API/admin/repair/updateJobStatusByJobId.php?job_id='+$scope.job_id+"&job_status=30"+'&header='+$rootScope.criteria.head_pap+'&dur_id='+$scope.getJobById.dur_id).success(function (data){
              $scope.updateJobStatusByJobId = data;
              if($scope.updateJobStatusByJobId == 1){
                $scope.app.addAlert('gritter-success', 'การส่งซ่อมเสร็จสมบูรณ์', 4000);
                $scope.search();
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
      $scope.tap = function (val){
        if(val == 1){
          $scope.showPrint = false;
        }else if(val == 2){
          $scope.showPrint = true;
          $http.get('API/admin/repair/getPaperPrint.php?job_id='+$scope.job_id+'&dur_id='+$scope.getJobById.dur_id).success(function (data){
            $scope.getPaperPrint = data;
            if($scope.getPaperPrint.status == 0){
              console.log("status = 0");
              $rootScope.criteria.no_pap = 'ที่ สท 0032.202.2/';
              $rootScope.criteria.head_pap = 'เรื่อง ขออนุมัติส่งซ่อมนอก';
              $rootScope.criteria.detail1_pap = 'เรียน ผู้อำนวยการโรงพยาบาลสุโขทัย ';
              $rootScope.criteria.detail2_pap = 'เนื่องด้วยศูนย์คอมพิวเตอร์ ได้รับใบแจ้งซ่อมเลขที่ 1/60 หมายเลขครุภัณฑ์ '+ $scope.getJobById.dur_numoe;
              $rootScope.criteria.detail3_pap = 'จากหน่วยงาน '+$scope.getJobById.costName+' เมื่อวันที่ '+$scope.getJobById.dateStr+' '+$scope.getJobById.monthStr+' '+$scope.getJobById.yearStr+'และทางศูนย์คอมพิวเตอร์ได้ทำการตรวจสอบแล้ว';
              $rootScope.criteria.detail4_pap = 'ปรากฏว่า '+$scope.getJobById.dur_list+' ไม่สามารถใช้งานได้และอายุการใช้งานประมาณ '+$scope.getJobById.yearCal+' ปี';
              $rootScope.criteria.detail5_pap = '1. '+$scope.getJobById.dur_naoe+'                        จำนวน 1 ตัว';
            }else if($scope.getPaperPrint.status == 1){
              $rootScope.criteria.no_pap = $scope.getPaperPrint.paper;
              $rootScope.criteria.head_pap = $scope.getPaperPrint.header;
              $rootScope.criteria.detail1_pap = $scope.getPaperPrint.detail1;
              $rootScope.criteria.detail2_pap = $scope.getPaperPrint.detail2;
              $rootScope.criteria.detail3_pap = $scope.getPaperPrint.detail3;
              $rootScope.criteria.detail4_pap = $scope.getPaperPrint.detail4;
              $rootScope.criteria.detail5_pap = $scope.getPaperPrint.detail5;
            }
          })
        }
      }
      $scope.back = function (){
        $location.path('/repair-list');
      }
      $scope.gotoReport = function (){
        console.log("gotoReport");
        $http({
          url:'API/admin/repair/updatePaperPrinted.php',
          method:'POST',
          data:{
            'dur_id':$scope.getJobById.dur_id,
            'job_id':$scope.job_id,
            'header':$rootScope.criteria.head_pap,
            'status':'1',
            'paper':$rootScope.criteria.no_pap,
            'detail1':$rootScope.criteria.detail1_pap,
            'detail2':$rootScope.criteria.detail2_pap,
            'detail3':$rootScope.criteria.detail3_pap,
            'detail4':$rootScope.criteria.detail4_pap,
            'detail5':$rootScope.criteria.detail5_pap,
            'detail6':$rootScope.criteria.detail6_pap
            }
        }).success(function (data){
          $scope.updatePaperPrinted = data;
          if($scope.updatePaperPrinted == 1){
            console.log("updatePaperPrinted == 1");
            window.open('./mpdf/report/repairReport.php?dur_id='+$scope.getJobById.dur_id+'&job_id='+$scope.job_id, '_blank');

          }
        })

      }
}

function ReportCtrl($rootScope, $scope, $http, $compile, $timeout, $filter, $location, $log, $route, $routeParams, $translate,$modal) {
  $log.info('Enter ReportCtrl');
}
function DeliveryCtrl($rootScope, $scope, $http, $compile, $timeout, $filter, $location, $log, $route, $routeParams, $translate,$modal,myFunction ) {
  $log.info('Enter DeliveryCtrl');

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
      $http.get('API/admin/repair/getHistoryDeliver.php?dur_id='+$scope.dur_id+'&job_id='+$scope.getJobObj.job_id).success(function (data){
        $scope.getHistoryObj = data;
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
    myFunction.confirmDeliver().result.then(function(ok) {
      if (ok) {
        for (i = 0; i < $scope.i; i++) {
          $http.get('API/admin/repair/saveDeliver.php?dur_id='+$scope.dur_id
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
        $scope.job_last_status = "6";
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
    $location.path('/p-repair-list');
  }
}
