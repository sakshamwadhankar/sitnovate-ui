import React from 'react';
import { motion } from 'framer-motion';

const Sponsors = () => {
    const sponsors = [
        { name: "ATC", src: "/assets/images/sponsors/ATC.jpeg" },
        { name: "Insterra", src: "/assets/images/sponsors/Insterra.webp" },
        { name: "MIA", src: "/assets/images/sponsors/MIA.png" },
        { name: "PB", src: "/assets/images/sponsors/PB.png" },
        { name: "R", src: "/assets/images/sponsors/R.png" },
        { name: "Dev", src: "/assets/images/sponsors/dev.png" },
        { name: "Eth", src: "/assets/images/sponsors/eth.png" },
        { name: "Pizza Hut", src: "/assets/images/sponsors/pizzahut.png" },
        { name: "Poly", src: "/assets/images/sponsors/poly.png" },
        { name: "UN", src: "/assets/images/sponsors/un.png" },
    ];

    return (
        <section id="sponsors" className="h-screen w-full bg-transparent flex flex-col items-center justify-center p-6 relative overflow-hidden snap-start">
            {/* Background elements */}
            <div className="absolute top-0 left-0 w-full h-full bg-[url('/assets/images/noise/noise.png')] opacity-5 pointer-events-none mix-blend-overlay"></div>

            <motion.div
                initial={{ opacity: 0, y: -20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                className="text-center mb-16 relative z-10"
            >
                <h2 className="text-4xl md:text-5xl font-cinzel text-white mb-4 drop-shadow-[0_0_15px_rgba(255,255,255,0.3)]">
                    Past Sponsors
                </h2>
                <div className="h-[3px] w-[100px] bg-gradient-to-r from-transparent via-white/50 to-transparent mx-auto"></div>
            </motion.div>

            <div className="grid grid-cols-2 md:grid-cols-5 gap-8 max-w-6xl w-full items-center justify-items-center bg-white/5 p-8 rounded-2xl backdrop-blur-sm border border-white/10 z-10">
                {sponsors.map((sponsor, index) => (
                    <motion.div
                        key={index}
                        className="w-full h-24 flex items-center justify-center p-4 bg-white/5 rounded-lg hover:bg-white/10 transition-colors duration-300 group cursor-default"
                        initial={{ opacity: 0, scale: 0.9 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.5, delay: index * 0.05 }}
                        whileHover={{ scale: 1.05 }}
                    >
                        <img
                            src={sponsor.src}
                            alt={sponsor.name}
                            className="max-w-full max-h-full object-contain filter grayscale group-hover:grayscale-0 transition-all duration-300 opacity-60 group-hover:opacity-100 drop-shadow-md"
                            loading="lazy"
                        />
                    </motion.div>
                ))}
            </div>
        </section>
    );
};

export default Sponsors;
