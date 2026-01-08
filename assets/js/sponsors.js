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
      <div class="sponsors-content">
        <!-- Section Title -->
        <div class="sponsors-header">
          <div class="sponsors-benefactors">
            <span class="line-left"></span>
            <span class="benefactors-text">OUR BENEFACTORS</span>
            <span class="line-right"></span>
          </div>
          
          <h2 class="sponsors-main-title">Past Sponsors</h2>
          
          <p class="sponsors-quote">"Those who fuel the magic"</p>
        </div>

        <!-- Ministry Approved Section -->
        <div class="ministry-section">
          <div class="ministry-header">
            <svg class="shield-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10" />
            </svg>
            <h3 class="ministry-title">Ministry Approved</h3>
            <svg class="shield-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10" />
            </svg>
          </div>

          <!-- Sponsors Grid (4x2) -->
          <div class="sponsors-shield-grid">
            <!-- Sponsor 1 -->
            <div class="sponsor-shield">
              <div class="shield-glow"></div>
              <div class="shield-frame">
                <div class="shield-inner">
                  <div class="shield-bolt"></div>
                  <div class="shield-icon-container">
                    <img src="/images/sponsors/pizzahut.png" alt="Pizza Hut" class="shield-logo" />
                  </div>
                  <h4 class="shield-name">Pizza Hut</h4>
                  <p class="shield-desc">Past Sponsor</p>
                  <div class="shield-shine"></div>
                </div>
              </div>
            </div>

            <!-- Sponsor 2 -->
            <div class="sponsor-shield">
              <div class="shield-glow"></div>
              <div class="shield-frame">
                <div class="shield-inner">
                  <div class="shield-bolt"></div>
                  <div class="shield-icon-container">
                    <img src="/images/sponsors/MIA.png" alt="MIA by Tanishq" class="shield-logo" />
                  </div>
                  <h4 class="shield-name">MIA by Tanishq</h4>
                  <p class="shield-desc">Past Sponsor</p>
                  <div class="shield-shine"></div>
                </div>
              </div>
            </div>

            <!-- Sponsor 3 -->
            <div class="sponsor-shield">
              <div class="shield-glow"></div>
              <div class="shield-frame">
                <div class="shield-inner">
                  <div class="shield-bolt"></div>
                  <div class="shield-icon-container">
                    <img src="/images/sponsors/Insterra.webp" alt="Insterra" class="shield-logo" />
                  </div>
                  <h4 class="shield-name">Insterra</h4>
                  <p class="shield-desc">Past Sponsor</p>
                  <div class="shield-shine"></div>
                </div>
              </div>
            </div>

            <!-- Sponsor 4 -->
            <div class="sponsor-shield">
              <div class="shield-glow"></div>
              <div class="shield-frame">
                <div class="shield-inner">
                  <div class="shield-bolt"></div>
                  <div class="shield-icon-container">
                    <img src="/images/sponsors/PB.png" alt="PB Creation" class="shield-logo" />
                  </div>
                  <h4 class="shield-name">PB Creation</h4>
                  <p class="shield-desc">Past Sponsor</p>
                  <div class="shield-shine"></div>
                </div>
              </div>
            </div>

            <!-- Sponsor 5 -->
            <div class="sponsor-shield">
              <div class="shield-glow"></div>
              <div class="shield-frame">
                <div class="shield-inner">
                  <div class="shield-bolt"></div>
                  <div class="shield-icon-container">
                    <img src="/images/sponsors/dev.png" alt="Devfolio" class="shield-logo" />
                  </div>
                  <h4 class="shield-name">Devfolio</h4>
                  <p class="shield-desc">Past Sponsor</p>
                  <div class="shield-shine"></div>
                </div>
              </div>
            </div>

            <!-- Sponsor 6 -->
            <div class="sponsor-shield">
              <div class="shield-glow"></div>
              <div class="shield-frame">
                <div class="shield-inner">
                  <div class="shield-bolt"></div>
                  <div class="shield-icon-container">
                    <img src="/images/sponsors/eth.png" alt="ETH India" class="shield-logo" />
                  </div>
                  <h4 class="shield-name">ETH India</h4>
                  <p class="shield-desc">Past Sponsor</p>
                  <div class="shield-shine"></div>
                </div>
              </div>
            </div>

            <!-- Sponsor 7 -->
            <div class="sponsor-shield">
              <div class="shield-glow"></div>
              <div class="shield-frame">
                <div class="shield-inner">
                  <div class="shield-bolt"></div>
                  <div class="shield-icon-container">
                    <img src="/images/sponsors/poly.png" alt="Polygon" class="shield-logo" />
                  </div>
                  <h4 class="shield-name">Polygon</h4>
                  <p class="shield-desc">Past Sponsor</p>
                  <div class="shield-shine"></div>
                </div>
              </div>
            </div>

            <!-- Sponsor 8 -->
            <div class="sponsor-shield">
              <div class="shield-glow"></div>
              <div class="shield-frame">
                <div class="shield-inner">
                  <div class="shield-bolt"></div>
                  <div class="shield-icon-container">
                    <img src="/images/sponsors/un.png" alt="Unstop" class="shield-logo" />
                  </div>
                  <h4 class="shield-name">Unstop</h4>
                  <p class="shield-desc">Past Sponsor</p>
                  <div class="shield-shine"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    `;

    contentContainer.appendChild(customWrapper);

    // Add styles
    if (!document.getElementById('sponsors-styles')) {
      const styles = document.createElement('style');
      styles.id = 'sponsors-styles';
      styles.textContent = `
        @import url('https://fonts.googleapis.com/css2?family=Cinzel:wght@400;700;900&family=Crimson+Text:ital,wght@0,400;0,600;1,400&display=swap');

        .sponsors-wrapper {
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          width: 100%;
          height: 100%;
          display: flex;
          align-items: flex-start;
          justify-content: flex-start;
          padding: 4rem 2rem 2rem 2rem;
          z-index: 10;
          background: #000;
          overflow-y: auto;
        }

        /* Subtle background elements */
        .sponsors-wrapper::before {
          content: '';
          position: absolute;
          top: 0;
          left: 25%;
          width: 24rem;
          height: 24rem;
          background: radial-gradient(circle, rgba(212, 175, 55, 0.05), transparent);
          filter: blur(120px);
          pointer-events: none;
        }

        .sponsors-wrapper::after {
          content: '';
          position: absolute;
          bottom: 0;
          right: 25%;
          width: 24rem;
          height: 24rem;
          background: radial-gradient(circle, rgba(128, 0, 128, 0.1), transparent);
          filter: blur(120px);
          pointer-events: none;
        }

        .sponsors-content {
          max-width: 1400px;
          width: 100%;
          position: relative;
          z-index: 10;
        }

        /* Header Section */
        .sponsors-header {
          text-align: center;
          margin-bottom: 2.5rem;
        }

        .sponsors-benefactors {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 1rem;
          opacity: 0.7;
          margin-bottom: 0.75rem;
        }

        .line-left, .line-right {
          height: 1px;
          width: 3rem;
          background: linear-gradient(to right, transparent, #d4af37);
        }

        .line-right {
          background: linear-gradient(to left, transparent, #d4af37);
        }

        .benefactors-text {
          color: #d4af37;
          font-size: 0.75rem;
          font-family: 'Cinzel', serif;
          letter-spacing: 0.3em;
          font-weight: 700;
        }

        .sponsors-main-title {
          font-size: 2rem;
          font-family: 'Cinzel', serif;
          font-weight: 700;
          color: #fff;
          text-shadow: 0 2px 10px rgba(212, 175, 55, 0.3);
          margin-bottom: 0.5rem;
        }

        @media (min-width: 768px) {
          .sponsors-main-title {
            font-size: 2.5rem;
          }
        }

        .sponsors-quote {
          margin-top: 0.5rem;
          color: #8a8a8a;
          font-family: 'Crimson Text', serif;
          font-size: 0.95rem;
          font-style: italic;
        }

        /* Ministry Section */
        .ministry-section {
          margin-top: 1.5rem;
        }

        .ministry-header {
          display: flex;
          justify-content: center;
          align-items: center;
          gap: 0.75rem;
          margin-bottom: 1.5rem;
        }

        .shield-icon {
          width: 1rem;
          height: 1rem;
          color: #6b7280;
        }

        .ministry-title {
          font-size: 1.125rem;
          font-family: 'Cinzel', serif;
          color: #6b7280;
          letter-spacing: 0.15em;
          text-transform: uppercase;
          border-bottom: 1px solid #4b5563;
          padding-bottom: 0.25rem;
        }

        /* Shield Grid - 4x2 layout */
        .sponsors-shield-grid {
          display: grid;
          grid-template-columns: 1fr;
          gap: 1.5rem;
          padding: 0 1rem;
        }

        @media (min-width: 640px) {
          .sponsors-shield-grid {
            grid-template-columns: repeat(2, 1fr);
          }
        }

        @media (min-width: 1024px) {
          .sponsors-shield-grid {
            grid-template-columns: repeat(4, 1fr);
          }
        }

        /* Individual Shield Card */
        .sponsor-shield {
          position: relative;
          height: 13rem;
          cursor: pointer;
          perspective: 1000px;
        }

        /* Glow Effect */
        .shield-glow {
          position: absolute;
          inset: -0.25rem;
          border-radius: 2rem 2rem 6rem 6rem;
          background: radial-gradient(circle at center, rgba(160, 160, 160, 0.1), transparent);
          opacity: 0;
          filter: blur(40px);
          transition: opacity 0.7s;
        }

        .sponsor-shield:hover .shield-glow {
          opacity: 0.4;
        }

        /* Shield Frame - Shield Shape */
        .shield-frame {
          position: relative;
          height: 100%;
          background: #0a0a0a;
          border-radius: 2rem 2rem 6rem 6rem;
          transition: all 0.5s;
          box-shadow: 0 0 0 1px rgba(160, 160, 160, 0.2);
          overflow: hidden;
        }

        .sponsor-shield:hover .shield-frame {
          transform: translateY(-0.5rem);
        }

        /* Inner Shield Content */
        .shield-inner {
          height: 100%;
          width: 100%;
          padding: 1.5rem;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          text-align: center;
          position: relative;
          background: #111;
          border-radius: 2rem 2rem 6rem 6rem;
          border: 1px solid rgba(160, 160, 160, 0.1);
        }

        /* Decorative Top Bolt */
        .shield-bolt {
          position: absolute;
          top: 1rem;
          left: 50%;
          transform: translateX(-50%);
          width: 0.5rem;
          height: 0.5rem;
          border-radius: 50%;
          background-color: #a0a0a0;
          opacity: 0.5;
        }

        /* Icon/Logo Container */
        .shield-icon-container {
          margin-bottom: 1rem;
          padding: 0.75rem;
          border-radius: 0.75rem;
          transform: rotate(45deg);
          transition: all 0.5s;
          background: rgba(0, 0, 0, 0.4);
          border: 1px solid rgba(255, 255, 255, 0.05);
          box-shadow: 0 0 15px rgba(160, 160, 160, 0.1);
          width: 4rem;
          height: 4rem;
          display: flex;
          align-items: center;
          justify-content: center;
          overflow: hidden;
          position: relative;
          z-index: 10;
        }

        .sponsor-shield:hover .shield-icon-container {
          transform: rotate(0deg);
        }

        .shield-logo {
          width: 100%;
          height: 100%;
          object-fit: contain;
          filter: grayscale(1);
          transition: all 0.5s;
          transform: rotate(-45deg);
        }

        .sponsor-shield:hover .shield-logo {
          filter: grayscale(0);
          transform: rotate(0deg);
        }

        /* Text Content */
        .shield-name {
          font-family: 'Cinzel', serif;
          font-weight: 700;
          letter-spacing: 0.05em;
          color: #fff;
          transition: color 0.3s;
          z-index: 10;
          font-size: 0.95rem;
        }

        .shield-desc {
          font-family: 'Crimson Text', serif;
          color: #6b7280;
          font-style: italic;
          font-size: 0.8rem;
          margin-top: 0.4rem;
          opacity: 0.6;
          transition: opacity 0.5s;
          z-index: 10;
        }

        .sponsor-shield:hover .shield-desc {
          opacity: 1;
        }

        /* Bottom Shine Effect */
        .shield-shine {
          position: absolute;
          bottom: 0;
          left: 0;
          width: 100%;
          height: 33.333%;
          background: linear-gradient(to top, rgba(255, 255, 255, 0.05), transparent);
          opacity: 0;
          transition: opacity 0.5s;
          border-radius: 0 0 6rem 6rem;
        }

        .sponsor-shield:hover .shield-shine {
          opacity: 1;
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
