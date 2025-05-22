"use client";

import { CartProduct } from "@/config/CartProvider";
import { ReactHTMLElement, useState } from "react";
import { useContext } from "react";
import { cartContext } from "@/config/CartProvider";
import Image from "next/image";
import minusCartIcon from "@/public/minusCartIcon.svg";
import plusCartIcon from "@/public/plusCartIcon.svg";
import { toast } from "sonner";

export default function CartControllerBar({
  existingCartProduct,
}: {
  existingCartProduct: CartProduct;
}) {
  const { addOne, removeOne, setQuantity, removeProduct } =
    useContext(cartContext);
  const [newQuantity, setNewQuantity] = useState(existingCartProduct.quantity);

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    e.preventDefault();
    if (parseInt(e.target.value) > 10) {
      setNewQuantity(10);
      setQuantity(existingCartProduct.product, 10);
      return toast.error("You can buy max 10 items of the same product");
    }
    setNewQuantity(parseInt(e.target.value));
    setQuantity(existingCartProduct.product, parseInt(e.target.value));
    if (parseInt(e.target.value) < 1) {
      removeProduct(existingCartProduct.product);
    }
  }

  function increaseOne() {
    if (newQuantity == 10) {
      return toast.error("You can buy max 10 items of the same product");
    }
    setNewQuantity(newQuantity + 1);
    addOne(existingCartProduct.product);
  }
  function decreaseOne() {
    setNewQuantity(newQuantity - 1);
    removeOne(existingCartProduct.product);
    if (newQuantity === 0) {
      removeProduct(existingCartProduct.product);
    }
  }
  return (
    <div className="z-100 flex gap-1 rounded-lg border bg-white p-1 lg:p-3">
      <div className="h-[20px] w-[20px] cursor-pointer" onClick={decreaseOne}>
        <Image src={minusCartIcon} alt="remove Item Icon" />
      </div>
      <input
        id="numberInputCart"
        className="flex-1 text-center outline-orange-500"
        type="number"
        min={0}
        max={10}
        value={newQuantity}
        onChange={handleChange}
      />
      <div className="h-[20px] w-[20px] cursor-pointer" onClick={increaseOne}>
        <Image src={plusCartIcon} alt="add Item Icon" />
      </div>
    </div>
  );
}
