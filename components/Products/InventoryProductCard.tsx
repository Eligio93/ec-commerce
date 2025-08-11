"use client";

import ProductInterface from "@/interfaces/product.interface";
import Image from "next/image";
import { CheckCircleIcon, XCircleIcon } from "@heroicons/react/24/solid";
import { PencilSquareIcon, TrashIcon } from "@heroicons/react/24/outline";
import Link from "next/link";
import { useState } from "react";
import ConfirmationPopUp from "../ConfirmationPopUp";
import { toast } from "sonner";

export default function InventoryProductCard({
  product,
  onDeleteAction,
}: {
  product: ProductInterface;
  onDeleteAction: (product: ProductInterface) => void;
}) {
  const [openPopup, setOpenPopup] = useState<boolean>(false);

  async function handleProductDelete() {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_URL}/api/products/${product._id}`,
      {
        method: "DELETE",
      },
    );
    const data = await res.json();
    if (!res.ok) {
      toast.error(data.message);
      setOpenPopup(false);
    } else {
      toast.success("Product deleted successfully");
      setOpenPopup(false);
      onDeleteAction(product);
    }
  }

  return (
    <>
      <div className="flex flex-col gap-2 rounded-lg bg-white p-2 shadow-lg md:flex-row md:items-center">
        <div className="relative h-[80px] md:min-w-[120px]">
          <Image
            src={product.images[0]}
            alt={product.name + " image"}
            fill
            className="object-contain"
          />
        </div>

        <div className="flex flex-col justify-center gap-2 md:w-full">
          <div>
            <h3 className="font-bold">{product.name}</h3>
            <p>Stock: {product.stock}</p>
            <p className="flex gap-2">
              Is Live:{" "}
              {product.isLive ? (
                <CheckCircleIcon className="size-5 fill-lime-400" />
              ) : (
                <XCircleIcon className="size-5 fill-red-400" />
              )}
            </p>
            <p className="flex gap-2">
              Is Featured:{" "}
              {product.isFeatured ? (
                <CheckCircleIcon className="size-5 fill-lime-400" />
              ) : (
                <XCircleIcon className="size-5 fill-red-400" />
              )}
            </p>
            <p>Price: {product.price}</p>
            <p>Discount: {product.discount}%</p>
          </div>

          <div className="flex justify-end gap-2 md:gap-5">
            <Link href={`/admin/edit/${product._id}`}>
              <PencilSquareIcon className="size-5 text-violet-600 transition-transform hover:scale-125 md:size-6" />
            </Link>
            <button onClick={() => setOpenPopup(true)}>
              <TrashIcon
                title="Delete"
                className="size-5 text-red-600 transition-transform hover:scale-125 md:size-6"
              />
            </button>
          </div>
        </div>
      </div>
      {openPopup && (
        <ConfirmationPopUp
          title="Are you sure you want to delete this product?"
          specifiedElement={product.name}
          setPopUpState={setOpenPopup}
          confirmAction={handleProductDelete}
        />
      )}
    </>
  );
}
