<?php

require "../../includes/db.php";

$dur_id = $_GET['dur_id'];

$tsql = "SELECT *,CONVERT(VARCHAR(100),dur_dop,110) AS dur_dopSTR FROM tblDurable WHERE dur_id='$dur_id'";
$stmt = sqlsrv_query( $conn, $tsql);
// $tsql = "SELECT TOP 10 * FROM (SELECT TOP 20 FROM tblJob ORDER BY job_id) ORDER BY job_id DESC";


if( $stmt === false ) {
     echo "Error in executing query.</br>";
     die( print_r( sqlsrv_errors(), true));
}

/* Process results */
$json = array();

do {
     while ($row = sqlsrv_fetch_array($stmt, SQLSRV_FETCH_ASSOC)) {
     $json = $row;
       $dur_list = $json['dur_list'];
       $dur_numoe = $json['dur_numoe'];
       $dur_year = $json['dur_year'];
       $dur_naoe = $json['dur_naoe'];
       $dur_dop = $json['dur_dopSTR'];


     }
} while ( sqlsrv_next_result($stmt) );

/* Run the tabular results through json_encode() */
/* And ensure numbers don't get cast to trings */
/* Free statement and connection resources. */
$query = "SELECT * FROM tblJob tbj
RIGHT JOIN tblJobSuccess tbjs ON tbjs.job_id = tbj.job_id
LEFT JOIN tblDeliver tbd ON tbd.deli_job_id = tbj.job_id

WHERE tbj.job_dur_id = '$dur_id'";
$result = sqlsrv_query($conn, $query);

$htmlH = '
<html>
  <head>
  <title>ประวัติการซ่อมครุภัณฑ์</title>
	<meta http-equiv="Content-Language" content="en-GB">
	<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
	<style>
  table {
          border-collapse: collapse;
        }

  table, th, td {
          border: 1px solid black;
                }
                th {
                    height: 30px;
                    }
                td {
                    height: 30px;
                    }
	</style>
</head>
<body>
<h1 align="center">ประวัติการซ่อมครุภัณฑ์</h1>
<table width="100%">
    <thead>
      <tr>
        <th colspan="24" style="text-align: left;width:60%">รายการ : '.$dur_list.'</th>
      </tr>
      <tr>
        <th colspan="19" style="text-align: left;">หมายเลขพัสดุ : '.$dur_numoe.'</th>
        <th colspan="5" style="text-align: left;">ปี : '.$dur_year.'</th>
      </tr>
      <tr>
        <th colspan="24" style="text-align: left;width:60%">แบบ : '.$dur_naoe.'</th>
      </tr>
      <tr>
          <th colspan="15" style="text-align: left;width:60%">หมายเลขเครื่อง : </th>
          <th colspan="9" style="text-align: left;"> วัน เดือน ปี : '.$dur_dop.'</th>
      </tr>
        <tr>
            <th colspan="3" width="10%" class="text-center">ว.ด.ป</th>
            <th colspan="13" class="text-center" >ประวัติ</th>
            <th colspan="4" class="text-center">หลักฐาน</th>
            <th colspan="4" class="text-center">จำนวนเงิน</th>
        </tr>
    </thead>
    <tbody>';

    $jsonOrder = array();
    $c=0;
    do {
         while ($rowOrder = sqlsrv_fetch_array($result, SQLSRV_FETCH_ASSOC)) {
         $jsonOrder [] = $rowOrder;
         if($jsonOrder[$c]['deli_bill'] == null){
           $jsonOrder[$c]['deli_bill'] = 'ศูนย์คอมฯ';
         }
         if($jsonOrder[$c]['deli_total'] == null){
           $jsonOrder[$c]['deli_total'] = '0.00';
         }

         $html[$c] = '  <tr>
                            <td colspan="3">'.$jsonOrder[$c]['finish_date'].'</td>
                            <td colspan="13">'.$jsonOrder[$c]['comment'].','.$jsonOrder[$c]['description'].'</td>
                            <td colspan="4">'.$jsonOrder[$c]['deli_bill'].'</td>
                            <td colspan="4" align="right">'.$jsonOrder[$c]['deli_total'].'</td>
                        </tr>';
         $c++;
         }
    } while ( sqlsrv_next_result($result) );

    $htmlE = '  <tr>
                       <td colspan="3"></td>
                       <td colspan="13"></td>
                       <td colspan="4"></td>
                       <td colspan="4" align="right"></td>
                </tr>';

    $htmlF = '
    </tbody>

</table>

</body></html>';



//==============================================================
//==============================================================
//==============================================================


include("../mpdf.php");
$mpdf = new mPdf('th', 'A4', '0', 'THSaraban');
$mpdf->WriteHTML($htmlH);
if($c<25){
  for ($x = 0; $x <= $c; $x++) {
    $mpdf->WriteHTML($html[$x]);
    for ($x = 0; $x <= 25-$c; $x++) {
      $mpdf->WriteHTML($htmlE);
    }
  }
}else{
  $mpdf->WriteHTML($html[$x]);
}
$mpdf->WriteHTML($htmlF);
$mpdf->Output();
exit;

//==============================================================
//==============================================================
//==============================================================


?>
