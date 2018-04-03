<?php
require "../../../includes/db.php";

$job_id = $_GET['job_id'];


$tsql = "SELECT * FROM tblOrder tbo
LEFT JOIN tblDeliver tbd ON tbo.order_id = tbd.deli_order_id
LEFT JOIN tblCompany tbc ON tbd.deli_company = tbc.com_id
WHERE tbo.order_job_id = '$job_id'";
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
