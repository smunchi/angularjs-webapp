<?php
	/**
	* Create a new file with permission if found exist
	*/
	function checkFilePermission($filePath) {
		if(!file_exists(dirname($filePath))) {
			mkdir(dirname($filePath), 0755, true);
			fopen($filePath, 'w');
		}
	}

	/**
	* Get exising data as json format from text file and convert it to array
	*/
	function jsonToArrayConverter($filePath) {
		$sourceData = file_get_contents($filePath);
		$sourceDataArray = json_decode($sourceData, true);

		return $sourceDataArray ? $sourceDataArray : array();
	}
?>