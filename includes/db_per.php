<?php
error_reporting( error_reporting() & ~E_NOTICE );

/* Set Connection Credentials */
$serverName="WEBSERVER\SKTH_SQL,1435";
$uid = "userGetdata";
$pwd = "25182521Qwe";
$connectionInfo = array( "UID"=>$uid,
                         "PWD"=>$pwd,
                         "Database"=>"SKTH_HOSPITAL",
                         "CharacterSet"=>"UTF-8");


$conn = sqlsrv_connect( $serverName, $connectionInfo);

if( $conn === false ) {
     echo "Unable to connect.</br>";
     die( print_r( sqlsrv_errors(), true));
}

?>
