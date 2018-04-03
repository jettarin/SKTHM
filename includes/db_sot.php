<?php
error_reporting( error_reporting() & ~E_NOTICE );

/* Set Connection Credentials */
$serverName="J-DESKTOP";
$uid = "sa";
$pwd = "rootadmin";
$connectionInfo = array( "UID"=>$uid,
                         "PWD"=>$pwd,
                         "Database"=>"SKTH_RESERV",
                         "CharacterSet"=>"UTF-8");

/* Connect using SQL Server Authentication. */
$conn = sqlsrv_connect( $serverName, $connectionInfo);

if( $conn === false ) {
     echo "Unable to connect.</br>";
     die( print_r( sqlsrv_errors(), true));
}

/* TSQL Query */


 ?>
