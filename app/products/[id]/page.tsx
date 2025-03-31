import connectDB from "@/config/database/connectDB";
import Product from "@/schemas/Product";
import ProductInterface from "@/interfaces/product.interface";
import { HydratedDocument } from "mongoose";
import "@/schemas/Category"
import ProductImageCarousel from "@/components/Products/ProductImageCarousel";
import Link from "next/link";
import AddToCartController from "@/components/Products/AddToCartController";
import calculateDiscountedPrice from "@/utils/calculateDiscountedPrice";
import InfoProductListing from "@/components/Products/InfoProductListing";
import RelatedProducts from "@/components/Products/RelatedProducts";





export default async function ProductPage({
    params,
}: {
    params: Promise<{ id: string }>
}) {

    const id = (await params).id
    //aggiornare le views del prodotto
    await connectDB();
    const product: HydratedDocument<ProductInterface> | null = await Product.findOne({ _id: id }).populate("category")
    console.log(product)
    if (product) {
        return (
            <div className="flex flex-col gap-5 p-5">
                <div className="flex flex-col gap-3 px-3 md:flex-row md:justify-evenly md:gap-5 md:items-center">
                    {/*Carousel for Product Picture*/}
                    <div className="flex flex-col gap-2">
                        <ProductImageCarousel images={product.images} />
                    </div>
                    <div className="flex flex-col gap-3 md:justify-center lg:max-w-[600px]">
                        {/*DIV for Product Title HEader*/}
                        <div className="flex flex-col">
                            <p className="text-orange-800 text-sm">{product.brand}</p>
                            <h1 className="font-bold text-2xl lg:text-3xl">{product.name}</h1>
                            <Link href={`/products?category=${product.category.name}`} className="font-bold text-xs hover:underline text-orange-500">{product.category.name}</Link>
                        </div>

                        {/*Div for product Price and Cart CTA*/}
                        <div className="flex flex-col gap-4 rounded-lg">
                            <div className="hidden lg:flex flex-col gap-2">
                                <p className="font-bold text-orange-800 text-xl">Description</p>
                                <p className="leading-7 ">{product.description}</p>
                            </div>
                            <div className="flex flex-wrap gap-2 items-center">
                                {product.discount ? <p className="line-through text-gray-400">${product.price}</p> : <p className="font-bold text-xl">${product.price}</p>}
                                {product.discount ? <p className="text-orange-400 font-bold text-l">-{product.discount}%</p> : null}
                                {product.discount ? <p className="font-bold text-xl">${calculateDiscountedPrice(product.price, product.discount)}</p> : null}
                            </div>
                            <AddToCartController {...JSON.parse(JSON.stringify(product))} />

                        </div>

                    </div>
                </div>
                <InfoProductListing description={product.description} />
                <RelatedProducts product={product} />
            </div>
        )
    } else
        return (
            <div>
                <h1>Product not found</h1>
            </div>
        )
}

