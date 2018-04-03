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
    echo "Wrong Password !";
    echo "<meta http-equiv='refresh' content='2;URL=login.html'>";
}else{




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
        $_SESSION['Cost_id'] = $data['Cost_id'];
        echo "</br>";
        echo "</br>";
        echo "<center><h3 style='color:green'>ยินดีต้อนรับ ".$data['Pre_name'].$data['Mem_name']." ".$data['Mem_lastname']."</h3></center>";
        echo "<center><img src='img/ajax-loader.gif'></center>";
        echo "<meta http-equiv='refresh' content='4;URL=index.php'>";



		}

        // echo "SESSION Mem_ID  =".$_SESSION['Mem_ID'];



}
/* Free statement and connection resources. */
sqlsrv_free_stmt( $req);
sqlsrv_close( $conn);
?>
