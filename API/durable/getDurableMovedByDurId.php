<?php
require "../../includes/db.php";

 $dur_id = $_GET['dur_id'];

$tsql = "SELECT dm_dur_id FROM tblDurableMoved

WHERE dm_dur_id = '$dur_id'
AND dm_status != '2'
GROUP BY dm_dur_id";

$stmt = sqlsrv_query( $conn, $tsql);

if( $stmt === false ) {
     echo "Error in executing query.</br>";
     die( print_r( sqlsrv_errors(), true));
}

/* Process results */
$json = array();

do {
     while ($row = sqlsrv_fetch_array($stmt, SQLSRV_FETCH_ASSOC)) {
     $json   = $row;
     echo "1";
     }
} while ( sqlsrv_next_result($stmt) );

/* Run the tabular results through json_encode() */
/* And ensure numbers don't get cast to trings */
/* Free statement and connection resources. */
sqlsrv_free_stmt( $stmt);
sqlsrv_close( $conn);
?>
