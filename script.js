document.addEventListener('DOMContentLoaded', function() {
    const pageLoader = document.getElementById('pageLoader');
    const burgerMenu = document.getElementById('burgerMenu');
    const mobileMenu = document.getElementById('mobileMenu');
    const closeMenu = document.getElementById('closeMenu');
    const navList = document.getElementById('navList');
    const cookieBanner = document.getElementById('cookieBanner');
    const cookieAccept = document.getElementById('cookieAccept');
    const cookieReject = document.getElementById('cookieReject');
    const cookieSettings = document.getElementById('cookieSettings');
    const cookieSettingsPanel = document.getElementById('cookieSettingsPanel');
    const cookieSave = document.getElementById('cookieSave');

    if (pageLoader) {
        setTimeout(function() {
            pageLoader.classList.add('hidden');
        }, 1000);
    }

    if (burgerMenu) {
        burgerMenu.addEventListener('click', function() {
            burgerMenu.classList.toggle('active');
            if (mobileMenu) {
                mobileMenu.classList.toggle('active');
            }
        });
    }

    if (closeMenu) {
        closeMenu.addEventListener('click', function() {
            if (mobileMenu) {
                mobileMenu.classList.remove('active');
            }
            if (burgerMenu) {
                burgerMenu.classList.remove('active');
            }
        });
    }

    document.addEventListener('click', function(e) {
        if (mobileMenu && mobileMenu.classList.contains('active')) {
            if (!mobileMenu.contains(e.target) && !burgerMenu.contains(e.target)) {
                mobileMenu.classList.remove('active');
                if (burgerMenu) {
                    burgerMenu.classList.remove('active');
                }
            }
        }
    });

    if (window.location.pathname.includes('home.html') || window.location.pathname === '/' || window.location.pathname.endsWith('/')) {
        const cookieConsent = localStorage.getItem('cookieConsent');
        if (!cookieConsent && cookieBanner) {
            setTimeout(function() {
                cookieBanner.classList.add('show');
            }, 500);
        }
    } else {
        if (cookieBanner) {
            cookieBanner.style.display = 'none';
        }
    }

    if (cookieAccept) {
        cookieAccept.addEventListener('click', function() {
            localStorage.setItem('cookieConsent', 'accepted');
            localStorage.setItem('essentialCookies', 'true');
            localStorage.setItem('analyticsCookies', 'true');
            localStorage.setItem('marketingCookies', 'true');
            if (cookieBanner) {
                cookieBanner.classList.remove('show');
            }
        });
    }

    if (cookieReject) {
        cookieReject.addEventListener('click', function() {
            localStorage.setItem('cookieConsent', 'rejected');
            localStorage.setItem('essentialCookies', 'true');
            localStorage.setItem('analyticsCookies', 'false');
            localStorage.setItem('marketingCookies', 'false');
            if (cookieBanner) {
                cookieBanner.classList.remove('show');
            }
        });
    }

    if (cookieSettings) {
        cookieSettings.addEventListener('click', function() {
            if (cookieSettingsPanel) {
                cookieSettingsPanel.classList.toggle('show');
            }
        });
    }

    if (cookieSave) {
        cookieSave.addEventListener('click', function() {
            const essentialCookies = document.getElementById('essentialCookies');
            const analyticsCookies = document.getElementById('analyticsCookies');
            const marketingCookies = document.getElementById('marketingCookies');

            localStorage.setItem('cookieConsent', 'custom');
            localStorage.setItem('essentialCookies', 'true');
            localStorage.setItem('analyticsCookies', analyticsCookies ? analyticsCookies.checked : 'false');
            localStorage.setItem('marketingCookies', marketingCookies ? marketingCookies.checked : 'false');

            if (cookieBanner) {
                cookieBanner.classList.remove('show');
            }
            if (cookieSettingsPanel) {
                cookieSettingsPanel.classList.remove('show');
            }
        });
    }

    const savedAnalytics = localStorage.getItem('analyticsCookies');
    const savedMarketing = localStorage.getItem('marketingCookies');

    if (cookieSettingsPanel) {
        const analyticsCheckbox = document.getElementById('analyticsCookies');
        const marketingCheckbox = document.getElementById('marketingCookies');

        if (analyticsCheckbox && savedAnalytics === 'true') {
            analyticsCheckbox.checked = true;
        }
        if (marketingCheckbox && savedMarketing === 'true') {
            marketingCheckbox.checked = true;
        }
    }

    const links = document.querySelectorAll('a[href]');
    links.forEach(function(link) {
        if (!link.href.includes('mailto:') && !link.href.includes('tel:') && !link.href.includes('#')) {
            link.addEventListener('click', function(e) {
                const href = this.getAttribute('href');
                const currentPath = window.location.pathname;
                const targetPath = new URL(href, window.location.origin).pathname;
                
                if (href && !href.startsWith('http') && targetPath !== currentPath) {
                    if (pageLoader) {
                        pageLoader.classList.remove('hidden');
                    }
                } else if (href && href.startsWith('http') && !href.includes(window.location.hostname)) {
                    return;
                }
            });
        }
    });

    window.addEventListener('pageshow', function(event) {
        if (pageLoader) {
            pageLoader.classList.add('hidden');
        }
    });

    window.addEventListener('popstate', function() {
        if (pageLoader) {
            pageLoader.classList.add('hidden');
        }
    });

    if (pageLoader) {
        window.addEventListener('load', function() {
            setTimeout(function() {
                pageLoader.classList.add('hidden');
            }, 500);
        });
    }

    const images = document.querySelectorAll('img');
    images.forEach(function(img) {
        img.addEventListener('error', function() {
            this.style.display = 'none';
            console.warn('Image failed to load: ' + this.src);
        });
    });
});

