import { useContext } from "react"
import { cartContext } from "@/config/CartProvider"
import { CartProduct } from "@/config/CartProvider"
import CartProductListing from "./CartProductListing"
import { motion } from 'motion/react'
import { ShoppingBagIcon } from "@heroicons/react/24/outline"
import Link from "next/link"
import EmptyCartBtn from "./EmptyCartBtn"

export default function Cart({ reference }: { reference: React.RefObject<HTMLDivElement> }) {
    const { cartProducts } = useContext(cartContext)


    return <motion.div
        initial={{ opacity: 0, scale: 0 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0 }}
        className={`absolute shadow-lg rounded-lg z-10 right-0 top-full bg-white  border-2 border-orange-800 w-3/4 max-w-[350px] lg:w-1/4 ${cartProducts.length <= 0 ? 'h-[calc(100vh-64px)]' : 'max-h-[calc(100vh-64px)]'}  overflow-y-auto  [&::-webkit-scrollbar]:w-1
  [&::-webkit-scrollbar-track]:rounded-full
  [&::-webkit-scrollbar-track]:bg-gray-100
  [&::-webkit-scrollbar-thumb]:rounded-full
  [&::-webkit-scrollbar-thumb]:bg-orange-800`}
        ref={reference}
    >
        {cartProducts.length <= 0 ?
            <div className="flex flex-col justify-center items-center h-full gap-5 ">
                <ShoppingBagIcon className="size-10 stroke-slate-500" />
                <p className="text-slate-500">The cart is empty</p>
            </div>
            :
            <>
                <div className="flex flex-col gap-4 p-2 ">
                    {cartProducts.map((product: CartProduct) => <CartProductListing key={product.product._id.toString()} cartItem={product} />)}

                </div>
                <div className="bg-orange-200 text-white flex flex-col gap-2 p-2 sticky bottom-0 rounded-t-lg ">
                    <p className="font-bold text-black">Total:</p>
                    <hr className="border-orange-800" />
                    <p className="font-bold text-black text-lg text-end">${cartProducts.reduce((acc: number, product: CartProduct) => acc + product.product.price * product.quantity, 0).toFixed(2)}</p>
                    <Link className="text-center transition-colors duration-200 text-sm sm:text-base py-1 lg:py-2 bg-green-500 rounded-lg font-bold hover:bg-green-700 hover:text-white" href={'#'}>Checkout</Link>
                    <EmptyCartBtn />
                </div>
            </>
        }

    </motion.div>

}