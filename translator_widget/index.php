<?php
$params=['name'=>'John', 'surname'=>'Doe', 'age'=>36)
$defaults = array(
CURLOPT_URL => 'http://myremoteservice/', 
CURLOPT_POST => true,
CURLOPT_POSTFIELDS => $params,
);
$ch = curl_init();
curl_setopt_array($ch, ($options + $defaults));
?>
