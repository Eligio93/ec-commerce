"use client";
import CategoryInterface from "@/interfaces/category.interface";
import Image from "next/image";
import Link from "next/link";
import HomeHeader from "../HomeHeader";
import { useEffect, useState } from "react";

export default function MainCategories() {
  const [categories, setCategories] = useState<CategoryInterface[]>([]);
  const [viewMore, setViewMore] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(true);

  //get featured categories
  useEffect(() => {
    const fetchFeaturedCategories = async () => {
      try {
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_URL}/api/categories`
        );
        const data = await res.json();
        const featuredCategories = data.filter(
          (category: CategoryInterface) => category.isFeatured === true
        );
        setCategories(featuredCategories);
      } catch (err) {
        console.log(err);
      } finally {
        setLoading(false);
      }
    };
    fetchFeaturedCategories();
  }, []);
  if (loading) return <p className="text-center">Loading</p>;

  return (
    <div className="flex flex-col gap-5">
      <HomeHeader title={'MAIN CATEGORIES'} />
      {categories.length > 0 ? (
        <div className="flex flex-wrap justify-center gap-5">
          {categories.map((category: CategoryInterface, index: number) => (
            <Link
              href={`/products?category=${category.name}`}
              key={category._id}
              className={`
              ${index > 3 && !viewMore ? "hidden" : "flex"}
             bg-white flex-col gap-3 items-center flex-[0_0_100%] sm:flex  sm:p-2 sm:flex-[0_0_48%] md:flex-[0_0_29%] lg:flex-[0_0_32%] rounded-lg border hover:shadow-lg`}
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
      ) : (
        <p className="text-center">There s no main products categories</p>
      )}
    </div>
  );
}
