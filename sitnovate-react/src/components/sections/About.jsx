import React, { useState, useEffect, useRef, useMemo, useCallback, createElement } from 'react';

// --- TextType Component ---
const TextType = ({
    text,
    as: Component = 'div',
    typingSpeed = 50,
    initialDelay = 0,
    pauseDuration = 2000,
    deletingSpeed = 30,
    loop = true,
    className = '',
    showCursor = true,
    hideCursorWhileTyping = false,
    cursorCharacter = '|',
    cursorClassName = '',
    cursorBlinkDuration = 0.5,
    textColors = [],
    variableSpeed,
    onSentenceComplete,
    startOnVisible = false,
    reverseMode = false,
    ...props
}) => {
    const [displayedText, setDisplayedText] = useState('');
    const [currentCharIndex, setCurrentCharIndex] = useState(0);
    const [isDeleting, setIsDeleting] = useState(false);
    const [currentTextIndex, setCurrentTextIndex] = useState(0);
    const [isVisible, setIsVisible] = useState(!startOnVisible);

    const cursorRef = useRef(null);
    const containerRef = useRef(null);

    const textArray = useMemo(() => (Array.isArray(text) ? text : [text]), [text]);

    const getRandomSpeed = useCallback(() => {
        if (!variableSpeed) return typingSpeed;
        const { min, max } = variableSpeed;
        return Math.random() * (max - min) + min;
    }, [variableSpeed, typingSpeed]);

    const getCurrentTextColor = () => {
        if (textColors.length === 0) return;
        return textColors[currentTextIndex % textColors.length];
    };

    useEffect(() => {
        if (!startOnVisible || !containerRef.current) return;
        const observer = new IntersectionObserver(
            entries => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        setIsVisible(true);
                    }
                });
            },
            { threshold: 0.1 }
        );
        observer.observe(containerRef.current);
        return () => observer.disconnect();
    }, [startOnVisible]);

    useEffect(() => {
        if (!isVisible) return;

        let timeout;
        const currentText = textArray[currentTextIndex];
        const processedText = reverseMode ? currentText.split('').reverse().join('') : currentText;

        const executeTypingAnimation = () => {
            if (isDeleting) {
                if (displayedText === '') {
                    setIsDeleting(false);
                    if (currentTextIndex === textArray.length - 1 && !loop) {
                        return;
                    }
                    if (onSentenceComplete) {
                        onSentenceComplete(textArray[currentTextIndex], currentTextIndex);
                    }
                    setCurrentTextIndex(prev => (prev + 1) % textArray.length);
                    setCurrentCharIndex(0);
                    timeout = setTimeout(() => { }, pauseDuration);
                } else {
                    timeout = setTimeout(() => {
                        setDisplayedText(prev => prev.slice(0, -1));
                    }, deletingSpeed);
                }
            } else {
                if (currentCharIndex < processedText.length) {
                    timeout = setTimeout(
                        () => {
                            setDisplayedText(prev => prev + processedText[currentCharIndex]);
                            setCurrentCharIndex(prev => prev + 1);
                        },
                        variableSpeed ? getRandomSpeed() : typingSpeed
                    );
                } else if (textArray.length > 1) {
                    if (!loop && currentTextIndex === textArray.length - 1) return;
                    timeout = setTimeout(() => {
                        setIsDeleting(true);
                    }, pauseDuration);
                }
            }
        };

        if (currentCharIndex === 0 && !isDeleting && displayedText === '') {
            timeout = setTimeout(executeTypingAnimation, initialDelay);
        } else {
            executeTypingAnimation();
        }

        return () => clearTimeout(timeout);
    }, [
        currentCharIndex,
        displayedText,
        isDeleting,
        typingSpeed,
        deletingSpeed,
        pauseDuration,
        textArray,
        currentTextIndex,
        loop,
        initialDelay,
        isVisible,
        reverseMode,
        variableSpeed,
        onSentenceComplete,
        getRandomSpeed
    ]);

    const shouldHideCursor =
        hideCursorWhileTyping && (currentCharIndex < textArray[currentTextIndex].length || isDeleting);

    return createElement(
        Component,
        {
            ref: containerRef,
            className: `text-type ${className}`,
            ...props
        },
        <span className="text-type__content" style={{ color: getCurrentTextColor() || 'inherit' }}>
            {displayedText}
        </span>,
        showCursor && (
            <span
                ref={cursorRef}
                style={{
                    animationDuration: `${cursorBlinkDuration * 2}s`
                }}
                className={`text-type__cursor ${cursorClassName} ${shouldHideCursor ? 'text-type__cursor--hidden' : ''}`}
            >
                {cursorCharacter}
            </span>
        )
    );
};

// --- Ornate Frame SVG Component ---
const OrnateFrame = () => (
    <svg className="absolute inset-0 w-full h-full pointer-events-none" viewBox="0 0 1000 800" preserveAspectRatio="none">
        <defs>
            <linearGradient id="goldGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#d4af37" stopOpacity="0.8" />
                <stop offset="50%" stopColor="#f4e4b8" stopOpacity="1" />
                <stop offset="100%" stopColor="#b8860b" stopOpacity="0.8" />
            </linearGradient>

            <filter id="glow">
                <feGaussianBlur stdDeviation="3" result="coloredBlur" />
                <feMerge>
                    <feMergeNode in="coloredBlur" />
                    <feMergeNode in="SourceGraphic" />
                </feMerge>
            </filter>
        </defs>

        {/* Outer ornate border */}
        <path
            d="M 50,50 L 200,50 L 220,30 L 780,30 L 800,50 L 950,50 L 970,70 L 970,730 L 950,750 L 800,750 L 780,770 L 220,770 L 200,750 L 50,750 L 30,730 L 30,70 Z"
            fill="none"
            stroke="url(#goldGradient)"
            strokeWidth="3"
            filter="url(#glow)"
        />

        {/* Inner decorative border */}
        <path
            d="M 80,80 L 920,80 L 920,720 L 80,720 Z"
            fill="none"
            stroke="url(#goldGradient)"
            strokeWidth="1"
            opacity="0.5"
        />

        {/* Corner ornaments - Top Left */}
        <circle cx="50" cy="50" r="8" fill="url(#goldGradient)" filter="url(#glow)" />
        <path d="M 50,30 L 50,70 M 30,50 L 70,50" stroke="url(#goldGradient)" strokeWidth="2" />

        {/* Corner ornaments - Top Right */}
        <circle cx="950" cy="50" r="8" fill="url(#goldGradient)" filter="url(#glow)" />
        <path d="M 950,30 L 950,70 M 930,50 L 970,50" stroke="url(#goldGradient)" strokeWidth="2" />

        {/* Corner ornaments - Bottom Left */}
        <circle cx="50" cy="750" r="8" fill="url(#goldGradient)" filter="url(#glow)" />
        <path d="M 50,730 L 50,770 M 30,750 L 70,750" stroke="url(#goldGradient)" strokeWidth="2" />

        {/* Corner ornaments - Bottom Right */}
        <circle cx="950" cy="750" r="8" fill="url(#goldGradient)" filter="url(#glow)" />
        <path d="M 950,730 L 950,770 M 930,750 L 970,750" stroke="url(#goldGradient)" strokeWidth="2" />

        {/* Top center ornament */}
        <path d="M 480,30 Q 500,10 520,30" fill="none" stroke="url(#goldGradient)" strokeWidth="2" />
        <circle cx="500" cy="25" r="5" fill="#FFD700" className="animate-pulse" />

        {/* Bottom center ornament */}
        <path d="M 480,770 Q 500,790 520,770" fill="none" stroke="url(#goldGradient)" strokeWidth="2" />
        <circle cx="500" cy="775" r="5" fill="#FFD700" className="animate-pulse" />

        {/* Decorative flourishes on sides */}
        <path d="M 30,200 Q 20,250 30,300" fill="none" stroke="url(#goldGradient)" strokeWidth="1.5" opacity="0.6" />
        <path d="M 30,500 Q 20,550 30,600" fill="none" stroke="url(#goldGradient)" strokeWidth="1.5" opacity="0.6" />
        <path d="M 970,200 Q 980,250 970,300" fill="none" stroke="url(#goldGradient)" strokeWidth="1.5" opacity="0.6" />
        <path d="M 970,500 Q 980,550 970,600" fill="none" stroke="url(#goldGradient)" strokeWidth="1.5" opacity="0.6" />
    </svg>
);

// --- Divider Ornament ---
const DividerOrnament = ({ className }) => (
    <svg viewBox="0 0 300 20" fill="currentColor" className={className}>
        <path d="M 150,10 L 280,12 L 295,10 L 280,8 L 150,10 M 150,10 L 20,12 L 5,10 L 20,8 L 150,10" />
        <circle cx="150" cy="10" r="5" className="text-[#FFD700] drop-shadow-[0_0_8px_rgba(255,215,0,0.8)]" />
        <circle cx="80" cy="10" r="2" className="text-[#FFD700] opacity-60" />
        <circle cx="220" cy="10" r="2" className="text-[#FFD700] opacity-60" />
    </svg>
);

// --- Main About Component ---
export default function About() {
    const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
    const containerRef = useRef(null);

    const handleMouseMove = (e) => {
        if (containerRef.current) {
            const rect = containerRef.current.getBoundingClientRect();
            setMousePosition({
                x: e.clientX - rect.left,
                y: e.clientY - rect.top,
            });
        }
    };

    return (
        <section
            id="about"
            className="h-screen w-full bg-gradient-to-br from-[#0a0a0f] via-[#050505] to-[#0f0a05] text-[#d4cfc3] selection:bg-[#3d2b1f] selection:text-[#d4af37] flex items-center justify-center overflow-hidden snap-start relative"
            ref={containerRef}
            onMouseMove={handleMouseMove}
        >

            <style jsx>{`
        @import url('https://fonts.googleapis.com/css2?family=Cinzel:wght@400;500;600;700&family=Cormorant+Garamond:ital,wght@0,300;0,400;0,600;1,400&display=swap');

        .font-title {
          font-family: 'Cinzel', serif;
        }
        .font-body {
          font-family: 'Cormorant Garamond', serif;
        }
        
        .shimmer-text {
            background: linear-gradient(to right, #b88a44 20%, #ffecb3 50%, #b88a44 80%);
            background-size: 200% auto;
            color: transparent;
            -webkit-background-clip: text;
            background-clip: text;
            animation: shine 4s linear infinite;
        }
        @keyframes shine {
            to {
                background-position: 200% center;
            }
        }

        .float-animation {
            animation: float 6s ease-in-out infinite;
        }
        @keyframes float {
            0%, 100% { transform: translateY(0px); }
            50% { transform: translateY(-15px); }
        }

        .wand-light {
            background: radial-gradient(
                800px circle at var(--x) var(--y),
                rgba(212, 175, 55, 0.12),
                transparent 50%
            );
            position: absolute;
            inset: 0;
            pointer-events: none;
            z-index: 1;
        }

        .stat-glow:hover {
            color: #ffecb3;
            text-shadow: 0 0 15px rgba(255, 215, 0, 0.8);
            transform: scale(1.08);
            transition: all 0.3s ease;
        }

        .text-glow {
            text-shadow: 0 0 20px rgba(212, 175, 55, 0.3);
        }
      `}</style>

            {/* Wand Light Overlay */}
            <div className="wand-light" style={{ '--x': `${mousePosition.x}px`, '--y': `${mousePosition.y}px` }}></div>

            {/* Ornate Frame */}
            <OrnateFrame />

            {/* Content Container */}
            <div className="relative z-10 w-full h-full flex items-center justify-center p-8 md:p-16">
                <div className="max-w-5xl w-full float-animation">

                    {/* Title Section */}
                    <div className="flex flex-col items-center gap-6 mb-12">
                        <TextType
                            text={["ABOUT SITNOVATE"]}
                            typingSpeed={80}
                            cursorCharacter=""
                            loop={false}
                            className="text-4xl md:text-6xl font-title shimmer-text tracking-[0.2em] text-center font-bold text-glow"
                        />
                        <DividerOrnament className="w-80 h-6 text-[#d4af37]" />
                    </div>

                    {/* Content Section */}
                    <div className="space-y-8 text-[#c0c0c8] text-base md:text-lg leading-relaxed font-body text-center px-4 md:px-12">
                        <p className="text-justify">
                            <strong className="text-[#d4af37] font-title tracking-wide font-normal uppercase text-sm mr-2 border-b border-[#d4af37]/50 pb-1">SITNovate</strong>
                            <span className="first-letter:text-4xl first-letter:float-left first-letter:mr-3 first-letter:mt-1 first-letter:text-[#ffecb3] first-letter:font-title first-letter:drop-shadow-[0_0_8px_rgba(212,175,55,0.6)]">i</span>
                            s the flagship 24-hour hackathon organized by <span className="text-[#e5e5e5] italic hover:text-[#ffecb3] transition-colors cursor-pointer border-b border-dashed border-[#666] hover:border-[#d4af37]">Symbiosis Institute of Technology, Nagpur</span>. This premier innovation event brings together the brightest minds in technology to collaborate, compete, and create groundbreaking solutions that address real-world challenges.
                        </p>

                        <p className="text-justify">
                            Over the course of <span className="text-[#ffecb3] font-semibold tracking-wide">24 intensive hours</span>, participants work with cutting-edge technologies including AI/ML, blockchain, IoT, and web development frameworks. The event features expert mentorship from industry leaders, comprehensive technical support, and access to state-of-the-art development resources.
                        </p>

                        {/* Stats Section */}
                        <div className="mt-16 pt-12 border-t border-[#d4af37]/20 flex flex-wrap justify-center gap-x-24 gap-y-12 font-title tracking-widest text-xs uppercase">

                            <div className="flex flex-col items-center gap-3 stat-glow cursor-default group">
                                <span className="text-5xl text-[#d4af37] group-hover:scale-110 transition-transform duration-300 font-bold">700+</span>
                                <span className="opacity-70 group-hover:opacity-100 text-[#c0c0c8] tracking-[0.3em]">PAST PARTICIPANTS</span>
                            </div>

                            <div className="w-px h-16 bg-gradient-to-b from-transparent via-[#d4af37]/50 to-transparent hidden md:block"></div>

                            <div className="flex flex-col items-center gap-3 stat-glow cursor-default group">
                                <span className="text-5xl text-[#d4af37] group-hover:scale-110 transition-transform duration-300 font-bold">2 LAKH</span>
                                <span className="opacity-70 group-hover:opacity-100 text-[#c0c0c8] tracking-[0.3em]">PRIZE POOL</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Ambient particles effect */}
            <div className="absolute inset-0 pointer-events-none overflow-hidden">
                {[...Array(20)].map((_, i) => (
                    <div
                        key={i}
                        className="absolute w-1 h-1 bg-[#d4af37] rounded-full opacity-30"
                        style={{
                            left: `${Math.random() * 100}%`,
                            top: `${Math.random() * 100}%`,
                            animation: `float ${5 + Math.random() * 10}s ease-in-out infinite`,
                            animationDelay: `${Math.random() * 5}s`
                        }}
                    />
                ))}
            </div>
        </section>
    );
}
