/**
 * Our Team Section - Custom Layout Override
 * 6th scroll section with team member cards in Harry Potter theme
 */

(function () {
  'use strict';

  function initTeam() {
    // Find the 6th section wrapper
    const sectionWrappers = document.querySelectorAll('.StorySectionWrapper_wrapper__o7CDl');
    const teamSection = sectionWrappers[5]; // 6th section (0-indexed)

    if (!teamSection) {
      setTimeout(initTeam, 100);
      return;
    }

    // Check if already customized
    if (teamSection.querySelector('.team-wrapper')) {
      return;
    }

    // Find content container
    const contentContainer = teamSection.querySelector('.StorySectionWrapper_ContentContainer__HvMko');
    if (!contentContainer) {
      setTimeout(initTeam, 100);
      return;
    }

    // HIDE existing children
    const existingChildren = contentContainer.children;
    for (let i = 0; i < existingChildren.length; i++) {
      existingChildren[i].style.display = 'none';
    }

    // CREATE and APPEND custom content
    const customWrapper = document.createElement('div');
    customWrapper.className = 'team-wrapper';
    customWrapper.innerHTML = `
      <h2 class="team-title">Our Team</h2>
      
      <div class="team-grid">
        <!-- Card 1 - President -->
        <div class="team-card">
          <div class="team-avatar">
            <div class="avatar-placeholder">
              <span class="avatar-icon">🧙</span>
            </div>
            <div class="avatar-ring"></div>
          </div>
          <h3 class="team-name">Sunidhi Haware</h3>
          <span class="team-role">PRESIDENT</span>
          <span class="team-dept">Student Representative Council</span>
          <div class="team-dots">
            <span class="dot"></span>
            <span class="dot"></span>
            <span class="dot"></span>
          </div>
        </div>
        
        <!-- Card 2 - Vice President -->
        <div class="team-card">
          <div class="team-avatar">
            <div class="avatar-placeholder avatar-text">
              <span>PR</span>
            </div>
            <div class="avatar-ring"></div>
          </div>
          <h3 class="team-name">Prathmesh Rajpurkar</h3>
          <span class="team-role">VICE PRESIDENT</span>
          <span class="team-dept">Student Representative Council</span>
          <div class="team-dots">
            <span class="dot dot-cyan"></span>
            <span class="dot dot-cyan"></span>
            <span class="dot dot-cyan"></span>
          </div>
        </div>
        
        <!-- Card 3 - Lead -->
        <div class="team-card">
          <div class="team-avatar">
            <div class="avatar-placeholder">
              <span class="avatar-icon">⚡</span>
            </div>
            <div class="avatar-ring"></div>
          </div>
          <h3 class="team-name">Parth Choudhari</h3>
          <span class="team-role">LEAD</span>
          <span class="team-dept">Event Management</span>
          <div class="team-dots">
            <span class="dot dot-gold"></span>
            <span class="dot dot-gold"></span>
            <span class="dot dot-gold"></span>
          </div>
        </div>
        
        <!-- Card 4 - Web Dev Team -->
        <div class="team-card">
          <div class="team-avatar">
            <div class="avatar-placeholder">
              <span class="avatar-icon">🏰</span>
            </div>
            <div class="avatar-ring"></div>
          </div>
          <h3 class="team-name">Jash Chauhan</h3>
          <span class="team-role">WEB DEVELOPMENT TEAM</span>
          <span class="team-dept">Technical Team</span>
          <div class="team-dots">
            <span class="dot dot-crimson"></span>
            <span class="dot dot-crimson"></span>
            <span class="dot dot-crimson"></span>
          </div>
        </div>
      </div>
    `;

    contentContainer.appendChild(customWrapper);

    // Add styles
    if (!document.getElementById('team-styles')) {
      const styles = document.createElement('style');
      styles.id = 'team-styles';
      styles.textContent = `
        .team-wrapper {
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
          background: linear-gradient(180deg, rgba(10, 15, 30, 0.98) 0%, rgba(15, 20, 40, 0.98) 100%);
        }

        .team-title {
          font-family: 'Cinzel', serif;
          font-size: 2.8rem;
          color: #f5f5f5;
          text-align: center;
          margin-bottom: 2.5rem;
          letter-spacing: 3px;
        }

        .team-grid {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 1.5rem;
          max-width: 1100px;
          width: 100%;
        }

        .team-card {
          background: linear-gradient(145deg, rgba(20, 25, 45, 0.95), rgba(30, 35, 55, 0.9));
          border: 2px solid rgba(60, 70, 100, 0.4);
          border-radius: 16px;
          padding: 2rem 1.5rem;
          display: flex;
          flex-direction: column;
          align-items: center;
          text-align: center;
          transition: all 0.4s ease;
        }

        .team-card:hover {
          transform: translateY(-8px);
          border-color: rgba(212, 175, 55, 0.6);
          box-shadow: 0 20px 50px rgba(212, 175, 55, 0.15);
        }

        .team-avatar {
          position: relative;
          width: 100px;
          height: 100px;
          margin-bottom: 1.2rem;
        }

        .avatar-placeholder {
          width: 100%;
          height: 100%;
          border-radius: 50%;
          background: linear-gradient(145deg, rgba(40, 45, 70, 0.9), rgba(50, 55, 80, 0.8));
          display: flex;
          align-items: center;
          justify-content: center;
          border: 3px solid rgba(212, 175, 55, 0.5);
        }

        .avatar-icon {
          font-size: 2.5rem;
          filter: drop-shadow(0 0 10px rgba(212, 175, 55, 0.4));
        }

        .avatar-text {
          font-family: 'Cinzel', serif;
          font-size: 1.8rem;
          color: #d4af37;
          font-weight: 600;
        }

        .avatar-text span {
          text-shadow: 0 0 20px rgba(212, 175, 55, 0.5);
        }

        .avatar-ring {
          position: absolute;
          top: -5px;
          left: -5px;
          right: -5px;
          bottom: -5px;
          border-radius: 50%;
          border: 2px solid transparent;
          background: linear-gradient(135deg, rgba(212, 175, 55, 0.3) 0%, transparent 50%, rgba(212, 175, 55, 0.3) 100%);
          -webkit-mask: linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0);
          mask-composite: exclude;
          padding: 2px;
        }

        .team-name {
          font-family: system-ui, -apple-system, sans-serif;
          font-size: 1rem;
          color: #e0e0e0;
          font-weight: 600;
          margin-bottom: 0.4rem;
        }

        .team-role {
          font-family: 'Cinzel', serif;
          font-size: 0.75rem;
          color: #d4af37;
          letter-spacing: 0.12em;
          text-transform: uppercase;
          margin-bottom: 0.3rem;
        }

        .team-dept {
          font-family: system-ui, -apple-system, sans-serif;
          font-size: 0.75rem;
          color: #888;
          margin-bottom: 1rem;
        }

        .team-dots {
          display: flex;
          gap: 0.4rem;
        }

        .dot {
          width: 6px;
          height: 6px;
          border-radius: 50%;
          background: #d4af37;
          opacity: 0.7;
        }

        .dot-cyan {
          background: #4da6ff;
        }

        .dot-gold {
          background: #d4af37;
        }

        .dot-crimson {
          background: #8b0000;
        }

        @media (max-width: 1000px) {
          .team-grid {
            grid-template-columns: repeat(2, 1fr);
          }
          .team-title {
            font-size: 2.2rem;
          }
        }

        @media (max-width: 600px) {
          .team-grid {
            grid-template-columns: 1fr;
          }
          .team-title {
            font-size: 1.8rem;
          }
          .team-avatar {
            width: 80px;
            height: 80px;
          }
        }
      `;
      document.head.appendChild(styles);
    }

    console.log('Our Team section customized successfully!');
  }

  // Wait for DOM + React
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => setTimeout(initTeam, 1100));
  } else {
    setTimeout(initTeam, 1100);
  }
})();
