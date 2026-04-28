/**
 * FQpedia Custom Scripts
 */

// Google Analytics (gtag.js)
window.dataLayer = window.dataLayer || [];
function gtag(){dataLayer.push(arguments);}
gtag('js', new Date());
gtag('config', 'G-77SJ3C7RN2');

// TradingView Ticker Tape (Lazy Loaded) - Disabled
/*
window.addEventListener('load', function() {
    setTimeout(function() {
        const tvWrapper = document.getElementById('tv-ticker-wrapper');
        if (tvWrapper) {
            const script = document.createElement('script');
            script.type = 'text/javascript';
            script.src = 'https://s3.tradingview.com/external-embedding/embed-widget-ticker-tape.js';
            script.async = true;
            script.innerHTML = JSON.stringify({
                "symbols": [
                    { "proName": "INDEX:HSI", "title": "恒生指數" },
                    { "proName": "FOREXCOM:SPXUSD", "title": "標普 500 指數" },
                    { "proName": "FOREXCOM:NSXUSD", "title": "納斯達克 100" },
                    { "proName": "FOREXCOM:DJI", "title": "道瓊斯工業指數" },
                    { "proName": "OANDA:XAUUSD", "title": "現貨黃金" },
                    { "proName": "OANDA:XAGUSD", "title": "現貨白銀" },
                    { "proName": "TVC:UKOIL", "title": "布蘭特原油" },
                    { "proName": "BITSTAMP:BTCUSD", "title": "比特幣" }
                ],
                "showSymbolLogo": true,
                "colorTheme": "dark",
                "isTransparent": false,
                "displayMode": "adaptive",
                "locale": "zh_TW"
            });
            tvWrapper.appendChild(script);
        }
    }, 1500); // Delay 1.5s for PageSpeed performance
});
*/
