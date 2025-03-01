'use client'
import { useContext } from "react"
import { cartContext } from "@/config/CartProvider"


export default function EmptyCartBtn() {
    const { clearCart } = useContext(cartContext)
    return (
        <button className="transition-colors duration-200 text-sm sm:text-base py-1 lg:py-2 bg-red-500 rounded-lg font-bold hover:bg-red-700 hover:text-white" onClick={() => clearCart()}>
            Empty Cart
        </button>
    )
}