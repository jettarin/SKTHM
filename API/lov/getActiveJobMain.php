<?php
require "../../includes/db.php";

$lov_code = $_GET['lov_code'];
$lov_value = "21";

$tsql = "SELECT * FROM tblLov WHERE lov_code='$lov_code' AND lov_value = '$lov_value'";

$stmt = sqlsrv_query( $conn, $tsql);

if( $stmt === false ) {
     echo "Error in executing query.</br>";
     die( print_r( sqlsrv_errors(), true));
}

/* Process results */
$json = array();

do {
     while ($row = sqlsrv_fetch_array($stmt, SQLSRV_FETCH_ASSOC)) {
     $json   = $row;
     }
} while ( sqlsrv_next_result($stmt) );

/* Run the tabular results through json_encode() */
/* And ensure numbers don't get cast to trings */
echo json_encode($json);
/* Free statement and connection resources. */
sqlsrv_free_stmt( $stmt);
sqlsrv_close( $conn);
?>
