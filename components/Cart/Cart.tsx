import { useContext } from "react";
import { cartContext } from "@/config/CartProvider";
import { CartProduct } from "@/config/CartProvider";
import CartProductListing from "./CartProductListing";
import { motion } from "motion/react";
import { ShoppingBagIcon } from "@heroicons/react/24/outline";
import Link from "next/link";
import EmptyCartBtn from "./EmptyCartBtn";

export default function Cart({
  reference,
}: {
  reference: React.RefObject<HTMLDivElement>;
}) {
  const { cartProducts } = useContext(cartContext);

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0 }}
      className={`absolute right-0 top-full z-10 w-3/4 max-w-[350px] rounded-lg border-2 border-orange-800 bg-white shadow-lg lg:w-1/4 ${cartProducts.length <= 0 ? "h-[calc(100vh-64px)]" : "max-h-[calc(100vh-64px)]"} overflow-y-auto [&::-webkit-scrollbar-thumb]:rounded-full [&::-webkit-scrollbar-thumb]:bg-orange-800 [&::-webkit-scrollbar-track]:rounded-full [&::-webkit-scrollbar-track]:bg-gray-100 [&::-webkit-scrollbar]:w-1`}
      ref={reference}
    >
      {cartProducts.length <= 0 ? (
        <div className="flex h-full flex-col items-center justify-center gap-5">
          <ShoppingBagIcon className="size-10 stroke-slate-500" />
          <p className="text-slate-500">The cart is empty</p>
        </div>
      ) : (
        <>
          <div className="flex flex-col gap-4 p-2">
            {cartProducts.map((product: CartProduct) => (
              <CartProductListing
                key={product.product._id.toString()}
                cartItem={product}
              />
            ))}
          </div>
          <div className="sticky bottom-0 flex flex-col gap-2 rounded-t-lg bg-orange-200 p-2 text-white">
            <p className="font-bold text-black">Total:</p>
            <hr className="border-orange-800" />
            <p className="text-end text-lg font-bold text-black">
              $
              {cartProducts
                .reduce(
                  (acc: number, product: CartProduct) =>
                    acc + product.product.price * product.quantity,
                  0,
                )
                .toFixed(2)}
            </p>
            <Link
              className="rounded-lg bg-green-500 py-1 text-center text-sm font-bold transition-colors duration-200 hover:bg-green-700 hover:text-white sm:text-base lg:py-2"
              href={"#"}
            >
              Checkout
            </Link>
            <EmptyCartBtn />
          </div>
        </>
      )}
    </motion.div>
  );
}
