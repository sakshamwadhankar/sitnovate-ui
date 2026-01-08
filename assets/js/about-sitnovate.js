/**
 * About SITNovate Section - Custom Layout Override
 * 2nd scroll section with About content in Harry Potter theme
 */

(function () {
  'use strict';

  function initAbout() {
    // Find the 2nd section wrapper
    const sectionWrappers = document.querySelectorAll('.StorySectionWrapper_wrapper__o7CDl');
    const aboutSection = sectionWrappers[1]; // 2nd section (0-indexed)

    if (!aboutSection) {
      setTimeout(initAbout, 100);
      return;
    }

    // Check if already customized
    if (aboutSection.querySelector('.about-wrapper')) {
      return;
    }

    // Find content container
    const contentContainer = aboutSection.querySelector('.StorySectionWrapper_ContentContainer__HvMko');
    if (!contentContainer) {
      setTimeout(initAbout, 100);
      return;
    }

    // HIDE existing children
    const existingChildren = contentContainer.children;
    for (let i = 0; i < existingChildren.length; i++) {
      existingChildren[i].style.display = 'none';
    }

    // CREATE and APPEND custom content
    const customWrapper = document.createElement('div');
    customWrapper.className = 'about-wrapper';
    customWrapper.innerHTML = `
      <div class="decree-container">
        <!-- Corner Accents (L-shaped) -->
        <svg class="corner-accent corner-tl" viewBox="0 0 40 40" fill="none">
          <path d="M0,40 L0,10 C0,5 5,0 10,0 L40,0 L40,4 L12,4 C8,4 4,8 4,12 L4,40 Z" fill="currentColor" />
          <circle cx="8" cy="8" r="2" fill="#FFD700" class="pulse-dot" />
        </svg>
        <svg class="corner-accent corner-tr" viewBox="0 0 40 40" fill="none">
          <path d="M0,40 L0,10 C0,5 5,0 10,0 L40,0 L40,4 L12,4 C8,4 4,8 4,12 L4,40 Z" fill="currentColor" />
          <circle cx="8" cy="8" r="2" fill="#FFD700" class="pulse-dot" />
        </svg>
        <svg class="corner-accent corner-bl" viewBox="0 0 40 40" fill="none">
          <path d="M0,40 L0,10 C0,5 5,0 10,0 L40,0 L40,4 L12,4 C8,4 4,8 4,12 L4,40 Z" fill="currentColor" />
          <circle cx="8" cy="8" r="2" fill="#FFD700" class="pulse-dot" />
        </svg>
        <svg class="corner-accent corner-br" viewBox="0 0 40 40" fill="none">
          <path d="M0,40 L0,10 C0,5 5,0 10,0 L40,0 L40,4 L12,4 C8,4 4,8 4,12 L4,40 Z" fill="currentColor" />
          <circle cx="8" cy="8" r="2" fill="#FFD700" class="pulse-dot" />
        </svg>
        
        <div class="decree-content">
          <div class="title-wrapper">
            <h1 class="decree-title shimmer-text">ABOUT SITNOVATE</h1>
            <div class="title-glow"></div>
          </div>
          <div class="decree-divider">
            <svg viewBox="0 0 200 20" fill="currentColor">
              <path d="M100,10 L180,12 L190,10 L180,8 L100,10 M100,10 L20,12 L10,10 L20,8 L100,10" />
              <circle cx="100" cy="10" r="4" class="divider-dot" />
            </svg>
          </div>
          
          <div class="decree-proclamation">
            <p class="decree-text">
              <strong class="decree-label">SITNOVATE</strong> 
              <span class="first-letter">i</span>s the flagship 24-hour hackathon organized by <em>Symbiosis Institute of Technology, Nagpur</em>. This premier innovation event brings together the brightest minds in technology to collaborate, compete, and create groundbreaking solutions that address real-world challenges.
            </p>
            
            <p class="decree-text">
              Over the course of <strong class="highlight-text">24 intensive hours</strong>, participants work with cutting-edge technologies including AI/ML, blockchain, IoT, and web development frameworks. The event features expert mentorship from industry leaders, comprehensive technical support, and access to state-of-the-art development resources.
            </p>
          </div>
          
          <div class="decree-stats">
            <div class="decree-stat stat-glow">
              <div class="decree-stat-number">700+</div>
              <div class="decree-stat-label">PAST PARTICIPANTS</div>
            </div>
            <div class="stat-divider"></div>
            <div class="decree-stat stat-glow">
              <div class="decree-stat-number">2 LAKH</div>
              <div class="decree-stat-label">PRIZE POOL</div>
            </div>
          </div>
        </div>
      </div>
    `;

    contentContainer.appendChild(customWrapper);

    // Add styles
    if (!document.getElementById('about-styles')) {
      const styles = document.createElement('style');
      styles.id = 'about-styles';
      styles.textContent = `
        @import url('https://fonts.googleapis.com/css2?family=Cinzel:wght@400;500;600;700&family=Cormorant+Garamond:ital,wght@0,300;0,400;0,600;1,400&display=swap');

        .about-wrapper {
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          width: 100%;
          height: 100%;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 2rem;
          z-index: 10;
          background: radial-gradient(circle at 50% 50%, #1a1a1e 0%, #050505 85%);
        }

        .decree-container {
          position: relative;
          max-width: 1400px;
          width: 100%;
          background: linear-gradient(to bottom, rgba(21, 21, 26, 0.9), rgba(10, 10, 12, 0.9));
          border: 1px solid rgba(212, 175, 55, 0.2);
          box-shadow: 0 0 40px rgba(0,0,0,0.9) inset;
          clip-path: polygon(
            20px 20px, 20px 0, calc(100% - 20px) 0, calc(100% - 20px) 20px,
            100% 20px, 100% calc(100% - 20px), calc(100% - 20px) calc(100% - 20px),
            calc(100% - 20px) 100%, 20px 100%, 20px calc(100% - 20px),
            0 calc(100% - 20px), 0 20px
          );
          padding: 4rem 3rem;
          backdrop-filter: blur(4px);
          filter: drop-shadow(0 0 20px rgba(0,0,0,0.8)) drop-shadow(0 0 10px rgba(212, 175, 55, 0.15));
          transition: filter 0.3s ease;
        }

        .decree-container:hover {
          filter: drop-shadow(0 0 30px rgba(0,0,0,0.9)) drop-shadow(0 0 15px rgba(212, 175, 55, 0.25));
        }

        @media (min-width: 768px) {
          .decree-container {
            padding: 5rem 4rem;
          }
        }

        @media (min-width: 1024px) {
          .decree-container {
            padding: 6rem 5rem;
          }
        }

        /* Corner Accents (L-shaped brackets) */
        .corner-accent {
          position: absolute;
          width: 20px;
          height: 20px;
          color: #b88a44;
          opacity: 0.8;
          pointer-events: none;
        }

        .corner-tl {
          top: 20px;
          left: 20px;
          transform: translate(-50%, -50%);
        }

        .corner-tr {
          top: 20px;
          right: 20px;
          transform: translate(50%, -50%) rotate(90deg);
        }

        .corner-bl {
          bottom: 20px;
          left: 20px;
          transform: translate(-50%, 50%) rotate(270deg);
        }

        .corner-br {
          bottom: 20px;
          right: 20px;
          transform: translate(50%, 50%) rotate(180deg);
        }

        /* Pulse animation for corner dots */
        @keyframes pulse {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.4; }
        }

        .pulse-dot {
          animation: pulse 2s ease-in-out infinite;
        }

        .decree-content {
          position: relative;
          z-index: 10;
          display: flex;
          flex-direction: column;
          gap: 2.5rem;
        }

        /* Title with shimmer effect */
        .title-wrapper {
          position: relative;
          display: flex;
          flex-direction: column;
          align-items: center;
        }

        .decree-title {
          font-family: 'Cinzel', serif;
          font-size: 1.875rem;
          font-weight: 700;
          letter-spacing: 0.15em;
          text-transform: uppercase;
          text-align: center;
          position: relative;
          z-index: 1;
        }

        @media (min-width: 768px) {
          .decree-title {
            font-size: 3rem;
          }
        }

        /* Shimmer animation */
        .shimmer-text {
          background: linear-gradient(to right, #b88a44 20%, #ffecb3 50%, #b88a44 80%);
          background-size: 200% auto;
          color: transparent;
          -webkit-background-clip: text;
          background-clip: text;
          animation: shine 4s linear infinite;
          filter: drop-shadow(0 0 20px rgba(212, 175, 55, 0.3));
        }

        @keyframes shine {
          to {
            background-position: 200% center;
          }
        }

        /* Glow under title */
        .title-glow {
          position: absolute;
          inset: -1rem;
          background: radial-gradient(ellipse, rgba(212, 175, 55, 0.1), transparent 70%);
          filter: blur(20px);
          z-index: 0;
          pointer-events: none;
        }

        /* Divider */
        .decree-divider {
          width: 18rem;
          height: 2rem;
          margin: 0 auto;
          opacity: 0.8;
          color: #d4af37;
        }

        .decree-divider svg {
          width: 100%;
          height: 100%;
        }

        .divider-dot {
          fill: #FFD700;
          filter: drop-shadow(0 0 8px rgba(255, 215, 0, 0.8));
        }

        .decree-proclamation {
          display: flex;
          flex-direction: column;
          gap: 2rem;
          padding: 0 1rem;
        }

        @media (min-width: 768px) {
          .decree-proclamation {
            padding: 0 2rem;
          }
        }

        .decree-label {
          font-family: 'Cinzel', serif;
          font-size: 0.875rem;
          font-weight: normal;
          color: #d4af37;
          letter-spacing: 0.1em;
          text-transform: uppercase;
          border-bottom: 1px solid rgba(212, 175, 55, 0.5);
          padding-bottom: 0.25rem;
          display: inline-block;
          margin-right: 0.5rem;
        }

        .decree-text {
          font-family: 'Cormorant Garamond', serif;
          font-size: 1.125rem;
          line-height: 1.8;
          color: #c0c0c8;
          text-align: justify;
          filter: drop-shadow(0 1px 2px rgba(0,0,0,0.3));
        }

        @media (min-width: 768px) {
          .decree-text {
            font-size: 1.25rem;
          }
        }

        /* First letter styling */
        .first-letter {
          font-size: 3rem;
          float: left;
          margin-right: 0.75rem;
          margin-top: -0.25rem;
          color: #ffecb3;
          font-family: 'Cinzel', serif;
          filter: drop-shadow(0 0 5px rgba(212, 175, 55, 0.5));
        }

        @media (min-width: 768px) {
          .first-letter {
            font-size: 3.75rem;
          }
        }

        .decree-text em {
          color: #e5e5e5;
          font-style: italic;
          border-bottom: 1px dashed #666;
          padding-bottom: 0.125rem;
          transition: all 0.3s;
          cursor: pointer;
        }

        .decree-text em:hover {
          color: #ffecb3;
          border-color: #d4af37;
        }

        .highlight-text {
          color: #ffecb3;
          font-weight: 600;
          letter-spacing: 0.05em;
        }

        /* Stats section */
        .decree-stats {
          margin-top: 3rem;
          padding-top: 2rem;
          border-top: 1px solid rgba(212, 175, 55, 0.2);
          display: flex;
          flex-wrap: wrap;
          justify-content: center;
          align-items: center;
          gap: 3rem 4rem;
          font-family: 'Cinzel', serif;
          letter-spacing: 0.15em;
          font-size: 0.75rem;
          text-transform: uppercase;
          position: relative;
        }

        .decree-stat {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 0.5rem;
          cursor: default;
          transition: all 0.3s ease;
        }

        .stat-glow:hover {
          transform: scale(1.05);
        }

        .stat-glow:hover .decree-stat-number {
          color: #ffecb3;
          text-shadow: 0 0 10px rgba(255, 215, 0, 0.6);
          transform: scale(1.1);
        }

        .stat-glow:hover .decree-stat-label {
          opacity: 1;
        }

        .decree-stat-number {
          font-size: 1.875rem;
          color: #d4af37;
          transition: all 0.3s ease;
        }

        @media (min-width: 768px) {
          .decree-stat-number {
            font-size: 2.25rem;
          }
        }

        .decree-stat-label {
          color: #b8b8c0;
          opacity: 0.6;
          transition: opacity 0.3s ease;
        }

        /* Stat divider */
        .stat-divider {
          width: 1px;
          height: 3rem;
          background: linear-gradient(to bottom, transparent, rgba(212, 175, 55, 0.4), transparent);
          display: none;
        }

        @media (min-width: 768px) {
          .stat-divider {
            display: block;
          }
        }
      `;
      document.head.appendChild(styles);
    }

    console.log('About SITNovate section customized successfully!');
  }

  // Wait for DOM + React
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => setTimeout(initAbout, 600));
  } else {
    setTimeout(initAbout, 600);
  }
})();
