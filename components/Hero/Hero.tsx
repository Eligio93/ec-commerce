"use client";
import useEmblaCarousel from "embla-carousel-react";
import menHeroImg from "@/public/menHero.jpg";
import womanHeroImg from "@/public/womenHero.jpg";
import Image from "next/image";
import Link from "next/link";

export default function Hero() {
  const [emblaRef] = useEmblaCarousel();
  return (
    <div className="embla overflow-hidden" ref={emblaRef}>
      <div className="embla__container flex">
        <div className="embla__slide flex-[0_0_100%] relative sm:flex-[0_0_50%]">
          <Image src={menHeroImg} alt="menHeroImg" priority />
          <Link
            className="absolute bottom-6 left-3 rounded-full bg-orange-400 px-3 py-1 font-bold"
            href={"/products/men"}
          >
            Explore Men
          </Link>
        </div>
        <div className="embla__slide flex-[0_0_100%] relative sm:flex-[0_0_50%]">
          <Image src={womanHeroImg} alt="menHeroImg" priority />
          <Link
            className="absolute bottom-6 left-3 rounded-full bg-orange-400 px-3 py-1 font-bold"
            href={"/products/men"}
          >
            Explore Women
          </Link>
        </div>
      </div>
    </div>
  );
}
