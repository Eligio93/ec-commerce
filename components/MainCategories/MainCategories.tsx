import Category from "@/schemas/Category";
import CategoryInterface from "@/interfaces/category.interface";
import Image from "next/image";
import connectDB from "@/config/database/connectDB";
import Link from "next/link";

export default async function MainCategories() {
  await connectDB();
  const categories: CategoryInterface[] = await Category.find({
    isFeatured: true,
  });
  return (
    <div className="flex flex-col gap-2">
      <h2 className="text-center">Main Categories</h2>
      <div className="flex flex-wrap justify-center gap-y-5">
        {categories.map((category) => (
          <Link
            href={`/products?category=${category.name}`}
            key={category._id}
            className="flex flex-col items-center w-full sm:w-1/2 sm:p-2 md:w-1/3"
          >
            <div className="relative w-full h-[100px] md:h-[150px]">
              <Image
                src={category.image}
                alt={category.name}
                fill
                className="object-cover"
              />
            </div>
            <p>{category.name}</p>
          </Link>
        ))}
      </div>
    </div>
  );
}
