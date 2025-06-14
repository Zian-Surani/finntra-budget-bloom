
import React, { useEffect, useRef, useState } from "react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

const mockups = [
  {
    img: "https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?auto=format&fit=crop&w=600&q=80",
    alt: "Mobile expense tracker mockup",
  },
  {
    img: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&w=600&q=80",
    alt: "Tablet budgeting mockup",
  },
  {
    img: "https://images.unsplash.com/photo-1488590528505-98d2b5aba04b?auto=format&fit=crop&w=600&q=80",
    alt: "Charts finance dashboard mockup",
  },
  {
    img: "https://images.unsplash.com/photo-1519389950473-47ba0277781c?auto=format&fit=crop&w=600&q=80",
    alt: "People budgeting together",
  },
];

const AUTO_SCROLL_INTERVAL = 2500; // ms

interface CarouselProps {
  onSlideChange?: (index: number) => void;
}

const LandingMockupCarousel: React.FC<CarouselProps> = ({ onSlideChange }) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);
  const mockupCount = mockups.length;

  useEffect(() => {
    if (intervalRef.current) clearInterval(intervalRef.current);
    intervalRef.current = setInterval(() => {
      setActiveIndex((idx) => {
        const nextIdx = (idx + 1) % mockupCount;
        if (onSlideChange) onSlideChange(nextIdx);
        return nextIdx;
      });
    }, AUTO_SCROLL_INTERVAL);
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [mockupCount, onSlideChange]);

  return (
    <div className="w-full max-w-2xl mx-auto relative mt-6">
      <div className="flex justify-center gap-4">
        <Carousel>
          <CarouselContent>
            {mockups.map((mockup, i) => (
              <CarouselItem
                key={i}
                className={`flex justify-center transition-transform duration-500 ${
                  i === activeIndex ? "scale-100 z-10" : "scale-90 opacity-60"
                }`}
                style={{
                  transform:
                    i === activeIndex
                      ? "scale(1) translateY(0px)"
                      : "scale(0.91) translateY(12px)",
                }}
              >
                <div className="bg-white/90 dark:bg-gray-900/90 rounded-2xl shadow-xl overflow-hidden p-2 flex justify-center items-center h-72 w-52 md:w-64 border border-muted animate-scale-in transition-all hover:scale-105">
                  <img
                    src={mockup.img}
                    alt={mockup.alt}
                    className="h-full w-full object-cover rounded-2xl shadow-md transition-shadow duration-300"
                    loading="lazy"
                  />
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious className="left-1" />
          <CarouselNext className="right-1" />
        </Carousel>
      </div>
      {/* Progress dots */}
      <div className="flex justify-center gap-1 mt-4">
        {mockups.map((_, idx) => (
          <span
            key={idx}
            className={`h-2 w-4 rounded-full block transition-all duration-200 ${
              idx === activeIndex
                ? "bg-indigo-500"
                : "bg-gray-300 dark:bg-gray-700"
            }`}
          />
        ))}
      </div>
      {/* Animated "Scroll" hint */}
      <div className="flex justify-center mt-2">
        <span className="inline-flex items-center gap-1 px-3 py-1 bg-gradient-to-r from-gray-900 via-blue-900 to-indigo-900 text-white text-xs rounded-lg shadow animate-slide-in-right dark:bg-black/60">
          <svg className="w-3 h-3 mr-1 animate-bounce" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path d="M8 17l4 4 4-4m-4-5v9" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
          Auto-scroll enabled!
        </span>
      </div>
    </div>
  );
};

export default LandingMockupCarousel;
