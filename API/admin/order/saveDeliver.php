<?php
require "../../../includes/db.php";


$deli_history = $_GET['deli_history'];
$dur_id = $_GET['dur_id'];
$deli_num = $_GET['deli_num'];
$deli_company = $_GET['deli_company'];
$deli_bill = $_GET['deli_bill'];
$deli_total = $_GET['deli_total'];
$deli_job_id = $_GET['deli_job_id'];
$deli_date = $_GET['deli_date'];
$deli_order_id = $_GET['deli_order_id'];

$tsql = "INSERT INTO tblDeliver (deli_history,
                                 deli_dur_id,
                                 deli_num,
                                 deli_company,
                                 deli_bill,
                                 deli_total,
                                 deli_job_id,
                                 deli_order_id,
                                 deli_date) VALUES ('$deli_history',
                                                      '$dur_id',
                                                      '$deli_num',
                                                      '$deli_company',
                                                      '$deli_bill',
                                                      '$deli_total',
                                                      '$deli_job_id',
                                                      '$deli_order_id',
                                                      '$deli_date')";


$stmt = sqlsrv_query( $conn, $tsql);



if( $stmt === false ) {
     echo "0 ";
}else{

  echo "1";

}

/* Process results */
// $json = array();

// do {
//      while ($row = sqlsrv_fetch_array($stmt, SQLSRV_FETCH_ASSOC)) {
//      $json   = $row;
//      }
// } while ( sqlsrv_next_result($stmt) );

/* Run the tabular results through json_encode() */
/* And ensure numbers don't get cast to trings */
// echo json_encode($json);
/* Free statement and connection resources. */
sqlsrv_free_stmt( $stmt);
sqlsrv_close( $conn);
?>
