"use client";

import * as React from "react";
import Image from "next/image";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselPrevious,
  CarouselNext,
  type CarouselApi,
} from "@/components/ui/carousel";
import { cn } from "@/lib/utils";

interface ImageItem {
  src: string;
  caption: string;
}

interface ImageCarouselProps {
  images: ImageItem[];
  companyName: string;
}

export function ImageCarousel({ images, companyName }: ImageCarouselProps) {
  const [api, setApi] = React.useState<CarouselApi>();
  const [current, setCurrent] = React.useState(0);
  const [count, setCount] = React.useState(0);

  React.useEffect(() => {
    if (!api) return;

    setCount(api.scrollSnapList().length);
    setCurrent(api.selectedScrollSnap());

    api.on("select", () => {
      setCurrent(api.selectedScrollSnap());
    });
  }, [api]);

  if (!images || images.length === 0) {
    return null;
  }

  return (
    <section className="mb-12">
      <h2 className="font-serif text-2xl md:text-3xl text-foreground mb-6">
        Inside {companyName}
      </h2>

      <div className="relative">
        <Carousel
          setApi={setApi}
          opts={{
            loop: true,
          }}
          className="w-full"
        >
          <CarouselContent>
            {images.map((image, index) => (
              <CarouselItem key={index}>
                <div className="relative aspect-[2/1] rounded-xl overflow-hidden bg-muted group/slide">
                  <Image
                    src={image.src}
                    alt={image.caption}
                    fill
                    className="object-cover"
                    priority={index === 0}
                  />
                  {/* Caption overlay on hover */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent opacity-0 group-hover/slide:opacity-100 transition-opacity duration-300">
                    <div className="absolute bottom-0 left-0 right-0 p-4 md:p-6">
                      <p className="text-white text-sm md:text-base font-medium">
                        {image.caption}
                      </p>
                    </div>
                  </div>
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>

          {images.length > 1 && (
            <>
              <CarouselPrevious className="left-3 bg-white/90 backdrop-blur-sm border-0 hover:bg-white" />
              <CarouselNext className="right-3 bg-white/90 backdrop-blur-sm border-0 hover:bg-white" />
            </>
          )}
        </Carousel>

        {/* Dot Indicators */}
        {images.length > 1 && (
          <div className="flex justify-center gap-2 mt-4">
            {images.map((_, index) => (
              <button
                key={index}
                onClick={() => api?.scrollTo(index)}
                className={cn(
                  "w-2 h-2 rounded-full transition-all duration-200",
                  "focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2",
                  index === current
                    ? "bg-primary w-6"
                    : "bg-muted-foreground/30 hover:bg-muted-foreground/50"
                )}
                aria-label={`Go to image ${index + 1}`}
              />
            ))}
          </div>
        )}

        {/* Image Counter */}
        <div className="absolute top-4 right-4 z-10 px-3 py-1.5 rounded-full bg-black/50 backdrop-blur-sm">
          <span className="text-sm text-white font-medium">
            {current + 1} / {count}
          </span>
        </div>
      </div>
    </section>
  );
}
