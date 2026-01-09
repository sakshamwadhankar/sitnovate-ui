import React from 'react';
import Navbar from './components/layout/Navbar';
import Hero from './components/sections/Hero';
import About from './components/sections/About';
import WhatWeProvide from './components/sections/WhatWeProvide';
import EventHighlights from './components/sections/EventHighlights';
import Sponsors from './components/sections/Sponsors';
import OurTeam from './components/sections/OurTeam';
import GetInTouch from './components/sections/GetInTouch';

function App() {
  return (
    <>
      <Navbar />
      <main className="w-full h-full overflow-y-scroll overflow-x-hidden snap-y snap-mandatory scroll-smooth">
        <Hero />
        <About />
        <WhatWeProvide />
        <EventHighlights />
        <Sponsors />
        <OurTeam />
        <GetInTouch />
      </main>
    </>
  );
}

export default App;
// End of file
