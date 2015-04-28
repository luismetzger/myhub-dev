<?php

$mobileNumber = "";

if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $mobileNumber = test_input($_POST["mobileNumber"]);
}
$mobileNumber;

if('' == $mobileNumber){
    die('Mobile Number Needed');
}
$remdas=str_replace("-","",$mobileNumber);
$remcou=strlen($remdas);

if (strpos($mobileNumber,'+') !== false) {
    $plus="";
}
else
{
 $plus="yes";
}
if (strpos($mobileNumber,'-') !== false) {
    $dash="";
}
else
{
  $dash="yes";
}


/* if($remcou==10 && $dash=="yes" && $plus=="yes")
{
echo "text message was not sent, please check phone number";
} */
if($remcou<10 && $dash=="yes" && $plus=="yes")
{
echo "text message was not sent, please check phone number";
}
function test_input($data) {
    $data = trim($data);
    $data = stripslashes($data);
    $data = htmlspecialchars($data);
    return $data;
}

// this line loads the library
require('twilio-php/Services/Twilio.php');
error_reporting(0);
$account_sid = 'ACafcde888e0c8def2e09e0d6131dd2c60';
$auth_token = '37e79a185ece5ffba85a338e9b2f383e';
$client = new Services_Twilio($account_sid, $auth_token);

/*$message = $client->account->messages->create(array(
    'To' => $mobileNumber,
    'From' => "+17202592316",
    'MediaUrl' => "http://b&#105;t.ly/Myhubapp",
));*/

$message = $client->account->messages->sendMessage(
    '+17202592316', // From a Twilio number in your account
    $mobileNumber, // Text any number
    "http://bit.ly/Myhubapp"
);

if(!empty($message))
{
echo "text message was sent successfully";
}


/*$vmessage = $client->account->messages->get($message->sid);
echo $vmessage->body;*/

//header('Location: ' . $_SERVER['HTTP_REFERER']);
