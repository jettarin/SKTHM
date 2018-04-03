angular.module('myApp').config([ '$routeProvider', function($routeProvider) {
	$routeProvider.when("/admin-list-of-value", {templateUrl: _.toHttpGetUrl("content/admin/list-of-value/admin-list-of-value.html"), controller: ListOfValueCtrl });
    $routeProvider.when("/admin-list-of-value-detail/:id", {templateUrl: "content/admin/list-of-value/admin-list-of-value-detail.html", controller: ListOfValueDetailCtrl});
} ]);

function ListOfValueCtrl($rootScope, $scope, $http, $compile, $timeout, $filter, $location) {

	$timeout(function() {
		
		/*// Permission
		$scope.canList = $scope.app.user.userFunction.indexOf('$lov.list') > -1;
		$scope.canEdit = $scope.app.user.userFunction.indexOf('$lov.edit') > -1;*/
		
		$scope.criteria = {};
					
		//	ListGroupName
		var url_search = "rest/lov/getGroupName?d="+moment().valueOf(); 
		
		var data = [{"seqNo":"1","groupName":"STATUS","listOfValueNameLc":"Active","listOfValueNameEn":"Active","description":"สถานะ","statusName":"Active","value1":"A","value2":"","modifiedBy":"นายวิรัตน์ สุขสม","modifiedDate":"01/05/2557 09:00:00"}
					, {"seqNo":"2","groupName":"STATUS","listOfValueNameLc":"Inactive","listOfValueNameEn":"Inactive","description":"สถานะ","statusName":"Active","value1":"I","value2":"","modifiedBy":"นายวิรัตน์ สุขสม","modifiedDate":"01/05/2557 09:00:00"}];
		var tbody = "";
		_.each(data, function(lov, index){
				
					tbody += '<tr ondblclick="document.location = \'#/admin-list-of-value-detail/'+lov.groupName+','+lov.seqNo+'\';">';
					tbody += '<td>'+lov.seqNo+'</td>';
					tbody += '<td>'+lov.groupName+'</td>';
					tbody += '<td>'+lov.listOfValueNameEn+'</td>';
					tbody += '<td>'+_.nullToEmpty(lov.description)+'</td>';
					tbody += '<td>'+lov.statusName+'</td>';
					tbody += '<td>'+_.nullToEmpty(lov.value1)+'</td>';
					tbody += '<td>'+_.nullToEmpty(lov.value2)+'</td>';
					tbody += '<td>'+lov.modifiedBy+':'+lov['modifiedByName'+$scope.app.lang.currentLang]+'</td>';
					tbody += '<td>'+_.toDateTimeStr(lov.modifiedDate)+'</td>';
					tbody += '<td>';
					tbody += '<span class="action" ><a title="'+$scope.app.lang.convert("Edit")+'" href="#/admin-list-of-value-detail/'+lov.groupName+','+lov.seqNo+'"><i class="icon-pencil"></i></a></span>';
					tbody += '</td>';
					tbody += '</tr>';
				});
		
				$("#listOfValue_table").dataTable().fnClearTable();
				$('#listOfValue_table_tbody').append($compile(tbody)($scope));
				$("#listOfValue_table").dataTable({
					"bDestroy": true,
			        "oLanguage": $rootScope.app.oLanguage(),
					"aoColumns": [
						{ "sWidth": "40px","bSortable": false },
						{ "sWidth": "120px", "sClass": "text-left" },
						{ "sWidth": "120px", "sClass": "text-left" }, 
						{ "sWidth": "100px", "sClass": "text-left" },
						{ "sWidth": "55px" },
						{ "sWidth": "55px" },
						{ "sWidth": "55px" },
						{ "sWidth": "100px", "sClass":"text-left" },
						{ "sWidth": "100px","sType": "datetime" },
						{ "sWidth": "30px", "bSortable": false}
			         ]
				});
				
				$('.dt_actions').html($compile($('.dt_app_actions').html())($scope));
				$("div.dataTables_wrapper > div:first-child").addClass("hide");
			//});
		}, 0);
	};


//########################## Edit ListOfValue #####################################
function ListOfValueDetailCtrl($rootScope, $scope, $http, $compile, $timeout, $filter, $location,$routeParams) {

	$timeout(function() {
		$scope.isSubmit = false;//Submit flag
					
		//Call back-end by
		value = ($routeParams.id).split(',');
		param = {"groupName": value[0], "seq": value[1]};
		
		$http.get(_.toHttpGetUrl('rest/lov/getLovSetting', param)).success(function(data) {			
			$scope.lov = data;
		});

		//Update ListOfValue
		$scope.updateListOfValue  = function() {
			$scope.isSubmit = true;
			
			//validate form
			if ($scope.editForm.$invalid) {
				$scope.app.addAlert('gritter-error', 'Incorrect data', 4000);
				return;
			}
			
			//Call back-end
			_.compactObject($scope.lov);
			var url = "rest/lov/updateListOfValue";
			$scope.lov.modifiedBy = $scope.app.user.empCode;
			$http.post(url, $scope.lov).success(function(data) {
				$scope.app.addAlert('gritter-success', 'Update Success', 4000);
				$scope.back();
			});
		};

		$scope.back = function() {
			$location.path('/admin-list-of-value');	
		};
	
	}, 0);
};