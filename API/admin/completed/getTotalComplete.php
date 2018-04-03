<?php
require "../../../includes/db.php";

$user_id = $_GET['user_id'];


$tsql = "SELECT  COUNT(tbj.job_id) AS totalC FROM tblJob tbj
LEFT JOIN tblJobSuccess tbjs ON tbjs.job_id=tbj.job_id
WHERE tbj.job_delete_status != '1' AND tbj.job_status = '99' AND tbjs.officer_finish = '$user_id'";
$stmt = sqlsrv_query( $conn, $tsql);

if( $stmt === false ) {
     echo "Error in executing query.</br>";
     die( print_r( sqlsrv_errors(), true));
}

/* Process results */
$json = array();

do {
     while ($row = sqlsrv_fetch_array($stmt, SQLSRV_FETCH_ASSOC)) {
     $json = $row;
     }
} while ( sqlsrv_next_result($stmt) );

/* Run the tabular results through json_encode() */
/* And ensure numbers don't get cast to trings */
echo json_encode($json);
/* Free statement and connection resources. */
sqlsrv_free_stmt( $stmt);
sqlsrv_close( $conn);
?>
