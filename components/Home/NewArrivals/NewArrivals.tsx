import connectDB from "@/config/database/connectDB";
import Product from "@/schemas/Product";
import ProductInterface from "@/interfaces/product.interface";
import { HydratedDocument } from "mongoose";
import ProductListingCard from "@/components/ProductListingCard";
import CategoryInterface from "@/interfaces/category.interface";
import newArrivalsbg from "@/public/newArrivalsbg.jpg"
import Image from "next/image";
import Link from "next/link";

export default async function NewArrivals() {
  await connectDB();
  const newArrivals: HydratedDocument<ProductInterface & { category: CategoryInterface }>[] = await Product.find({ isLive: true })
    .sort({ _id: -1 })
    .limit(6)
    .populate("category");
  console.log('NEW ARRIVALS', newArrivals)
  return <section className="flex flex-col gap-5">
    <h1 className="text-center">New Arrivals</h1>

    <div
      className="grid grid-cols-2 sm:grid-cols-4  gap-3">
      <div className=" sm:col-span-2 relative min-w-[100px] flex flex-col justify-center items-center">
        <Image
          src={newArrivalsbg}
          alt="newArrivals bg image"
          priority
          className="rounded-lg object-cover h-full w-full"
        />
        <Link href={'/products'} className=" bg-orange-500 absolute w-3/4 bottom-1/2 text-center p-1 rounded-full translate-y-1/2 hover:bg-orange-800 hover:text-white font-bold">
          View All
        </Link>
      </div>
      {newArrivals.length > 0 &&
        newArrivals.map((product) => {
          return <ProductListingCard product={product} key={product.name} />;
        })
      }
    </div>



  </section>;
}
