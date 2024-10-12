// translate.js

document.addEventListener('DOMContentLoaded', () => {
    const languageSelector = document.getElementById('language-selector');
    const languageToggle = document.getElementById('language-toggle');
    const defaultLanguage = 'en';

    // Translation Data
    const translations = {
        en: {
            home: "Home",
            about: "About Us",
            programs: "Programs",
            contact: "Contact",
            welcome: "Welcome to Blady's Little World",
            discover: "Discover a place of wonder and exploration.",
            requestInfo: "Request Information",
            scheduleTour: "Schedule a Tour",
            aboutUs: "About Us",
            aboutDescription: "Blady's Little World is dedicated to providing a nurturing environment for early childhood education and fostering bilingual learning. Our mission is to empower children with the skills and confidence they need to thrive in a diverse and dynamic world.",
            vision: "Our Vision",
            visionContent: "To create a world where every child has the opportunity to learn, grow, and excel in a bilingual environment that respects and celebrates diversity.",
            mission: "Our Mission",
            missionContent: "To provide high-quality education and care that fosters the intellectual, social, and emotional development of each child, preparing them for future success.",
            programs: "Programs",
            infantCare: "Infant Care",
            ageGroupInfant: "0-12 Months",
            infantCareDescription: "Our Infant Care program provides a safe and loving environment where your little ones can grow and develop through age-appropriate activities and personalized attention.",
            toddlerProgram: "Toddler Program",
            ageGroupToddler: "1-3 Years",
            toddlerProgramDescription: "Our Toddler Program encourages exploration and creativity, helping children develop essential skills in a fun and engaging setting.",
            ourTeam: "Our Team",
            teamMember1: "Jane Doe",
            teamMember1Role: "Lead Educator",
            teamMember1Bio: "Jane has over 10 years of experience in early childhood education, specializing in bilingual learning environments. She is passionate about fostering a love for learning in every child.",
            bilingualEducation: "Bilingual Education",
            downloadBrochure: "Download Brochure",
            healthyMeals: "Healthy Meals and Snacks",
            dietaryRestrictions: "Dietary Restrictions",
            childNameLabel: "Child's Name:",
            dietaryNeedsLabel: "Dietary Needs:",
            submitDietary: "Submit",
            contactUs: "Contact Us",
            nameLabel: "Name:",
            emailLabel: "Email:",
            messageLabel: "Message:",
            sendMessage: "Send Message",
            getDirections: "Get Directions",
            close: "Close"
        },
        es: {
            home: "Inicio",
            about: "Sobre Nosotros",
            programs: "Programas",
            contact: "Contacto",
            welcome: "Bienvenido al Pequeño Mundo de Blady",
            discover: "Descubre un lugar de maravilla y exploración.",
            requestInfo: "Solicitar Información",
            scheduleTour: "Programar una Visita",
            aboutUs: "Sobre Nosotros",
            aboutDescription: "El Pequeño Mundo de Blady está dedicado a proporcionar un entorno acogedor para la educación infantil temprana y fomentar el aprendizaje bilingüe. Nuestra misión es empoderar a los niños con las habilidades y la confianza que necesitan para prosperar en un mundo diverso y dinámico.",
            vision: "Nuestra Visión",
            visionContent: "Crear un mundo donde cada niño tenga la oportunidad de aprender, crecer y sobresalir en un entorno bilingüe que respeta y celebra la diversidad.",
            mission: "Nuestra Misión",
            missionContent: "Proporcionar educación y cuidado de alta calidad que fomente el desarrollo intelectual, social y emocional de cada niño, preparándolos para el éxito futuro.",
            programs: "Programas",
            infantCare: "Cuidado de Infantes",
            ageGroupInfant: "0-12 Meses",
            infantCareDescription: "Nuestro programa de Cuidado de Infantes proporciona un entorno seguro y amoroso donde sus pequeños pueden crecer y desarrollarse a través de actividades apropiadas para su edad y atención personalizada.",
            toddlerProgram: "Programa para Niños Pequeños",
            ageGroupToddler: "1-3 Años",
            toddlerProgramDescription: "Nuestro Programa para Niños Pequeños fomenta la exploración y la creatividad, ayudando a los niños a desarrollar habilidades esenciales en un entorno divertido y atractivo.",
            ourTeam: "Nuestro Equipo",
            teamMember1: "Jane Doe",
            teamMember1Role: "Educadora Principal",
            teamMember1Bio: "Jane tiene más de 10 años de experiencia en educación infantil temprana, especializada en entornos de aprendizaje bilingües. Le apasiona fomentar el amor por el aprendizaje en cada niño.",
            bilingualEducation: "Educación Bilingüe",
            downloadBrochure: "Descargar Folleto",
            healthyMeals: "Comidas y Snacks Saludables",
            dietaryRestrictions: "Restricciones Dietéticas",
            childNameLabel: "Nombre del Niño:",
            dietaryNeedsLabel: "Necesidades Dietéticas:",
            submitDietary: "Enviar",
            contactUs: "Contáctanos",
            nameLabel: "Nombre:",
            emailLabel: "Correo Electrónico:",
            messageLabel: "Mensaje:",
            sendMessage: "Enviar Mensaje",
            getDirections: "Obtener Direcciones",
            close: "Cerrar"
        }
    };

    // Function to update text content based on selected language
    function updateLanguage(lang) {
        document.querySelectorAll('[data-translate]').forEach(element => {
            const key = element.getAttribute('data-translate');
            if (translations[lang] && translations[lang][key]) {
                element.textContent = translations[lang][key];
            }
        });

        // Toggle the language toggle button text
        if (lang === 'en') {
            languageToggle.textContent = 'Español';
        } else {
            languageToggle.textContent = 'English';
        }
    }

    // Initialize language based on user preference or default
    function initLanguage() {
        const savedLanguage = localStorage.getItem('preferredLanguage');
        const userLang = navigator.language.slice(0,2);
        const lang = savedLanguage || (translations[userLang] ? userLang : 'en');
        languageSelector.value = lang;
        updateLanguage(lang);
    }

    // Event Listener for Language Selection
    languageSelector.addEventListener('change', (e) => {
        const selectedLang = e.target.value;
        updateLanguage(selectedLang);
        localStorage.setItem('preferredLanguage', selectedLang);
    });

    // Event Listener for Language Toggle Button
    languageToggle.addEventListener('click', () => {
        const currentLang = languageSelector.value;
        const newLang = currentLang === 'en' ? 'es' : 'en';
        languageSelector.value = newLang;
        updateLanguage(newLang);
        localStorage.setItem('preferredLanguage', newLang);
    });

    // Initialize language on page load
    initLanguage();
});
