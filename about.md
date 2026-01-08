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

const CornerOrnament = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 100 100" fill="currentColor" className={className}>
    <path d="M0,0 L30,0 C45,0 45,15 60,15 C75,15 85,5 100,0 L100,30 C95,45 80,45 80,60 C80,75 90,85 100,100 L70,100 C55,100 55,85 40,85 C25,85 15,95 0,100 L0,70 C5,55 20,55 20,40 C20,25 10,15 0,0 Z M10,10 L15,10 C20,10 20,20 10,20 L10,15 Z" />
    <path d="M25,25 C40,25 40,40 25,40 C10,40 10,25 25,25 Z" opacity="0.5"/>
  </svg>
);

const DividerOrnament = ({ className }: { className?: string }) => (
    <svg viewBox="0 0 200 20" fill="currentColor" className={className}>
        <path d="M100,10 L180,12 L190,10 L180,8 L100,10 M100,10 L20,12 L10,10 L20,8 L100,10" />
        <circle cx="100" cy="10" r="3" />
    </svg>
)

// --- Main App Component (Isolated Decree Box) ---

export default function App() {
  return (
    <div className="min-h-screen bg-[#050505] text-[#d4cfc3] p-4 md:p-8 selection:bg-[#3d2b1f] selection:text-[#d4af37] flex items-center justify-center">
      
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cinzel:wght@400;500;600;700&family=Cormorant+Garamond:ital,wght@0,300;0,400;0,600;1,400&display=swap');

        /* Fonts */
        .font-title {
          font-family: 'Cinzel', serif;
        }
        .font-body {
          font-family: 'Cormorant Garamond', serif;
        }
        
        /* Typography Scale & Spacing */
        .tracking-cinema {
          letter-spacing: 0.15em;
        }
        
        /* Cursor Styling */
        .text-type {
          display: inline-block;
          white-space: pre-wrap;
        }
        .text-type__cursor {
          margin-left: 0.05em;
          display: inline-block;
          opacity: 0.8;
          font-weight: 200;
          animation: text-type-blink infinite;
          color: #d4af37; /* Muted Metallic Gold */
        }
        .text-type__cursor--hidden {
          display: none;
        }
        @keyframes text-type-blink {
          0%, 100% { opacity: 0.8; }
          50% { opacity: 0.1; }
        }

        /* Atmospheric Effects */
        .vignette-bg {
           background: radial-gradient(circle at 50% 50%, #1a1a1e 0%, #050505 85%);
        }
        
        .noise-overlay {
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            pointer-events: none;
            z-index: 50;
            opacity: 0.03;
            background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E");
        }

        /* Frame & Glows */
        .magical-frame {
           position: relative;
           background: rgba(10, 10, 12, 0.6);
           border: 1px solid rgba(212, 175, 55, 0.15);
           box-shadow: 0 0 40px rgba(0,0,0,0.9) inset;
        }
        
        /* Corners Cut (Chamfered) */
        .chamfered-box {
            clip-path: polygon(
                20px 0, 100% 0, 
                100% calc(100% - 20px), calc(100% - 20px) 100%, 
                0 100%, 0 20px
            );
        }

        .candle-glow {
            text-shadow: 0 0 15px rgba(212, 175, 55, 0.25);
        }
        
        .glass-panel {
            backdrop-filter: blur(2px);
        }
      `}</style>

      {/* Background Layers */}
      <div className="fixed inset-0 vignette-bg pointer-events-none" />
      <div className="noise-overlay" />

      <div className="max-w-4xl w-full relative z-10">
        
        {/* About SITNovate - Ornate Frame Implementation */}
        <div className="relative">
            {/* The Frame Container */}
            <div className="relative magical-frame chamfered-box p-12 md:p-16 glass-panel">
                
                {/* Decorative Corners (SVGs) */}
                <CornerOrnament className="absolute top-0 left-0 w-24 h-24 text-[#8a7030] opacity-40 -translate-x-2 -translate-y-2" />
                <CornerOrnament className="absolute top-0 right-0 w-24 h-24 text-[#8a7030] opacity-40 scale-x-[-1] translate-x-2 -translate-y-2" />
                <CornerOrnament className="absolute bottom-0 left-0 w-24 h-24 text-[#8a7030] opacity-40 scale-y-[-1] -translate-x-2 translate-y-2" />
                <CornerOrnament className="absolute bottom-0 right-0 w-24 h-24 text-[#8a7030] opacity-40 scale-[-1] translate-x-2 translate-y-2" />
                
                {/* Inner Border Line (Thin Gold) */}
                <div className="absolute inset-4 border border-[#d4af37]/10 pointer-events-none chamfered-box" />

                <div className="relative z-10 space-y-10">
                    <div className="flex flex-col items-center gap-4">
                        <TextType
                            text={["Decree: SITNovate"]}
                            typingSpeed={80}
                            cursorCharacter=""
                            loop={false}
                            className="text-2xl md:text-4xl font-title text-[#e5e5e5] tracking-[0.2em] uppercase text-center font-bold text-shadow-sm"
                        />
                        <DividerOrnament className="w-64 h-6 text-[#d4af37]/40" />
                    </div>

                    <div className="space-y-8 text-[#b8b8c0] text-lg md:text-xl leading-relaxed font-body text-justify px-2 md:px-8">
                        <p>
                            <strong className="text-[#c5a059] font-title tracking-wide font-normal uppercase text-sm mr-1">Proclamation:</strong> 
                            <span className="first-letter:text-4xl first-letter:float-left first-letter:mr-2 first-letter:mt-[-6px] first-letter:text-[#d4af37] first-letter:font-title">S</span>
                            ITNovate stands as the flagship 24-hour innovation catalyst organized by the scholars of <span className="text-[#d4d4d4] italic border-b border-[#444] pb-0.5 hover:border-[#d4af37] transition-colors">Symbiosis Institute of Technology, Nagpur</span>. This gathering summons the most brilliant minds in technology to collaborate and forge groundbreaking solutions for the realm's most pressing challenges.
                        </p>
                    
                        <p>
                            Over the course of <span className="text-[#e5e5e5] font-semibold">24 intensive hours</span>, initiates work with advanced arts including Artificial Intelligence, Blockchain, and the Internet of Things. The assembly features guidance from distinguished masters of the industry and access to unparalleled resources.
                        </p>

                        <div className="mt-12 pt-8 border-t border-[#d4af37]/10 flex flex-wrap justify-center gap-x-12 gap-y-6 text-base opacity-70 font-title tracking-widest text-xs uppercase">
                            <div className="flex flex-col items-center gap-2">
                                <span className="text-xl text-[#c5a059]">49</span>
                                <span>Covens (Teams)</span>
                            </div>
                            <div className="w-px h-10 bg-[#d4af37]/20 hidden md:block"></div>
                            <div className="flex flex-col items-center gap-2">
                                <span className="text-xl text-[#c5a059]">800+</span>
                                <span>Wizards</span>
                            </div>
                             <div className="w-px h-10 bg-[#d4af37]/20 hidden md:block"></div>
                            <div className="flex flex-col items-center gap-2">
                                <span className="text-xl text-[#c5a059]">1 Lakh</span>
                                <span>Galleons</span>
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