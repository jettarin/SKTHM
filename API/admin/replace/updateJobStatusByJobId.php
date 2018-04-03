<?php
require "../../../includes/db.php";

$status_params = $_GET['job_status'];
$job_id = $_GET['job_id'];
$dur_id = $_GET['dur_id'];


$tsql = "UPDATE tblJob SET job_status = '$status_params' , job_last_update = GETDATE() WHERE job_id = '$job_id'";
$query = "INSERT INTO tblPaper_printed (dur_id,job_id)VALUES ('$dur_id','$job_id')";

$stmtQ = sqlsrv_query( $conn, $query);
$stmt = sqlsrv_query( $conn, $tsql);

if( $stmt === false ) {
     echo "Error in executing query.</br>";
     die( print_r( sqlsrv_errors(), true));
}else{
  echo "1";
}
sqlsrv_free_stmt( $stmt);
sqlsrv_close( $conn);
?>
