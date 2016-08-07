<?php
require_once('common.php');

/**
* Get input data from post request and convert it from json to array
*/
$postdata = file_get_contents("php://input");
$request = json_decode($postdata, true);

$filePath = 'data_storage/user.txt';
checkFilePermission($filePath);

$sourceDataArray = jsonToArrayConverter($filePath);

/**
* Add input data from post request to sourceDataArray and convert it to json
*/
array_push($sourceDataArray, $request);
$objData = json_encode($sourceDataArray);

/**
* Store data to path 'data_storage/user.txt'
*/
$data = file_put_contents($filePath, $objData);

if($data) {
 http_response_code(201);
}
?>