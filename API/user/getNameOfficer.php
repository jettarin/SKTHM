<?php
require "../../includes/db_per.php";


if($conn){
  $officer_id = $_GET['officer_id'];
 $tsql = "SELECT * FROM tblPersonal tblp
   LEFT JOIN tblCostCenter tblc ON tblp.Cost_id = tblc.Cost_id
   WHERE tblp.Mem_ID = '$officer_id'";
 $req =  sqlsrv_query($conn, $tsql) or die(print_r(sqlsrv_errors(),true));
 if(sqlsrv_has_rows($req) != 1){
 }else{
     while($data = sqlsrv_fetch_array($req, SQLSRV_FETCH_ASSOC)){
         echo $data['Mem_name']." ".$data['Mem_lastname'];
     }
 }
 sqlsrv_close( $conn);
}

?>
