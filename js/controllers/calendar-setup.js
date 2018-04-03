angular.module('myApp').config([ '$routeProvider', function($routeProvider) {
	$routeProvider.when("/calendar-setup-list", {templateUrl: _.toHttpGetUrl("content/calendar-setup/calendar-setup-list.html"), controller: CalendarSetupListCtrl});
	$routeProvider.when("/calendar-setup-detail", {templateUrl: _.toHttpGetUrl("content/calendar-setup/calendar-setup-detail.html"), controller: CalendarSetupDetailCtrl});
} ]);



//####################### CALENDAR SETUP LIST ##################
function CalendarSetupListCtrl($rootScope, $scope, $http, $compile, $filter, $timeout, $routeParams, $location, $log) {
	$log.info('Enter CalendarSetupListCtrl');
	
	$timeout(function() {
		
		// init function
		$scope.initCalendar = function() {
			$scope.criteria.calenarYear = moment().format('YYYY');
		};
		
		$scope.yearList = ['2011','2012','2013','2014','2015'];
		
		$scope.lookupBu = [
      		 {"buCode":"1", "buName":"Hyper"}
      		,{"buCode":"2", "buName":"Market"}
      		,{"buCode":"3", "buName":"Mini"}
      		,{"buCode":"4", "buName":"Jumbo"}
      	];
		
		$scope.calendarList = [
            {'calendarId':'1', 'year':'2014', 'name':'Calendar for Hyper', 'bu':'Hyper', 'status':'Active'}
           ,{'calendarId':'2', 'year':'2014', 'name':'Calendar for SSF', 'bu':'Mini, Market', 'status':'Active'}
           ,{'calendarId':'3', 'year':'2014', 'name':'Calendar for Jumbo', 'bu':'Jumbo', 'status':'Active'}
		];
	
	var tbody = "";
	_.each($scope.calendarList, function(calendarObj, index){
		tbody += '<tr ondblclick="document.location = \'#/calendar-setup-detail?calendarId='+ calendarObj.calendarId +'\';">';
		tbody += '<td><input type="checkbox" ng-checked="chk" value="'+ calendarObj.calendarId +'"><span class="lbl"></span></td>';
		tbody += '<td>'+ (index+1) +'</td>';
		tbody += '<td>'+ calendarObj.year +'</td>';
		tbody += '<td>'+ calendarObj.name +'</td>';
		tbody += '<td>'+ calendarObj.bu +'</td>';
		tbody += '<td>'+ calendarObj.status +'</td>';
		tbody += '<td class="action ">';
		tbody += '	<span  class="tooltip-info" tooltip-placement="top" tooltip="'+$scope.app.lang.convert("Edit")+'" ><a href="#/calendar-setup-detail?calendarId='+ calendarObj.calendarId +'"><i class="icon-edit"></i></a></span>';
		tbody += '	<span  class="tooltip-info" tooltip-placement="top" tooltip="'+$scope.app.lang.convert("Delete")+'" ><a  href="" ng-click=""><i class="icon-trash"></i></a></span>';
		tbody += '</td>';
		tbody += '</tr>';
	});
	
		$("#dtable_calendar_setup").dataTable().fnClearTable();
		$('#dtable_calendar_setup_tbody').append($compile(tbody)($scope));
		$("#dtable_calendar_setup").dataTable({
			"bDestroy": true,
			"oLanguage": $rootScope.app.oLanguage(),
			"sDom": "t<'row-fluid'<'span4'lf><'span4'i><'span4'p>>",
			"aoColumns": [
				{ "sWidth": "25px", "sClass": "text-center", "bSortable": false},
				{ "sWidth": "25px", "sClass": "text-center" },
				{ "sWidth": "30px", "sClass": "text-center" },
				{ "sWidth": "200px", "sClass": "text-left" },
				{ "sWidth": "100px", "sClass": "text-left" },
				{ "sWidth": "40px", "sClass": "text-center" },
				{ "sWidth": "40px", "sClass": "text-center", "bSortable": false }
			]
		});
		$('.dt_actions').html($compile($('.dt_app_actions').html())($scope));
		
		// call init function
		$scope.initCalendar();

	}, 0);
	
};

//####################### CALENDAR SETUP DETAIL ##################
function CalendarSetupDetailCtrl($rootScope, $scope, $http, $compile, $filter, $timeout, $routeParams, $location, $log) {
	$log.info('Enter CalendarSetupDetailCtrl');
	
	$timeout(function() {
		
		$scope.calendarId = $routeParams.calendarId;
		
		$scope.weekdaysShorts = moment.weekdaysShort();
		
		$scope.yearList = ['2014','2015'];
		
		$scope.holiday.startDate = _.toDateStr(moment());
		$scope.holiday.endDate = _.toDateStr(moment());
		
		$scope.calendarSetup = {
			 name: null
			,year: moment().format('YYYY')
			,bu: null
		};
			
		$scope.lookupBu = [
			 {"buCode":"1", "buName":"Hyper"}
			,{"buCode":"2", "buName":"Market"}
			,{"buCode":"3", "buName":"Mini"}
			,{"buCode":"4", "buName":"Jumbo"}
		];
		
		$scope.holidays = [
			{"title":"วันขึ้นปีใหม่", "start":'01/01/2014', "end":'01/01/2014', "allDay":true, "className":"label-info2"},
			{"title":"วันมาฆบูชา", "start":'02/14/2014', "end":'02/14/2014', "allDay":true, "className":"label-info2"},
			{"title":"วันชดเชยวันจักรี", "start":'04/07/2014', "end":'04/07/2014', "allDay":true, "className":"label-info2"},
			{"title":"วันสงกรานต์", "start":'04/13/2014', "end":'04/15/2014', "allDay":true, "className":"label-info2"},
			{"title":"วันแรงงานแห่งชาติ", "start":'05/01/2014', "end":'05/01/2014', "allDay":true, "className":"label-info2"},
			{"title":"วันฉัตรมงคล", "start":'05/05/2014', "end":'05/05/2014', "allDay":true, "className":"label-info2"},
			{"title":"วันวิสาขบูชา", "start":'05/13/2014', "end":'05/13/2014', "allDay":true, "className":"label-info2"},
			{"title":"วันอาสาฬหบูชา", "start":'07/11/2014', "end":'07/11/2014', "allDay":true, "className":"label-info2"},
			{"title":"วันแม่แห่งชาติ", "start":'08/12/2014', "end":'08/12/2014', "allDay":true, "className":"label-info2"},
			{"title":"วันปิยมหาราช", "start":'10/23/2014', "end":'10/23/2014', "allDay":true, "className":"label-info2"},
			{"title":"วันพ่อแห่งชาติ", "start":'12/05/2014', "end":'12/05/2014', "allDay":true, "className":"label-info2"},
			{"title":"วันรัฐธรรมนูญ", "start":'12/10/2014', "end":'12/10/2014', "allDay":true, "className":"label-info2"},
			{"title":"วันสิ้นปี", "start":'12/31/2014', "end":'12/31/2014', "allDay":true, "className":"label-info2"}
		];
		
		$scope.workingDays = [{"title":"ชดเชยชุมนุมทางการเมือง", "start":'01/11/2014', "end":'01/12/2014', "allDay":true, "className":"label-yellow2"}];
		
		$scope.workingDayObj = {"sun":false, "mon":true, "tue":true, "wed":true, "thu":true, "fri":true, "sat":false};
		
		$scope.holidayTypeList = [{"typeId":"H", "typeName":"Holiday", "className":"label-info2"}, {"typeId":"W", "typeName":"Working Day", "className":"label-yellow2"}];
		
		$scope.calendarList = [
	       {'calendarId':'1', 'year':'2014', 'name':'Calendar for Hyper', 'bu':['1'], 'status':'Active'}
	      ,{'calendarId':'2', 'year':'2014', 'name':'Calendar for SSF', 'bu':['2', '3'], 'status':'Active'}
	      ,{'calendarId':'3', 'year':'2014', 'name':'Calendar for Jumbo', 'bu':['4'], 'status':'Active'}
        ];
		
		$scope.calendarSetup = _.findWhere($scope.calendarList, {calendarId: $scope.calendarId});
		
		$scope.changeWorkingDay = function(day, $event) {
			var checkbox = $event.target;
			
			if (day === 'SUN' && !checkbox.checked) {
				$('.fc-sun').css('background-color', '#FFD8D8');
			} 
			else if (day === 'SUN' && checkbox.checked) {
				$('.fc-sun').css('background-color', '#FFF');
			}
			
			else if (day === 'MON' && !checkbox.checked) {
				$('.fc-mon').css('background-color', '#FFD8D8');
			} 
			else if (day === 'MON' && checkbox.checked) {
				$('.fc-mon').css('background-color', '#FFF');
			}
			
			else if (day === 'TUE' && !checkbox.checked) {
				$('.fc-tue').css('background-color', '#FFD8D8');
			} 
			else if (day === 'TUE' && checkbox.checked) {
				$('.fc-tue').css('background-color', '#FFF');
			}
			
			else if (day === 'WED' && !checkbox.checked) {
				$('.fc-wed').css('background-color', '#FFD8D8');
			} 
			else if (day === 'WED' && checkbox.checked) {
				$('.fc-wed').css('background-color', '#FFF');
			}
			
			else if (day === 'THU' && !checkbox.checked) {
				$('.fc-thu').css('background-color', '#FFD8D8');
			} 
			else if (day === 'THU' && checkbox.checked) {
				$('.fc-thu').css('background-color', '#FFF');
			}
			
			else if (day === 'FRI' && !checkbox.checked) {
				$('.fc-fri').css('background-color', '#FFD8D8');
			} 
			else if (day === 'FRI' && checkbox.checked) {
				$('.fc-fri').css('background-color', '#FFF');
			}
			
			else if (day === 'SAT' && !checkbox.checked) {
				$('.fc-sat').css('background-color', '#FFD8D8');
			} 
			else if (day === 'SAT' && checkbox.checked) {
				$('.fc-sat').css('background-color', '#FFF');
			}
			
		};
	
		/*------------------------------ INITIALIZE CALENDAR ------------------------------*/
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
				 { events: $scope.holidays }
				,{ events: $scope.workingDays }
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
				
				// set data model
				$scope.holiday = {
					headerPopup : 'Add Working Day',
					holidayName : null,
					type : null,
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
				
				$scope.getDateCalendar();
				
				// set data model on click event
				$scope.holiday = {
					headerPopup : 'Edit Working Day',
					holidayName : calEvent.title,
					type : calEvent.className[0],
					startDate : _.toDateStr(calEvent.start),
					endDate : _.toDateStr(calEvent.end)
				};
				if (_.isEmpty(_.toDateStr(calEvent.end))) {
					$scope.holiday.endDate = _.toDateStr(calEvent.start);
				}
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
			$scope.eventId = null;
			$scope.getDateCalendar();
			$scope.holiday = {
				headerPopup : 'Add Working Day',
				holidayName : '',
				type : '',
				startDate : moment().format('DD/MM/YYYY'),
				endDate : moment().format('DD/MM/YYYY')
			};
		};
		
		$scope.initEditEvent = function(eventCalendar) {
			$scope.newMode = false;
			$scope.calEvent = _.findWhere($scope.getEvents(), {title: eventCalendar.title});
			$scope.eventId = $scope.calEvent._id;
			$scope.getDateCalendar();
			
			// set data model on click event
			$scope.holiday = {
				headerPopup : 'Edit Working Day',
				holidayName : $scope.calEvent.title,
				type : $scope.calEvent.className[0],
				startDate : _.toDateStr($scope.calEvent.start),
				endDate : _.toDateStr($scope.calEvent.end)
			};
			if (_.isEmpty(_.toDateStr($scope.calEvent.end))) {
				$scope.holiday.endDate = _.toDateStr($scope.calEvent.start);
			}
		};
		
		$scope.getEvents = function() {
			return $('#calendar').fullCalendar('clientEvents');
		};
		
		$scope.saveAllEvent = function() {
			
			$scope.isSubmit = true;
			
			// validate form
			if ($scope.form.$invalid) {
				$scope.app.addAlert('gritter-error', 'Incorrect data !!!', 4000);
				return;
			}
			$scope.app.addAlert('gritter-success', 'Update success !!!', 4000);
		};
		
		$scope.saveEvent = function() {
			$log.info('# event id '+ $scope.eventId);
			
			// find class name by holiday type
			var classNameObj = _.findWhere($scope.holidayTypeList, {'className':$scope.holiday.type});
			
			// ---------- insert event ---------- //
			if ($scope.eventId == null) {
				$log.info('# new event');
				calendar.fullCalendar('renderEvent', {
						title: $scope.holiday.holidayName,
						start: moment($scope.holiday.startDate, 'DD/MM/YYYY').format('MM/DD/YYYY'),
						end: moment($scope.holiday.endDate, 'DD/MM/YYYY').format('MM/DD/YYYY'),
						allDay: true,
						className: classNameObj.className,
					},
					true // make the event "stick"
				);
				
				// push new obj to holidays or workingDays
				var newObj = {
					title: $scope.holiday.holidayName,
					start: moment($scope.holiday.startDate, 'DD/MM/YYYY').format('MM/DD/YYYY'),
					end: moment($scope.holiday.endDate, 'DD/MM/YYYY').format('MM/DD/YYYY'),
					className: classNameObj.className
				};
				
				if (classNameObj.typeId == 'H') {
					$scope.holidays.unshift(newObj);
				}
				else if (classNameObj.typeId == 'W') {
					$scope.workingDays.unshift(newObj);
				}
				$scope.app.addAlert('gritter-success', 'Insert Success', 4000);
			}
			// ---------- update event ---------- //
			else {
				$log.info('# update event');
	
				$scope.calEvent.title = $scope.holiday.holidayName;
				$scope.calEvent.start = moment($scope.holiday.startDate, 'DD/MM/YYYY').format('MM/DD/YYYY');
				$scope.calEvent.end = moment($scope.holiday.endDate, 'DD/MM/YYYY').format('MM/DD/YYYY');
				$scope.calEvent.className =  classNameObj.className;
				
				calendar.fullCalendar('updateEvent', $scope.calEvent);
				
				$scope.eventId = null;
				$scope.app.addAlert('gritter-success', 'Update Success', 4000);
			}
			$('#newEventPopup').modal('hide');
			
			$scope.calEvent = {};
			$scope.holiday = {};
		};
		
		$scope.deleteEvent = function() {
			$scope.app.confirmDeleteBox().open().then(function(result) {
				if (result) {
					//remove calendar
					calendar.fullCalendar('removeEvents' , function(ev){
						// remove array
						if (ev.className[0] == 'label-info2') {
							$scope.holidays = $scope.holidays.filter(function(el) { return el.title != $scope.holiday.holidayName; }); 
						}
						else if (ev.className[0] == 'label-yellow2') {
							$scope.workingDays = $scope.workingDays.filter(function(el) { return el.title != $scope.holiday.holidayName; }); 
						}
						return (ev._id == $scope.eventId);
					});
					$scope.eventId = null;
					$scope.app.addAlert('gritter-success', 'Delete Success', 4000);
				}
			}); 
		};
		
		$scope.getDaysInMonth = function(month, year) {
		     var date = new Date(year, month, 1);
		     var days = [];
		     while (date.getMonth() == month) {
		        days.push(moment(new Date(date)).format('DD/MM/YYYY'));
		        date.setDate(date.getDate() + 1);
		     }
		     return days;
		};
		
		$scope.getDateCalendar = function() {
			var dateCalendar = $("#calendar").fullCalendar('getDate');
			var monthInt = dateCalendar.getMonth();
			var yearInt = moment(dateCalendar).format('YYYY');
			
			// start, end date list
			$scope.startDateList = $scope.getDaysInMonth(monthInt, yearInt);
			$scope.endDateList = $scope.getDaysInMonth(monthInt, yearInt);
			
			var newtMonth = $scope.getDaysInMonth(monthInt+1, yearInt);
			angular.forEach(newtMonth, function(day){
				$scope.endDateList.push(day);
			});
		};
		
		$scope.back = function() {
			$location.path('calendar-setup-list');
		};
		
	}, 0);
	
};

