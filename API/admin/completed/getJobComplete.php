<?php
require "../../../includes/db.php";

$user_id = $_GET['user_id'];
$page_number = $_GET['page_number'];
$page_calT = $page_number * 15;
$page_calF = $page_calT-15;

$tsql = "SELECT  *
FROM    ( SELECT    ROW_NUMBER() OVER ( ORDER BY tbjs.job_id DESC) AS RowNum, *
FROM tblJobSuccess tbjs
WHERE tbjs.officer_finish = '$user_id'
) AS rowJss
LEFT JOIN tblJob tbj ON rowJss.job_id=tbj.job_id
WHERE   RowNum > '$page_calF'
    AND RowNum <= '$page_calT'
	AND tbj.job_status = '99'
ORDER BY RowNum";

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
