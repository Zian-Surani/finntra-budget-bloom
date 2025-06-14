
import React, { useEffect, useRef, useState } from "react";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";
import { HERO_IMAGES } from "./HeroStockImage";

const AUTO_SCROLL_INTERVAL = 2500; // ms

interface CarouselProps {
  onSlideChange?: (index: number) => void;
}
const LandingMockupCarousel: React.FC<CarouselProps> = ({
  onSlideChange
}) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);
  const mockupCount = HERO_IMAGES.length;
  useEffect(() => {
    if (intervalRef.current) clearInterval(intervalRef.current);
    intervalRef.current = setInterval(() => {
      setActiveIndex(idx => {
        const nextIdx = (idx + 1) % mockupCount;
        if (onSlideChange) onSlideChange(nextIdx);
        return nextIdx;
      });
    }, AUTO_SCROLL_INTERVAL);
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [mockupCount, onSlideChange]);

  // Announce to parent on index update
  useEffect(() => {
    if (onSlideChange) onSlideChange(activeIndex);
    // eslint-disable-next-line
  }, [activeIndex]);

  return (
    <div className="w-full max-w-2xl mx-auto relative mt-6">
      <div className="flex justify-center gap-4">
        <Carousel>
          <CarouselContent>
            {HERO_IMAGES.map((mockup, i) => (
              <CarouselItem
                key={i}
                className={`flex justify-center transition-transform duration-500 ${i === activeIndex ? "scale-100 z-10" : "scale-90 opacity-60"}`}
                style={{
                  transform: i === activeIndex ? "scale(1) translateY(0px)" : "scale(0.91) translateY(12px)"
                }}>
                <div className="bg-white/90 dark:bg-gray-900/90 rounded-2xl shadow-xl overflow-hidden p-2 flex justify-center items-center h-72 w-52 md:w-64 border border-muted animate-scale-in transition-all hover:scale-105">
                  <img src={mockup.img} alt={mockup.text} className="h-full w-full object-cover rounded-2xl shadow-md transition-shadow duration-300" loading="lazy" />
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
        {HERO_IMAGES.map((_, idx) => (
          <span
            key={idx}
            className={`h-2 w-4 rounded-full block transition-all duration-200 ${idx === activeIndex ? "bg-indigo-500" : "bg-gray-300 dark:bg-gray-700"}`}
          />
        ))}
      </div>
      {/* Animated "Scroll" hint */}
      <div className="flex justify-center mt-2"></div>
    </div>
  );
};

export default LandingMockupCarousel;
