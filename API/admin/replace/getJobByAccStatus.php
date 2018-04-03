<?php
require "../../../includes/db.php";

$user_id = $_GET['user_id'];
$page_number = $_GET['page_number'];
$page_calT = $page_number * 15;
$page_calF = $page_calT-15;
$dur_numoe = $_GET['dur_numoe'];
if($dur_numoe == undefined){
  $dur_numoe = '%';
}
$paper = $_GET['paper'];
if($paper == undefined){
  $paper = '%';
}
$dep = $_GET['dep'];
if($dep == undefined || $dep == ''){
  $dep = '%';
}
$date_f = $_GET['date_f'];
if($date_f == undefined){
  $date_f = '2016/01/01';
}
$date_t = $_GET['date_t'];
$d=strtotime("+1 years");
if($date_t == undefined){
  $date_t = date("Y/m/d", $d);
}
// เลือกงานที่ถูกร้องขอส่งซ่อม แต่ยังไมส่งซ่อมนอก่
$tsql = " SELECT  rowJss.*,convert(date,rowJss.job_date_sendTo,104) AS date_sendTo,tbd.*,tbp.job_id AS p_job_id,tbp.paper AS p_paper
FROM    ( SELECT    ROW_NUMBER() OVER ( ORDER BY tbj.job_date_created DESC) AS RowNum, *
FROM tblJob tbj
) AS rowJss
LEFT JOIN tblDurable tbd ON tbd.dur_id = rowJss.job_dur_id
LEFT JOIN tblPaper_printed tbp ON tbp.job_id = rowJss.job_id
WHERE
    rowJss.job_status ='5' OR rowJss.job_status ='50'
   AND rowJss.job_delete_status = '0'
   AND tbd.dur_numoe LIKE '%$dur_numoe%'
   AND tbp.paper LIKE '%$paper%'
   AND rowJss.job_dep_of_durable LIKE '$dep'
   AND rowJss.job_date_created BETWEEN '$date_f' AND '$date_t'
ORDER BY date_sendTo DESC,paper DESC";

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
