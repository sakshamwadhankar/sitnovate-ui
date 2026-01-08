/**
 * Scroll Optimization: One scroll per section, fix images, improve performance
 */
(function () {
    'use strict';

    let isScrolling = false;
    let scrollTimeout = null;
    let currentSection = 0;
    let scrollDirection = 0;

    // Get all sections
    function getSections() {
        return document.querySelectorAll('.StorySectionWrapper_wrapper__o7CDl');
    }

    // Scroll to specific section
    function scrollToSection(index, smooth = true) {
        const sections = getSections();
        if (index < 0 || index >= sections.length) return;

        isScrolling = true;
        currentSection = index;

        sections[index].scrollIntoView({
            behavior: smooth ? 'smooth' : 'auto',
            block: 'start'
        });

        // Reset scrolling flag after animation
        setTimeout(() => {
            isScrolling = false;
        }, 1000);
    }

    // Handle wheel event for better scroll control - one scroll per section
    let wheelTimeout = null;
    function handleWheel(e) {
        if (isScrolling) {
            e.preventDefault();
            return;
        }

        const sections = getSections();
        if (sections.length === 0) return;

        // Clear existing timeout
        if (wheelTimeout) {
            clearTimeout(wheelTimeout);
        }

        // Determine scroll direction
        const delta = e.deltaY;
        const threshold = 50; // Minimum scroll amount to trigger section change

        // Only trigger on significant scroll
        if (Math.abs(delta) < threshold) {
            return;
        }

        scrollDirection = delta > 0 ? 1 : -1;

        // Prevent default scroll for large movements
        if (Math.abs(delta) > 100) {
            e.preventDefault();
        }

        // Throttle section changes
        wheelTimeout = setTimeout(() => {
            // Find current section
            const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
            let foundIndex = 0;
            let minDistance = Infinity;

            sections.forEach((section, index) => {
                const rect = section.getBoundingClientRect();
                const distance = Math.abs(rect.top);

                if (rect.top <= window.innerHeight / 3 && distance < minDistance) {
                    minDistance = distance;
                    foundIndex = index;
                }
            });

            currentSection = foundIndex;

            // Move to next/previous section
            let newIndex = currentSection;
            if (scrollDirection > 0 && currentSection < sections.length - 1) {
                newIndex = currentSection + 1;
            } else if (scrollDirection < 0 && currentSection > 0) {
                newIndex = currentSection - 1;
            }

            if (newIndex !== currentSection && !isScrolling) {
                scrollToSection(newIndex);
            }
        }, 50);
    }

    // Throttled scroll handler for performance
    let lastScrollTime = 0;
    function handleScroll() {
        const now = Date.now();
        if (now - lastScrollTime < 100) return; // Throttle to 100ms
        lastScrollTime = now;

        if (isScrolling) return;

        const sections = getSections();
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;

        // Find current section
        sections.forEach((section, index) => {
            const rect = section.getBoundingClientRect();
            if (rect.top <= 100 && rect.bottom >= 100) {
                currentSection = index;
            }
        });
    }

    // Ensure images are visible
    function fixImageVisibility() {
        // Show all images in sections (except hidden ones we want to hide)
        const sections = document.querySelectorAll('.StorySectionWrapper_wrapper__o7CDl');
        sections.forEach((section, index) => {
            // For custom sections, ensure images are visible
            const images = section.querySelectorAll('img');
            images.forEach(img => {
                // Only fix images that should be visible
                if (!img.closest('.hp-card') &&
                    !img.closest('.team-avatar') &&
                    !img.closest('.social-link') &&
                    !img.hasAttribute('data-hidden')) {
                    img.style.opacity = '1';
                    img.style.visibility = 'visible';
                    img.style.display = '';
                }
            });
        });
    }

    // Optimize performance - reduce repaints
    function optimizePerformance() {
        // Use will-change for smooth scrolling
        const sections = getSections();
        sections.forEach(section => {
            section.style.willChange = 'transform';
        });

        // Debounce resize events
        let resizeTimeout;
        window.addEventListener('resize', () => {
            clearTimeout(resizeTimeout);
            resizeTimeout = setTimeout(() => {
                fixImageVisibility();
            }, 250);
        });
    }

    // Initialize
    function init() {
        // Add smooth scroll behavior
        document.documentElement.style.scrollBehavior = 'smooth';

        // Add CSS for scroll snap and performance
        const style = document.createElement('style');
        style.id = 'scroll-optimization-css';
        style.textContent = `
            html {
                scroll-behavior: smooth !important;
                scroll-padding-top: 0;
            }
            
            body {
                overflow-x: hidden !important;
                overflow-y: auto !important;
            }
            
            /* Fix image visibility - make all images visible */
            .StorySectionWrapper_wrapper__o7CDl img {
                opacity: 1 !important;
                visibility: visible !important;
                display: block !important;
                position: relative !important;
                z-index: 1 !important;
            }
            
            /* Except for specific hidden ones */
            .StorySectionWrapper_wrapper__o7CDl img[data-hidden="true"] {
                display: none !important;
            }
            
            /* Performance optimizations */
            .StorySectionWrapper_wrapper__o7CDl {
                transform: translateZ(0);
                will-change: transform;
            }
            
            /* Reduce lag - optimize rendering */
            * {
                -webkit-font-smoothing: antialiased;
                -moz-osx-font-smoothing: grayscale;
            }
            
            /* GPU acceleration for smooth scrolling */
            article.StickyScrollContainer_StickyScrollContainer__YqUg7 {
                transform: translateZ(0);
            }
        `;

        if (!document.getElementById('scroll-optimization-css')) {
            document.head.appendChild(style);
        }

        // Add wheel event listener for better scroll control (use capture phase)
        window.addEventListener('wheel', handleWheel, { passive: false, capture: true });
        window.addEventListener('scroll', handleScroll, { passive: true });

        // Also handle touchpad scroll for better detection
        let touchpadTimeout;
        window.addEventListener('wheel', (e) => {
            // Detect touchpad vs mouse wheel
            if (Math.abs(e.deltaX) > 0 || Math.abs(e.deltaY) > 0) {
                clearTimeout(touchpadTimeout);
                touchpadTimeout = setTimeout(() => {
                    handleScroll();
                }, 100);
            }
        }, { passive: true });

        // Fix images
        fixImageVisibility();

        // Optimize performance
        optimizePerformance();

        // Re-fix images periodically (in case React re-renders) - less frequent for performance
        setInterval(fixImageVisibility, 5000);
    }

    // Run on load
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }

    window.addEventListener('load', () => {
        setTimeout(init, 500);
    });
})();

