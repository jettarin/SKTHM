<?php
require "../../includes/db.php";

$dur_id = $_GET['dm_dur_id'];
$dep_t = $_GET['dep_t'];


$tsql = "UPDATE tblDurable
                SET
                      dur_department = '$dep_t'

                WHERE dur_id = '$dur_id'";

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
