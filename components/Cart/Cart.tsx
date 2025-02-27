import { useContext } from "react"
import { cartContext } from "@/config/CartProvider"
import { CartProduct } from "@/config/CartProvider"
import CartProductListing from "./CartProductListing"
import { motion } from 'motion/react'
import { ShoppingBagIcon } from "@heroicons/react/24/outline"

export default function Cart({ reference }: { reference: React.RefObject<HTMLDivElement> }) {
    const { cartProducts } = useContext(cartContext)


    return <motion.div
        initial={{ opacity: 0, scale: 0 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0 }}
        className="absolute shadow-lg rounded-lg z-10 right-0 top-full bg-white border w-3/4 max-w-[350px] lg:w-1/4 h-[calc(100vh-64px)] overflow-scroll   [&::-webkit-scrollbar]:w-2
  [&::-webkit-scrollbar-track]:rounded-full
  [&::-webkit-scrollbar-track]:bg-gray-100
  [&::-webkit-scrollbar-thumb]:rounded-full
  [&::-webkit-scrollbar-thumb]:bg-orange-800"
        ref={reference}
    >
        {cartProducts.length <= 0 ?
            <div className="flex flex-col justify-center items-center h-full gap-5 ">
                <ShoppingBagIcon className="size-10 stroke-slate-500" />
                <p className="text-slate-500">The cart is empty</p>
            </div>
            :
            <div className="flex flex-col gap-4 p-2 ">
                {cartProducts.map((product: CartProduct) => <CartProductListing key={product.product._id.toString()} cartItem={product} />)}
            </div>
        }

    </motion.div>

}