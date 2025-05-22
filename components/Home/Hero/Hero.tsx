"use client";
import useEmblaCarousel from "embla-carousel-react";
import { useState, useEffect } from "react";
import menHeroImg from "@/public/menHero.jpg";
import womanHeroImg from "@/public/womenHero.jpg";
import Image from "next/image";
import Link from "next/link";

export default function Hero() {
  const [selectedDot, setSelectedDot] = useState<number>(0);
  const [emblaRef, emblaApi] = useEmblaCarousel({
    breakpoints: {
      "(min-width: 640px)": { watchDrag: false },
    },
  });

  useEffect(() => {
    if (emblaApi) {
      const onSelect = () => {
        setSelectedDot(emblaApi.selectedScrollSnap());
      };
      emblaApi.on("select", onSelect);

      return () => {
        emblaApi.off("select", onSelect); //Listener cleanup
      };
    }
  }, [emblaApi]);

  function handleDotClick(index: number) {
    if (emblaApi) {
      emblaApi.scrollTo(index);
    }
    setSelectedDot(index);
  }

  return (
    <div className="embla flex flex-col gap-3 overflow-hidden" ref={emblaRef}>
      <div className="embla__container flex h-[500px] gap-5 rounded-lg">
        <div className="embla__slide relative flex-[0_0_100%] sm:flex-1">
          <Image
            src={menHeroImg}
            alt="menHeroImg"
            priority
            className="h-full rounded-lg object-cover"
          />
          <Link
            className="absolute bottom-6 left-3 rounded-lg bg-orange-400 p-2 font-bold transition-colors duration-200 hover:bg-orange-800 hover:text-white lg:p-3"
            href={"/products/?gender=men"}
          >
            Explore Men
          </Link>
        </div>
        <div className="embla__slide relative flex-[0_0_100%] sm:flex-1">
          <Image
            className="h-full rounded-lg object-cover"
            src={womanHeroImg}
            alt="menHeroImg"
            priority
          />
          <Link
            className="absolute bottom-6 left-3 rounded-lg bg-orange-400 p-2 font-bold transition-colors duration-200 hover:bg-orange-800 hover:text-white lg:p-3"
            href={"/products?gender=women"}
          >
            Explore Women
          </Link>
        </div>
      </div>
      <div className="mx-auto flex gap-3 *:h-[12px] *:w-[12px] *:rounded-full *:border-2 *:border-orange-800">
        <div
          className={`${selectedDot === 0 ? "bg-orange-800" : "bg-orange-100"} w-[10px] sm:hidden`}
          onClick={() => handleDotClick(0)}
        ></div>
        <div
          className={`${selectedDot === 1 ? "bg-orange-800" : "bg-orange-100"} h-[10px] w-[10px] sm:hidden`}
          onClick={() => handleDotClick(1)}
        ></div>
      </div>
    </div>
  );
}
