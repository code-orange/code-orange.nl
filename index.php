<?php
	$agent = $_SERVER['HTTP_USER_AGENT'];
	$pattern = "/.*(?:android|blackberry|palm|symbian|maemo|opera (?:mini|mobile)|i(?:phone|pad|pod)).*/i";
	
	$target = "";

	if(preg_match($pattern, $agent)){
		$target = "mobile";
	}else{
		$target = "full";
	}
	
	readfile("$target.html");
?>
