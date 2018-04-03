<?php
session_start();
require_once 'includes/db_per.php';
/* TSQL Query */


$username = $_POST['username'];
$password = $_POST['password'];
// $pwdMD = md5($password);



/* TSQL Query */
// $sql = "SELECT * FROM tblPersonal WHERE Mem_ID='$username' AND Password = '$pwdMd'";
$sql = "SELECT * FROM tblPersonal WHERE Mem_ID='$username' AND Password = '$password'";

$req =  sqlsrv_query($conn, $sql) or die(print_r(sqlsrv_errors(),true));

if(sqlsrv_has_rows($req) != 1){
    $message = "Wrong Password !";
    echo "<meta http-equiv='refresh' content='2;URL=login.html'>";
}else{



	   $message =  "Login Successful !!";
    while($data = sqlsrv_fetch_array($req, SQLSRV_FETCH_ASSOC)){

    	if($data['Permiss_SKTHM'] == 0){
    		$_SESSION['ses_status'] = "user";
    	}else if($data['Permiss_SKTHM'] == 1){
    		$_SESSION['ses_status'] = "admin";
    	}else if($data['Permiss_SKTHM'] == 2){
    		$_SESSION['ses_status'] = "head_admin";
    	}

    	$_SESSION['ses_id'] = session_id();
        $_SESSION['Mem_ID'] = $data['Mem_ID'];

        $_SESSION['firstName'] = $data['Mem_name'];
        $_SESSION['lastName'] = $data['Mem_lastname'];
        $_SESSION['Pre_name'] = $data['Pre_name'];
        // echo "</br>";
        // echo "By".$data['Mem_name']." ".$data['Mem_lastname'];
        echo "<meta http-equiv='refresh' content='4;URL=index.php'>";



		}

        // echo "SESSION Mem_ID  =".$_SESSION['Mem_ID'];



}
/* Free statement and connection resources. */
sqlsrv_free_stmt( $req);
sqlsrv_close( $conn);
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

  <!-- Font Awesome -->
  <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.5.0/css/font-awesome.min.css">
  <!-- Ionicons -->
  <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/ionicons/2.0.1/css/ionicons.min.css">
  <!-- Theme style -->
  <link rel="stylesheet" href="lib/square/AdminLTE.css"/>  <!-- iCheck -->
  <link rel="stylesheet" href="lib/square/blue.css"/>

</head>
<body class="hold-transition login-page">
<div class="login-box">
  <div class="login-logo">
    <a href="../../index2.html"><b>SKTHM </b>System</a>
  </div>
  <!-- /.login-logo -->
  <div class="login-box-body">
    <p class="login-box-msg">กรอกข้อมูลเพื่อเข้าสู่ระบบ</p>

      <?php echo "<center><img src='img/ajax-loader.gif' alt='Smiley face' ></center>" ?>
    <?php echo "<center>".$message."</center>" ?>

    <div class="social-auth-links text-center">
      <p>- OR -</p>
      <a href="#" class="btn btn-block btn-social btn-facebook btn-flat"><i class="fa fa-facebook"></i> Sign in using
        Facebook</a>
      <a href="#" class="btn btn-block btn-social btn-google btn-flat"><i class="fa fa-google-plus"></i> Sign in using
        Google+</a>
    </div>
    <!-- /.social-auth-links -->

    <a href="#">I forgot my password</a><br>
    <a href="register.html" class="text-center">Register a new membership</a>

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
</body>
</html>
