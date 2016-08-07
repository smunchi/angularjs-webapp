<?php
require_once('common.php');

/**
* Get request data from url param
*/
$userId = $_GET['userId'];

$filePath = 'data_storage/user.txt';
checkFilePermission($filePath);

$sourceDataArray = jsonToArrayConverter($filePath);

/**
* Return user json data for a user id, assuming userId is unique
*/
if(count($sourceDataArray) > 0) {
    foreach ($sourceDataArray as $key => $value) {
        if($value['userId'] == $userId) {
            echo json_encode(array('profile'=>$sourceDataArray[$key]));
        }
    }
}
?>