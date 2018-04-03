<?php
require "../../includes/db.php";


$dur_id = $_GET['dur_id'];
$dur_dis = $_GET['dur_dis'];
if($dur_dis == "1"){
  $dur_dis = "0";
}else if($dur_dis == "0"){
  $dur_dis = "1";
}

$tsql = "UPDATE tblDurable SET dur_dis = '$dur_dis' WHERE dur_id = '$dur_id'";
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
