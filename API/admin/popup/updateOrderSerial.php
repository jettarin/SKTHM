<?php
require "../../../includes/db.php";


$data = file_get_contents('php://input');
$dataJsonDecode = json_decode($data);
$order_id = $dataJsonDecode->order_id;
$order_serial = $dataJsonDecode->order_serial;

$tsql = "UPDATE tblOrder SET order_serial = '$order_serial' WHERE order_id = '$order_id'";

$stmt = sqlsrv_query( $conn, $tsql);
if( $stmt === false ) {
  echo "0";
}else{
  echo "1";
}
sqlsrv_free_stmt( $stmt);
sqlsrv_close( $conn);
?>
