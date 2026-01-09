import React, { useState, useEffect, useRef, useMemo, createElement } from 'react';

// --- TextType Component ---
const TextType = ({
    text,
    className = '',
    showCursor = true,
    typingSpeed = 80
}) => {
    const [displayedText, setDisplayedText] = useState('');
    const [index, setIndex] = useState(0);

    useEffect(() => {
        if (index < text.length) {
            const timeout = setTimeout(() => {
                setDisplayedText((prev) => prev + text[index]);
                setIndex((prev) => prev + 1);
            }, typingSpeed);
            return () => clearTimeout(timeout);
        }
    }, [index, text, typingSpeed]);

    return (
        <span className={className}>
            {displayedText}
            {showCursor && <span className="animate-pulse">_</span>}
        </span>
    );
};

// --- Sponsors Content ---
const Sponsors = () => {
    const sponsors = [
        { name: "All That's Coffee", src: "/assets/images/sponsors/ATC.jpeg" },
        { name: "Insterra", src: "/assets/images/sponsors/Insterra.webp" },
        { name: "MIA", src: "/assets/images/sponsors/MIA.png" },
        { name: "PB Creators", src: "/assets/images/sponsors/PB.png" },
        { name: "UCN", src: "/assets/images/sponsors/R.png" }, // Replaced duplicate with R.png (likely Replit/UCN?)
        { name: "Devfolio", src: "/assets/images/sponsors/dev.png" },
        { name: "ETHIndia", src: "/assets/images/sponsors/eth.png" },
        { name: "Pizza Hut", src: "/assets/images/sponsors/pizzahut.png" },
        { name: "Polygon", src: "/assets/images/sponsors/poly.png" },
        { name: "Unstoppable Domains", src: "/assets/images/sponsors/un.png" },
    ];
    // Note: Re-verify image mapping, using user provided filenames.

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

    return (
        <section
            id="sponsors"
            className="h-screen w-full bg-[#050505] flex flex-col items-center justify-center p-6 relative overflow-hidden snap-start"
            ref={containerRef}
            onMouseMove={handleMouseMove}
        >
            <style jsx>{`
                @import url('https://fonts.googleapis.com/css2?family=Cinzel:wght@400;600;700&display=swap');
                
                .font-cinzel { font-family: 'Cinzel', serif; }
                
                .wand-light {
                    background: radial-gradient(800px circle at var(--x) var(--y), rgba(212, 175, 55, 0.1), transparent 40%);
                    position: absolute; inset: 0; pointer-events: none; z-index: 1;
                }
                
                .glass-card {
                    background: rgba(255, 255, 255, 0.03);
                    backdrop-filter: blur(5px);
                    border: 1px solid rgba(255, 255, 255, 0.05);
                    box-shadow: 0 4px 30px rgba(0, 0, 0, 0.1);
                }
                
                .glass-card:hover {
                    background: rgba(212, 175, 55, 0.1);
                    border-color: rgba(212, 175, 55, 0.5);
                    box-shadow: 0 0 20px rgba(212, 175, 55, 0.2);
                }
            `}</style>

            {/* Wand Light Overlay */}
            <div className="wand-light" style={{ '--x': `${mousePosition.x}px`, '--y': `${mousePosition.y}px` }}></div>

            <div className="relative z-10 w-full max-w-6xl flex flex-col items-center">

                {/* Header */}
                <div className="text-center mb-16 md:mb-20">
                    <h2 className="text-4xl md:text-6xl font-cinzel text-[#d4af37] tracking-[0.2em] font-bold drop-shadow-[0_0_15px_rgba(212,175,55,0.4)] mb-4">
                        <TextType text="PAST SPONSORS" showCursor={false} />
                    </h2>
                    <div className="h-0.5 w-32 bg-gradient-to-r from-transparent via-[#d4af37] to-transparent mx-auto opacity-70"></div>
                </div>

                {/* Logos Grid */}
                <div className="grid grid-cols-2 md:grid-cols-5 gap-6 md:gap-8 w-full px-4 md:px-0">
                    {sponsors.map((sponsor, index) => (
                        <div
                            key={index}
                            className="glass-card aspect-[3/2] rounded-xl flex items-center justify-center p-6 md:p-8 transition-all duration-500 hover:-translate-y-2 group cursor-pointer relative overflow-hidden"
                            style={{ animation: `fadeInUp 0.6s ease-out ${index * 0.1}s backwards` }}
                        >
                            {/* Inner Glow */}
                            <div className="absolute inset-0 bg-radial-gradient from-[#d4af37]/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

                            <img
                                src={sponsor.src}
                                alt={sponsor.name}
                                className="w-full h-full object-contain filter grayscale opacity-70 contrast-125 group-hover:grayscale-0 group-hover:opacity-100 group-hover:brightness-110 transition-all duration-500 relative z-10"
                                loading="lazy"
                            />
                        </div>
                    ))}
                </div>

            </div>

            {/* Animation Keyframes */}
            <style>{`
                @keyframes fadeInUp {
                    from { opacity: 0; transform: translateY(20px); }
                    to { opacity: 1; transform: translateY(0); }
                }
            `}</style>
        </section>
    );
};

export default Sponsors;
