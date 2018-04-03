<?php
require "../../../includes/db.php";

$page_number = $_GET['page_number'];
$page_calT = $page_number * 15;
$page_calF = $page_calT-15;


$job_header = $_GET['job_header'];
if($job_header==undefined){
  $job_header = "%";
}
 $dur_list = $_GET['dur_list'];
 if($dur_list==undefined){
   $dur_list = "%";
 }
 $dep = $_GET['dep'];
 if($dep==undefined){
   $dep = "%";
 }
 $dur_numoe = $_GET['dur_numoe'];
 if($dur_numoe==undefined){
   $dur_numoe = "%";
 }
 $date_f = $_GET['date_f'];
 if($date_f==undefined){
   $date_search = "0";
 }
 $date_t = $_GET['date_t'];
 if($date_t==undefined){
   $date_search = "0";
 }

// เลือกงานที่ถูกร้องขอส่งซ่อม แต่ยังไมส่งซ่อมนอก่
$tsql = " SELECT  *
FROM tblJob tbj
LEFT JOIN tblDurable tbd ON tbj.job_dur_id = tbd.dur_id
WHERE job_status ='70'
AND tbj.job_header LIKE '%$job_header%'
AND tbd.dur_list LIKE '%$dur_list%'
AND tbj.job_dep_of_durable LIKE '$dep'
AND tbd.dur_numoe LIKE '%$dur_numoe%'
";
$where_date = "AND job_date_created BETWEEN '$date_f' AND '$date_t'";
if($date_f == undefined){
  $tsqlN = $tsql;
  $stmt = sqlsrv_query( $conn, $tsqlN);
}else{
  $tsqlN = $tsql.$where_date;
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
