<?php

 		session_start();
 		$ses_id = $_SESSION['ses_id'];
 		$ses_firstName = $_SESSION['firstName'];
    $ses_lastName = $_SESSION['lastName'];
    $ses_prename = $_SESSION['Pre_name'];
    $ses_status = $_SESSION['ses_status'];
    $ses_userid = $_SESSION['Mem_ID'];
    $ses_costid = $_SESSION['Cost_id'];
    $ses_Cost_SKTHM = $_SESSION['Cost_SKTHM'];
    $ses_user_extra = $_SESSION['ses_user_extra'];

      if($ses_status == "admin" || $ses_status == "head_admin" || $ses_status == "sot"){

			}else  if($ses_status == "user"){

			}else if($ses_status != "user" ) {
               echo "<meta http-equiv='refresh' content='0;URL=login.php'>";
          exit();
      }
?>
<!DOCTYPE html>
<html lang="en" data-ng-app="myApp">
<head>
	<title>Sukhothai Hospital Maintenance</title>
	<meta charset="utf-8" />
	<meta name="viewport" content="width=device-width, initial-scale=1.0" />
	<meta name="description" content="Promotion Allocation for Big C Supercenter Public Company Limited" />
	<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
	<meta http-equiv="X-UA-Compatible" content="IE=Edge" />
	<meta http-equiv="cache-control" content="max-age=0" />
	<meta http-equiv="cache-control" content="no-cache" />
	<meta http-equiv="expires" content="0" />
	<meta http-equiv="expires" content="Tue, 01 Jan 1980 1:00:00 GMT" />
	<meta http-equiv="pragma" content="no-cache" />

	<!-- ICON TITLE -->
	<link rel="shortcut icon" href="img/logo.jpg" />
	<!-- BOOTSTRAP 3.0.2 -->
	<!-- FONT AWESOME -->
	<link rel="stylesheet" href="lib/font-awesome/font-awesome.min.css"/>

	<!-- IONICONS -->
	<link rel="stylesheet" href="lib/ionicons/ionicons.min.css"/>

	<!-- FLAGS -->
	<link rel="stylesheet" href="lib/flags/flags.css"/>

	<!-- JQUERY GRITTER -->
	<link rel="stylesheet" href="lib/jquery-gritter/jquery.gritter.css"/>

	<!-- jQuery-File-Upload -->
	<link rel="stylesheet" href="lib/jQuery-File-Upload/css/jquery.fileupload-ui.css"/>

	<!-- FULL CALENDAR -->
	<link rel="stylesheet" href="lib/fullcalendar/fullcalendar.css"/>

	<!-- DATATABLE -->
	<link rel="stylesheet" href="lib/datatable/dataTables.bootstrap.css"/>

	<!-- SELECT2 -->
	<link rel="stylesheet" href="lib/select2/select2.css"/>
	<link rel="stylesheet" href="lib/select2/select2-bootstrap.css"/>

	<!-- DYNATREE -->
	<link rel="stylesheet" href="lib/dynatree/skin-vista/ui.dynatree.css"/>

	<!-- BOOTSTRAP SWITCH -->
	<link rel="stylesheet" href="lib/bootstrap-switch/css/bootstrap3/bootstrap-switch.min.css"/>

	<!-- BOOTSTRAP WYSIHTML5 - TEXT EDITOR -->
	<!-- <link rel="stylesheet" href="lib/bootstrap-wysihtml5/bootstrap3-wysihtml5.min.css"/> -->

	<!-- BOOTSTRAP-DATETIMEPICKER -->
	<link rel="stylesheet" href="lib/bootstrap-datetimepicker/css/bootstrap-datetimepicker.min.css"/>

	<!-- ANGULAR -->
	<link rel="stylesheet" href="lib/angular-ui/angular-ui.css"/>

	<!-- THEME STYLE -->
	<link rel="stylesheet" href="lib/bootstrap/bootstrap.min.css"/>



<link rel='stylesheet' href='lib/admin-lte/skin/skin-blue.css'/>
<link rel='stylesheet' href='lib/bootstrap/bootstrap.min.css'/>
<link rel='stylesheet' href='lib/admin-lte/admin-lte.css'/>



	<link rel="stylesheet" href="lib/app/app.css?v=2"/>
	<link rel="stylesheet" href="lib/app/app-ie.css"/>



	<script type="text/javascript">
		var user_id = <?php echo "'".$ses_userid."'" ?>
	</script>
  <script type="text/javascript">
		var cost_id = <?php echo "'".$ses_costid."'" ?>
	</script>

	<script type="text/javascript">
		var user_status = <?php echo "'".$ses_status."'" ?>
	</script>

  <script type="text/javascript">
    var pc_name = <?php echo "'".gethostname()."'" ?>
  </script>
  <script type="text/javascript">
    var user_extra = <?php echo "'".$ses_user_extra."'" ?>
  </script>
  <script>
  document.addEventListener('DOMContentLoaded', function () {
    if (Notification.permission !== "granted")
      Notification.requestPermission();
  });
  </script>


</head>

<body class="skin-blue" data-ng-controller="AppCtrl">

	<!-- ######################################## [START] HEADER BAR ######################################## -->
	<div class="header">
		<a href="#/" class="logo">
			<img style="width: 40px; height: 36px; margin-top: -2px; border-radius:3px;" src="img/logo.jpg"/>
			<span data-translate>SKTHM System</span>
		</a>
		<!-- Header Navbar: style can be found in header.less -->
		<nav class="navbar navbar-static-top" data-role="navigation">
			<!-- Sidebar toggle button-->
			<a href="#" class="navbar-btn sidebar-toggle" data-toggle="offcanvas" data-role="button">
				<span class="sr-only">Toggle navigation</span>
				<span class="icon-bar"></span>
				<span class="icon-bar"></span>
				<span class="icon-bar"></span>
			</a>
			<div class="navbar-right">
				<ul class="nav navbar-nav">
					<!-- Message -->
					<!-- <li class="dropdown messages-menu" data-ng-show="user_status=='admin'">
						<a href="" class="dropdown-toggle" data-toggle="dropdown" data-ng-show="countMess!='0'">
							<i class="fa fa-envelope"></i>
							<span class="label label-danger">{{countMess}}</span>
						</a>
						<ul class="dropdown-menu">
							<li class="header">มีงานถูกส่งมา {{countMess}} งาน</li>
							<li>
								<ul class="menu">
									<li data-ng-repeat="job in jobSendToList">
										<a href=""  data-ng-click="gotoMoreDetail(job.job_id)">
											<div class="pull-left">
												<img src="img/avatar/avatar_unknow.jpg" class="img-circle" alt="User Image"/>
											</div>
											<h4 >
												{{job.job_header}}
											</h4>
											<p>{{job.nameOfficerAcc}}</p>
										</a>
									</li>

								</ul>
							</li>
							<li class="footer"><a href="" data-ng-click="seeAll()">ดูทั้งหมด</a></li>
						</ul>
					</li> -->
					<!-- User Account -->
					<li class="dropdown user user-menu">
						<a href="" class="dropdown-toggle" data-toggle="dropdown">
							<i class="glyphicon glyphicon-user"></i>
							<span>{{userData.Pre_name}}{{userData.Mem_name}} {{userData.Mem_lastname}} <i class="caret"> </i></span>
						</a>
						<ul class="dropdown-menu">
							<!-- User image -->
							<li class="user-header bg-light-blue">
								<img src="img/avatar/avatar.png" class="img-circle" alt="User Image" />
								<p><?php echo $ses_prename ?><?php echo $ses_firstName  ?> <?php echo $ses_lastName  ?></p>
							</li>
							<!-- Menu Footer-->
							<li class="user-footer">
								<!-- <div class="pull-left">
									<a href="#" class="btn btn-default btn-flat" data-translate>Profile</a>
								</div> -->
								<div class="pull-right">
									<a href="#" class="btn btn-default btn-flat deleteText" data-translate>ออกจากระบบ</a>
								</div>
							</li>
						</ul>
					</li>
				</ul>
			</div>
		</nav>
	</div>
	<!-- ######################################## [ END ] HEADER BAR ######################################## -->

	<div class="wrapper row-offcanvas row-offcanvas-left">
		<!-- ######################################## [START] SIDE MENU BAR ######################################## -->
		<div class="left-side sidebar-offcanvas">
			<div class="sidebar">
				<ul class="sidebar-menu">
					<li>
						<a href="{{url}}" data-ng-click="setMenuClick();">
							<i class="fa fa-home"></i> <span data-translate>หน้าแรก</span>
						</a>
		      		</li>
		      		<li>
						<a href="#/fix" >
							<i class="fa fa-laptop"></i> <span data-translate>แจ้งซ่อม</span>
						</a>
		      		</li>

              <li class="treeview" data-ng-show="user_status == 'admin' || user_status == 'head_admin'">
    						<a href="#">
    							<i class="fa fa-cogs"></i>
    							<span data-translate>ซ่อมบำรุง</span>
    							<i class="fa fa-angle-left pull-right"></i>
    						</a>
    						<ul class="treeview-menu">
    							<li>
    								<a href="#/maintenance" data-ng-click="setMenuClick();">
    									<i class="fa fa-angle-double-right"></i> <span data-translate>ฟอร์ม</span>
    								</a>
    							</li>
    							<li>
    								<a href="#/maintenance-list" data-ng-click="setMenuClick();">
    									<i class="fa fa-angle-double-right"></i> <span data-translate>ประวัติการซ่อมบำรุง</span>
    								</a>
    							</li>

    							</ul>
    					</li>
					<!--<li>
						<a href="#/request-list" data-ng-click="setMenuClick();">
							<i class="fa fa-list-alt"></i> <span data-translate>Manage Request</span>
						</a>
					</li>-->
					<li class="treeview" data-ng-show="user_status == 'admin' || user_status == 'head_admin'">
						<a href="#">
							<i class="fa fa-list-alt"></i>
							<span data-translate>งาน</span>
							<i class="fa fa-angle-left pull-right"></i>
						</a>
						<ul class="treeview-menu">
							<li>
								<a href="#/remain-list" data-ng-click="setMenuClick();">
									<i class="fa fa-angle-double-right"></i> <span data-translate>งานที่ยังค้าง</span>
								</a>
							</li>
							<li>
								<a href="#/completed-list" data-ng-click="setMenuClick();">
									<i class="fa fa-angle-double-right"></i> <span data-translate>งานที่เสร็จแล้ว</span>
								</a>
							</li>
							<li>
								<a href="#/all-job" data-ng-click="setMenuClick();">
									<i class="fa fa-angle-double-right"></i> <span data-translate>งานทั้งหมด</span>
								</a>
							</li>
							</ul>
					</li>
          <!-- หัวหน้าศูนย์คอม -->
          <li class="treeview" data-ng-show="user_status=='head_admin'">
						<a href="#">
							<i class="fa fa-book"></i>
							<span data-translate>ส่งเคลมประกัน</span>
							<i class="fa fa-angle-left pull-right" data-ng-show="hMenuClaim == 0"></i><span class="pull-right-container" data-ng-show="hMenuClaim >= 1">
          <span class="label label-primary pull-right">งานใหม่</span>
						</a>
						<ul class="treeview-menu">
							<li>
								<a href="#/claim-list" data-ng-click="setMenuClick();">
									<i class="fa fa-angle-double-right"></i> <span data-translate>งานส่งเคลม</span><span class="pull-right-container" data-ng-show="hMenuClaim >= 1">
              <small class="label pull-right bg-red">{{hMenuClaim}}</small>
								</a>
							</li>
              <li>
								<a href="#/p-claim-list" data-ng-click="setMenuClick();">
									<i class="fa fa-angle-double-right"></i> <span data-translate>ครุภัณฑ์ที่กำลังส่งซ่อม</span>
								</a>
							</li>
							<li>
								<a href="#/claim-history" data-ng-click="setMenuClick();">
									<i class="fa fa-angle-double-right"></i> <span data-translate>ประวัติส่งซ่อม</span>
								</a>
							</li>

						</ul>
					</li>
					<li class="treeview" data-ng-show="user_status=='head_admin'">
						<a href="#">
							<i class="fa fa-share"></i>
							<span data-translate>ส่งซ่อมนอก</span>
							<i class="fa fa-angle-left pull-right" data-ng-show="hMenuRepair == 0"></i><span class="pull-right-container" data-ng-show="hMenuRepair >= 1">
          <span class="label label-primary pull-right">งานใหม่</span>
						</a>
						<ul class="treeview-menu">
							<li>
								<a href="#/repair-list" data-ng-click="setMenuClick();">
									<i class="fa fa-angle-double-right"></i> <span data-translate>งานส่งซ่อม</span><span class="pull-right-container" data-ng-show="hMenuRepair >= 1">
              <small class="label pull-right bg-red">{{hMenuRepair}}</small>
								</a>
							</li>
              <li>
								<a href="#/p-repair-list" data-ng-click="setMenuClick();">
									<i class="fa fa-angle-double-right"></i> <span data-translate>ครุภัณฑ์ที่กำลังส่งซ่อม</span>
								</a>
							</li>
							<li>
								<a href="#/repair-history" data-ng-click="setMenuClick();">
									<i class="fa fa-angle-double-right"></i> <span data-translate>ประวัติส่งซ่อม</span>
								</a>
							</li>

						</ul>
					</li>
          <li class="treeview" data-ng-show="user_status=='head_admin'">
						<a href="#">
							<i class="fa fa-cog"></i>
							<span data-translate>สั่งซื้ออุปกรณ์</span>
							<i class="fa fa-angle-left pull-right" data-ng-show="hMenuOrder == 0"></i><span class="pull-right-container" data-ng-show="hMenuOrder >= 1">
          <span class="label label-primary pull-right">งานใหม่</span>
						</a>
						<ul class="treeview-menu">
							<li>
								<a href="#/order-list" data-ng-click="setMenuClick();">
									<i class="fa fa-angle-double-right"></i> <span data-translate>งานสั่งซื้ออุปกรณ์</span><span class="pull-right-container" data-ng-show="hMenuOrder >= 1">
              <small class="label pull-right bg-red">{{hMenuOrder}}</small>
								</a>
							</li>
              <li>
								<a href="#/p-order-list" data-ng-click="setMenuClick()">
									<i class="fa fa-angle-double-right"></i> <span data-translate>อุปกรณ์ที่กำลังสั่งซื้อ</span>

      						</a>
								</a>
							</li>

							<li>
								<a href="#/order-history" data-ng-click="setMenuClick();">
									<i class="fa fa-angle-double-right"></i> <span data-translate>ประวัติสั่งซื้ออุปกรณ์</span>
								</a>
							</li>

						</ul>
					</li>
					<li class="treeview" data-ng-show="user_status=='head_admin'">
						<a href="#">
							<i class="fa fa-money"></i>
							<span data-translate>สั่งซื้อทดแทน</span><i class="fa fa-angle-left pull-right" data-ng-show="hMenuReplace == 0"></i><span class="pull-right-container" data-ng-show="hMenuReplace >= 1">
          <span class="label label-primary pull-right">งานใหม่</span>

						</a>
						<ul class="treeview-menu">
							<li>
								<a href="#/replace-list" data-ng-click="setMenuClick();">
									<i class="fa fa-angle-double-right"></i> <span data-translate>งานสั่งซื้อทดแทน</span><span class="pull-right-container" data-ng-show="hMenuReplace >= 1">
              <small class="label pull-right bg-red">{{hMenuReplace}}</small>
            </span>
								</a>
							</li>
              <li>
								<a href="#/p-replace-list" data-ng-click="setMenuClick();">
									<i class="fa fa-angle-double-right"></i> <span data-translate>รายการที่กำลังสั่งซื้อทดแทน</span>
								</a>
							</li>
							<li>
								<a href="#/replace-history" data-ng-click="setMenuClick();">
									<i class="fa fa-angle-double-right"></i> <span data-translate>ประวัติการสั่งซื้อทดแทน</span>
								</a>
							</li>

						</ul>
					</li>
          <li class="treeview" id="riskSurveyMenu" data-ng-show="user_status == 'head_admin'">
						<a href="#">
							<i class="fa fa-info-circle"></i>
							<span data-translate>ต่อประกัน</span>
							<i class="fa fa-angle-left pull-right"></i>
						</a>
            <ul class="treeview-menu">
							<li>
								<a href="#/insure-list" data-ng-click="setMenuClick();">
									<i class="fa fa-angle-double-right"></i> <span data-translate>งานต่อประกัน</span>
								</a>
							</li>
              <li>
								<a href="#/p-insure-list" data-ng-click="setMenuClick();">
									<i class="fa fa-angle-double-right"></i> <span data-translate>รายการที่กำลังต่อประกัน</span>
								</a>
							</li>
							<li>
								<a href="#/insure-history" data-ng-click="setMenuClick();">
									<i class="fa fa-angle-double-right"></i> <span data-translate>ประวัติการต่อประกัน</span>
								</a>
							</li>

						</ul>

					</li>
					<li class="treeview" data-ng-show="user_status=='head_admin'">
						<a href="#">
							<i class="fa fa-cogs"></i>
							<span data-translate>เมนู</span>
							<i class="fa fa-angle-left pull-right"></i>
						</a>
						<ul class="treeview-menu">
							<li>
								<a href="#/company" data-ng-click="setMenuClick();">
									<i class="fa fa-angle-double-right"></i> <span data-translate>ชื่อผู้ขาย/ผู้ผลิต/ผู้บริจาค</span>
								</a>
							</li>

						</ul>
					</li>

          <!-- พัสดุเมนู -->
          <li class="treeview" data-ng-show="user_status == 'p_user'">
						<a href="#">
							<i class="fa fa-share"></i>
							<span data-translate>ส่งซ่อมนอก</span>
							<i class="fa fa-angle-left pull-right"></i>
						</a>
						<ul class="treeview-menu">
							<li>
								<a href="#/p-repair-list" data-ng-click="setMenuClick();">
									<i class="fa fa-angle-double-right"></i> <span data-translate>งานส่งซ่อมนอก</span>
								</a>
							</li>
							<li>
								<a href="#/repair-history" data-ng-click="setMenuClick();">
									<i class="fa fa-angle-double-right"></i> <span data-translate>ประวัติส่งซ่อมนอก</span>
								</a>
							</li>
						</ul>
					</li>
          <li class="treeview" id="riskSurveyMenu" data-ng-show="user_status == 'p_user'">
						<a href="#">
							<i class="fa fa-money"></i>
							<span data-translate>สั่งซื้อทดแทน</span>
							<i class="fa fa-angle-left pull-right"></i>
						</a>
						<ul class="treeview-menu">
              <li>
								<a href="#/p-replace-list" data-ng-click="setMenuClick();">
									<i class="fa fa-angle-double-right"></i> <span data-translate>รายการที่กำลังสั่งซื้อทดแทน</span>
            </span>
								</a>
							</li>
							<li>
								<a href="#/replace-history" data-ng-click="setMenuClick();">
									<i class="fa fa-angle-double-right"></i> <span data-translate>ประวัติการสั่งซื้อทดแทน</span>
								</a>
			</li>

						</ul>
					</li>
          <li class="treeview" data-ng-show="user_status=='head_admin'||user_status == 'p_user'">
						<a href="#">
							<i class="fa fa-desktop"></i>
							<span data-translate>ครุภัณฑ์</span>
							<i class="fa fa-angle-left pull-right"></i>
						</a>
						<ul class="treeview-menu">
							<li>
								<a href="#/durable-list" data-ng-click="setMenuClick();">
									<i class="fa fa-angle-double-right"></i> <span data-translate>รายการครุภัณฑ์</span>
								</a>
							</li>
							<li>
              <a href="#/durable-move" data-ng-click="setMenuClick();">
									<i class="fa fa-angle-double-right"></i> <span data-translate>รายการยืม/ย้าย</span>
								</a>
							</li>
						</ul>
					</li>

				</ul>
			</div>
		</div>

		<!-- ######################################## [ END ] SIDE MENU BAR ######################################## -->

		<!-- ######################################## [ Start ] CONTENT ######################################## -->
		<div class="right-side" data-ng-view>

		</div>
		<!-- ######################################## [ END ] CONTENT ######################################## -->
	</div>

	<a href="#" id="btn-scroll-up" class="btn-scroll-up btn btn-small btn-inverse">
		<i class="icon-double-angle-up icon-only bigger-110"></i>
	</a>

	<!-- ################################### JS LIB IMPORT ################################### -->
	<!-- JQUERY SCRIPTS -->
	<!--[if !IE]>-->
	<script type="text/javascript">
		window.jQuery || document.write("<script src='lib/jquery/jquery-2.0.3.min.js'>"+"<"+"/script>");
	</script>
	<!--<![endif]-->

	<!--[if IE]>
	<script type="text/javascript">
	 	window.jQuery || document.write("<script src='lib/jquery/jquery-1.10.2.min.js'>"+"<"+"/script>");
	</script>
	<![endif]-->

	<script type="text/javascript">
		if("ontouchend" in document) document.write("<script src='lib/jquery/jquery.mobile.custom.min.js'>"+"<"+"/script>");
	</script>

	<script src="lib/jquery/jquery-ui-1.10.4.custom.min.js"></script>
	<script src="lib/jquery/jquery.ui.touch-punch.min.js"></script>

	<!-- DATATABLE SCRIPTS -->
	<script src="lib/datatable/jquery.dataTables.min.js"></script>
	<script src="lib/datatable/DT_bootstrap.js"></script>

	<!-- SCROLL SCRIPTS -->
	<script src="lib/scroll/jquery.slimscroll.js"></script>

	<!-- TEXTAREA AUTO SIZE SCRIPTS -->
	<script src="lib/textarea/jquery.textareaAutoResize.js"></script>

	<!-- JQUERY GRITTER SCRIPTS -->
	<script src="lib/gritter/jquery.gritter.min.js"></script>

	<!-- SWITCH LANGUAGE SCRIPTS -->
	<script src="lib/jquery-lang/jquery-lang.js"></script>
	<script src="lib/jquery-lang/langpack/Lc.js"></script>

	<!-- BOOTSTRAP SCRIPTS -->
    <script src="lib/bootstrap/bootstrap.js"></script>
	<script src="lib/bootstrap/bootstrap-datepicker.js"></script>
	<script src="lib/bootstrap/bootstrap-fileupload.js"></script>
	<script src="lib/bootstrap/bootstrap-paginator.js"></script>

	<!-- BOOTSTRAP-SWITCH -->
	<script src="lib/bootstrap-switch/js/bootstrap-switch.min.js"></script>

	<!-- SELECT2 SCRIPTS -->
	<script src="lib/select2/select2.js"></script>

	<!-- MULTISELECT SCRIPTS -->
	<script src="lib/multiselect/jquery.multi-select.js"></script>
	<script src="lib/multiselect/jquery.quicksearch.js"></script>

	<!-- ADMINLTE APP -->
	<script src="lib/admin-lte/admin-lte.js"></script>

	<!-- MOMENT SCRIPTS -->
	<script src="lib/moment/moment.min.js"></script>
	<script src="lib/moment/livestamp.min.js"></script>

	<!-- UNDERSCORE SCRIPTS -->
	<script src="lib/underscore/underscore-min.js"></script>
	<script src="lib/underscore/underscore-mixin.js"></script>

	<!-- DYNATREE SCRIPTS -->
	<script src="lib/dynatree/jquery.dynatree.js"></script>

	<!-- ANGULAR SCRIPTS -->
	<script src="lib/angular/angular.js"></script>
	<script src="lib/angular/angular-route.js"></script>
	<script src="lib/angular/angular-animate.js"></script>

	<!-- ANGULAR UI SCRIPTS -->
	<script src="lib/angular-ui/ui-utils/ui-utils.js"></script>
	<script src="lib/angular-ui/ui-select2/select2.js"></script>
	<script src="lib/angular-ui/ui-bootstrap/ui-bootstrap-0.8.0.js"></script>

	<!-- ANGULAR TRANSLATE -->
	<script src="lib/angular-translate/angular-translate.js"></script>
	<script src="lib/angular-translate/angular-translate-storage-cookie.js"></script>
	<script src="lib/angular-translate/angular-translate-storage-local.js"></script>

	<!-- SECURITY SCRIPTS -->
	<script src="js/common/security/authorization.js"></script>
	<script src="js/common/security/interceptor.js"></script>
	<script src="js/common/security/security.js"></script>

	<!-- SERVICES SCRIPTS -->
	<script src="js/common/services/httpRequestTracker.js"></script>

	<!-- FULL CALENDAR -->
	<script src="lib/fullcalendar/fullcalendar.min.js"></script>

	<!-- CONFIG SCRIPT -->
	<script src="config/constants.js"></script>

	<!-- I-CHECK SCRIPT -->
	<script src="lib/icheck/icheck.js"></script>

	<!-- BOOTSTRAP-DATETIMEPICKER -->
	<script src="lib/bootstrap-datetimepicker/js/bootstrap-datetimepicker.js"></script>

	<!-- CONTRALLER SCRIPTS -->
	<script src="js/app.js"></script>
       	<script src="js/filters.js"></script>
       	<script src="js/directives.js"></script>
       	<script src="js/dialog.js"></script>
       	<script src="js/myFunction.js"></script>
       	<script src="js/functions.js"></script>
	<!-- <script src="js/myFunction.js"></script> -->


	<!-- ################### STATE ADMIN ################ -->

	<!-- HOME DASHBOARD -->
	<script src="js/controllers/home-dashboard.js"></script>

	<!-- ALL WORK -->
	<script src="js/controllers/remain.js"></script>
	<script src="js/controllers/completed.js"></script>

	<!-- REPAIR WORK -->
		<script src="js/controllers/repair.js"></script>
    <!-- JOB DETAIL -->
    <script src="js/controllers/job.js"></script>
    <script src="js/controllers/order.js"></script>
    <script src="js/controllers/replacement.js"></script>

    <script src="js/controllers/claim.js"></script>


	<!-- ############## STATE USER ##################### -->
		<script src="js/controllers/user.js"></script>
		<script src="js/controllers/fix.js"></script>


	<!-- APPLICATION -->
	<script src="js/controllers/all-request-list.js"></script>

	<!-- APPLICATION -->
	<script src="js/controllers/all-application-list.js"></script>
	<script src="js/controllers/cancel-application.js"></script>
	<script src="js/controllers/edit-application.js"></script>

	<!-- POLICY -->
	<script src="js/controllers/all-policy-list.js"></script>
	<script src="js/controllers/delivery-list.js"></script>
	<script src="js/controllers/lapse-policy-list.js"></script>
	<script src="js/controllers/renewal-list.js"></script>

	<!-- INTERFACE -->
	<script src="js/controllers/interface-log.js"></script>
	<script src="js/controllers/interface-column.js"></script>
	<script src="js/controllers/interface-profile.js"></script>

	<!-- COMMISSION -->
	<script src="js/controllers/commission-list.js"></script>
	<script src="js/controllers/commission-setup.js"></script>
	<script src="js/controllers/commission-type.js"></script>

	<!-- PAYMENT -->
	<script src="js/controllers/open-close-batch.js"></script>
	<script src="js/controllers/batch-open-list.js"></script>

	<!-- ABNORMAL DEMAND -->
	<script src="js/controllers/abnormal-demand.js"></script>

	<!-- PARAMETER SETUP -->
	<script src="js/controllers/parameter-setup.js"></script>

	<!-- CALENDAR SETUP -->
	<script src="js/controllers/calendar-setup.js"></script>

	<!-- LOCAL EVENT -->
	<script src="js/controllers/local-event.js"></script>

	<!-- NEW STORE MODEL -->
	<script src="js/controllers/new-store-model.js"></script>

	<!-- SYSTEM SETUP -->
	<script src="js/controllers/user-profile.js"></script>
	<script src="js/controllers/admin-printing-setup.js"></script>
	<script src="js/controllers/admin-user.js"></script>
	<script src="js/controllers/admin-role.js"></script>
	<script src="js/controllers/admin-list-of-value.js"></script>
  <script src="js/controllers/admin-schedule-job.js"></script>
	<script src="js/controllers/admin-job-log.js"></script>
	<script src="js/controllers/admin-error-message.js"></script>
  <script src="js/controllers/listOfValue.js"></script>
  <script src="js/controllers/durable.js"></script>
  <script src="js/controllers/insure.js"></script>
    <script src="js/controllers/maintenance.js"></script>



	<!--POPUP -->
	<script src="js/controllers/popup/remain/remainPopup.js"></script>
  <script src="js/controllers/popup/remain/sendToPopup.js"></script>
  <script src="js/controllers/popup/remain/finishJob-popup.js"></script>
  <script src="js/controllers/popup/remain/deliver-popup.js"></script>


  <script src="js/controllers/popup/user/user-popup.js"></script>
  <script src="js/controllers/popup/admin/confirmDelete-popup.js"></script>
  <script src="js/controllers/popup/admin/confirmJob-popup.js"></script>
  <script src="js/controllers/popup/admin/orderList-popup.js"></script>
  <script src="js/controllers/popup/admin/insureList-popup.js"></script>.

  <script src="js/controllers/popup/admin/orderSerailNo-popup.js"></script>
  <script src="js/controllers/popup/lov/company-popup.js"></script>
  <script src="js/controllers/popup/lov/durable-popup.js"></script>
  <script src="js/controllers/popup/admin/edit-status-popup.js"></script>
  <script src="js/controllers/popup/admin/order-accept.js"></script>






	<!-- RISK SURVEY -->
	<script src="js/controllers/all-review.js"></script>
	<script src="js/controllers/surveyor-todo.js"></script>
	<script src="js/controllers/underwriter-todo.js"></script>

	<!-- DELIVERY MANAGEMENT -->
	<script src="js/controllers/delivery-management.js"></script>

	<!-- RETURN PAYMENT MANAGEMENT -->
	<script src="js/controllers/return-payment-management.js"></script>

	<!-- ################################### JS LIB IMPORT ################################### -->

	<!--INLINE SCRIPTS RELATED TO THIS PAGE-->
	<script type="text/javascript">


$(document).on("click", "a.deleteText", function() {
    //if (confirm('Are you sure ?')) {
window.location.replace("logout.php");
//}
});


		$(function() {

			$('#sidebar > .nav > li > a').click(function(){
				$(this).parents().siblings().removeClass('open').find('.submenu').css('display','none');
				$(this).parents().siblings().find('b').removeClass('icon-angle-up').addClass('icon-angle-down');
			});

			$('#sidebar .dropdown-toggle').click(function(){
				$(this).find('b').toggleClass('icon-angle-down icon-angle-up');
				if( !$(this).parents().hasClass('open') ) {
					$(this).parents().parents().find('li:not(.open) b').removeClass('icon-angle-up').addClass('icon-angle-down');
				}
			});

			/*var getURL = document.URL;
			var cutURL = getURL.split('#');
			if( typeof(cutURL[1]) != 'undefined'){
				var attrVal = cutURL[1].split('?');

				attrVal[0] = attrVal[0].replace("-detail"," ");

				var tagAttr = '#'+attrVal[0].substr(1);
				var tagElement = $('#sidebar').find('a[href^='+tagAttr+']');

				tagElement.parents().parents().prev('a').click();
				tagElement.click();
			}else{
				$('#sidebar').find('li:eq(0)').addClass('active');
			}*/

			$('#sidebar>ul>li').click(function(){
				if( $('#sidebar').hasClass('display') ) {
					$('#sidebar').removeClass('display');
					$('#menu-toggler').removeClass('display');
				}
			});

			$('#sidebar').on('click','.submenu a',function(){
				$(this).parents().parents().parents().find('li.active').addClass('open');
				$(this).parents().siblings().removeClass('open').find('.submenu').css('display','none');
				$(this).parents().parents().parents().siblings().find('.open').removeClass('open');
			});

			// test
			/* $('.dropdown-toggle').click(function() {
				var $ele = $(this).parents();
				if( $ele.hasClass('active') ) {
					$ele.addClass('open');
				}
			}); */

			//initial scroll sidebar
			var height = $(window).height() - 74 ; //best calculate trust me
			$('.nav.nav-list').slimScroll({
				height: height
		    });

			//if resize scroll sidebar
			$(window).resize(function() {
				height = $(window).height() - 74;
				$('.nav.nav-list').css('max-height',height);
			});

			$("#sidebar-collapse").click(function() {
				if ($(".nav.nav-list").parent().hasClass("slimScrollDiv")) {
					$(".nav.nav-list").parent().replaceWith($(".nav.nav-list"));
					$(".nav.nav-list").removeAttr("style");
				} else {
					$('.nav.nav-list').slimScroll({
						height: $(window).height()
				    });
				}
			});

		});
	</script>

	<!-- ###################################  [START] LOADING INDICATOR ################################### -->
	<!-- <div id="loading" data-ng-show="httpRequestTracker.hasPendingRequests()">
		<div class="modal-backdrop fade in" style="z-index: 5000;"></div>
		<div style="position: absolute; left: 45%; top: 275px; z-index: 10000;">
			<img src="img/ajax-loader.gif">
		</div>
	</div> -->
	<!-- ###################################  [ END ] LOADING INDICATOR ################################### -->


</body>
</html>
