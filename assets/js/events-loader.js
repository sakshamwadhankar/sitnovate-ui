(function () {
    console.log("Event Highlights Loader Initialized");

    const STYLES = `
    <style>
      .eh-container {
        text-align: center;
        width: 90%;
        max-width: 1400px;
        margin: 0 auto;
        color: white;
        font-family: 'Cinzel', serif; /* Assuming site uses this or similar */
      }

      .eh-title {
        font-size: 3.5rem;
        margin-bottom: 2.5rem;
        text-shadow: 0 0 15px rgba(255, 215, 0, 0.6);
        font-family: inherit;
        letter-spacing: 2px;
        opacity: 0; 
        animation: fadeIn 1s forwards 0.5s;
      }

      .eh-title::after {
        content: '';
        display: block;
        width: 150px;
        height: 4px;
        background: linear-gradient(90deg, transparent, #FFD700, transparent);
        margin: 15px auto;
      }

      .eh-grid {
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
        gap: 2rem;
        padding: 1rem;
      }

      .eh-card {
        position: relative;
        border-radius: 15px;
        overflow: hidden;
        aspect-ratio: 16/9;
        box-shadow: 0 10px 30px rgba(0, 0, 0, 0.5);
        transition: transform 0.4s ease, box-shadow 0.4s ease;
        border: 1px solid rgba(255, 255, 255, 0.1);
        cursor: pointer;
        opacity: 0;
        animation: slideUp 0.8s forwards;
      }

      /* Staggered animation delays for cards */
      .eh-card:nth-child(1) { animation-delay: 0.2s; }
      .eh-card:nth-child(2) { animation-delay: 0.4s; }
      .eh-card:nth-child(3) { animation-delay: 0.6s; }
      .eh-card:nth-child(4) { animation-delay: 0.8s; }
      .eh-card:nth-child(5) { animation-delay: 1.0s; }
      .eh-card:nth-child(6) { animation-delay: 1.2s; }

      .eh-card:hover {
        transform: translateY(-10px) scale(1.02);
        box-shadow: 0 20px 40px rgba(255, 215, 0, 0.15);
        border-color: rgba(255, 215, 0, 0.5);
        z-index: 10;
      }

      .eh-card img {
        width: 100%;
        height: 100%;
        object-fit: cover;
        transition: transform 0.6s ease;
      }

      .eh-card:hover img {
        transform: scale(1.1);
      }

      .eh-overlay {
        position: absolute;
        bottom: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: linear-gradient(to top, rgba(0,0,0,0.8) 0%, rgba(0,0,0,0) 60%);
        opacity: 0.8;
        transition: opacity 0.3s ease;
      }

      .eh-card:hover .eh-overlay {
        opacity: 1;
        background: linear-gradient(to top, rgba(0,0,0,0.9) 0%, rgba(0,0,0,0.2) 100%);
      }

      .eh-caption {
        position: absolute;
        bottom: 20px;
        left: 20px;
        color: white;
        font-size: 1.2rem;
        font-weight: bold;
        transform: translateY(20px);
        opacity: 0;
        transition: all 0.3s ease;
        text-shadow: 0 2px 4px rgba(0,0,0,0.8);
        border-left: 3px solid #FFD700;
        padding-left: 10px;
      }

      .eh-card:hover .eh-caption {
        transform: translateY(0);
        opacity: 1;
      }

      @keyframes fadeIn {
        from { opacity: 0; }
        to { opacity: 1; }
      }

      @keyframes slideUp {
        from { opacity: 0; transform: translateY(30px); }
        to { opacity: 1; transform: translateY(0); }
      }

      @media (max-width: 768px) {
        .eh-grid {
          grid-template-columns: 1fr;
        }
        .eh-title {
          font-size: 2.5rem;
        }
        .eh-caption {
          transform: translateY(0);
          opacity: 1; /* Always show caption on mobile */
        }
      }
    </style>
    `;

    const CONTENT_HTML = `
      <div class="eh-container">
        <h1 class="eh-title">Event Highlights</h1>
        <div class="eh-grid">
          <!-- Opening Ceremony -->
          <div class="eh-card">
            <img src="/images/sitnovate/1.JPG" alt="Opening Ceremony" loading="lazy">
            <div class="eh-overlay"></div>
            <div class="eh-caption">Opening Ceremony</div>
          </div>

          <!-- Team Formation -->
          <div class="eh-card">
            <img src="/images/sitnovate/2.JPG" alt="Team Formation" loading="lazy">
            <div class="eh-overlay"></div>
            <div class="eh-caption">Team Formation</div>
          </div>

          <!-- Coding Marathon -->
          <div class="eh-card">
            <img src="/images/sitnovate/3.jpg" alt="Coding Marathon" loading="lazy">
            <div class="eh-overlay"></div>
            <div class="eh-caption">Coding Marathon</div>
          </div>

          <!-- Mentorship Sessions -->
          <div class="eh-card">
            <img src="/images/sitnovate/4.jpg" alt="Mentorship Sessions" loading="lazy">
            <div class="eh-overlay"></div>
            <div class="eh-caption">Mentorship Sessions</div>
          </div>

          <!-- Final Presentations -->
          <div class="eh-card">
            <img src="/images/sitnovate/5.png" alt="Final Presentations" loading="lazy">
            <div class="eh-overlay"></div>
            <div class="eh-caption">Final Presentations</div>
          </div>

          <!-- Award Ceremony -->
          <div class="eh-card">
            <img src="/images/sitnovate/6.png" alt="Award Ceremony" loading="lazy">
            <div class="eh-overlay"></div>
            <div class="eh-caption">Award Ceremony</div>
          </div>
        </div>
      </div>
    `;

    function inject() {
        // Find all main info wrappers.
        // The structure is usually 4th .StorySectionWrapper_wrapper__o7CDl
        const wrappers = document.querySelectorAll('.StorySectionWrapper_wrapper__o7CDl');

        // Debugging
        // console.log("Found wrappers:", wrappers.length);

        if (wrappers.length >= 4) {
            const target = wrappers[3];

            // Check if we already own this section to prevent infinite loops or redundant setting
            // We can check for a specific class or ID we add
            if (target.getAttribute('data-injected') === 'event-highlights') {
                return;
            }

            console.log("Replacing 4th scroll section content...");

            target.innerHTML = `
              <div class="StorySectionWrapper_content-wrapper__pmLR0 grid" style="opacity:1; pointer-events:auto;">
                <div class="StorySectionWrapper_content__maPBT grid">
                   <div class="StorySectionWrapper_ContentContainer__HvMko" style="display: flex; justify-content: center; align-items: center; width: 100%;">
                     ${STYLES}
                     ${CONTENT_HTML}
                   </div>
                </div>
              </div>
            `;

            target.setAttribute('data-injected', 'event-highlights');
            // Force visibility in case parent hides it
            target.style.opacity = '1';
            target.style.visibility = 'visible';

            // Allow pointer events on the inner wrapper we replaced
            const innerWrapper = target.querySelector('.StorySectionWrapper_content-wrapper__pmLR0');
            if (innerWrapper) {
                innerWrapper.style.opacity = '1';
                innerWrapper.style.pointerEvents = 'auto';
            }
        }
    }

    // Try to inject immediately
    inject();

    // And also set up an observer to keep it there if React changes it back
    // or if it loads late
    const observer = new MutationObserver((mutations) => {
        let shouldInject = false;
        for (const m of mutations) {
            if (m.type === 'childList') {
                shouldInject = true;
                break;
            }
        }
        if (shouldInject) {
            inject();
        }
    });

    // Observe the main container or body
    const main = document.querySelector('main') || document.body;
    observer.observe(main, { childList: true, subtree: true });

    // Fallback interval just in case
    setInterval(inject, 1000);

})();
