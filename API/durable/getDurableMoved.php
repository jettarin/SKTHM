<?php
require "../../includes/db.php";




$page_number = $_GET['page_number'];

$page_calT = $page_number * 15;
$page_calF = $page_calT-15;

$dep_f = $_GET['dep_f'];
if($dep_f == 'undefined'){
	$dep_f = '%';
}
$dep_t = $_GET['dep_t'];
if($dep_t == 'undefined'){
	$dep_t = '%';
}
$dur_numoe = $_GET['dur_numoe'];
if($dur_numoe == 'undefined'){
	$dur_numoe = '%';
}


$tsql = "SELECT  rowJss.dm_id																																						AS				ID
							 ,rowJss.Cost_name																																				AS				FIRST_DEPARTMENT
	             ,rowJss.dur_numoe			    																															AS				DURABLE_NUMBER
	             ,rowJss.Expr1																																						AS				SECOND_DEPARTMENT
	             ,rowJss.dm_created			  																																AS				DATE_CREATED
	             ,CASE rowJss.dm_remark WHEN 'undefined'  THEN 'ไม่มี' ELSE rowJss.dm_remark END		 				AS				REMARK
							 ,CONCAT(rowJss.Pre_name,rowJss.Mem_name, ' ' ,rowJss.Mem_lastname)												AS 				PERSONAL_NAME
							 ,rowJss.dm_status 																																				AS 				STATUS
FROM    ( SELECT    ROW_NUMBER() OVER ( ORDER BY vdm.dm_created DESC ) AS RowNum, *
FROM SKTHM.dbo.v_DurableMoved vdm
WHERE vdm.cost_skthm_st LIKE '$dep_f'
AND 	vdm.cost_skthm_nd LIKE '$dep_t'
AND   vdm.dur_numoe LIKE '%$dur_numoe%'
) AS rowJss
WHERE   RowNum > '$page_calF'
		AND RowNum <= '$page_calT'
ORDER BY RowNum";

$stmt = sqlsrv_query( $conn, $tsql);

if( $stmt === false ) {
     echo "Error in executing query.</br>";
     die( print_r( sqlsrv_errors(), true));
}

/* Process results */
$json = array();
// $c = 0;
do {
     while ($row = sqlsrv_fetch_array($stmt, SQLSRV_FETCH_ASSOC)) {
		//  $c++;
		//  $json['numrow'] = $c;
     $json []  = $row;


     }
} while ( sqlsrv_next_result($stmt) );

/* Run the tabular results through json_encode() */
/* And ensure numbers don't get cast to trings */
echo json_encode($json);
/* Free statement and connection resources. */
sqlsrv_free_stmt( $stmt);
sqlsrv_close( $conn);
?>
