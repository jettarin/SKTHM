<?php
require "../../includes/db.php";

if($conn){

  $tsql = "SELECT COUNT(job_id) AS job_order FROM tblJob WHERE job_status = '4' AND job_last_status = '0'";

  // $tsql = "SELECT TOP 10 * FROM (SELECT TOP 20 FROM tblJob ORDER BY job_id) ORDER BY job_id DESC";
  $stmt = sqlsrv_query( $conn, $tsql);

  if( $stmt === false ) {
       echo "Error in executing query.</br>";
       die( print_r( sqlsrv_errors(), true));
  }

  /* Process results */
  $json = array();

  do {
       while ($row = sqlsrv_fetch_array($stmt, SQLSRV_FETCH_ASSOC)) {
       $json  = $row;
       }
  } while ( sqlsrv_next_result($stmt) );

  /* Run the tabular results through json_encode() */
  /* And ensure numbers don't get cast to trings */
  echo json_encode($json);
  /* Free statement and connection resources. */
  sqlsrv_free_stmt( $stmt);
  sqlsrv_close( $conn);
}

?>
