// gtag.js
(function() {
    // Load the Google Analytics tag
    const gtag = document.createElement('script');
    gtag.src = "https://www.googletagmanager.com/gtag/js?id=G-E53BXH2GT2";
    gtag.async = true;
    document.head.appendChild(gtag);

    window.dataLayer = window.dataLayer || [];
    function gtag(){dataLayer.push(arguments);}
    gtag('js', new Date());

    gtag('config', 'G-E53BXH2GT2', {
        'linker': {
            'domains': ['bladyslittleworld.com']
        }
    });
})();