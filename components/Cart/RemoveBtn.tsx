"use client";

import { useContext } from "react";
import { cartContext, CartProduct } from "@/config/CartProvider";
import { TrashIcon } from "@heroicons/react/24/outline";

export default function removeBtn({
  itemToRemove,
}: {
  itemToRemove: CartProduct;
}) {
  const { removeProduct } = useContext(cartContext);
  return (
    <div className="group flex w-fit cursor-pointer gap-1 self-end">
      <TrashIcon className="size-4 stroke-slate-400 group-hover:stroke-red-500" />
      <button
        onClick={() => {
          removeProduct(itemToRemove.product);
        }}
        className="text-xs text-slate-400 group-hover:text-red-500"
      >
        Remove
      </button>
    </div>
  );
}
