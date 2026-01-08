/**
 * Replace "The Episodes" / "Episodes" button with "Register now"
 * Maintains same styling and effects, redirects to google.com on click
 */
(function () {
    // Inject CSS to hide Episodes buttons immediately (but not replaced ones)
    function injectHideCSS() {
        const styleId = 'hide-episodes-css';
        if (document.getElementById(styleId)) return;
        
        const style = document.createElement('style');
        style.id = styleId;
        style.textContent = `
            /* Hide any element containing "Episodes" text - but NOT replaced ones */
            a[href*="episodes"]:not([data-register-replaced]),
            a[href*="/episodes"]:not([data-register-replaced]),
            button[aria-label*="Episodes"]:not([data-register-replaced]),
            button[aria-label*="episodes"]:not([data-register-replaced]),
            [class*="ArrowButton"][href*="episodes"]:not([data-register-replaced]),
            [class*="PageFrameLayout_button"][href*="episodes"]:not([data-register-replaced]) {
                opacity: 0 !important;
                visibility: hidden !important;
                display: none !important;
            }
            
            /* Ensure replaced button is visible */
            [data-register-replaced="true"] {
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

    function replaceEpisodesButton() {
        // Find all navigation containers and buttons
        const navContainer = document.querySelector('.PageFrameLayout_navigation__5pvL7');
        if (!navContainer) {
            // Try again later if nav container doesn't exist yet
            return;
        }
        
        // First, make navigation visible if it's hidden
        if (navContainer.style.opacity === '0' || navContainer.style.pointerEvents === 'none') {
            // Don't modify the container, just work with what's there
        }

        // Look for buttons/links containing "Episodes" text (case insensitive)
        // First check if already replaced
        if (navContainer.querySelector('[data-register-replaced="true"]')) {
            // Ensure replaced button is visible
            const replaced = navContainer.querySelector('[data-register-replaced="true"]');
            if (replaced) {
                replaced.style.opacity = '1';
                replaced.style.visibility = 'visible';
                replaced.style.display = '';
            }
            return; // Already replaced
        }

        // Search more broadly - check all elements in navigation
        let episodesButton = null;
        let buttonText = null;
        
        // First, try finding by class patterns
        const allButtons = navContainer.querySelectorAll('a, button, [class*="ArrowButton"], [class*="PageFrameLayout_button"]');
        
        // Search through buttons to find one with "Episodes" text
        for (let btn of allButtons) {
            // Skip if already replaced
            if (btn.hasAttribute('data-register-replaced')) continue;
            
            const text = (btn.textContent || "").trim();
            const normalizedText = text.toLowerCase();
            if ((normalizedText.includes('episodes') || normalizedText.includes('the episodes')) && !normalizedText.includes('register')) {
                episodesButton = btn;
                buttonText = text;
                break;
            }
        }

        // Also search all elements in navigation for text content
        if (!episodesButton) {
            const allElements = navContainer.querySelectorAll('*');
            for (let el of allElements) {
                // Skip if already replaced
                if (el.hasAttribute('data-register-replaced')) continue;
                
                // Skip if it's a child of an already replaced element
                if (el.closest('[data-register-replaced]')) continue;
                
                const text = (el.textContent || "").trim();
                const normalizedText = text.toLowerCase();
                // Look for exact match or "The Episodes"
                if ((normalizedText === 'episodes' || normalizedText === 'the episodes' || normalizedText.includes('episodes')) && !normalizedText.includes('register')) {
                    // Make sure it's a clickable element or has the right classes
                    if (el.tagName === 'A' || el.tagName === 'BUTTON' || 
                        el.classList.toString().includes('ArrowButton') || 
                        el.classList.toString().includes('PageFrameLayout_button')) {
                        episodesButton = el;
                        buttonText = text;
                        break;
                    }
                }
            }
        }

        // Last resort: search entire document
        if (!episodesButton) {
            const allElements = document.querySelectorAll('a, button, [class*="ArrowButton"], [class*="PageFrameLayout_button"]');
            for (let el of allElements) {
                // Skip if already replaced
                if (el.hasAttribute('data-register-replaced')) continue;
                // Only check if in navigation area
                if (!el.closest('.PageFrameLayout_navigation__5pvL7')) continue;
                
                const text = (el.textContent || "").trim();
                const normalizedText = text.toLowerCase();
                if ((normalizedText.includes('episodes') || normalizedText.includes('the episodes')) && !normalizedText.includes('register')) {
                    episodesButton = el;
                    buttonText = text;
                    break;
                }
            }
        }

        if (episodesButton && !episodesButton.hasAttribute('data-register-replaced')) {
            // Immediately make button visible by removing any hide styles
            episodesButton.style.opacity = '1';
            episodesButton.style.visibility = 'visible';
            episodesButton.style.display = '';
            
            // Get computed styles from original button to preserve size and position
            const originalStyles = window.getComputedStyle(episodesButton);
            const rect = episodesButton.getBoundingClientRect();
            
            // Clone the button to preserve all classes, attributes, and structure
            const newButton = episodesButton.cloneNode(true);
            newButton.setAttribute('data-register-replaced', 'true');
            
            // Preserve all attributes
            for (let attr of episodesButton.attributes) {
                if (attr.name !== 'href' && attr.name !== 'data-register-replaced') {
                    newButton.setAttribute(attr.name, attr.value);
                }
            }
            
            // Preserve all inline styles explicitly
            if (episodesButton.hasAttribute('style')) {
                newButton.setAttribute('style', episodesButton.getAttribute('style'));
            }
            
            // Ensure visibility and preserve dimensions
            newButton.style.opacity = originalStyles.opacity || '1';
            newButton.style.visibility = originalStyles.visibility || 'visible';
            newButton.style.display = originalStyles.display || 'block';
            newButton.style.position = originalStyles.position || 'relative';
            
            // Replace text content - find and replace text nodes containing "Episodes"
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
                    if (textNode.textContent && textNode.textContent.includes(oldText)) {
                        textNode.textContent = textNode.textContent.replace(/\b(The\s+)?Episodes\b/gi, newText);
                        replaced = true;
                    }
                }
                
                return replaced;
            }
            
            // Replace text while preserving structure - try with buttonText first
            let textReplaced = replaceTextInElement(newButton, buttonText, 'Register now');
            
            // Also try replacing "Episodes" or "The Episodes" directly
            if (!textReplaced || !newButton.textContent.includes('Register now')) {
                textReplaced = replaceTextInElement(newButton, 'Episodes', 'Register now') || textReplaced;
                textReplaced = replaceTextInElement(newButton, 'The Episodes', 'Register now') || textReplaced;
            }
            
            // Fallback: replace in any span or text node
            if (!textReplaced || !newButton.textContent.includes('Register now')) {
                const spans = newButton.querySelectorAll('span');
                for (let span of spans) {
                    if (span.textContent && (span.textContent.includes('Episodes') || span.textContent.includes('The Episodes'))) {
                        span.textContent = span.textContent.replace(/\b(The\s+)?Episodes\b/gi, 'Register now');
                        break;
                    }
                }
            }
            
            // Final fallback - direct text replacement
            if (!newButton.textContent.includes('Register now')) {
                newButton.textContent = newButton.textContent.replace(/\b(The\s+)?Episodes\b/gi, 'Register now');
            }
            
            // Make it a link that redirects to google.com
            if (newButton.tagName === 'A') {
                newButton.href = 'https://www.google.com';
                newButton.target = '_blank';
                newButton.rel = 'noopener noreferrer';
            } else {
                // If it's a button, add click handler that redirects
                // Remove any existing onclick handlers first
                newButton.onclick = function(e) {
                    e.preventDefault();
                    e.stopPropagation();
                    e.stopImmediatePropagation();
                    window.location.href = 'https://www.google.com';
                    return false;
                };
                // Also handle as link-like button
                newButton.style.cursor = 'pointer';
            }
            
            // Replace the original button with the new one
            if (episodesButton.parentNode) {
                episodesButton.parentNode.replaceChild(newButton, episodesButton);
                
                // Force visibility after replacement (in case React tries to hide it)
                setTimeout(function() {
                    if (newButton && newButton.parentNode) {
                        newButton.style.opacity = '1';
                        newButton.style.visibility = 'visible';
                        newButton.style.display = originalStyles.display || '';
                        newButton.style.position = originalStyles.position || '';
                        // Remove any hide classes
                        newButton.classList.remove('hidden', 'invisible');
                        console.log('Ensured Register now button is visible', {
                            opacity: newButton.style.opacity,
                            visibility: newButton.style.visibility,
                            display: newButton.style.display,
                            classes: newButton.className
                        });
                    }
                }, 0);
                
                console.log('Replaced Episodes button with Register now', {
                    original: episodesButton.className,
                    new: newButton.className,
                    text: newButton.textContent.trim()
                });
            }
        }
    }

    // Function to ensure replaced button stays visible
    function ensureButtonVisible() {
        const replaced = document.querySelector('[data-register-replaced="true"]');
        if (replaced) {
            replaced.style.setProperty('opacity', '1', 'important');
            replaced.style.setProperty('visibility', 'visible', 'important');
            if (replaced.style.display === 'none') {
                replaced.style.setProperty('display', '', 'important');
            }
        }
    }

    // Run immediately
    replaceEpisodesButton();
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
            if (mutation.type === 'attributes' && mutation.target.hasAttribute('data-register-replaced')) {
                ensureButtonVisible();
            }
        }
        if (shouldCheck) {
            replaceEpisodesButton();
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
        const replaced = document.querySelector('[data-register-replaced="true"]');
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
            replaceEpisodesButton();
            ensureButtonVisible();
            observeReplacedButton();
        });
    }
    window.addEventListener('load', function() {
        replaceEpisodesButton();
        ensureButtonVisible();
        observeReplacedButton();
    });

    // Periodic check as fallback (less frequent for better performance)
    setInterval(function() {
        replaceEpisodesButton();
        ensureButtonVisible();
        observeReplacedButton();
    }, 3000);
})();

