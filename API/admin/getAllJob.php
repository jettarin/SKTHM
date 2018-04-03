<?php
require "../../includes/db.php";

if($conn){
  $data = file_get_contents('php://input');
  $dataJsonDecode = json_decode($data);
  $page_number = $dataJsonDecode->page_number;


  $page_calT = $page_number * 15;
  $page_calF = $page_calT-15;
  $dep = $dataJsonDecode->dep;
  if($dep == undefined){
    $dep = '%';
  }

  $status = $dataJsonDecode->status;
  if($status == undefined){
    $status = '%';
  }

  $dur_numoe = $dataJsonDecode->dur_numoe;
  if($dur_numoe == undefined){
    $dur_numoe = '%';
  }

  $date_created = date("Y/m/d");
  $tsql = " SELECT  *,CASE
  WHEN  job_acc_status = 0 THEN 'รอการตอบรับ'
  WHEN  job_acc_status <> 0 THEN 'รับงานโดย '+Mem_name+'  '+Mem_lastname

  ELSE 'เกิดข้อผิดพลาด'
  END as AccOfficer
  ,CASE
  WHEN  job_acc_status = 0 THEN 'orange'
  WHEN  job_acc_status <> 0 THEN 'green'

  ELSE 'red'
  END as AccOfficerColor

  FROM    ( SELECT    ROW_NUMBER() OVER ( ORDER BY tbj.job_date_created DESC ) AS RowNum, *
  FROM tblJob tbj

  LEFT JOIN tblDurable tbd ON tbd.dur_id = tbj.job_dur_id

  LEFT JOIN SKTH_HOSPITAL.dbo.tblPersonal tbp ON tbj.job_acc_by_new = tbp.Mem_ID

  LEFT JOIN (SELECT Cost_name,Cost_SKTHM FROM SKTH_HOSPITAL.dbo.tblCostCenter ) tbc ON tbc.Cost_SKTHM = tbj.job_dep_of_durable


  LEFT JOIN SKTHM.dbo.tblLov tbv ON tbv.lov_value = tbj.job_status
  WHERE tbj.job_delete_status != '1'
  AND tbv.lov_code = 'ACC'
  AND tbc.Cost_SKTHM LIKE '%$dep%'
  AND tbj.job_status LIKE '%$status%'
  AND tbd.dur_numoe LIKE '%$dur_numoe%'



  ) AS rowJss
  WHERE   RowNum > '$page_calF'
      AND RowNum <= '$page_calT'
  ORDER BY RowNum";

  // $tsql = "SELECT TOP 10 * FROM (SELECT TOP 20 FROM tblJob ORDER BY job_id) ORDER BY job_id DESC";
  $stmt = sqlsrv_query( $conn, $tsql);

  if( $stmt === false ) {
       echo "Error in executing query.</br>";
       die( print_r( sqlsrv_errors(), true));
  }

  /* Process results */
  $json = array();

  do {
       while ($row = sqlsrv_fetch_array($stmt, SQLSRV_FETCH_ASSOC)) {
       $json [] = $row;
       }
  } while ( sqlsrv_next_result($stmt) );

  /* Run the tabular results through json_encode() */
  /* And ensure numbers don't get cast to trings */
  echo json_encode($json);
  /* Free statement and connection resources. */
  sqlsrv_free_stmt( $stmt);
  sqlsrv_close( $conn);
}

?>
