<?php
require "../../includes/db.php";

// $page_number = $_GET['page_number'];
 $page_number = $_GET['page_number'];
 $dep_id = $_GET['dep_id'];
 if($dep_id == 'undefined'){
   $dep_id = '%';
 }
 $officer_id = $_GET['officer_id'];
 if($officer_id == 'undefined'){
   $officer_id = '%';
 }
 $dur_numoe = $_GET['dur_numoe'];
 if($dur_numoe == 'undefined'){
   $dur_numoe = '%';
 }
 $date_f = $_GET['date_from'];
 if($date_f == undefined){
   $date_f = '2016/01/01';
 }
 $date_t = $_GET['date_to'];
 $d=strtotime("+1 years");
 if($date_t == undefined){
   $date_t = date("Y/m/d", $d);
 }
$page_calT = $page_number * 10;
$page_calF = $page_calT-10;

$tsql = "SELECT  rowJss.*
FROM    ( SELECT    ROW_NUMBER() OVER ( ORDER BY m_id DESC) AS RowNum, *
FROM tblMaintenance tbm
LEFT JOIN tblDurable tbd ON tbd.dur_id = tbm.m_dur_id
WHERE tbm.m_dep_id LIKE '$dep_id'
AND tbm.m_user_id LIKE '$officer_id'
AND tbd.dur_numoe LIKE '%$dur_numoe%'
AND tbm.m_created BETWEEN '$date_f' AND '$date_t'
) AS rowJss
WHERE   RowNum > '$page_calF'
   AND RowNum <= '$page_calT'
ORDER BY m_dep_id DESC";

$stmt = sqlsrv_query( $conn, $tsql);

if( $stmt === false ) {
     echo "Error in executing query.</br>";
     die( print_r( sqlsrv_errors(), true));
}

/* Process results */
$json = array();

do {
     while ($row = sqlsrv_fetch_array($stmt, SQLSRV_FETCH_ASSOC)) {
     $json []  = $row;
     }
} while ( sqlsrv_next_result($stmt) );

/* Run the tabular results through json_encode() */
/* And ensure numbers don't get cast to trings */
echo json_encode($json);
/* Free statement and connection resources. */
sqlsrv_free_stmt( $stmt);
sqlsrv_close( $conn);
?>
