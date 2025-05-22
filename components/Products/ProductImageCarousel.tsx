"use client";

import useEmblaCarousel from "embla-carousel-react";
import Image from "next/image";
import { useState, useEffect } from "react";

export default function ProductImageCarousel({ images }: { images: string[] }) {
  const [emblaRef, emblaApi] = useEmblaCarousel();
  const [selectedImage, setSelectedImage] = useState(0);

  useEffect(() => {
    if (emblaApi) {
      const onSelect = () => {
        setSelectedImage(emblaApi.selectedScrollSnap());
      };
      emblaApi.on("select", onSelect);

      return () => {
        emblaApi.off("select", onSelect); //Listener cleanup
      };
    }
  }, [emblaApi]);

  function handleImageSelection(index: number) {
    if (emblaApi) {
      emblaApi.scrollTo(index);
    }
    setSelectedImage(index);
  }
  return (
    <div className="flex flex-col gap-2 sm:flex-row sm:justify-center md:justify-start lg:justify-end">
      <div
        className="embla overflow-hidden rounded-lg sm:order-2 sm:w-[400px] md:w-[350px]"
        ref={emblaRef}
      >
        <div className="embla__container flex items-center">
          {images.map((image, index) => (
            <div
              key={image}
              className="embla__slide relative h-[300px] flex-[0_0_100%] bg-white"
            >
              <Image
                src={image}
                alt={`Image ${index} of product`}
                key={index}
                fill
                className="object-contain"
              />
            </div>
          ))}
        </div>
      </div>
      <div className="flex flex-wrap justify-center gap-3 sm:max-h-[300px] sm:flex-col">
        {images.map((image, index) => (
          <div
            onClick={() => handleImageSelection(index)}
            className={`relative h-[80px] w-[80px] cursor-pointer rounded-lg bg-white ${selectedImage === index && "border-2 border-orange-400"}`}
            key={image}
          >
            <Image
              src={image}
              alt={`Image ${index} of product`}
              key={index}
              fill
              className="rounded-lg object-contain"
            />
          </div>
        ))}
      </div>
    </div>
  );
}
