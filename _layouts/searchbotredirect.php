<?php
	$agent = $_SERVER['HTTP_USER_AGENT'];
	$bot_pattern = "/.*(?:google|yahoo).*/i";

	if(preg_match($bot_pattern, $agent)){
		//Show content
		echo <<<ENDHTML
{{ content }}
ENDHTML;
	}else{
		//Redirect to the home page
		header("location: /#{{ page.id }}");
	}
?>
