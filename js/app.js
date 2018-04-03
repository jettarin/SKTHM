"use strict";
angular.module("myApp", [
    'ngRoute',
    'ngAnimate',
    'myApp.filters',
    'myApp.directives',
    'pascalprecht.translate',
    'security',
    'services.httpRequestTracker',
    /*'ui.utils',*/
    'ui.select2',
    'ui.bootstrap.modal',
    'ui.bootstrap.tooltip',
    'ui.bootstrap.pagination',
    'ui.bootstrap.progressbar',
    'services.myFunction',
    'ui.bootstrap.dialog',

])
    .config(["$routeProvider", function ($routeProvider) {
    }])
    .value('uiSelect2Config', {
        allowClear: true,
        placeholder: '-- Please Select --',
        formatNoMatches: function () {
            return "No matches found";
        }
    })
    .value('ui.config', {
        date: {
            format: 'dd/mm/yyyy',
            autoclose: true,
            forceParse: false
        }
    })






function AppCtrl($rootScope, $scope, $http, $compile, $timeout, $filter, $location, $route, httpRequestTracker, authorization ,$dialog) {

    //######################################## [START] INITIAL APPLICATION ########################################
    $rootScope.criteria = {};
    $rootScope.list = {};
    $rootScope.app = {};
    $rootScope.isBackProfile = true;
    $rootScope.document = document;
    $scope.httpRequestTracker = httpRequestTracker;
    $scope.authorization = authorization;
    $scope.user_extra = user_extra;

    if(user_status == 'admin'){
        $scope.user_status = 'admin';
        $scope.url = '#/';
    }else if(user_status == 'head_admin'){
      $scope.user_status = 'head_admin';
      $scope.url = '#/';
    }else if(user_status == 'user'){
      if(cost_id == "17"){
        $scope.user_status = "p_user";
    }else{
        $scope.user_status = 'user';
        $scope.url = '#/user';
    }

        // $location.path('/user');
    }


    $scope.$u_id = user_id;

    $http.get('API/user/getUserById.php?user_id='+$scope.$u_id).success(function (data){
      $scope.userData = data;
    });

    // show new job Menu
    $http({
      url:'API/admin/getJobReplaceTotal.php',
      method:'POST'
    }).success(function (data){
      $scope.jobReplaceTotal = data;
      $scope.hMenuReplace = $scope.jobReplaceTotal.job_replace;
    });
    $http({
      url:'API/admin/getJobOrderTotal.php',
      method:'POST'
    }).success(function (data){
      $scope.jobOrderTotal = data;
      $scope.hMenuOrder = $scope.jobOrderTotal.job_order;
    });
    $http({
      url:'API/admin/getJobRepairTotal.php',
      method:'POST'
    }).success(function (data){
      $scope.jobRepairTotal = data;
      $scope.hMenuRepair = $scope.jobRepairTotal.job_repair;
    });
    $http({
      url:'API/admin/getJobClaimTotal.php',
      method:'POST'
    }).success(function (data){
      $scope.jobClaimTotal = data;
      $scope.hMenuClaim = $scope.jobClaimTotal.job_claim;
    });

 $scope.gotoMoreDetail = function (id){
			$location.path('/remain-list/more-detail/'+id);
		}
    $scope.seeAll = function (){
      $location.path('/remain-list');
    }
    // $routeChangeSuccess event handler
    $rootScope.$on("$routeChangeSuccess", function () {
        // clear search criteria when click menu
        if ($scope.isMenuClick || $scope.isMenuClick == "undefined") {
            $rootScope.criteria = {};
            $scope.isMenuClick = false;
        }
        // trigger jquery-lang
        $timeout(function () {
            $rootScope.app.lang.runContent();
        }, 0);
    });

    $scope.setMenuClick = function () {
        $scope.isMenuClick = true;
    };



    //######################################## [ END ] INITIAL APPLICATION ########################################

    //######################################## [START] SWITCH LANGUAGE ########################################
    $rootScope.app.lang = new jquery_lang_js();
    $rootScope.app.lang.run();

    $rootScope.app.switchLang = function (changeLang) {
        $rootScope.app.lang.change(changeLang);
        var url = $location.url();
        if (url.indexOf("?") > -1) {
            url = url + "&lang=" + $rootScope.app.lang.currentLang;
        } else {
            url = url + "?lang=" + $rootScope.app.lang.currentLang;
        }
        $location.url(url);
    };
    //######################################## [ END ] SWITCH LANGUAGE ########################################

    //######################################## [ START ] CHANGE PASSWORD ######################################
    $scope.app.openChangePasswordModal = function (p) {
        $scope.isSubmit = false;
        $('#changePass').modal({
            backdrop: 'static',
            keyboard: false,
            show: true
        });

        $scope.changePass = {};
        $scope.confirm = {};

        if (p == 'C')
            $scope.closeBtn = 'Y';
        else
            $scope.closeBtn = 'N';
    };
    //######################################## [ END ] CHANGE PASSWORD ########################################

    //######################################## [START] DATATABLES ########################################
    /*$.extend( true,$.fn.dataTable.defaults, {
     "iDisplayLength": 10,
     "aaSorting": [],
     "sDom": "<'row-fluid'<'span7'<'dt_actions'>><'span5'<'dt_actions_right'>>r>t<'row-fluid'<'span4'lf><'span4'i><'span4'p>>",
     "sPaginationType": "bootstrap_alt",
     "bProcessing": false,
     "bFilter": false,
     "bPaginate": true
     } );*/

    $rootScope.app.oLanguage = function () {
        return {
            "sEmptyTable": $scope.app.lang.convert("No data available in table"),
            "sLengthMenu": $scope.app.lang.convert("Show _MENU_ records per page"),
            "sInfo": $scope.app.lang.convert("Showing _START_ to _END_ of _TOTAL_ entries"),
            "sInfoEmpty": $scope.app.lang.convert("Showing 0 to 0 of 0 entries")
        };
    };
    //######################################## [ END ] DATATABLES ########################################

    //######################################## [START] ALERT #############################################
    $rootScope.app.addAlert = function (type, msg, isCovertTxt) {
        var title = "";
        if (type == "gritter-info")
            title = "Information";
        else if (type == "gritter-success")
            title = "สำเร็จ";
        else if (type == "gritter-warning")
            title = "Warning!";
        else if (type == "gritter-error")
            title = "Error!";

        var message = '';
        if (angular.isString(msg)) {
            if (isCovertTxt) {
                message = $scope.app.lang.convert(msg);
                if (!message) {
                    message = msg;
                }
            } else {
                message = msg;
            }
        } else if (angular.isObject(msg)) {
            message = msg['errName' + $scope.app.lang.currentLang];
        }

        $.gritter.add({
            title: $scope.app.lang.convert(title),
            text: message,
            class_name: type
        });
        return false;
    };
    //######################################## [ END ] ALERT #############################################

    //######################################## [START] DIALOG ########################################
    $scope.app.confirmBox = function (msg, negativeBtn, positiveBtn) {
        msg = $rootScope.app.lang.convert(msg);
        negativeBtn = $rootScope.app.lang.convert(negativeBtn);
        positiveBtn = $rootScope.app.lang.convert(positiveBtn);
        return $dialog.dialog({
            templateUrl: "template/modal/confirm.html"
            , dialogFade: true
            , backdropClick: false
            , keyboard: false
            , controller: "MessageBoxController"
            , resolve: {
                model: function () {
                    return {
                        title: null,
                        message: msg,
                        buttons: [{result: false, label: negativeBtn, cssClass: "btn-grey"}, {
                            result: true,
                            label: positiveBtn,
                            cssClass: "btn-primary"
                        }]
                    };
                }
            }
        });
    };

    $scope.app.confirmDeleteBox = function () {
        return $rootScope.app.confirmBox("Are you sure you want to delete?", "Cancel", "Delete");
    };
    $scope.app.confirmActionBox = function () {
        return $rootScope.app.confirmBox("Are you sure you want to Submit?", "Cancel", "Yes");
    };
    //######################################## [ END ] DIALOG ########################################

    //######################################## [ END ] GLOBAL SERVICES ########################################

    $scope.app.lovActiveStatus = [{
        "groupName": "ACTIVE_STATUS",
        "seqNo": 1,
        "listOfValueNameLc": "Active",
        "listOfValueNameEn": "Active",
        "value1": "A",
        "value2": null,
        "description": "Active",
        "status": null,
        "createdBy": null,
        "createdDate": null,
        "modifiedBy": null,
        "modifiedDate": null,
        "statusNameLc": null,
        "statusNameEn": null,
        "createdByNameLc": null,
        "createdByNameEn": null,
        "modifiedByNameLc": null,
        "modifiedByNameEn": null
    }, {
        "groupName": "ACTIVE_STATUS",
        "seqNo": 2,
        "listOfValueNameLc": "Inactive",
        "listOfValueNameEn": "Inactive",
        "value1": "I",
        "value2": null,
        "description": "Inactive",
        "status": null,
        "createdBy": null,
        "createdDate": null,
        "modifiedBy": null,
        "modifiedDate": null,
        "statusNameLc": null,
        "statusNameEn": null,
        "createdByNameLc": null,
        "createdByNameEn": null,
        "modifiedByNameLc": null,
        "modifiedByNameEn": null
    }];

    $rootScope.app.reload = function () {
        $route.reload();
    };

}
