<?php
require "../../includes/db.php";

// $dur_list = $_GET['dur_list'];
// if($dur_list == undefined){
//   $dur_list = "%";
// }
// $dur_department = $_GET['dur_department'];
// if($dur_department == undefined){
//   $dur_department= "%";
// }
// $dur_numoe = $_GET['dur_numoe'];
// if($dur_numoe == undefined){
//   $dur_numoe= "%";
// }
// $dur_naoe = $_GET['dur_naoe'];
// if($dur_naoe == undefined){
//   $dur_naoe= "%";
// }


$tsql = "SELECT  COUNT(tbd.dur_id) AS totalC FROM tblDurable tbd WHERE tbd.dur_list LIKE '%%%'
AND tbd.dur_department LIKE '%%%'
AND tbd.dur_numoe LIKE '%%%'
AND tbd.dur_naoe LIKE '%%%'";
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
