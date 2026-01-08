/**
 * Section Tracker - Sets body data attribute based on current section
 * Works with custom scroll containers
 */
(function () {
    'use strict';

    function initSectionTracker() {
        const sections = document.querySelectorAll('.StorySectionWrapper_wrapper__o7CDl');

        if (sections.length === 0) {
            setTimeout(initSectionTracker, 100);
            return;
        }

        console.log('✅ Section tracker initialized with', sections.length, 'sections');

        // Set initial state
        document.body.setAttribute('data-current-section', '0');
        console.log('📍 Initial section set to: 0');

        let lastSection = 0;

        // Function to update current section
        function updateCurrentSection() {
            try {
                const windowHeight = window.innerHeight;

                // Find which section is most visible
                let currentSection = 0;
                let maxVisibility = 0;

                sections.forEach((section, index) => {
                    const rect = section.getBoundingClientRect();
                    const visibleHeight = Math.min(rect.bottom, windowHeight) - Math.max(rect.top, 0);
                    const visibility = Math.max(0, visibleHeight / windowHeight);

                    if (visibility > maxVisibility) {
                        maxVisibility = visibility;
                        currentSection = index;
                    }
                });

                // Always update to see what's happening
                if (currentSection !== lastSection) {
                    document.body.setAttribute('data-current-section', currentSection.toString());
                    console.log('📍 Section changed:', lastSection, '→', currentSection);
                    console.log('🎯 Body data-current-section:', document.body.getAttribute('data-current-section'));
                    lastSection = currentSection;
                }
            } catch (error) {
                console.error('❌ Section tracker error:', error);
            }
        }

        // Find the scroll container - could be window or a custom container
        const scrollContainer = document.querySelector('.StickyScrollContainer_StickyScrollContainer__YqUg7') || window;

        console.log('📜 Scroll container:', scrollContainer === window ? 'window' : scrollContainer);

        // Use requestAnimationFrame for continuous checking (more reliable)
        let lastCheck = 0;
        function continuousCheck() {
            const now = Date.now();
            if (now - lastCheck > 100) { // Check every 100ms
                updateCurrentSection();
                lastCheck = now;
            }
            requestAnimationFrame(continuousCheck);
        }

        // Start continuous checking
        continuousCheck();

        // Also listen to scroll events as backup
        window.addEventListener('scroll', updateCurrentSection, { passive: true });
        if (scrollContainer !== window) {
            scrollContainer.addEventListener('scroll', updateCurrentSection, { passive: true });
        }

        // Also check on resize
        window.addEventListener('resize', updateCurrentSection, { passive: true });

        // Initial check after delay
        setTimeout(updateCurrentSection, 1000);

        console.log('✅ Section tracker active - scroll to see section changes');
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', () => setTimeout(initSectionTracker, 500));
    } else {
        setTimeout(initSectionTracker, 500);
    }
})();
