
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
    <div className="relative">
      <Carousel>
        <CarouselContent>
          {HERO_IMAGES.map((imgObj, i) => (
            <CarouselItem key={i} className={i === activeIndex ? "" : "opacity-50"}>
              <img
                src={imgObj.img}
                alt={imgObj.text}
                className="rounded-xl w-full max-w-md mx-auto object-cover h-48 transition-all duration-500"
                draggable={false}
                style={{ opacity: i === activeIndex ? 1 : 0.6 }}
              />
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious />
        <CarouselNext />
      </Carousel>
    </div>
  );
};
export default LandingMockupCarousel;
