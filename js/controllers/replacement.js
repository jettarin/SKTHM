angular.module('myApp').config([ '$routeProvider', function($routeProvider) {
    $routeProvider.when("/replace-list",{templateUrl:_.toHttpGetUrl('content/replace/list.html'),controller: ReplaceListCtrl});
    $routeProvider.when("/p-replace-list",{templateUrl:_.toHttpGetUrl('content/replace/p-list.html'),controller: PusReplaceListCtrl});
    $routeProvider.when("/replace/from/:id",{templateUrl:_.toHttpGetUrl('content/replace/from.html'),controller: ReplaceFromListCtrl});
    $routeProvider.when("/replace-deli-form/:id/:job_id",{templateUrl:_.toHttpGetUrl('content/replace/p-deliver.html'),controller: ReplaceDeliCtrl});
    $routeProvider.when("/replace-history",{templateUrl:_.toHttpGetUrl('content/replace/history.html'),controller: ReplaceHistoryCtrl});
    $routeProvider.when("/replace-history/:job_id/:dur_id",{templateUrl:_.toHttpGetUrl('content/replace/history-detail.html'),controller: ReplaceHistoryDetailCtrl});



} ]);


function ReplaceListCtrl($rootScope, $scope, $http, $compile, $timeout, $filter, $location, $log, $route, $routeParams, $translate,$modal) {
    $log.info('Enter ReplaceListCtrl');
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
    $http.get('API/admin/replace/getJobByAccStatus.php?page_number='+page_number+'&dur_numoe='+$rootScope.criteria.dur_numoe
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
	  if(item.job_status == '5'){
		item.job_statusSTR = 'ถูกร้องขอสั่งซื้อทดแทน';
		item.statusColor = 'orange';
	  }else if(item.job_status == '50'){
		item.job_statusSTR = 'สั่งซื้อทดแทนแล้ว';
		item.statusColor = 'green';
	  }
      $http.get('API/admin/getUserDepartment.php?cost_id='+item.job_dep_of_durable).success(function (data){
        item.nameOfDepartment = data;
        item.dur_DepartmentStr = item.nameOfDepartment .substring(0, 16)+"..";
      });
    });


    $http.get('API/admin/replace/getJobByAccTotal.php').success(function(resp){
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
$scope.gotoReplacement = function (id){
  $location.path('/replace/from/'+id)
}

}

// พัสดุ
function PusReplaceListCtrl($rootScope, $scope, $http, $compile, $timeout, $filter, $location, $log, $route, $routeParams, $translate,$modal,myFunction) {
    $log.info('Enter PusReplaceListCtrl');

    if (!$rootScope.paging) {
      $rootScope.paging = APP.DEFAULT_PAGING;
    }
      $rootScope.criteria = {};

    $rootScope.list.search = function (){
      $http.get('API/admin/replace/getJobByJobStatus.php?job_header='+$rootScope.criteria.job_header+
                                                                     '&dur_list='+$rootScope.criteria.dur_list+
                                                                     '&dep='+$rootScope.criteria.dep+
                                                                     '&dur_numoe='+$rootScope.criteria.dur_numoe+
                                                                     '&date_f='+$rootScope.criteria.date_f+
                                                                     '&date_t='+$rootScope.criteria.date_t).success(function (data){
        $scope.getPlist = data;
        console.log($scope.getPlist);
        angular.forEach($scope.getPlist ,function (item){

          // $http.get('API/admin/getUserDepartment.php?cost_id='+item.job_dep_of_durable).success(function (data){
          //   item.nameOfDepartment = data;
          // });
          $http.get('API/lov/getAdminDepartment.php?cost_id='+item.job_dep_of_durable).success(function (data){
					$scope.dep = data;
					item.depName = $scope.dep.Cost_name;
          console.log($scope.dep);
					if($scope.dep.Cost_name == undefined){
						item.nameOfDepartment = 'ไม่ระบุหน่วยงาน'
					}else{
						item.nameOfDepartment = 	item.depName.substring(0, 16)+"..";
					}
				})

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


    $scope.gotoDeliver = function (id,job_id,dep_id){
      myFunction.confirmToRepeat().result.then(function(ok) {
        if (ok) {
           $location.path('/replace-deli-form/'+id+'/'+job_id);
        }else {
          $location.path('/durable-moved/'+id+'/'+job_id);
        }
      });
    }

    $scope.clear = function (){
        $rootScope.criteria = {};
        $rootScope.list.search();
    }

}

function ReplaceFromListCtrl($rootScope, $scope, $http, $compile, $timeout, $filter, $location, $log, $route, $routeParams, $translate,$modal,myFunction) {
    $log.info('Enter ReplaceFromListCtrl');

    $scope.job_id = $routeParams.id;
    $scope.search = function (){
      $http.get('API/admin/getJobById.php?job_id='+$scope.job_id).success(function (data){
        $scope.getJobById = data;

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
        $http.get('API/admin/replace/getOrderList.php?job_id='+$scope.job_id+'&dur_id='+$scope.getJobById.job_dur_id).success(function (data){
          $scope.getReplaceList = data;
          if($scope.getReplaceList == undefined || $scope.getReplaceList == ''){
             $scope.showSave = 1;
          }else{
            $scope.showSave = 0;
          }
        });

        $http.get('API/admin/getUserDepartment.php?cost_id='+$scope.getJobById.dur_department).success(function (data){
          $scope.getJobById.costName = data;
          $scope.costName = $scope.getJobById.costName;
        });
        $http.get('API/user/getNameOfficer.php?officer_id='+$scope.getJobById.job_acc_after).success(function (data){
          $scope.getJobById.userName = data;
        });

        $http.get('API/admin/replace/getOrder.php?job_id='+$scope.job_id+'&dur_id='+$scope.getJobById.job_dur_id).success(function (data){
          $scope.getOrderObj = data;
          $scope.order_list = $scope.getOrderObj.order_list;
          $scope.order_num = $scope.getOrderObj.order_num;
          if($scope.getOrderObj=='' || $scope.getOrderObj==null){
            $scope.textTable = "บันทึก";
          }else{
            $scope.editOrderStatus  = "1";
            $scope.textTable = "แก้ไข";
          }
        });
      });
      $http.get('API/admin/replace/getJobSendToByStatus.php?job_id='+$scope.job_id).success(function (data){
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
    $scope.editOrder = function (){
      $scope.editOrderStatus = "0";
      $scope.textTable = "บันทึก";
    }
    $scope.saveEditOrder = function (){
      $http.get('API/admin/replace/updateOrder.php?order_list='+$scope.order_list+'&order_num='+$scope.order_num+'&order_job_id='+$scope.job_id+'&order_dur_id='+$scope.getJobById.job_dur_id).success(function (data){
        $scope.updateOrder = data;
        if($scope.updateOrder == 1){
          $scope.editOrderStatus = "1";
          $scope.app.addAlert('gritter-success', 'แก้ไขอุปกรณ์เรียบร้อย', 4000);
        }
      })
    }

    $scope.saveOrder = function (){
      $http.get('API/admin/replace/saveOrder.php?job_id='+$scope.getJobById.job_id+'&dur_id='+$scope.getJobById.job_dur_id+'&order_list='+$scope.order_list+'&order_num='+$scope.order_num).success(function (data){
        $scope.saveOrder = data;
        if($scope.saveOrder==1){
          $scope.app.addAlert('gritter-success', 'บันทึกรายการเรียบร้อย', 4000);
        $scope.search();
        }
      })
    }
    $scope.search();
    $scope.deleteOrder = function (id){
      $http.get('API/admin/order/deleteOrderById.php?order_id='+id).success(function (data){
        $scope.deleteOrderById = data;
        if($scope.deleteOrderById == 1){
          $scope.app.addAlert('gritter-success', 'ลบเรียบร้อย', 4000);
            $scope.search();
        }
      })

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
            if(val == 1){
              $scope.showPrint = false;
            }else if(val == 2){
              $scope.search();
              $scope.showPrint = true;
              $http.get('API/admin/replace/getPaperPrint.php?job_id='+$scope.job_id+'&dur_id='+$scope.getJobById.dur_id).success(function (data){
                $scope.getPaperPrint = data;
                if($scope.getPaperPrint.status == 0){
                  $rootScope.criteria.no_pap = 'ที่ สท 0032.202.2/';
                  $rootScope.criteria.head_pap = 'เรื่อง ขออนุมัติสั่งซื้อทดแทน';
                  $rootScope.criteria.detail1_pap = 'เรียน ผู้อำนวยการโรงพยาบาลสุโขทัย ';
                  $rootScope.criteria.detail2_pap = 'เนื่องด้วยศูนย์คอมพิวเตอร์ ได้รับใบแจ้งซ่อมเลขที่ 1/60 หมายเลขครุภัณฑ์ '+$scope.getJobById.dur_numoe;
                  $rootScope.criteria.detail3_pap = 'จากหน่วยงาน '+$scope.costName+' เมื่อวันที่ '+$scope.getJobById.dateStr+' '+$scope.getJobById.monthStr+' '+$scope.getJobById.yearStr+' และทางศูนย์คอมพิวเตอร์';
                  $rootScope.criteria.detail4_pap = 'ได้ทำการตรวจสอบแล้วปรากฏว่า '+$scope.getJobById.dur_list+ 'ไม่สามารถใช้งานได้และอายุการใช้งานประมาณ '+$scope.getJobById.yearCal+' ปี';
				          $rootScope.criteria.detail5_pap = '1. '+$scope.getReplaceList[0].order_list;

                }else if($scope.getPaperPrint.status == 1){
                  $rootScope.criteria.no_pap = $scope.getPaperPrint.paper;
                  $rootScope.criteria.head_pap = $scope.getPaperPrint.header;
                  $rootScope.criteria.detail1_pap = $scope.getPaperPrint.detail1;
                  $rootScope.criteria.detail2_pap = $scope.getPaperPrint.detail2;
                  $rootScope.criteria.detail3_pap = $scope.getPaperPrint.detail3;
                  $rootScope.criteria.detail4_pap = $scope.getPaperPrint.detail4;
                  $rootScope.criteria.detail5_pap = $scope.getPaperPrint.detail5;
				          $rootScope.criteria.detail6_pap = $scope.getPaperPrint.detail6;

                }
              })
            }
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
    $scope.orderList = function (){
      var modalInstance = $modal.open({
          templateUrl: 'content/popup/admin/orderList-popup.html',
          controller: orderListPopupCtrl,
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
    $scope.replaceDurable = function (){
      myFunction.confirmBoxreplaceDurable().result.then(function(ok) {
        if (ok) {

          $http.get('API/admin/replace/updateJobStatusByJobId.php?job_id='+$scope.job_id+"&job_status=50"+'&dur_id='+$scope.getJobById.dur_id).success(function (data){
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
    $scope.back = function (){
      $location.path('/replace-list');
    }
    $scope.gotoReport = function (){
		 $http({
			url:'API/admin/replace/updatePaperPrinted.php',
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
        'detail6':$rootScope.criteria.detail6_pap,
			}
		  }).success(function (data){
			  $scope.updatePaperPrinted = data;
			 if($scope.updatePaperPrinted == 1){
            window.open('./mpdf/report/replaceReport.php?dur_id='+$scope.getJobById.dur_id+'&job_id='+$scope.job_id, '_blank');

            location.reload();
          }
		  })


    }
}

function ReplaceDeliCtrl($rootScope, $scope, $http, $compile, $timeout, $filter, $location, $log, $route, $routeParams, $translate,$modal,myFunction ) {
  $log.info('Enter ReplaceDeliCtrl');

  $scope.deli_his = [];
  $scope.dur_id = $routeParams.id;
  $scope.job_id = $routeParams.job_id;
  var nd = new Date();
  var gd = ("0" + nd.getDate()).slice(-2);
  var gm = ("0" + (nd.getMonth() + 1)).slice(-2);
  var gh = ("0" + nd.getHours()).slice(-2);
  var gmi = ("0" + nd.getMinutes()).substr(-2)
  var gsec = ("0" + nd.getSeconds()).substr(-2)
  var gy = nd.getFullYear();
  var cy = gy+543;
  $scope.date_now = gd+"/"+gm+"/"+cy;
  $scope.date_save = cy+"-"+gm+"-"+gd+" "+gh+":"+gmi+":"+gsec;
  $scope.yearTh = cy;
  $scope.search = function (){
    $http.get('API/lov/getDurableById.php?dur_id='+$scope.dur_id).success(function (data){
      $scope.getDurableById = data;
      if($scope.getDurableById.dur_dis == "1"){
        $scope.dur_color = "red";
        $scope.dur_newCo = "green";
      }
      var nd = new Date($scope.getDurableById.dur_dop.date);
      var gd = ("0" + nd.getDate()).slice(-2);
      var gm = ("0" + (nd.getMonth() + 1)).slice(-2);
      var gy = nd.getFullYear();
      $scope.dur_date = gd+"/"+gm+"/"+gy;
      $http.get('API/admin/replace/getNewDurable.php?dur_id='+$scope.getDurableById.dur_id).success(function (data){
        $scope.getNewDurable = data;
        console.log($scope.getNewDurable);
        if($scope.getNewDurable == ''|| $scope.getNewDurable == null || $scope.getNewDurable == undefined){
          $http.get('API/admin/replace/getOrder.php?job_id='+$scope.job_id+'&dur_id='+$scope.dur_id).success(function (data){
            $scope.getOrder = data;
            console.log($scope.getOrder);
            $rootScope.criteria.dur_list = $scope.getOrder.order_list;
          });
        }else{
          console.log("else");
          $rootScope.criteria.dur_list = $scope.getNewDurable.dur_list;
          $rootScope.criteria.dur_price = $scope.getNewDurable.dur_price;
          $rootScope.criteria.dur_naoe = $scope.getNewDurable.dur_naoe;
          $rootScope.criteria.dur_numoe = $scope.getNewDurable.dur_numoe;
          $rootScope.criteria.dur_tom = $scope.getNewDurable.dur_tom;
          $rootScope.criteria.dur_company = $scope.getNewDurable.dur_company;

          $rootScope.criteria.dur_acquired = $scope.getNewDurable.dur_acquired;
          $rootScope.criteria.due_new_id = $scope.getNewDurable.dur_id;
        }
        $rootScope.criteria.dur_department = $scope.getDurableById.dur_department;

        $http.get('API/admin/replace/getDurableDetailByDurId.php?dur_id='+$scope.due_new_id).success(function (data){
          $scope.getDurableDetailByDurId = data;

        })
      });
    })


    $http.get('API/lov/getJobByDurId.php?dur_id='+$scope.dur_id+'&job_id='+$scope.job_id).success(function (data){
      $scope.getJobObj = data;
      if($scope.getJobObj.job_status == "40"){
        $http.get('API/admin/order/getOrderList.php?dur_id='+$scope.dur_id+'&job_id='+$scope.getJobObj.job_id).success(function (data){
          $scope.getOrderList = data;
          $scope.i = $scope.getOrderList.length;
        })
      }else if($scope.getJobObj.job_status == "7"){
        $http.get('API/admin/order/getOrderCompany.php?job_id='+$scope.getJobObj.job_id).success(function (data){
          $scope.getOrderList = data;
          $scope.i = $scope.getOrderList.length;
        })
      }
      $http.get('API/admin/order/getOrderTotal.php?job_id='+$scope.getJobObj.job_id).success(function (data){
        $scope.getOrderTotal = data;
      })
    });

  }
  $scope.search();
  $http.get('API/lov/getCompany.php').success(function (data){
    $scope.getCompanyList = data;
  });

  $scope.clearInput = function (){
    $rootScope.criteria = {};
  }



  $scope.checkOrder = function (id,order_status){
    $http.get('API/admin/order/updateOrderStatus.php?order_id='+id+'&order_status='+order_status).success(function (data){
      $scope.updateOrderStatus = data;
      $scope.search();
    });
  }

  $scope.save = function (){
    console.log("list=",$rootScope.criteria.dur_list );
      console.log("dur_price=",$rootScope.criteria.dur_price );
        console.log("dur_naoe=",$rootScope.criteria.dur_naoe );
          console.log("dur_numoe=",$rootScope.criteria.dur_numoe );
            console.log("dur_tom=",$rootScope.criteria.dur_tom );
              console.log("dur_company=",$rootScope.criteria.dur_company );

    myFunction.confirmReplaceBox().result.then(function(ok) {
      $scope.checkUpdate = $scope.i - 1;
      if (ok) {
        $http.get('API/admin/replace/saveDurable.php?dur_dop='+$scope.date_save+
                                                    '&dur_list='+$rootScope.criteria.dur_list+
                                                    '&dur_price='+$rootScope.criteria.dur_price+
                                                    '&dur_naoe='+$rootScope.criteria.dur_naoe+
                                                    '&dur_numoe='+$rootScope.criteria.dur_numoe+
                                                    '&dur_tom='+$rootScope.criteria.dur_tom+
                                                    '&dur_year='+$scope.yearTh+
                                                    '&dur_company='+$rootScope.criteria.dur_company+
                                                    '&dur_department='+$rootScope.criteria.dur_department+
                                                    '&dur_acquired='+$rootScope.criteria.dur_acquired+
                                                    '&dur_id='+$scope.getDurableById.dur_id).success(function (data){
            $scope.saveDurable = data
            console.log($scope.saveDurable);
            if($scope.saveDurable == 1){
              $scope.app.addAlert('gritter-success', 'การบันทึกเรียบร้อย', 4000);
              $scope.search();

              $scope.job_status = "8";
              $http.get('API/admin/replace/updateJobStatusByJobId.php?job_id='+$scope.getJobObj.job_id+'&job_status='+$scope.job_status).success(function (data){
                $scope.updateJobStatusByJobId = data;
              })
            }
          });

      };
     });
  }
      $http.get('API/lov/getDepartment.php').success(function (data){
        $scope.getDepartmentList = data;
      })
      $scope.i=1;
        $("#add_row").click(function(){
         $('#addr'+$scope.i).html("<td colspan='3'><input type='text' class='form-control input-xs' name='deli_his"+$scope.i+"' data-ng-model='criteria.deli_his"+$scope.i+"'></td>");
         $('#tab_logic').append('<tr id="addr'+($scope.i+1)+'"></tr>');
         $scope.i++;
     });
        $("#delete_row").click(function(){
            if($scope.i>1){
            $("#addr"+($scope.i-1)).html('');
            $scope.i--;
        }
    });
    $scope.edit = function (){
      $scope.checkUpdate = $scope.i - 1;
      for (i = 0; i < $scope.i; i++) {
          if($("[name='deli_his"+i+"']").val()==null || $("[name='deli_his"+i+"']").val() == ''){
            $scope.app.addAlert('gritter-error', 'เป็นค่าว่างไม่ได้', 4000);
          }else{
            $http.get('API/admin/replace/saveDurableDetail.php?de_desc='+$("[name='deli_his"+i+"']").val()+
                                                                        '&de_dur_id='+$scope.due_new_id).success(function (data){
              $scope.saveDurDetail = data;
            });
            if(i==$scope.checkUpdate){
              $scope.app.addAlert('gritter-success', 'การบันทึกเรียบร้อย', 4000);
              $scope.search();
              $scope.clearInput();
            }
          }
      }
    }
    $scope.editDurableDetail = function (id) {
    var modalInstance = $modal.open({
        templateUrl: 'content/popup/lov/durable-popup.html',
        controller: durablePopupCtrl,
        backdrop: 'static',
        windowClass: 'medium',
        keyboard: false,
        resolve: {
            params_de_id: function () {
                return id;
            }
        }
    });
    modalInstance.result.then(function (isClose) {
    }, function () {
        $log.info('Modal dismissed at: ' + new Date());
    });
};
    $scope.clearInput = function (){
      location.reload();
    }
  $scope.back = function (){
    $location.path('/p-replace-list');
  }
}


function ReplaceHistoryCtrl($rootScope, $scope, $http, $compile, $timeout, $filter, $location, $log, $route, $routeParams, $translate,$modal) {
  $log.info('Enter ReplaceHistoryCtrl');

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
      $http.get('API/admin/replace/getJobHistory.php?page_number='+page_number+'&dur_numoe='+$rootScope.criteria.dur_numoe+
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
        $http.get('API/admin/replace/getTotalJobDeliver.php').success(function(resp){
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
      $location.path('replace-history/'+job_id+'/'+dur_id)
    }
}

function ReplaceHistoryDetailCtrl($rootScope, $scope, $http, $compile, $timeout, $filter, $location, $log, $route, $routeParams, $translate,$modal) {
  $log.info('Enter ReplaceHistoryDetailCtrl');

  $scope.deli_his = [];
  $scope.dur_id = $routeParams.dur_id;
  $scope.job_id = $routeParams.job_id;
  var nd = new Date();
  var gd = ("0" + nd.getDate()).slice(-2);
  var gm = ("0" + (nd.getMonth() + 1)).slice(-2);
  var gh = ("0" + nd.getHours()).slice(-2);
  var gmi = ("0" + nd.getMinutes()).substr(-2)
  var gsec = ("0" + nd.getSeconds()).substr(-2)
  var gy = nd.getFullYear();
  var cy = gy+543;
  $scope.date_now = gd+"/"+gm+"/"+cy;
  $scope.date_save = cy+"-"+gm+"-"+gd+" "+gh+":"+gmi+":"+gsec;
  $scope.yearTh = cy;
  $scope.search = function (){
    $http.get('API/lov/getDurableById.php?dur_id='+$scope.dur_id).success(function (data){
      $scope.getDurableById = data;
      if($scope.getDurableById.dur_dis == "1"){
        $scope.dur_color = "red";
        $scope.dur_newCo = "green";
      }
      var nd = new Date($scope.getDurableById.dur_dop.date);
      var gd = ("0" + nd.getDate()).slice(-2);
      var gm = ("0" + (nd.getMonth() + 1)).slice(-2);
      var gy = nd.getFullYear();
      $scope.dur_date = gd+"/"+gm+"/"+gy;
      $http.get('API/admin/replace/getNewDurable.php?dur_id='+$scope.getDurableById.dur_id).success(function (data){
        $scope.getNewDurable = data;
        if($scope.getNewDurable == ''|| $scope.getNewDurable == null || $scope.getNewDurable == undefined){
          $http.get('API/admin/replace/getOrder.php?job_id='+$scope.job_id+'&dur_id='+$scope.dur_id).success(function (data){
            $scope.getOrder = data;
            $scope.dur_list = $scope.getOrder.order_list;
          });
        }else{
          $scope.dur_list = $scope.getNewDurable.dur_list;
        }
        $scope.dur_price = $scope.getNewDurable.dur_price;
        $scope.dur_naoe = $scope.getNewDurable.dur_naoe;
        $scope.dur_numoe = $scope.getNewDurable.dur_numoe;
        $scope.dur_tom = $scope.getNewDurable.dur_tom;
        $scope.dur_company = $scope.getNewDurable.dur_company;
        $scope.dur_department = $scope.getNewDurable.dur_department;
        $scope.dur_acquired = $scope.getNewDurable.dur_acquired;
        $scope.due_new_id = $scope.getNewDurable.dur_id;
        $http.get('API/admin/replace/getDurableDetailByDurId.php?dur_id='+$scope.due_new_id).success(function (data){
          $scope.getDurableDetailByDurId = data;
        })
      });
    })


    $http.get('API/lov/getJobByDurId.php?dur_id='+$scope.dur_id+'&job_id='+$scope.job_id).success(function (data){
      $scope.getJobObj = data;
      if($scope.getJobObj.job_status == "40"){
        $http.get('API/admin/order/getOrderList.php?dur_id='+$scope.dur_id+'&job_id='+$scope.getJobObj.job_id).success(function (data){
          $scope.getOrderList = data;
          $scope.i = $scope.getOrderList.length;
        })
      }else if($scope.getJobObj.job_status == "7"){
        $http.get('API/admin/order/getOrderCompany.php?job_id='+$scope.getJobObj.job_id).success(function (data){
          $scope.getOrderList = data;
          $scope.i = $scope.getOrderList.length;
        })
      }
      $http.get('API/admin/order/getOrderTotal.php?job_id='+$scope.getJobObj.job_id).success(function (data){
        $scope.getOrderTotal = data;
      })
    });
  }
  $scope.search();
  $scope.clearInput = function (){
    $rootScope.criteria = {};
  }
  $scope.checkOrder = function (id,order_status){
    $http.get('API/admin/order/updateOrderStatus.php?order_id='+id+'&order_status='+order_status).success(function (data){
      $scope.updateOrderStatus = data;
      $scope.search();
    });
  }
      $http.get('API/lov/getDepartment.php').success(function (data){
        $scope.getDepartmentList = data;
      })
  $scope.back = function (){
    $location.path('/replace-history');
  }
}
