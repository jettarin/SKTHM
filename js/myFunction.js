angular.module('services.myFunction', [])

    .service('myFunction', ['$rootScope', '$route', '$translate', '$modal', '$http', function ($rootScope, $route, $translate, $modal, $http) {

        //######################################## [START] SWITCH LANGUAGE ########################################
        this.initLang = function () {
//		$rootScope.app.currentLang = $translate.use();
        };

        this.switchLang = function (langKey) {
//		if (langKey != $translate.use()) {
//			$rootScope.app.currentLang = langKey;
//			$translate.use(langKey);
//			$route.reload();
//		}
            // $http.get(_.toHttpGetUrl(APP.CONTEXT_PATH + '/api/user/switchLang/' + langKey)).success(function (resp) {
            //     location.reload();
            // });
        };


        this.serviceDate = function (v){
          var nd = new Date(v);
          var gd = ("0"+nd.getDate()).slice(-2);
          var gm = ("0" + (nd.getMonth() + 1)).slice(-2)
          var gy = nd.getFullYear();
          var cy = gy+543;

          return gd+"/"+gm+"/"+cy;
        }
        //######################################## [ END ] SWITCH LANGUAGE ########################################

        //######################################## [START] ALERT MESSAGE #############################################
        this.alert = function (type, msg, isCovertTxt) {
            var title = "";
            if (type == "gritter-info")
                title = "Information";
            else if (type == "gritter-success")
                title = "Success";
            else if (type == "gritter-warning")
                title = "Warning!";
            else if (type == "gritter-error")
                title = "Error!";

            var message = '';
            if (angular.isString(msg)) {
                if (isCovertTxt) {
                    message = $translate.instant(msg);
                    if (!message) {
                        message = msg;
                    }
                } else {
                    message = msg;
                }
            } else if (angular.isObject(msg)) {
//			message = msg.errCode + " : " + msg['message'+$translate.use()];
                message = msg.errCode + " : " + msg.message;
            }

            // $.gritter.add({
            //     title: $translate.instant(title),
            //     text: message,
            //     class_name: type
            // });
            return false;
        };

        this.alertRequiredFields = function () {
            this.alert('gritter-error', 'Please fill in all required fields!', true);
        };



        this.alertRequiredSelectOneItem = function () {
            this.alert('gritter-error', 'You should select at least one item before selecting!', true);
        };

        this.alertCreateSuccess = function () {
            this.alert('gritter-success', 'Create data successful.', true);
        };

        this.alertUpdateSuccess = function () {
            this.alert('gritter-success', 'Update data successful.', true);
        };

        this.alertDeleteSuccess = function () {
            this.alert('gritter-success', 'Delete data successful.', true);
        };
        this.alertRejectSuccess = function () {
            this.alert('gritter-success', 'Reject data successful.', true);
        };

        //######################################## [ END ] ALERT MESSAGE #############################################

        //######################################## [START] CONFIRM DIALOG BOX ########################################
        var ModalInstanceCtrl = function ($scope, $modalInstance, model) {
            $scope.title = model.title;
            $scope.message = model.message;
            $scope.buttons = model.buttons;
            $scope.close = function (res) {
                $modalInstance.close(res);
            };
        };

        this.confirmBox = function (msg, negativeBtn, positiveBtn) {
            msg = $translate.instant(msg);
            negativeBtn = $translate.instant(negativeBtn);
            positiveBtn = $translate.instant(positiveBtn);
            return $modal.open({
                templateUrl: APP.CONTEXT_PATH + '/template/modal/confirm.html?v=' + APP.VERSION
                , backdrop: 'static'
                , keyboard: false
                , controller: ModalInstanceCtrl
                , resolve: {
                    model: function () {
                        return {
                            title: null,
                            message: msg,
                            buttons: [{result: true, label: positiveBtn, cssClass: "btn-primary"}
                                , {result: false, label: negativeBtn, cssClass: "btn-warning"}]
                        };
                    }
                }
            });
        };

        this.confirmSaveBox = function () {
            return this.confirmBox("ต้องการบันทึกหรือไม่?", "ยกเลิก", "ตกลง");
        };

        this.confirmToRepeat = function (){
          return this.confirmBox("ผู้บริหารอนุมัติให้ซื้อทดแทน ?", "ไม่อนุมัติ", "อนุมัติ");
        }
        this.confirmSendToFix = function () {
            return this.confirmBox("ต้องการส่งซ่อมนอกหรือไม่ ?", "ยกเลิก", "ตกลง");
        };
        this.confirmReplacement = function () {
            return this.confirmBox("ต้องการจำหน่ายครุภัณฑ์นี้หรือไม่ ?", "ยกเลิก", "ตกลง");
        };
        this.confirmOrder = function () {
            return this.confirmBox("ต้องการสั่งซื้ออุปกรณ์หรือไม่ ?", "ยกเลิก", "ตกลง");
        };
        this.confirmDeliver = function () {
            return this.confirmBox("ต้องการบันทึกหรือไม่ ?", "ยกเลิก", "ตกลง");
        };
        this.confirmBoxreplaceDurable = function (){
            return this.confirmBox("ต้องบันทึกการสั่งซื้อทดแทนหรือไม่ ?", "ยกเลิก", "ตกลง");
        }
        this.confirmSaveDraftBox = function () {
            return this.confirmBox("Are you sure you want to save draft?", "Cancel", "Yes");
        };
        this.confirmReplaceBox = function () {
            return this.confirmBox("ต้องการบันทึกหรือไม่ ?", "ยกเลิก", "ตกลง");
        };
        this.confirmForwardBox = function () {
            return this.confirmBox("ต้องการย้ายกลับหรือไม่ ?", "ยกเลิก", "ตกลง");
        };

        this.confirmDeleteBox = function () {
            return this.confirmBox("ต้องการลบหรือไม่ ?", "ยกเลิก", "ลบ");
        };
        this.confirmRejectBox = function () {
            return this.confirmBox("Are you sure you want to reject?", "Cancel", "Reject");
        };
        this.confirmAcceptJobBox = function () {
            return this.confirmBox("ต้องการเปลี่ยนสถานะเป็นรับงาน หรือไใม่ ?", "ยกเลิก", "ตกลง");
        };

        this.onBehalfOfBox = function (msg, negativeBtn, positiveBtn) {
            return $modal.open({
                templateUrl: APP.CONTEXT_PATH + '/module/common/popup-on-behalf-of.jsp?v=' + APP.VERSION,
                controller: PopupOnBehalfOfCtrl,
                windowClass: 'large',
                backdrop: 'static',
                keyboard: false
            });
        };
        //######################################## [ END ] CONFIRM DIALOG BOX ########################################

    }]);
