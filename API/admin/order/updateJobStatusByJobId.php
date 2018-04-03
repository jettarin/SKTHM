<?php
require "../../../includes/db.php";

$status_params = $_GET['job_status'];
$job_id = $_GET['job_id'];
$dur_id = $_GET['dur_id'];


$tsql = "UPDATE tblJob SET job_status = '$status_params' WHERE job_id = '$job_id'";

$query = "INSERT INTO tblPaper_printed (dur_id,job_id,status)VALUES ('$dur_id','$job_id','0')";

$stmtQ = sqlsrv_query( $conn, $query);
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
