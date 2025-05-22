"use client";
import useEmblaCarousel from "embla-carousel-react";
import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/24/outline";
import ProductInterface from "@/interfaces/product.interface";
import Image from "next/image";
import Link from "next/link";

export default function RelatedProductCarousel({
  products,
}: {
  products: ProductInterface[];
}) {
  const [emblaRef, emblaApi] = useEmblaCarousel({
    loop: true,
    align: "start",
  });
  return (
    <div className="flex">
      <div onClick={() => emblaApi?.scrollPrev()} className="flex items-center">
        <ChevronLeftIcon className="size-8" />
      </div>

      <div className="embla flex-1 overflow-hidden" ref={emblaRef}>
        <div className="embla__container flex">
          {products.map((product: ProductInterface) => {
            return (
              <Link
                key={product.name}
                href={`/products/${product._id}`}
                className="embla__slide group mr-5 flex flex-[0_0_100%] flex-col gap-2 rounded-lg bg-orange-200 p-3 sm:flex-[0_0_48%] md:flex-[0_0_31%] lg:mr-5 lg:flex-[0_0_20%]"
              >
                <div className="relative h-[150px]">
                  <Image
                    src={product.images[0]}
                    alt={product.name + " image"}
                    fill
                    className="object-contain"
                  />
                </div>
                <div className="flex flex-col gap-1 group-hover:underline">
                  <p className="text-xs text-orange-800">{product.brand}</p>
                  <p>{product.name}</p>
                </div>
              </Link>
            );
          })}
        </div>
      </div>
      <div onClick={() => emblaApi?.scrollNext()} className="flex items-center">
        <ChevronRightIcon className="size-8" />
      </div>
    </div>
  );
}
