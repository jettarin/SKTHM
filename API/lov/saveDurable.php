<?php
require "../../includes/db.php";


$dur_dop = $_GET['dur_dop'];
$dur_numoe = $_GET['dur_numoe'];
$dur_list = $_GET['dur_list'];
$dur_naoe = $_GET['dur_naoe'];
$dur_company = $_GET['dur_company'];
$dur_price = $_GET['dur_price'];
$dur_tom = $_GET['dur_tom'];
$dur_acquired = $_GET['dur_acquired'];
$dur_department = $_GET['dur_department'];
$dur_year = $_GET['dur_year'];

$tsql = "INSERT INTO tblDurable (dur_dop,
                                 dur_numoe,
                                 dur_list,
                                 dur_naoe,
                                 dur_company,
                                 dur_price,
                                 dur_tom,
                                 dur_acquired,
                                 dur_department,
                                 dur_year,
                                 dur_ori_id,
                                 dur_status,
                                 dur_dis) VALUES ('$dur_dop',
                                                       '$dur_numoe',
                                                       '$dur_list',
                                                       '$dur_naoe',
                                                       '$dur_company',
                                                       '$dur_price',
                                                       '$dur_tom',
                                                       '$dur_acquired',
                                                       '$dur_department',
                                                       '$dur_year',
                                                       '11',
                                                       '0',
                                                       '0')";
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
