import React from 'react';
import { motion } from 'framer-motion';

const EventHighlights = () => {
    const images = [
        { src: "/assets/images/sitnovate/1.JPG", label: "Opening Ceremony" },
        { src: "/assets/images/sitnovate/2.JPG", label: "Team Formation" },
        { src: "/assets/images/sitnovate/3.jpg", label: "Coding Marathon" },
        { src: "/assets/images/sitnovate/4.jpg", label: "Mentorship Sessions" },
        { src: "/assets/images/sitnovate/5.png", label: "Final Presentations" },
        { src: "/assets/images/sitnovate/6.png", label: "Award Ceremony" }
    ];

    return (
        <section id="event-highlights" className="h-screen w-full relative flex flex-col items-center justify-center p-6 snap-start"
            style={{ background: 'linear-gradient(180deg, rgba(10, 15, 28, 0.95) 0%, rgba(15, 23, 42, 0.98) 100%)' }}
        >
            <motion.div
                initial={{ opacity: 0, y: -20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                className="mb-8 md:mb-12 text-center"
            >
                <h2 className="text-3xl md:text-5xl font-cinzel text-[#f5e6d3] mb-4 drop-shadow-lg tracking-widest"
                    style={{ textShadow: '0 0 20px rgba(212, 175, 55, 0.4), 0 0 40px rgba(212, 175, 55, 0.2)' }}
                >
                    Event Highlights
                </h2>
                <div className="h-[3px] w-[120px] bg-gradient-to-r from-transparent via-hp-gold to-transparent mx-auto"></div>
            </motion.div>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 max-w-[1200px] w-full px-4 overflow-y-auto max-h-[75vh] md:overflow-hidden hide-scrollbar">
                {images.map((img, index) => (
                    <motion.div
                        key={index}
                        className="relative rounded-[16px] overflow-hidden cursor-pointer aspect-[4/3] group"
                        style={{
                            background: 'linear-gradient(135deg, rgba(20, 30, 48, 0.9), rgba(36, 59, 85, 0.8))',
                            border: '2px solid rgba(212, 175, 55, 0.3)',
                            boxShadow: '0 10px 40px rgba(0, 0, 0, 0.4), inset 0 1px 0 rgba(255, 255, 255, 0.1)'
                        }}
                        initial={{ opacity: 0, scale: 0.9 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.5, delay: index * 0.1 }}
                        whileHover={{
                            y: -8,
                            scale: 1.02,
                            borderColor: 'rgba(212, 175, 55, 0.7)',
                            boxShadow: '0 20px 60px rgba(212, 175, 55, 0.15), 0 0 30px rgba(212, 175, 55, 0.1)'
                        }}
                    >
                        <img
                            src={img.src}
                            alt={img.label}
                            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-108"
                            loading="lazy"
                        />
                        <div className="absolute inset-x-0 bottom-0 p-6 pt-12 bg-gradient-to-t from-[#0a0f1c]/95 via-[#0a0f1c]/70 to-transparent">
                            <span className="inline-block px-4 py-1.5 rounded-[20px] bg-[rgba(212,175,55,0.1)] border border-[rgba(212,175,55,0.3)] text-hp-gold font-cinzel text-sm uppercase tracking-widest text-shadow-sm">
                                {img.label}
                            </span>
                        </div>
                    </motion.div>
                ))}
            </div>
        </section>
    );
};

export default EventHighlights;
