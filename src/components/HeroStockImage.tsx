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
  return;
};
export default HeroStockImage;