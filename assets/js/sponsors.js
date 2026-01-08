/**
 * Past Sponsors Section - Custom Layout Override
 * 5th scroll section with sponsor logos in Harry Potter theme
 */

(function () {
    'use strict';

    function initSponsors() {
        // Find the 5th section wrapper
        const sectionWrappers = document.querySelectorAll('.StorySectionWrapper_wrapper__o7CDl');
        const sponsorSection = sectionWrappers[4]; // 5th section (0-indexed)

        if (!sponsorSection) {
            setTimeout(initSponsors, 100);
            return;
        }

        // Check if already customized
        if (sponsorSection.querySelector('.sponsors-wrapper')) {
            return;
        }

        // Find content container
        const contentContainer = sponsorSection.querySelector('.StorySectionWrapper_ContentContainer__HvMko');
        if (!contentContainer) {
            setTimeout(initSponsors, 100);
            return;
        }

        // HIDE existing children
        const existingChildren = contentContainer.children;
        for (let i = 0; i < existingChildren.length; i++) {
            existingChildren[i].style.display = 'none';
        }

        // CREATE and APPEND custom content
        const customWrapper = document.createElement('div');
        customWrapper.className = 'sponsors-wrapper';
        customWrapper.innerHTML = `
      <h2 class="sponsors-title">Past Sponsors</h2>
      <p class="sponsors-subtitle">Thank you to our amazing sponsors who made SITNovate possible</p>
      
      <div class="sponsors-grid">
        <!-- Row 1 -->
        <div class="sponsor-card">
          <div class="sponsor-logo">
            <img src="/images/sponsors/pizzahut.png" alt="Pizza Hut" />
          </div>
          <div class="sponsor-info">
            <span class="sponsor-name">Pizza Hut</span>
            <span class="sponsor-type">FOOD PARTNER</span>
          </div>
        </div>
        
        <div class="sponsor-card">
          <div class="sponsor-logo">
            <img src="/images/sponsors/MIA.png" alt="MIA by Tanishq" />
          </div>
          <div class="sponsor-info">
            <span class="sponsor-name">MIA by Tanishq</span>
            <span class="sponsor-type">JEWELRY PARTNER</span>
          </div>
        </div>
        
        <div class="sponsor-card">
          <div class="sponsor-logo">
            <img src="/images/sponsors/Insterra.webp" alt="Insterra" />
          </div>
          <div class="sponsor-info">
            <span class="sponsor-name">Insterra</span>
            <span class="sponsor-type">TECH PARTNER</span>
          </div>
        </div>
        
        <div class="sponsor-card">
          <div class="sponsor-logo">
            <img src="/images/sponsors/PB.png" alt="PB Creation" />
          </div>
          <div class="sponsor-info">
            <span class="sponsor-name">PB Creation</span>
            <span class="sponsor-type">CREATIVE PARTNER</span>
          </div>
        </div>
        
        <!-- Row 2 -->
        <div class="sponsor-card">
          <div class="sponsor-logo">
            <img src="/images/sponsors/dev.png" alt="Devfolio" />
          </div>
          <div class="sponsor-info">
            <span class="sponsor-name">Devfolio</span>
            <span class="sponsor-type">PLATFORM PARTNER</span>
          </div>
        </div>
        
        <div class="sponsor-card">
          <div class="sponsor-logo">
            <img src="/images/sponsors/eth.png" alt="ETH India" />
          </div>
          <div class="sponsor-info">
            <span class="sponsor-name">ETH India</span>
            <span class="sponsor-type">BLOCKCHAIN PARTNER</span>
          </div>
        </div>
        
        <div class="sponsor-card">
          <div class="sponsor-logo">
            <img src="/images/sponsors/poly.png" alt="Polygon" />
          </div>
          <div class="sponsor-info">
            <span class="sponsor-name">Polygon</span>
            <span class="sponsor-type">WEB3 PARTNER</span>
          </div>
        </div>
        
        <div class="sponsor-card">
          <div class="sponsor-logo">
            <img src="/images/sponsors/un.png" alt="Unstop" />
          </div>
          <div class="sponsor-info">
            <span class="sponsor-name">Unstop</span>
            <span class="sponsor-type">HIRING PARTNER</span>
          </div>
        </div>
      </div>
      
      <a href="#" class="sponsor-cta">
        <span class="cta-icon">💰</span>
        Become a Sponsor
      </a>
    `;

        contentContainer.appendChild(customWrapper);

        // Add styles
        if (!document.getElementById('sponsors-styles')) {
            const styles = document.createElement('style');
            styles.id = 'sponsors-styles';
            styles.textContent = `
        .sponsors-wrapper {
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
          padding: 2rem;
          z-index: 10;
          background: linear-gradient(180deg, rgba(10, 15, 30, 0.95) 0%, rgba(15, 20, 40, 0.98) 100%);
        }

        .sponsors-title {
          font-family: 'Cinzel', serif;
          font-size: 2.8rem;
          color: #f5f5f5;
          text-align: center;
          margin-bottom: 0.5rem;
          letter-spacing: 2px;
        }

        .sponsors-subtitle {
          font-family: system-ui, -apple-system, sans-serif;
          font-size: 1rem;
          color: #888;
          text-align: center;
          margin-bottom: 2rem;
        }

        .sponsors-grid {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 1.2rem;
          max-width: 1100px;
          width: 100%;
          margin-bottom: 2rem;
        }

        .sponsor-card {
          background: linear-gradient(145deg, rgba(20, 25, 45, 0.95), rgba(30, 35, 55, 0.9));
          border: 2px solid rgba(80, 90, 120, 0.4);
          border-radius: 12px;
          padding: 1.2rem;
          display: flex;
          flex-direction: column;
          align-items: center;
          transition: all 0.3s ease;
        }

        .sponsor-card:hover {
          border-color: rgba(212, 175, 55, 0.6);
          transform: translateY(-5px);
          box-shadow: 0 10px 30px rgba(212, 175, 55, 0.15);
        }

        .sponsor-logo {
          width: 100%;
          height: 80px;
          display: flex;
          align-items: center;
          justify-content: center;
          margin-bottom: 0.8rem;
          background: rgba(255, 255, 255, 0.95);
          border-radius: 8px;
          padding: 0.8rem;
        }

        .sponsor-logo img {
          max-width: 100%;
          max-height: 100%;
          object-fit: contain;
        }

        .sponsor-info {
          display: flex;
          flex-direction: column;
          align-items: center;
          text-align: center;
        }

        .sponsor-name {
          font-family: system-ui, -apple-system, sans-serif;
          font-size: 0.9rem;
          color: #e0e0e0;
          font-weight: 500;
          margin-bottom: 0.3rem;
        }

        .sponsor-type {
          font-family: 'Cinzel', serif;
          font-size: 0.7rem;
          color: #d4af37;
          letter-spacing: 0.1em;
          text-transform: uppercase;
        }

        .sponsor-cta {
          display: inline-flex;
          align-items: center;
          gap: 0.8rem;
          padding: 1rem 2rem;
          background: linear-gradient(145deg, rgba(212, 175, 55, 0.15), rgba(212, 175, 55, 0.05));
          border: 2px solid rgba(212, 175, 55, 0.5);
          border-radius: 30px;
          color: #d4af37;
          font-family: 'Cinzel', serif;
          font-size: 1rem;
          text-decoration: none;
          transition: all 0.3s ease;
          letter-spacing: 1px;
        }

        .sponsor-cta:hover {
          background: rgba(212, 175, 55, 0.2);
          border-color: #d4af37;
          box-shadow: 0 0 20px rgba(212, 175, 55, 0.3);
        }

        .cta-icon {
          font-size: 1.2rem;
        }

        @media (max-width: 900px) {
          .sponsors-grid {
            grid-template-columns: repeat(2, 1fr);
          }
          .sponsors-title {
            font-size: 2.2rem;
          }
        }

        @media (max-width: 500px) {
          .sponsors-grid {
            grid-template-columns: repeat(2, 1fr);
            gap: 0.8rem;
          }
          .sponsors-title {
            font-size: 1.8rem;
          }
          .sponsor-logo {
            height: 60px;
          }
        }
      `;
            document.head.appendChild(styles);
        }

        console.log('Past Sponsors section customized successfully!');
    }

    // Wait for DOM + React
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', () => setTimeout(initSponsors, 1000));
    } else {
        setTimeout(initSponsors, 1000);
    }
})();
