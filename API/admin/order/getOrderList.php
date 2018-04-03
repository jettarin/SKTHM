<?php
require "../../../includes/db.php";

$job_id = $_GET['job_id'];
$dur_id = $_GET['dur_id'];

$tsql = "SELECT *  FROM tblOrder  WHERE order_job_id='$job_id' AND order_dur_id = '$dur_id' ORDER BY order_id";
$stmt = sqlsrv_query( $conn, $tsql);

if( $stmt === false ) {
     echo "Error in executing query.</br>";
     die( print_r( sqlsrv_errors(), true));
}

/* Process results */
$json = array();

do {
     while ($row = sqlsrv_fetch_array($stmt, SQLSRV_FETCH_ASSOC)) {
     $json [] = $row;
     }
} while ( sqlsrv_next_result($stmt) );

/* Run the tabular results through json_encode() */
/* And ensure numbers don't get cast to trings */
echo json_encode($json);
/* Free statement and connection resources. */
sqlsrv_free_stmt( $stmt);
sqlsrv_close( $conn);
?>
