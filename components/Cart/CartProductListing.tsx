import { CartProduct } from "@/config/CartProvider";
import Image from "next/image";
import Link from "next/link";
import CartControllerBar from "../CartControllerBar";
import calculateDiscountedPrice from "@/utils/calculateDiscountedPrice";
import RemoveBtn from "./RemoveBtn";

export default function CartProductListing({
  cartItem,
}: {
  cartItem: CartProduct;
}) {
  const product = cartItem.product;
  return (
    <>
      {" "}
      <div className="flex flex-col gap-2 px-2">
        <div className="flex items-center gap-4">
          <div className="relative h-[50px] min-w-[50px]">
            <Image
              src={product.images[0]}
              alt={product.name + "image"}
              fill
              className="object-contain"
            />
          </div>
          <Link
            className="font-bold hover:underline"
            href={`/products/${product._id}`}
          >
            {product.name}
          </Link>
        </div>
        <p className="text-xs">Q.ty:</p>
        <CartControllerBar existingCartProduct={cartItem} />
        <div className="flex justify-between">
          <p className="text-sm">Price:</p>
          <p className="font-bold">
            $
            {calculateDiscountedPrice(
              product.price,
              product.discount,
              cartItem.quantity,
            )}
          </p>
        </div>
        <RemoveBtn itemToRemove={cartItem} />
      </div>
      <hr className="border-orange-400" />
    </>
  );
}
