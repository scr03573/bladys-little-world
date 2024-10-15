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
        const mainContent = document.querySelector('main'); // Ensure your main content is wrapped in <main>

        if (navbar) {
            if (window.scrollY > 50) { // Adjust the threshold as needed
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
       3. Geolocation Tracking
    ========================================== */
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(function (position) {
            const latitude = position.coords.latitude;
            const longitude = position.coords.longitude;
            console.log("Latitude: " + latitude + " Longitude: " + longitude);

            // Send location to your backend for tracking
            fetch('/send_location.php', { // Ensure this endpoint exists on your server
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    latitude: latitude,
                    longitude: longitude
                })
            })
            .then(response => response.json())
            .then(data => {
                console.log('Location data sent successfully:', data);
            })
            .catch(error => {
                console.error('Error sending location data:', error);
            });
        }, function (error) {
            console.error("Error obtaining location:", error);
        });
    } else {
        console.log("Geolocation is not supported by this browser.");
    }

    /* ==========================================
       4. Smooth Scrolling for Anchor Links
    ========================================== */
    const anchorLinks = document.querySelectorAll('a[href^="#"]');
    anchorLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                const navbar = document.querySelector('.navbar');
                const navbarHeight = navbar ? navbar.offsetHeight : 0;
                const targetPosition = target.getBoundingClientRect().top + window.pageYOffset - navbarHeight;

                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });

    /* ==========================================
       5. Fade-in Animations on Scroll using Intersection Observer
    ========================================== */
    const faders = document.querySelectorAll('.fade-in');

    const appearOptions = {
        threshold: 0.1,
        rootMargin: "0px 0px -50px 0px"
    };

    const appearOnScroll = new IntersectionObserver(function(entries, appearOnScroll) {
        entries.forEach(entry => {
            if (!entry.isIntersecting) return;
            entry.target.classList.add('fade-in-visible');
            appearOnScroll.unobserve(entry.target);
        });
    }, appearOptions);

    faders.forEach(fader => {
        appearOnScroll.observe(fader);
    });

    /* ==========================================
       6. Initialize Bootstrap Components
    ========================================== */
    // Initialize Bootstrap Accordions and Modals
    const accordions = document.querySelectorAll('.accordion-button');
    accordions.forEach(accordion => {
        accordion.addEventListener('click', () => {
            // Additional JavaScript if needed
        });
    });

    // Initialize Carousel for Portfolio Section
    const portfolioCarousel = document.querySelector('#portfolioCarousel');
    if (portfolioCarousel) {
        new bootstrap.Carousel(portfolioCarousel, {
            interval: 5000,
            wrap: true
        });
    }

    // Initialize tooltips (if any)
    const tooltipTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="tooltip"]'));
    const tooltipList = tooltipTriggerList.map(function (tooltipTriggerEl) {
        return new bootstrap.Tooltip(tooltipTriggerEl);
    });

    /* ==========================================
       7. Google Maps Initialization
    ========================================== */
    // The initMap function is defined globally in the HTML for Google Maps callback.
    window.initMap = function() {
        // Define the location coordinates
        const location = { lat: 42.345573, lng: -71.098326 }; // Replace with your actual coordinates

        // Create a new map instance
        const map = new google.maps.Map(document.getElementById('map'), {
            center: location,
            zoom: 15
        });

        // Add a marker to the map
        const marker = new google.maps.Marker({
            position: location,
            map: map,
            title: "Blady's Little World"
        });
    };

    /* ==========================================
       8. Get Directions Button
    ========================================== */
    const getDirectionsBtn = document.getElementById('get-directions');
    if(getDirectionsBtn){
        getDirectionsBtn.addEventListener('click', (e) => {
            e.preventDefault();
            const destination = encodeURIComponent("84 Warren Ave, Marlborough, MA 01752"); // Replace with your actual address
            window.open(`https://www.google.com/maps/dir/?api=1&destination=${destination}`, '_blank');
        });
    }

    /* ==========================================
       9. AJAX Form Submissions
    ========================================== */
    // Contact Form Submission
    const contactForm = document.getElementById('contact-form');
    if(contactForm){
        contactForm.addEventListener('submit', async (e) => {
            e.preventDefault();

            // Validate reCAPTCHA
            const recaptchaResponse = grecaptcha.getResponse();
            if (recaptchaResponse.length === 0) {
                alert(currentLanguage === 'en' ? 'Please complete the reCAPTCHA.' : 'Por favor, complete el reCAPTCHA.');
                return;
            }

            // Simple Frontend Validation
            if (!contactForm.checkValidity()) {
                contactForm.classList.add('was-validated');
                return;
            }

            const formData = {
                parentName: contactForm.parentName.value.trim(),
                email: contactForm.email.value.trim(),
                phone: contactForm.phone.value.trim(),
                additionalInfo: contactForm.additionalInfo.value.trim(),
                recaptcha: recaptchaResponse
            };

            try {
                const response = await fetch('submit_contact.php', { // Replace with your backend endpoint if different
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(formData)
                });

                const result = await response.json();

                if (response.ok && result.status === 'success') {
                    alert(currentLanguage === 'en' ? 'Thank you for your message!' : '¡Gracias por su mensaje!');
                    contactForm.reset();
                    grecaptcha.reset();
                    contactForm.classList.remove('was-validated');
                } else {
                    alert(currentLanguage === 'en' ? result.message || 'There was an error submitting your message. Please try again later.' : result.message || 'Hubo un error al enviar su mensaje. Por favor, inténtelo de nuevo más tarde.');
                }
            } catch (error) {
                console.error('Error:', error);
                alert(currentLanguage === 'en' ? 'There was an error submitting your message. Please try again later.' : 'Hubo un error al enviar su mensaje. Por favor, inténtelo de nuevo más tarde.');
            }
        });
    }

    // Dietary Restrictions Form Submission
    const dietaryForm = document.getElementById('dietary-form');
    if(dietaryForm){
        dietaryForm.addEventListener('submit', async (e) => {
            e.preventDefault();

            // Validate reCAPTCHA
            const recaptchaResponse = grecaptcha.getResponse();
            if (recaptchaResponse.length === 0) {
                alert(currentLanguage === 'en' ? 'Please complete the reCAPTCHA.' : 'Por favor, complete el reCAPTCHA.');
                return;
            }

            // Simple Frontend Validation
            if (!dietaryForm.checkValidity()) {
                dietaryForm.classList.add('was-validated');
                return;
            }

            const formData = {
                childName: dietaryForm.childName.value.trim(),
                ageGroup: dietaryForm.ageGroup.value.trim(),
                dietaryRestrictions: dietaryForm.dietaryRestrictions.value.trim(),
                preferredMeals: dietaryForm.preferredMeals.value.trim(),
                recaptcha: recaptchaResponse
            };

            try {
                const response = await fetch('submit_dietary_needs.php', { // Replace with your backend endpoint if different
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(formData)
                });

                const result = await response.json();

                if (response.ok && result.status === 'success') {
                    alert(currentLanguage === 'en' ? 'Your dietary needs have been submitted!' : '¡Sus necesidades dietéticas han sido enviadas!');
                    dietaryForm.reset();
                    grecaptcha.reset();
                    dietaryForm.classList.remove('was-validated');
                } else {
                    alert(currentLanguage === 'en' ? result.message || 'There was an error submitting your information. Please try again later.' : result.message || 'Hubo un error al enviar su información. Por favor, inténtelo de nuevo más tarde.');
                }
            } catch (error) {
                console.error('Error:', error);
                alert(currentLanguage === 'en' ? 'There was an error submitting your information. Please try again later.' : 'Hubo un error al enviar su información. Por favor, inténtelo de nuevo más tarde.');
            }
        });
    }

    // Tour Scheduling Form Submission
    const tourForm = document.getElementById('tour-form');
    if(tourForm){
        tourForm.addEventListener('submit', async (e) => {
            e.preventDefault();

            // Simple Frontend Validation
            if (!tourForm.checkValidity()) {
                tourForm.classList.add('was-validated');
                return;
            }

            const formData = {
                tourParentName: tourForm.tourParentName.value.trim(),
                tourEmail: tourForm.tourEmail.value.trim(),
                preferredTourDate: tourForm.preferredTourDate.value.trim(),
                preferredTourTime: tourForm.preferredTourTime.value.trim()
            };

            try {
                const response = await fetch('schedule_tour.php', { // Replace with your backend endpoint if different
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(formData)
                });

                const result = await response.json();

                if (response.ok && result.status === 'success') {
                    alert(currentLanguage === 'en' ? 'Tour scheduled successfully!' : '¡Tour programado con éxito!');
                    tourForm.reset();
                    tourForm.classList.remove('was-validated');
                } else {
                    alert(currentLanguage === 'en' ? result.message || 'There was an error scheduling your tour. Please try again later.' : result.message || 'Hubo un error al programar su tour. Por favor, inténtelo de nuevo más tarde.');
                }
            } catch (error) {
                console.error('Error:', error);
                alert(currentLanguage === 'en' ? 'There was an error scheduling your tour. Please try again later.' : 'Hubo un error al programar su tour. Por favor, inténtelo de nuevo más tarde.');
            }
        });
    }

    /* ==========================================
       10. Initialize WOW.js Animations
    ========================================== */
    new WOW().init();
});