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
       3. Language Toggle and Translation Functionality
    ========================================== */
    // Translation Data
    const translations = {
        en: {
            // ... (Your existing translation keys and values)
        },
        es: {
            // ... (Your existing translation keys and values)
        }
    };

    // Current Language
    let currentLanguage = localStorage.getItem('preferredLanguage') || 'en';

    // Function to update text content based on selected language
    function updateLanguage(lang) {
        document.querySelectorAll('[data-translate]').forEach(element => {
            const key = element.getAttribute('data-translate');
            if (translations[lang] && translations[lang][key]) {
                element.textContent = translations[lang][key];
            }
        });

        document.querySelectorAll('[data-translate-placeholder]').forEach(element => {
            const key = element.getAttribute('data-translate-placeholder');
            if (translations[lang] && translations[lang][key]) {
                element.setAttribute('placeholder', translations[lang][key]);
            }
        });

        document.querySelectorAll('select option[data-translate]').forEach(option => {
            const key = option.getAttribute('data-translate');
            if (translations[lang] && translations[lang][key]) {
                option.textContent = translations[lang][key];
            }
        });
    }

    // Initialize language on page load
    function initLanguage() {
        updateLanguage(currentLanguage);
        const languageToggleButton = document.getElementById('language-toggle');
        const currentLanguageSpan = document.getElementById('current-language');
        if (languageToggleButton && currentLanguageSpan) {
            currentLanguageSpan.textContent = currentLanguage.toUpperCase();
        }
    }

    initLanguage();

    /* ==========================================
       4. Language Toggle Button
    ========================================== */
    const languageToggle = document.getElementById('language-toggle');
    if (languageToggle) {
        languageToggle.addEventListener('click', () => {
            currentLanguage = currentLanguage === 'en' ? 'es' : 'en';
            updateLanguage(currentLanguage);
            localStorage.setItem('preferredLanguage', currentLanguage);
            const currentLanguageSpan = document.getElementById('current-language');
            if (currentLanguageSpan) {
                currentLanguageSpan.textContent = currentLanguage.toUpperCase();
            }
        });
    }

    /* ==========================================
       5. AJAX Form Submissions
    ========================================== */
    // Reuse AJAX submission code from previous sections for forms

    /* ==========================================
       11. Initialize WOW.js Animations
    ========================================== */
    new WOW().init();
});