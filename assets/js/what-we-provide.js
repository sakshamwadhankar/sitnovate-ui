/**
 * What We Provide Section - Full Page Custom Implementation
 * Fits exactly in one scroll section (100vh)
 */
(function () {
    // Icons (Lucide simplified paths)
    const ICONS = {
        castle: `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M22 20v-9H2v9a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2Z"/><path d="M18 11V4H6v7"/><path d="M15 22v-4a3 3 0 0 0-6 0v4"/><path d="M22 11V4a2 2 0 0 0-2-2H4a2 2 0 0 0-2 2v7"/></svg>`,
        gem: `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M6 3h12l4 6-10 13L2 9Z"/><path d="M11 3 8 9l4 13 4-13-3-6"/><path d="M2 9h20"/></svg>`,
        wifi: `<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 20h.01"/><path d="M2 8.82a15 15 0 0 1 20 0"/><path d="M5 12.859a10 10 0 0 1 14 0"/><path d="M8.5 16.429a5 5 0 0 1 7 0"/></svg>`,
        utensils: `<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M3 2v7c0 1.1.9 2 2 2h4a2 2 0 0 0 2-2V2"/><path d="M7 2v20"/><path d="M21 15V2a5 5 0 0 0-5 5v6c0 1.1.9 2 2 2h3Zm0 0v7"/></svg>`,
        zap: `<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M4 14a1 1 0 0 1-.78-1.63l9.9-10.2a.5.5 0 0 1 .86.46l-1.92 6.02A1 1 0 0 0 13 10h7a1 1 0 0 1 .78 1.63l-9.9 10.2a.5.5 0 0 1-.86-.46l1.92-6.02A1 1 0 0 0 11 14z"/></svg>`,
        coins: `<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="8" cy="8" r="6"/><path d="M18.09 10.37A6 6 0 1 1 10.34 18"/><path d="M7 6h1v4"/><path d="m16.71 13.88.7.71-2.82 2.82"/></svg>`,
        shirt: `<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M20.38 3.46 16 2a4 4 0 0 1-8 0L3.62 3.46a2 2 0 0 0-1.34 2.23l.58 3.47a1 1 0 0 0 .99.84H6v10c0 1.1.9 2 2 2h8a2 2 0 0 0 2-2V10h2.15a1 1 0 0 0 .99-.84l.58-3.47a2 2 0 0 0-1.34-2.23z"/></svg>`,
        users: `<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M22 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>`,
        scroll: `<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M8 21h12a2 2 0 0 0 2-2v-2H10v2a2 2 0 1 1-4 0V5a2 2 0 1 0-4 0v3h4"/><path d="M19 17V5a2 2 0 0 0-2-2H4"/></svg>`
    };

    function initWhatWeProvide() {
        const wrapper = document.querySelectorAll('.StorySectionWrapper_wrapper__o7CDl')[2];
        if (!wrapper) {
            setTimeout(initWhatWeProvide, 100);
            return;
        }

        const contentContainer = wrapper.querySelector('.StorySectionWrapper_ContentContainer__HvMko');
        if (!contentContainer) {
            setTimeout(initWhatWeProvide, 100);
            return;
        }

        if (contentContainer.querySelector('.wwp-fullpage')) return;

        Array.from(contentContainer.children).forEach(child => child.style.display = 'none');

        const container = document.createElement('div');
        container.className = 'wwp-fullpage';

        container.innerHTML = `
            <div class="wwp-inner">
                <!-- Title Section -->
                <div class="wwp-header">
                    <div class="ministry-line">
                        <span class="line-left"></span>
                        <span class="ministry-text">MINISTRY APPROVED</span>
                        <span class="line-right"></span>
                    </div>
                    <h2 class="wwp-title">What We Provide</h2>
                    <div class="gold-bar"></div>
                </div>

                <!-- Cards Grid -->
                <div class="wwp-cards">
                    <!-- ADVANCED FACILITIES Card -->
                    <div class="magic-card">
                        <div class="card-glow"></div>
                        <div class="card-body">
                            <div class="gem-top"><div class="gem-diamond"><div class="gem-dot"></div></div></div>
                            <div class="corner-bl"></div>
                            <div class="corner-br"></div>
                            
                            <div class="card-inner">
                                <div class="bg-watermark">${ICONS.castle}</div>
                                
                                <div class="card-head">
                                    <div class="icon-diamond">
                                        <div class="icon-glow"></div>
                                        <div class="icon-box"><span class="icon-rotate">${ICONS.castle}</span></div>
                                    </div>
                                    <h3 class="card-name">Advanced Facilities</h3>
                                </div>

                                <ul class="feature-list">
                                    <li class="feature-item">
                                        <span class="feat-icon">${ICONS.wifi}</span>
                                        <div><strong>Air-conditioned high-density innovation zones</strong><em>for optimized cognitive performance.</em></div>
                                    </li>
                                    <li class="feature-item">
                                        <span class="feat-icon">${ICONS.zap}</span>
                                        <div><strong>Industrial-grade 24-hour power redundancy systems</strong><em>ensuring zero downtime.</em></div>
                                    </li>
                                    <li class="feature-item">
                                        <span class="feat-icon">${ICONS.wifi}</span>
                                        <div><strong>High-bandwidth fiber optic backbone</strong><em>with dedicated gigabit-tier connectivity.</em></div>
                                    </li>
                                    <li class="feature-item">
                                        <span class="feat-icon">${ICONS.users}</span>
                                        <div><strong>Access to specialized engineering and rapid prototyping laboratories.</strong></div>
                                    </li>
                                    <li class="feature-item">
                                        <span class="feat-icon">${ICONS.scroll}</span>
                                        <div><strong>Ergonomic rest and recuperation facilities</strong><em>within the 75-acre campus.</em></div>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>

                    <!-- EXCLUSIVE TREASURES Card -->
                    <div class="magic-card">
                        <div class="card-glow"></div>
                        <div class="card-body">
                            <div class="gem-top"><div class="gem-diamond"><div class="gem-dot"></div></div></div>
                            <div class="corner-bl"></div>
                            <div class="corner-br"></div>
                            
                            <div class="card-inner">
                                <div class="bg-watermark">${ICONS.gem}</div>
                                
                                <div class="card-head">
                                    <div class="icon-diamond">
                                        <div class="icon-glow"></div>
                                        <div class="icon-box"><span class="icon-rotate">${ICONS.gem}</span></div>
                                    </div>
                                    <h3 class="card-name">Exclusive Treasures</h3>
                                </div>

                                <ul class="feature-list">
                                    <li class="feature-item">
                                        <span class="feat-icon">${ICONS.coins}</span>
                                        <div><strong>Substantial national-level financial prize pool</strong><em>for top-tier technical solutions.</em></div>
                                    </li>
                                    <li class="feature-item">
                                        <span class="feat-icon">${ICONS.shirt}</span>
                                        <div><strong>Specialized developer hardware kits</strong><em>and industry-grade peripheral swags.</em></div>
                                    </li>
                                    <li class="feature-item">
                                        <span class="feat-icon">${ICONS.scroll}</span>
                                        <div><strong>Formal institutional certification</strong><em>from the SIT Nagpur Innovation Council.</em></div>
                                    </li>
                                    <li class="feature-item">
                                        <span class="feat-icon">${ICONS.users}</span>
                                        <div><strong>Opportunities for industry-partnered internships</strong><em>and collaborative projects.</em></div>
                                    </li>
                                    <li class="feature-item">
                                        <span class="feat-icon">${ICONS.scroll}</span>
                                        <div><strong>Exclusive access to advanced technical repositories</strong><em>and software licenses.</em></div>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>

                    <!-- LONGITUDINAL BENEFITS Card -->
                    <div class="magic-card">
                        <div class="card-glow"></div>
                        <div class="card-body">
                            <div class="gem-top"><div class="gem-diamond"><div class="gem-dot"></div></div></div>
                            <div class="corner-bl"></div>
                            <div class="corner-br"></div>
                            
                            <div class="card-inner">
                                <div class="bg-watermark">${ICONS.users}</div>
                                
                                <div class="card-head">
                                    <div class="icon-diamond">
                                        <div class="icon-glow"></div>
                                        <div class="icon-box"><span class="icon-rotate">${ICONS.users}</span></div>
                                    </div>
                                    <h3 class="card-name">Longitudinal Benefits</h3>
                                </div>

                                <ul class="feature-list">
                                    <li class="feature-item">
                                        <span class="feat-icon">${ICONS.users}</span>
                                        <div><strong>Deep-tier networking opportunities</strong><em>with industry leaders and venture capitalists.</em></div>
                                    </li>
                                    <li class="feature-item">
                                        <span class="feat-icon">${ICONS.scroll}</span>
                                        <div><strong>Exposure to real-world heuristic problem-solving</strong><em>in high-stakes environments.</em></div>
                                    </li>
                                    <li class="feature-item">
                                        <span class="feat-icon">${ICONS.gem}</span>
                                        <div><strong>Strategic enhancement of professional credentials</strong><em>and academic portfolios.</em></div>
                                    </li>
                                    <li class="feature-item">
                                        <span class="feat-icon">${ICONS.users}</span>
                                        <div><strong>Collaborative peer-to-peer knowledge exchange</strong><em>within an elite student cohort.</em></div>
                                    </li>
                                    <li class="feature-item">
                                        <span class="feat-icon">${ICONS.zap}</span>
                                        <div><strong>Accelerated career trajectory</strong><em>through exposure to the global technology sector.</em></div>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        `;

        const style = document.createElement('style');
        style.id = 'wwp-fullpage-styles';
        style.textContent = `
            @import url('https://fonts.googleapis.com/css2?family=Cinzel:wght@400;700;900&family=Crimson+Text:ital,wght@0,400;0,600;1,400&display=swap');

            .wwp-fullpage {
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

            .wwp-inner {
                width: 100%;
                max-width: 1280px;
                padding: 2rem 1.5rem;
                display: flex;
                flex-direction: column;
                align-items: center;
                gap: 2rem;
            }

            /* Header */
            .wwp-header { text-align: center; }

            .ministry-line {
                display: flex;
                align-items: center;
                justify-content: center;
                gap: 1rem;
                opacity: 0.7;
                margin-bottom: 0.5rem;
            }
            .line-left, .line-right { height: 1px; width: 4rem; }
            .line-left { background: linear-gradient(90deg, transparent, #d4af37); }
            .line-right { background: linear-gradient(-90deg, transparent, #d4af37); }
            .ministry-text {
                color: #d4af37;
                font-size: 0.7rem;
                font-family: 'Cinzel', serif;
                letter-spacing: 0.3em;
                font-weight: 700;
            }

            .wwp-title {
                font-size: clamp(2rem, 5vw, 3.5rem);
                font-family: 'Cinzel', serif;
                font-weight: 700;
                color: white;
                text-shadow: 0 2px 10px rgba(212, 175, 55, 0.3);
                margin: 0;
            }

            .gold-bar {
                width: 6rem;
                height: 4px;
                background: #d4af37;
                border-radius: 999px;
                margin: 1rem auto 0;
                opacity: 0.8;
            }

            /* Cards Grid */
            .wwp-cards {
                display: grid;
                grid-template-columns: 1fr;
                gap: 2rem;
                width: 100%;
                max-width: 1400px;
            }
            @media(min-width: 768px) {
                .wwp-cards { grid-template-columns: 1fr 1fr 1fr; gap: 2rem; }
            }

            /* Single Card */
            .magic-card {
                position: relative;
                padding-top: 1rem;
            }

            .card-glow {
                position: absolute;
                inset: -2px;
                border-radius: 4rem 4rem 1.5rem 1.5rem;
                background: linear-gradient(to bottom, #d4af37, transparent);
                opacity: 0;
                filter: blur(15px);
                transition: opacity 0.6s ease;
                pointer-events: none;
            }
            .magic-card:hover .card-glow { opacity: 0.25; }

            .card-body {
                position: relative;
                background: #111;
                border: 1px solid rgba(212, 175, 55, 0.3);
                border-radius: 4rem 4rem 1.5rem 1.5rem;
                transition: transform 0.4s ease;
                box-shadow: 0 20px 40px rgba(0,0,0,0.4);
            }
            .magic-card:hover .card-body { transform: translateY(-6px); }

            /* Gem Top */
            .gem-top {
                position: absolute;
                top: -0.6rem;
                left: 50%;
                transform: translateX(-50%);
                z-index: 20;
            }
            .gem-diamond {
                width: 1.25rem;
                height: 1.25rem;
                transform: rotate(45deg);
                background: #0a0a0a;
                border: 1px solid #d4af37;
                display: flex;
                align-items: center;
                justify-content: center;
                box-shadow: 0 0 8px #d4af37;
            }
            .gem-dot {
                width: 0.4rem;
                height: 0.4rem;
                background: #d4af37;
                border-radius: 50%;
                animation: pulse 2s infinite;
            }

            /* Corners */
            .corner-bl, .corner-br {
                position: absolute;
                bottom: 0;
                width: 1.5rem;
                height: 1.5rem;
                border-bottom: 1px solid rgba(212, 175, 55, 0.5);
            }
            .corner-bl { left: 0; border-left: 1px solid rgba(212, 175, 55, 0.5); border-bottom-left-radius: 1.5rem; }
            .corner-br { right: 0; border-right: 1px solid rgba(212, 175, 55, 0.5); border-bottom-right-radius: 1.5rem; }

            /* Inner Content */
            .card-inner {
                background: rgba(10, 10, 10, 0.85);
                backdrop-filter: blur(20px);
                padding: 1.5rem 1.5rem 2rem;
                border-radius: 3.8rem 3.8rem 1.3rem 1.3rem;
                position: relative;
                overflow: hidden;
            }

            .bg-watermark {
                position: absolute;
                right: -1.5rem;
                bottom: -1.5rem;
                opacity: 0.03;
                transform: rotate(12deg);
                pointer-events: none;
                transition: opacity 0.5s;
            }
            .bg-watermark svg { width: 140px; height: 140px; color: white; }
            .magic-card:hover .bg-watermark { opacity: 0.06; }

            /* Card Header */
            .card-head {
                display: flex;
                flex-direction: column;
                align-items: center;
                gap: 0.75rem;
                padding-bottom: 1rem;
                margin-bottom: 1rem;
                border-bottom: 1px solid rgba(212, 175, 55, 0.2);
            }

            .icon-diamond {
                position: relative;
                transition: transform 0.4s;
            }
            .magic-card:hover .icon-diamond { transform: scale(1.1); }
            
            .icon-glow {
                position: absolute;
                inset: 0;
                background: #d4af37;
                filter: blur(12px);
                opacity: 0.2;
            }
            .icon-box {
                position: relative;
                padding: 0.6rem;
                border: 1px solid #d4af37;
                transform: rotate(45deg);
                background: #0a0a0a;
                color: #d4af37;
            }
            .icon-rotate {
                display: block;
                transform: rotate(-45deg);
            }
            .icon-rotate svg { width: 22px; height: 22px; }

            .card-name {
                font-size: 1.5rem;
                font-family: 'Cinzel', serif;
                font-weight: 700;
                color: white;
                letter-spacing: 0.1em;
                text-transform: uppercase;
                margin: 0;
                transition: color 0.3s;
            }
            .magic-card:hover .card-name { color: #d4af37; }

            /* Feature List */
            .feature-list {
                list-style: none;
                padding: 0;
                margin: 0;
                display: flex;
                flex-direction: column;
                gap: 1rem;
            }

            .feature-item {
                display: flex;
                align-items: flex-start;
                gap: 0.75rem;
            }

            .feat-icon {
                margin-top: 0.15rem;
                color: #6b7280;
                transition: color 0.3s, transform 0.3s;
            }
            .feature-item:hover .feat-icon {
                color: #d4af37;
                transform: scale(1.15) rotate(10deg);
            }

            .feature-item strong {
                display: block;
                font-size: 1rem;
                font-family: 'Cinzel', serif;
                font-weight: 700;
                color: #e5e7eb;
                transition: color 0.3s;
            }
            .feature-item:hover strong { color: white; }

            .feature-item em {
                display: block;
                font-size: 0.9rem;
                font-family: 'Crimson Text', serif;
                font-style: italic;
                color: #6b7280;
                line-height: 1.3;
                transition: color 0.3s;
            }
            .feature-item:hover em { color: #9ca3af; }

            @keyframes pulse {
                0%, 100% { opacity: 1; }
                50% { opacity: 0.5; }
            }

            /* Responsive */
            @media(max-width: 767px) {
                .wwp-inner { padding: 1rem; gap: 1.5rem; }
                .card-inner { padding: 1.25rem 1rem 1.5rem; }
                .feature-list { gap: 0.75rem; }
            }
        `;

        if (!document.getElementById('wwp-fullpage-styles')) {
            document.head.appendChild(style);
        }

        contentContainer.appendChild(container);
        console.log('What We Provide (Full Page) initialized.');
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', () => setTimeout(initWhatWeProvide, 100));
    } else {
        setTimeout(initWhatWeProvide, 100);
    }
})();
