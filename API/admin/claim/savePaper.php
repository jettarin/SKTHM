<?php
require "../../../includes/db.php";


$paper = $_GET['paper'];
$date_created = date("Y/m/d");
$year = date('Y');
$c_year = $year + 543;

$c_yearStr = substr($c_year,2);
$dur_id = $_GET['dur_id'];
$job_id = $_GET['job_id'];
$c_time = $_GET['c_time'];
$cost_name = $_GET['cost_name'];

$tsql = "INSERT INTO tblPaper_printed (paper,
                                  cost_name,
                                  date_created,
                                  c_time,
                                  c_year,
                                  dur_id,
                                  job_id)
                                  VALUES ('$paper',
                                          '$cost_name',
                                          '$date_created',
                                          '$c_time',
                                          '$c_yearStr',
                                          '$dur_id',
                                          '$job_id')";

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
