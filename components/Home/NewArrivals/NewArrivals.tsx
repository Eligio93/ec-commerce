import connectDB from "@/config/database/connectDB";
import Product from "@/schemas/Product";
import ProductInterface from "@/interfaces/product.interface";
import { HydratedDocument } from "mongoose";
import ProductListingCard from "@/components/ProductListingCard";
import HomeHeader from "../HomeHeader";
import newArrivalsbg from "@/public/newArrivalsbg.jpg"
import Image from "next/image";
import Link from "next/link";


export default async function NewArrivals() {
  await connectDB();
  const newArrivals: HydratedDocument<ProductInterface>[] = await Product.find({ isLive: true })
    .sort({ _id: -1 })
    .limit(6)
    .populate('category')

  return <section className="flex flex-col gap-5">
    <HomeHeader title={'NEW ARRIVALS'} />

    <div
      className="grid grid-cols-2 sm:grid-cols-4  gap-3">
      <div className=" sm:col-span-2 relative min-w-[100px] flex flex-col justify-center items-center">
        <Image
          src={newArrivalsbg}
          alt="newArrivals bg image"
          priority
          className="rounded-lg object-cover h-full w-full"
        />
        <Link href={'/products'} className="transition-colors duration-200 bg-orange-500 absolute w-3/4 bottom-1/2 text-center p-1 rounded-full translate-y-1/2 hover:bg-orange-800 hover:text-white font-bold">
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
