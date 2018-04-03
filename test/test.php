<?php

$db = dbase_open('result.DBF', 0); //เปิดไฟล์
$recno = dbase_numrecords($db); //หาจำนวนแถว

$rec = dbase_get_record($db, $recno); //รับค่าข้อมูลออกมาเก็บไว้
for ($i = 1; $i <= $recno; $i++) { //สั่งให้วนรอบให้ครบตามจำนวนแถวทั้งหมด
$nf = dbase_numfields($db); //นับจำนวนฟิลด์
for ($i2 = 0; $i2 < $nf; $i2++) { //วนรอบตามจำนวนฟิลด์ที่นับได้
echo $rec[$i2], ","; //แสดงค่าในฟิลด์ในการวนรอบตามจำนวนฟิลด์
}
echo "<br>111";
}

?>
