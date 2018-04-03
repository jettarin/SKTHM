<?php
require "../../includes/db.php";

$job_header = $_GET['job_header'];
$job_desc = $_GET['job_desc'];
$job_dep_of_durable = $_GET['job_dep_of_durable'];
$job_dep_of_durable = $_GET['job_dep_of_durable'];
$job_dur_id = $_GET['job_dur_id'];
$job_user_id = $_GET['job_user_id'];
$job_date_created = $_GET['job_date_created'];
$job_time_created = $_GET['job_time_created'];
$job_tell = $_GET['job_tell'];
$job_type= $_GET['job_type'];

$tsql = "INSERT INTO tblJob (job_header,
                              job_desc,
                              job_user_id,
                              job_dep_of_durable,
                              job_dur_id,
                              job_date_created,
                              job_time_created,
                              job_tell,
                              job_type)
                      VALUES ('$job_header',
                              '$job_desc',
                              '$job_user_id',
                              '$job_dep_of_durable',
                              '$job_dur_id',
                              '$job_date_created',
                              '$job_time_created',
                              '$job_tell',
                              '$job_type')";

$stmt = sqlsrv_query( $conn, $tsql);
if( $stmt === false ) {
     echo "0";
     
}else{
  echo "1";
  $update = "UPDATE tblDurable SET dur_status='1' WHERE dur_id='$job_dur_id'";
  $stmtup = sqlsrv_query( $conn, $update);
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
