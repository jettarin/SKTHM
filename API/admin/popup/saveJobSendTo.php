<?php
require "../../../includes/db.php";


$job_id = $_GET['job_id'];
$off_id_by = $_GET['off_id_by'];
$off_id_to = $_GET['off_id_to'];
$comment = $_GET['comment'];
$date_created =  date("Y-m-d H:i:s");
$job_status = $_GET['job_status'];
$date_now = $_GET['date_now'];


$tsql = "INSERT INTO tblJobSendTo (st_job_id,
                                  st_off_id_by,
                                  st_off_id_to,
                                  st_comment,
                                  st_status,
                                  st_date_created)
                                  VALUES ('$job_id',
                                          '$off_id_by',
                                          '$off_id_to',
                                          '$comment',
                                          '$job_status',
                                          '$date_created')";

$stmt = sqlsrv_query( $conn, $tsql);

$usql = "UPDATE tblJob SET job_status='$job_status',job_acc_status='$job_status',job_acc_by_new='$off_id_to',job_acc_after='$off_id_by',job_date_sendTo='$date_now' WHERE job_id = '$job_id'";

$res = sqlsrv_query( $conn, $usql);


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
