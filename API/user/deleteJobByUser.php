

<?php
require "../../includes/db.php";

$job_id = $_GET['job_id'];
$dur_id = $_GET['dur_id'];


$tsql = "UPDATE tblJob SET job_delete_status = '1' WHERE job_id = '$job_id'";
$stmt = sqlsrv_query( $conn, $tsql);
$update = "UPDATE tblDurable SET dur_status = '0' WHERE dur_id = '$dur_id'";
$stmtup = sqlsrv_query( $conn, $update);

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