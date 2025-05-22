"use client";
import ProductInterface from "@/interfaces/product.interface";
import { useContext } from "react";
import { cartContext } from "@/config/CartProvider";
import { CartProduct } from "@/config/CartProvider";
import CartControllerBar from "../CartControllerBar";

export default function AddToCartController({
  product,
}: {
  product: ProductInterface;
}) {
  const {
    cartProducts,
    addOne,
    addToCart,
    removeOne,
    clearCart,
    setQuantity,
    removeProduct,
  } = useContext(cartContext);
  const existingCartProduct: CartProduct = cartProducts.find(
    (cartProd: CartProduct) => cartProd.product._id === product._id,
  );

  if (existingCartProduct) {
    return <CartControllerBar existingCartProduct={existingCartProduct} />;
  } else {
    return (
      <button
        onClick={() => addToCart(product)}
        className="sm:text-md z-index-100 rounded-lg bg-orange-300 py-2 text-base font-bold transition-colors duration-200 hover:bg-orange-800 hover:text-white lg:py-3"
      >
        Add to Cart
      </button>
    );
  }
}
