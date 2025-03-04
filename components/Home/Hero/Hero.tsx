"use client";
import useEmblaCarousel from "embla-carousel-react";
import { useState,useEffect } from "react";
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
    <div className="embla overflow-hidden flex flex-col gap-3" ref={emblaRef}>
      <div className="embla__container flex max-h-[425px] gap-5">
        <div className="embla__slide flex-[0_0_100%] relative sm:flex-1 h-full">
          <Image
            src={menHeroImg}
            alt="menHeroImg"
            priority
            className="rounded-lg"
          />
          <Link
            className="absolute bottom-6 left-3 rounded-lg bg-orange-400 lg:p-3 p-2 font-bold transition-colors duration-200  hover:bg-orange-800 hover:text-white"
            href={"/products/men"}
          >
            Explore Men
          </Link>
        </div>
        <div className="embla__slide flex-[0_0_100%] relative sm:flex-1 h-full">
          <Image
            className="rounded-lg"
            src={womanHeroImg}
            alt="menHeroImg"
            priority
          />
          <Link
            className="absolute bottom-6 left-3 rounded-lg bg-orange-400 lg:p-3 p-2 font-bold transition-colors duration-200  hover:bg-orange-800 hover:text-white"
            href={"/products/men"}
          >
            Explore Women
          </Link>
        </div>
      </div>
      <div className="mx-auto flex gap-3 *:border-2 *:border-orange-800 *:h-[12px] *:w-[12px] *:rounded-full">
        <div className={`${selectedDot === 0 ? "bg-orange-800" : "bg-orange-100"} sm:hidden  w-[10px]  `} onClick={() => handleDotClick(0)}></div>
        <div className={`${selectedDot === 1 ? "bg-orange-800" : "bg-orange-100"} sm:hidden h-[10px] w-[10px]`} onClick={() => handleDotClick(1)}></div>
      </div>


    </div>
  );
}
