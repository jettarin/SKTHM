<?php
require "../../includes/db.php";

$lov_code = $_GET['lov_code'];
$lov_value = $_GET['lov_value'];

$tsql = "SELECT * FROM tblLov WHERE lov_code = '$lov_code' AND lov_value='$lov_value'";

$req =  sqlsrv_query($conn, $tsql) or die(print_r(sqlsrv_errors(),true));

if(sqlsrv_has_rows($req) != 1){


}else{
    while($data = sqlsrv_fetch_array($req, SQLSRV_FETCH_ASSOC)){
        echo $data['lov_description'];
		}
    // echo "SESSION Mem_ID  =".$_SESSION['Mem_ID'];
}
sqlsrv_close( $conn);
?>
