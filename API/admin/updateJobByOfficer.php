<?php
require "../../includes/db.php";

$job_acc_by = $_GET['job_acc_by'];
$job_acc_status = '1';
$job_status = '1';
$job_id = $_GET['job_id'];
$job_date_acc = $_GET['job_date_acc'];
$job_time_acc = $_GET['job_time_acc'];


$tsql = "UPDATE tblJob SET job_acc_by = '$job_acc_by',job_acc_by_new = '$job_acc_by',job_acc_status = '$job_acc_status',job_date_acc = '$job_date_acc',job_time_acc = '$job_time_acc',job_status = '$job_status' WHERE job_id = '$job_id'";

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
