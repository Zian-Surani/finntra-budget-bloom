import React from "react";

// Array of Unsplash hero photos for sync with carousel
const HERO_IMAGES = ["https://images.unsplash.com/photo-1649972904349-6e44c42644a7?auto=format&fit=crop&w=400&q=80", "https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?auto=format&fit=crop&w=400&q=80", "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&w=400&q=80", "https://images.unsplash.com/photo-1488590528505-98d2b5aba04b?auto=format&fit=crop&w=400&q=80"];

// FinnTra Logo (as background)
const LOGO_SRC = "/lovable-uploads/62637124-2993-4040-a176-d1e9ed77f87d.png";
const HeroStockImage: React.FC<{
  activeIndex?: number;
}> = ({
  activeIndex
}) => {
  const imgSrc = HERO_IMAGES[activeIndex ?? 0] || HERO_IMAGES[0];
  return <div className="relative h-28 w-28 sm:h-36 sm:w-36 mx-auto flex items-center justify-center bg-[#000a00]">
      <img src={LOGO_SRC} alt="FinnTra Logo" className="absolute left-0 top-0 h-full w-full opacity-40 blur-[1.5px] z-0 pointer-events-none rounded-full" draggable={false} style={{
      filter: "blur(1.5px)"
    }} />
      
    </div>;
};
export default HeroStockImage;