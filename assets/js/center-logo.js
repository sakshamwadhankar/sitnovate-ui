/**
 * Center Logo in Scroll Section 1 (Home)
 */
(function () {
    function centerLogo() {
        // Target 1st section (Index 0)
        const wrapper = document.querySelectorAll('.StorySectionWrapper_wrapper__o7CDl')[0];
        if (!wrapper) {
            setTimeout(centerLogo, 100);
            return;
        }

        // Find the logo image
        const logoImg = wrapper.querySelector('img[src*="logo-gold"], img[src*="logo"]');

        if (logoImg && !logoImg.classList.contains('centered-logo')) {
            logoImg.classList.add('centered-logo');
            console.log('Logo centered in section 1');
        }

        // Also try to find any existing image container and center it
        const contentContainer = wrapper.querySelector('.StorySectionWrapper_ContentContainer__HvMko');
        if (contentContainer) {
            contentContainer.classList.add('logo-centered-container');
        }
    }

    // Add centering styles
    const style = document.createElement('style');
    style.id = 'center-logo-styles';
    style.textContent = `
        /* Center the content container in section 1 */
        .StorySectionWrapper_wrapper__o7CDl:first-child .StorySectionWrapper_ContentContainer__HvMko,
        .logo-centered-container {
            display: flex !important;
            align-items: center !important;
            justify-content: center !important;
            width: 100% !important;
            height: 100% !important;
        }

        /* Center the logo image */
        .centered-logo {
            position: relative !important;
            left: auto !important;
            right: auto !important;
            top: auto !important;
            bottom: auto !important;
            transform: none !important;
            margin: 0 auto !important;
            display: block !important;
        }

        /* Target any image in first section that might be the logo */
        .StorySectionWrapper_wrapper__o7CDl:first-child img {
            position: relative !important;
            left: auto !important;
            right: auto !important;
            margin: 0 auto !important;
        }
    `;

    if (!document.getElementById('center-logo-styles')) {
        document.head.appendChild(style);
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', () => setTimeout(centerLogo, 200));
    } else {
        setTimeout(centerLogo, 200);
    }

    // Run again after hydration
    window.addEventListener('load', () => setTimeout(centerLogo, 500));
})();
