import React, { useState, useEffect, useRef } from 'react';

// --- PURE CSS 3D CIRCULAR GALLERY ---
const CircularGallery = ({ items, textColor = '#ffffff' }) => {
    const containerRef = useRef(null);
    const [rotation, setRotation] = useState(0);
    const [isDragging, setIsDragging] = useState(false);
    const [startX, setStartX] = useState(0);
    const [startRotation, setStartRotation] = useState(0);

    // Gallery Settings
    const radius = 600;
    const cardWidth = 300;
    const cardHeight = 400;
    const totalItems = items.length;
    const angleStep = 360 / totalItems;

    const handleMouseDown = (e) => {
        setIsDragging(true);
        const clientX = e.touches ? e.touches[0].clientX : e.clientX;
        setStartX(clientX);
        setStartRotation(rotation);
    };

    const handleMouseMove = (e) => {
        if (!isDragging) return;
        const clientX = e.touches ? e.touches[0].clientX : e.clientX;
        const delta = clientX - startX;
        setRotation(startRotation + delta * 0.5);
    };

    const handleMouseUp = () => {
        setIsDragging(false);
    };

    useEffect(() => {
        const handleUp = () => setIsDragging(false);
        window.addEventListener('mouseup', handleUp);
        window.addEventListener('touchend', handleUp);
        return () => {
            window.removeEventListener('mouseup', handleUp);
            window.removeEventListener('touchend', handleUp);
        };
    }, []);

    return (
        <div
            ref={containerRef}
            className="w-full h-full relative perspective-1000 overflow-hidden cursor-grab active:cursor-grabbing"
            onMouseDown={handleMouseDown}
            onMouseMove={handleMouseMove}
            onMouseUp={handleMouseUp}
            onMouseLeave={handleMouseUp}
            onTouchStart={handleMouseDown}
            onTouchMove={handleMouseMove}
            onTouchEnd={handleMouseUp}
            style={{ perspective: '1200px' }}
        >
            <div className="absolute inset-0 flex items-center justify-center">
                {/* 3D Scene Container */}
                <div
                    className="relative preserve-3d transition-transform duration-75 ease-out"
                    style={{
                        width: cardWidth,
                        height: cardHeight,
                        transformStyle: 'preserve-3d',
                        transform: `translateZ(-${radius}px) rotateY(${rotation}deg)`
                    }}
                >
                    {items.map((item, index) => {
                        const angle = index * angleStep;
                        return (
                            <div
                                key={index}
                                className="absolute top-0 left-0 w-full h-full backface-visible"
                                style={{
                                    transform: `rotateY(${angle}deg) translateZ(${radius}px)`,
                                    backfaceVisibility: 'hidden',
                                    WebkitBackfaceVisibility: 'hidden'
                                }}
                            >
                                <div className="relative w-full h-full group">
                                    {/* Card Content */}
                                    <div className="w-full h-full rounded-xl overflow-hidden border border-[#d4af37]/30 bg-[#0f0f12] shadow-[0_0_20px_rgba(0,0,0,0.5)] transition-all duration-300 group-hover:shadow-[0_0_30px_rgba(212,175,55,0.3)] flex flex-col">
                                        {/* Image Container */}
                                        <div className="h-[75%] relative overflow-hidden">
                                            <img
                                                src={item.image}
                                                alt={item.name}
                                                className="w-full h-full object-cover filter grayscale contrast-125 group-hover:grayscale-0 transition-all duration-500"
                                                draggable={false}
                                            />
                                            <div className="absolute inset-0 bg-gradient-to-t from-[#0f0f12] to-transparent opacity-60"></div>
                                        </div>

                                        {/* Info Section */}
                                        <div className="h-[25%] flex flex-col items-center justify-center bg-gradient-to-b from-[#15151a] to-[#0a0a0c] border-t border-[#d4af37]/20 relative z-10 px-4 gap-2">
                                            {/* Name Display */}
                                            <h3 className="font-title text-[#d4af37] text-lg text-center leading-tight text-shadow-glow">
                                                {item.name}
                                            </h3>

                                            {/* LinkedIn Button */}
                                            <a
                                                href={item.linkedin}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="flex items-center gap-2 px-3 py-1 rounded-full border border-[#d4af37]/40 bg-[#d4af37]/10 hover:bg-[#d4af37] hover:text-[#050505] transition-all duration-300 group/btn cursor-pointer"
                                                onMouseDown={(e) => e.stopPropagation()}
                                                onTouchStart={(e) => e.stopPropagation()}
                                            >
                                                <svg className="w-3 h-3 fill-current" viewBox="0 0 24 24">
                                                    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                                                </svg>
                                                <span className="text-[10px] font-title tracking-widest uppercase font-bold">Connect</span>
                                            </a>
                                        </div>
                                    </div>

                                    <div className="absolute top-full left-0 w-full h-1/2 bg-gradient-to-b from-[#ffffff]/10 to-transparent opacity-30 transform scale-y-[-1] pointer-events-none mask-image-linear-gradient" style={{ maskImage: 'linear-gradient(to bottom, rgba(0,0,0,1), transparent)', WebkitMaskImage: 'linear-gradient(to bottom, rgba(0,0,0,1), transparent)' }}></div>
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>

            <div className="absolute inset-y-0 left-0 w-32 bg-gradient-to-r from-[#050505] to-transparent z-10 pointer-events-none"></div>
            <div className="absolute inset-y-0 right-0 w-32 bg-gradient-to-l from-[#050505] to-transparent z-10 pointer-events-none"></div>
        </div>
    );
};

const OurTeam = () => {
    // Team members data
    const teamMembers = [
        {
            name: "Sunidhi Haware",
            image: "/assets/images/Team/SunidhiHaware.jpg",
            linkedin: "https://www.linkedin.com/in/sunidhi-haware-797a97323/"
        },
        {
            name: "Harsh Kumar",
            image: "/assets/images/Team/HarshKumar.jpg",
            linkedin: "https://www.linkedin.com/in/harsh-2227-kumar/"
        },
        {
            name: "Parth Choudhari",
            image: "/assets/images/Team/ParthChoudhari.jpeg",
            linkedin: "https://www.linkedin.com/in/parth-choudhari-2073a0294/"
        },
        {
            name: "Prathmesh Raipurkar",
            image: "/assets/images/Team/PrathmeshRaipurkar.jpeg",
            linkedin: "https://www.linkedin.com/in/prathmesh-raipurkar-2073a0294/"
        },
        // Duplicating items to ensure we have enough cards for a good circle
        {
            name: "Sunidhi Haware",
            image: "/assets/images/Team/SunidhiHaware.jpg",
            linkedin: "https://www.linkedin.com/in/sunidhi-haware-797a97323/"
        },
        {
            name: "Harsh Kumar",
            image: "/assets/images/Team/HarshKumar.jpg",
            linkedin: "https://www.linkedin.com/in/harsh-2227-kumar/"
        },
        {
            name: "Parth Choudhari",
            image: "/assets/images/Team/ParthChoudhari.jpeg",
            linkedin: "https://www.linkedin.com/in/parth-choudhari-2073a0294/"
        },
        {
            name: "Prathmesh Raipurkar",
            image: "/assets/images/Team/PrathmeshRaipurkar.jpeg",
            linkedin: "https://www.linkedin.com/in/prathmesh-raipurkar-2073a0294/"
        }
    ];

    const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
    const sectionRef = useRef(null);

    const handleMouseMove = (e) => {
        if (sectionRef.current) {
            const rect = sectionRef.current.getBoundingClientRect();
            setMousePosition({
                x: e.clientX - rect.left,
                y: e.clientY - rect.top,
            });
        }
    };

    return (
        <section
            id="our-team"
            className="h-screen w-full relative overflow-hidden bg-[#050505] flex flex-col items-center justify-center snap-start selection:bg-[#3d2b1f] selection:text-[#d4af37]"
            ref={sectionRef}
            onMouseMove={handleMouseMove}
        >
            <style jsx>{`
                @import url('https://fonts.googleapis.com/css2?family=Cinzel:wght@400;500;600;700&family=Cormorant+Garamond:ital,wght@0,300;0,400;0,600;1,400&display=swap');

                .font-title { font-family: 'Cinzel', serif; }
                .font-body { font-family: 'Cormorant Garamond', serif; }

                .wand-light {
                    background: radial-gradient(
                        600px circle at var(--x) var(--y),
                        rgba(212, 175, 55, 0.15),
                        transparent 40%
                    );
                    position: absolute;
                    inset: 0;
                    pointer-events: none;
                    z-index: 2;
                }
                
                .perspective-1000 { perspective: 1000px; }
                .preserve-3d { transform-style: preserve-3d; }
                .backface-visible { backface-visibility: visible; }
                .text-shadow-glow { text-shadow: 0 0 10px rgba(212, 175, 55, 0.3); }
            `}</style>

            {/* Wand Light Overlay */}
            <div className="absolute inset-0 pointer-events-none z-50">
                <div className="wand-light" style={{ '--x': `${mousePosition.x}px`, '--y': `${mousePosition.y}px` }}></div>
            </div>

            <div className="max-w-7xl w-full relative z-10 flex flex-col items-center justify-center h-full">

                {/* Header */}
                <div className="flex flex-col items-center justify-center gap-4 mb-8">
                    <h2 className="text-3xl md:text-5xl font-title text-[#d4af37] tracking-[0.2em] uppercase border-b border-[#d4af37]/30 pb-4 text-shadow-glow">
                        Our Team
                    </h2>
                </div>

                {/* 3D Gallery */}
                <div className="w-full h-[600px] relative">
                    <CircularGallery
                        items={teamMembers}
                        textColor="#d4af37"
                    />
                </div>
            </div>
        </section>
    );
};

export default OurTeam;
