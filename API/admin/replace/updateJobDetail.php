<?php
require "../../../includes/db.php";

$job_id = $_GET['job_id'];
$job_header = $_GET['job_header'];
$job_desc = $_GET['job_desc'];



$tsql = "UPDATE tblJob SET job_header = '$job_header',job_desc='$job_desc' WHERE job_id = '$job_id'";

$stmt = sqlsrv_query( $conn, $tsql);

if( $stmt === false ) {
      echo "0";
}else{
  echo "1";
}
sqlsrv_free_stmt( $stmt);
sqlsrv_close( $conn);
?>
