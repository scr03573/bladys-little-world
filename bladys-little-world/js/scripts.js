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
            home: "Home",
            programs: "Programs",
            schedule: "Schedule",
            contact: "Contact Information",
            welcome: "Blady’s Little World – A Family of Caring Hearts",
            intro: "Run by a mother and daughter, we create a safe, nurturing space where your child is treated like family, with a focus on bilingual learning.",
            requestInfo: "Request Information",
            scheduleTour: "Schedule a Tour",
            hours: "Operating Hours:",
            aboutUs: "About Us",
            founder1Title: "Ms. Bladymar Porras - Lead Teacher",
            founder1Desc: "Bladymar, the heart behind Blady’s Little World, has dedicated her life to creating a loving and engaging environment for children. Certified as a Child Development Associate (CDA), she blends interactive learning with bilingual education to ensure that each child feels valued and nurtured.",
            founder2Title: "Ms. Paola Pedraza - Assistant Teacher",
            founder2Desc: "Paola’s passion for early education, combined with her warm personality, helps children feel comfortable and confident. With 7 years of experience, she specializes in emotional development and interactive play. Every child in Paola’s care is given the individual attention they need to flourish.",
            infantCare: "Infant Care",
            infantCareDesc: "Our infant care program focuses on creating a cozy and loving atmosphere where your little ones can explore and develop at their own pace. We prioritize bonding, sensory play, and individual attention.",
            toddlerProgram: "Toddler Program",
            toddlerProgramDesc: "In our toddler program, children engage in active learning through play. We encourage curiosity and independence while introducing early literacy and language skills in both English and Spanish.",
            bilingualEducation: "Bilingual Education",
            bilingualEducationDesc: "We offer a bilingual curriculum that immerses children in both English and Spanish, fostering language development and cultural appreciation from an early age.",
            meals: "Healthy Meals and Snacks",
            mealsDesc: "We offer breakfast, lunch, and snacks that cater to dietary needs, ensuring your child receives the nutrition they need to grow and thrive.",
            contactUs: "Contact Us",
            provideDietaryNeeds: "Provide Your Child's Dietary Needs",
            childNameLabel: "Child's Name:",
            childNamePlaceholder: "Child's Name",
            ageGroupLabel: "Age Group:",
            ageGroupPlaceholder: "Select Age Group",
            ageGroupOption1: "Infant (5 months - 12 months)",
            ageGroupOption2: "Toddler (1 - 3 years)",
            dietaryRestrictionsLabel: "Dietary Restrictions:",
            dietaryRestrictionsPlaceholder: "Please list any dietary restrictions or allergies",
            preferredMealsLabel: "Preferred Meals:",
            preferredMealsPlaceholder: "List any preferred meals or snacks",
            submitDietaryNeeds: "Submit Dietary Needs",
            requestInformation: "Request Information",
            parentNameLabel: "Parent's Name:",
            parentNamePlaceholder: "Parent's Name",
            emailLabel: "Email Address:",
            emailPlaceholder: "Email Address",
            phoneLabel: "Phone Number:",
            phonePlaceholder: "Phone Number",
            additionalInfoLabel: "Additional Information:",
            additionalInfoPlaceholder: "Feel free to add any additional questions or requests",
            submitRequest: "Submit Request",
            scheduleTour: "Schedule a Tour",
            tourParentNameLabel: "Parent's Name:",
            tourParentNamePlaceholder: "Parent's Name",
            tourEmailLabel: "Email Address:",
            tourEmailPlaceholder: "Email Address",
            preferredTourDateLabel: "Preferred Tour Date:",
            preferredTourDatePlaceholder: "Preferred Tour Date",
            preferredTourTimeLabel: "Preferred Tour Time:",
            preferredTourTimePlaceholder: "Preferred Tour Time",
            scheduleTourButton: "Schedule Tour",
            getDirections: "Get Directions",
            close: "Close"
        },
        es: {
            home: "Inicio",
            programs: "Programas",
            schedule: "Horario",
            contact: "Información de Contacto",
            welcome: "Blady’s Little World – Una Familia de Corazones Cariñosos",
            intro: "Dirigido por una madre y una hija, creamos un espacio seguro y acogedor donde su hijo es tratado como familia, con un enfoque en el aprendizaje bilingüe.",
            requestInfo: "Solicitar Información",
            scheduleTour: "Programar una Visita",
            hours: "Horario de Atención:",
            aboutUs: "Sobre Nosotros",
            founder1Title: "Sra. Bladymar Porras - Maestra Principal",
            founder1Desc: "Bladymar, el corazón detrás de Blady’s Little World, ha dedicado su vida a crear un ambiente amoroso y atractivo para los niños. Certificada como Asociada de Desarrollo Infantil (CDA), combina el aprendizaje interactivo con la educación bilingüe para garantizar que cada niño se sienta valorado y cuidado.",
            founder2Title: "Sra. Paola Pedraza - Asistente de Maestra",
            founder2Desc: "La pasión de Paola por la educación temprana, combinada con su personalidad cálida, ayuda a los niños a sentirse cómodos y seguros. Con 7 años de experiencia, se especializa en desarrollo emocional y juego interactivo. Cada niño bajo el cuidado de Paola recibe la atención individual que necesita para florecer.",
            infantCare: "Cuidado de Bebés",
            infantCareDesc: "Nuestro programa de cuidado infantil se centra en crear un ambiente acogedor y amoroso donde los pequeños puedan explorar y desarrollarse a su propio ritmo. Priorizamos el vínculo, el juego sensorial y la atención individual.",
            toddlerProgram: "Programa para Niños Pequeños",
            toddlerProgramDesc: "En nuestro programa para niños pequeños, los niños participan en el aprendizaje activo a través del juego. Fomentamos la curiosidad y la independencia mientras introducimos las primeras habilidades de alfabetización y lenguaje tanto en inglés como en español.",
            bilingualEducation: "Educación Bilingüe",
            bilingualEducationDesc: "Ofrecemos un currículo bilingüe que sumerge a los niños en inglés y español, fomentando el desarrollo del lenguaje y la apreciación cultural desde una edad temprana.",
            meals: "Comidas y Snacks Saludables",
            mealsDesc: "Ofrecemos desayuno, almuerzo y meriendas que se adaptan a las necesidades dietéticas, asegurando que su hijo reciba la nutrición que necesita para crecer y prosperar.",
            contactUs: "Contáctenos",
            provideDietaryNeeds: "Proporcione las Necesidades Dietéticas de su Hijo",
            childNameLabel: "Nombre del Niño:",
            childNamePlaceholder: "Nombre del Niño",
            ageGroupLabel: "Grupo de Edad:",
            ageGroupPlaceholder: "Seleccione Grupo de Edad",
            ageGroupOption1: "Bebé (5 meses - 12 meses)",
            ageGroupOption2: "Niño Pequeño (1 - 3 años)",
            dietaryRestrictionsLabel: "Restricciones Dietéticas:",
            dietaryRestrictionsPlaceholder: "Por favor, liste cualquier restricción dietética o alergias",
            preferredMealsLabel: "Comidas Preferidas:",
            preferredMealsPlaceholder: "Liste cualquier comida o snack preferido",
            submitDietaryNeeds: "Enviar Necesidades Dietéticas",
            requestInformation: "Solicitar Información",
            parentNameLabel: "Nombre del Padre:",
            parentNamePlaceholder: "Nombre del Padre",
            emailLabel: "Correo Electrónico:",
            emailPlaceholder: "Correo Electrónico",
            phoneLabel: "Número de Teléfono:",
            phonePlaceholder: "Número de Teléfono",
            additionalInfoLabel: "Información Adicional:",
            additionalInfoPlaceholder: "Siéntase libre de agregar cualquier pregunta o solicitud adicional",
            submitRequest: "Enviar Solicitud",
            scheduleTour: "Programar una Visita",
            tourParentNameLabel: "Nombre del Padre:",
            tourParentNamePlaceholder: "Nombre del Padre",
            tourEmailLabel: "Correo Electrónico:",
            tourEmailPlaceholder: "Correo Electrónico",
            preferredTourDateLabel: "Fecha Preferida de la Visita:",
            preferredTourDatePlaceholder: "Fecha Preferida de la Visita",
            preferredTourTimeLabel: "Hora Preferida de la Visita:",
            preferredTourTimePlaceholder: "Hora Preferida de la Visita",
            scheduleTourButton: "Programar Visita",
            getDirections: "Obtener Direcciones",
            close: "Cerrar"
        };

        // Current Language
        let currentLanguage = localStorage.getItem('preferredLanguage') || 'en';

        // Function to update text content based on selected language
        function updateLanguage(lang) {
            // Update text content for elements with data-translate
            document.querySelectorAll('[data-translate]').forEach(element => {
                const key = element.getAttribute('data-translate');
                if (translations[lang] && translations[lang][key]) {
                    element.textContent = translations[lang][key];
                }
            });

            // Update placeholders for elements with data-translate-placeholder
            document.querySelectorAll('[data-translate-placeholder]').forEach(element => {
                const key = element.getAttribute('data-translate-placeholder');
                if (translations[lang] && translations[lang][key]) {
                    element.setAttribute('placeholder', translations[lang][key]);
                }
            });

            // Update select options with data-translate
            document.querySelectorAll('select option[data-translate]').forEach(option => {
                const key = option.getAttribute('data-translate');
                if (translations[lang] && translations[lang][key]) {
                    option.textContent = translations[lang][key];
                }
            });
        }

        // Function to adjust main content padding based on navbar height
        function adjustMainPadding() {
            const navbar = document.querySelector('.navbar');
            const mainContent = document.querySelector('main'); // Ensure your main content is wrapped in <main>

            if (navbar && mainContent) {
                const navbarHeight = navbar.offsetHeight;
                mainContent.style.paddingTop = `${navbarHeight}px`;
            }
        }

        // Initialize language and adjust padding on page load
        function init() {
            updateLanguage(currentLanguage);
            adjustMainPadding();

            // Update the language toggle button text if applicable
            const languageToggleButton = document.getElementById('language-toggle');
            const currentLanguageSpan = document.getElementById('current-language');
            if(languageToggleButton && currentLanguageSpan){
                currentLanguageSpan.textContent = currentLanguage.toUpperCase();
            }
        }

        init();

        // Adjust padding on window resize to handle dynamic navbar height changes
        window.addEventListener('resize', adjustMainPadding);

        /* ==========================================
           4. Language Toggle Button
        ========================================== */
        const languageToggle = document.getElementById('language-toggle');
        if(languageToggle){
            languageToggle.addEventListener('click', () => {
                // Toggle language
                currentLanguage = currentLanguage === 'en' ? 'es' : 'en';
                updateLanguage(currentLanguage);
                localStorage.setItem('preferredLanguage', currentLanguage);

                // Update the language toggle button text
                const currentLanguageSpan = document.getElementById('current-language');
                if(currentLanguageSpan){
                    currentLanguageSpan.textContent = currentLanguage.toUpperCase();
                }
            });
        }

        /* ==========================================
           5. Smooth Scrolling for Anchor Links
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
           6. Fade-in Animations on Scroll using Intersection Observer
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
           7. Initialize Bootstrap Components
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
           8. Google Maps Initialization
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
           9. Get Directions Button
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
           10. AJAX Form Submissions
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
                    name: contactForm.parentName.value.trim(),
                    email: contactForm.email.value.trim(),
                    phone: contactForm.phone.value.trim(),
                    additionalInfo: contactForm.additionalInfo.value.trim(),
                    recaptcha: recaptchaResponse
                };

                try {
                    const response = await fetch('YOUR_CONTACT_BACKEND_ENDPOINT', { // Replace with your backend endpoint
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json'
                        },
                        body: JSON.stringify(formData)
                    });

                    if (response.ok) {
                        alert(currentLanguage === 'en' ? 'Thank you for your message!' : '¡Gracias por su mensaje!');
                        contactForm.reset();
                        grecaptcha.reset();
                        contactForm.classList.remove('was-validated');
                    } else {
                        alert(currentLanguage === 'en' ? 'There was an error submitting your message. Please try again later.' : 'Hubo un error al enviar su mensaje. Por favor, inténtelo de nuevo más tarde.');
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
                    const response = await fetch('YOUR_DIETARY_BACKEND_ENDPOINT', { // Replace with your backend endpoint
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json'
                        },
                        body: JSON.stringify(formData)
                    });

                    if (response.ok) {
                        alert(currentLanguage === 'en' ? 'Your dietary needs have been submitted!' : '¡Sus necesidades dietéticas han sido enviadas!');
                        dietaryForm.reset();
                        grecaptcha.reset();
                        dietaryForm.classList.remove('was-validated');
                    } else {
                        alert(currentLanguage === 'en' ? 'There was an error submitting your information. Please try again later.' : 'Hubo un error al enviar su información. Por favor, inténtelo de nuevo más tarde.');
                    }
                } catch (error) {
                    console.error('Error:', error);
                    alert(currentLanguage === 'en' ? 'There was an error submitting your information. Please try again later.' : 'Hubo un error al enviar su información. Por favor, inténtelo de nuevo más tarde.');
                }
            });
        }

        /* ==========================================
           11. Initialize WOW.js Animations
        ========================================== */
        new WOW().init();
    });
});