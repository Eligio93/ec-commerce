'use client'

import { HydratedDocument } from "mongoose";
import ProductInterface from "@/interfaces/product.interface";
import Image from "next/image";
import { CheckCircleIcon, XCircleIcon, PencilSquareIcon, TrashIcon } from "@heroicons/react/24/solid";
import Link from "next/link";

export default function InventoryProductCard({ product }: { product: HydratedDocument<ProductInterface> }) {
    //picture 
    //body
    //ctas

    return <div className="flex flex-col bg-white p-2 gap-2 rounded-lg shadow-lg md:flex-row md:items-center">
        <div className="relative h-[80px] md:min-w-[120px]">
            <Image
                src={product.images[0]}
                alt={product.name + " image"}
                fill
                className="object-contain"
            />
        </div>

        <div className="flex flex-col gap-2 justify-center md:w-full">
            <div>
                <h3 className="font-bold">{product.name}</h3>
                <p>Stock: {product.stock}</p>
                <p className="flex gap-2">Is Live: {product.isLive ? <CheckCircleIcon className="size-5 fill-lime-400" /> : <XCircleIcon className="size-5 fill-red-400" />}</p>
                <p className="flex gap-2">Is Featured: {product.isFeatured ? <CheckCircleIcon className="size-5 fill-lime-400" /> : <XCircleIcon className="size-5 fill-red-400" />}</p>
                <p>Price: {product.price}</p>
                <p>Discount: {product.discount}%</p>
            </div>

            <div className="flex justify-end gap-2">
                <Link href={`/admin/edit/${product._id}`} className="text-white flex gap-1 items-center rounded-full bg-violet-600 px-5 py-1 hover:bg-violet-900 transition-colors duration-300">
                    <PencilSquareIcon className="size-4 fill-white" />
                    Edit</Link>
                <button className="text-white flex gap-1 items-center rounded-full bg-red-700 px-5 py-1  hover:bg-red-900 transition-colors duration-300">
                    <TrashIcon className="size-4 fill-white" />Delete</button>

            </div>
        </div>




    </div>;
}