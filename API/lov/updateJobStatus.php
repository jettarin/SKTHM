<?php
require "../../includes/db.php";


$job_id = $_GET['job_id'];
$job_status = $_GET['job_status'];
$job_last_status = $_GET['job_last_status'];
$officer_id = $_GET['officer_id'];


$tsql = "UPDATE tblJob SET job_status = '$job_status',job_last_status = '$job_last_status',job_acc_by_new = '$officer_id' WHERE job_id = '$job_id'";

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
