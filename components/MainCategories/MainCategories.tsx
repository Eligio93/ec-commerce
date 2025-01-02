"use client";
import CategoryInterface from "@/interfaces/category.interface";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function MainCategories() {
  const [categories, setCategories] = useState([]);
  const [viewMore, setViewMore] = useState(false);
  useEffect(() => {
    const fetchFeaturedCategories = async () => {
      const res = await fetch("http://localhost:3000/api/categories");
      const data = await res.json();
      data.filter(
        (category: CategoryInterface) => category.isFeatured === true
      );
      setCategories(data);
    };
    fetchFeaturedCategories();
  }, []);

  return (
    <div className="flex flex-col gap-2">
      <h2 className="text-center">Explore Main Products</h2>
      <div className="flex flex-wrap justify-center gap-5">
        {categories.map((category: CategoryInterface, index: number) => (
          <Link
            href={`/products?category=${category.name}`}
            key={category._id}
            className={`
              ${index > 3 && !viewMore ? "hidden" : "flex"}
             flex-col gap-3 items-center flex-[0_0_100%] sm:flex  sm:p-2 sm:flex-[0_0_48%] md:flex-[0_0_28%] lg:flex-[0_0_20%] rounded-lg border hover:shadow-lg`}
          >
            <div className="relative w-full h-[100px] md:h-[150px]">
              <Image
                src={category.image}
                alt={category.name}
                fill
                sizes="100%"
                className="object-cover rounded-lg"
                placeholder="blur"
                blurDataURL={category.image}
              />
            </div>
            <p className="font-bold">{category.name}</p>
          </Link>
        ))}
        <button
          className="bg-orange-400 px-3 py-1 font-bold rounded-full sm:hidden"
          onClick={() => setViewMore(!viewMore)}
        >
          {viewMore ? "View Less" : "View More"}
        </button>
      </div>
    </div>
  );
}
