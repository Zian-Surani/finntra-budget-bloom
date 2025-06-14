
import React from "react";

// Array of Unsplash hero photos for sync with carousel, expanded with more images and descriptive texts
export const HERO_IMAGES = [{
  img: "https://images.unsplash.com/photo-1649972904349-6e44c42644a7?auto=format&fit=crop&w=900&q=80",
  text: "Plan smarter, reach your goals faster."
}, {
  img: "https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?auto=format&fit=crop&w=900&q=80",
  text: "All your accounts, insights and budgets in one place."
}, {
  img: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&w=900&q=80",
  text: "Visualize your progress and stay motivated!"
}, {
  img: "https://images.unsplash.com/photo-1488590528505-98d2b5aba04b?auto=format&fit=crop&w=900&q=80",
  text: "Secure. Private. Only you own your data."
}, {
  img: "https://images.unsplash.com/photo-1531297484001-80022131f5a1?auto=format&fit=crop&w=900&q=80",
  text: "Colorful analytics made simple."
}, {
  img: "https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&w=900&q=80",
  text: "Effortless tracking, beautiful reports."
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
        className="rounded-xl w-full h-64 object-cover shadow-lg"
        draggable={false}
      />
    </div>
  );
};

export default HeroStockImage;
