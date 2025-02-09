import connectDB from "@/config/database/connectDB";
import Product from "@/schemas/Product";
import ProductInterface from "@/interfaces/product.interface";
import { HydratedDocument } from "mongoose";
import ProductListingCard from "@/components/ProductListingCard";
import CategoryInterface from "@/interfaces/category.interface";

export default async function NewArrivals() {
  await connectDB();
  const newArrivals: HydratedDocument<ProductInterface & { category: CategoryInterface }>[] = await Product.find({ isLive: true })
    .sort({ _id: -1 })
    .limit(6)
    .populate("category");
  console.log('NEW ARRIVALS', newArrivals)
  return <section>
    <h1>New Arrivals</h1>
    {newArrivals.length > 0 &&
      <div className="flex flex-wrap gap-3 justify-center">
        {newArrivals.map((product) => {
          return <ProductListingCard product={product} key={product.name} />;
        })}
      </div>
    }


  </section>;
}
