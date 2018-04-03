<?php

require "../../includes/db.php";


/* Run the tabular results through json_encode() */
/* And ensure numbers don't get cast to trings */
/* Free statement and connection resources. */


// Parameter
$job_id = $_GET['id'];


// Check Thai language
function sanitized_name($original){
  if (preg_match('/\p{Thai}/u', $original) === 1) {
    return "";
  }else{
      return "ยี่ห้อ";
  }

}

function getMonthTH($m){
  switch ($m) {
      case '01':
        return "ม.ค.";
        break;
      case '02':
        return "ก.พ.";
        break;
      case '03':
        return "มี.ค.";
        break;
      case '04':
        return "เม.ษ.";
        break;
      case '05':
        return "ก.ค.";
        break;
      case '06':
        return "มิ.ย.";
        break;
      case '07':
        return "ก.ค.";
        break;
      case '08':
        return "ส.ค.";
        break;
      case '09':
        return "ก.ย.";
        break;
      case '10':
        return "ต.ค.";
        break;
      case '11':
        return "พ.ย.";
        break;
      case '12':
        return "ธ.ค.";
        break;
    default:
      return $m;
      break;
  }
}

// Callculate Year
function yearTH($y){
  $date =  date('d',strtotime($y));
  $month = date('m',strtotime($y));
  $year = date('Y', strtotime($y));
  $yearTH = intval($year)+543;
  $monthTH = getMonthTH($month);
  $full = $date."  ".$monthTH."  ".$yearTH;
  return  $full;
}



$query = "SELECT tbj.job_id					      	   AS							ID,
	   tbj.job_date_created			            	  AS							DATE_NOTIFY,
	   tbc.Cost_name				                    AS							DEPARTMENT,
	   tbl.lov_description			            	 AS							JOB_TYPE,
	   tbd.dur_numoe				                   AS							DUR_NUMBER,
	   tbd.dur_naoe					                   AS							DUR_BRAN,
	   tbj.job_header				                    AS							JOB_DESC,
	   tbp.Mem_name+' '+tbp.Mem_lastname    		AS					    	FULL_NAME,
	   YEAR ( tbd.dur_dop )						            AS							DATEOFPURCHEASE
	    FROM SKTHM.dbo.tblJob tbj


LEFT JOIN SKTHM.dbo.tblLov tbl ON tbl.lov_value = tbj.job_type
-- Durable Data --
LEFT JOIN SKTHM.dbo.tblDurable tbd ON tbj.job_dur_id = tbd.dur_id

-- Personal Data --
LEFT JOIN SKTH_HOSPITAL.dbo.tblPersonal tbp ON tbj.job_user_id = tbp.Mem_ID
LEFT JOIN SKTH_HOSPITAL.dbo.tblCostCenter tbc ON tbp.Cost_id = tbc.Cost_id
WHERE tbj.job_id = '$job_id'
AND tbl.lov_code = 'ACTJ'";
$result = sqlsrv_query($conn, $query);
if( $result === false ) {
     echo "Error in executing query.</br>";
     die( print_r( sqlsrv_errors(), true));
}
/* Process results */
$json = array();

do {
     while ($row = sqlsrv_fetch_array($result, SQLSRV_FETCH_ASSOC)) {
       $json = $row;

       $ID = $json['ID'];
       $DEPARTMENT = $json['DEPARTMENT'];
       $JOB_TYPE = $json['JOB_TYPE'];
       $DUR_NUMBER  = $json['DUR_NUMBER'];
       $DUR_BRAN  = $json['DUR_BRAN'];
       $JOB_DESC = $json['JOB_DESC'];
       $FULL_NAME = $json['FULL_NAME'];
       $DATE_NOTIFY = $json['DATE_NOTIFY'];
       $DOP = $json['DATEOFPURCHEASE'];
       $YN = date("Y");
       $YC = intval($YN)-intval($DOP);
     }
} while ( sqlsrv_next_result($result) );
$htmlH = '
<html>
  <head>
  <title>ใบแจ้งซ่อมอุปกรณ์คอมพิวเตอร์</title>
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


                    u {
    border-bottom: 1px dotted #000;
    text-decoration: none;
}
	</style>
</head>
<body>
<h2 align="center">ใบแจ้งซ่อมอุปกรณ์คอมพิวเตอร์</h2>

<h3 align="center">โรงพยาบาลสุโขทัย</h3>
<h4  align="right" style="position: sticky;padding-top:-120px">เลขที่รับ <u>'.$ID.'</u></h4>
<br>
<br><br>
<br>
<br>
<span>เรียน นายแพทย์มงคล  ลือชูวงศ์</span>
<br>
<br>
<br>
<span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; ด้วยหน่วยงาน  </span>
<span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<u>'.$DEPARTMENT.'</u></span>
<span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
มีความประสงค์ให้</span><span> &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<u>'.$JOB_TYPE.'</u> </span>
<br>
<br>
<span>หมายเลขครุภัณฑ์ &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<u>'.$DUR_NUMBER.'</u></span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
<span>'.sanitized_name($DUR_BRAN).' &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<u>'.$DUR_BRAN.'</u> </span>
<br>
<br>

<span>โดยอุปกรณ์ดังกล่าวมีอาการดังนี้ &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<u>'.$JOB_DESC.'</u></span>
<br>
<br>
<span>ปีจัดซื้อ &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; '.$DOP.'</span>
<br>
<br>
<span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; จึงเรียนมาเพื่อโปรดทราบดำเนินการต่อไป  </span>
<br>
<br>
<span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
&nbsp; ลงชื่อ  </span>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;

<span style="color:white"><u>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
'.$FULL_NAME.'
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
</u></span>
<span>หัวหน้าหน่วยงาน/ผู้แทน</span>
<br>
<br>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
<span >( &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
<u>'.$FULL_NAME.'</u>
&nbsp;&nbsp;&nbsp; )</span>
<br>
<br>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span>วันที่ &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
 <u>'.yearTH($DATE_NOTIFY).'</u></span>
 <br>
 <br>
 <span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
 &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
 &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
 &nbsp; ลงชื่อ  </span>
 &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
 &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
 &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;

 <span style="color:white"><u>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
 '.$FULL_NAME.'
 &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
 </u></span>
 <span>ผู้รับเรื่อง</span>
 <br>
 <br>
 &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
 &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
 &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
 &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
 &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
 &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
 &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
 <span >( &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
 <u><span style="color:white">'.$FULL_NAME.'</span></u>
 &nbsp;&nbsp;&nbsp; )</span>
 <br>
 <br>
 &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
 &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
 &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
 &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
 &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
 &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span>วันที่ &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
 &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
  <u>'.yearTH($DATE_NOTIFY).'</u></span>

</body></html>';





//==============================================================
//==============================================================
//==============================================================


include("../mpdf.php");

$mpdf = new mPdf('th', 'A4', '0', 'THSaraban');
$mpdf->WriteHTML($htmlH);
$mpdf->Output();
exit;


//==============================================================
//==============================================================
//==============================================================


?>
