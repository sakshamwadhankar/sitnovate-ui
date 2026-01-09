import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const Navbar = ({ currentSection, onNavigate }) => {
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
        if (audioRef.current) {
            audioRef.current.volume = 0.4;
        }
    }, []);

    // Navigation Handler (uses index)
    const handleNavClick = (index) => {
        setIsMenuOpen(false);
        // Small delay to allow menu to start closing before slide moves (optional)
        setTimeout(() => {
            onNavigate(index);
        }, 300);
    };

    const menuItems = [
        { index: 0, label: 'Home' },
        { index: 1, label: 'About' },
        { index: 2, label: 'What We Provide' },
        { index: 3, label: 'Highlights' },
        { index: 4, label: 'Sponsors' },
        { index: 5, label: 'Team' },
        { index: 6, label: 'Contact' }
    ];

    return (
        <>
            {/* Top Header Bar */}
            <header className="fixed top-0 left-0 w-full z-50 flex justify-between items-center px-6 py-6 md:px-12 pointer-events-none">
                <button
                    onClick={toggleMenu}
                    className="pointer-events-auto text-hp-gold uppercase font-cinzel tracking-widest text-sm md:text-base hover:text-white transition-colors z-50 mix-blend-difference"
                    aria-label="Toggle Menu"
                >
                    {isMenuOpen ? 'Close' : 'Menu'}
                </button>

                <div className="absolute left-1/2 transform -translate-x-1/2 pointer-events-auto cursor-pointer" onClick={() => onNavigate(0)}>
                    <img
                        src="/assets/images/logo/brand-mark.png"
                        alt="Brand Mark"
                        className="w-8 md:w-12 opacity-80 hover:opacity-100 transition-opacity"
                    />
                </div>

                <button
                    onClick={toggleAudio}
                    className="pointer-events-auto flex items-center space-x-1 z-50"
                    aria-label="Toggle Audio"
                >
                    <div className={`w-6 h-6 border rounded-full flex items-center justify-center border-hp-gold/50 ${!isMuted ? 'animate-pulse' : ''}`}>
                        <div className={`w-0.5 h-3 bg-hp-gold mx-[1px] ${!isMuted ? 'animate-[bounce_1s_infinite]' : ''}`}></div>
                        <div className={`w-0.5 h-4 bg-hp-gold mx-[1px] ${!isMuted ? 'animate-[bounce_0.8s_infinite]' : ''}`}></div>
                        <div className={`w-0.5 h-2 bg-hp-gold mx-[1px] ${!isMuted ? 'animate-[bounce_1.2s_infinite]' : ''}`}></div>
                    </div>
                </button>

                <audio ref={audioRef} loop src="/assets/audio/ambience.webm" />
            </header>

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
                            {menuItems.map((item, i) => (
                                <motion.button
                                    key={i}
                                    initial={{ y: 20, opacity: 0 }}
                                    animate={{ y: 0, opacity: 1 }}
                                    transition={{ delay: i * 0.1, duration: 0.5 }}
                                    onClick={() => handleNavClick(item.index)}
                                    className={`text-2xl md:text-4xl font-cinzel transition-colors tracking-wider ${currentSection === item.index ? 'text-hp-gold' : 'text-gray-300 hover:text-hp-gold'}`}
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
