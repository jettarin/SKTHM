<?php
require "../../../includes/db.php";


$comment = $_GET['comment'];
$description = $_GET['description'];
$officer_finish = $_GET['officer_finish'];
$job_id = $_GET['job_id'];
$finish_date = $_GET['finish_date'];
$finish_time = $_GET['finish_time'];
$dur_id = $_GET['dur_id'];
$job_type = $_GET['job_type'];


$query = "INSERT INTO tblJobSuccess
                            (comment,
                            description,
                            officer_finish,
                            job_id,
                            finish_date,
                            finish_time)
                    VALUES ('$comment',
                            '$description',
                            '$officer_finish',
                            '$job_id',
                            '$finish_date',
                            '$finish_time')";


$stmtIn = sqlsrv_query( $conn, $query);
$tsql = "UPDATE tblJob SET job_status = '99',job_type = '$job_type'  WHERE job_id = '$job_id'";
$stmtUp = sqlsrv_query( $conn, $tsql);

$tsqlUpD = "UPDATE tblDurable SET dur_status = '0' WHERE dur_id = '$dur_id'";
$stmtUpD = sqlsrv_query( $conn, $tsqlUpD);

if( $stmtIn === false ) {
     echo "Error in executing query.</br>";
     die( print_r( sqlsrv_errors(), true));
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
sqlsrv_free_stmt( $stmtIn);
sqlsrv_close( $conn);
?>
