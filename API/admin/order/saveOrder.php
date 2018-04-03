<?php
require "../../../includes/db.php";


$order_list = $_GET['order_list'];
$order_num = $_GET['order_num'];
$job_id = $_GET['job_id'];
$dur_id = $_GET['dur_id'];

$tsql = "INSERT INTO tblOrder (order_list,
                                  order_num,
                                  order_job_id,
                                  order_dur_id)
                                  VALUES ('$order_list',
                                          '$order_num',
                                          '$job_id',
                                          '$dur_id')";


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

sqlsrv_close( $conn);
?>
