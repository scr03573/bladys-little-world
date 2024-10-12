// scripts.js

document.addEventListener('DOMContentLoaded', () => {
    // Back to Top Button
    const backToTopButton = document.getElementById('back-to-top');

    // Show or Hide Back to Top Button based on scroll position
    window.addEventListener('scroll', () => {
        if (window.scrollY > 300) {
            backToTopButton.style.display = 'block';
            backToTopButton.style.opacity = '1';
        } else {
            backToTopButton.style.opacity = '0';
            setTimeout(() => {
                backToTopButton.style.display = 'none';
            }, 300);
        }
    });

    // Smooth Scroll to Top
    backToTopButton.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });

    // Sticky Call-to-Action Buttons
    const ctaButtons = document.querySelectorAll('.btn-primary, .btn-secondary');

    ctaButtons.forEach(btn => {
        btn.classList.add('sticky-cta');
    });

    // Handle Team Profile Modals (if multiple team members)
    // Example for multiple team members
    const teamModals = document.querySelectorAll('.team-card .btn');

    teamModals.forEach(modalBtn => {
        modalBtn.addEventListener('click', () => {
            // Modal functionality handled by Bootstrap
        });
    });

    // Initialize Google Map
    window.initMap = function() {
        const location = { lat: 40.7128, lng: -74.0060 }; // Example coordinates (New York City)
        const map = new google.maps.Map(document.getElementById('map'), {
            center: location,
            zoom: 15
        });
        const marker = new google.maps.Marker({
            position: location,
            map: map,
            title: "Blady's Little World"
        });
    };

    // Get Directions Button
    const getDirectionsBtn = document.getElementById('get-directions');
    getDirectionsBtn.addEventListener('click', (e) => {
        e.preventDefault();
        const destination = encodeURIComponent("1600 Amphitheatre Parkway, Mountain View, CA");
        window.open(`https://www.google.com/maps/dir/?api=1&destination=${destination}`, '_blank');
    });

    // AJAX Contact Form Submission
    const contactForm = document.getElementById('contact-form');
    contactForm.addEventListener('submit', async (e) => {
        e.preventDefault();

        // Validate reCAPTCHA
        const recaptchaResponse = grecaptcha.getResponse();
        if (recaptchaResponse.length === 0) {
            alert('Please complete the reCAPTCHA.');
            return;
        }

        const formData = {
            name: contactForm.contactName.value.trim(),
            email: contactForm.contactEmail.value.trim(),
            message: contactForm.contactMessage.value.trim(),
            recaptcha: recaptchaResponse
        };

        try {
            const response = await fetch('YOUR_BACKEND_ENDPOINT', { // Replace with your backend endpoint
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(formData)
            });

            if (response.ok) {
                alert('Thank you for your message!');
                contactForm.reset();
                grecaptcha.reset();
            } else {
                alert('There was an error submitting your message. Please try again later.');
            }
        } catch (error) {
            console.error('Error:', error);
            alert('There was an error submitting your message. Please try again later.');
        }
    });

    // AJAX Dietary Restrictions Form Submission
    const dietaryForm = document.getElementById('dietary-form');
    dietaryForm.addEventListener('submit', async (e) => {
        e.preventDefault();

        // Validate reCAPTCHA
        const recaptchaResponse = grecaptcha.getResponse();
        if (recaptchaResponse.length === 0) {
            alert('Please complete the reCAPTCHA.');
            return;
        }

        const formData = {
            childName: dietaryForm.childName.value.trim(),
            dietaryNeeds: dietaryForm.dietaryNeeds.value.trim(),
            recaptcha: recaptchaResponse
        };

        try {
            const response = await fetch('YOUR_BACKEND_ENDPOINT', { // Replace with your backend endpoint
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(formData)
            });

            if (response.ok) {
                alert('Your dietary needs have been submitted!');
                dietaryForm.reset();
                grecaptcha.reset();
            } else {
                alert('There was an error submitting your information. Please try again later.');
            }
        } catch (error) {
            console.error('Error:', error);
            alert('There was an error submitting your information. Please try again later.');
        }
    });

    // Initialize Bootstrap Accordions and Modals
    var accordions = document.querySelectorAll('.accordion-button');
    accordions.forEach(accordion => {
        accordion.addEventListener('click', () => {
            // Additional JavaScript if needed
        });
    });

    // Initialize Carousel for Bilingual Education Section
    const bilingualCarousel = document.querySelector('#bilingualCarousel');
    if (bilingualCarousel) {
        new bootstrap.Carousel(bilingualCarousel, {
            interval: 3000,
            wrap: true
        });
    }

    // Language Toggle Button
    const languageToggle = document.getElementById('language-toggle');
    languageToggle.addEventListener('click', () => {
        const currentLang = document.getElementById('language-selector').value;
        const newLang = currentLang === 'en' ? 'es' : 'en';
        document.getElementById('language-selector').value = newLang;
        const event = new Event('change');
        languageSelector.dispatchEvent(event);
    });

    // Smooth Scrolling for Anchor Links
    const anchorLinks = document.querySelectorAll('a[href^="#"]');
    anchorLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                window.scrollTo({
                    top: target.offsetTop - 70, // Adjust for fixed navbar height
                    behavior: 'smooth'
                });
            }
        });
    });

    // Handle Sticky CTA Buttons Responsively
    function handleStickyCTAs() {
        if (window.innerWidth > 768) {
            ctaButtons.forEach(btn => {
                btn.classList.add('position-fixed', 'bottom-0', 'end-0', 'm-3');
            });
        } else {
            ctaButtons.forEach(btn => {
                btn.classList.remove('position-fixed', 'bottom-0', 'end-0', 'm-3');
            });
        }
    }

    window.addEventListener('resize', handleStickyCTAs);
    handleStickyCTAs();

    // Initialize all Bootstrap tooltips (if any)
    var tooltipTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="tooltip"]'))
    var tooltipList = tooltipTriggerList.map(function (tooltipTriggerEl) {
      return new bootstrap.Tooltip(tooltipTriggerEl)
    })
});
