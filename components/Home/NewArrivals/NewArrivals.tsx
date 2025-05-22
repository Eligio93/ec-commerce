import connectDB from "@/config/database/connectDB";
import Product from "@/schemas/Product";
import ProductInterface from "@/interfaces/product.interface";
import ProductListingCard from "@/components/ProductListingCard";
import HomeHeader from "../HomeHeader";
import newArrivalsbg from "@/public/newArrivalsbg.jpg";
import Image from "next/image";
import Link from "next/link";
import "@/schemas/Category";

export default async function NewArrivals() {
  await connectDB();
  const newArrivals: ProductInterface[] = await Product.find({ isLive: true })
    .sort({ _id: -1 })
    .limit(6)
    .populate("category");

  return (
    <section className="flex flex-col gap-5">
      <HomeHeader title={"NEW ARRIVALS"} />

      <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
        <div className="relative flex min-w-[100px] flex-col items-center justify-center sm:col-span-2">
          <Image
            src={newArrivalsbg}
            alt="newArrivals bg image"
            priority
            className="h-full w-full rounded-lg object-cover"
          />
          <Link
            href={"/products"}
            className="absolute bottom-1/2 w-3/4 translate-y-1/2 rounded-full bg-orange-500 p-1 text-center font-bold transition-colors duration-200 hover:bg-orange-800 hover:text-white"
          >
            View All
          </Link>
        </div>
        {newArrivals.length > 0 &&
          newArrivals.map((product) => {
            return (
              <ProductListingCard
                product={{ ...JSON.parse(JSON.stringify(product)) }}
                key={product.name}
              />
            );
          })}
      </div>
    </section>
  );
}
