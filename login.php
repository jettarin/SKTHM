<?php
session_start();
require_once 'includes/db_per.php';
/* TSQL Query */
error_reporting( error_reporting() & ~E_NOTICE );

$username = $_POST['username'];
// $password = $_POST['password'];
$password = md5($_POST['password']);



/* TSQL Query */
// $sql = "SELECT * FROM tblPersonal WHERE Mem_ID='$username' AND Password = '$pwdMd'";
if($username == null){
  $loginStatus = 'N';
}else{
  $sql = "SELECT * FROM tblPersonal WHERE Mem_ID='$username' AND Password = '$password'";

  $req =  sqlsrv_query($conn, $sql) or die(print_r(sqlsrv_errors(),true));

  if(sqlsrv_has_rows($req) != 1){
        $loginStatus = '0';
  }else{

        $loginStatus = '1';


      while($data = sqlsrv_fetch_array($req, SQLSRV_FETCH_ASSOC)){

      	if($data['Permiss_SKTHM'] == 0){
      		$_SESSION['ses_status'] = "user";
          $_SESSION['ses_user_extra'] = 0;
      	}else if($data['Permiss_SKTHM'] == 1){
      		$_SESSION['ses_status'] = "admin";
          $_SESSION['ses_user_extra'] = 0;
      	}else if($data['Permiss_SKTHM'] == 2){
      		$_SESSION['ses_status'] = "head_admin";
          $_SESSION['ses_user_extra'] = 0;
      	}else  if($data['Permiss_SKTHM'] == 9){
          $_SESSION['ses_status'] = "user";
          $_SESSION['ses_user_extra'] = 1;
        }
      	  $_SESSION['ses_id'] = session_id();
          $_SESSION['Mem_ID'] = $data['Mem_ID'];
          $_SESSION['firstName'] = $data['Mem_name'];
          $_SESSION['lastName'] = $data['Mem_lastname'];
          $_SESSION['Pre_name'] = $data['Pre_name'];
          $_SESSION['Cost_id'] = $data['Cost_id'];
          $_SESSION['Cost_SKTHM'] = $data['Cost_SKTHM'];
  		}
          // echo "SESSION Mem_ID  =".$_SESSION['Mem_ID'];
  }
  sqlsrv_free_stmt( $req);
  sqlsrv_close( $conn);
}

/* Free statement and connection resources. */

?>
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <meta http-equiv="X-UA-Compatible" content="IE=edge">
  <title>SKTHM | Log in</title>
  <!-- Tell the browser to be responsive to screen width -->
  <meta content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no" name="viewport">
  <!-- Bootstrap 3.3.6 -->
    <link rel="stylesheet" href="lib/bootstrap/bootstrap.min.css"/>
    <link rel="shortcut icon" href="img/logo.jpg" />

  <!-- Font Awesome -->
  <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.5.0/css/font-awesome.min.css">
  <!-- Ionicons -->
  <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/ionicons/2.0.1/css/ionicons.min.css">
  <!-- Theme style -->
  <link rel="stylesheet" href="lib/square/AdminLTE.css"/>  <!-- iCheck -->
  <link rel="stylesheet" href="lib/square/blue.css"/>

  <!-- HTML5 Shim and Respond.js IE8 support of HTML5 elements and media queries -->
  <!-- WARNING: Respond.js doesn't work if you view the page via file:// -->
  <!--[if lt IE 9]>
  <script src="https://oss.maxcdn.com/html5shiv/3.7.3/html5shiv.min.js"></script>
  <script src="https://oss.maxcdn.com/respond/1.4.2/respond.min.js"></script>
  <![endif]-->
</head>
<body class="hold-transition login-page">
<div class="login-box">
  <div class="login-logo">
    <a href=""><b style="font-size: 45px;">ระบบบริหารงาน</b><br><b>แจ้งซ่อม</b> ออนไลน์</a></a>
  </div>
  <!-- /.login-logo -->
  <div class="login-box-body">
    <p class="login-box-msg">กรอกข้อมูลเพื่อเข้าสู่ระบบ</p>
    <form action="login.php" method="post">
      <div class="form-group has-feedback">
        <input type="username" name="username" id="username" class="form-control" placeholder="Username">
      </div>
      <div class="form-group has-feedback">
        <input type="password" name="password" class="form-control" placeholder="Password">
      </div>
      <div class="row">
        <div class="col-xs-8">
          <label><a href="http://192.168.0.10/irs/frmSearchID.aspx" target="_blank">ลืมชื่อผู้ใช้งาน</a></label>
        </div>
        <!-- /.col -->
        <div class="col-xs-4">
          <button type="submit" class="btn btn-primary btn-block btn-flat">เข้าสู่ระบบ</button>
        </div>
        <!-- /.col -->
      </div>
      <br>

    </form>

    <?php

    if($loginStatus == '1'){
      echo "<center><h4 style='color:green'>ยินดีต้อนรับ </br>".$_SESSION['Pre_name'].  $_SESSION['firstName']." ".$_SESSION['lastName']."</h4></center>";
      echo "<center><img src='img/ajax-loader.gif'></center>";
      echo "<meta http-equiv='refresh' content='4;URL=index.php'>";
    }else if($loginStatus == '0'){
      echo "<center><h4 style='color:red;'>ชื่อหรือรหัสไม่ถูกต้อง</h4></center>";
    }else{
      echo "<center><h4 style='color:orange;'>กรุณากรอกข้อมูลเพื่อเข้าสู่ระบบ</h4></center>";
    }
     ?>
    <!-- /.social-auth-links -->
  </div>
  <div style="text-align: right;">
    <h5>Powered  by <img src="img/angularjs.png" height="30" alt=""></h5>
  </div>
  <!-- /.login-box-body -->
</div>
<!-- /.login-box -->




<!-- jQuery 2.2.0 -->
<script src='lib/jquery/jquery-2.0.3.min.js'></script>
<!-- Bootstrap 3.3.6 -->
<script src="lib/bootstrap/bootstrap.js"></script>
<!-- iCheck -->

  <script src="lib/icheck/icheck.js"></script>

<script>
  $(function () {
    $('input').iCheck({
      checkboxClass: 'icheckbox_square-blue',
      radioClass: 'iradio_square-blue',
      increaseArea: '20%' // optional
    });
  });
</script>
<script>
$( document ).ready(function() {
  $( "#username" ).focus();


});
</script>

</body>
</html>
