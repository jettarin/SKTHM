<?php

require "../../includes/db.php";

$dur_id = $_GET['dur_id'];
$job_id = $_GET['job_id'];
$tsql = "SELECT * FROM tblPaper_printed WHERE dur_id='$dur_id' AND job_id='$job_id'";
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
     $paper = $json['paper'];
     $header = $json['header'];
     $detail1 = $json['detail1'];
     $detail2 = $json['detail2'];
     $detail3 = $json['detail3'];
     $detail4 = $json['detail4'];
	 $detail5 = $json['detail5'];

     }
} while ( sqlsrv_next_result($stmt) );

/* Run the tabular results through json_encode() */
/* And ensure numbers don't get cast to trings */
/* Free statement and connection resources. */
$query = "SELECT * FROM tblOrder WHERE order_job_id ='$job_id' AND order_dur_id ='$dur_id'";
$result = sqlsrv_query($conn, $query);

$jsonOrder = array();
$c=0;
do {
     while ($rowOrder = sqlsrv_fetch_array($result, SQLSRV_FETCH_ASSOC)) {
     $jsonOrder [] = $rowOrder;
     $c++;
     }
} while ( sqlsrv_next_result($result) );



/* Run the tabular results through json_encode() */
/* And ensure numbers don't get cast to trings */
/* Free statement and connection resources. */







$htmlH = '<img style="vertical-align: top" width="75" height="80" src="krut.png"><h3 align="center">แบบฟอร์มขออนุมัติต่อประกัน</h3>
<p>'.$paper.'</p>
<p>'.$header.'</p>
<p>'.$detail1.'</p>
<p>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;'.$detail2.'</p>
<p>'.$detail3.'</p>
<p>'.$detail4.'</p>
<p>'.$detail5.'</p>
<p>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;ดังนั้นศูนย์คอมพิวเตอร์</p>
<p>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<input type="checkbox"> ซ่อมได้แต่ต้องจัดซื้ออุปกรณ์ดังนี้</p>
<p>โดยมีรายการดังต่อไปนี้</p>
<table width="100%">
<tbody>';
$html[1] = '  <tr><td></td><td>1. '.$jsonOrder[0]['order_list'].'</td><td > '.$jsonOrder[0]['order_num'].'</td></tr>';
$html[2] = '  <tr><td></td><td>2. '.$jsonOrder[1]['order_list'].'</td><td align="left"> '.$jsonOrder[1]['order_num'].'</td></tr>';
$html[3] = '  <tr><td></td><td>3. '.$jsonOrder[2]['order_list'].'</td><td align="left"> '.$jsonOrder[2]['order_num'].'</td></tr>';
$html[4] = '  <tr><td></td><td>4. '.$jsonOrder[3]['order_list'].'</td><td align="left"> '.$jsonOrder[3]['order_num'].'</td></tr>';
$htmlF = '
</tbody>
</tr>
</table>
<p>จึงเรียนมาเพื่อโปรดพิจารณา</p>
<p></p>
<p style="margin-top:-10px">
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
...........................................
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
&nbsp;&nbsp;
...........................................
</p>
<p>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
(นายวรพล   ชาญตระกูล)
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
(นางมีนา   นาคร)
</p>
<p>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
นักวิชาการคอมพิวเตอร์
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
เลขาคณะกรรมการคอมพิวเตอร์
</p>
<p>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
วันที่........../.........../...........
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
&nbsp;&nbsp;
วันที่............/............./...........
</p>
<p>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;

</p>

<p>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
...........................................
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
&nbsp;&nbsp;&nbsp;...........................................
</p>
<p>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
(นายมงคล   ลือชูวงศ์)
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<input type="checkbox">  อนุมัติ &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<input type="checkbox">  ไม่อนุมัติ
</p>
<p>
นายแพทย์ชำนาญการพิเศษ (ด้านเวชกรรม)
</p>
<p>
&nbsp;&nbsp;
ปฏิบัติราชการในหน้าที่ผู้ช่วยผู้อำนวยการ
</p>
<p>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
ด้านเทคโนโลยีและสารสนเทศ
</p>
<p>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
วันที่........../.........../...........

</p>
';

$tsqlDurData = "SELECT *,CONVERT(VARCHAR(100),dur_dop,121) AS dur_dopSTR FROM tblDurable WHERE dur_id='$dur_id'";
$stmtDurData = sqlsrv_query( $conn, $tsqlDurData);
// $tsql = "SELECT TOP 10 * FROM (SELECT TOP 20 FROM tblJob ORDER BY job_id) ORDER BY job_id DESC";

if( $stmtDurData === false ) {
     echo "Error in executing query.</br>";
     die( print_r( sqlsrv_errors(), true));
}

/* Process results */
$jsonDurData = array();

do {
     while ($rowDurData = sqlsrv_fetch_array($stmtDurData, SQLSRV_FETCH_ASSOC)) {
       $jsonDurData = $rowDurData;
       $dur_list = $jsonDurData['dur_list'];
       $dur_numoe = $jsonDurData['dur_numoe'];
       $dur_year = $jsonDurData['dur_year'];
       $dur_naoe = $jsonDurData['dur_naoe'];
       $dur_dop = $jsonDurData['dur_dopSTR'];


     }
} while ( sqlsrv_next_result($stmtDurData) );

$queryDurData = "SELECT * FROM tblJob tbj
RIGHT JOIN tblJobSuccess tbjs ON tbjs.job_id = tbj.job_id
LEFT JOIN tblDeliver tbd ON tbd.deli_job_id = tbj.job_id

WHERE tbj.job_dur_id = '$dur_id'";
$resultDurData = sqlsrv_query($conn, $queryDurData);

$htmlDH = '
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

    $jsonDurable = array();
    $cD=0;
    do {
         while ($rowDurable = sqlsrv_fetch_array($resultDurData, SQLSRV_FETCH_ASSOC)) {
         $jsonDurable [] = $rowDurable;
         if($jsonDurable[$cD]['deli_bill'] == null){
           $jsonDurable[$cD]['deli_bill'] = 'ศูนย์คอมฯ';
         }
         if($jsonDurable[$cD]['deli_total'] == null){
           $jsonDurable[$cD]['deli_total'] = '0.00';
         }

         $htmlD[$cD] = '  <tr>
                            <td colspan="3">'.$jsonDurable[$cD]['finish_date'].'</td>
                            <td colspan="13">'.$jsonDurable[$cD]['comment'].','.$jsonDurable[$cD]['description'].'</td>
                            <td colspan="4">'.$jsonDurable[$cD]['deli_bill'].'</td>
                            <td colspan="4" align="right">'.$jsonDurable[$cD]['deli_total'].'</td>
                        </tr>';
         $cD++;
         }
    } while ( sqlsrv_next_result($resultDurData) );

    $htmlE = '  <tr>
                       <td colspan="3"></td>
                       <td colspan="13"></td>
                       <td colspan="4"></td>
                       <td colspan="4" align="right"></td>
                </tr>';

    $htmlDF = '
    </tbody>

</table>

</body></html>';
//==============================================================
//==============================================================
//==============================================================


include("../mpdf.php");
$mpdf = new mPdf('th', 'A4', '0', 'THSaraban');
$mpdf->WriteHTML($htmlH);
for ($x = 0; $x <= $c; $x++) {
  $mpdf->WriteHTML($html[$x]);
}
$mpdf->WriteHTML($htmlF);
$mpdf->AddPage();

$mpdf->WriteHTML($htmlDH);
if($cD<25){
  for ($xD = 0; $xD <= $cD; $xD++) {
    $mpdf->WriteHTML($htmlD[$xD]);
    for ($xD = 0; $xD <= 25-$cD; $xD++) {
      $mpdf->WriteHTML($htmlE);
    }
  }
}else{
  $mpdf->WriteHTML($htmlD[$xD]);
}
$mpdf->WriteHTML($htmlDF);
$mpdf->Output();
exit;

//==============================================================
//==============================================================
//==============================================================


?>
