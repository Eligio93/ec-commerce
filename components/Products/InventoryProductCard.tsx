'use client'

import { HydratedDocument } from "mongoose";
import ProductInterface from "@/interfaces/product.interface";
import Image from "next/image";
import { CheckCircleIcon, XCircleIcon} from "@heroicons/react/24/solid";
import { PencilSquareIcon, TrashIcon } from "@heroicons/react/24/outline";
import Link from "next/link";

export default function InventoryProductCard({ product }: { product: HydratedDocument<ProductInterface> }) {

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

            <div className="flex justify-end gap-2 md:gap-5">
                <Link href={`/admin/edit/${product._id}`} >
                    <PencilSquareIcon className="transition-transform size-5 md:size-6 text-violet-600 hover:scale-125" />
                </Link>
                <button >
                    <TrashIcon title="Delete" className="size-5 transition-transform md:size-6 text-red-600 hover:scale-125" />
                </button>

            </div>
        </div>




    </div>;
}