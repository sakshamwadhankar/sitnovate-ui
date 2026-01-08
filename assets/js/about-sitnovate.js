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
      <div class="about-content">
        <div class="about-left">
          <h2 class="about-title">
            <span class="about-icon">⚡</span>
            About SITNovate
          </h2>
          
          <p class="about-para">
            <span class="about-highlight">SITNovate</span> is the flagship 24-hour hackathon organized by 
            Symbiosis Institute of Technology, Nagpur. This premier 
            innovation event brings together the brightest minds in 
            technology to collaborate, compete, and create groundbreaking 
            solutions that address real-world challenges.
          </p>
          
          <p class="about-para">
            Over the course of 24 intensive hours, participants work with cutting-edge 
            technologies including AI/ML, blockchain, IoT, and web 
            development frameworks. The hackathon features expert mentorship 
            from industry leaders, comprehensive technical support, and access to 
            state-of-the-art development resources.
          </p>
          
          <p class="about-para">
            With 49 participating teams, 800+ participants, and a prize pool of 
            around 1 Lakh, SITNovate has established itself as a catalyst for 
            technological innovation and entrepreneurship. The event not only 
            showcases exceptional talent but also creates lasting connections 
            between students, industry professionals, and tech enthusiasts.
          </p>
          
          <blockquote class="about-quote">
            "Participants get the opportunity to work with cutting-edge 
            technologies and transform their innovative ideas into reality 
            through intensive collaboration and expert guidance."
          </blockquote>
        </div>
        
        <div class="about-right">
          <div class="about-card">
            <span class="about-card-text">About</span>
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
          padding: 3rem 4rem;
          z-index: 10;
          background: linear-gradient(180deg, rgba(10, 15, 30, 0.98) 0%, rgba(15, 20, 40, 0.98) 100%);
        }

        .about-content {
          display: flex;
          gap: 3rem;
          max-width: 1200px;
          width: 100%;
          align-items: center;
        }

        .about-left {
          flex: 1.2;
        }

        .about-right {
          flex: 0.8;
          display: flex;
          justify-content: center;
        }

        .about-title {
          font-family: 'Cinzel', serif;
          font-size: 2.4rem;
          color: #f5f5f5;
          display: flex;
          align-items: center;
          gap: 1rem;
          margin-bottom: 1.5rem;
        }

        .about-icon {
          color: #ff6b35;
          font-size: 2rem;
          filter: drop-shadow(0 0 10px rgba(255, 107, 53, 0.5));
        }

        .about-para {
          font-family: system-ui, -apple-system, sans-serif;
          font-size: 0.95rem;
          color: #c0c0c0;
          line-height: 1.7;
          margin-bottom: 1.2rem;
        }

        .about-highlight {
          color: #4da6ff;
          font-weight: 600;
        }

        .about-quote {
          margin-top: 1.5rem;
          padding-left: 1.2rem;
          border-left: 3px solid #d4af37;
          font-style: italic;
          color: #d4af37;
          font-family: Georgia, serif;
          font-size: 0.95rem;
          line-height: 1.6;
        }

        .about-card {
          width: 280px;
          height: 200px;
          background: linear-gradient(145deg, rgba(30, 35, 55, 0.95), rgba(40, 45, 65, 0.9));
          border: 2px solid rgba(80, 90, 120, 0.5);
          border-radius: 16px;
          display: flex;
          align-items: center;
          justify-content: center;
          box-shadow: 0 20px 60px rgba(0, 0, 0, 0.4);
        }

        .about-card-text {
          font-family: 'Cinzel', serif;
          font-size: 2.5rem;
          color: #e0e0e0;
          letter-spacing: 3px;
        }

        @media (max-width: 900px) {
          .about-content {
            flex-direction: column;
          }
          .about-left {
            order: 2;
          }
          .about-right {
            order: 1;
          }
          .about-title {
            font-size: 1.8rem;
          }
          .about-wrapper {
            padding: 2rem;
          }
        }

        @media (max-width: 600px) {
          .about-card {
            width: 200px;
            height: 140px;
          }
          .about-card-text {
            font-size: 1.8rem;
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
