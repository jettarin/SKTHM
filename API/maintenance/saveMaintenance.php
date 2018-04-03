<?php
require "../../includes/db.php";

$m_dur_id = $_GET['m_dur_id'];
$m_dep_id = $_GET['m_dep_id'];
$m_user_id = $_GET['m_user_id'];
$m_service = $_GET['m_service'];
$m_other = $_GET['m_other'];
$m_created = $_GET['m_created'];

$tsql = "INSERT INTO tblMaintenance (m_dur_id,
                              m_dep_id,
                              m_user_id,
                              m_service,
                              m_other,
                              m_created)
                      VALUES ('$m_dur_id',
                              '$m_dep_id',
                              '$m_user_id',
                              '$m_service',
                              '$m_other',
                              '$m_created')";

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
sqlsrv_free_stmt( $stmt);
sqlsrv_close( $conn);
?>
