<?php
require "../../includes/db.php";

$dm_id = $_GET['dm_id'];
$dur_id = $_GET['dur_id'];
$dep_f = $_GET['dep_f'];
$dep_t = $_GET['dep_t'];
$user_id = $_GET['user_id'];
$remark = $_GET['remark'];

$tsql = "UPDATE tblDurableMoved
                SET
                      dm_dur_id = '$dur_id',
                      dm_dep_st = '$dep_f',
                      dm_dep_nd = '$dep_t',
                      dm_user_id = '$user_id',
                      dm_remark = '$remark'
                WHERE dm_id = '$dm_id'";

$stmt = sqlsrv_query( $conn, $tsql);
if( $stmt === false ) {
     echo "0";

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
