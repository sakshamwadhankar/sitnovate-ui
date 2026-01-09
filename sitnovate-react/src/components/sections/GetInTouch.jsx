import React, { useState, useEffect, useRef, useMemo, createElement } from 'react';

// --- TextType Aesthetically Matching Previous Sections ---
const TextType = ({ text, className = '', showCursor = true }) => {
    const [displayedText, setDisplayedText] = useState('');
    const [index, setIndex] = useState(0);

    useEffect(() => {
        if (index < text.length) {
            const timeout = setTimeout(() => {
                setDisplayedText((prev) => prev + text[index]);
                setIndex((prev) => prev + 1);
            }, 100);
            return () => clearTimeout(timeout);
        }
    }, [index, text]);

    return (
        <span className={className}>
            {displayedText}
            {showCursor && <span className="animate-pulse">|</span>}
        </span>
    );
};

// --- Contact Info Item Component ---
const ContactItem = ({ icon, title, lines }) => (
    <div className="flex items-start gap-5 group">
        <div className="w-12 h-12 flex items-center justify-center rounded-xl bg-[#1a1a2e] border border-[#d4af37]/20 shadow-[0_0_15px_rgba(0,0,0,0.3)] group-hover:border-[#d4af37]/60 group-hover:shadow-[0_0_20px_rgba(212,175,55,0.15)] transition-all duration-300">
            <span className="text-xl filter drop-shadow-[0_0_5px_rgba(255,255,255,0.3)]">{icon}</span>
        </div>
        <div>
            <h4 className="font-cinzel text-[#d4af37] tracking-widest text-sm mb-1 uppercase opacity-80 group-hover:opacity-100 transition-opacity">{title}</h4>
            {lines.map((line, i) => (
                <p key={i} className="font-body text-[#a0a0b0] text-sm md:text-[15px] leading-relaxed group-hover:text-[#e0e0e0] transition-colors">{line}</p>
            ))}
        </div>
    </div>
);

// --- Form Input Component ---
const InputField = ({ label, type = "text", placeholder, isTextArea = false }) => (
    <div className="flex flex-col gap-2">
        <label className="font-cinzel text-[10px] md:text-xs text-[#d4af37] tracking-[0.2em] uppercase ml-1 opacity-90">{label}</label>
        {isTextArea ? (
            <textarea
                rows="4"
                placeholder={placeholder}
                className="w-full bg-[#0a0a12] border border-[#d4af37]/20 rounded-lg px-4 py-3 text-[#e0e0e0] font-body text-sm placeholder-[#444] focus:outline-none focus:border-[#d4af37]/60 focus:bg-[#0f0f1a] focus:shadow-[0_0_15px_rgba(212,175,55,0.1)] transition-all resize-none"
            />
        ) : (
            <input
                type={type}
                placeholder={placeholder}
                className="w-full bg-[#0a0a12] border border-[#d4af37]/20 rounded-lg px-4 py-3 text-[#e0e0e0] font-body text-sm placeholder-[#444] focus:outline-none focus:border-[#d4af37]/60 focus:bg-[#0f0f1a] focus:shadow-[0_0_15px_rgba(212,175,55,0.1)] transition-all"
            />
        )}
    </div>
);

export default function GetInTouch() {
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
            id="get-in-touch"
            className="h-screen w-full relative overflow-hidden bg-[#030305] flex flex-col items-center justify-center p-4 snap-start selection:bg-[#3d2b1f] selection:text-[#d4af37]"
            ref={sectionRef}
            onMouseMove={handleMouseMove}
        >
            <style jsx>{`
                @import url('https://fonts.googleapis.com/css2?family=Cinzel:wght@400;500;600;700&family=Cormorant+Garamond:ital,wght@0,300;0,400;0,600;1,400&display=swap');
                .font-cinzel { font-family: 'Cinzel', serif; }
                .font-body { font-family: 'Cormorant Garamond', serif; }
                
                .wand-light {
                    background: radial-gradient(800px circle at var(--x) var(--y), rgba(212, 175, 55, 0.06), transparent 40%);
                    position: absolute; inset: 0; pointer-events: none; z-index: 1;
                }
            `}</style>

            {/* Wand Light Overlay */}
            <div className="wand-light" style={{ '--x': `${mousePosition.x}px`, '--y': `${mousePosition.y}px` }}></div>

            {/* Background Particles (Very subtle stars) */}
            <div className="absolute inset-0 pointer-events-none">
                {[...Array(30)].map((_, i) => (
                    <div
                        key={i}
                        className="absolute bg-white rounded-full opacity-0"
                        style={{
                            width: Math.random() * 2 + 'px',
                            height: Math.random() * 2 + 'px',
                            top: Math.random() * 100 + '%',
                            left: Math.random() * 100 + '%',
                            animation: `twinkle ${2 + Math.random() * 4}s infinite ease-in-out`,
                            animationDelay: `${Math.random() * 5}s`
                        }}
                    />
                ))}
                <style>{`
                    @keyframes twinkle {
                        0%, 100% { opacity: 0; transform: scale(0.5); }
                        50% { opacity: 0.3; transform: scale(1); }
                    }
                `}</style>
            </div>

            {/* Main Container */}
            <div className="relative z-10 w-full max-w-6xl flex flex-col items-center justify-center p-4 md:p-8">

                {/* Header */}
                <div className="text-center mb-12 md:mb-16">
                    <h2 className="flex items-center justify-center gap-3 text-4xl md:text-5xl font-cinzel text-[#e0e0e0] font-medium tracking-[0.1em] drop-shadow-[0_0_15px_rgba(212,175,55,0.25)]">
                        <span className="text-4xl filter drop-shadow-[0_0_12px_rgba(212,175,55,0.8)] animate-pulse">📜</span>
                        <TextType text="GET IN TOUCH" showCursor={false} />
                    </h2>
                    <p className="font-body text-[#888] italic mt-4 text-base md:text-lg tracking-wide opacity-80">
                        Send us an owl or reach out through these magical channels
                    </p>
                </div>

                <div className="flex flex-col md:flex-row w-full gap-8 md:gap-20 items-stretch">

                    {/* Left Column: Contact Info which moves up slightly on hover */}
                    <div className="flex-1 flex flex-col justify-center space-y-8 md:pl-8">
                        <ContactItem
                            icon="📍"
                            title="Location"
                            lines={["Symbiosis Institute of Technology", "Nagpur, Maharashtra"]}
                        />
                        <ContactItem
                            icon="📧"
                            title="Email"
                            lines={["sitnovate@sitpune.edu.in"]}
                        />
                        <ContactItem
                            icon="📱"
                            title="Phone"
                            lines={["+91 XXXXX XXXXX"]}
                        />

                        {/* Social Links */}
                        <div className="pt-6">
                            <h4 className="font-cinzel text-[#d4af37] tracking-widest text-xs mb-4 uppercase opacity-70">Follow The Magic</h4>
                            <div className="flex flex-wrap gap-3">
                                {[
                                    { icon: "📸", label: "Instagram" },
                                    { icon: "💼", label: "LinkedIn" },
                                    { icon: "🐦", label: "Twitter" },
                                    { icon: "📘", label: "Discord" }
                                ].map((social, idx) => (
                                    <button key={idx} className="flex items-center gap-2 px-4 py-2 bg-[#151520] border border-[#d4af37]/20 rounded-full group hover:border-[#d4af37]/60 hover:bg-[#d4af37]/10 transition-all duration-300">
                                        <span className="text-sm">{social.icon}</span>
                                        <span className="font-body text-[#ccc] text-sm group-hover:text-white">{social.label}</span>
                                    </button>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* Right Column: Magically Floating Form */}
                    <div className="flex-1 relative">
                        {/* Glow effect behind form */}
                        <div className="absolute -inset-1 bg-gradient-to-r from-[#d4af37] to-[#8a6d3b] rounded-2xl opacity-10 blur-xl group-hover:opacity-20 transition-opacity"></div>

                        <form className="relative bg-[#0c0c14]/90 border border-[#d4af37]/20 rounded-2xl p-8 shadow-[0_0_50px_rgba(0,0,0,0.5)] backdrop-blur-sm flex flex-col gap-5">
                            <div className="flex flex-col md:flex-row gap-5">
                                <div className="flex-1"><InputField label="Your Name" placeholder="Harry Potter" /></div>
                                <div className="flex-1"><InputField label="Your Email" type="email" placeholder="harry@hogwarts.edu" /></div>
                            </div>

                            <InputField label="Subject" placeholder="I solemnly swear..." />
                            <InputField label="Your Message" isTextArea={true} placeholder="Write your magical message here..." />

                            <button className="w-full py-4 mt-4 relative overflow-hidden rounded-[4px] group border border-[#d4af37]/30 bg-[#d4af37]/5 hover:bg-[#d4af37]/10 transition-all">
                                <span className="relative z-10 flex items-center justify-center gap-3 font-cinzel text-[#d4af37] tracking-[0.2em] font-bold text-sm uppercase group-hover:text-[#fff] transition-colors">
                                    <span className="text-lg">✨</span> Send Owl
                                </span>
                                {/* Hover Fill Effect */}
                                <div className="absolute inset-0 bg-[#d4af37] opacity-0 group-hover:opacity-100 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left z-0"></div>
                            </button>
                        </form>
                    </div>

                </div>
            </div>
        </section>
    );
}
