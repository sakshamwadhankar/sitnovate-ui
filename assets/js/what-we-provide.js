/**
 * What We Provide Section - Custom Layout Override (Fixed Version)
 * This script runs after React hydration to fix the layout
 * Does NOT replace innerHTML - only hides existing content and appends new
 */

(function () {
  'use strict';

  function initWhatWeProvide() {
    // Find the 3rd section wrapper (What We Provide section)
    const sectionWrappers = document.querySelectorAll('.StorySectionWrapper_wrapper__o7CDl');
    const whatWeProvideSection = sectionWrappers[2]; // 3rd section (0-indexed)

    if (!whatWeProvideSection) {
      setTimeout(initWhatWeProvide, 100);
      return;
    }

    // Check if we already customized this
    if (whatWeProvideSection.querySelector('.custom-provide-wrapper')) {
      return;
    }

    // Find the content container
    const contentContainer = whatWeProvideSection.querySelector('.StorySectionWrapper_ContentContainer__HvMko');
    if (!contentContainer) {
      setTimeout(initWhatWeProvide, 100);
      return;
    }

    // HIDE existing children (don't remove them - React needs them)
    const existingChildren = contentContainer.children;
    for (let i = 0; i < existingChildren.length; i++) {
      existingChildren[i].style.display = 'none';
    }

    // CREATE new container and APPEND (don't replace)
    const customWrapper = document.createElement('div');
    customWrapper.className = 'custom-provide-wrapper';
    customWrapper.innerHTML = `
      <h2 class="custom-provide-title">What We Provide</h2>
      <div class="custom-title-line"></div>
      
      <div class="custom-cards-container">
        <!-- Facilities Card -->
        <div class="custom-card custom-card-facilities">
          <div class="custom-card-header">
            <span class="custom-card-icon">🏰</span>
            <span class="custom-card-title">Facilities</span>
          </div>
          <div class="custom-items-grid">
            <div class="custom-item"><span class="custom-item-icon">📡</span> High-Speed WiFi</div>
            <div class="custom-item"><span class="custom-item-icon">⚡</span> Charging Stations</div>
            <div class="custom-item"><span class="custom-item-icon">🍔</span> 24/7 Food</div>
            <div class="custom-item"><span class="custom-item-icon">🛋️</span> Rest Zones</div>
          </div>
        </div>

        <!-- Treasures Card -->
        <div class="custom-card custom-card-treasures">
          <div class="custom-card-header">
            <span class="custom-card-icon">⭐</span>
            <span class="custom-card-title">Treasures</span>
          </div>
          <div class="custom-items-grid">
            <div class="custom-item"><span class="custom-item-icon">💰</span> Cash Prizes</div>
            <div class="custom-item"><span class="custom-item-icon">🎓</span> Mentorship</div>
            <div class="custom-item"><span class="custom-item-icon">🎁</span> Cool Swag</div>
            <div class="custom-item"><span class="custom-item-icon">📜</span> Certificates</div>
          </div>
        </div>
      </div>
    `;

    // APPEND to container (React still has its nodes, just hidden)
    contentContainer.appendChild(customWrapper);

    // Add styles
    if (!document.getElementById('custom-provide-styles')) {
      const styles = document.createElement('style');
      styles.id = 'custom-provide-styles';
      styles.textContent = `
        .custom-provide-wrapper {
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

        .custom-provide-title {
          font-family: 'Cinzel', serif;
          font-size: 2.8rem;
          color: #d4af37;
          text-align: center;
          margin-bottom: 0.5rem;
          text-shadow: 0 2px 20px rgba(212, 175, 55, 0.4);
          letter-spacing: 3px;
        }

        .custom-title-line {
          width: 80px;
          height: 3px;
          background: linear-gradient(90deg, transparent, #d4af37, transparent);
          margin: 0 auto 3rem auto;
        }

        .custom-cards-container {
          display: flex;
          flex-direction: row;
          gap: 2.5rem;
          justify-content: center;
          align-items: stretch;
          width: 100%;
          max-width: 1000px;
        }

        .custom-card {
          flex: 1;
          max-width: 420px;
          border-radius: 16px;
          padding: 2rem;
          position: relative;
          overflow: hidden;
        }

        .custom-card-facilities {
          background: linear-gradient(145deg, rgba(13, 27, 42, 0.95), rgba(27, 38, 59, 0.9));
          border: 2px solid rgba(65, 105, 225, 0.4);
          box-shadow: 0 0 30px rgba(65, 105, 225, 0.2), inset 0 0 60px rgba(65, 105, 225, 0.05);
        }

        .custom-card-treasures {
          background: linear-gradient(145deg, rgba(45, 22, 11, 0.95), rgba(75, 35, 15, 0.9));
          border: 2px solid rgba(182, 125, 61, 0.5);
          box-shadow: 0 0 30px rgba(182, 125, 61, 0.2), inset 0 0 60px rgba(182, 125, 61, 0.05);
        }

        .custom-card-header {
          display: flex;
          align-items: center;
          margin-bottom: 1.5rem;
          padding-bottom: 1rem;
          border-bottom: 1px solid rgba(255, 255, 255, 0.15);
        }

        .custom-card-icon {
          font-size: 2rem;
          margin-right: 1rem;
          filter: drop-shadow(0 0 8px currentColor);
        }

        .custom-card-facilities .custom-card-icon { color: #4169e1; }
        .custom-card-treasures .custom-card-icon { color: #d4af37; }

        .custom-card-title {
          font-family: 'Cinzel', serif;
          font-size: 1.6rem;
          font-weight: 600;
          letter-spacing: 2px;
        }

        .custom-card-facilities .custom-card-title { color: #b8c5e6; }
        .custom-card-treasures .custom-card-title { color: #f0d78c; }

        .custom-items-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 0.9rem;
        }

        .custom-item {
          display: flex;
          align-items: center;
          padding: 0.75rem 1rem;
          border-radius: 30px;
          font-family: system-ui, -apple-system, sans-serif;
          font-size: 0.9rem;
          font-weight: 500;
          transition: all 0.3s ease;
        }

        .custom-card-facilities .custom-item {
          background: rgba(65, 105, 225, 0.15);
          border: 1px solid rgba(65, 105, 225, 0.3);
          color: #a8c2f0;
        }

        .custom-card-facilities .custom-item:hover {
          background: rgba(65, 105, 225, 0.25);
          transform: translateX(5px);
        }

        .custom-card-treasures .custom-item {
          background: rgba(182, 125, 61, 0.15);
          border: 1px solid rgba(182, 125, 61, 0.3);
          color: #f0d78c;
        }

        .custom-card-treasures .custom-item:hover {
          background: rgba(182, 125, 61, 0.25);
          transform: translateX(5px);
        }

        .custom-item-icon {
          margin-right: 0.7rem;
          font-size: 1.1rem;
          width: 24px;
          text-align: center;
        }

        @media (max-width: 768px) {
          .custom-cards-container {
            flex-direction: column;
            align-items: center;
          }
          .custom-card {
            max-width: 100%;
            width: 100%;
          }
          .custom-provide-title {
            font-size: 2rem;
          }
        }
      `;
      document.head.appendChild(styles);
    }

    console.log('What We Provide section customized successfully!');
  }

  // Wait for DOM + React hydration
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => setTimeout(initWhatWeProvide, 800));
  } else {
    setTimeout(initWhatWeProvide, 800);
  }
})();
