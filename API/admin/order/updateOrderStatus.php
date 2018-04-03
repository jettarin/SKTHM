<?php
require "../../../includes/db.php";


$order_id = $_GET['order_id'];
$order_status = $_GET['order_status'];
if($order_status == 0){
  $order_status = 1;
}else{
  $order_status = 0;
}

$tsql = "UPDATE tblOrder SET order_status = '$order_status' WHERE order_id = '$order_id'";
$stmt = sqlsrv_query( $conn, $tsql);

if( $stmt === false ) {
     echo "Error in executing query.</br>";
     die( print_r( sqlsrv_errors(), true));
}else{
  echo "1";
}

/* Process results */
// $json = array();

// do {
//      while ($row = sqlsrv_fetch_array($stmt, SQLSRV_FETCH_ASSOC)) {
//      $json   = $row;
//      }
// } while ( sqlsrv_next_result($stmt) );

/* Run the tabular results through json_encode() */
/* And ensure numbers don't get cast to trings */
// echo json_encode($json);
/* Free statement and connection resources. */
sqlsrv_free_stmt( $stmt);
sqlsrv_close( $conn);
?>
