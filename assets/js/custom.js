/**
 * FQpedia Custom Scripts
 */

// Google Analytics (gtag.js)
window.dataLayer = window.dataLayer || [];
function gtag(){dataLayer.push(arguments);}
gtag('js', new Date());
gtag('config', 'G-77SJ3C7RN2');

/* ========================================
   Breaking News Ticker - seamless scroll
   ======================================== */
(function () {
    document.addEventListener('DOMContentLoaded', function () {
        var track = document.getElementById('fq-ticker-track');
        if (!track) return;
        // Duplicate content for seamless infinite scroll
        var clone = track.cloneNode(true);
        clone.removeAttribute('id');
        track.appendChild.apply(track, Array.prototype.slice.call(clone.childNodes));
    });
})();

/* ========================================
   Multi-level Dropdown Navigation (Enova-style)
   Parses Ghost native {{navigation}} output.
   Dash-prefixed labels (- Item) become dropdown sub-items.
   Hash-prefixed labels (# Group) become footer column headers.
   ======================================== */
(function () {
    document.addEventListener('DOMContentLoaded', function () {
        var navList = document.querySelector('.gh-head-menu ul');
        if (!navList) return;

        // Ghost's {{navigation}} outputs <li class="nav-X"><a href="URL">Label</a></li>
        // We need to read label+url from the <a> elements, then reorganize
        var items = Array.prototype.slice.call(navList.children);
        var topLevelItem = null;

        items.forEach(function (item) {
            var link = item.querySelector('a');
            if (!link) return;

            var label = link.textContent || '';
            var url = link.getAttribute('href') || '';

            // Store data attributes for reference
            item.setAttribute('data-nav-label', label);
            item.setAttribute('data-nav-url', url);

            if (label.charAt(0) === '-') {
                // Sub-item: move into parent's dropdown
                var cleanLabel = label.replace(/^-\s*/, '');
                link.textContent = cleanLabel;

                if (topLevelItem && !topLevelItem.classList.contains('has-dropdown')) {
                    topLevelItem.classList.add('has-dropdown');
                    var dropdown = document.createElement('ul');
                    dropdown.className = 'gh-nav-dropdown';
                    topLevelItem.appendChild(dropdown);
                }

                if (topLevelItem) {
                    var dropdownList = topLevelItem.querySelector('.gh-nav-dropdown');
                    dropdownList.appendChild(item);
                }

                // Mark external links
                if (url && !url.startsWith('/') && !url.startsWith(window.location.origin)) {
                    link.target = '_blank';
                    link.rel = 'noopener';
                }
            } else {
                // Top-level item
                topLevelItem = item;

                // Mark external links
                if (url && !url.startsWith('/') && !url.startsWith(window.location.origin)) {
                    link.target = '_blank';
                    link.rel = 'noopener';
                }
            }
        });

        // Mobile dropdown toggle
        var dropdownParents = navList.querySelectorAll('.has-dropdown');
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
   Hash-prefixed labels (# Group) become column headers.
   ======================================== */
(function () {
    document.addEventListener('DOMContentLoaded', function () {
        var footerNav = document.getElementById('gh-footer-nav');
        if (!footerNav) return;

        // Ghost's {{navigation}} helper outputs <li> elements
        var items = Array.prototype.slice.call(footerNav.querySelectorAll('li'));
        if (items.length === 0) return;

        var hasColumns = false;
        var columns = [];
        var currentColumn = null;

        items.forEach(function (item) {
            var link = item.querySelector('a');
            if (!link) return;

            var label = link.textContent || '';
            var url = link.getAttribute('href') || '';

            if (label.charAt(0) === '#') {
                hasColumns = true;
                var cleanTitle = label.replace(/^#\s*/, '');
                currentColumn = { title: cleanTitle, links: [] };
                columns.push(currentColumn);
            } else {
                var linkData = { label: label, url: url };
                if (url && !url.startsWith('/') && !url.startsWith(window.location.origin)) {
                    linkData.external = true;
                }

                if (currentColumn) {
                    currentColumn.links.push(linkData);
                } else {
                    currentColumn = { title: null, links: [] };
                    columns.push(currentColumn);
                    currentColumn.links.push(linkData);
                }
            }
        });

        // Rebuild footer nav
        footerNav.innerHTML = '';
        footerNav.classList.add('footer-nav-processed');

        if (hasColumns) {
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
                        a.target = '_blank';
                        a.rel = 'noopener';
                    }
                    colDiv.appendChild(a);
                });
                if (col.title || col.links.length > 0) footerNav.appendChild(colDiv);
            });
        } else {
            footerNav.setAttribute('data-layout', 'single');
            columns.forEach(function (col) {
                col.links.forEach(function (linkData) {
                    var a = document.createElement('a');
                    a.href = linkData.url;
                    a.textContent = linkData.label;
                    if (linkData.external) {
                        a.target = '_blank';
                        a.rel = 'noopener';
                    }
                    footerNav.appendChild(a);
                });
            });
        }
    });
})();

/* ========================================
   Dark Mode Toggle
   ======================================== */
(function () {
    document.addEventListener('DOMContentLoaded', function () {
        var toggles = document.querySelectorAll('.gh-theme-toggle');
        if (toggles.length === 0) return;

        function getCurrentTheme() {
            return document.documentElement.getAttribute('data-theme') || 'light';
        }

        function applyTheme(theme) {
            document.documentElement.setAttribute('data-theme', theme);
            try { localStorage.setItem('fq-color-scheme', theme); } catch(e) {}
        }

        toggles.forEach(function (toggle) {
            toggle.addEventListener('click', function () {
                var current = getCurrentTheme();
                applyTheme(current === 'dark' ? 'light' : 'dark');
            });
        });

        try {
            if (!localStorage.getItem('fq-color-scheme') && window.matchMedia) {
                var mq = window.matchMedia('(prefers-color-scheme: dark)');
                mq.addEventListener('change', function (e) {
                    applyTheme(e.matches ? 'dark' : 'light');
                });
            }
        } catch(e) {}
    });
})();
