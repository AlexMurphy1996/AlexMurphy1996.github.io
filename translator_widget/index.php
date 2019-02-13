<?php
//set Header
header('Content-Type: application/json');

//set POST variables
$url = 'https://api.example.com';
$fields = array([
    'Type' => "Free",
    'Value' => "UK1234"
]);

//open connection
$ch = curl_init();

//set the url, number of POST vars, POST data
curl_setopt($ch,CURLOPT_URL, $url);
curl_setopt($ch,CURLOPT_HTTPHEADER, array('Content-Type: text/json', 'APIKEY: aaaa-bbbb-cccc-dddd'));
curl_setopt($ch,CURLOPT_POSTFIELDS, json_encode($fields));
//save response to variable $result
curl_setopt($ch, CURLOPT_RETURNTRANSFER, 1);

//execute post
$result = curl_exec($ch);

//close connection
curl_close($ch);

echo $result;
