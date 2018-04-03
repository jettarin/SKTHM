angular.module('myApp').config([ '$routeProvider', function($routeProvider) {
    $routeProvider.when("/insure-list",{templateUrl:_.toHttpGetUrl('content/insure/list.html'),controller: InsureListCtrl});
    $routeProvider.when("/p-insure-list",{templateUrl:_.toHttpGetUrl('content/insure/p-list.html'),controller: PusInsureListCtrl});
    $routeProvider.when("/insure/from/:id",{templateUrl:_.toHttpGetUrl('content/insure/form.html'),controller: InsureFromCtrl});
    $routeProvider.when("/insure-deli-form/:id/:job_id",{templateUrl:_.toHttpGetUrl('content/insure/p-deliver.html'),controller: InsureDeliCtrl});
    $routeProvider.when("/insure-history",{templateUrl:_.toHttpGetUrl('content/insure/history.html'),controller: InsureHistoryCtrl});
    $routeProvider.when("/insure-history/:id/:dur_id",{templateUrl:_.toHttpGetUrl('content/insure/history-detail.html'),controller: InsureHistoryDetailCtrl});

} ]);


function InsureListCtrl($rootScope, $scope, $http, $compile, $timeout, $filter, $location, $log, $route, $routeParams, $translate,$modal) {
    $log.info('Enter InsureListCtrl');
    if (!$rootScope.paging) {
  		$rootScope.paging = APP.DEFAULT_PAGING;
  	}
  	if (!$rootScope.criteria) {
  		$rootScope.criteria = {};
  	}
    //Call Pop up
    $http.get('API/lov/getDepartment.php').success(function (data){
      $scope.getDepartment = data;
    })
    $scope.search = function (page_number){
      if(page_number == undefined){
        var page_number = '1';
    }
  angular.extend($rootScope.criteria, $rootScope.paging);
  $http.get('API/admin/insure/getJobByAccStatus.php?page_number='+page_number+'&dur_numoe='+$rootScope.criteria.dur_numoe
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
	  if(item.job_status == 66){
		item.statusStr = 'รอต่อประกัน';
		item.statusColor = 'orange';
  }else if(item.job_status == 60){
		item.statusStr = 'ต่อประกันแล้ว';
		item.statusColor = 'green';
	  }
      $http.get('API/user/getNameOfficer.php?officer_id='+item.job_acc_after).success(function (data){
        item.nameOfficer = data;
      });
      $http.get('API/admin/getUserDepartment.php?cost_id='+item.job_dep_of_durable).success(function (data){
        item.nameOfDepartment = data;
        item.dur_DepartmentStr = item.nameOfDepartment .substring(0, 14)+"..";
      });
    });
    $http.get('API/admin/insure/getJobByAccTotal.php').success(function(resp){
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
$scope.gotoMoreDetail = function (id){
  $location.path('/repair/more-detail/'+id)
}
$scope.clear = function (){
  $rootScope.criteria = {}
  $scope.search()
}
$scope.gotoRepair = function (id){
  $location.path('/insure/from/'+id)
}
}

// พัสดุ
function PusInsureListCtrl($rootScope, $scope, $http, $compile, $timeout, $filter, $location, $log, $route, $routeParams, $translate,$modal) {
    $log.info('Enter PusInsureListCtrl');
    if (!$rootScope.paging) {
      $rootScope.paging = APP.DEFAULT_PAGING;
    }
    if (!$rootScope.criteria) {
      $rootScope.criteria = {};
    }
    $scope.search = function (){
      $http.get('API/admin/insure/getJobByJobStatus.php?job_header='+$rootScope.criteria.job_header+
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
      $location.path('/insure-deli-form/'+id+'/'+job_id);
    }
    $scope.clear = function (){
        $rootScope.criteria = {};
        $scope.search();
    }
}

function InsureFromCtrl($rootScope, $scope, $http, $compile, $timeout, $filter, $location, $log, $route, $routeParams, $translate,$modal,myFunction ) {
  $log.info('Enter InsureFromCtrl');

      $scope.job_id = $routeParams.id;
      $scope.search = function (){
        $http.get('API/admin/getJobById.php?job_id='+$scope.job_id).success(function (data){
          $scope.getJobById = data;
          console.log($scope.getJobById);
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
          $http.get('API/admin/insure/getInsureList.php?job_id='+$scope.job_id+'&dur_id='+$scope.getJobById.job_dur_id).success(function (data){
            $scope.getInsureList = data;
            if($scope.getInsureList == undefined || $scope.getInsureList == ''){
               $scope.showSave = 1;
            }else{
              $scope.showSave = 0;
            }
            if($scope.getInsureList.length == 4){
              $scope.showAddInsure = 4;
            }
          });
          $http.get('API/admin/getUserDepartment.php?cost_id='+$scope.getJobById.dur_department).success(function (data){
            $scope.getJobById.costName = data;
          });
          $http.get('API/user/getNameOfficer.php?officer_id='+$scope.getJobById.job_acc_after).success(function (data){
            $scope.getJobById.userName = data;
          });
        });
        $http.get('API/admin/insure/getJobSendToByStatus.php?job_id='+$scope.job_id).success(function (data){
          $scope.getSendTo = data;
          var nd = new Date($scope.getSendTo.st_date_created);
          var gd = ("0"+nd.getDate()).slice(-2);
          var gm = ("0"+(nd.getMonth() + 1)).slice(-2);
          var gy = nd.getFullYear();
          var cy = gy+543;
          var gh = ('0'+ nd.getHours()).substr(-2);
          var gmin = ('0'+ nd.getMinutes()).substr(-2);
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
      $scope.editInsure = function (id){
        var modalInstance = $modal.open({
            templateUrl: 'content/popup/insure/insure-edit-popup.html',
            controller: orderPopupCtrl,
            backdrop: 'static',
            windowClass: 'large',
            keyboard: false,
            resolve: {
                params_order_id: function () {
                    return id;
                }
            }
        });
        modalInstance.result.then(function (isClose) {
        }, function () {
            $log.info('Modal dismissed at: ' + new Date());
        });
      }
      $scope.deleteInsure = function (id){
        $http.get('API/admin/insure/deleteInsureById.php?order_id='+id).success(function (data){
          $scope.deleteInsureById = data;
          if($scope.deleteInsureById == 1){
            $scope.app.addAlert('gritter-success', 'ลบเรียบร้อย', 4000);
          }
        })
        $scope.search();
      }
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
      $scope.insureList = function (){
        var modalInstance = $modal.open({
            templateUrl: 'content/popup/admin/insureList-popup.html',
            controller: insureListPopupCtrl,
            backdrop: 'static',
            windowClass: 'large',
            keyboard: false,
            resolve: {
                params_job_id: function () {
                    return $scope.getJobById.job_id;
                },
                params_dur_id: function () {
                    return $scope.getJobById.job_dur_id;
                }
            }
        });
        modalInstance.result.then(function (isClose) {
        }, function () {
            $log.info('Modal dismissed at: ' + new Date());
        });
      }
      $scope.back = function (){
        $location.path('/insure-list');
      }
      $scope.sendToInsure = function (id){
        if($scope.getInsureList == undefined || $scope.getInsureList == ''){
          $scope.app.addAlert('gritter-error', 'กรุณาเขียนรายการต่อประกัน', 4000);
        }else{
          myFunction.confirmOrder().result.then(function(ok) {
            if (ok) {
              $http.get('API/admin/insure/updateJobStatusByJobId.php?job_id='+$scope.job_id+"&job_status=60"+'&dur_id='+$scope.getJobById.dur_id).success(function (data){
                $scope.updateJobStatusByJobId = data;
                if($scope.updateJobStatusByJobId == 1){
                  $scope.app.addAlert('gritter-success', 'การต่อประกันเสร็จสมบูรณ์', 4000);
                  $scope.search();
                }else{
                  $scope.app.addAlert('gritter-error', 'เกิดข้อผิดพลาด', 4000);
                }
              });
            };
          });
        }
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
      $scope.tap = function (val){
		  console.log(val);
        if(val == 1){
          $scope.showPrint = false;
        }else if(val == 2){
          $scope.showPrint = true;
          $http.get('API/admin/repair/getPaperPrint.php?job_id='+$scope.job_id+'&dur_id='+$scope.getJobById.dur_id).success(function (data){
            $scope.getPaperPrint = data;
			console.log($scope.getPaperPrint);
            if($scope.getPaperPrint.status == 0){
              $rootScope.criteria.no_pap = 'ที่ สท 0027.201.4/';
              $rootScope.criteria.head_pap = 'เรื่อง ขออนุมัติต่อประกัน';
              $rootScope.criteria.detail1_pap = 'เรียน ผู้อำนวยการโรงพยาบาลสุโขทัย ';
              $rootScope.criteria.detail2_pap = 'เนื่องด้วยศูนย์คอมพิวเตอร์ ได้รับใบแจ้งซ่อมเลขที่ 1/60 หมายเลขครุภัณฑ์ '+$scope.getJobById.dur_numoe;
              $rootScope.criteria.detail3_pap = ' จากหน่วยงาน '+$scope.getJobById.costName+' เมื่อวันที่ '+$scope.getJobById.dateStr+' '+$scope.getJobById.monthStr+' '+$scope.getJobById.yearStr+'และทาง';
              $rootScope.criteria.detail4_pap = 'ศูนย์คอมพิวเตอร์ได้ทำการตรวจสอบแล้วปรากฏว่า '+$scope.getJobById.dur_list;
              $rootScope.criteria.detail5_pap = 'ไม่สามารถใช้งานได้ และอายุการใช้งานประมาณ '+$scope.getJobById.yearCal+' ปี';
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
      $scope.gotoReport = function (){
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
			}
		  }).success(function (data){
			  $scope.updatePaperPrinted = data;
			 if($scope.updatePaperPrinted == 1){
            window.open('./mpdf/report/insureReport.php?dur_id='+$scope.getJobById.dur_id+'&job_id='+$scope.job_id, '_blank');
            location.reload();
          }
		  })

      }
}

function ReportCtrl($rootScope, $scope, $http, $compile, $timeout, $filter, $location, $log, $route, $routeParams, $translate,$modal) {
  $log.info('Enter ReportCtrl');
}
function InsureDeliCtrl($rootScope, $scope, $http, $compile, $timeout, $filter, $location, $log, $route, $routeParams, $translate,$modal,myFunction ) {
  $log.info('Enter InsureDeliCtrl');

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
      console.log($scope.getJobObj);
      if($scope.getJobObj.job_status == "60"){
        $http.get('API/admin/insure/getInsureList.php?dur_id='+$scope.dur_id+'&job_id='+$scope.getJobObj.job_id).success(function (data){
          $scope.getInsureList = data;
          console.log($scope.getInsureList);
          $scope.i = $scope.getInsureList.length;
        })
      }else if($scope.getJobObj.job_status == "606"){
        $http.get('API/admin/insure/getInsureCompany.php?job_id='+$scope.getJobObj.job_id).success(function (data){
          $scope.getInsireList = data;
          console.log($scope.getInsireList);

          $scope.i = $scope.getOrderList.length;
        })
        // $http.get('API/admin/order/getCompanyName.php?com_id='+)
      }
      $http.get('API/admin/insure/getInsureTotal.php?job_id='+$scope.getJobObj.job_id).success(function (data){
        $scope.getInsureTotal = data;
      })
    });

  }
  $scope.search();
  $scope.serailNo = function (order_id){
    var modalInstance = $modal.open({
        templateUrl: 'content/popup/admin/orderSerailNo-popup.html',
        controller: serailNoCtrl,
        backdrop: 'static',
        windowClass: 'large',
        keyboard : false,
        resolve : {
            params_order_id: function () {
                return order_id;
            }
        }
    });
    modalInstance.result.then(function (isClose) {
    }, function () {
        $log.info('Modal dismissed at: ' + new Date());
    });
  }
  $http.get('API/lov/getCompany.php').success(function (data){
    $scope.getCompanyList = data;
  });

  $scope.clearInput = function (){
    $rootScope.criteria = {};
  }
  $scope.checkInsure = function (id,order_status){
    $http.get('API/admin/insure/updateInsureStatus.php?order_id='+id+'&order_status='+order_status).success(function (data){
      $scope.updateInsureStatus = data;
      $scope.search();
    });
  }
  $scope.save = function (){
    myFunction.confirmDeliver().result.then(function(ok) {
      $scope.checkUpdate = $scope.i - 1;
      if (ok) {
        for (i = 0; i < $scope.i; i++) {
          $http.get('API/admin/insure/saveDeliver.php?dur_id='+$scope.dur_id
                                                          +'&deli_job_id='+$scope.getJobObj.job_id
                                                          +'&deli_history='+$scope.getInsureList[i].order_list
                                                          +'&deli_order_id='+$scope.getInsureList[i].order_id
                                                          +'&deli_num='+$scope.getInsureList[i].order_num
                                                          +'&deli_company='+$("[name='deli_company"+i+"']").val()
                                                          +'&deli_bill='+$("[name='deli_bill"+i+"']").val()
                                                          +'&deli_total='+$("[name='deli_total"+i+"']").val()
                                                          +'&deli_date='+$scope.date_now).success(function (data){
            $scope.saveDeliver = data;
          });
          if(i==$scope.checkUpdate){
            $scope.job_status = "2";
            $scope.job_last_status = "606";

            $http.get('API/lov/updateJobStatus.php?job_status='+$scope.job_status+"&job_id="+$scope.job_id+'&job_last_status='+$scope.job_last_status+'&officer_id='+$scope.getJobObj.job_acc_after).success(function (data){
              $scope.updateJobStatus = data;
              if($scope.updateJobStatus == 1){
                $scope.app.addAlert('gritter-success', 'การบันทึกเรียบร้อย', 4000);
                $scope.search();
              }
            })
          }
        }
      };
     });
  }
  $scope.back = function (){
    $location.path('/p-order-list');
  }
}
function InsureHistoryCtrl($rootScope, $scope, $http, $compile, $timeout, $filter, $location, $log, $route, $routeParams, $translate,$modal) {
  $log.info('Enter InsureHistoryCtrl');

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
    $http.get('API/admin/insure/getJobHistory.php?page_number='+page_number+'&dur_numoe='+$rootScope.criteria.dur_numoe+
                                                                            '&dep='+$rootScope.criteria.dep+
                                                                            '&dur_naoe='+$rootScope.criteria.dur_naoe+
                                                                            '&user_id='+$rootScope.criteria.user_id+
                                                                            '&date_f='+$rootScope.criteria.date_f+
                                                                            '&date_t='+$rootScope.criteria.date_t).success(function (data){
      $scope.getJobHistoryList = data;
      console.log($scope.getJobHistoryList);
      angular.forEach($scope.getJobHistoryList ,function (item){
        $http.get('API/admin/getUserDepartment.php?cost_id='+item.job_dep_of_durable).success(function (data){
          item.nameOfDepartment = data;
        });
        $http.get('API/user/getNameOfficer.php?officer_id='+item.job_user_id).success(function (data){
          $scope.getNameOfficerOrder = data;
          item.offerName =  $scope.getNameOfficerOrder;
        });
        $http.get('API/user/getNameOfficer.php?officer_id='+item.job_acc_by).success(function (data){
          $scope.getNameAcc = data;
          item.offerNameAcc =  $scope.getNameAcc;
        });
      })
      $http.get('API/admin/insure/getTotalJobDeliver.php').success(function(resp){
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

    $location.path('order-history/'+job_id+'/'+dur_id)
  }

}
function InsureHistoryDetailCtrl($rootScope, $scope, $http, $compile, $timeout, $filter, $location, $log, $route, $routeParams, $translate,$modal) {
  $log.info('Enter InsureHistoryDetailCtrl');

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

      $http.get('API/admin/order/getHistoryDeliver.php?dur_id='+$scope.dur_id+'&job_id='+$scope.getJobObj.job_id).success(function (data){
        $scope.getHistoryObj = data;
        console.log($scope.getHistoryObj);
      })
      $http.get('API/admin/getUserDepartment.php?cost_id='+$scope.getJobObj.job_dep_of_durable).success(function (data){
        $scope.getJobObj.nameOfDepartment = data;
      });
    });
  }
  $scope.search();
  $scope.serailNo = function (order_id){
    var modalInstance = $modal.open({
        templateUrl: 'content/popup/admin/orderSerailNo-popup.html',
        controller: serailNoCtrl,
        backdrop: 'static',
        windowClass: 'large',
        keyboard : false,
        resolve : {
            params_order_id: function () {
                return order_id;
            }
        }
    });
    modalInstance.result.then(function (isClose) {
    }, function () {
        $log.info('Modal dismissed at: ' + new Date());
    });
  }
  $scope.back = function (){
    $location.path('order-history');
  }

}
