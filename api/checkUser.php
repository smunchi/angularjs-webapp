<?php
require_once('common.php');

/**
* Get input data from post request
*/
$postdata = file_get_contents("php://input");
$request = json_decode($postdata);

$filePath = 'data_storage/user.txt';
$sourceDataArray = jsonToArrayConverter($filePath);

/**
* Check to match userId and password as login credentials
*/
$found = false;
if(count($sourceDataArray) > 0) {
    foreach ($sourceDataArray as $key => $value) {
        if($value['userId'] == $request->userId && $value['password'] == $request->password) {
            http_response_code(200);
            $found = true;
            break;
        }
    }
}

if(count($sourceDataArray) < 1 || !$found) {
    http_response_code(401);
}
?>