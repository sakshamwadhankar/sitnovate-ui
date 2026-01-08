/**
 * Our Team Section - Infinite Horizontal Scrolling Carousel
 * Side-scrolling curved gallery with auto-loop
 */
(function () {
  'use strict';

  // Team members data - duplicated for infinite loop effect
  const teamMembers = [
    {
      name: "Sunidhi Haware",
      image: "/images/Team/SunidhiHaware.jpg",
      linkedin: "https://www.linkedin.com/in/sunidhi-haware-797a97323/"
    },
    {
      name: "Harsh Kumar",
      image: "/images/Team/HarshKumar.jpg",
      linkedin: "https://www.linkedin.com/in/harsh-2227-kumar/"
    },
    {
      name: "Parth Choudhari",
      image: "/images/Team/ParthChoudhari.jpeg",
      linkedin: "https://www.linkedin.com/in/parth-choudhari-2073a0294/"
    },
    {
      name: "Prathmesh Raipurkar",
      image: "/images/Team/PrathmeshRaipurkar.jpeg",
      linkedin: "https://www.linkedin.com/in/prathmesh-raipurkar-2073a0294/"
    }
  ];

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

    // Generate team cards HTML - duplicate for seamless loop
    const generateCard = (member, index) => `
      <div class="team-card" data-index="${index}">
        <div class="card-image-container">
          <img src="${member.image}" alt="${member.name}" class="card-image" draggable="false" />
        </div>
        <div class="card-info">
          <h3 class="card-name">${member.name}</h3>
          <a href="${member.linkedin}" target="_blank" rel="noopener noreferrer" class="card-connect-btn">
            <svg class="linkedin-icon" viewBox="0 0 24 24" fill="currentColor">
              <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
            </svg>
            <span>CONNECT</span>
          </a>
        </div>
      </div>
    `;

    // Create cards - triple them for smooth infinite scroll
    const allCards = [...teamMembers, ...teamMembers, ...teamMembers];
    const cardsHTML = allCards.map((member, index) => generateCard(member, index)).join('');

    customWrapper.innerHTML = `
      <div class="team-inner">
        <!-- Header -->
        <div class="team-header">
          <h2 class="team-title">OUR TEAM</h2>
          <div class="title-underline"></div>
        </div>

        <!-- Scrolling Container -->
        <div class="team-carousel-container">
          <div class="team-carousel-track">
            ${cardsHTML}
          </div>
        </div>
      </div>
    `;

    contentContainer.appendChild(customWrapper);

    // Add event listeners to all connect buttons to prevent carousel interference
    const connectButtons = customWrapper.querySelectorAll('.card-connect-btn');
    connectButtons.forEach(button => {
      button.addEventListener('click', (e) => {
        e.stopPropagation();
        // Link will work naturally since it's an <a> tag
      });
    });

    // Initialize infinite scroll
    const track = customWrapper.querySelector('.team-carousel-track');
    let scrollPosition = 0;
    const scrollSpeed = 0.5; // pixels per frame
    const cardWidth = 350; // card width + gap
    const totalCards = teamMembers.length;
    const resetPoint = cardWidth * totalCards;

    // Pause on hover
    let isPaused = false;
    track.addEventListener('mouseenter', () => {
      isPaused = true;
    });

    track.addEventListener('mouseleave', () => {
      isPaused = false;
    });

    // Modified animate function to respect pause
    function animateWithPause() {
      if (!isPaused) {
        scrollPosition += scrollSpeed;

        // Reset position for infinite loop
        if (scrollPosition >= resetPoint) {
          scrollPosition = 0;
        }

        track.style.transform = `translateX(-${scrollPosition}px)`;
      }
      requestAnimationFrame(animateWithPause);
    }

    // Start animation with pause support
    animateWithPause();

    // Styles
    if (!document.getElementById('team-styles')) {
      const styles = document.createElement('style');
      styles.id = 'team-styles';
      styles.textContent = `
        @import url('https://fonts.googleapis.com/css2?family=Cinzel:wght@400;500;600;700&display=swap');

        .team-fullpage {
          position: absolute;
          top: 0; left: 0; right: 0; bottom: 0;
          width: 100%;
          height: 100%;
          background: #000;
          display: flex;
          align-items: center;
          justify-content: center;
          z-index: 10;
          overflow: hidden;
        }

        .team-inner {
          width: 100%;
          max-width: 100%;
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 3rem;
          padding: 2rem 0;
        }

        /* Header */
        .team-header {
          text-align: center;
          z-index: 10;
        }

        .team-title {
          font-family: 'Cinzel', serif;
          font-size: clamp(2rem, 5vw, 3rem);
          font-weight: 600;
          color: #d4af37;
          letter-spacing: 0.3em;
          margin: 0;
          text-shadow: 0 0 20px rgba(212, 175, 55, 0.3);
        }

        .title-underline {
          width: 120px;
          height: 2px;
          background: #d4af37;
          margin: 1rem auto 0;
          opacity: 0.8;
        }

        /* Carousel Container */
        .team-carousel-container {
          width: 100%;
          overflow: hidden;
          position: relative;
          padding: 2rem 0;
        }

        /* Gradient Overlays */
        .team-carousel-container::before,
        .team-carousel-container::after {
          content: '';
          position: absolute;
          top: 0;
          bottom: 0;
          width: 200px;
          z-index: 2;
          pointer-events: none;
        }

        .team-carousel-container::before {
          left: 0;
          background: linear-gradient(to right, #000, transparent);
        }

        .team-carousel-container::after {
          right: 0;
          background: linear-gradient(to left, #000, transparent);
        }

        /* Carousel Track */
        .team-carousel-track {
          display: flex;
          gap: 2rem;
          will-change: transform;
        }

        /* Individual Card */
        .team-card {
          flex-shrink: 0;
          width: 330px;
          background: linear-gradient(145deg, #1a1a1a, #0f0f12);
          border: 1px solid rgba(212, 175, 55, 0.3);
          border-radius: 16px;
          overflow: hidden;
          transition: all 0.4s ease;
          box-shadow: 0 4px 20px rgba(0, 0, 0, 0.5);
          transform: perspective(1000px) rotateY(0deg);
        }

        .team-card:hover {
          transform: perspective(1000px) rotateY(5deg) translateY(-10px);
          border-color: rgba(212, 175, 55, 0.6);
          box-shadow: 0 12px 40px rgba(212, 175, 55, 0.3);
          z-index: 10;
        }

        /* Card Image */
        .card-image-container {
          width: 100%;
          height: 320px;
          overflow: hidden;
          position: relative;
          background: linear-gradient(135deg, #b88a44 0%, #8b6f47 100%);
        }

        .card-image {
          width: 100%;
          height: 100%;
          object-fit: cover;
          transition: all 0.5s ease;
        }

        .team-card:hover .card-image {
          transform: scale(1.08);
        }

        /* Card Info */
        .card-info {
          padding: 1.5rem;
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 1rem;
          background: linear-gradient(to bottom, #15151a, #0a0a0c);
          border-top: 1px solid rgba(212, 175, 55, 0.2);
        }

        .card-name {
          font-family: 'Cinzel', serif;
          font-size: 1.25rem;
          font-weight: 600;
          color: #d4af37;
          margin: 0;
          letter-spacing: 0.05em;
          text-align: center;
          text-shadow: 0 0 10px rgba(212, 175, 55, 0.3);
        }

        /* Connect Button */
        .card-connect-btn {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          padding: 0.6rem 1.5rem;
          background: rgba(212, 175, 55, 0.1);
          border: 1px solid rgba(212, 175, 55, 0.4);
          border-radius: 24px;
          color: #d4af37;
          font-family: 'Cinzel', serif;
          font-size: 0.75rem;
          font-weight: 700;
          letter-spacing: 0.15em;
          text-decoration: none;
          transition: all 0.3s ease;
          cursor: pointer;
        }

        .card-connect-btn:hover {
          background: #d4af37;
          color: #000;
          border-color: #d4af37;
          transform: translateY(-2px);
          box-shadow: 0 4px 12px rgba(212, 175, 55, 0.4);
        }

        .linkedin-icon {
          width: 14px;
          height: 14px;
          transition: transform 0.3s ease;
        }

        .card-connect-btn:hover .linkedin-icon {
          transform: scale(1.1);
        }

        /* Responsive */
        @media (max-width: 768px) {
          .team-card {
            width: 280px;
          }

          .card-image-container {
            height: 280px;
          }

          .team-carousel-container::before,
          .team-carousel-container::after {
            width: 100px;
          }
        }
      `;
      document.head.appendChild(styles);
    }

    console.log('Our Team infinite carousel initialized!');
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => setTimeout(initTeam, 1100));
  } else {
    setTimeout(initTeam, 1100);
  }
})();
