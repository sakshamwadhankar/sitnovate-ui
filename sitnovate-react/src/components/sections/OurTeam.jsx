import React, { useEffect, useState, useRef } from 'react';
import { motion, useAnimation, useMotionValue } from 'framer-motion';

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
        }
    ];

    // Triple the list for seamless looping
    const displayMembers = [...teamMembers, ...teamMembers, ...teamMembers];

    // Auto-scroll logic happens via CSS animation for smoothness or Framer Motion
    // The original used vanilla requestAnimationFrame. We can use a CSS animation for best performance.

    return (
        <section id="our-team" className="h-screen w-full relative overflow-hidden bg-black flex flex-col items-center justify-center snap-start"
            style={{
                background: '#000' // Explicit black background from original
            }}
        >
            {/* Gradient Overlays */}
            <div className="absolute top-0 left-0 bottom-0 w-[100px] md:w-[200px] z-10 bg-gradient-to-r from-black to-transparent pointer-events-none"></div>
            <div className="absolute top-0 right-0 bottom-0 w-[100px] md:w-[200px] z-10 bg-gradient-to-l from-black to-transparent pointer-events-none"></div>

            {/* Header */}
            <div className="text-center z-10 mb-12">
                <h2 className="text-4xl md:text-5xl font-cinzel font-semibold text-hp-gold tracking-[0.3em] drop-shadow-[0_0_20px_rgba(212,175,55,0.3)]">
                    OUR TEAM
                </h2>
                <div className="w-[120px] h-[2px] bg-hp-gold mx-auto mt-4 opacity-80"></div>
            </div>

            {/* Carousel Container */}
            <div className="w-full relative overflow-hidden py-8">
                {/* 
                   We use a simple CSS animation for the infinite scroll. 
                   Calculated width: (350px card + 32px gap) * 4 cards = 1528px length for one set.
                */}
                <div className="flex animate-scroll hover:[animation-play-state:paused]"
                    style={{
                        width: 'max-content',
                        animation: 'scroll 30s linear infinite',
                        gap: '2rem'
                    }}
                >
                    {displayMembers.map((member, index) => (
                        <div key={index}
                            className="team-card flex-shrink-0 w-[280px] md:w-[330px] rounded-2xl overflow-hidden border border-[rgba(212,175,55,0.3)] bg-gradient-to-br from-[#1a1a1a] to-[#0f0f12] shadow-2xl transition-all duration-400 group hover:border-[rgba(212,175,55,0.6)] hover:shadow-[0_12px_40px_rgba(212,175,55,0.3)] hover:-translate-y-2 hover:rotate-y-6"
                            style={{
                                perspective: '1000px',
                                transformStyle: 'preserve-3d'
                            }}
                        >
                            {/* Image Container */}
                            <div className="w-full h-[280px] md:h-[320px] relative overflow-hidden bg-gradient-to-br from-[#b88a44] to-[#8b6f47]">
                                <img
                                    src={member.image}
                                    alt={member.name}
                                    draggable="false"
                                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-108"
                                />
                            </div>

                            {/* Card Info */}
                            <div className="p-6 flex flex-col items-center gap-4 bg-gradient-to-b from-[#15151a] to-[#0a0a0c] border-t border-[rgba(212,175,55,0.2)]">
                                <h3 className="font-cinzel text-xl font-semibold text-hp-gold text-center tracking-wider drop-shadow-md">
                                    {member.name}
                                </h3>

                                <a href={member.linkedin}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="flex items-center gap-2 px-6 py-2 rounded-full border border-[rgba(212,175,55,0.4)] bg-[rgba(212,175,55,0.1)] text-hp-gold font-cinzel text-xs font-bold tracking-widest hover:bg-hp-gold hover:text-black hover:border-hp-gold transition-all duration-300 transform hover:-translate-y-0.5 shadow-sm"
                                >
                                    <svg className="w-3 h-3 fill-current" viewBox="0 0 24 24">
                                        <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                                    </svg>
                                    CONNECT
                                </a>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            <style jsx>{`
                @keyframes scroll {
                    0% { transform: translateX(0); }
                    100% { transform: translateX(calc(-100% / 3)); } /* Scroll one set of items (1/3 of total) */
                }
            `}</style>
        </section>
    );
};

export default OurTeam;
