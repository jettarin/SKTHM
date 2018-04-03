<?php
require "../../includes/db.php";

$dur_id = $_GET['dur_id'];



$tsql = "DELETE FROM tblDurable WHERE dur_id = '$dur_id'";
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
