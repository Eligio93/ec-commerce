'use client'

import { createContext } from "react";
import { useState } from "react";
import { HydratedDocument, set } from "mongoose";
import ProductInterface from "@/interfaces/product.interface";

export interface CartProduct {
    product: HydratedDocument<ProductInterface>,
    quantity: number
}
export const cartContext = createContext({} as any);

export function CartProvider({ children }: any) {


    const [cartProducts, setCartProducts] = useState<CartProduct[]>([]);

    //function to add a product to the cart
    function addToCart(product: HydratedDocument<ProductInterface>) {
        setCartProducts([{ product, quantity: 1 }, ...cartProducts])
    }
    //function add 1
    function addOne(product: HydratedDocument<ProductInterface>) {
        setCartProducts(cartProducts.map((cartProd) =>
            cartProd.product._id === product._id ?
                { ...cartProd, quantity: cartProd.quantity + 1 } :
                cartProd))
    }
    //function remove 1
    function removeOne(product: HydratedDocument<ProductInterface>) {
        const updatedCart = cartProducts.map((cartProd) =>
            cartProd.product._id === product._id ?
                { ...cartProd, quantity: cartProd.quantity - 1 } :
                cartProd)
        setCartProducts(updatedCart.filter((cartProd) => cartProd.quantity > 0))
    }
    //function clear cart
    function clearCart() {
        setCartProducts([])
    }
    //function update quantity
    function setQuantity(product: HydratedDocument<ProductInterface>, quantity: number) {
        const updatedCart = cartProducts.map((cartProd) =>
            cartProd.product._id === product._id ?
                { ...cartProd, quantity } :
                cartProd)
        setCartProducts(updatedCart.filter((cartProd) => cartProd.quantity > 0))
    }

    //function remove product
    function removeProduct(product: HydratedDocument<ProductInterface>) {
        setCartProducts(cartProducts.filter((cartProd) => cartProd.product._id !== product._id))
    }

    const contextValues = {
        cartProducts,
        addToCart,
        addOne,
        removeOne,
        clearCart,
        setQuantity,
        removeProduct
    }
    return <cartContext.Provider value={contextValues}>{children}</cartContext.Provider>
}