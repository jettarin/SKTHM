<?php
require "../../includes/db.php";


$page_number = $_GET['page_number'];
$page_calT = $page_number * 15;
$page_calF = $page_calT-15;

$dur_list = $_GET['dur_list'];
if($dur_list == undefined){
  $dur_list = "%";
}
$dur_department = $_GET['dur_department'];
if($dur_department == undefined){
  $dur_department= "%";
}
$dur_numoe = $_GET['dur_numoe'];
if($dur_numoe == undefined){
  $dur_numoe= "%";
}
$dur_naoe = $_GET['dur_naoe'];
if($dur_naoe == undefined){
  $dur_naoe= "%";
}
$direc = $_GET['direc'];
if($direc == null || $direc == undefined){
  $direc = 'ASC';
}
$tsql = "SELECT  *
FROM    ( SELECT    ROW_NUMBER() OVER ( ORDER BY tbd.dur_dop $direc) AS RowNum, *
FROM tblDurable tbd
WHERE tbd.dur_list LIKE '%$dur_list%'
AND tbd.dur_department LIKE '%$dur_department%'
AND tbd.dur_numoe LIKE '%$dur_numoe%'
AND tbd.dur_naoe LIKE '%$dur_naoe%'


) AS rowJss

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
