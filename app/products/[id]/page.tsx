import connectDB from "@/config/database/connectDB";
import Product from "@/schemas/Product";
import ProductInterface from "@/interfaces/product.interface";
import { HydratedDocument } from "mongoose";
import "@/schemas/Category"
import CategoryInterface from "@/interfaces/category.interface";




export default async function ProductPage({
    params,
}: {
    params: Promise<{ id: string }>
}) {

    const id = (await params).id
    await connectDB();
    const product: HydratedDocument<ProductInterface> | null = await Product.findOne({ _id: id }).populate("category")
    console.log(product)
    if (product) {
        return (
            <div>
                <h1>{product.name}</h1>
                <p>{product.description}</p>
            </div>
        )
    } else
        return (
            <div>
                <h1>Product not found</h1>
            </div>
        )
}

