/**
 * Event Highlights Section - Custom Layout Override
 * Same approach as What We Provide - hide existing, append custom
 */

(function () {
    'use strict';

    function initEventHighlights() {
        // Find the 4th section wrapper (Event Highlights)
        const sectionWrappers = document.querySelectorAll('.StorySectionWrapper_wrapper__o7CDl');
        const eventSection = sectionWrappers[3]; // 4th section (0-indexed)

        if (!eventSection) {
            setTimeout(initEventHighlights, 100);
            return;
        }

        // Check if already customized
        if (eventSection.querySelector('.event-highlights-wrapper')) {
            return;
        }

        // Find content container
        const contentContainer = eventSection.querySelector('.StorySectionWrapper_ContentContainer__HvMko');
        if (!contentContainer) {
            setTimeout(initEventHighlights, 100);
            return;
        }

        // HIDE existing children (don't remove)
        const existingChildren = contentContainer.children;
        for (let i = 0; i < existingChildren.length; i++) {
            existingChildren[i].style.display = 'none';
        }

        // CREATE and APPEND custom content
        const customWrapper = document.createElement('div');
        customWrapper.className = 'event-highlights-wrapper';
        customWrapper.innerHTML = `
      <h2 class="event-highlights-title">Event Highlights</h2>
      
      <div class="event-grid">
        <div class="event-card">
          <img src="/images/sitnovate/1.JPG" alt="Opening Ceremony" loading="lazy" />
          <div class="event-card-overlay">
            <span class="event-card-label">Opening Ceremony</span>
          </div>
        </div>
        
        <div class="event-card">
          <img src="/images/sitnovate/2.JPG" alt="Team Formation" loading="lazy" />
          <div class="event-card-overlay">
            <span class="event-card-label">Team Formation</span>
          </div>
        </div>
        
        <div class="event-card">
          <img src="/images/sitnovate/3.jpg" alt="Coding Marathon" loading="lazy" />
          <div class="event-card-overlay">
            <span class="event-card-label">Coding Marathon</span>
          </div>
        </div>
        
        <div class="event-card">
          <img src="/images/sitnovate/4.jpg" alt="Mentorship Sessions" loading="lazy" />
          <div class="event-card-overlay">
            <span class="event-card-label">Mentorship Sessions</span>
          </div>
        </div>
        
        <div class="event-card">
          <img src="/images/sitnovate/5.png" alt="Final Presentations" loading="lazy" />
          <div class="event-card-overlay">
            <span class="event-card-label">Final Presentations</span>
          </div>
        </div>
        
        <div class="event-card">
          <img src="/images/sitnovate/6.png" alt="Award Ceremony" loading="lazy" />
          <div class="event-card-overlay">
            <span class="event-card-label">Award Ceremony</span>
          </div>
        </div>
      </div>
    `;

        contentContainer.appendChild(customWrapper);

        // Add styles
        if (!document.getElementById('event-highlights-styles')) {
            const styles = document.createElement('style');
            styles.id = 'event-highlights-styles';
            styles.textContent = `
        .event-highlights-wrapper {
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          width: 100%;
          height: 100%;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          padding: 3rem 2rem;
          z-index: 10;
        }

        .event-highlights-title {
          font-family: 'Cinzel', serif;
          font-size: 2.8rem;
          color: #d4af37;
          text-align: center;
          margin-bottom: 2rem;
          text-shadow: 0 2px 20px rgba(212, 175, 55, 0.4);
          letter-spacing: 3px;
          position: relative;
        }

        .event-highlights-title::after {
          content: '';
          display: block;
          width: 80px;
          height: 3px;
          background: linear-gradient(90deg, transparent, #d4af37, transparent);
          margin: 0.8rem auto 0;
        }

        .event-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 1.5rem;
          max-width: 1000px;
          width: 100%;
        }

        .event-card {
          position: relative;
          border-radius: 12px;
          overflow: hidden;
          aspect-ratio: 4/3;
          border: 2px solid rgba(212, 175, 55, 0.3);
          box-shadow: 0 10px 40px rgba(0, 0, 0, 0.4);
          transition: all 0.4s ease;
          cursor: pointer;
        }

        .event-card:hover {
          transform: translateY(-8px) scale(1.02);
          border-color: rgba(212, 175, 55, 0.7);
          box-shadow: 0 20px 60px rgba(212, 175, 55, 0.15);
        }

        .event-card img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          transition: transform 0.4s ease;
        }

        .event-card:hover img {
          transform: scale(1.08);
        }

        .event-card-overlay {
          position: absolute;
          bottom: 0;
          left: 0;
          right: 0;
          padding: 1rem;
          background: linear-gradient(to top, rgba(10, 15, 28, 0.95) 0%, transparent 100%);
        }

        .event-card-label {
          font-family: 'Cinzel', serif;
          font-size: 0.85rem;
          color: #d4af37;
          text-transform: uppercase;
          letter-spacing: 0.12em;
          padding: 0.3rem 0.8rem;
          background: rgba(212, 175, 55, 0.1);
          border: 1px solid rgba(212, 175, 55, 0.3);
          border-radius: 15px;
        }

        @media (max-width: 900px) {
          .event-grid {
            grid-template-columns: repeat(2, 1fr);
          }
          .event-highlights-title {
            font-size: 2.2rem;
          }
        }

        @media (max-width: 600px) {
          .event-grid {
            grid-template-columns: 1fr;
          }
          .event-highlights-title {
            font-size: 1.8rem;
          }
        }
      `;
            document.head.appendChild(styles);
        }

        console.log('Event Highlights section customized successfully!');
    }

    // Wait for DOM + React
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', () => setTimeout(initEventHighlights, 900));
    } else {
        setTimeout(initEventHighlights, 900);
    }
})();
