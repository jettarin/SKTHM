<?php
require "../../includes/db.php";

$dm_id = $_GET['dm_id'];



$tsql = "DELETE FROM SKTHM.dbo.tblDurableMoved WHERE dm_id = '$dm_id'";
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
