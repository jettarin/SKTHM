angular.module('myApp').config([ '$routeProvider', function($routeProvider) {
    $routeProvider.when("/durable-list",{templateUrl:_.toHttpGetUrl('content/lov/durable-list.html'),controller: DrableListCtrl});
    $routeProvider.when("/durable-edit/:id",{templateUrl:_.toHttpGetUrl('content/lov/durable-detail.html'),controller: DrableDetailCtrl});
    $routeProvider.when("/durable-create/",{templateUrl:_.toHttpGetUrl('content/lov/durable-add.html'),controller: DrableAddCtrl});
    $routeProvider.when("/durable-move/",{templateUrl:_.toHttpGetUrl('content/lov/durable-move-list.html'),controller: DurableMoveLiatCtrl});
    $routeProvider.when("/durable-moved-create",{templateUrl:_.toHttpGetUrl('content/lov/durable-move-create.html'),controller: DurableMoveCreateCtrl});
    $routeProvider.when("/durable-moved-edit/:dm_id",{templateUrl:_.toHttpGetUrl('content/lov/durable-move-edit.html'),controller: DurableMoveEditCtrl});
    $routeProvider.when("/durable-moved/:dur_id/:job_id",{templateUrl:_.toHttpGetUrl('content/lov/durable-move-create.html'),controller: DurableMoveFinishCtrl});

} ]);

function DrableListCtrl($rootScope, $scope, $http, $compile, $timeout, $filter, $location, $log, $route, $routeParams, $translate,$modal,myFunction) {
    $log.info('Enter DrableListCtrl');


        if (!$rootScope.paging) {
    			$rootScope.paging = APP.DEFAULT_PAGING;
    		}
    		if (!$rootScope.criteria) {
    			$rootScope.criteria = {};
    		}
        $scope.keydown = function (event) {
          if (event.keyCode === 13) {
            $scope.search();
          }
        };

        $http.get('API/lov/getDepartment.php').success(function (data){
          $scope.depList = data;
        })
        $scope.search = function (page_number){
          if(page_number == undefined){
    				var page_number = '1';
    			}
          if($rootScope.criteria.sortBy == undefined ||$rootScope.criteria.sortBy.length == 0  ){
            $scope.sortBy = 'DESC';
          }else{
            $scope.sortBy = $rootScope.criteria.sortBy[0].direction;
          }
    			angular.extend($rootScope.criteria, $rootScope.paging);
          $http.get('API/lov/getDurable.php?page_number='+page_number
                                                       +'&dur_list='+$rootScope.criteria.dur_list
                                                       +'&dur_department='+$rootScope.criteria.dep
                                                       +'&dur_numoe='+$rootScope.criteria.dur_numoe
                                                       +'&dur_naoe='+$rootScope.criteria.dur_naoe
                                                       +'&direc='+$scope.sortBy).success(function (data){
            $scope.getDurableList = data;
            angular.forEach($scope.getDurableList,function (item){
              if(item.dur_dop != null){
                var dateStr = new Date(item.dur_dop.date);

                var d = ("0" + (dateStr.getDate())).slice(-2);
                var m = dateStr.getMonth();
                var calM = ("0" + (dateStr.getMonth() + 1)).slice(-2);
                var y = dateStr.getFullYear();
                var calYNow = y + 543;
                item.dopStr = d+"/"+calM+"/"+y;
              }
              if(item.dur_dis == 1){
                item.disColor = "red";
                item.mess = "จำหน่ายแล้ว"
              }
              $http.get('API/admin/getUserDepartment.php?cost_id='+item.dur_department).success(function (data){
                $scope.depStr = data;
                item.depStr = $scope.depStr;
                //cut string for table
                item.dur_DepartmentStr = $scope.depStr.substring(0, 10)+"..";
                if($scope.depStr == null || $scope.depStr == undefined || $scope.depStr == ''){
                  item.dur_DepartmentStr = "ไม่ระบุหน่วยงาน"
                }
              });
            });
            //get Total Durable
            $http.get('API/lov/getTotalDurable.php?dur_list='+$rootScope.criteria.dur_list
            +'&dur_department='+$rootScope.criteria.dep
            +'&dur_numoe='+$rootScope.criteria.dur_numoe
            +'&dur_naoe='+$rootScope.criteria.dur_naoe).success(function (data){
              $scope.getTotalDurable = data;
              $rootScope.paging.totalItems = $scope.getTotalDurable.totalC;
              $rootScope.paging.showing = _.getShowing($rootScope.paging.pageNumber, $rootScope.paging.limit, $scope.getTotalDurable.totalC);
            });
          });
        }
        $scope.search();
        $scope.selectPage = function(page) {
          $rootScope.paging.pageNumber = page;
          $scope.search(page);
        };
        $scope.replacement = function (id,dur_dis){
          myFunction.confirmReplacement().result.then(function(ok) {

            if (ok) {
              $http.get('API/lov/updateDurableDis.php?dur_id='+id+'&dur_dis='+dur_dis).success(function (data){
                $scope.updateDurableDis = data;
                if($scope.updateDurableDis == 1){
                  $scope.app.addAlert('gritter-success', 'การจำหน่ายครุภัณฑ์เรียบร้อย', 4000);
                  $scope.search($rootScope.paging.pageNumber);
                }else{
                  $scope.app.addAlert('gritter-error', 'การจำหน่ายครุภัณฑไม่สำเร็จ', 4000);
                }
              })
            }
          });
        }
        $scope.gotoEdit = function (id){
          $location.path('/durable-edit/'+id);
        }
        $scope.gotoDurableHistory = function (dur_id){

          $location.path('/job/detail/'+dur_id);
        }
        $scope.gotoCreate = function (){
          $location.path('/durable-create')
        }
        $scope.clear = function (){
          $rootScope.criteria = {};
          $scope.search();
        }
        $scope.delete = function (id){

        myFunction.confirmDeleteBox().result.then(function(ok) {
          if(ok){
            $http.get('API/lov/deleteDurable.php?dur_id='+id).success(function (data){
              $scope.deleteDur = data;
              console.log($scope.deleteDur);
              if($scope.deleteDur == 1){
                $scope.app.addAlert('gritter-success', 'การลบครุภัณฑ์เรียบร้อย', 4000);
                $scope.search();
              }
            })
          }
        })
        }
}

function DrableDetailCtrl($rootScope, $scope, $http, $compile, $timeout, $filter, $location, $log, $route, $routeParams, $translate,$modal,myFunction) {
    $log.info('Enter DrableDetailCtrl');
    $scope.dur_id = $routeParams.id;
    $http.get('API/lov/getDepartment.php').success(function (data){
      $scope.getDepartmentList = data;
    })
    $scope.search = function (){
      $http.get('API/lov/getDurableById.php?dur_id='+$scope.dur_id).success(function (data){
        $scope.getDurableObj = data;
        console.log($scope.getDurableObj);
        $scope.dur_list = $scope.getDurableObj.dur_list;
        $scope.dur_naoe = $scope.getDurableObj.dur_naoe;
        $scope.dur_price = $scope.getDurableObj.dur_price;
        $scope.dur_numoe = $scope.getDurableObj.dur_numoe;
        $scope.dur_tom = $scope.getDurableObj.dur_tom;
        $scope.dur_year = $scope.getDurableObj.dur_year;
        $scope.dur_company = $scope.getDurableObj.dur_company;
        $scope.dur_department = $scope.getDurableObj.dur_department;
        $scope.dur_acquired = $scope.getDurableObj.dur_acquired;

      })
      $http.get('API/admin/replace/getDurableDetailByDurId.php?dur_id='+$scope.dur_id).success(function (data){
        $scope.getDurableDetailList = data;
      });
    }
    $scope.search();
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
      $http.get('API/lov/getCompany.php').success(function (data){
        $scope.getCompanyList = data;
      });
      $scope.edit = function (){
        myFunction.confirmReplaceBox().result.then(function(ok) {
          $scope.checkUpdate = $scope.i - 1;
          if (ok) {
            $http.get('API/lov/updateDurable.php?dur_list='+$scope.dur_list+
                                                        '&dur_price='+$scope.dur_price+
                                                        '&dur_naoe='+$scope.dur_naoe+
                                                        '&dur_numoe='+$scope.dur_numoe+
                                                        '&dur_tom='+$scope.dur_tom+
                                                        '&dur_year='+$scope.dur_year+
                                                        '&dur_dop='+$scope.getDurableObj.dur_dop.date+
                                                        '&dur_company='+$scope.dur_company+
                                                        '&dur_department='+$scope.dur_department+
                                                        '&dur_acquired='+$scope.dur_acquired+
                                                        '&dur_id='+$scope.dur_id).success(function (data){
                $scope.updateDurable = data
                console.log($scope.updateDurable);
                if($scope.updateDurable == 1){

                  $scope.app.addAlert('gritter-success', 'การบันทึกเรียบร้อย', 4000);
                  $scope.search();
                }
              });

              $scope.checkUpdate = $scope.i - 1;
              for (i = 0; i < $scope.i; i++) {
                  if($("[name='deli_his"+i+"']").val()==null || $("[name='deli_his"+i+"']").val() == ''){
                  }else{
                    $http.get('API/admin/replace/saveDurableDetail.php?de_desc='+$("[name='deli_his"+i+"']").val()+
                                                                                '&de_dur_id='+$scope.dur_id).success(function (data){
                      $scope.saveDurDetail = data;
                    });
                    if(i==$scope.checkUpdate){
                      $scope.app.addAlert('gritter-success', 'การบันทึกเรียบร้อย', 4000);
                      $scope.search();
                      $scope.clearInput();
                    }
                  }


              }
          };
         });
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
      $location.path('/durable-list');
    }
}

function DrableAddCtrl($rootScope, $scope, $http, $compile, $timeout, $filter, $location, $log, $route, $routeParams, $translate,$modal,myFunction) {
    $log.info('Enter DrableAddCtrl');


    $http.get('API/lov/getDepartment.php').success(function (data){
      $scope.getDepartmentList = data;
    })
    $scope.search = function (dur_id){
      $scope.dur_id = dur_id;
      var nd = new Date();
      var gd = ("0"+nd.getDate()).slice(-2);
      var gm = ("0"+(nd.getMonth() + 1)).slice(-2);
      var gy = nd.getFullYear();
      var cy = gy+543;
      var gh = ('0'+ nd.getHours()).substr(-2);
      var gmin = ('0'+ nd.getMinutes()).substr(-2);
      var gsec = ('0'+nd.getSeconds()).substr(-2);
      $scope.dateStr = cy+"-"+gm+"-"+gd+" "+gh+":"+gmin+":"+gsec;
      if(dur_id != undefined){
        $scope.readonlyInput = true;
        $http.get('API/lov/getDurableById.php?dur_id='+dur_id).success(function (data){
          $scope.getDurableById = data;
        })
        $http.get('API/admin/replace/getDurableDetailByDurId.php?dur_id='+$scope.dur_id).success(function (data){
          $scope.getDurableDetailList = data;
        });
      }
    }
    $scope.search();
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
      $scope.save = function (){
        myFunction.confirmReplaceBox().result.then(function(ok) {
          if (ok) {
            $http.get('API/lov/saveDurable.php?dur_dop='+$rootScope.criteria.date_f+
                                                        '&dur_list='+$scope.dur_list+
                                                        '&dur_price='+$scope.dur_price+
                                                        '&dur_naoe='+$scope.dur_naoe+
                                                        '&dur_numoe='+$scope.dur_numoe+
                                                        '&dur_tom='+$scope.dur_tom+
                                                        '&dur_year='+$scope.dur_year+
                                                        '&dur_company='+$scope.dur_company+
                                                        '&dur_department='+$scope.dur_department+
                                                        '&dur_acquired='+$scope.dur_acquired).success(function (data){
                $scope.saveDurable = data
					      console.log($scope.saveDurable);
                if($scope.saveDurable == 1){
                  $scope.app.addAlert('gritter-success', 'การบันทึกเรียบร้อย', 4000);
                  $http.get('API/lov/getLastDurable.php').success(function (data){
                    $scope.getLastDurable = data;
                    $scope.search($scope.getLastDurable.dur_id);
                  });
                }else{
                  $scope.app.addAlert('gritter-error', 'การบันทึกผิดพลาด', 4000);
                }
              });
          };
         });
      }
      $http.get('API/lov/getCompany.php').success(function (data){
        $scope.getCompanyList = data;
      });

      $scope.saveDurableDetail = function (){
        $scope.checkUpdate = $scope.i - 1;
        for (i = 0; i < $scope.i; i++) {
            if($("[name='deli_his"+i+"']").val()==null || $("[name='deli_his"+i+"']").val() == ''){

            }else{
              $http.get('API/admin/replace/saveDurableDetail.php?de_desc='+$("[name='deli_his"+i+"']").val()+
                                                                          '&de_dur_id='+$scope.dur_id).success(function (data){
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
      $location.path('/durable-list');
    }
}

function DurableMoveLiatCtrl($rootScope, $scope, $http, $compile, $timeout, $filter, $location, $log, $route, $routeParams, $translate,$modal,myFunction) {
    $log.info('Enter DurableMoveLiatCtrl');

    if (!$rootScope.paging) {
  		$rootScope.paging = APP.DEFAULT_PAGING;
  	}
  		$rootScope.criteria = {};


    $http.get('API/lov/getDepartment.php').success(function (data){
      $scope.getDepartmentList = data;

    })
    $scope.search = function (page_number){
      if(page_number == undefined){
        var page_number = '1';
      }

      angular.extend($rootScope.criteria, $rootScope.paging);
      $http.get('API/durable/getDurableMoved.php?dep_f='+$rootScope.criteria.dep_f+
                '&dep_t='+$rootScope.criteria.dep_t+
                '&dur_numoe='+$rootScope.criteria.dur_numoe+
                '&page_number='+page_number).success(function (data){
        $scope.dmList = data;
        console.log($scope.dmList);
        angular.forEach($scope.dmList, function (item){
          if(item.STATUS == 0){
            item.statusStr = "ถูกย้าย"
          }else if(item.STATUS == 2){
            item.statusStr = "ย้ายกลับแล้ว"
          }
        })

        $http.get('API/durable/getDurableMovedTotal.php').success(function (data){
          $scope.getMoved = data;
          console.log($scope.getMoved);
          $rootScope.paging.totalItems = $scope.getMoved.total
          $rootScope.paging.showing = _.getShowing($rootScope.paging.pageNumber, $rootScope.paging.limit, $scope.getMoved.total);
        })
      })


    }
    $scope.search()
    $scope.selectPage = function(page) {
      $rootScope.paging.pageNumber = page;
      $scope.search(page);
    };
    $scope.gotoCreate = function (){
      $location.path('/durable-moved-create')
    }
    $scope.gotoEdit = function (id){
      $location.path('/durable-moved-edit/'+id)
    }
    $scope.clear = function (){
      $rootScope.criteria = {};
      $scope.search()
    }
    $scope.gotoReport = function (id){
      window.open('./mpdf/report/durableMovedReport.php?dm_id='+id);
    }
    $scope.forward = function (id){
      myFunction.confirmForwardBox().result.then(function(ok) {
        if (ok) {
          $http.get('API/durable/updateDurableMovedStatus.php?dm_id='+id).success(function (data){
            $scope.updated = data;
            console.log($scope.deleted)
            if($scope.updated == 1){
              $scope.app.addAlert('gritter-success', 'การย้ายกลับเสร็จสมบูรณ์', 4000);
              $scope.search()
            }else{
              $scope.app.addAlert('gritter-error', 'การย้ายเกิดข้อผิดพลาด', 4000);
            }
          })
        }
      })
    }

    $scope.delete = function (id){
      myFunction.confirmDeleteBox().result.then(function(ok) {
        if (ok) {
          $http.get('API/durable/deleteDurableMoved.php?dm_id='+id).success(function (data){
            $scope.deleted = data;
            console.log($scope.deleted)
            if($scope.deleted == 1){
              $scope.app.addAlert('gritter-success', 'การลบเสร็จสมบูรณ์', 4000);
              $scope.search()
            }else{
              $scope.app.addAlert('gritter-error', 'การลบเกิดข้อผิดพลาด', 4000);
            }
          })
        }
      })
    }

}

function DurableMoveCreateCtrl($rootScope, $scope, $http, $compile, $timeout, $filter, $location, $log, $route, $routeParams, $translate,$modal,myFunction) {
    $log.info('Enter DurableMoveCreateCtrl');

    $scope.id = user_id;
  	if (!$rootScope.paging) {
  		$rootScope.paging = APP.DEFAULT_PAGING;
  	}
  		$rootScope.criteria = {};

  	$scope.lov_code = "ACTJ";
  	$http.get('API/lov/getActiveJob.php?lov_code='+$scope.lov_code).success(function (data){
  		$scope.getActiveJobList = data;
  	});
  	$http.get('API/user/getUserById.php?user_id='+$scope.id).success(function(data){
  		$scope.getUserById = data;
  		console.log($scope.getUserById);
  		$rootScope.criteria.fullName = $scope.getUserById.Pre_name+$scope.getUserById.Mem_name+"  "+$scope.getUserById.Mem_lastname;
  		$rootScope.criteria.costName = $scope.getUserById.Cost_name;
  		$rootScope.criteria.dep_f = $scope.getUserById.Cost_SKTHM;
  		//call department List


  		if(user_status == 'admin'||user_status == 'head_admin'){
  			$scope.depList($rootScope.criteria.dep_f);
  			$http.get('API/lov/getDepartment.php').success(function (data){
  				$scope.getDepartmentList = data;
  				$scope.adminSelectDepartment = function (id){
  					$scope.depList(id);
            console.log(id);

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

  	$scope.descAllDurable = function (id){
  		$http.get('API/fix/getDurableDetailById.php?dur_id='+id).success(function (data){
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
            angular.forEach($scope.wasteOfDepartList, function (item){
  						if(item.dur_status == 1){
  							item.dis = true;
  						}else{
  							item.dis = false;
  						}
  					});

  		});
  	}
  	$scope.descDurable = function(id){
  		$http.get('API/fix/getDurableDetailById.php?dur_id='+id).success(function (data){
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
  		$location.path('/durable-move');
  	}
  	$scope.save = function (){
      console.log($rootScope.criteria.durable_id)
      $scope.error = {}
      if($rootScope.criteria.durable_id == undefined ){

        $scope.error.durErr = true
        $scope.app.addAlert('gritter-error', 'กรุณาเลือก', 4000);
      }else if ($rootScope.criteria.dep_t == undefined){

        $scope.error.depErr = true
        $scope.app.addAlert('gritter-error', 'กรุณาเลือกหน่วยงานที่ย้ายไป', 4000);
      }else {
        myFunction.confirmReplaceBox().result.then(function(ok) {
          if (ok) {
            $http.get('API/durable/saveDurableMoved.php?dur_id='+$rootScope.criteria.durable_id+
            '&dep_f='+$rootScope.criteria.dep_f+
            '&dep_t='+$rootScope.criteria.dep_t+
            '&user_id='+$scope.id+
            '&remark='+$rootScope.criteria.remark).success(function (response){
              $scope.saveDurable = response;
              if($scope.saveDurable == 1){
                $scope.app.addAlert('gritter-success', 'การย้ายเสร็จสมบูรณ์', 4000);
                $http.get('API/durable/updateDurable.php?dm_dur_id='+$rootScope.criteria.durable_id+
              '&dep_t='+$rootScope.criteria.dep_t).success(function (data){
                  $scope.updateDurable = data;
                  console.log("update status=",$scope.updateDurable);
                  if($scope.updateDurable == 1){
                    $location.path('/durable-move')
                  }else{
                    $scope.app.addAlert('gritter-error', 'เกิดข้อผิดพลาด', 4000);
                  }
                })
              }else {
                $scope.app.addAlert('gritter-error', 'เกิดข้อผิดพลาด', 4000);

              }
            })
          }
      });
      }
  	}
}



function DurableMoveEditCtrl($rootScope, $scope, $http, $compile, $timeout, $filter, $location, $log, $route, $routeParams, $translate,$modal,myFunction) {
    $log.info('Enter DurableMoveEditCtrl');

    $scope.id = user_id;
    $scope.dm_id = $routeParams.dm_id;
  	if (!$rootScope.paging) {
  		$rootScope.paging = APP.DEFAULT_PAGING;
  	}
  		$rootScope.criteria = {};

  	$scope.lov_code = "ACTJ";
  	$http.get('API/lov/getActiveJob.php?lov_code='+$scope.lov_code).success(function (data){
  		$scope.getActiveJobList = data;
  	});
    $scope.depList = function (cost_id){
      console.log(cost_id);
      $http.get('API/lov/durableOfDepart.php?dep='+cost_id).success(function (data){
            $scope.wasteOfDepartList = data;
            console.log($scope.wasteOfDepartList);
            // angular.forEach($scope.wasteOfDepartList, function (item){
            // 	if(item.dur_status == 1){
            // 		item.dis = true;
            // 	}else{
            // 		item.dis = false;
            // 	}
            // });
      });
    }
  		$scope.getUserById = $scope.userData;
  		$rootScope.criteria.fullName = $scope.getUserById.Pre_name+$scope.getUserById.Mem_name+"  "+$scope.getUserById.Mem_lastname;
  		$rootScope.criteria.costName = $scope.getUserById.Cost_name;

  		// $rootScope.criteria.dep_f = $scope.getUserById.Cost_SKTHM;
  		//call department List


  		if(user_status == 'admin'||user_status == 'head_admin'){
  			$http.get('API/lov/getDepartment.php').success(function (data){
  				$scope.getDepartmentList = data;

  			})
  		}else{
        console.log($rootScope.criteria.cost_id);

  		}


    $http.get('API/durable/getDurableMovedById.php?dm_id='+$scope.dm_id).success(function (data){
      $scope.dmList = data;
      $rootScope.criteria.dep_f = $scope.dmList.dm_dep_st;
      $rootScope.criteria.dep_t = $scope.dmList.dm_dep_nd;
      $rootScope.criteria.durable_id = $scope.dmList.dm_dur_id;
      $scope.descDurable($scope.dmList.dm_dur_id)
      $rootScope.criteria.remark = $scope.dmList.dm_remark;
      $scope.depList($scope.dmList.dm_dep_nd);
    })

  	$scope.descAllDurable = function (id){
  		$http.get('API/fix/getDurableDetailById.php?dur_id='+id).success(function (data){
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

  	$scope.descDurable = function(id){
  		$http.get('API/fix/getDurableDetailById.php?dur_id='+id).success(function (data){
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
  		$location.path('/durable-move');
  	}
  	$scope.save = function (){
      console.log($rootScope.criteria.durable_id)
      $scope.error = {}
      if($rootScope.criteria.durable_id == undefined ){

        $scope.error.durErr = true
        $scope.app.addAlert('gritter-error', 'กรุณาเลือก', 4000);
      }else if ($rootScope.criteria.dep_t == undefined){

        $scope.error.depErr = true
        $scope.app.addAlert('gritter-error', 'กรุณาเลือกหน่วยงานที่ย้ายไป', 4000);
      }else {
        myFunction.confirmReplaceBox().result.then(function(ok) {
          if (ok) {
            $http.get('API/durable/updateDurableMoved.php?dm_id='+$scope.dm_id+
            '&dur_id='+$rootScope.criteria.durable_id+
            '&dep_f='+$rootScope.criteria.dep_f+
            '&dep_t='+$rootScope.criteria.dep_t+
            '&user_id='+$scope.id+
            '&remark='+$rootScope.criteria.remark).success(function (response){
              $scope.saveDurable = response;
              console.log($scope.saveDurable);
              if($scope.saveDurable == 1){
                $scope.app.addAlert('gritter-success', 'การย้ายเสร็จสมบูรณ์', 4000);
                $rootScope.criteria = {};
                $location.path('/durable-move')
              }else {
                $scope.app.addAlert('gritter-error', 'เกิดข้อผิดพลาด', 4000);

              }
            })
          }
      });
      }

  	}



}


function DurableMoveFinishCtrl($rootScope, $scope, $http, $compile, $timeout, $filter, $location, $log, $route, $routeParams, $translate,$modal,myFunction) {
    $log.info('Enter DurableMoveFinishCtrl');

    $scope.id = user_id;
  	if (!$rootScope.paging) {
  		$rootScope.paging = APP.DEFAULT_PAGING;
  	}
  		$rootScope.criteria = {};
    $http.get('API/lov/getDurableById.php?dur_id='+$routeParams.dur_id).success(function (data){
      $scope.durableObj = data;
      console.log($scope.durableObj);
      $rootScope.criteria.remark = "แทน "+$scope.durableObj.dur_numoe
    })
    console.log("job_id=",$routeParams.job_id);

  	$scope.lov_code = "ACTJ";
  	$http.get('API/lov/getActiveJob.php?lov_code='+$scope.lov_code).success(function (data){
  		$scope.getActiveJobList = data;
  	});
  	$http.get('API/user/getUserById.php?user_id='+$scope.id).success(function(data){
  		$scope.getUserById = data;
  		console.log($scope.getUserById);
  		$rootScope.criteria.fullName = $scope.getUserById.Pre_name+$scope.getUserById.Mem_name+"  "+$scope.getUserById.Mem_lastname;
  		$rootScope.criteria.costName = $scope.getUserById.Cost_name;
  		$rootScope.criteria.dep_f = $scope.getUserById.Cost_SKTHM;
  		//call department List


  		if(user_status == 'admin'||user_status == 'head_admin'){
  			$scope.depList($rootScope.criteria.dep_f);
  			$http.get('API/lov/getDepartment.php').success(function (data){
  				$scope.getDepartmentList = data;
  				$scope.adminSelectDepartment = function (id){
  					$scope.depList(id);
            console.log(id);

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

  	$scope.descAllDurable = function (id){
  		$http.get('API/fix/getDurableDetailById.php?dur_id='+id).success(function (data){
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
            angular.forEach($scope.wasteOfDepartList, function (item){
  						if(item.dur_status == 1){
  							item.dis = true;
  						}else{
  							item.dis = false;
  						}
  					});

  		});
  	}
  	$scope.descDurable = function(id){
  		$http.get('API/fix/getDurableDetailById.php?dur_id='+id).success(function (data){
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
  		$location.path('/durable-move');
  	}
  	$scope.save = function (){
      console.log($rootScope.criteria.durable_id)
      $scope.error = {}
      if($rootScope.criteria.durable_id == undefined ){

        $scope.error.durErr = true
        $scope.app.addAlert('gritter-error', 'กรุณาเลือก', 4000);
      }else if ($rootScope.criteria.dep_t == undefined){

        $scope.error.depErr = true
        $scope.app.addAlert('gritter-error', 'กรุณาเลือกหน่วยงานที่ย้ายไป', 4000);
      }else {
        myFunction.confirmReplaceBox().result.then(function(ok) {
          if (ok) {
            $http.get('API/durable/saveDurableMoved.php?dur_id='+$rootScope.criteria.durable_id+
            '&dep_f='+$rootScope.criteria.dep_f+
            '&dep_t='+$rootScope.criteria.dep_t+
            '&user_id='+$scope.id+
            '&remark='+$rootScope.criteria.remark).success(function (response){
              $scope.saveDurable = response;
              if($scope.saveDurable == 1){
                $scope.app.addAlert('gritter-success', 'การย้ายเสร็จสมบูรณ์', 4000);
                $http.get('API/durable/updateDurable.php?dm_dur_id='+$rootScope.criteria.durable_id+
              '&dep_t='+$rootScope.criteria.dep_t).success(function (data){
                  $scope.updateDurable = data;
                  console.log("update status=",$scope.updateDurable);
                  if($scope.updateDurable == 1){
                    $http.get('API/lov/updateJobStatus.php?job_id='+$routeParams.job_id+'&job_status='+99+'&job_last_status='+50+'&officer_id='+$scope.user_id).success(function (data){
                      $scope.updateJobStatus = data;
                    })
                    $location.path('/durable-move')
                  }else{
                    $scope.app.addAlert('gritter-error', 'เกิดข้อผิดพลาด', 4000);
                  }
                })
              }else {
                $scope.app.addAlert('gritter-error', 'เกิดข้อผิดพลาด', 4000);

              }
            })
          }
      });
      }
  	}
}
