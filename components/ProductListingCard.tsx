"use client";
import ProductInterface from "@/interfaces/product.interface";
import Image from "next/image";
import AddToCartController from "./Products/AddToCartController";
import Link from "next/link";
import calculateDiscountedPrice from "@/utils/calculateDiscountedPrice";

export default function ProductListingCard({
  product,
}: {
  product: ProductInterface;
}) {
  return (
    <div className="flex min-w-[100px] flex-col gap-2 rounded-lg border bg-white p-2 lg:gap-5 lg:p-3">
      <Link href={`/products/${product._id}`} className="flex-1">
        <div className="group relative h-[120px] w-full sm:h-[150px] lg:h-[200px]">
          <Image
            className={`object-contain ${product.images[1] && "transition-opacity duration-300 group-hover:opacity-0"}`}
            src={product.images[0]}
            alt={product.name + " image"}
            fill
          />
          {product.images[1] && (
            <Image
              className="object-contain opacity-0 transition-opacity duration-300 group-hover:opacity-100"
              src={product.images[1]}
              alt={product.name + " image"}
              fill
            />
          )}
        </div>
        {/*description and pricing*/}
        <div className="group flex flex-1 flex-col justify-center gap-2">
          {/*brand and category*/}
          <div className="flex flex-col justify-end">
            <p className="text-xs">{product.brand}</p>
            <p className="text-xs text-orange-800">{product.category.name}</p>
          </div>
          <hr />
          {/*title*/}
          <h3 className="line line-clamp-3 h-[70px] flex-1 font-bold group-hover:cursor-pointer group-hover:underline lg:text-lg/6">
            {product.name}
          </h3>
          {/*pricing*/}
          <div className="flex flex-wrap gap-2">
            {product.discount ? (
              <p className="text-gray-400 line-through">${product.price}</p>
            ) : (
              <p className="font-medium">${product.price}</p>
            )}
            {product.discount ? (
              <p className="font-bold text-orange-400">-{product.discount}%</p>
            ) : null}
            {product.discount ? (
              <p className="font-medium">
                ${calculateDiscountedPrice(product.price, product.discount)}
              </p>
            ) : null}
          </div>
        </div>
        {/*cta*/}
      </Link>
      <AddToCartController
        //serialize the product object to pass it to client component
        // product={{ ...JSON.parse(JSON.stringify(product)) }}
        product={product}
      />
    </div>
  );
}
