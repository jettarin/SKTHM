<?php
require "../../includes/db_per.php";


if($conn){
  $cost_id = $_GET['cost_id'];

  $tsql = "SELECT * FROM tblCostCenter tblp WHERE tblp.Cost_SKTHM = '$cost_id'";

  $req =  sqlsrv_query($conn, $tsql) or die(print_r(sqlsrv_errors(),true));
  if(sqlsrv_has_rows($req) != 1){


  }else{
      while($data = sqlsrv_fetch_array($req, SQLSRV_FETCH_ASSOC)){
          echo $data['Cost_name'];
  		}
      // echo "SESSION Mem_ID  =".$_SESSION['Mem_ID'];
  }
  sqlsrv_close( $conn);

}

?>
