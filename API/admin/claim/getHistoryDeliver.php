<?php
require "../../../includes/db.php";


$dur_id = $_GET['dur_id'];
$job_id = $_GET['job_id'];
// เลือกงานที่ถูกร้องขอส่งซ่อม แต่ยังไมส่งซ่อมนอก่
$tsql = "SELECT * FROM tblDeliver tbd
         LEFT JOIN tblCompany tbc ON tbc.com_id = tbd.deli_company
         WHERE tbd.deli_dur_id='$dur_id' AND tbd.deli_job_id = '$job_id'";
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
