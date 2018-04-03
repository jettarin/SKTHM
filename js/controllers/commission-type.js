angular.module('myApp').config([ '$routeProvider', function($routeProvider) {
	$routeProvider.when("/commission-type", {templateUrl: _.toHttpGetUrl("content/commission/commission-type-list.html"), controller: CommTypeListCtrl });
	$routeProvider.when("/commission-type-detail", {templateUrl: _.toHttpGetUrl("content/commission/commission-type-detail.html"), controller: CommTypeDetailCtrl });
	$routeProvider.when("/commission-type-detail/:id", {templateUrl: _.toHttpGetUrl("content/commission/commission-type-detail.html"), controller: CommTypeDetailCtrl });
} ]);

function CommTypeListCtrl($rootScope, $scope, $http, $compile, $filter, $timeout, $routeParams, $location, $log) {
	$log.info('Enter CommTypeListCtrl');
	
	$timeout(function() {
		
		$rootScope.criteria.dateFrom = _.toDateStr(moment()); //set default date form
		$rootScope.criteria.dateTo = _.toDateStr(moment()); //set default date to
		
		$scope.statusList = [
              {"id":"1" , "name":"Active"}
			, {"id":"2" , "name":"Inactive"}
		];
		
		$scope.polGroupList = [
              {"id":"1" , "name":"Motor"}
   			, {"id":"2" , "name":"Non-Motor"}
   		];
		
		$scope.clear = function(){
			$rootScope.criteria = {};
		};
		
		$scope.data = [{"code":"001","policyGroupCode":"1","policyGroupName":"Motor","name":"Legal Commission","description":"","status":"Active"}
		,{"code":"002","policyGroupCode":"1","policyGroupName":"Motor","name":"Over Commission","description":"","status":"Active"}
		,{"code":"003","policyGroupCode":"1","policyGroupName":"Motor","name":"Incentive","description":"","status":"Active"}
		,{"code":"004","policyGroupCode":"2","policyGroupName":"Non-Motor","name":"Legal Commission","description":"","status":"Active"}
		,{"code":"005","policyGroupCode":"2","policyGroupName":"Non-Motor","name":"Over Commission","description":"","status":"Active"}
		,{"code":"006","policyGroupCode":"2","policyGroupName":"Non-Motor","name":"Incentive","description":"","status":"Active"}];
		
		$scope.searchCommissionType = function(){	
			var data = $scope.data;
			if($scope.criteria.policyGroup != null && $scope.criteria.policyGroup != ""){
				var filtered  = $scope.data.filter(function(element, index, array){return (element.policyGroupCode == $scope.criteria.policyGroup);});
				data = filtered;
			}
			//var url = _.toHttpGetUrl('api/user/findUser', $rootScope.criteria);
			//$http.get(url).success(function(data){
			
				var tbody = "";
				_.each(data, function(commission, index){
					
					tbody += '<tr>';
					tbody += '<td>'+(index+1)+'</td>';
					tbody += '<td>'+commission.policyGroupName+'</td>';
					tbody += '<td>'+commission.code+'</td>';
					tbody += '<td>'+commission.name+'</td>';
					tbody += '<td>'+commission.description+'</td>';
					tbody += '<td>'+commission.status+'</td>';
					tbody += '<td class="action">';
					tbody += '	<a title="'+$scope.app.lang.convert("Edit")+'" href="#/commission-type-detail/'+commission.commNo+'"><i class="icon-edit"></i></a>';
					tbody += '</td>';
					tbody += '</tr>';
				});
			
				$("#commission_table").dataTable().fnClearTable();
				$('#commission_table_tbody').append($compile(tbody)($scope));
				$("#commission_table").dataTable({
					"bDestroy": true,
			        "oLanguage": $rootScope.app.oLanguage(),
					"sDom": "t<'row-fluid'<'span4'lf><'span4'i><'span4'p>>",
					"aoColumns": [
					    { "sWidth": "5px", "sClass": "text-center" , "bSortable": false },
					    { "sWidth": "100px", "sClass": "text-left"},
					    { "sWidth": "100px", "sClass": "text-left"},
					    { "sWidth": "100px", "sClass": "text-left"},
						{ "sWidth": "100px", "sClass": "text-left" },
						{ "sWidth": "100px", "sClass": "text-center" },
						{ "sWidth": "30px", "sClass": "text-center" , "bSortable": false}
			        ]
				});
				$('.dt_actions').html($compile($('.dt_app_actions').html())($scope));
			//});
		};		
		$scope.searchCommissionType();
		
	}, 0);
};

function CommTypeDetailCtrl($rootScope, $scope, $http, $compile, $timeout, $filter, $location,$routeParams) {
	
	$timeout(function() {
		
	/*	$scope.canList = $scope.app.user.userFunction.indexOf('$errormessage.list') > -1;
		$scope.canEdit = $scope.app.user.userFunction.indexOf('$errormessage.edit') > -1;*/
		$scope.isSubmit = false;//Submit flag
		
		//Call back-end by storeId
		//$http.get(_.toHttpGetUrl('rest/errormsg/getErrorMessage/'+$routeParams.id)).success(function(data) {
			$scope.application = {"no":"2","broker":"TISCO","policyType":"พ.ร.บ","appNo":"OTISCKPI002490002","policyNo":"001-57-00000100","coverDateF":"01/01/2557","coverDateT":"01/01/2558","assured":"นายพงษ์เทพ ธรรมโสพน","counselor":"นายวิเชียร เลาหบุตร","premium":"757.21","status":"Complete","createDate":"01/01/2557 08:00:00","carType":"รถยนต์นั่งโดยสารเกิน 7 คน","usageType":"ใช้ส่วนบุคคล ไม่ใช่รับจ้างหรือให้เช่า","capacity":"1600 CC","carNo":"1กว 9999","province":"กรุงเทพมหานคร","year":"2014","brand":"TOYOTA","model":"COROLLA","color":"ขาว","chassisNo":"JSDFJOI329DSFOFE","engineNo":"DFLKSJDFOSID39"}
			
			//});

		//Update ErrorMsg
		$scope.polGroupList = [{"id":"1" , "name":"Motor"}
		            		, {"id":"2" , "name":"Non-Motor"}];
		$scope.statusList = [{"id":"1" , "name":"Active"}
		       				, {"id":"2" , "name":"Inactive"}];
		$scope.maxstepList = [{"id":"1","name":"1"}
							 ,{"id":"2","name":"2"}
							 ,{"id":"3","name":"3"}
							 ,{"id":"4","name":"4"}
							 ,{"id":"5","name":"5"}];
		$scope.resultTypeList = [{"id":"1","name":"Money(Baht)"}
								,{"id":"2","name":"Point"}
								,{"id":"3","name":"Cash Card"}
								,{"id":"4","name":"Other"}];
		$scope.conditionList = [{"id":"1","name":"/ (n) of Net Premium"}
							   ,{"id":"2","name":"/ (n) of Total Premium"}
							   ,{"id":"3","name":"/ (n) of Policy"}];
		$scope.unitList = [{"id":"1","name":"Money(THB)"}
						  ,{"id":"2","name":"Percentage(%)"}
						  ,{"id":"3","name":"Point"}
						  ,{"id":"4","name":"Cash Card"}];
		$scope.srcOfBuList = [{"id":"001","srcName":"Agent"}
							 ,{"id":"002","srcName":"Broker"}
							 ,{"id":"003","srcName":"Manager"}
							 ,{"id":"004","srcName":"Supervisor"}
							 ,{"id":"005","srcName":"Telesale"}];
		$scope.selectedSrcOfBuList = [];
		var range = [];

		$scope.displayStep = function(){	
		
			for(var i=0;i<$scope.input.maxstep;i++) {
				  range.push(i);
				}
			//$('#stepdetail_table_tbody').empty();
			$scope.range = range;
		};		
		
		$scope.updateErrorMsg  = function() {
			$scope.isSubmit = true;
			//validate form
			if ($scope.editForm.$invalid) {
				$scope.app.addAlert('gritter-error', 'Incorrect data', 4000);
				return;
			}
			
			//Call back-end
			_.compactObject($scope.errormsg);
			var url = "rest/errormsg/updateErrorMsg";
			//alert();
			$scope.errormsg.modifiedBy = $scope.app.user.empCode; 
			$http.post(url, $scope.errormsg).success(function(data) {
				$scope.app.addAlert('gritter-success', 'Update Success', 4000);
				$scope.back();
			});
		};
			
		$scope.back = function() {
			$location.path('/commission-type');
		};
	
	}, 0);	
};