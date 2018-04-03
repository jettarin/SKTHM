<?php
require "../../../includes/db.php";



$data = file_get_contents('php://input');
$dataJsonDecode = json_decode($data);
$job_id = $dataJsonDecode->job_id;
$dur_id = $dataJsonDecode->dur_id;
$header = $dataJsonDecode->header;
$status = $dataJsonDecode->status;
$detail1 = $dataJsonDecode->detail1;
$detail2 = $dataJsonDecode->detail2;
$detail3 = $dataJsonDecode->detail3;
$detail4 = $dataJsonDecode->detail4;
$detail5 = $dataJsonDecode->detail5;
$paper = $dataJsonDecode->paper;

$tsql = "UPDATE tblPaper_printed SET header = '$header',
                                        paper = '$paper',
                                        status='$status',
                                        detail1='$detail1',
                                        detail2='$detail2',
                                        detail3='$detail3',
                                        detail4='$detail4',
                                        detail5='$detail5' WHERE job_id = '$job_id' AND dur_id = '$dur_id'";
$stmt = sqlsrv_query( $conn, $tsql);
if( $stmt === false ) {
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
sqlsrv_free_stmt( $stmt);
sqlsrv_close( $conn);
?>
