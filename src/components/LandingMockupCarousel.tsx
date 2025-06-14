
import React from "react";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";

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
    img: "/lovable-uploads/62637124-2993-4040-a176-d1e9ed77f87d.png",
    alt: "FinnTra mascot",
  }
];

const LandingMockupCarousel: React.FC = () => (
  <div className="w-full max-w-2xl mx-auto relative mt-6">
    <Carousel>
      <CarouselContent>
        {mockups.map((mockup, i) => (
          <CarouselItem key={i} className="flex justify-center">
            <div className="bg-white/70 dark:bg-gray-900/80 rounded-3xl shadow-lg overflow-hidden p-2 flex justify-center items-center h-72 w-52 md:w-64 border border-muted animate-scale-in">
              <img 
                src={mockup.img}
                alt={mockup.alt}
                className="h-full w-full object-cover rounded-2xl"
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
);

export default LandingMockupCarousel;
