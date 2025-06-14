
import React, { useEffect, useRef, useState } from "react";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";
import { HERO_IMAGES } from "./HeroStockImage";
const AUTO_SCROLL_INTERVAL = 3500; // ms - slightly longer for smoother experience

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
    <div className="relative">
      <Carousel>
        <CarouselContent>
          {HERO_IMAGES.map((imgObj, i) => (
            <CarouselItem key={i} className={`transition-all duration-1000 ease-in-out ${i === activeIndex ? "opacity-100 scale-100" : "opacity-40 scale-95"}`}>
              <img
                src={imgObj.img}
                alt={imgObj.text}
                className="rounded-xl w-full max-w-md mx-auto object-cover h-48 transition-all duration-1000 ease-in-out transform hover:scale-105"
                draggable={false}
                style={{ 
                  filter: i === activeIndex ? 'brightness(1.1) contrast(1.05)' : 'brightness(0.8) contrast(0.9)',
                }}
              />
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious className="transition-all duration-300 hover:scale-110" />
        <CarouselNext className="transition-all duration-300 hover:scale-110" />
      </Carousel>
    </div>
  );
};

export default LandingMockupCarousel;
