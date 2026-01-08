import React from 'react';
import { 
  Feather, 
  Scroll, 
  Zap, 
  FlaskConical, 
  Scale, 
  Crown,
  Image as ImageIcon // Renamed to avoid conflict with HTML Image
} from 'lucide-react';

const Sponsors = () => {
  // ----------------------------------------------------------------
  // EDIT HERE: Update this list with the names and image paths
  // ----------------------------------------------------------------
  const silverSponsors = [
    { 
      name: "Sponsor 1 Name", // REPLACE THIS
      description: "Past Sponsor", 
      image: "image_49f741.jpg", 
      icon: <Feather size={32} /> 
    },
    { 
      name: "Sponsor 2 Name", // REPLACE THIS
      description: "Past Sponsor", 
      image: "image_4ccb66.png", 
      icon: <Zap size={32} /> 
    },
    { 
      name: "Sponsor 3 Name", // REPLACE THIS
      description: "Past Sponsor", 
      image: "image_4da9df.jpg", 
      icon: <FlaskConical size={32} /> 
    },
    { 
      name: "Sponsor 4 Name", 
      description: "Past Sponsor", 
      image: null, // Add image path here
      icon: <Scroll size={32} /> 
    },
    { 
      name: "Sponsor 5 Name", 
      description: "Past Sponsor", 
      image: null, 
      icon: <Scale size={32} /> 
    },
    { 
      name: "Sponsor 6 Name", 
      description: "Past Sponsor", 
      image: null, 
      icon: <Crown size={32} /> 
    },
    { 
      name: "Sponsor 7 Name", 
      description: "Past Sponsor", 
      image: null, 
      icon: <Feather size={32} /> 
    },
    { 
      name: "Sponsor 8 Name", 
      description: "Past Sponsor", 
      image: null, 
      icon: <Zap size={32} /> 
    },
  ];
  // ----------------------------------------------------------------

  return (
    <>
      <style>
        {`@import url('https://fonts.googleapis.com/css2?family=Cinzel:wght@400;700;900&family=Crimson+Text:ital,wght@0,400;0,600;1,400&display=swap');`}
      </style>

      {/* Main container with black background */}
      <div className="bg-black min-h-screen w-full py-20 relative overflow-hidden">
        
        {/* Subtle Background Elements */}
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-[#d4af37]/5 rounded-full blur-[120px] pointer-events-none"></div>
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-purple-900/10 rounded-full blur-[120px] pointer-events-none"></div>

        <div className="max-w-7xl mx-auto px-6 relative z-10">
            
            {/* Section Title */}
            <div className="text-center mb-20">
              <div className="flex items-center justify-center gap-4 opacity-70 mb-3">
                 <span className="h-px w-12 bg-gradient-to-r from-transparent to-[#d4af37]"></span>
                 <span className="text-[#d4af37] text-xs font-['Cinzel'] tracking-[0.3em] font-bold">OUR BENEFACTORS</span>
                 <span className="h-px w-12 bg-gradient-to-l from-transparent to-[#d4af37]"></span>
              </div>
              
              <h2 className="text-4xl md:text-6xl font-['Cinzel'] font-bold text-white drop-shadow-[0_2px_10px_rgba(212,175,55,0.3)]">
                Past Sponsors
              </h2>
              
              <p className="mt-4 text-[#8a8a8a] font-['Crimson_Text'] text-lg italic">
                "Those who fuel the magic"
              </p>
            </div>

            {/* Ministry Class (Secondary Sponsors) */}
            <div>
              <div className="flex justify-center items-center gap-3 mb-10">
                <ShieldIcon size={16} className="text-gray-400" />
                <h3 className="text-lg font-['Cinzel'] text-gray-400 tracking-widest uppercase border-b border-gray-600 pb-1">Ministry Approved</h3>
                <ShieldIcon size={16} className="text-gray-400" />
              </div>

              {/* Updated Grid: 1 col mobile, 2 cols tablet, 4 cols desktop (4x2 layout) */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 px-4">
                {silverSponsors.map((sponsor, index) => (
                  <SponsorCard 
                    key={index}
                    name={sponsor.name} 
                    description={sponsor.description}
                    image={sponsor.image}
                    icon={sponsor.icon} 
                    tier="silver"
                  />
                ))}
              </div>
            </div>

          </div>
      </div>
    </>
  );
};

// Reusable Sponsor Plaque Component - SHIELD SHAPE
const SponsorCard = ({ name, description, image, icon, tier }) => {
  const isGold = tier === 'gold';
  const borderColor = isGold ? '#d4af37' : '#a0a0a0';
  const glowColor = isGold ? 'rgba(212,175,55,0.2)' : 'rgba(160,160,160,0.1)';

  return (
    <div className="group relative h-64 cursor-pointer perspective-1000">
      
      {/* Glow Effect matching Shield Shape */}
      <div 
        className="absolute -inset-1 rounded-t-2xl rounded-b-[6rem] opacity-0 group-hover:opacity-40 blur-xl transition duration-700"
        style={{ background: `radial-gradient(circle at center, ${glowColor}, transparent)` }}
      ></div>

      {/* Main Card Frame - Shield Shape */}
      <div 
        className="relative h-full bg-[#0a0a0a] transition-all duration-500 group-hover:-translate-y-2 rounded-t-2xl rounded-b-[6rem] overflow-hidden"
        style={{ 
            boxShadow: `0 0 0 1px ${borderColor}33` // Subtle border using shadow to avoid layout shifts
        }} 
      >
        {/* Inner Border (The Frame) */}
        <div className="h-full w-full p-6 flex flex-col items-center justify-center text-center relative bg-[#111] rounded-t-2xl rounded-b-[6rem]"
             style={{ border: `1px solid ${borderColor}1A` }} 
        >
          
          {/* Decorative Top Bolt */}
          <div className="absolute top-4 left-1/2 transform -translate-x-1/2 w-2 h-2 rounded-full opacity-50"
               style={{ backgroundColor: borderColor }}></div>

          {/* Background Icon Faded (Only show if no image, or as subtle texture) */}
          {!image && (
            <div className="absolute -right-4 -bottom-10 opacity-[0.03] group-hover:opacity-[0.08] transform -rotate-12 transition-all duration-700 scale-[2]"
                 style={{ color: borderColor }}>
              {icon}
            </div>
          )}

          {/* Icon/Image Container */}
          <div className={`mb-6 p-4 rounded-xl rotate-45 group-hover:rotate-0 transition-all duration-500 bg-black/40 border border-white/5 flex items-center justify-center overflow-hidden relative z-10`}
               style={{ 
                 boxShadow: `0 0 15px ${borderColor}1A`,
                 width: '80px',
                 height: '80px'
               }}>
            
            <div className="-rotate-45 group-hover:rotate-0 transition-all duration-500 w-full h-full flex items-center justify-center" style={{ color: borderColor }}>
                {image ? (
                  <img 
                    src={image} 
                    alt={name} 
                    className="w-full h-full object-contain filter grayscale group-hover:grayscale-0 transition-all duration-500" 
                  />
                ) : (
                  icon
                )}
            </div>
          </div>

          {/* Text Content */}
          <h4 className={`font-['Cinzel'] font-bold tracking-wider text-white transition-colors duration-300 z-10 ${isGold ? 'text-xl' : 'text-lg'}`}>
            {name}
          </h4>
          <p className="font-['Crimson_Text'] text-gray-500 italic text-sm mt-2 opacity-60 group-hover:opacity-100 transition-opacity duration-500 z-10">
            {description}
          </p>
          
          {/* Bottom Shine */}
          <div className="absolute bottom-0 left-0 w-full h-1/3 bg-gradient-to-t from-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-b-[6rem]"></div>

        </div>
      </div>
    </div>
  );
};

// Custom Icon wrapper to avoid collision
const ShieldIcon = ({ size, className }) => (
    <svg 
      xmlns="http://www.w3.org/2000/svg" 
      width={size} 
      height={size} 
      viewBox="0 0 24 24" 
      fill="none" 
      stroke="currentColor" 
      strokeWidth="2" 
      strokeLinecap="round" 
      strokeLinejoin="round" 
      className={className}
    >
      <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10" />
    </svg>
);

export default Sponsors;