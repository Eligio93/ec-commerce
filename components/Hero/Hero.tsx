"use client";
import useEmblaCarousel from "embla-carousel-react";

export default function Hero() {
  const [emblaRef] = useEmblaCarousel();
  return (
    <div className="embla overflow-hidden" ref={emblaRef}>
      <div className="embla__container flex">
        <div className="embla__slide flex-[0_0_100%]">Slide 1</div>
        <div className="embla__slide flex-[0_0_100%]">Slide 2</div>
      </div>
    </div>
  );
}
