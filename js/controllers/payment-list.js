angular.module('myApp').config([ '$routeProvider', function($routeProvider) {
	$routeProvider.when("/payment-list", {templateUrl: _.toHttpGetUrl("content/payment/payment-list.html"), controller: PaymentListCtrl });
} ]);

function PaymentListCtrl($rootScope, $scope, $http, $compile, $filter, $timeout, $routeParams, $location, $log) {
	$log.info('Enter ApplicationListCtrl');
	
	$timeout(function() {
		
		$rootScope.criteria.dateFrom = _.toDateStr(moment()); //set default date form
		$rootScope.criteria.dateTo = _.toDateStr(moment()); //set default date to
		
		$scope.policyTypeList = [
      		 {"id":"1", "name":"พ.ร.บ."}
      		,{"id":"2", "name":"ประกันภัยชั้น 1"}
      		,{"id":"3", "name":"ประกันภัยชั้น 2"}
      	];
		
		$scope.renewTypeList = [
			  {"id":"1" , "name":"New"}
			, {"id":"2" , "name":"Renew"}
		];
		
		$scope.dataList = [
            {"id":"0001", "bu":"Hyper", "newStore":"11219:suphanburi", "dateForm":"01/01/2014", "dateTo":"05/01/2014", "storeModelList":[{"division":"Hard Line", "store":"11101:Ã Â¸ÂªÃ Â¸Â²Ã Â¸â€šÃ Â¸Â²Ã Â¸Â§Ã Â¸â€¡Ã Â¸Â¨Ã Â¹Å’Ã Â¸ÂªÃ Â¸Â§Ã Â¹Ë†Ã Â¸Â²Ã Â¸â€¡", "percent":"100.00"}, {"division":"Home Line", "store":"11101:Ã Â¸ÂªÃ Â¸Â²Ã Â¸â€šÃ Â¸Â²Ã Â¸Â§Ã Â¸â€¡Ã Â¸Â¨Ã Â¹Å’Ã Â¸ÂªÃ Â¸Â§Ã Â¹Ë†Ã Â¸Â²Ã Â¸â€¡", "percent":"100.00"}, {"division":"Dry Food", "store":"11101:Ã Â¸ÂªÃ Â¸Â²Ã Â¸â€šÃ Â¸Â²Ã Â¸Â§Ã Â¸â€¡Ã Â¸Â¨Ã Â¹Å’Ã Â¸ÂªÃ Â¸Â§Ã Â¹Ë†Ã Â¸Â²Ã Â¸â€¡", "percent":"100.00"}, {"division":"Soft Line", "store":"11101:Ã Â¸ÂªÃ Â¸Â²Ã Â¸â€šÃ Â¸Â²Ã Â¸Â§Ã Â¸â€¡Ã Â¸Â¨Ã Â¹Å’Ã Â¸ÂªÃ Â¸Â§Ã Â¹Ë†Ã Â¸Â²Ã Â¸â€¡", "percent":"100.00"}] }
           ,{"id":"0002", "bu":"Hyper", "newStore":"11027:kalasin", "dateForm":"01/01/2014", "dateTo":"05/01/2014", "storeModelList":[{"division":"Hard Line", "store":"11102:Ã Â¸ÂªÃ Â¸Â²Ã Â¸â€šÃ Â¸Â²Ã Â¹ï¿½Ã Â¸Ë†Ã Â¹â€°Ã Â¸â€¡Ã Â¸Â§Ã Â¸Â±Ã Â¸â€™Ã Â¸â„¢Ã Â¸Â°", "percent":"100.00"}, {"division":"Home Line", "store":"11103:Ã Â¸ÂªÃ Â¸Â²Ã Â¸â€šÃ Â¸Â²Ã Â¸Â£Ã Â¸Â²Ã Â¸Â©Ã Â¸ï¿½Ã Â¸Â£Ã Â¹Å’Ã Â¸Å¡Ã Â¸Â¹Ã Â¸Â£Ã Â¸â€œÃ Â¸Â°", "percent":"100.00"}, {"division":"Dry Food", "store":"11101:Ã Â¸ÂªÃ Â¸Â²Ã Â¸â€šÃ Â¸Â²Ã Â¸Â§Ã Â¸â€¡Ã Â¸Â¨Ã Â¹Å’Ã Â¸ÂªÃ Â¸Â§Ã Â¹Ë†Ã Â¸Â²Ã Â¸â€¡", "percent":"100.00"}, {"division":"Soft Line", "store":"11104:Ã Â¸ÂªÃ Â¸Â²Ã Â¸â€šÃ Â¸Â²Ã Â¸Å¾Ã Â¸Â±Ã Â¸â€”Ã Â¸Â¢Ã Â¸Â²", "percent":"100.00"}] }
        ];
		
		$scope.clear = function(){
			$rootScope.criteria = {};
		};
		
		$scope.searchPayment = function(){		
			//var url = _.toHttpGetUrl('api/user/findUser', $rootScope.criteria);
			//$http.get(url).success(function(data){
			var data = [{"no":"1","broker":"TISCO","policyType":"พ.ร.บ","appNo":"OTISCKPI002490001","policyNo":"","coverDate":"01/01/2557-01/01/2558","assured":"นายวิโรจน์ ชูวงศ์","counselor":"นายวิเชียร เลาหบุตร","premium":"1,074.28","polstatus":"Complete","paymentType":"Full","period":"1","paymentStatus":"success","remark":"","createDate":"01/01/2557 08:00:00"}
			,{"no":"2","broker":"TISCO","policyType":"พ.ร.บ","appNo":"OTISCKPI002490002","policyNo":"","coverDate":"01/01/2557-01/01/2558","assured":"นายพงษ์เทพ ธรรมโสพน","counselor":"นายวิเชียร เลาหบุตร","premium":"757.21","polstatus":"Complete","paymentType":"Flexi(6 งวด)","period":"2","paymentStatus":"success","remark":"","createDate":"01/01/2557 08:00:00"}
			,{"no":"3","broker":"ASN","policyType":"พ.ร.บ","appNo":"OBASNKPI002490001","policyNo":"","coverDate":"01/01/2557-01/01/2558","assured":"นายวรวัฒน์ สอนจันทร์","counselor":"นายวิเชียร เลาหบุตร","premium":"757.21","polstatus":"Complete","paymentType":"Flexi(6 งวด)","period":"3","paymentStatus":"success","remark":"","createDate":"01/01/2557 08:00:00"}
			,{"no":"4","broker":"ASN","policyType":"พ.ร.บ","appNo":"OBASNKPI002490002","policyNo":"","coverDate":"01/01/2557-01/01/2558","assured":"นายวิชัย ศรีบุรินทร์","counselor":"นายวิเชียร เลาหบุตร","premium":"757.21","polstatus":"Complete","paymentType":"Flexi(3 งวด)","period":"2","paymentStatus":"success","remark":"","createDate":"01/01/2557 08:00:00"}
			,{"no":"5","broker":"ASN","policyType":"พ.ร.บ","appNo":"OBASNKPI002490003","policyNo":"","coverDate":"01/01/2557-01/01/2558","assured":"นายสงคราม อาจสมบาล","counselor":"นายวิเชียร เลาหบุตร","premium":"757.21","polstatus":"Re-Payment Awaiting","paymentType":"Full","period":"1","paymentStatus":"unsuccess","remark":"เลขที่บัตรเครดิตไม่ถูกต้อง","createDate":"01/01/2557 08:00:00"}
			,{"no":"6","broker":"ASNKTC","policyType":"ประกันภัยชั้น 1","appNo":"OAKTCKPI002490001","policyNo":"","coverDate":"01/01/2557-01/01/2558","assured":"นางจุรีรัตน์ ศรีจันทร์","counselor":"นายวิเชียร เลาหบุตร","premium":"18,900.00","polstatus":"Payment Awaiting","paymentType":"Full","period":"1","paymentStatus":"-","remark":"","createDate":"01/01/2557 08:00:00"}
			,{"no":"7","broker":"ASNKTC","policyType":"ประกันภัยชั้น 2+","appNo":"OAKTCKPI002490003","policyNo":"","coverDate":"01/01/2557-01/01/2558","assured":"น.ส.อรุณรัตน์ ปวรรัตน์","counselor":"นายวิเชียร เลาหบุตร","premium":"8,080.00","polstatus":"Payment Awaiting","paymentType":"Full","period":"1","paymentStatus":"-","remark":"","createDate":"01/01/2557 08:00:00"}
			,{"no":"8","broker":"ASNKTC","policyType":"ประกันภัยชั้น 3","appNo":"OAKTCKPI002490004","policyNo":"","coverDate":"01/01/2557-01/01/2558","assured":"นายพงศกร แก้วเก้า","counselor":"นายวิเชียร เลาหบุตร","premium":"3,000.00","polstatus":"Payment Awaiting","paymentType":"Full","period":"1","paymentStatus":"-","remark":"","createDate":"01/01/2557 08:00:00"}
			,{"no":"9","broker":"ASNKTC","policyType":"อุ่นใจ1","appNo":"OAKTCKPI002490005","policyNo":"","coverDate":"01/01/2557-01/01/2558","assured":"นายศักดิ์ชัย อำนายศิลป์","counselor":"นายวิเชียร เลาหบุตร","premium":"12,000.00","polstatus":"Payment Awaiting","paymentType":"Full","period":"1","paymentStatus":"-","remark":"","createDate":"01/01/2557 08:00:00"}
			,{"no":"10","broker":"ASNKTC","policyType":"อุ่้นใจ2","appNo":"OAKTCKPI002490006","policyNo":"","coverDate":"01/01/2557-01/01/2558","assured":"นายกวี อำนวยศิลป์","counselor":"นายวิเชียร เลาหบุตร","premium":"12,000.00","polstatus":"Re-Payment Awaiting","paymentType":"Full","period":"1","paymentStatus":"unsuccess","remark":"วงเงินบัตรเครดิตไม่เพียงพอ","createDate":"01/01/2557 08:00:00"}];
			
				var tbody = "";
				_.each(data, function(payList, index){
					
					tbody += '<tr>';
					if(payList.paymentStatus != "success"){
						tbody += '<td><input type="checkbox" ng-checked="chk" value="'+payList.appNo+'"><span class="lbl"></span></td>';
					}else{
						tbody += '<td></td>';
					}
					tbody += '<td>'+payList.broker+'</td>';
					tbody += '<td>'+payList.policyType+'</td>';
					tbody += '<td>'+payList.appNo+'</td>';
					tbody += '<td>'+payList.assured+'</td>';
					tbody += '<td>'+payList.coverDate+'</td>';
					tbody += '<td>'+payList.premium+'</td>';
					tbody += '<td>'+payList.paymentType+'</td>';
					tbody += '<td>'+payList.period+'</td>';
					tbody += '<td>'+payList.paymentStatus+'</td>';
					tbody += '<td>'+payList.remark+'</td>';
					tbody += '</tr>';
				});
			
				$("#payment_table").dataTable().fnClearTable();
				$('#payment_table_tbody').append($compile(tbody)($scope));
				$("#payment_table").dataTable({
					"bDestroy": true,
			        "oLanguage": $rootScope.app.oLanguage(),
					"sDom": "t<'row-fluid'<'span4'lf><'span4'i><'span4'p>>",
					"aoColumns": [
					    { "sWidth": "5px", "sClass": "text-center" , "bSortable": false },
					    { "sWidth": "45px", "sClass": "text-left"},
					    { "sWidth": "55px", "sClass": "text-left"},
						{ "sWidth": "50px", "sClass": "text-left" },
						{ "sWidth": "90px", "sClass": "text-left" },
						{ "sWidth": "90px", "sClass": "text-center" },
						{ "sWidth": "70px", "sClass": "text-right" },
						{ "sWidth": "70px", "sClass": "text-left" },
						{ "sWidth": "40px", "sClass": "text-right" },
						{ "sWidth": "80px", "sClass": "text-left" },
						{ "sWidth": "105px", "sClass": "text-center" , "bSortable": false}
			        ]
				});
				$('.dt_actions').html($compile($('.dt_app_actions').html())($scope));
			//});
		};		
		$scope.searchPayment();
		
	}, 0);
};
