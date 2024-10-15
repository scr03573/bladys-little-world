document.addEventListener('DOMContentLoaded', () => {
    /* ==========================================
       1. Back to Top Button
    ========================================== */
    const backToTopButton = document.getElementById('back-to-top');

    // Show or Hide Back to Top Button based on scroll position
    window.addEventListener('scroll', () => {
        if (window.scrollY > 300) {
            backToTopButton.classList.add('show');
        } else {
            backToTopButton.classList.remove('show');
        }

        /* ==========================================
           2. Navbar Scroll Behavior
        ========================================== */
        const navbar = document.querySelector('.navbar');
        const mainContent = document.querySelector('main');

        if (navbar) {
            if (window.scrollY > 50) {
                navbar.classList.add('scrolled');
                if (mainContent) {
                    mainContent.classList.add('navbar-scrolled');
                }
            } else {
                navbar.classList.remove('scrolled');
                if (mainContent) {
                    mainContent.classList.remove('navbar-scrolled');
                }
            }
        }
    });

    // Smooth Scroll to Top
    if (backToTopButton) {
        backToTopButton.addEventListener('click', () => {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }

    /* ==========================================
       3. Smooth Scrolling for Anchor Links
    ========================================== */
    const anchorLinks = document.querySelectorAll('a[href^="#"]');
    anchorLinks.forEach(link => {
        link.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                const navbarHeight = document.querySelector('.navbar').offsetHeight;
                window.scrollTo({
                    top: target.offsetTop - navbarHeight,
                    behavior: 'smooth'
                });
            }
        });
    });

    /* ==========================================
       4. Google Maps Initialization
    ========================================== */
    window.initMap = function () {
        const location = { lat: 42.345573, lng: -71.098326 }; // Update with your actual coordinates
        const map = new google.maps.Map(document.getElementById('map'), {
            center: location,
            zoom: 15
        });

        new google.maps.Marker({
            position: location,
            map: map,
            title: "Blady's Little World"
        });
    };

    /* ==========================================
       5. Get Directions Button
    ========================================== */
    const getDirectionsBtn = document.getElementById('get-directions');
    if (getDirectionsBtn) {
        getDirectionsBtn.addEventListener('click', (e) => {
            e.preventDefault();
            const destination = encodeURIComponent("84 Warren Ave, Marlborough, MA 01752");
            window.open(`https://www.google.com/maps/dir/?api=1&destination=${destination}`, '_blank');
        });
    }

    /* ==========================================
       6. Initialize WOW.js Animations
    ========================================== */
    new WOW().init();
});