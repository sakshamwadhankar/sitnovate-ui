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
        <div class="decree-corner decree-corner-tl"></div>
        <div class="decree-corner decree-corner-tr"></div>
        <div class="decree-corner decree-corner-bl"></div>
        <div class="decree-corner decree-corner-br"></div>
        
        <div class="decree-content">
          <h1 class="decree-title">DECREE: SITNOVATE</h1>
          <div class="decree-divider"></div>
          
          <div class="decree-proclamation">
            <p class="decree-label">PROCLAMATION:</p>
            <p class="decree-text">
              SITNovate stands as the flagship 24-hour innovation catalyst organized 
              by the scholars of <em>Symbiosis Institute of Technology, Nagpur</em>. This gathering summons the 
              most brilliant minds in technology to collaborate and forge groundbreaking solutions for 
              the realm's most pressing challenges.
            </p>
            
            <p class="decree-text">
              Over the course of <strong>24 intensive hours</strong>, initiates work with advanced arts including 
              Artificial Intelligence, Blockchain, and the Internet of Things. The assembly features 
              guidance from distinguished masters of the industry and access to unparalleled resources.
            </p>
          </div>
          
          <div class="decree-stats">
            <div class="decree-stat">
              <div class="decree-stat-number">49</div>
              <div class="decree-stat-label">COVENS (TEAMS)</div>
            </div>
            <div class="decree-stat">
              <div class="decree-stat-number">800+</div>
              <div class="decree-stat-label">WIZARDS</div>
            </div>
            <div class="decree-stat">
              <div class="decree-stat-number">1 LAKH</div>
              <div class="decree-stat-label">GALLEONS</div>
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
          max-width: 1000px;
          width: 100%;
          background: rgba(10, 10, 12, 0.6);
          border: 1px solid rgba(212, 175, 55, 0.15);
          box-shadow: 0 0 40px rgba(0,0,0,0.9) inset;
          clip-path: polygon(
            20px 0, 100% 0, 
            100% calc(100% - 20px), calc(100% - 20px) 100%, 
            0 100%, 0 20px
          );
          padding: 3rem 2rem;
          backdrop-filter: blur(2px);
        }

        @media (min-width: 768px) {
          .decree-container {
            padding: 4rem 3rem;
          }
        }

        /* Decorative Corners */
        .decree-corner {
          position: absolute;
          width: 96px;
          height: 96px;
          opacity: 0.4;
          color: #8a7030;
          pointer-events: none;
        }

        .decree-corner-tl {
          top: -8px;
          left: -8px;
          background: url('data:image/svg+xml,<svg viewBox="0 0 100 100" fill="%238a7030" xmlns="http://www.w3.org/2000/svg"><path d="M0,0 L30,0 C45,0 45,15 60,15 C75,15 85,5 100,0 L100,30 C95,45 80,45 80,60 C80,75 90,85 100,100 L70,100 C55,100 55,85 40,85 C25,85 15,95 0,100 L0,70 C5,55 20,55 20,40 C20,25 10,15 0,0 Z M10,10 L15,10 C20,10 20,20 10,20 L10,15 Z"/><path d="M25,25 C40,25 40,40 25,40 C10,40 10,25 25,25 Z" opacity="0.5"/></svg>') no-repeat center;
          background-size: contain;
        }

        .decree-corner-tr {
          top: -8px;
          right: -8px;
          background: url('data:image/svg+xml,<svg viewBox="0 0 100 100" fill="%238a7030" xmlns="http://www.w3.org/2000/svg"><path d="M0,0 L30,0 C45,0 45,15 60,15 C75,15 85,5 100,0 L100,30 C95,45 80,45 80,60 C80,75 90,85 100,100 L70,100 C55,100 55,85 40,85 C25,85 15,95 0,100 L0,70 C5,55 20,55 20,40 C20,25 10,15 0,0 Z M10,10 L15,10 C20,10 20,20 10,20 L10,15 Z"/><path d="M25,25 C40,25 40,40 25,40 C10,40 10,25 25,25 Z" opacity="0.5"/></svg>') no-repeat center;
          background-size: contain;
          transform: scaleX(-1);
        }

        .decree-corner-bl {
          bottom: -8px;
          left: -8px;
          background: url('data:image/svg+xml,<svg viewBox="0 0 100 100" fill="%238a7030" xmlns="http://www.w3.org/2000/svg"><path d="M0,0 L30,0 C45,0 45,15 60,15 C75,15 85,5 100,0 L100,30 C95,45 80,45 80,60 C80,75 90,85 100,100 L70,100 C55,100 55,85 40,85 C25,85 15,95 0,100 L0,70 C5,55 20,55 20,40 C20,25 10,15 0,0 Z M10,10 L15,10 C20,10 20,20 10,20 L10,15 Z"/><path d="M25,25 C40,25 40,40 25,40 C10,40 10,25 25,25 Z" opacity="0.5"/></svg>') no-repeat center;
          background-size: contain;
          transform: scaleY(-1);
        }

        .decree-corner-br {
          bottom: -8px;
          right: -8px;
          background: url('data:image/svg+xml,<svg viewBox="0 0 100 100" fill="%238a7030" xmlns="http://www.w3.org/2000/svg"><path d="M0,0 L30,0 C45,0 45,15 60,15 C75,15 85,5 100,0 L100,30 C95,45 80,45 80,60 C80,75 90,85 100,100 L70,100 C55,100 55,85 40,85 C25,85 15,95 0,100 L0,70 C5,55 20,55 20,40 C20,25 10,15 0,0 Z M10,10 L15,10 C20,10 20,20 10,20 L10,15 Z"/><path d="M25,25 C40,25 40,40 25,40 C10,40 10,25 25,25 Z" opacity="0.5"/></svg>') no-repeat center;
          background-size: contain;
          transform: scale(-1);
        }

        /* Inner Border */
        .decree-container::before {
          content: '';
          position: absolute;
          inset: 1rem;
          border: 1px solid rgba(212, 175, 55, 0.1);
          pointer-events: none;
          clip-path: polygon(
            16px 0, 100% 0, 
            100% calc(100% - 16px), calc(100% - 16px) 100%, 
            0 100%, 0 16px
          );
        }

        .decree-content {
          position: relative;
          z-index: 10;
          display: flex;
          flex-direction: column;
          gap: 2.5rem;
        }

        .decree-title {
          font-family: 'Cinzel', serif;
          font-size: 1.5rem;
          font-weight: 700;
          color: #e5e5e5;
          letter-spacing: 0.2em;
          text-transform: uppercase;
          text-align: center;
          text-shadow: 0 0 15px rgba(212, 175, 55, 0.25);
        }

        @media (min-width: 768px) {
          .decree-title {
            font-size: 2.5rem;
          }
        }

        .decree-divider {
          width: 16rem;
          height: 1.5rem;
          margin: 0 auto;
          background: url('data:image/svg+xml,<svg viewBox="0 0 200 20" fill="%23d4af37" xmlns="http://www.w3.org/2000/svg"><path d="M100,10 L180,12 L190,10 L180,8 L100,10 M100,10 L20,12 L10,10 L20,8 L100,10"/><circle cx="100" cy="10" r="3"/></svg>') no-repeat center;
          background-size: contain;
          opacity: 0.4;
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
          color: #c5a059;
          letter-spacing: 0.1em;
          text-transform: uppercase;
          margin-bottom: -1rem;
        }

        .decree-text {
          font-family: 'Cormorant Garamond', serif;
          font-size: 1.125rem;
          line-height: 1.8;
          color: #b8b8c0;
          text-align: justify;
        }

        @media (min-width: 768px) {
          .decree-text {
            font-size: 1.25rem;
          }
        }

        .decree-text:first-of-type::first-letter {
          font-size: 2.5rem;
          float: left;
          margin-right: 0.5rem;
          margin-top: -0.375rem;
          color: #d4af37;
          font-family: 'Cinzel', serif;
        }

        .decree-text em {
          color: #d4d4d4;
          font-style: italic;
          border-bottom: 1px solid #444;
          padding-bottom: 0.125rem;
          transition: border-color 0.3s;
        }

        .decree-text em:hover {
          border-color: #d4af37;
        }

        .decree-text strong {
          color: #e5e5e5;
          font-weight: 600;
        }

        .decree-stats {
          margin-top: 3rem;
          padding-top: 2rem;
          border-top: 1px solid rgba(212, 175, 55, 0.1);
          display: flex;
          flex-wrap: wrap;
          justify-content: center;
          gap: 3rem 3rem;
          font-family: 'Cinzel', serif;
          letter-spacing: 0.15em;
          font-size: 0.75rem;
          text-transform: uppercase;
          opacity: 0.7;
        }

        .decree-stat {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 0.5rem;
        }

        .decree-stat-number {
          font-size: 1.25rem;
          color: #c5a059;
        }

        .decree-stat-label {
          color: #b8b8c0;
        }

        /* Dividers between stats on desktop */
        .decree-stat:not(:last-child)::after {
          content: '';
          position: absolute;
          width: 1px;
          height: 2.5rem;
          background: rgba(212, 175, 55, 0.2);
          right: -1.5rem;
          top: 50%;
          transform: translateY(-50%);
          display: none;
        }

        @media (min-width: 768px) {
          .decree-stat {
            position: relative;
          }
          .decree-stat:not(:last-child)::after {
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
