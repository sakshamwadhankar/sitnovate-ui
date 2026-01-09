import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const Navbar = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [isMuted, setIsMuted] = useState(true);
    const audioRef = React.useRef(null);

    const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

    const toggleAudio = () => {
        const nextState = !isMuted;
        setIsMuted(nextState);
        if (audioRef.current) {
            if (!nextState) {
                audioRef.current.play().catch(e => console.log("Audio play failed:", e));
            } else {
                audioRef.current.pause();
            }
        }
    };

    useEffect(() => {
        // Auto-play attempt on mount (often blocked by browser, so muted by default is safe)
        if (audioRef.current) {
            audioRef.current.volume = 0.4;
        }
    }, []);

    const scrollToSection = (id) => {
        setIsMenuOpen(false);
        const element = document.getElementById(id);
        if (element) {
            setTimeout(() => {
                element.scrollIntoView({ behavior: 'smooth' });
            }, 300); // Wait for menu to close
        }
    };

    const menuItems = [
        { id: 'hero', label: 'Home' },
        { id: 'about', label: 'About' },
        { id: 'what-we-provide', label: 'What We Provide' },
        { id: 'event-highlights', label: 'Highlights' },
        { id: 'sponsors', label: 'Sponsors' },
        { id: 'our-team', label: 'Team' },
        { id: 'get-in-touch', label: 'Contact' }
    ];

    return (
        <>
            {/* Top Header Bar */}
            <header className="fixed top-0 left-0 w-full z-50 flex justify-between items-center px-6 py-6 md:px-12 pointer-events-none">

                {/* Menu Button */}
                <button
                    onClick={toggleMenu}
                    className="pointer-events-auto text-hp-gold uppercase font-cinzel tracking-widest text-sm md:text-base hover:text-white transition-colors z-50 mix-blend-difference"
                >
                    {isMenuOpen ? 'Close' : 'Menu'}
                </button>

                {/* Center Logo (Brand Mark) */}
                <div className="absolute left-1/2 transform -translate-x-1/2 pointer-events-auto">
                    <img
                        src="/assets/images/logo/brand-mark.png"
                        alt="Brand Mark"
                        className="w-8 md:w-12 opacity-80 hover:opacity-100 transition-opacity"
                    />
                </div>

                {/* Audio Toggle */}
                <button
                    onClick={toggleAudio}
                    className="pointer-events-auto flex items-center space-x-1 z-50"
                >
                    <div className={`w-6 h-6 border rounded-full flex items-center justify-center border-hp-gold/50 ${!isMuted ? 'animate-pulse' : ''}`}>
                        {/* Simple Audio Icon */}
                        <div className={`w-0.5 h-3 bg-hp-gold mx-[1px] ${!isMuted ? 'animate-[bounce_1s_infinite]' : ''}`}></div>
                        <div className={`w-0.5 h-4 bg-hp-gold mx-[1px] ${!isMuted ? 'animate-[bounce_0.8s_infinite]' : ''}`}></div>
                        <div className={`w-0.5 h-2 bg-hp-gold mx-[1px] ${!isMuted ? 'animate-[bounce_1.2s_infinite]' : ''}`}></div>
                    </div>
                    <span className="sr-only">Toggle Audio</span>
                </button>

                {/* Audio Element */}
                <audio ref={audioRef} loop src="/assets/audio/ambience.webm" />
            </header>

            {/* Fullscreen Menu Overlay */}
            <AnimatePresence>
                {isMenuOpen && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.5 }}
                        className="fixed inset-0 z-40 bg-hp-dark/95 backdrop-blur-md flex flex-col items-center justify-center pointer-events-auto"
                    >
                        <nav className="flex flex-col space-y-6 text-center">
                            {menuItems.map((item, index) => (
                                <motion.button
                                    key={item.id}
                                    initial={{ y: 20, opacity: 0 }}
                                    animate={{ y: 0, opacity: 1 }}
                                    transition={{ delay: index * 0.1, duration: 0.5 }}
                                    onClick={() => scrollToSection(item.id)}
                                    className="text-2xl md:text-4xl font-cinzel text-gray-300 hover:text-hp-gold transition-colors tracking-wider"
                                >
                                    {item.label}
                                </motion.button>
                            ))}
                        </nav>

                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 0.5 }}
                            className="absolute bottom-12 flex space-x-6 text-sm text-gray-500 font-cinzel"
                        >
                            <a href="#" className="hover:text-hp-gold">Terms of Use</a>
                            <a href="#" className="hover:text-hp-gold">Privacy Policy</a>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
};

export default Navbar;
