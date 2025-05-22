"use client";
import { useContext } from "react";
import { cartContext } from "@/config/CartProvider";

export default function EmptyCartBtn() {
  const { clearCart } = useContext(cartContext);
  return (
    <button
      className="rounded-lg bg-red-500 py-1 text-sm font-bold transition-colors duration-200 hover:bg-red-700 hover:text-white sm:text-base lg:py-2"
      onClick={() => clearCart()}
    >
      Empty Cart
    </button>
  );
}
