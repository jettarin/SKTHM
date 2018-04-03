<?php
require "../../../includes/db.php";



$page_number = $_GET['page_number'];
$page_calT = $page_number * 15;
$page_calF = $page_calT-15;
$numoe = $_GET['dur_numoe'];
if($numoe == undefined){
  $numoe = '%';
}
$dur_naoe = $_GET['dur_naoe'];
if($dur_naoe == undefined){
  $dur_naoe = '%';
}
$dep = $_GET['dep'];
if($dep == undefined){
  $dep = '%';
}
$date_f = $_GET['date_f'];
$date_t = $_GET['date_t'];

$tsql1 = "SELECT  *
FROM    ( SELECT    ROW_NUMBER() OVER ( ORDER BY tbj.job_id DESC) AS RowNum, *
FROM tblJob tbj
LEFT JOIN tblDurable tbd ON tbd.dur_id = tbj.job_dur_id
WHERE tbj.job_status = '8'
AND tbj.job_delete_status != '1'
AND tbd.dur_numoe LIKE '%$numoe%'
AND tbd.dur_naoe LIKE '%$dur_naoe%'
AND tbj.job_dep_of_durable LIKE '$dep'";
$tsql2 =  " ) AS rowJss WHERE   RowNum > '$page_calF'
   AND RowNum <= '$page_calT'
ORDER BY RowNum";
$where_date = " AND tbj.job_date_created BETWEEN '$date_f' AND '$date_t'";
if($date_f == undefined){
  $tsqlN = $tsql1.$tsql2;
  $stmt = sqlsrv_query( $conn, $tsqlN);
}else{
  $tsqlN = $tsql1.$where_date.$tsql2;
  $stmt = sqlsrv_query( $conn, $tsqlN);
}

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
