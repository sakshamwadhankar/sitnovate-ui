import React, { useState, useEffect, useRef, useMemo, useCallback, createElement } from 'react';

// --- TextType Component ---
const TextType = ({
    text,
    as: Component = 'div',
    typingSpeed = 50,
    initialDelay = 0,
    pauseDuration = 2000,
    deletingSpeed = 30,
    loop = true,
    className = '',
    showCursor = true,
    hideCursorWhileTyping = false,
    cursorCharacter = '|',
    cursorClassName = '',
    cursorBlinkDuration = 0.5,
    textColors = [],
    variableSpeed,
    onSentenceComplete,
    startOnVisible = false,
    reverseMode = false,
    ...props
}) => {
    const [displayedText, setDisplayedText] = useState('');
    const [currentCharIndex, setCurrentCharIndex] = useState(0);
    const [isDeleting, setIsDeleting] = useState(false);
    const [currentTextIndex, setCurrentTextIndex] = useState(0);
    const [isVisible, setIsVisible] = useState(!startOnVisible);

    const containerRef = useRef(null);
    const textArray = useMemo(() => (Array.isArray(text) ? text : [text]), [text]);

    useEffect(() => {
        if (!startOnVisible || !containerRef.current) return;
        const observer = new IntersectionObserver(
            ([entry]) => { if (entry.isIntersecting) setIsVisible(true); },
            { threshold: 0.1 }
        );
        observer.observe(containerRef.current);
        return () => observer.disconnect();
    }, [startOnVisible]);

    useEffect(() => {
        if (!isVisible) return;
        let timeout;
        const currentText = textArray[currentTextIndex];

        const type = () => {
            if (isDeleting) {
                if (displayedText === '') {
                    setIsDeleting(false);
                    setCurrentTextIndex((prev) => (prev + 1) % textArray.length);
                    setCurrentCharIndex(0);
                    timeout = setTimeout(type, pauseDuration);
                } else {
                    setDisplayedText((prev) => prev.slice(0, -1));
                    timeout = setTimeout(type, deletingSpeed);
                }
            } else {
                if (currentCharIndex < currentText.length) {
                    setDisplayedText((prev) => prev + currentText[currentCharIndex]);
                    setCurrentCharIndex((prev) => prev + 1);
                    timeout = setTimeout(type, typingSpeed);
                } else {
                    if (!loop) return;
                    timeout = setTimeout(() => setIsDeleting(true), pauseDuration);
                }
            }
        };
        timeout = setTimeout(type, typingSpeed);
        return () => clearTimeout(timeout);
    }, [currentCharIndex, isDeleting, isVisible, currentTextIndex, textArray, typingSpeed, deletingSpeed, pauseDuration, loop]);

    return createElement(
        Component,
        { ref: containerRef, className: `text-type ${className}`, ...props },
        displayedText,
        showCursor && <span className="animate-pulse">{cursorCharacter}</span>
    );
};

// --- Ornate Frame SVG Component ---
const OrnateFrame = () => (
    <svg className="absolute inset-0 w-full h-full pointer-events-none z-0" viewBox="0 0 1600 900" preserveAspectRatio="none">
        <defs>
            <linearGradient id="goldGradient2" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#d4af37" stopOpacity="0.3" />
                <stop offset="50%" stopColor="#f4e4b8" stopOpacity="0.8" />
                <stop offset="100%" stopColor="#b8860b" stopOpacity="0.3" />
            </linearGradient>
            <filter id="glow2">
                <feGaussianBlur stdDeviation="2" result="coloredBlur" />
                <feMerge>
                    <feMergeNode in="coloredBlur" />
                    <feMergeNode in="SourceGraphic" />
                </feMerge>
            </filter>
        </defs>

        {/* Main Frame Border */}
        <path
            d="M 50,50 L 1550,50 L 1550,850 L 50,850 Z"
            fill="none"
            stroke="url(#goldGradient2)"
            strokeWidth="2"
            filter="url(#glow2)"
            opacity="0.6"
        />

        {/* Elegant Corner Patterns */}
        <path d="M 50,150 L 50,50 L 150,50" stroke="#d4af37" strokeWidth="4" fill="none" />
        <path d="M 1550,150 L 1550,50 L 1450,50" stroke="#d4af37" strokeWidth="4" fill="none" />
        <path d="M 50,750 L 50,850 L 150,850" stroke="#d4af37" strokeWidth="4" fill="none" />
        <path d="M 1550,750 L 1550,850 L 1450,850" stroke="#d4af37" strokeWidth="4" fill="none" />

        {/* Decorative Elements */}
        <circle cx="50" cy="50" r="6" fill="#FFD700" />
        <circle cx="1550" cy="50" r="6" fill="#FFD700" />
        <circle cx="50" cy="850" r="6" fill="#FFD700" />
        <circle cx="1550" cy="850" r="6" fill="#FFD700" />
    </svg>
);

// --- Component Content ---
const FeatureColumn = ({ title, subtitle, items, delay }) => (
    <div
        className="flex-1 min-w-[300px] bg-black/40 backdrop-blur-md border border-[#d4af37]/20 p-6 rounded-lg hover:border-[#d4af37]/50 transition-all duration-500 hover:shadow-[0_0_30px_rgba(212,175,55,0.1)] group relative overflow-hidden"
        style={{ animation: `fadeInUp 0.8s ease-out ${delay}s backwards` }}
    >
        {/* Hover highlight */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#d4af37]/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />

        {/* Titles */}
        <div className="mb-6 border-b border-[#d4af37]/30 pb-4">
            <h4 className="text-[#d4af37] font-cinzel text-xs tracking-[0.2em] mb-1 opacity-80">{subtitle.toUpperCase()}</h4>
            <h3 className="text-xl md:text-2xl font-cinzel text-[#ffecb3] tracking-wide text-shadow-sm group-hover:text-white transition-colors">{title}</h3>
        </div>

        {/* List */}
        <ul className="space-y-4">
            {items.map((item, idx) => (
                <li key={idx} className="flex items-start gap-3 text-sm md:text-[15px] font-body text-[#c0c0c8] leading-relaxed group-hover:text-[#e0e0e0] transition-colors">
                    <span className="mt-1 text-[#d4af37] shrink-0 text-base">{item.icon}</span>
                    <span>{item.text}</span>
                </li>
            ))}
        </ul>
    </div>
);

const WhatWeProvide = () => {
    const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
    const containerRef = useRef(null);

    const handleMouseMove = (e) => {
        if (containerRef.current) {
            const rect = containerRef.current.getBoundingClientRect();
            setMousePosition({
                x: e.clientX - rect.left,
                y: e.clientY - rect.top,
            });
        }
    };

    const columns = [
        {
            subtitle: "Infrastructural Excellence",
            title: "Advanced Facilities",
            items: [
                { icon: "❄️", text: "Air-conditioned high-density innovation zones for optimized cognitive performance." },
                { icon: "⚡", text: "Industrial-grade 24-hour power redundancy systems ensuring zero downtime." },
                { icon: "🌐", text: "High-bandwidth fiber optic backbone with dedicated gigabit-tier connectivity." },
                { icon: "🔬", text: "Access to specialized engineering and rapid prototyping laboratories." },
                { icon: "☕", text: "Ergonomic rest and recuperation facilities within the 75-acre campus." }
            ]
        },
        {
            subtitle: "Incentivized Valorization",
            title: "Exclusive Treasures",
            items: [
                { icon: "💰", text: "Substantial national-level financial prize pool for top-tier technical solutions." },
                { icon: "🎁", text: "Specialized developer hardware kits and industry-grade peripheral swags." },
                { icon: "📜", text: "Formal institutional certification from the SIT Nagpur Innovation Council." },
                { icon: "🤝", text: "Opportunities for industry-partnered internships and collaborative projects." },
                { icon: "💾", text: "Exclusive access to advanced technical repositories and software licenses." }
            ]
        },
        {
            subtitle: "Professional Capital & Growth",
            title: "Longitudinal Benefits",
            items: [
                { icon: "🔗", text: "Deep-tier networking opportunities with industry leaders and venture capitalists." },
                { icon: "🧠", text: "Exposure to real-world heuristic problem-solving in high-stakes environments." },
                { icon: "🎖️", text: "Strategic enhancement of professional credentials and academic portfolios." },
                { icon: "💡", text: "Collaborative peer-to-peer knowledge exchange within an elite student cohort." },
                { icon: "🚀", text: "Accelerated career trajectory through exposure to the global technology sector." }
            ]
        }
    ];

    return (
        <section
            id="what-we-provide"
            className="h-screen w-full bg-transparent relative overflow-hidden flex flex-col items-center justify-center p-4 snap-start selection:bg-[#3d2b1f] selection:text-[#d4af37]"
            ref={containerRef}
            onMouseMove={handleMouseMove}
        >
            <style jsx>{`
                @import url('https://fonts.googleapis.com/css2?family=Cinzel:wght@400;600;700&family=Cormorant+Garamond:wght@400;500;600&display=swap');
                
                .font-cinzel { font-family: 'Cinzel', serif; }
                .font-body { font-family: 'Cormorant Garamond', serif; }

                .wand-light {
                    background: radial-gradient(800px circle at var(--x) var(--y), rgba(212, 175, 55, 0.08), transparent 40%);
                    position: absolute; inset: 0; pointer-events: none; z-index: 1;
                }

                @keyframes fadeInUp {
                    from { opacity: 0; transform: translateY(20px); }
                    to { opacity: 1; transform: translateY(0); }
                }
            `}</style>

            {/* Wand Light Overlay */}
            <div className="wand-light" style={{ '--x': `${mousePosition.x}px`, '--y': `${mousePosition.y}px` }}></div>

            {/* Frame */}
            <OrnateFrame />

            {/* Content Content - Scaled down slightly to fit dense content if needed */}
            <div className="relative z-10 w-full max-w-[1400px] h-full flex flex-col justify-center px-8 md:px-12 py-16">

                {/* Section Header */}
                <div className="text-center mb-8 md:mb-12">
                    <TextType
                        text={["WHAT WE PROVIDE"]}
                        typingSpeed={60}
                        className="text-3xl md:text-5xl font-cinzel text-[#d4af37] font-bold tracking-[0.2em] drop-shadow-[0_0_10px_rgba(212,175,55,0.4)]"
                        showCursor={false}
                        loop={false}
                    />
                    <div className="h-0.5 w-32 bg-gradient-to-r from-transparent via-[#d4af37] to-transparent mx-auto mt-4 opacity-50"></div>
                </div>

                {/* Features Grid */}
                <div className="flex flex-col md:flex-row gap-6 items-stretch justify-center w-full h-auto overflow-y-auto md:overflow-visible pr-2 md:pr-0 hide-scrollbar scroll-smooth">
                    {columns.map((col, idx) => (
                        <FeatureColumn
                            key={idx}
                            title={col.title}
                            subtitle={col.subtitle}
                            items={col.items}
                            delay={idx * 0.2}
                        />
                    ))}
                </div>

            </div>

            {/* Background Particles (Subtle) */}
            <div className="absolute inset-0 pointer-events-none">
                {[...Array(15)].map((_, i) => (
                    <div
                        key={i}
                        className="absolute w-0.5 h-0.5 bg-[#d4af37] rounded-full opacity-20"
                        style={{
                            top: `${Math.random() * 100}%`,
                            left: `${Math.random() * 100}%`,
                            animation: `fadeInUp ${3 + Math.random() * 5}s infinite alternate`
                        }}
                    />
                ))}
            </div>
        </section>
    );
};

export default WhatWeProvide;
