/**
 * Our Team Section - Enhanced Card Theme
 * Golden, Brown, Black theme with larger, more impactful cards
 */
(function () {
  'use strict';

  function initTeam() {
    const sectionWrappers = document.querySelectorAll('.StorySectionWrapper_wrapper__o7CDl');
    const teamSection = sectionWrappers[5]; // 6th section (0-indexed)

    if (!teamSection) {
      setTimeout(initTeam, 100);
      return;
    }

    if (teamSection.querySelector('.team-fullpage')) return;

    const contentContainer = teamSection.querySelector('.StorySectionWrapper_ContentContainer__HvMko');
    if (!contentContainer) {
      setTimeout(initTeam, 100);
      return;
    }

    Array.from(contentContainer.children).forEach(c => c.style.display = 'none');

    const customWrapper = document.createElement('div');
    customWrapper.className = 'team-fullpage';
    customWrapper.innerHTML = `
      <div class="team-inner">
        <!-- Header -->
        <div class="team-header">
          <div class="header-deco">
            <span class="deco-line-l"></span>
            <span class="deco-gem">◆</span>
            <span class="deco-line-r"></span>
          </div>
          <h2 class="team-main-title">Our Team</h2>
          <p class="team-subtitle">The Wizards Behind the Magic</p>
        </div>

        <!-- Cards Grid -->
        <div class="team-cards-grid">
          
          <!-- Card 1 - President -->
          <div class="team-member-card">
            <div class="card-shine"></div>
            <div class="card-border-glow"></div>
            <div class="card-content">
              <div class="member-avatar">
                <div class="avatar-frame">
                  <div class="avatar-inner">
                    <span class="avatar-emoji">🧙</span>
                  </div>
                </div>
                <div class="avatar-glow"></div>
              </div>
              <h3 class="member-name">Sunidhi Haware</h3>
              <span class="member-role">PRESIDENT</span>
              <span class="member-dept">Student Representative Council</span>
              <div class="member-badge">
                <span class="badge-dot"></span>
                <span class="badge-dot"></span>
                <span class="badge-dot"></span>
              </div>
            </div>
          </div>

          <!-- Card 2 - Vice President -->
          <div class="team-member-card">
            <div class="card-shine"></div>
            <div class="card-border-glow"></div>
            <div class="card-content">
              <div class="member-avatar">
                <div class="avatar-frame">
                  <div class="avatar-inner avatar-initials">
                    <span>PR</span>
                  </div>
                </div>
                <div class="avatar-glow"></div>
              </div>
              <h3 class="member-name">Prathmesh Rajpurkar</h3>
              <span class="member-role">VICE PRESIDENT</span>
              <span class="member-dept">Student Representative Council</span>
              <div class="member-badge">
                <span class="badge-dot"></span>
                <span class="badge-dot"></span>
                <span class="badge-dot"></span>
              </div>
            </div>
          </div>

          <!-- Card 3 - Lead -->
          <div class="team-member-card">
            <div class="card-shine"></div>
            <div class="card-border-glow"></div>
            <div class="card-content">
              <div class="member-avatar">
                <div class="avatar-frame">
                  <div class="avatar-inner">
                    <span class="avatar-emoji">⚡</span>
                  </div>
                </div>
                <div class="avatar-glow"></div>
              </div>
              <h3 class="member-name">Parth Choudhary</h3>
              <span class="member-role">LEAD</span>
              <span class="member-dept">Event Management</span>
              <div class="member-badge">
                <span class="badge-dot"></span>
                <span class="badge-dot"></span>
                <span class="badge-dot"></span>
              </div>
            </div>
          </div>

          <!-- Card 4 - Web Dev -->
          <div class="team-member-card">
            <div class="card-shine"></div>
            <div class="card-border-glow"></div>
            <div class="card-content">
              <div class="member-avatar">
                <div class="avatar-frame">
                  <div class="avatar-inner">
                    <span class="avatar-emoji">🏰</span>
                  </div>
                </div>
                <div class="avatar-glow"></div>
              </div>
              <h3 class="member-name">Jash Chauhan</h3>
              <span class="member-role">WEB DEVELOPMENT</span>
              <span class="member-dept">Technical Team</span>
              <div class="member-badge">
                <span class="badge-dot"></span>
                <span class="badge-dot"></span>
                <span class="badge-dot"></span>
              </div>
            </div>
          </div>

        </div>
      </div>
    `;

    contentContainer.appendChild(customWrapper);

    // Styles
    if (!document.getElementById('team-enhanced-styles')) {
      const styles = document.createElement('style');
      styles.id = 'team-enhanced-styles';
      styles.textContent = `
        @import url('https://fonts.googleapis.com/css2?family=Cinzel:wght@400;700;900&display=swap');

        .team-fullpage {
          position: absolute;
          top: 0; left: 0; right: 0; bottom: 0;
          width: 100%;
          height: 100%;
          background: linear-gradient(160deg, #0a0805 0%, #1a1510 50%, #0d0a08 100%);
          display: flex;
          align-items: center;
          justify-content: center;
          z-index: 10;
          overflow: hidden;
        }

        .team-inner {
          width: 100%;
          max-width: 1300px;
          padding: 2rem;
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 2.5rem;
        }

        /* Header */
        .team-header {
          text-align: center;
        }

        .header-deco {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 1rem;
          margin-bottom: 0.75rem;
        }
        .deco-line-l, .deco-line-r { height: 2px; width: 5rem; }
        .deco-line-l { background: linear-gradient(90deg, transparent, #d4af37); }
        .deco-line-r { background: linear-gradient(-90deg, transparent, #d4af37); }
        .deco-gem {
          color: #d4af37;
          font-size: 1rem;
          text-shadow: 0 0 10px rgba(212, 175, 55, 0.5);
        }

        .team-main-title {
          font-family: 'Cinzel', serif;
          font-size: clamp(2.5rem, 5vw, 4rem);
          font-weight: 700;
          color: #d4af37;
          text-shadow: 0 4px 20px rgba(212, 175, 55, 0.3);
          margin: 0;
          letter-spacing: 0.1em;
        }

        .team-subtitle {
          font-family: 'Cinzel', serif;
          font-size: 1rem;
          color: #8b7355;
          margin: 0.5rem 0 0;
          letter-spacing: 0.2em;
          text-transform: uppercase;
        }

        /* Cards Grid */
        .team-cards-grid {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 2rem;
          width: 100%;
        }

        /* Individual Card */
        .team-member-card {
          position: relative;
          background: linear-gradient(145deg, #1a1512 0%, #0d0a08 100%);
          border: 2px solid rgba(139, 115, 85, 0.4);
          border-radius: 20px;
          padding: 2.5rem 1.5rem;
          display: flex;
          flex-direction: column;
          align-items: center;
          text-align: center;
          transition: all 0.5s cubic-bezier(0.4, 0, 0.2, 1);
          overflow: hidden;
        }

        .team-member-card::before {
          content: '';
          position: absolute;
          top: 0; left: 0; right: 0;
          height: 4px;
          background: linear-gradient(90deg, transparent, #d4af37, transparent);
          opacity: 0;
          transition: opacity 0.5s;
        }

        .team-member-card:hover {
          transform: translateY(-12px) scale(1.02);
          border-color: #d4af37;
          box-shadow: 
            0 30px 60px rgba(0, 0, 0, 0.5),
            0 0 40px rgba(212, 175, 55, 0.15),
            inset 0 1px 0 rgba(212, 175, 55, 0.2);
        }
        .team-member-card:hover::before {
          opacity: 1;
        }

        /* Card Shine Effect */
        .card-shine {
          position: absolute;
          top: -100%;
          left: -100%;
          width: 50%;
          height: 200%;
          background: linear-gradient(90deg, transparent, rgba(212, 175, 55, 0.1), transparent);
          transform: rotate(25deg);
          transition: left 0.8s ease;
          pointer-events: none;
        }
        .team-member-card:hover .card-shine {
          left: 150%;
        }

        /* Border Glow */
        .card-border-glow {
          position: absolute;
          inset: -2px;
          border-radius: 22px;
          background: linear-gradient(135deg, #d4af37, #8b5a2b, #d4af37);
          opacity: 0;
          filter: blur(8px);
          transition: opacity 0.5s;
          z-index: -1;
        }
        .team-member-card:hover .card-border-glow {
          opacity: 0.3;
        }

        .card-content {
          position: relative;
          z-index: 1;
          display: flex;
          flex-direction: column;
          align-items: center;
        }

        /* Avatar */
        .member-avatar {
          position: relative;
          margin-bottom: 1.5rem;
        }

        .avatar-frame {
          width: 120px;
          height: 120px;
          border-radius: 50%;
          padding: 4px;
          background: linear-gradient(135deg, #d4af37 0%, #8b5a2b 50%, #d4af37 100%);
          position: relative;
          z-index: 2;
        }

        .avatar-inner {
          width: 100%;
          height: 100%;
          border-radius: 50%;
          background: linear-gradient(145deg, #2a2520, #1a1512);
          display: flex;
          align-items: center;
          justify-content: center;
          border: 2px solid #3a3028;
        }

        .avatar-emoji {
          font-size: 3rem;
          filter: drop-shadow(0 0 15px rgba(212, 175, 55, 0.5));
        }

        .avatar-initials {
          font-family: 'Cinzel', serif;
          font-size: 2.2rem;
          font-weight: 700;
          color: #d4af37;
          text-shadow: 0 0 20px rgba(212, 175, 55, 0.5);
        }

        .avatar-glow {
          position: absolute;
          inset: -10px;
          border-radius: 50%;
          background: radial-gradient(circle, rgba(212, 175, 55, 0.2) 0%, transparent 70%);
          z-index: 1;
          opacity: 0;
          transition: opacity 0.5s;
        }
        .team-member-card:hover .avatar-glow {
          opacity: 1;
        }

        /* Text */
        .member-name {
          font-family: 'Cinzel', serif;
          font-size: 1.3rem;
          font-weight: 700;
          color: #f5f0e8;
          margin: 0 0 0.5rem;
          letter-spacing: 0.05em;
        }

        .member-role {
          font-family: 'Cinzel', serif;
          font-size: 0.85rem;
          color: #d4af37;
          letter-spacing: 0.15em;
          text-transform: uppercase;
          font-weight: 700;
          margin-bottom: 0.3rem;
        }

        .member-dept {
          font-size: 0.8rem;
          color: #8b7355;
          margin-bottom: 1.2rem;
        }

        /* Badge Dots */
        .member-badge {
          display: flex;
          gap: 0.5rem;
        }

        .badge-dot {
          width: 8px;
          height: 8px;
          border-radius: 50%;
          background: linear-gradient(135deg, #d4af37, #8b5a2b);
          box-shadow: 0 0 8px rgba(212, 175, 55, 0.5);
        }

        /* Responsive */
        @media (max-width: 1100px) {
          .team-cards-grid {
            grid-template-columns: repeat(2, 1fr);
          }
        }

        @media (max-width: 600px) {
          .team-cards-grid {
            grid-template-columns: 1fr;
            gap: 1.5rem;
          }
          .team-inner {
            padding: 1rem;
            gap: 1.5rem;
          }
          .team-member-card {
            padding: 2rem 1rem;
          }
          .avatar-frame {
            width: 100px;
            height: 100px;
          }
          .avatar-emoji {
            font-size: 2.5rem;
          }
        }
      `;
      document.head.appendChild(styles);
    }

    console.log('Our Team (Enhanced) initialized!');
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => setTimeout(initTeam, 1100));
  } else {
    setTimeout(initTeam, 1100);
  }
})();
