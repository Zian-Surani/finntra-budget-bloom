
import React from "react";

// Unsplash photo: Woman sitting on a bed with laptop (secure workspace, soft friendly look)
const HERO_IMG_URL =
  "https://images.unsplash.com/photo-1649972904349-6e44c42644a7?auto=format&fit=crop&w=400&q=80";

const HeroStockImage: React.FC = () => (
  <img
    src={HERO_IMG_URL}
    alt="Safe and secure budgeting"
    className="h-24 w-24 sm:h-32 sm:w-32 rounded-full bg-white ring-4 ring-blue-200 dark:ring-blue-700 shadow-lg mb-4 z-10 mx-auto animate-scale-in object-cover object-center"
    style={{ backgroundColor: "#fff" }}
    loading="eager"
    draggable={false}
  />
);

export default HeroStockImage;
