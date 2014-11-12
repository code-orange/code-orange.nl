<?php
	error_reporting(E_ALL);

	$naam = $_REQUEST['naam'];
	$email = $_REQUEST['email'];
	$vraag = $_REQUEST['vraag'];

	$to = "nubis-info@timvdalen.nl";
	$subject = "community-management.nub.is vraag van $naam";
	$message = "van: $naam, $email\nbericht: $vraag\n";
	$headers = "From: $email". "\r\n" .
		'Reply-To: $email';
	
	mail($to, $subject, $message, $headers);
?>
