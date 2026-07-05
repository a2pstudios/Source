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
                    { "proName": "INDEX:HSI", "title": "恆生指數" },
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

/* ========================================
   Multi-level Dropdown Navigation (Enova-style)
   Dash-prefixed labels (- Item) become sub-items
   ======================================== */
(function () {
    document.addEventListener('DOMContentLoaded', function () {
        var navList = document.getElementById('gh-primary-nav');
        if (!navList) return;

        var items = Array.prototype.slice.call(navList.querySelectorAll(':scope > .nav-item'));
        var topLevelItem = null;

        items.forEach(function (item) {
            var label = item.getAttribute('data-nav-label') || '';
            var url = item.getAttribute('data-nav-url') || '';
            var link = item.querySelector('a');

            // Check if it's a sub-item (starts with -)
            if (label.charAt(0) === '-') {
                var cleanLabel = label.replace(/^-\s*/, '');

                // Create or find dropdown for the parent
                if (topLevelItem && !topLevelItem.classList.contains('has-dropdown')) {
                    topLevelItem.classList.add('has-dropdown');
                    var dropdown = document.createElement('ul');
                    dropdown.className = 'gh-nav-dropdown';
                    topLevelItem.appendChild(dropdown);
                }

                if (topLevelItem) {
                    var dropdownList = topLevelItem.querySelector('.gh-nav-dropdown');
                    var subLi = document.createElement('li');
                    var subLink = document.createElement('a');
                    subLink.href = url;
                    subLink.textContent = cleanLabel;

                    // Mark external links
                    if (url && !url.startsWith('/') && !url.startsWith(window.location.origin)) {
                        subLink.setAttribute('data-external', 'true');
                        subLink.target = '_blank';
                        subLink.rel = 'noopener';
                    }

                    subLi.appendChild(subLink);
                    dropdownList.appendChild(subLi);

                    // Remove the original sub-item from the top level
                    item.remove();
                }
            } else {
                // Top-level item
                topLevelItem = item;

                // Mark external links on top-level items too
                if (link && url && !url.startsWith('/') && !url.startsWith(window.location.origin)) {
                    link.setAttribute('data-external', 'true');
                    link.target = '_blank';
                    link.rel = 'noopener';
                }
            }
        });

        // Mobile: toggle dropdown on click
        var dropdownParents = navList.querySelectorAll('.gh-nav-item.has-dropdown');
        dropdownParents.forEach(function (parent) {
            var parentLink = parent.querySelector(':scope > a');
            if (parentLink) {
                parentLink.addEventListener('click', function (e) {
                    if (window.innerWidth <= 767) {
                        e.preventDefault();
                        parent.classList.toggle('expanded');
                    }
                });
            }
        });
    });
})();

/* ========================================
   Footer Secondary Navigation with Grouped Columns
   Hash-prefixed labels (# Group) become column headers
   ======================================== */
(function () {
    document.addEventListener('DOMContentLoaded', function () {
        var footerNav = document.getElementById('gh-footer-nav');
        if (!footerNav) return;

        var items = Array.prototype.slice.call(footerNav.querySelectorAll('.footer-nav-item'));
        if (items.length === 0) return;

        var hasColumns = false;
        var columns = [];
        var currentColumn = null;

        items.forEach(function (item) {
            var label = item.getAttribute('data-nav-label') || '';
            var url = item.getAttribute('data-nav-url') || '';
            var link = item.querySelector('a');

            // Check if it's a column header (starts with #)
            if (label.charAt(0) === '#') {
                hasColumns = true;
                var cleanTitle = label.replace(/^#\s*/, '');

                currentColumn = {
                    title: cleanTitle,
                    links: []
                };
                columns.push(currentColumn);
            } else {
                // Regular link item
                var linkData = {
                    label: label,
                    url: url
                };

                // Mark external links
                if (url && !url.startsWith('/') && !url.startsWith(window.location.origin)) {
                    linkData.external = true;
                    if (link) {
                        link.setAttribute('data-external', 'true');
                        link.target = '_blank';
                        link.rel = 'noopener';
                    }
                }

                if (currentColumn) {
                    currentColumn.links.push(linkData);
                } else {
                    // No column header yet, create a default column
                    if (!currentColumn) {
                        currentColumn = { title: null, links: [] };
                        columns.push(currentColumn);
                    }
                    currentColumn.links.push(linkData);
                }
            }
        });

        // Clear the container
        footerNav.innerHTML = '';
        footerNav.classList.add('footer-nav-processed');

        if (hasColumns) {
            // Render grouped columns
            footerNav.setAttribute('data-layout', 'columns');

            columns.forEach(function (col) {
                var colDiv = document.createElement('div');
                colDiv.className = 'footer-nav-column';

                if (col.title) {
                    var titleEl = document.createElement('div');
                    titleEl.className = 'footer-nav-column-title';
                    titleEl.textContent = col.title;
                    colDiv.appendChild(titleEl);
                }

                col.links.forEach(function (linkData) {
                    var a = document.createElement('a');
                    a.href = linkData.url;
                    a.textContent = linkData.label;
                    if (linkData.external) {
                        a.setAttribute('data-external', 'true');
                        a.target = '_blank';
                        a.rel = 'noopener';
                    }
                    colDiv.appendChild(a);
                });

                if (col.title || col.links.length > 0) {
                    footerNav.appendChild(colDiv);
                }
            });
        } else {
            // Render as single horizontal list (Quick Links style)
            footerNav.setAttribute('data-layout', 'single');

            columns.forEach(function (col) {
                col.links.forEach(function (linkData) {
                    var a = document.createElement('a');
                    a.href = linkData.url;
                    a.textContent = linkData.label;
                    if (linkData.external) {
                        a.setAttribute('data-external', 'true');
                        a.target = '_blank';
                        a.rel = 'noopener';
                    }
                    footerNav.appendChild(a);
                });
            });
        }
    });
})();
