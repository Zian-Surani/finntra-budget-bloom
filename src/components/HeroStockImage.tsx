
import React from "react";

// Array of Unsplash hero photos for sync with carousel, expanded with more images and descriptive texts
export const HERO_IMAGES = [{
  img: "https://images.unsplash.com/photo-1560472354-b33ff0c44a43?auto=format&fit=crop&w=900&q=80",
  text: "Smart financial planning made simple."
}, {
  img: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=900&q=80",
  text: "Track expenses with beautiful analytics."
}, {
  img: "https://images.unsplash.com/photo-1554224155-6726b3ff858f?auto=format&fit=crop&w=900&q=80",
  text: "Your money, organized and secure."
}, {
  img: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=900&q=80",
  text: "Financial insights at your fingertips."
}, {
  img: "https://images.unsplash.com/photo-1590736969955-71cc94901144?auto=format&fit=crop&w=900&q=80",
  text: "Budgeting that actually works."
}, {
  img: "https://images.unsplash.com/photo-1563013544-824ae1b704d3?auto=format&fit=crop&w=900&q=80",
  text: "Save more, stress less."
}, {
  img: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=900&q=80",
  text: "Investment tracking simplified."
}, {
  img: "https://images.unsplash.com/photo-1579621970563-ebec7560ff3e?auto=format&fit=crop&w=900&q=80",
  text: "Real-time financial monitoring."
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
      <img
        src={hero.img}
        alt={hero.text}
        className="rounded-xl w-full h-64 object-cover shadow-lg transition-all duration-700 ease-in-out transform"
        draggable={false}
        style={{
          filter: 'brightness(1.1) contrast(1.05)',
        }}
      />
    </div>
  );
};

export default HeroStockImage;
