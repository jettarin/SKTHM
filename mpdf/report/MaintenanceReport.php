<?php

require "../../includes/db.php";


/* Run the tabular results through json_encode() */
/* And ensure numbers don't get cast to trings */
/* Free statement and connection resources. */
$query = "SELECT * FROM SKTHM.dbo.tblMaintenance tbm
 LEFT JOIN SKTH_HOSPITAL.dbo.tblCostCenter tbc ON tbc.Cost_SKTHM = tbm.m_dep_id
 LEFT JOIN SKTH_HOSPITAL.dbo.tblPersonal tbp ON tbp.Mem_ID = tbm.m_user_id
 LEFT JOIN SKTHM.dbo.tblDurable tbd ON tbd.dur_id = tbm.m_dur_id
 ORDER BY tbm.m_dep_id DESC";
$result = sqlsrv_query($conn, $query);

$htmlH = '
<html>
  <head>
  <title>ประวัติการซ่อมบำรุง</title>
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
<h1 align="center">ประวัติการซ่อมบำรุง</h1>
<table width="100%">
    <thead>

        <tr>
            <th  width="8%" class="text-center">ว.ด.ป</th>
            <th  class="text-center" >ประวัติ</th>
            <th  class="text-center" >เลขครุภัณฑ์</th>
            <th  width="18%" class="text-center">โดย</th>
            <th  class="text-center">หน่วยงาน</th>
        </tr>
    </thead>
    <tbody>';

    $jsonOrder = array();
    $c=0;
    do {
         while ($rowOrder = sqlsrv_fetch_array($result, SQLSRV_FETCH_ASSOC)) {
         $jsonOrder [] = $rowOrder;

         $html[$c] = '  <tr>
                            <td >'.$jsonOrder[$c]['m_created'].'</td>
                            <td >'.$jsonOrder[$c]['m_service'].'</td>
                            <td >'.$jsonOrder[$c]['dur_numoe'].'</td>
                            <td >'.$jsonOrder[$c]['Mem_name'].'   '.$jsonOrder[$c]['Mem_lastname'].'</td>
                            <td >'.$jsonOrder[$c]['Cost_name'].'</td>
                        </tr>';

$c++;
         }
    } while ( sqlsrv_next_result($result) );

    $htmlE = '  <tr>
                       <td ></td>
                       <td ></td>
                       <td ></td>
                       <td ></td>
                       <td  align="right"></td>
                </tr>';

    $htmlF = '
    </tbody>

</table>

</body></html>';



//==============================================================
//==============================================================
//==============================================================
$count = "SELECT COUNT(*) AS TotalC FROM tblMaintenance";
$resultCount = sqlsrv_query($conn, $count);

$jsonCount = array();

do {
     while ($rowCount = sqlsrv_fetch_array($resultCount, SQLSRV_FETCH_ASSOC)) {
     $jsonCount = $rowCount;
     $co = $jsonCount['TotalC'];
     include("../mpdf.php");

     $mpdf = new mPdf('th', 'A4-L', '0', 'THSaraban');
     $mpdf->WriteHTML($htmlH);

       for ($x = 0; $x <= $co; $x++) {

          //  $mpdf->WriteHTML($html11);
          $mpdf->WriteHTML($html[$x]);
// $mpdf->WriteHTML($html[1]);
        //  for ($xf = 0; $xf <= 25-$co; $xf++) {

        //  }
       }
    for ($xf = 0; $xf <= 18-$co; $xf++) {
      $mpdf->WriteHTML($htmlE);
     }

     $mpdf->WriteHTML($htmlF);

     $mpdf->Output();
     exit;
     }

} while ( sqlsrv_next_result($resultCount) );




//==============================================================
//==============================================================
//==============================================================


?>
