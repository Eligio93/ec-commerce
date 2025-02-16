import ProductInterface from "@/interfaces/product.interface";
import CategoryInterface from "@/interfaces/category.interface";
import { HydratedDocument } from "mongoose";
import Image from "next/image";
import AddToCartBtn from "./Products/AddToCartBtn";
import Link from "next/link";
import calculateDiscountedPrice from "@/utils/calculateDiscountedPrice";
import Category from "@/schemas/Category";





export default async function ProductListingCard({ product }: { product: HydratedDocument<ProductInterface & { category: CategoryInterface }> }) {
    const category = await Category.findById(product.category) as HydratedDocument<CategoryInterface>
    product.category = category

    return (
        <Link href={`/products/${product._id}`}
            className="bg-white rounded-lg p-2 flex flex-col gap-2 lg:gap-5 lg:p-3 border min-w-[100px]">
            <div className=" group relative w-full h-[120px] sm:h-[150px] lg:h-[200px] ">
                <Image
                    className={`object-contain  ${product.images[1] && 'group-hover:opacity-0 transition-opacity duration-300'}`}
                    src={product.images[0]}
                    alt={product.name + " image"}
                    fill
                />
                {product.images[1] && <Image
                    className="opacity-0 group-hover:opacity-100 object-contain transition-opacity duration-300"
                    src={product.images[1]}
                    alt={product.name + " image"}
                    fill
                />}

            </div>
            {/*description and pricing*/}
            <div className="group flex flex-col gap-2 flex-1 justify-center">
                {/*brand and category*/}
                <div className="flex flex-col justify-end">
                    <p className="text-xs">{product.brand}</p>
                    <p className="text-xs text-orange-800">{product.category.name}</p>
                </div>
                <hr />
                {/*title*/}
                <h3 className='h-[70px] line-clamp-3 group-hover:underline group-hover:cursor-pointer font-bold text-lg/6 line flex-1'>{product.name}</h3>
                {/*pricing*/}
                <div className="flex flex-wrap gap-2">
                    {product.discount ? <p className="line-through text-gray-400">${product.price}</p> : <p className="font-medium">${product.price}</p>}
                    {product.discount ? <p className="text-orange-400 font-bold">-{product.discount}%</p> : null}
                    {product.discount ? <p className="font-medium">${calculateDiscountedPrice(product.price, product.discount)}</p> : null}
                </div>
            </div>
            {/*cta*/}
            <AddToCartBtn />
        </Link>
    )

}