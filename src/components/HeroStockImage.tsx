
import React from "react";

// Array of high-quality Unsplash hero photos for sync with carousel
export const HERO_IMAGES = [{
  img: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=1200&q=90",
  text: "Smart analytics for better decisions."
}, {
  img: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=1200&q=90",
  text: "Track expenses with beautiful charts."
}, {
  img: "https://images.unsplash.com/photo-1554224155-6726b3ff858f?auto=format&fit=crop&w=1200&q=90",
  text: "Your money, organized and secure."
}, {
  img: "https://images.unsplash.com/photo-1563013544-824ae1b704d3?auto=format&fit=crop&w=1200&q=90",
  text: "Save more, stress less."
}, {
  img: "https://images.unsplash.com/photo-1590736969955-71cc94901144?auto=format&fit=crop&w=1200&q=90",
  text: "Budgeting that actually works."
}, {
  img: "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?auto=format&fit=crop&w=1200&q=90",
  text: "Financial insights at your fingertips."
}, {
  img: "https://images.unsplash.com/photo-1579621970563-ebec7560ff3e?auto=format&fit=crop&w=1200&q=90",
  text: "Real-time financial monitoring."
}, {
  img: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=1200&q=90",
  text: "Investment tracking simplified."
}];

const LOGO_SRC = "/lovable-uploads/62637124-2993-4040-a176-d1e9ed77f87d.png";
export const HERO_LOGO_SRC = LOGO_SRC;

const HeroStockImage: React.FC<{
  activeIndex?: number;
}> = ({
  activeIndex = 0
}) => {
  const hero = HERO_IMAGES[activeIndex % HERO_IMAGES.length];
  return (
    <div className="w-full max-w-2xl mx-auto">
      <div className="transition-opacity duration-700 ease-in-out">
        <img
          src={hero.img}
          alt={hero.text}
          className="rounded-xl w-full h-64 object-cover shadow-lg transition-all duration-1000 ease-in-out transform"
          draggable={false}
          style={{
            filter: 'brightness(1.1) contrast(1.05)',
          }}
        />
      </div>
    </div>
  );
};

export default HeroStockImage;
