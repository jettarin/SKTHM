<?php

require "../../includes/db.php";

$dm_id = $_GET['dm_id'];

$tsql = "SELECT tbm.dm_id																																						AS				ID
							 ,tbc_st.Cost_name																																		AS				FIRST_DEPARTMENT
	             ,tbd.dur_numoe			    																															AS				DURABLE_NUMBER
	             ,tbc_nd.Cost_name																																		AS				SECOND_DEPARTMENT
	             ,CONVERT(VARCHAR(100),tbm.dm_created,103) 			  																		AS				DATE_CREATED
	             ,CASE tbm.dm_remark WHEN 'undefined'  THEN 'ไม่มี' ELSE tbm.dm_remark END		 					AS				REMARK
							 ,CONCAT(tbp.Pre_name,tbp.Mem_name, ' ' ,tbp.Mem_lastname)														AS 				PERSONAL_NAME
							 ,tbd.dur_tom 																																			  AS 				TYPEOFMONEY
							 ,tbd.dur_numoe																																				AS				NUMBEROFELECTRIC
							 ,tbd.dur_list																																				AS				LIST
							 ,REPLACE(CONVERT(varchar(20), (CAST(tbd.dur_price AS money)), 1), '.00', '')					AS				PRICE

FROM SKTHM.dbo.tblDurableMoved tbm

LEFT JOIN SKTHM.dbo.tblDurable tbd ON tbd.dur_id = tbm.dm_dur_id
LEFT JOIN SKTH_HOSPITAL.dbo.tblCostCenter tbc_st ON tbc_st.Cost_SKTHM = tbm.dm_dep_st
LEFT JOIN SKTH_HOSPITAL.dbo.tblCostCenter tbc_nd ON tbc_nd.Cost_SKTHM = tbm.dm_dep_nd
LEFT JOIN SKTH_HOSPITAL.dbo.tblPersonal tbp ON tbp.Mem_ID = tbm.dm_user_id
WHERE tbm.dm_id = '$dm_id'";
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
       $first_dep = $json['FIRST_DEPARTMENT'];
       $second_dep = $json['SECOND_DEPARTMENT'];
       $date_created = $json['DATE_CREATED'];
       $dur_tom = $json['TYPEOFMONEY'];
       $id = $json['ID'];
       $dur_year = $json['dur_year'];
       $dur_naoe = $json['dur_naoe'];
       $dur_dop = $json['dur_dopSTR'];
			 $dur_numoe = $json['NUMBEROFELECTRIC'];
			 $dur_list = $json['LIST'];
			 $dur_price = $json['PRICE'];


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
  <title>ใบเบิกหรือส่งคืน</title>
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
<h1 align="center">ใบเบิกหรือส่งคืน</h1>
<h3 align="center">โรงพยาบาลสุโขทัย</h3>
<table width="100%" border="1">
  <tr>
    <td colspan="3"><b>แผ่นที่</b>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; 1 &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<b>ของจำนวน</b>&nbsp;&nbsp;&nbsp;&nbsp;1</td>
    <td colspan="9"><b>เลขที่ใบเบิกหรือใบส่งคืน</b>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;'.$id.'</td>
  </tr>
  <tr>
    <td colspan="3" rowspan="2" valign="baseline"><b>จาก</b></br>
      <p>&nbsp;</p>  '.$first_dep.'
    </td>
    <td width="39">&nbsp;&nbsp;&nbsp;/</td>
    <td colspan="2" valign="baseline"><b>เบิก</b></td>
    <td colspan="6" rowspan="2" valign="baseline"><b>ทะเบียนเอกสาร</b><br />
		<p>&nbsp;</p>

		<p>&nbsp;</p>
		</td>
  </tr>
  <tr>
    <td>&nbsp;</td>
    <td colspan="2" valign="baseline"><b>ส่งคืน</b></td>
  </tr>
  <tr>
    <td colspan="3" valign="baseline"><b>ถึง</b><br />
		<p>&nbsp;</p>
      '.$second_dep.'
		<p>&nbsp;</p>
    </td>
    <td colspan="3" align="center" valign="baseline"><b>วันที่ต้องการ</b><br />
		<p>&nbsp;</p>
      '.$date_created.'
		<p>&nbsp;</p>
    </td>
    <td colspan="6" valign="baseline"><b>ประเภทเงิน</b><br />
		<p>&nbsp;</p>
      '.$dur_tom.'
		<p>&nbsp;</p>
    </td>
  </tr>
  <tr>
    <td colspan="3" valign="baseline"><b>ประเภทพัสดุ</b><br />
		<p>&nbsp;</p>
      ครุภัณฑ์คอมพิวเตอร์
		<p>&nbsp;</p>
    </td>
    <td align="center" valign="baseline"><b>ขั้นต้น</b><br />
		<p>&nbsp;</p>
      /
		<p>&nbsp;</p>
    </td>
    <td width="53" align="center" valign="baseline"><b>ทดแทน</b><br />
		<p>&nbsp;</p>

		<p>&nbsp;</p>
    </td>
    <td width="42" align="center" valign="baseline"><b>ยืม</b><br />
		<p>&nbsp;</p>

		<p>&nbsp;</p>
    </td>
    <td colspan="6" valign="baseline"><b>หมายเหตุ</b><br />
		<p>&nbsp;</p>

    <p>&nbsp;</p>
		</td>
  </tr>
  <tr>
    <td width="34"><b>ลำดับ</b></td>
    <td width="142" align="center"><b>หมายเลขพัสดุ</b></td>
    <td width="236" align="center"><b>รายการ</b></td>
    <td align="center"><b>รหัส</b></td>
    <td><b>หน่วยนับ</b></td>
    <td><b>จำนวน</b></td>
    <td width="82"><b>จ่ายหรือรับคืน</b></td>
    <td width="45" align="center"><b>ค้างจ่าย</b></td>
    <td colspan="2" align="center"><b>ราคาหน่วยละ</b></td>
    <td colspan="2" align="center"><b>ราคารวม</b></td>
  </tr>
  <tr>
    <td align="center">1</td>
    <td>'.$dur_numoe.'</td>
    <td>'.$dur_list.'</td>
    <td align="center">ค</td>
    <td align="center">ชุด</td>
    <td align="center">1</td>
    <td align="center">1</td>
    <td>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;-</td>
    <td width="98" align="right">'.$dur_price.'</td>
    <td width="15">&nbsp;</td>
    <td width="133" align="right">'.$dur_price.'</td>
    <td width="15">&nbsp;</td>
  </tr>
';
$htmlTable = '
  <tr>
    <td>&nbsp;</td>
    <td>&nbsp;</td>
    <td>&nbsp;</td>
    <td>&nbsp;</td>
    <td>&nbsp;</td>
    <td>&nbsp;</td>
    <td>&nbsp;</td>
    <td>&nbsp;</td>
    <td>&nbsp;</td>
    <td>&nbsp;</td>
    <td>&nbsp;</td>
    <td>&nbsp;</td>
  </tr>
	';
	$htmlTFooter = '
  <tr>
    <td colspan="3" rowspan="2" valign="baseline"><b>หลักฐานที่ใช้/ส่งคืน</b><br />
      </td>
    <td colspan="7" align="center"><b>รวมแผ่นนี้</b></td>
    <td align="right">'.$dur_price.'</td>
    <td>&nbsp;</td>
  </tr>
  <tr>
    <td colspan="7" align="center"><b>รวมทั้งสิ้น</b></td>
    <td align="right">'.$dur_price.'</td>
    <td>&nbsp;</td>
  </tr>
  <tr>
    <td colspan="3" rowspan="3" valign="baseline"><b>ให้บุคคลต่อไปนี้เป็นผู้รับพัสดุแทนได้</b>
		</br>
		<p>&nbsp;</p>
		<p>&nbsp;</p>
		<p>&nbsp;</p>
		<p>&nbsp;</p>
		<p>&nbsp;</p>
		<p>&nbsp;</p>
		<p>&nbsp;</p>
		<p>&nbsp;</p>
		<p>&nbsp;</p>
		<p>&nbsp;</p>
		<p>&nbsp;</p>
		<p>&nbsp;</p>
		<p>&nbsp;</p>
		<p>&nbsp;</p>
		<p>&nbsp;</p>
    <p><b>ผู้มีสิทธิเบิก</b></p></td>
    <td colspan="9" valign="baseline"><p><b>ผู้ตรวจสอบ</b></p>
    <p>&nbsp;</p>
    <p>&nbsp;</p>
		<p>&nbsp;</p>
		<p>&nbsp;</p>
		<p>&nbsp;</p>
		</td>
  </tr>
  <tr>
    <td height="108" colspan="9" valign="baseline"><b>ผู้อนุมัติจ่าย/รับคืน</b>
    </td>
  </tr>
  <tr>
    <td height="23" colspan="9" ><b>ผู้จ่าย</b>
		</td>
  </tr>
  <tr>
    <td colspan="3"><p><b>ได้รับของตามจำนวนและรายการที่จ่ายเรียบร้อย</b></p>
      </br>
			</br>
			</br>
			<p>&nbsp;</p>
			</br>
    <p><b>ผู้รับพัสดุ</b></p></td>
  </tr>
</table>
';
    $htmlF = '
		</body></html>';



//==============================================================
//==============================================================
//==============================================================


include("../mpdf.php");

$mpdf = new mPdf('th', 'A4', '0', 'THSaraban');
$mpdf->WriteHTML($htmlH);
for ($x = 0; $x <= 8; $x++) {
	$mpdf->WriteHTML($htmlTable);
}
$mpdf->WriteHTML($htmlTFooter);
$mpdf->WriteHTML($htmlF);
$mpdf->Output();
exit;

//==============================================================
//==============================================================
//==============================================================


?>
