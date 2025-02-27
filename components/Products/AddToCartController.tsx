'use client'
import ProductInterface from "@/interfaces/product.interface";
import { useContext } from "react";
import { cartContext } from "@/config/CartProvider";
import { CartProduct } from "@/config/CartProvider";
import { HydratedDocument } from "mongoose";
import CartControllerBar from "../CartControllerBar";





export default function AddToCartController(product: HydratedDocument<ProductInterface>) {
    const {
        cartProducts,
        addOne,
        addToCart,
        removeOne,
        clearCart,
        setQuantity,
        removeProduct } = useContext(cartContext)
    const existingCartProduct: CartProduct = cartProducts.find((cartProd: CartProduct) => cartProd.product._id === product._id)
    console.log('CART PRODUCTS', cartProducts)

    if (existingCartProduct) {
        return <CartControllerBar existingCartProduct={existingCartProduct} />
    } else {
        return <button onClick={() => addToCart(product)} className="transition-colors duration-200 text-sm sm:text-base py-1 lg:py-3 bg-orange-300 rounded-lg font-bold hover:bg-orange-800 hover:text-white z-index-100">
            Add to Cart
        </button>;
    }



}