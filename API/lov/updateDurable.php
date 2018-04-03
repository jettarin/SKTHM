<?php
require "../../includes/db.php";



$dur_numoe = $_GET['dur_numoe'];
$dur_list = $_GET['dur_list'];
$dur_naoe = $_GET['dur_naoe'];
$dur_company = $_GET['dur_company'];
$dur_price = $_GET['dur_price'];
$dur_tom = $_GET['dur_tom'];
$dur_acquired = $_GET['dur_acquired'];
$dur_department = $_GET['dur_department'];
$dur_year = $_GET['dur_year'];
$dur_id = $_GET['dur_id'];
$dur_dop = $_GET['dur_dop'];

$tsql = "UPDATE tblDurable SET dur_numoe = '$dur_numoe',
                               dur_list = '$dur_list',
                               dur_naoe = '$dur_naoe',
                               dur_company = '$dur_company',
                               dur_price = '$dur_price',
                               dur_tom = '$dur_tom',
                               dur_acquired = '$dur_acquired',
                               dur_department = '$dur_department',
                               dur_year = '$dur_year',
                               dur_dop = DATEADD(day,DATEDIFF(day,dur_dop,'$dur_dop'),dur_dop) WHERE dur_id = '$dur_id'";
                                // echo $tsql;
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
