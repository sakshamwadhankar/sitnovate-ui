import React from 'react';
import { motion } from 'framer-motion';

const WhatWeProvide = () => {
    return (
        <section id="what-we-provide" className="h-screen w-full relative overflow-hidden bg-hp-dark flex flex-col items-center justify-center p-6 snap-start">

            <div className="z-10 w-full max-w-5xl flex flex-col items-center">
                <motion.div
                    initial={{ opacity: 0, y: -20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                    className="text-center mb-10"
                >
                    <h2 className="text-4xl md:text-5xl font-cinzel text-hp-gold mb-4 drop-shadow-[0_2px_20px_rgba(212,175,55,0.4)] tracking-wider">
                        What We Provide
                    </h2>
                    <div className="h-[3px] w-20 bg-gradient-to-r from-transparent via-hp-gold to-transparent mx-auto"></div>
                </motion.div>


                <div className="flex flex-col md:flex-row gap-8 justify-center items-stretch w-full px-4">

                    {/* Facilities Card - Ravenclaw Blue Theme */}
                    <motion.div
                        className="flex-1 rounded-[16px] p-8 relative overflow-hidden backdrop-blur-sm"
                        style={{
                            background: 'linear-gradient(145deg, rgba(13, 27, 42, 0.95), rgba(27, 38, 59, 0.9))',
                            border: '2px solid rgba(65, 105, 225, 0.4)',
                            boxShadow: '0 0 30px rgba(65, 105, 225, 0.2), inset 0 0 60px rgba(65, 105, 225, 0.05)'
                        }}
                        initial={{ opacity: 0, x: -50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.6 }}
                        viewport={{ once: true }}
                    >
                        <div className="flex items-center mb-6 pb-4 border-b border-white/15">
                            <span className="text-4xl mr-4 drop-shadow-[0_0_8px_currentColor] text-[#4169e1]">🏰</span>
                            <h3 className="text-2xl font-cinzel font-semibold text-[#b8c5e6] tracking-wider">Facilities</h3>
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                            {[
                                { icon: "📡", text: "High-Speed WiFi" },
                                { icon: "⚡", text: "Charging Stations" },
                                { icon: "🍔", text: "24/7 Food" },
                                { icon: "🛋️", text: "Rest Zones" }
                            ].map((item, index) => (
                                <div key={index}
                                    className="flex items-center p-3 rounded-[30px] font-medium text-sm transition-all duration-300 hover:translate-x-1"
                                    style={{
                                        background: 'rgba(65, 105, 225, 0.15)',
                                        border: '1px solid rgba(65, 105, 225, 0.3)',
                                        color: '#a8c2f0'
                                    }}
                                >
                                    <span className="mr-3 text-lg w-6 text-center">{item.icon}</span>
                                    {item.text}
                                </div>
                            ))}
                        </div>
                    </motion.div>

                    {/* Treasures Card - Gryffindor Gold Theme */}
                    <motion.div
                        className="flex-1 rounded-[16px] p-8 relative overflow-hidden backdrop-blur-sm"
                        style={{
                            background: 'linear-gradient(145deg, rgba(45, 22, 11, 0.95), rgba(75, 35, 15, 0.9))',
                            border: '2px solid rgba(182, 125, 61, 0.5)',
                            boxShadow: '0 0 30px rgba(182, 125, 61, 0.2), inset 0 0 60px rgba(182, 125, 61, 0.05)'
                        }}
                        initial={{ opacity: 0, x: 50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.6, delay: 0.2 }}
                        viewport={{ once: true }}
                    >
                        <div className="flex items-center mb-6 pb-4 border-b border-white/15">
                            <span className="text-4xl mr-4 drop-shadow-[0_0_8px_currentColor] text-[#d4af37]">⭐</span>
                            <h3 className="text-2xl font-cinzel font-semibold text-[#f0d78c] tracking-wider">Treasures</h3>
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                            {[
                                { icon: "💰", text: "Cash Prizes" },
                                { icon: "🎓", text: "Mentorship" },
                                { icon: "🎁", text: "Cool Swag" },
                                { icon: "📜", text: "Certificates" }
                            ].map((item, index) => (
                                <div key={index}
                                    className="flex items-center p-3 rounded-[30px] font-medium text-sm transition-all duration-300 hover:translate-x-1"
                                    style={{
                                        background: 'rgba(182, 125, 61, 0.15)',
                                        border: '1px solid rgba(182, 125, 61, 0.3)',
                                        color: '#f0d78c'
                                    }}
                                >
                                    <span className="mr-3 text-lg w-6 text-center">{item.icon}</span>
                                    {item.text}
                                </div>
                            ))}
                        </div>
                    </motion.div>
                </div>
            </div>
        </section>
    );
};

export default WhatWeProvide;
