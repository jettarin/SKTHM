<?php
require "../../includes/db.php";

$dur_id = $_GET['dur_id'];
$job_id = $_GET['job_id'];
$tsql = "SELECT  * FROM tblJob tbj
--LEFT JOIN tblJobSuccess tbjss ON tbjss.job_id = tbj.job_id
LEFT JOIN tblDurable tbd ON tbj.job_dur_id = tbd.dur_id
WHERE tbj.job_dur_id = '$dur_id'
AND tbj.job_id = '$job_id'
AND tbj.job_acc_by_new != '0'
AND job_status !='1'
ORDER BY tbj.job_id ASC ";
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
?>
