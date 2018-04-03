<?php
require "../../../includes/db.php";


$job_id = $_GET['job_id'];

$tsql = "UPDATE tblJob SET job_status = '1' WHERE job_id = '$job_id'";
$stmt = sqlsrv_query( $conn, $tsql);
if( $stmt === false ) {
     echo "0 ";
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
