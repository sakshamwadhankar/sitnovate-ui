/**
 * Hide Navigation Bars Script
 * Shows navigation only on the first page, hides on all other pages
 */
(function () {
    'use strict';

    function initNavHider() {
        // Find navigation elements
        const topHeader = document.querySelector('.PageFrameLayout_header__kPFXh');
        const bottomNav = document.querySelector('.PageFrameLayout_navigation__5pvL7');

        if (!topHeader || !bottomNav) {
            setTimeout(initNavHider, 100);
            return;
        }

        // Find all section wrappers
        const sectionWrappers = document.querySelectorAll('.StorySectionWrapper_wrapper__o7CDl');
        const firstSection = sectionWrappers[0]; // First section (home page)
        const secondSection = sectionWrappers[1]; // Second section

        if (!firstSection || !secondSection) {
            setTimeout(initNavHider, 100);
            return;
        }

        console.log('Navigation hider initialized with', sectionWrappers.length, 'sections');

        let currentlyVisible = null;

        // Function to hide navigation
        function hideNavigation() {
            if (currentlyVisible === false) return; // Already hidden

            topHeader.style.setProperty('opacity', '0', 'important');
            topHeader.style.setProperty('transform', 'translateY(-100%)', 'important');
            topHeader.style.setProperty('pointer-events', 'none', 'important');

            bottomNav.style.setProperty('opacity', '0', 'important');
            bottomNav.style.setProperty('transform', 'translateY(100%)', 'important');
            bottomNav.style.setProperty('pointer-events', 'none', 'important');

            currentlyVisible = false;
            console.log('🔴 Navigation HIDDEN');
        }

        // Function to show navigation
        function showNavigation() {
            if (currentlyVisible === true) return; // Already shown

            topHeader.style.setProperty('opacity', '1', 'important');
            topHeader.style.setProperty('transform', 'translateY(0)', 'important');
            topHeader.style.setProperty('pointer-events', 'auto', 'important');

            bottomNav.style.setProperty('opacity', '1', 'important');
            bottomNav.style.setProperty('transform', 'translateY(0)', 'important');
            bottomNav.style.setProperty('pointer-events', 'auto', 'important');

            currentlyVisible = true;
            console.log('🟢 Navigation SHOWN');
        }

        // Function to check visibility - using second section as trigger
        function checkVisibility() {
            const secondSectionRect = secondSection.getBoundingClientRect();
            const windowHeight = window.innerHeight;

            // If the second section's top is above the middle of the screen, we've scrolled past first section
            const hasScrolledPastFirst = secondSectionRect.top < windowHeight * 0.5;

            if (hasScrolledPastFirst) {
                hideNavigation();
            } else {
                showNavigation();
            }
        }

        // Use requestAnimationFrame for continuous checking
        function continuousCheck() {
            checkVisibility();
            requestAnimationFrame(continuousCheck);
        }

        // Start continuous checking
        continuousCheck();

        console.log('✅ Navigation hider active - checking continuously');
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', () => setTimeout(initNavHider, 1000));
    } else {
        setTimeout(initNavHider, 1000);
    }
})();
