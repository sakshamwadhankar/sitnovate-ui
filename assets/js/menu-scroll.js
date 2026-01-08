/**
 * Fix for menu scrolling behavior
 * Intercepts clicks on menu items and scrolls to the correct section wrapper
 */
(function () {
    function initMenuScroll() {
        // Mapping of menu titles to section indices
        // Supporting both potential naming conventions
        const sectionMapping = {
            // Current Implementation Names
            'Home': 0,
            'About SITNovate': 1,
            'What We Provide': 2,
            'Event Highlights': 3,
            'Past Sponsors': 4,
            'Our Team': 5,
            'Get in Touch': 6,

            // User Requested Names (Alternative)
            'The About': 1,
            'The Provisions': 2,
            'The Highlights': 3,
            'The Sponsors': 4,
            'The Team': 5,
            'Contact': 6
        };

        // Function to handle scroll
        function scrollToSection(index) {
            // Find all section wrappers using the specific class
            const wrappers = document.querySelectorAll('.StorySectionWrapper_wrapper__o7CDl');

            console.log(`Menu Scroll Debug: Found ${wrappers.length} wrappers. Target Index: ${index}`);

            if (wrappers && wrappers[index]) {
                console.log(`Scrolling to wrapper ${index}`);
                // Use standard scrollIntoView with block: start
                wrappers[index].scrollIntoView({ behavior: 'smooth', block: 'start' });
            } else {
                console.warn(`Wrapper for index ${index} not found. Available: ${wrappers.length}`);

                // Fallback: If wrappers missing, maybe try generic children of the container
                if (index > 0 && wrappers.length > 0) {
                    // Try the last one if index is out of bounds (better than nothing)
                    // wrappers[wrappers.length - 1].scrollIntoView({ behavior: 'smooth' });
                }
            }
        }

        // Attach listener to document to catch clicks on the menu links
        document.addEventListener('click', function (e) {
            const target = e.target;
            const link = target.closest('a') || target.closest('li');

            if (!link) return;

            // Get text content, remove purely whitespace/newlines
            const text = (link.textContent || "").trim();

            // Check exact match or partial match
            let targetIndex = -1;

            if (sectionMapping.hasOwnProperty(text)) {
                targetIndex = sectionMapping[text];
            } else {
                // Try finding key in text (e.g. "  The About  ")
                for (const key in sectionMapping) {
                    if (text === key || text.includes(key)) {
                        targetIndex = sectionMapping[key];
                        break;
                    }
                }
            }

            if (targetIndex !== -1) {
                e.preventDefault();
                e.stopPropagation();

                console.log(`Menu clicked: "${text}" -> Index ${targetIndex}`);
                scrollToSection(targetIndex);

                // Close menu logic
                const closeBtn = document.querySelector('button[aria-label="Close"], .Header_closeButton__zcq7C');
                if (closeBtn) setTimeout(() => closeBtn.click(), 100);
                else {
                    const backdrop = document.querySelector('.Header_fullscreenMenu__3FBD0');
                    if (backdrop) backdrop.click();
                }
            }
        }, true); // Capture phase
    }

    // Run immediately and also wait for load
    initMenuScroll();
    window.addEventListener('DOMContentLoaded', initMenuScroll);
    window.addEventListener('load', initMenuScroll);

    // Re-run periodically
    setInterval(initMenuScroll, 2000);
})();
