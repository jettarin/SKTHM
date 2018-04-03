<?php
require "../../includes/db.php";

$com_id = $_GET['com_id'];



$tsql = "DELETE FROM tblCompany WHERE com_id = '$com_id'";
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
