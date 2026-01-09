import React from 'react';
import { motion } from 'framer-motion';

const Hero = () => {
    return (
        <section id="hero" className="w-full h-screen relative flex items-center justify-center snap-start">
            {/* Background Video */}
            <div className="absolute inset-0 w-full h-full overflow-hidden z-0">
                <div className="absolute inset-0 bg-black/40 z-10" /> {/* Slight overlay for contrast */}
                <video
                    autoPlay
                    loop
                    muted
                    playsInline
                    className="w-full h-full object-cover"
                >
                    <source src="/assets/video/1v.webm" type="video/webm" />
                </video>
            </div>

            {/* Hero Content - Logo */}
            <div className="z-20 w-full max-w-4xl px-6 flex flex-col items-center">
                <motion.div
                    initial={{ opacity: 0, scale: 0.9, filter: 'blur(10px)' }}
                    animate={{ opacity: 1, scale: 1, filter: 'blur(0px)' }}
                    transition={{ duration: 1.5, ease: "easeOut" }}
                    className="w-full flex justify-center"
                >
                    <img
                        src="/assets/images/logo/logo-gold.png"
                        alt="SITNovate Logo"
                        className="w-full max-w-2xl object-contain drop-shadow-[0_0_15px_rgba(212,175,55,0.3)]"
                    />
                </motion.div>
            </div>

            {/* Scroll Indicator */}
            <motion.div
                className="absolute bottom-12 z-20 flex flex-col items-center text-hp-gold cursor-pointer"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 2, duration: 1 }}
                onClick={() => document.getElementById('about')?.scrollIntoView({ behavior: 'smooth' })}
            >
                <span className="font-cinzel tracking-[0.2em] text-sm mb-2 uppercase opacity-80">Scroll for More</span>
                <motion.div
                    animate={{ y: [0, 10, 0] }}
                    transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
                >
                    <svg width="30" height="30" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1">
                        <path d="M7 13L12 18L17 13M7 6L12 11L17 6" />
                    </svg>
                </motion.div>
            </motion.div>
        </section>
    );
};

export default Hero;
