/**
 * Get in Touch Section - Custom Layout Override
 * 7th scroll section with contact info in Harry Potter theme
 */

(function () {
    'use strict';

    function initContact() {
        // Find the 7th section wrapper
        const sectionWrappers = document.querySelectorAll('.StorySectionWrapper_wrapper__o7CDl');
        const contactSection = sectionWrappers[6]; // 7th section (0-indexed)

        if (!contactSection) {
            setTimeout(initContact, 100);
            return;
        }

        // Check if already customized
        if (contactSection.querySelector('.contact-wrapper')) {
            return;
        }

        // Find content container
        const contentContainer = contactSection.querySelector('.StorySectionWrapper_ContentContainer__HvMko');
        if (!contentContainer) {
            setTimeout(initContact, 100);
            return;
        }

        // HIDE existing children
        const existingChildren = contentContainer.children;
        for (let i = 0; i < existingChildren.length; i++) {
            existingChildren[i].style.display = 'none';
        }

        // CREATE and APPEND custom content
        const customWrapper = document.createElement('div');
        customWrapper.className = 'contact-wrapper';
        customWrapper.innerHTML = `
      <div class="contact-magical-border"></div>
      
      <h2 class="contact-title">
        <span class="contact-icon">📜</span>
        Get in Touch
      </h2>
      <p class="contact-subtitle">Send us an owl or reach out through these magical channels</p>
      
      <div class="contact-content">
        <!-- Left: Contact Info -->
        <div class="contact-info">
          <div class="contact-item">
            <div class="contact-item-icon">📍</div>
            <div class="contact-item-text">
              <h4>Location</h4>
              <p>Symbiosis Institute of Technology<br>Nagpur, Maharashtra</p>
            </div>
          </div>
          
          <div class="contact-item">
            <div class="contact-item-icon">📧</div>
            <div class="contact-item-text">
              <h4>Email</h4>
              <p>sitnovate@sitpune.edu.in</p>
            </div>
          </div>
          
          <div class="contact-item">
            <div class="contact-item-icon">📱</div>
            <div class="contact-item-text">
              <h4>Phone</h4>
              <p>+91 XXXXX XXXXX</p>
            </div>
          </div>
          
          <div class="contact-socials">
            <h4>Follow the Magic</h4>
            <div class="social-icons">
              <a href="#" class="social-link">
                <span>📸</span>
                <span class="social-label">Instagram</span>
              </a>
              <a href="#" class="social-link">
                <span>💼</span>
                <span class="social-label">LinkedIn</span>
              </a>
              <a href="#" class="social-link">
                <span>🐦</span>
                <span class="social-label">Twitter</span>
              </a>
              <a href="#" class="social-link">
                <span>📘</span>
                <span class="social-label">Discord</span>
              </a>
            </div>
          </div>
        </div>
        
        <!-- Right: Contact Form -->
        <div class="contact-form-container">
          <form class="contact-form">
            <div class="form-row">
              <div class="form-group">
                <label>Your Name</label>
                <input type="text" placeholder="Harry Potter" />
              </div>
              <div class="form-group">
                <label>Your Email</label>
                <input type="email" placeholder="harry@hogwarts.edu" />
              </div>
            </div>
            
            <div class="form-group">
              <label>Subject</label>
              <input type="text" placeholder="I solemnly swear..." />
            </div>
            
            <div class="form-group">
              <label>Your Message</label>
              <textarea rows="4" placeholder="Write your magical message here..."></textarea>
            </div>
            
            <button type="submit" class="submit-btn">
              <span class="btn-icon">✨</span>
              Send Owl
            </button>
          </form>
        </div>
      </div>
      
      <div class="contact-footer">
        <p>© 2025 SITNovate. All rights reserved. Made with ⚡ magic.</p>
      </div>
    `;

        contentContainer.appendChild(customWrapper);

        // Add styles
        if (!document.getElementById('contact-styles')) {
            const styles = document.createElement('style');
            styles.id = 'contact-styles';
            styles.textContent = `
        .contact-wrapper {
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
          background: linear-gradient(180deg, rgba(8, 12, 25, 0.98) 0%, rgba(15, 20, 40, 0.98) 100%);
        }

        .contact-magical-border {
          position: absolute;
          top: 20px;
          left: 20px;
          right: 20px;
          bottom: 20px;
          border: 1px solid rgba(212, 175, 55, 0.15);
          border-radius: 20px;
          pointer-events: none;
        }

        .contact-title {
          font-family: 'Cinzel', serif;
          font-size: 2.5rem;
          color: #f5f5f5;
          text-align: center;
          margin-bottom: 0.5rem;
          display: flex;
          align-items: center;
          gap: 1rem;
        }

        .contact-icon {
          font-size: 2rem;
          filter: drop-shadow(0 0 10px rgba(212, 175, 55, 0.5));
        }

        .contact-subtitle {
          font-family: Georgia, serif;
          font-size: 1rem;
          color: #888;
          font-style: italic;
          margin-bottom: 2rem;
          text-align: center;
        }

        .contact-content {
          display: flex;
          gap: 3rem;
          max-width: 1000px;
          width: 100%;
        }

        .contact-info {
          flex: 1;
          display: flex;
          flex-direction: column;
          gap: 1.2rem;
        }

        .contact-item {
          display: flex;
          gap: 1rem;
          align-items: flex-start;
        }

        .contact-item-icon {
          font-size: 1.5rem;
          width: 50px;
          height: 50px;
          display: flex;
          align-items: center;
          justify-content: center;
          background: linear-gradient(145deg, rgba(212, 175, 55, 0.15), rgba(212, 175, 55, 0.05));
          border: 1px solid rgba(212, 175, 55, 0.3);
          border-radius: 12px;
        }

        .contact-item-text h4 {
          font-family: 'Cinzel', serif;
          font-size: 0.85rem;
          color: #d4af37;
          margin-bottom: 0.2rem;
          letter-spacing: 1px;
        }

        .contact-item-text p {
          font-family: system-ui, -apple-system, sans-serif;
          font-size: 0.85rem;
          color: #aaa;
          line-height: 1.4;
        }

        .contact-socials {
          margin-top: 1rem;
        }

        .contact-socials h4 {
          font-family: 'Cinzel', serif;
          font-size: 0.9rem;
          color: #d4af37;
          margin-bottom: 0.8rem;
        }

        .social-icons {
          display: flex;
          gap: 0.8rem;
          flex-wrap: wrap;
        }

        .social-link {
          display: flex;
          align-items: center;
          gap: 0.4rem;
          padding: 0.5rem 1rem;
          background: rgba(30, 35, 55, 0.8);
          border: 1px solid rgba(80, 90, 120, 0.4);
          border-radius: 20px;
          text-decoration: none;
          transition: all 0.3s ease;
        }

        .social-link:hover {
          border-color: rgba(212, 175, 55, 0.6);
          background: rgba(212, 175, 55, 0.1);
        }

        .social-label {
          font-size: 0.75rem;
          color: #ccc;
        }

        .contact-form-container {
          flex: 1;
        }

        .contact-form {
          background: linear-gradient(145deg, rgba(20, 25, 45, 0.9), rgba(30, 35, 55, 0.85));
          border: 2px solid rgba(60, 70, 100, 0.4);
          border-radius: 16px;
          padding: 1.5rem;
        }

        .form-row {
          display: flex;
          gap: 1rem;
          margin-bottom: 1rem;
        }

        .form-group {
          flex: 1;
          margin-bottom: 1rem;
        }

        .form-group label {
          display: block;
          font-family: 'Cinzel', serif;
          font-size: 0.75rem;
          color: #d4af37;
          margin-bottom: 0.4rem;
          letter-spacing: 1px;
        }

        .form-group input,
        .form-group textarea {
          width: 100%;
          padding: 0.8rem 1rem;
          background: rgba(15, 20, 40, 0.8);
          border: 1px solid rgba(80, 90, 120, 0.4);
          border-radius: 8px;
          color: #e0e0e0;
          font-family: system-ui, -apple-system, sans-serif;
          font-size: 0.9rem;
          transition: all 0.3s ease;
        }

        .form-group input:focus,
        .form-group textarea:focus {
          outline: none;
          border-color: rgba(212, 175, 55, 0.6);
          box-shadow: 0 0 15px rgba(212, 175, 55, 0.1);
        }

        .form-group input::placeholder,
        .form-group textarea::placeholder {
          color: #555;
        }

        .submit-btn {
          width: 100%;
          padding: 1rem;
          background: linear-gradient(145deg, rgba(212, 175, 55, 0.2), rgba(180, 140, 40, 0.15));
          border: 2px solid rgba(212, 175, 55, 0.5);
          border-radius: 30px;
          color: #d4af37;
          font-family: 'Cinzel', serif;
          font-size: 1rem;
          letter-spacing: 2px;
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 0.5rem;
          transition: all 0.3s ease;
        }

        .submit-btn:hover {
          background: rgba(212, 175, 55, 0.25);
          border-color: #d4af37;
          box-shadow: 0 0 25px rgba(212, 175, 55, 0.3);
        }

        .btn-icon {
          font-size: 1.2rem;
        }

        .contact-footer {
          margin-top: 2rem;
          text-align: center;
        }

        .contact-footer p {
          font-size: 0.8rem;
          color: #666;
        }

        @media (max-width: 800px) {
          .contact-content {
            flex-direction: column;
          }
          .contact-title {
            font-size: 2rem;
          }
          .form-row {
            flex-direction: column;
            gap: 0;
          }
        }
      `;
            document.head.appendChild(styles);
        }

        console.log('Get in Touch section customized successfully!');
    }

    // Wait for DOM + React
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', () => setTimeout(initContact, 1200));
    } else {
        setTimeout(initContact, 1200);
    }
})();
