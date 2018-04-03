<?php
require "../../../includes/db_per.php";

 $user_id = $_GET['user_id'];

$tsql = "SELECT * FROM tblPersonal tblp
	LEFT JOIN tblCostCenter tblc ON tblp.Cost_id = tblc.Cost_id
	WHERE tblp.Mem_ID = '$user_id'";

$req =  sqlsrv_query($conn, $tsql) or die(print_r(sqlsrv_errors(),true));

if(sqlsrv_has_rows($req) != 1){


}else{




    while($data = sqlsrv_fetch_array($req, SQLSRV_FETCH_ASSOC)){


        echo $data['Mem_name']." ".$data['Mem_lastname'];




		}

        // echo "SESSION Mem_ID  =".$_SESSION['Mem_ID'];



}

sqlsrv_close( $conn);
?>
