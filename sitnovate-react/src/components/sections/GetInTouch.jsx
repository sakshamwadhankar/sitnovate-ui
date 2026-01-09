import React from 'react';

const GetInTouch = () => {
    return (
        <section id="get-in-touch" className="h-screen w-full relative snap-start flex flex-col items-center justify-center p-8 overflow-hidden"
            style={{
                background: 'linear-gradient(180deg, rgba(8, 12, 25, 0.98) 0%, rgba(15, 20, 40, 0.98) 100%)'
            }}
        >
            {/* Magical Border */}
            <div className="absolute top-5 left-5 right-5 bottom-5 border border-[rgba(212,175,55,0.15)] rounded-2xl pointer-events-none"></div>

            {/* Header */}
            <h2 className="flex items-center gap-4 text-4xl md:text-5xl font-cinzel text-[#f5f5f5] mb-2 drop-shadow-[0_0_10px_rgba(212,175,55,0.5)]">
                <span className="text-4xl filter drop-shadow-[0_0_10px_rgba(212,175,55,0.5)]">📜</span>
                Get in Touch
            </h2>
            <p className="font-serif italic text-[#888] text-base md:text-lg mb-8 md:mb-12 text-center">
                Send us an owl or reach out through these magical channels
            </p>

            {/* Content Flex Container */}
            <div className="flex flex-col md:flex-row gap-8 md:gap-12 w-full max-w-[1000px] z-10">

                {/* Left: Contact Info */}
                <div className="flex-1 flex flex-col gap-5">
                    {[
                        { icon: "📍", title: "Location", text: "Symbiosis Institute of Technology\nNagpur, Maharashtra" },
                        { icon: "📧", title: "Email", text: "sitnovate@sitpune.edu.in" },
                        { icon: "📱", title: "Phone", text: "+91 XXXXX XXXXX" }
                    ].map((item, index) => (
                        <div key={index} className="flex gap-4 items-start">
                            <div className="w-[50px] h-[50px] flex items-center justify-center bg-gradient-to-br from-[rgba(212,175,55,0.15)] to-[rgba(212,175,55,0.05)] border border-[rgba(212,175,55,0.3)] rounded-xl text-2xl flex-shrink-0">
                                {item.icon}
                            </div>
                            <div>
                                <h4 className="font-cinzel text-sm text-hp-gold tracking-widest mb-1">{item.title}</h4>
                                <p className="text-[#aaa] text-sm leading-relaxed whitespace-pre-line font-sans">{item.text}</p>
                            </div>
                        </div>
                    ))}

                    <div className="mt-4">
                        <h4 className="font-cinzel text-sm text-hp-gold mb-3">Follow the Magic</h4>
                        <div className="flex flex-wrap gap-3">
                            {[
                                { icon: "📸", label: "Instagram" },
                                { icon: "💼", label: "LinkedIn" },
                                { icon: "🐦", label: "Twitter" },
                                { icon: "📘", label: "Discord" }
                            ].map((social, idx) => (
                                <a key={idx} href="#" className="flex items-center gap-2 px-4 py-2 bg-[rgba(30,35,55,0.8)] border border-[rgba(80,90,120,0.4)] rounded-[20px] transition-all duration-300 hover:border-[rgba(212,175,55,0.6)] hover:bg-[rgba(212,175,55,0.1)] group">
                                    <span>{social.icon}</span>
                                    <span className="text-xs text-[#ccc] group-hover:text-white">{social.label}</span>
                                </a>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Right: Contact Form */}
                <div className="flex-1">
                    <form className="bg-gradient-to-br from-[rgba(20,25,45,0.9)] to-[rgba(30,35,55,0.85)] border-2 border-[rgba(60,70,100,0.4)] rounded-2xl p-6 md:p-8 flex flex-col gap-4 shadow-xl">
                        <div className="flex flex-col md:flex-row gap-4">
                            <div className="flex-1">
                                <label className="block font-cinzel text-xs text-hp-gold mb-2 tracking-widest">Your Name</label>
                                <input type="text" placeholder="Harry Potter" className="w-full px-4 py-3 bg-[rgba(15,20,40,0.8)] border border-[rgba(80,90,120,0.4)] rounded-lg text-[#e0e0e0] text-sm focus:outline-none focus:border-[rgba(212,175,55,0.6)] focus:shadow-[0_0_15px_rgba(212,175,55,0.1)] placeholder-[#555]" />
                            </div>
                            <div className="flex-1">
                                <label className="block font-cinzel text-xs text-hp-gold mb-2 tracking-widest">Your Email</label>
                                <input type="email" placeholder="harry@hogwarts.edu" className="w-full px-4 py-3 bg-[rgba(15,20,40,0.8)] border border-[rgba(80,90,120,0.4)] rounded-lg text-[#e0e0e0] text-sm focus:outline-none focus:border-[rgba(212,175,55,0.6)] focus:shadow-[0_0_15px_rgba(212,175,55,0.1)] placeholder-[#555]" />
                            </div>
                        </div>

                        <div>
                            <label className="block font-cinzel text-xs text-hp-gold mb-2 tracking-widest">Subject</label>
                            <input type="text" placeholder="I solemnly swear..." className="w-full px-4 py-3 bg-[rgba(15,20,40,0.8)] border border-[rgba(80,90,120,0.4)] rounded-lg text-[#e0e0e0] text-sm focus:outline-none focus:border-[rgba(212,175,55,0.6)] focus:shadow-[0_0_15px_rgba(212,175,55,0.1)] placeholder-[#555]" />
                        </div>

                        <div>
                            <label className="block font-cinzel text-xs text-hp-gold mb-2 tracking-widest">Your Message</label>
                            <textarea rows="4" placeholder="Write your magical message here..." className="w-full px-4 py-3 bg-[rgba(15,20,40,0.8)] border border-[rgba(80,90,120,0.4)] rounded-lg text-[#e0e0e0] text-sm focus:outline-none focus:border-[rgba(212,175,55,0.6)] focus:shadow-[0_0_15px_rgba(212,175,55,0.1)] placeholder-[#555] resize-none"></textarea>
                        </div>

                        <button type="button" className="w-full py-4 mt-2 bg-gradient-to-br from-[rgba(212,175,55,0.2)] to-[rgba(180,140,40,0.15)] border-2 border-[rgba(212,175,55,0.5)] rounded-[30px] text-hp-gold font-cinzel text-base tracking-[0.1em] flex items-center justify-center gap-2 transition-all duration-300 hover:bg-[rgba(212,175,55,0.25)] hover:border-hp-gold hover:shadow-[0_0_25px_rgba(212,175,55,0.3)]">
                            <span className="text-xl">✨</span>
                            Send Owl
                        </button>
                    </form>
                </div>
            </div>

            <div className="mt-8 text-center">
                <p className="text-xs md:text-sm text-[#666]">© 2025 SITNovate. All rights reserved. Made with ⚡ magic.</p>
            </div>
        </section>
    );
};

export default GetInTouch;
