document.addEventListener('DOMContentLoaded', () => {
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
            // Other translation keys...
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
            // Other translation keys...
        }
    };

    // Current Language
    let currentLanguage = localStorage.getItem('preferredLanguage') || 'en';

    // Function to update text content based on selected language
    function updateLanguage(lang) {
        document.querySelectorAll('[data-translate]').forEach(element => {
            const key = element.getAttribute('data-translate');
            if (translations[lang][key]) {
                element.textContent = translations[lang][key];
            }
        });

        document.querySelectorAll('[data-translate-placeholder]').forEach(element => {
            const key = element.getAttribute('data-translate-placeholder');
            if (translations[lang][key]) {
                element.setAttribute('placeholder', translations[lang][key]);
            }
        });

        document.querySelectorAll('select option[data-translate]').forEach(option => {
            const key = option.getAttribute('data-translate');
            if (translations[lang][key]) {
                option.textContent = translations[lang][key];
            }
        });
    }

    // Initialize language on page load
    function initLanguage() {
        updateLanguage(currentLanguage);
        const currentLanguageSpan = document.getElementById('current-language');
        if (currentLanguageSpan) {
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
});