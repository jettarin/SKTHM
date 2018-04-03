<?php
require "../../includes/db.php";

$com_name = $_GET['com_name'];
$com_address = $_GET['com_address'];
$com_tell = $_GET['com_tell'];


$tsql = "INSERT INTO tblCompany (com_name,
                              com_address,
                              com_tell)
                      VALUES ('$com_name',
                              '$com_address',
                              '$com_tell')";
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
