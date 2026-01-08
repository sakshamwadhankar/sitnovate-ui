/**
 * Replace "The Map" / "Map" button with "INSTITUTE"
 * Maintains same styling and effects, links to https://sitnagpur.edu.in/
 */
(function () {
    // Inject CSS to hide Map buttons immediately (but not replaced ones)
    function injectHideCSS() {
        const styleId = 'hide-map-css';
        if (document.getElementById(styleId)) return;
        
        const style = document.createElement('style');
        style.id = styleId;
        style.textContent = `
            /* Hide any element containing "Map" text - but NOT replaced ones */
            a[href*="map"]:not([data-institute-replaced]),
            a[href*="/map"]:not([data-institute-replaced]),
            a[href*="/map/"]:not([data-institute-replaced]),
            button[aria-label*="Map"]:not([data-institute-replaced]),
            button[aria-label*="map"]:not([data-institute-replaced]),
            [class*="ArrowButton"][href*="map"]:not([data-institute-replaced]),
            [class*="PageFrameLayout_button"][href*="map"]:not([data-institute-replaced]) {
                opacity: 0 !important;
                visibility: hidden !important;
                display: none !important;
            }
            
            /* Ensure replaced button is visible */
            [data-institute-replaced="true"] {
                opacity: 1 !important;
                visibility: visible !important;
                display: block !important;
            }
        `;
        document.head.appendChild(style);
    }

    // Run CSS injection immediately
    injectHideCSS();
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', injectHideCSS);
    }

    function replaceMapButton() {
        // Find all navigation containers and buttons
        const navContainer = document.querySelector('.PageFrameLayout_navigation__5pvL7');
        if (!navContainer) {
            // Try again later if nav container doesn't exist yet
            return;
        }
        
        // Look for buttons/links containing "Map" text (case insensitive)
        // First check if already replaced
        if (navContainer.querySelector('[data-institute-replaced="true"]')) {
            // Ensure replaced button is visible
            const replaced = navContainer.querySelector('[data-institute-replaced="true"]');
            if (replaced) {
                replaced.style.opacity = '1';
                replaced.style.visibility = 'visible';
                replaced.style.display = '';
            }
            return; // Already replaced
        }

        // Search more broadly - check all elements in navigation
        let mapButton = null;
        let buttonText = null;
        
        // First, try finding by class patterns
        const allButtons = navContainer.querySelectorAll('a, button, [class*="ArrowButton"], [class*="PageFrameLayout_button"]');
        
        // Search through buttons to find one with "Map" text
        for (let btn of allButtons) {
            // Skip if already replaced
            if (btn.hasAttribute('data-institute-replaced')) continue;
            
            const text = (btn.textContent || "").trim();
            const normalizedText = text.toLowerCase();
            // Check for "Map" or "The Map" but not "INSTITUTE"
            if ((normalizedText === 'map' || normalizedText === 'the map' || normalizedText.includes(' map')) && !normalizedText.includes('institute')) {
                mapButton = btn;
                buttonText = text;
                break;
            }
        }

        // Also search all elements in navigation for text content
        if (!mapButton) {
            const allElements = navContainer.querySelectorAll('*');
            for (let el of allElements) {
                // Skip if already replaced
                if (el.hasAttribute('data-institute-replaced')) continue;
                
                // Skip if it's a child of an already replaced element
                if (el.closest('[data-institute-replaced]')) continue;
                
                const text = (el.textContent || "").trim();
                const normalizedText = text.toLowerCase();
                // Look for exact match or "The Map"
                if ((normalizedText === 'map' || normalizedText === 'the map' || normalizedText.includes(' map')) && !normalizedText.includes('institute')) {
                    // Make sure it's a clickable element or has the right classes
                    if (el.tagName === 'A' || el.tagName === 'BUTTON' || 
                        el.classList.toString().includes('ArrowButton') || 
                        el.classList.toString().includes('PageFrameLayout_button')) {
                        mapButton = el;
                        buttonText = text;
                        break;
                    }
                }
            }
        }

        // Last resort: search entire document but only in navigation area
        if (!mapButton) {
            const allElements = document.querySelectorAll('a, button, [class*="ArrowButton"], [class*="PageFrameLayout_button"]');
            for (let el of allElements) {
                // Skip if already replaced
                if (el.hasAttribute('data-institute-replaced')) continue;
                // Only check if in navigation area
                if (!el.closest('.PageFrameLayout_navigation__5pvL7')) continue;
                
                const text = (el.textContent || "").trim();
                const normalizedText = text.toLowerCase();
                if ((normalizedText === 'map' || normalizedText === 'the map' || normalizedText.includes(' map')) && !normalizedText.includes('institute')) {
                    mapButton = el;
                    buttonText = text;
                    break;
                }
            }
        }

        if (mapButton && !mapButton.hasAttribute('data-institute-replaced')) {
            // Immediately make button visible by removing any hide styles
            mapButton.style.opacity = '1';
            mapButton.style.visibility = 'visible';
            mapButton.style.display = '';
            
            // Get computed styles from original button to preserve size and position
            const originalStyles = window.getComputedStyle(mapButton);
            
            // Clone the button to preserve all classes, attributes, and structure
            const newButton = mapButton.cloneNode(true);
            newButton.setAttribute('data-institute-replaced', 'true');
            
            // Preserve all attributes
            for (let attr of mapButton.attributes) {
                if (attr.name !== 'href' && attr.name !== 'data-institute-replaced') {
                    newButton.setAttribute(attr.name, attr.value);
                }
            }
            
            // Preserve all inline styles explicitly
            if (mapButton.hasAttribute('style')) {
                newButton.setAttribute('style', mapButton.getAttribute('style'));
            }
            
            // Ensure visibility and preserve dimensions
            newButton.style.opacity = originalStyles.opacity || '1';
            newButton.style.visibility = originalStyles.visibility || 'visible';
            newButton.style.display = originalStyles.display || 'block';
            newButton.style.position = originalStyles.position || 'relative';
            
            // Replace text content - find and replace text nodes containing "Map"
            // This preserves all other elements like icons, spans, etc.
            function replaceTextInElement(el, oldText, newText) {
                let replaced = false;
                // Walk through all nodes
                const walker = document.createTreeWalker(
                    el,
                    NodeFilter.SHOW_TEXT | NodeFilter.SHOW_ELEMENT,
                    null
                );
                
                const textNodes = [];
                let node;
                while (node = walker.nextNode()) {
                    if (node.nodeType === Node.TEXT_NODE) {
                        textNodes.push(node);
                    }
                }
                
                // Replace text in text nodes
                for (let textNode of textNodes) {
                    if (textNode.textContent) {
                        if (textNode.textContent.includes(oldText)) {
                            textNode.textContent = textNode.textContent.replace(/\b(The\s+)?Map\b/gi, newText);
                            replaced = true;
                        }
                    }
                }
                
                return replaced;
            }
            
            // Replace text while preserving structure - try with buttonText first
            let textReplaced = replaceTextInElement(newButton, buttonText, 'INSTITUTE');
            
            // Also try replacing "Map" or "The Map" directly
            if (!textReplaced || !newButton.textContent.includes('INSTITUTE')) {
                textReplaced = replaceTextInElement(newButton, 'Map', 'INSTITUTE') || textReplaced;
                textReplaced = replaceTextInElement(newButton, 'The Map', 'INSTITUTE') || textReplaced;
            }
            
            // Fallback: replace in any span or text node
            if (!textReplaced || !newButton.textContent.includes('INSTITUTE')) {
                const spans = newButton.querySelectorAll('span');
                for (let span of spans) {
                    if (span.textContent && (span.textContent.includes('Map') || span.textContent.includes('The Map'))) {
                        span.textContent = span.textContent.replace(/\b(The\s+)?Map\b/gi, 'INSTITUTE');
                        break;
                    }
                }
            }
            
            // Final fallback - direct text replacement
            if (!newButton.textContent.includes('INSTITUTE')) {
                newButton.textContent = newButton.textContent.replace(/\b(The\s+)?Map\b/gi, 'INSTITUTE');
            }
            
            // Make it a link that redirects to sitnagpur.edu.in
            if (newButton.tagName === 'A') {
                newButton.href = 'https://sitnagpur.edu.in/';
                newButton.target = '_blank';
                newButton.rel = 'noopener noreferrer';
            } else {
                // If it's a button, add click handler that redirects
                newButton.onclick = function(e) {
                    e.preventDefault();
                    e.stopPropagation();
                    e.stopImmediatePropagation();
                    window.open('https://sitnagpur.edu.in/', '_blank');
                    return false;
                };
                // Also handle as link-like button
                newButton.style.cursor = 'pointer';
            }
            
            // Replace the original button with the new one
            if (mapButton.parentNode) {
                mapButton.parentNode.replaceChild(newButton, mapButton);
                
                // Force visibility after replacement (in case React tries to hide it)
                setTimeout(function() {
                    if (newButton && newButton.parentNode) {
                        newButton.style.opacity = '1';
                        newButton.style.visibility = 'visible';
                        newButton.style.display = originalStyles.display || '';
                        newButton.style.position = originalStyles.position || '';
                        // Remove any hide classes
                        newButton.classList.remove('hidden', 'invisible');
                        console.log('Ensured INSTITUTE button is visible', {
                            opacity: newButton.style.opacity,
                            visibility: newButton.style.visibility,
                            display: newButton.style.display,
                            classes: newButton.className
                        });
                    }
                }, 0);
                
                console.log('Replaced Map button with INSTITUTE', {
                    original: mapButton.className,
                    new: newButton.className,
                    text: newButton.textContent.trim()
                });
            }
        }
    }

    // Function to ensure replaced button stays visible
    function ensureButtonVisible() {
        const replaced = document.querySelector('[data-institute-replaced="true"]');
        if (replaced) {
            replaced.style.setProperty('opacity', '1', 'important');
            replaced.style.setProperty('visibility', 'visible', 'important');
            if (replaced.style.display === 'none') {
                replaced.style.setProperty('display', '', 'important');
            }
        }
    }

    // Run immediately
    replaceMapButton();
    ensureButtonVisible();

    // Watch for DOM changes (React re-renders)
    const observer = new MutationObserver(function(mutations) {
        let shouldCheck = false;
        for (let mutation of mutations) {
            if (mutation.addedNodes.length > 0 || mutation.type === 'childList') {
                shouldCheck = true;
                break;
            }
            // Also check if styles changed on replaced button
            if (mutation.type === 'attributes' && mutation.target.hasAttribute('data-institute-replaced')) {
                ensureButtonVisible();
            }
        }
        if (shouldCheck) {
            replaceMapButton();
            ensureButtonVisible();
        }
    });

    // Observe the navigation container and document body
    const navContainer = document.querySelector('.PageFrameLayout_navigation__5pvL7');
    if (navContainer) {
        observer.observe(navContainer, {
            childList: true,
            subtree: true,
            characterData: true
        });
    }

    // Also observe document body for any dynamically added buttons
    observer.observe(document.body, {
        childList: true,
        subtree: true,
        characterData: true,
        attributes: true,
        attributeFilter: ['style', 'class']
    });

    // Observe the replaced button specifically to keep it visible
    function observeReplacedButton() {
        const replaced = document.querySelector('[data-institute-replaced="true"]');
        if (replaced) {
            const styleObserver = new MutationObserver(function(mutations) {
                ensureButtonVisible();
            });
            styleObserver.observe(replaced, {
                attributes: true,
                attributeFilter: ['style', 'class'],
                subtree: false
            });
        }
    }

    // Run on DOM ready and load
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', function() {
            replaceMapButton();
            ensureButtonVisible();
            observeReplacedButton();
        });
    }
    window.addEventListener('load', function() {
        replaceMapButton();
        ensureButtonVisible();
        observeReplacedButton();
    });

    // Periodic check as fallback (less frequent for better performance)
    setInterval(function() {
        replaceMapButton();
        ensureButtonVisible();
        observeReplacedButton();
    }, 3000);
})();

