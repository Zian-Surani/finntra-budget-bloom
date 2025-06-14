
import React from "react";

// Unsplash photo for secure workspace, soft friendly look
const HERO_IMG_URL =
  "https://images.unsplash.com/photo-1649972904349-6e44c42644a7?auto=format&fit=crop&w=400&q=80";

// FinnTra Logo (as background)
const LOGO_SRC = "/lovable-uploads/62637124-2993-4040-a176-d1e9ed77f87d.png";

const HeroStockImage: React.FC = () => (
  <div className="relative h-28 w-28 sm:h-36 sm:w-36 mx-auto flex items-center justify-center">
    <img
      src={LOGO_SRC}
      alt="FinnTra Logo"
      className="absolute left-0 top-0 h-full w-full opacity-30 blur-[2px] z-0 pointer-events-none rounded-full"
      draggable={false}
      style={{filter: "blur(2px)",}}
    />
    <img
      src={HERO_IMG_URL}
      alt="Safe and secure budgeting"
      className="h-24 w-24 sm:h-32 sm:w-32 rounded-full bg-white ring-4 ring-blue-200 dark:ring-blue-700 shadow-lg mb-4 z-10 object-cover object-center"
      style={{ backgroundColor: "#fff", position: "relative" }}
      loading="eager"
      draggable={false}
    />
    <span className="absolute -top-6 left-1/2 -translate-x-1/2 bg-gradient-to-br from-indigo-400 via-fuchsia-300 to-amber-200 text-white rounded-full px-4 py-2 text-base font-bold shadow-lg rotate-[-9deg] animate-fade-in"
          style={{letterSpacing: 0.5, zIndex: 20, boxShadow: "0 4px 32px #e0e7ff"}}
    >
      Hi! I'm Secure
    </span>
  </div>
);

export default HeroStockImage;
