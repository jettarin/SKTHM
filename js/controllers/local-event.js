angular.module('myApp').config([ '$routeProvider', function($routeProvider) {
	$routeProvider.when("/parameter-setup-local-event-calendar", {templateUrl: _.toHttpGetUrl("content/local-event/local-event-calendar.html"), controller: localEventCalendarCtrl});
	$routeProvider.when("/parameter-setup-local-event-list", {templateUrl: _.toHttpGetUrl("content/local-event/local-event-list.html"), controller: localEventListCtrl});
} ]);



//####################### LOCAL EVENT LIST ##################
function localEventListCtrl($rootScope, $scope, $http, $compile, $filter, $timeout, $routeParams, $location, $log) {
	$log.info('Enter localEventListCtrl');
	
	$timeout(function() {
		
	$rootScope.criteria.start = _.toDateStr(moment());  //set Default Start Date
	$rootScope.criteria.end = _.toDateStr(moment());	//set Default End Date
	
	$scope.lookupBu = [
		 {"buCode":"1", "buName":"Hyper"}
		,{"buCode":"2", "buName":"Market"}
		,{"buCode":"3", "buName":"Mini"}
		,{"buCode":"4", "buName":"Jumbo"}
	];
	
	$scope.eventTypeList = [{"eventTypeId":"1", "eventTypeName":"Positive"}, {"eventTypeId":"2", "eventTypeName":"Negative"}];
	
	$scope.ImpactByDivisionList = [
		{"divCode":"01", "division":"Hard Line", "impact":""},
		{"divCode":"02", "division":"Home Line", "impact":""},
		{"divCode":"03", "division":"Dry Food", "impact":""},
		{"divCode":"04", "division":"Soft Line", "impact":""}
	];
	
	$scope.storeList = [
		 {"storeId":"11101", "storeCode":"11101", "storeShortName":"HHWSW1","storeName":"(สาขาวงศ์สว่าง)"}
		,{"storeId":"11102", "storeCode":"11102", "storeShortName":"HHCWT1","storeName":"(สาขาแจ้งวัฒนะ)"}
		,{"storeId":"11103", "storeCode":"11103", "storeShortName":"HHRBR1","storeName":"(สาขาราษฏร์บูรณะ)"}
		,{"storeId":"11104", "storeCode":"11104", "storeShortName":"HHPTY1","storeName":"(สาขาพัทยา)"}
		,{"storeId":"11105", "storeCode":"11105", "storeShortName":"HHBPE1","storeName":"(สาขาบางพลี)"}
	];
	
	$scope.localEventList = [
		{"leId":"LE001", "title":"LE001(11101-HHWSW1)", "leName":"Natural disaster - flooding", "typeId": "2", "type":"Negative", "store":"11101-HHWSW1", "startDate":"1/1/2014", "endDate":"1/7/2014", "storeIds":["11101"]
			, "impactByDivisions":[
			                  {"division":"Hard Line", "impact":"50.00"}
							, {"division":"Home Line", "impact":"0.00"}
							, {"division":"Dry Food", "impact":"5.00"}
							, {"division":"Soft Line", "impact":"5.00"}
						   ]
		},
		{"leId":"LE001", "title":"LE001(11102-HHCWT1)", "leName":"Natural disaster - flooding", "typeId": "2", "type":"Negative", "store":"11102-HHCWT1", "startDate":"1/1/2014", "endDate":"1/7/2014", "storeIds":["11102"]
			, "impactByDivisions":[
			                  {"division":"Hard Line", "impact":"5.00"}
							, {"division":"Home Line", "impact":"0.00"}
							, {"division":"Dry Food", "impact":"5.00"}
							, {"division":"Soft Line", "impact":"5.00"}
						   ]
		},
		{"leId":"LE002", "title":"LE002(11102-HHCWT1)", "leName":"Man-made disaster - mob", "typeId": "2", "type":"Negative", "store":"11102-HHCWT1", "startDate":"1/1/2014", "endDate":"1/7/2014", "storeIds":["11102"]
			, "impactByDivisions":[
			                  {"division":"Hard Line", "impact":"5.00"}
							, {"division":"Home Line", "impact":"0.00"}
							, {"division":"Dry Food", "impact":"5.00"}
							, {"division":"Soft Line", "impact":"5.00"}
						   ]
		},
		{"leId":"LE003", "title":"LE003(11105-HHBPE1)", "leName":"Man-made disaster - mob", "typeId": "1", "type":"Postive", "store":"11105-HHBPE1", "startDate":"1/1/2014", "endDate":"1/7/2014", "storeIds":["11105"]
			, "impactByDivisions":[
			                  {"division":"Hard Line", "impact":"10.00"}
							, {"division":"Home Line", "impact":"10.00"}
							, {"division":"Dry Food", "impact":"5.00"}
							, {"division":"Soft Line", "impact":"5.00"}
						   ]
		}
	];
	
	var tbody = "";
	_.each($scope.localEventList, function(le, index){
		tbody += '<tr>';
		tbody += '<td><input type="checkbox" ng-checked="chk" value="'+le.leId+'"><span class="lbl"></span></td>';
		tbody += '<td>'+ (index+1) +'</td>';
		tbody += '<td>'+ le.leId +'</td>';
		tbody += '<td>'+ le.leName +'</td>';
		tbody += '<td>'+ le.type +'</td>';
		tbody += '<td>'+ le.store +'</td>';
		tbody += '<td>'+ _.toDateStr(le.startDate) +'</td>';
		tbody += '<td>'+ _.toDateStr(le.endDate) +'</td>';
		
		tbody += '<td>';
		_.each(le.impactByDivisions, function(impactDiv, index){
			tbody += impactDiv.division + '<br>';
		});
		tbody += '</td>';
		
		tbody += '<td>';
		_.each(le.impactByDivisions, function(impact, index){
			tbody += impact.impact + '<br>';
		});
		tbody += '</td>';
		
		tbody += '<td class="action ">';
		tbody += '	<span  class="tooltip-info" tooltip-placement="top" tooltip="'+$scope.app.lang.convert("Edit")+'" ><a data-toggle="modal" data-target="#newEventPopup" href="" ng-click="openPopupEdit(\''+ le.leId +'\')"><i class="icon-edit"></i></a></span>';
		tbody += '	<span  class="tooltip-info" tooltip-placement="top" tooltip="'+$scope.app.lang.convert("Delete")+'" ><a  href="" ng-click=""><i class="icon-trash"></i></a></span>';
		tbody += '</td>';
		tbody += '</tr>';
	});
		$("#dtable_local_event").dataTable().fnClearTable();
		$('#dtable_local_event_tbody').append($compile(tbody)($scope));
		$("#dtable_local_event").dataTable({
			"bDestroy": true,
			"oLanguage": $rootScope.app.oLanguage(),
			"sDom": "t<'row-fluid'<'span4'lf><'span4'i><'span4'p>>",
			"aoColumns": [
				{ "sWidth": "15px", "sClass": "text-center", "bSortable": false},
				{ "sWidth": "30px", "sClass": "text-center" },
				{ "sWidth": "50px", "sClass": "text-center" },
				{ "sWidth": "200px", "sClass": "text-left" },
				{ "sWidth": "40px", "sClass": "text-center" },
				{ "sWidth": "80px", "sClass": "text-center" },
				{ "sWidth": "60px", "sClass": "text-center" },
				{ "sWidth": "60px", "sClass": "text-center" },
				{ "sWidth": "80px", "sClass": "text-left" },
				{ "sWidth": "20px", "sClass": "text-right" },
				{ "sWidth": "20px", "sClass": "text-center", "bSortable": false}
			]
		});
		$('.dt_actions').html($compile($('.dt_app_actions').html())($scope));
		
		$scope.openPopupNew = function() {
			$scope.clearPopup();
			$scope.headerPopup = 'Add New Event';
			$scope.localEvent.name = '';
			$scope.localEvent.typeId = '2';
			$scope.localEvent.startDate = _.toDateStr(moment());
			$scope.localEvent.endDate = _.toDateStr(moment());
			$scope.localEvent.impactByDivisions = $scope.ImpactByDivisionList;
		};
		
		$scope.openPopupEdit = function(localEventId) {
			$scope.headerPopup = 'Edit Event';
			$scope.localEvent = _.findWhere($scope.localEventList, {leId: localEventId+''});
		};
		
		$scope.newLocalEvent = function() {
		};
		
		$scope.clearPopup = function() {
			$scope.localEvent = {};
		};
		
	}, 0);
	
};

//####################### LOCAL EVENT CALENDAR ##################
function localEventCalendarCtrl($rootScope, $scope, $http, $compile, $filter, $timeout, $routeParams, $location, $log) {
	$log.info('Enter localEventCalendarCtrl');
	
	$timeout(function() {
		
	$scope.positiveEventList = [
		{"leId":"LE003", "title":"LE003(11105-HHBPE1)", "eventName":"Man-made disaster - mob (11105-HHBPE1)", "typeId": "1", "type":"Positive", "start":'01/13/2014', "end":'01/17/2014', "allDay":true, "className":"label-success2"
			, "storeIds":["11105"]
			, "impactByDivisions":[
			                  {"division":"Hard Line", "impact":"10.00"}
							, {"division":"Home Line", "impact":"10.00"}
							, {"division":"Dry Food", "impact":"5.00"}
							, {"division":"Soft Line", "impact":"5.00"}
						   ]
		}
	];
	
	$scope.negativeEventList = [
		{"leId":"LE001", "title":"LE001(11101-HHWSW1)", "eventName":"Natural disaster - flooding (11101-HHWSW1)", "typeId": "2", "type":"Negative", "start":'01/04/2014', "end":'01/07/2014', "allDay":true, "className":"label-important2"
			, "storeIds":["11101"]
			, "impactByDivisions":[
			                  {"division":"Hard Line", "impact":"5.00"}
							, {"division":"Home Line", "impact":"0.00"}
							, {"division":"Dry Food", "impact":"5.00"}
							, {"division":"Soft Line", "impact":"5.00"}
						   ]},
		
		{"leId":"LE001", "title":"LE001(11102-HHCWT1)", "eventName":"Natural disaster - flooding (11102-HHCWT1)", "typeId": "2", "type":"Negative", "start":'01/04/2014', "end":'01/07/2014', "allDay":true, "className":"label-important2"
			, "storeIds":["11101"]
			, "impactByDivisions":[
			                  {"division":"Hard Line", "impact":"5.00"}
							, {"division":"Home Line", "impact":"0.00"}
							, {"division":"Dry Food", "impact":"5.00"}
							, {"division":"Soft Line", "impact":"5.00"}
						   ]
		},
		
		{"leId":"LE002", "title":"LE002(11102-HHCWT1)", "eventName":"Man-made disaster - mob (11102-HHCWT1)", "typeId": "2", "type":"Negative", "start":'01/13/2014', "end":'01/17/2014', "allDay":true, "className":"label-important2"
			, "storeIds":["11102"]
			, "impactByDivisions":[
			                  {"division":"Hard Line", "impact":"5.00"}
							, {"division":"Home Line", "impact":"0.00"}
							, {"division":"Dry Food", "impact":"5.00"}
							, {"division":"Soft Line", "impact":"5.00"}
						   ]
		}
	];
	
	$scope.workingDayObj = {"sun":false, "mon":true, "tue":true, "wed":true, "thu":true, "fri":true, "sat":false};
	
	$scope.eventTypeList = [{"eventTypeId":"1", "eventTypeName":"Positive", "className":"label-success2"}, {"eventTypeId":"2", "eventTypeName":"Negative", "className":"label-important2"}];
	
	$scope.impactByDivisionList = [
		{"divCode":"01", "division":"Hard Line", "impact":""},
		{"divCode":"02", "division":"Home Line", "impact":""},
		{"divCode":"03", "division":"Dry Food", "impact":""},
		{"divCode":"04", "division":"Soft Line", "impact":""}
	];
	
	$scope.storeList = [
		 {"storeId":"11101", "storeCode":"11101", "storeShortName":"HHWSW1","storeName":"(สาขาวงศ์สว่าง)"}
		,{"storeId":"11102", "storeCode":"11102", "storeShortName":"HHCWT1","storeName":"(สาขาแจ้งวัฒนะ)"}
		,{"storeId":"11103", "storeCode":"11103", "storeShortName":"HHRBR1","storeName":"(สาขาราษฏร์บูรณะ)"}
		,{"storeId":"11104", "storeCode":"11104", "storeShortName":"HHPTY1","storeName":"(สาขาพัทยา)"}
		,{"storeId":"11105", "storeCode":"11105", "storeShortName":"HHBPE1","storeName":"(สาขาบางพลี)"}
	];

	/*------------------------------ INITIALIZE THE CALENDAR ------------------------------*/
	var calendar = $('#calendar').fullCalendar({
		 buttonText: {
			 prev: '<i class="icon-chevron-left" style="margin-top: 5px;"></i>',
			 next: '<i class="icon-chevron-right" style="margin-top: 5px;"></i>'
		},
		header: {
			left: 'prev',
			center: 'title',
			right: 'next'
		},
		
		eventSources: [
			 {events: $scope.negativeEventList}
			,{events: $scope.positiveEventList}
		],
		editable: true,
		droppable: false, // this allows things to be dropped onto the calendar !!!
		selectable: false,
		selectHelper: false,
		disableResizing: true,
		disableDragging: true,
		
		select: function(start, end, allDay) {
			$log.info('# select calendar');
			$scope.newMode = true;
			$scope.headerPopup = 'Add Event';
			
			// set data model
			$scope.localEvent = {
				eventName : null,
				type : '2',
				startDate : _.toDateStr(start),
				endDate : _.toDateStr(end)
			};
			$('#newEventPopup').modal('show');
			$('#calendar').fullCalendar('unselect');
			$scope.$apply();
		},
		eventClick: function(calEvent, jsEvent, view) {
			$log.info('# event click');
			$scope.newMode = false;
			$scope.eventId = calEvent._id;
			$scope.calEvent = calEvent;
			
			$scope.initEditEvent(calEvent);
			
			$scope.headerPopup = 'Edit Event';
			$('#newEventPopup').modal('show');
			$scope.$apply();
			
		},
		eventDrop: function(event, dayDelta, minuteDelta, allDay, revertFunc) {
			$log.info('# event drop');
			$log.info(moment(event.start).format('DD/MM/YYYY') + ', ' + moment(event.end).format('DD/MM/YYYY'));
	        $log.info(event.title + " was moved " + dayDelta + " days.");
			revertFunc();
        	$scope.$apply();
	    },
	    eventResize: function(event, dayDelta, minuteDelta, revertFunc) {
	    	$log.info('# event resize');
	    	$log.info("The end date of " + event.title + "has been moved " + dayDelta + " days.");
        	revertFunc();
        	$scope.$apply();
	    },
	    viewDisplay: function(view) {
            var date = $('#calendar').fullCalendar('getDate');
            var monthView = date.getMonth()+1;
            var yearView = date.getFullYear();
            var currYear = moment().year();
            
			if (monthView == 1 && yearView == currYear) {
				$("#calendar .fc-button-prev").addClass('fc-state-disabled');
			} else {
				$("#calendar .fc-button-prev").removeClass('fc-state-disabled');
			}
    		$scope.$apply();
        }
	});
	
	$scope.initNewEvent = function() {
		$scope.newMode = true;
		$scope.headerPopup = 'Add Event';
		$scope.localEvent = {
			title : '',
			eventName : '',
			typeId : '2',
			start : moment().format('DD/MM/YYYY'),
			end : moment().format('DD/MM/YYYY'),
			impactByDivisions : $scope.impactByDivisionList,
			storeIds:[]
		};
	};
	
	$scope.initEditEvent = function(localEvent) {
		$scope.eventId = localEvent._id;
		
		if ($scope.calEvent == undefined) {
			$scope.calEvent = _.findWhere($scope.getEvents(), {title: localEvent.title});
			$log.info($scope.calEvent);
		}
	
		if (localEvent.typeId == '2') { // if type == 2 then 'Negative Type'
			$scope.localEvent = _.findWhere($scope.negativeEventList, {title: localEvent.title+''});
		} else {
			$scope.localEvent = _.findWhere($scope.positiveEventList, {title: localEvent.title+''});
		}
		$scope.localEvent.start = _.toDateStr(localEvent.start);
		$scope.localEvent.end = _.toDateStr(localEvent.end);
		
		$scope.headerPopup = 'Edit Event';
	};
	
	$scope.getEvents = function() {
		$scope.allEvent = $('#calendar').fullCalendar('clientEvents');
		$log.info($scope.allEvent);
	};
	
	$scope.saveEvent = function() {
		$log.info('# event id '+ $scope.eventId);
		
		// validate form
		if ($scope.form.$invalid) {
			$scope.app.addAlert('gritter-error', 'Incorrect data !!!', 4000);
			return;
		}
		
		// find class name by local event type
		var classNameObj = _.findWhere($scope.eventTypeList, {'eventTypeId':$scope.localEvent.typeId});
		
		// new event
		if ($scope.eventId == null) {
			$log.info('# new event');
			calendar.fullCalendar('renderEvent', {
					title: $scope.localEvent.title,
					eventName: $scope.localEvent.eventName,
					start: moment($scope.localEvent.start, 'DD/MM/YYYY').format('MM/DD/YYYY'),
					end: moment($scope.localEvent.end, 'DD/MM/YYYY').format('MM/DD/YYYY'),
					allDay: true,
					className: classNameObj.className,
					typeId: $scope.localEvent.typeId,
					impactByDivisions: $scope.localEvent.impactByDivisions,
					storeIds: $scope.localEvent.storeIds
				},
				true // make the event "stick"
			);
			
			// push new obj to holidays or workingDays
			$scope.newObj = {
				title: $scope.localEvent.title,
				eventName: $scope.localEvent.eventName,
				start: moment($scope.localEvent.start, 'DD/MM/YYYY').format('MM/DD/YYYY'),
				end: moment($scope.localEvent.end, 'DD/MM/YYYY').format('MM/DD/YYYY'),
				className: classNameObj.className,
				typeId: $scope.localEvent.typeId,
				impactByDivisions: $scope.localEvent.impactByDivisions,
				storeIds: $scope.localEvent.storeIds
			};
			
			if (classNameObj.eventTypeId == '1') { // positive
				$scope.positiveEventList.unshift($scope.newObj);
			}
			else if (classNameObj.eventTypeId == '2') { // negative
				$scope.negativeEventList.unshift($scope.newObj);
			}
			$scope.app.addAlert('gritter-success', 'Insert Success', 4000);
		}
		// update event
		else {
			$log.info('# update event');

			$scope.calEvent.title = $scope.localEvent.title;
			$scope.calEvent.eventName = $scope.localEvent.eventName;
			$scope.calEvent.start = moment($scope.localEvent.start, 'DD/MM/YYYY').format('MM/DD/YYYY');
			$scope.calEvent.end = moment($scope.localEvent.end, 'DD/MM/YYYY').format('MM/DD/YYYY');
			$scope.calEvent.className =  classNameObj.className;
			$scope.calEvent.typeId = $scope.localEvent.typeId;
			$scope.calEvent.impactByDivisions = $scope.localEvent.impactByDivisions;
			$scope.calEvent.storeIds = $scope.localEvent.storeIds;
			
			// call back full calendar
			calendar.fullCalendar('updateEvent', $scope.calEvent);
			
			$scope.eventId = null;
			$scope.app.addAlert('gritter-success', 'Update Success', 4000);
		}
		$('#newEventPopup').modal('hide');
		
		$scope.calEvent = {};
		$scope.localEvent = {};
	};
	
	$scope.deleteEvent = function() {
		$scope.app.confirmDeleteBox().open().then(function(result) {
			if (result) {
				//remove calendar
				calendar.fullCalendar('removeEvents' , function(ev){
					// remove array
					if (ev.className[0] == 'label-success2') { // positive
						$scope.positiveEventList = $scope.positiveEventList.filter(function(el) { return el.title != $scope.localEvent.eventName; }); 
					}
					else if (ev.className[0] == 'label-important2') { // negative
						$scope.negativeEventList = $scope.negativeEventList.filter(function(el) { return el.title != $scope.localEvent.eventName; }); 
					}
					// remove event calendar 
					return (ev._id == $scope.eventId);
				});
				$scope.eventId = null;
				$scope.app.addAlert('gritter-success', 'Delete Success', 4000);
			}
		}); 
	};
	
	$scope.clearPopup = function() {
		$scope.localEvent = {};
	};
	
	}, 0);
	
};

