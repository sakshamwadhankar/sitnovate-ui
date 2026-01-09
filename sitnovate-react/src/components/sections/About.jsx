import React from 'react';
import { motion } from 'framer-motion';

const About = () => {
    return (
        <section id="about" className="h-screen w-full relative overflow-hidden bg-hp-dark text-white flex flex-col items-center justify-center p-8 snap-start">
            {/* Background Elements */}
            <div className="absolute inset-0 bg-magical-gradient opacity-20 pointer-events-none"></div>

            {/* Content Container */}
            <div className="max-w-4xl z-10 text-center relative">
                <motion.div
                    initial={{ opacity: 0, scale: 0.95, filter: 'blur(5px)' }}
                    whileInView={{ opacity: 1, scale: 1, filter: 'blur(0px)' }}
                    transition={{ duration: 1 }}
                    className="mb-10"
                >
                    <h1 className="text-4xl md:text-6xl font-cinzel text-hp-gold italic leading-tight drop-shadow-[0_2px_10px_rgba(212,175,55,0.4)]">
                        "This is the story of the<br />Boy Who Lived."
                    </h1>
                </motion.div>

                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 1, delay: 0.3 }}
                >
                    <p className="text-lg md:text-2xl font-light leading-relaxed text-gray-300 max-w-3xl mx-auto font-sans tracking-wide">
                        But there’s more to Harry than his scar. To understand him, you have to understand the magic.
                        The Wizarding World. And you have to understand Dumbledore.
                    </p>
                </motion.div>

                {/* Divider Line */}
                <motion.div
                    initial={{ width: 0, opacity: 0 }}
                    whileInView={{ width: '100px', opacity: 1 }}
                    transition={{ delay: 0.8, duration: 1 }}
                    className="h-[3px] bg-gradient-to-r from-transparent via-hp-gold to-transparent mx-auto mt-12"
                ></motion.div>
            </div>
        </section>
    );
};

export default About;
