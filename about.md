import React, { useState, useEffect, useRef, useMemo, useCallback, createElement, ElementType } from 'react';

// --- TextType Component (Logic Unchanged) ---

interface TextTypeProps {
  className?: string;
  showCursor?: boolean;
  hideCursorWhileTyping?: boolean;
  cursorCharacter?: string | React.ReactNode;
  cursorBlinkDuration?: number;
  cursorClassName?: string;
  text: string | string[];
  as?: ElementType;
  typingSpeed?: number;
  initialDelay?: number;
  pauseDuration?: number;
  deletingSpeed?: number;
  loop?: boolean;
  textColors?: string[];
  variableSpeed?: { min: number; max: number };
  onSentenceComplete?: (sentence: string, index: number) => void;
  startOnVisible?: boolean;
  reverseMode?: boolean;
}

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
}: TextTypeProps & React.HTMLAttributes<HTMLElement>) => {
  const [displayedText, setDisplayedText] = useState('');
  const [currentCharIndex, setCurrentCharIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);
  const [currentTextIndex, setCurrentTextIndex] = useState(0);
  const [isVisible, setIsVisible] = useState(!startOnVisible);
  
  const cursorRef = useRef<HTMLSpanElement>(null);
  const containerRef = useRef<HTMLElement>(null);
  
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

    let timeout: NodeJS.Timeout;
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
          timeout = setTimeout(() => {}, pauseDuration);
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
        } else if (textArray.length >= 1) {
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

// --- Decorative SVG Components ---

const CornerAccent = ({ className, rotate = 0 }: { className?: string; rotate?: number }) => (
  <svg 
    viewBox="0 0 40 40" 
    fill="none" 
    className={className} 
    style={{ transform: `rotate(${rotate}deg)` }}
  >
    <path d="M0,40 L0,10 C0,5 5,0 10,0 L40,0 L40,4 L12,4 C8,4 4,8 4,12 L4,40 Z" fill="currentColor" />
    <circle cx="8" cy="8" r="2" fill="#FFD700" className="animate-pulse" />
  </svg>
);

const DividerOrnament = ({ className }: { className?: string }) => (
    <svg viewBox="0 0 200 20" fill="currentColor" className={className}>
        <path d="M100,10 L180,12 L190,10 L180,8 L100,10 M100,10 L20,12 L10,10 L20,8 L100,10" />
        <circle cx="100" cy="10" r="4" className="text-[#FFD700] drop-shadow-[0_0_8px_rgba(255,215,0,0.8)]" />
    </svg>
)

// --- Main App Component ---

export default function App() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const containerRef = useRef<HTMLDivElement>(null);

  const handleMouseMove = (e: React.MouseEvent) => {
    if (containerRef.current) {
      const rect = containerRef.current.getBoundingClientRect();
      setMousePosition({
        x: e.clientX - rect.left,
        y: e.clientY - rect.top,
      });
    }
  };

  return (
    <div className="min-h-screen bg-[#050505] text-[#d4cfc3] p-4 md:p-8 selection:bg-[#3d2b1f] selection:text-[#d4af37] flex items-center justify-center overflow-hidden">
      
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cinzel:wght@400;500;600;700&family=Cormorant+Garamond:ital,wght@0,300;0,400;0,600;1,400&display=swap');

        /* Fonts */
        .font-title {
          font-family: 'Cinzel', serif;
        }
        .font-body {
          font-family: 'Cormorant Garamond', serif;
        }
        
        /* Shimmer Effect for Title */
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

        /* Floating Animation */
        .float-animation {
            animation: float 6s ease-in-out infinite;
        }
        @keyframes float {
            0% { transform: translateY(0px); }
            50% { transform: translateY(-10px); }
            100% { transform: translateY(0px); }
        }

        /* Wand Light Effect */
        .wand-light {
            background: radial-gradient(
                600px circle at var(--x) var(--y),
                rgba(212, 175, 55, 0.15),
                transparent 40%
            );
            position: absolute;
            inset: 0;
            pointer-events: none;
            z-index: 2;
        }
        
        /* Gothic Plaque Shape */
        .gothic-plaque {
           position: relative;
           background: rgba(12, 12, 15, 0.9);
           /* Complex polygon clip-path for a 'Notched' look */
           clip-path: polygon(
             0% 20px,                 /* Top Left start */
             20px 20px,               /* Top Left notch H */
             20px 0%,                 /* Top Left notch V */
             calc(100% - 20px) 0%,    /* Top Right notch V */
             calc(100% - 20px) 20px,  /* Top Right notch H */
             100% 20px,               /* Top Right start */
             100% calc(100% - 20px),  /* Bottom Right start */
             calc(100% - 20px) calc(100% - 20px), /* Bottom Right notch H */
             calc(100% - 20px) 100%,  /* Bottom Right notch V */
             20px 100%,               /* Bottom Left notch V */
             20px calc(100% - 20px),  /* Bottom Left notch H */
             0% calc(100% - 20px)     /* Bottom Left start */
           );
           
           /* We use filter drop-shadow because box-shadow is clipped by clip-path */
           filter: drop-shadow(0 0 20px rgba(0,0,0,0.8)) drop-shadow(0 0 10px rgba(212, 175, 55, 0.15));
           transition: filter 0.3s ease;
        }
        
        .gothic-plaque:hover {
           filter: drop-shadow(0 0 30px rgba(0,0,0,0.9)) drop-shadow(0 0 15px rgba(212, 175, 55, 0.25));
        }

        .stat-glow:hover {
            color: #ffecb3;
            text-shadow: 0 0 10px rgba(255, 215, 0, 0.6);
            transform: scale(1.05);
            transition: all 0.3s ease;
        }
        
        /* Inner Border Simulator */
        .inner-border {
             position: absolute;
             inset: 4px;
             background: transparent;
             border: 1px solid rgba(212, 175, 55, 0.15);
             clip-path: polygon(
                 0% 20px, 20px 20px, 20px 0%, 
                 calc(100% - 20px) 0%, calc(100% - 20px) 20px, 100% 20px, 
                 100% calc(100% - 20px), calc(100% - 20px) calc(100% - 20px), calc(100% - 20px) 100%, 
                 20px 100%, 20px calc(100% - 20px), 0% calc(100% - 20px)
             );
             pointer-events: none;
        }
      `}</style>

      {/* Background Layers Removed */}

      <div className="max-w-4xl w-full relative z-10 float-animation" ref={containerRef} onMouseMove={handleMouseMove}>
        
        {/* Wand Light Overlay */}
        <div className="wand-light" style={{ '--x': `${mousePosition.x}px`, '--y': `${mousePosition.y}px` } as React.CSSProperties}></div>

        {/* About SITNovate - Gothic Plaque */}
        <div className="relative transform transition-transform duration-500 py-8">
            
            {/* The Plaque Container */}
            <div className="gothic-plaque p-12 md:p-16 backdrop-blur-sm bg-gradient-to-b from-[#15151a] to-[#0a0a0c]">
                
                {/* Decorative Inner Line */}
                <div className="inner-border"></div>
                
                {/* Gold Corner Accents (Placed manually to align with notches) */}
                <CornerAccent className="absolute top-[20px] left-[20px] w-8 h-8 text-[#b88a44] opacity-80 -translate-x-full -translate-y-full" rotate={0} />
                <CornerAccent className="absolute top-[20px] right-[20px] w-8 h-8 text-[#b88a44] opacity-80 translate-x-full -translate-y-full" rotate={90} />
                <CornerAccent className="absolute bottom-[20px] right-[20px] w-8 h-8 text-[#b88a44] opacity-80 translate-x-full translate-y-full" rotate={180} />
                <CornerAccent className="absolute bottom-[20px] left-[20px] w-8 h-8 text-[#b88a44] opacity-80 -translate-x-full translate-y-full" rotate={270} />

                <div className="relative z-10 space-y-10">
                    <div className="flex flex-col items-center gap-4">
                        <div className="relative">
                            <TextType
                                text={["About SITNovate"]}
                                typingSpeed={80}
                                cursorCharacter=""
                                loop={false}
                                className="text-3xl md:text-5xl font-title shimmer-text tracking-[0.15em] uppercase text-center font-bold drop-shadow-2xl"
                            />
                            {/* Glow under title */}
                            <div className="absolute -inset-4 bg-[#d4af37]/10 blur-xl rounded-full -z-10"></div>
                        </div>
                        <DividerOrnament className="w-72 h-8 text-[#d4af37] opacity-80" />
                    </div>

                    <div className="space-y-8 text-[#c0c0c8] text-lg md:text-xl leading-relaxed font-body text-justify px-2 md:px-8 drop-shadow-md">
                        <p>
                            <strong className="text-[#d4af37] font-title tracking-wide font-normal uppercase text-sm mr-2 border-b border-[#d4af37]/50 pb-1">SITNovate</strong> 
                            <span className="first-letter:text-5xl first-letter:float-left first-letter:mr-3 first-letter:mt-[-4px] first-letter:text-[#ffecb3] first-letter:font-title first-letter:drop-shadow-[0_0_5px_rgba(212,175,55,0.5)]">i</span>
                            s the flagship 24-hour hackathon organized by <span className="text-[#e5e5e5] italic hover:text-[#ffecb3] transition-colors cursor-pointer border-b border-dashed border-[#666] hover:border-[#d4af37]">Symbiosis Institute of Technology, Nagpur</span>. This premier innovation event brings together the brightest minds in technology to collaborate, compete, and create groundbreaking solutions that address real-world challenges.
                        </p>
                    
                        <p>
                            Over the course of <span className="text-[#ffecb3] font-semibold tracking-wide">24 intensive hours</span>, participants work with cutting-edge technologies including AI/ML, blockchain, IoT, and web development frameworks. The event features expert mentorship from industry leaders, comprehensive technical support, and access to state-of-the-art development resources.
                        </p>

                        <div className="mt-12 pt-8 border-t border-[#d4af37]/20 flex flex-wrap justify-center gap-x-16 gap-y-8 font-title tracking-widest text-xs uppercase relative">
                            {/* Animated Stats */}
                            
                            <div className="flex flex-col items-center gap-2 stat-glow cursor-default group">
                                <span className="text-3xl text-[#d4af37] group-hover:scale-110 transition-transform duration-300">700+</span>
                                <span className="opacity-60 group-hover:opacity-100">Past Participants</span>
                            </div>
                            
                            <div className="w-px h-12 bg-gradient-to-b from-transparent via-[#d4af37]/40 to-transparent hidden md:block"></div>
                            
                            <div className="flex flex-col items-center gap-2 stat-glow cursor-default group">
                                <span className="text-3xl text-[#d4af37] group-hover:scale-110 transition-transform duration-300">2 Lakh</span>
                                <span className="opacity-60 group-hover:opacity-100">Prize Pool</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
      </div>
    </div>
  );
}