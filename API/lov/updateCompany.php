<?php
require "../../includes/db.php";


$com_id = $_GET['com_id'];
$com_name = $_GET['com_name'];
$com_address = $_GET['com_address'];
$com_tell = $_GET['com_tell'];


$tsql = "UPDATE tblCompany SET com_name = '$com_name' ,com_address = '$com_address',com_tell = '$com_tell' WHERE com_id = '$com_id'";
$stmt = sqlsrv_query( $conn, $tsql);

if( $stmt === false ) {
     echo "Error in executing query.</br>";
     die( print_r( sqlsrv_errors(), true));
}else{
  echo "1";
}


sqlsrv_free_stmt( $stmt);
sqlsrv_close( $conn);
?>
