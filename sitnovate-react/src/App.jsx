import React, { useState, useEffect, useRef } from 'react';
import Navbar from './components/layout/Navbar';
import Hero from './components/sections/Hero';
import About from './components/sections/About';
import WhatWeProvide from './components/sections/WhatWeProvide';
import EventHighlights from './components/sections/EventHighlights';
import Sponsors from './components/sections/Sponsors';
import OurTeam from './components/sections/OurTeam';
import GetInTouch from './components/sections/GetInTouch';

import ShaderDemo_ATC from './components/ui/atc-shader';

function App() {
  const [activeSection, setActiveSection] = useState(0);
  const isScrolling = useRef(false);
  const touchStartY = useRef(0);
  const TOTAL_SECTIONS = 7;

  // The "Instant Snap" logic - No Animation, Just Jump
  const handleScroll = (direction) => {
    if (isScrolling.current) return;

    if (direction === 'down' && activeSection < TOTAL_SECTIONS - 1) {
      scrollToSection(activeSection + 1);
    } else if (direction === 'up' && activeSection > 0) {
      scrollToSection(activeSection - 1);
    }
  };

  const scrollToSection = (index) => {
    if (index < 0 || index >= TOTAL_SECTIONS) return;

    isScrolling.current = true;
    setActiveSection(index);

    // Brief lock to prevent multi-skip (200ms as requested)
    setTimeout(() => {
      isScrolling.current = false;
    }, 200);
  };

  // Wheel Listener
  useEffect(() => {
    const onWheel = (e) => {
      e.preventDefault();
      // Threshold to ignore tiny trackpad jitters
      if (Math.abs(e.deltaY) > 30) {
        handleScroll(e.deltaY > 0 ? 'down' : 'up');
      }
    };

    window.addEventListener('wheel', onWheel, { passive: false });
    return () => window.removeEventListener('wheel', onWheel);
  }, [activeSection]);

  // Touch Listener
  useEffect(() => {
    const onTouchStart = (e) => {
      touchStartY.current = e.touches[0].clientY;
    };

    const onTouchMove = (e) => {
      e.preventDefault();
      const touchEndY = e.touches[0].clientY;
      const diff = touchStartY.current - touchEndY;

      if (Math.abs(diff) > 50) {
        handleScroll(diff > 0 ? 'down' : 'up');
      }
    };

    window.addEventListener('touchstart', onTouchStart, { passive: false });
    window.addEventListener('touchmove', onTouchMove, { passive: false });

    return () => {
      window.removeEventListener('touchstart', onTouchStart);
      window.removeEventListener('touchmove', onTouchMove);
    };
  }, [activeSection]);

  // Keyboard Navigation
  useEffect(() => {
    const onKeyDown = (e) => {
      if (['ArrowDown', 'PageDown', 'Space'].includes(e.code)) {
        e.preventDefault();
        handleScroll('down');
      } else if (['ArrowUp', 'PageUp'].includes(e.code)) {
        e.preventDefault();
        handleScroll('up');
      }
    };

    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [activeSection]);

  return (
    <>
      {/* Global Shader Background - Visible on all pages EXCEPT Hero (index 0) */}
      <div
        className={`fixed inset-0 z-0 transition-opacity duration-1000 ${activeSection === 0 ? 'opacity-0' : 'opacity-100'}`}
        style={{ pointerEvents: 'none' }}
      >
        <ShaderDemo_ATC />
        {/* Dark overlay to ensure text readability on top of shader */}
        <div className="absolute inset-0 bg-black/60 pointer-events-none"></div>
      </div>

      <Navbar currentSection={activeSection} onNavigate={scrollToSection} />

      {/* 
         Main Container: Fixed viewport.
         Inner Track: Instantly transforms.
         NO transition property -> Instant jump
      */}
      <main className="fixed inset-0 w-full h-full overflow-hidden bg-transparent">
        <div
          className="w-full h-full"
          style={{
            transform: `translateY(-${activeSection * 100}vh)`
            // No transition -> 0ms duration implies instant change
          }}
        >
          <Hero />
          <About />
          <WhatWeProvide />
          <EventHighlights />
          <Sponsors />
          <OurTeam />
          <GetInTouch />
        </div>
      </main>
    </>
  );
}

export default App;
