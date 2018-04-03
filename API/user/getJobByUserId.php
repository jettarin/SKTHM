<?php
require "../../includes/db.php";

 $job_dep_of_durable = $_GET['job_dep_of_durable'];

 $page_number = $_GET['page_number'];
$page_calT = $page_number * 10;
$page_calF = $page_calT-10;




$tsql = "SELECT  *
FROM    ( SELECT    ROW_NUMBER() OVER ( ORDER BY job_id DESC) AS RowNum, *
          FROM      tblJob
          WHERE     job_dep_of_durable = '$job_dep_of_durable' AND job_delete_status = '0'
        ) AS RowConstrainedResult
WHERE   RowNum > '$page_calF'
    AND RowNum <= '$page_calT'
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
