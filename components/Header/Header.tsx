"use client";
import Navbar from "./Navbar";
import Link from "next/link";
import { useEffect, useState, useContext } from "react";
import { useSession } from "next-auth/react";
import { signOut } from "next-auth/react";
import profileIcon from "@/public/profileIcon.svg";
import cartIcon from "@/public/cartIcon.svg";
import hamburgerIcon from "@/public/hamburgerIcon.svg";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { cartContext, CartProduct } from "@/config/CartProvider";
export default function Header() {
  const { cartProducts } = useContext(cartContext);
  const [openMenu, setOpenMenu] = useState(false);
  const [openCart, setOpenCart] = useState(false);
  const [openUser, setOpenUser] = useState(false);
  const { data: session, status } = useSession();
  const location = usePathname();
  //when change location the menus get closed
  useEffect(() => {
    closeAllMenus();
  }, [location]);
  //invoke this function everytime we open a new menu to close the rest of the menus
  function closeAllMenus() {
    setOpenMenu(false);
    setOpenCart(false);
    setOpenUser(false);
  }
  return (
    <div className="header h-16 flex items-center p-3 text-orange-400 rounded-b-lg relative">
      <div className="flex-1 justify-start lg:hidden ">
        {/* Hamburger */}
        <div
          onClick={(e) => {
            closeAllMenus();
            setOpenMenu(!openMenu);
          }}
          className="size-6 cursor-pointer"
        >
          <Image src={hamburgerIcon} alt="hamburgerIcon" />
        </div>
      </div>

      {/*Title or Logo*/}
      <Link
        href="/"
        className="font-bold mx-auto text-3xl flex-1 text-center lg:text-left"
      >
        Satur
      </Link>

      {/*NavBar*/}
      <Navbar openMenu={openMenu} />

      <div className="flex items-center gap-4 flex-1 justify-end sm:gap-5 md:gap-6 lg:gap-7 ">
        {/*Cart*/}
        <div
          className="size-6 text-orange-400 cursor-pointer lg:size-8"
          onClick={(e) => {
            closeAllMenus();
            setOpenCart(!openCart);
          }}
        >
          <Image src={cartIcon} alt="cartIcon" />
        </div>
        {openCart && (
          <div className="absolute z-10 right-0 top-full bg-white border w-3/4 h-[calc(100vh-64px)]">
            {cartProducts.length <= 0 ? <p>The cart is empty</p> : cartProducts.map((product: CartProduct) => <p key={product.product.name}>{product.product.name}</p>)}
          </div>
        )}
        {/*Profile*/}
        <div
          className="size-6 text-orange-400 cursor-pointer relative lg:size-8"
          onClick={(e) => {
            closeAllMenus();
            setOpenUser(!openUser);
          }}
        >
          {session?.user.image ? (
            <Image
              src={session.user.image}
              alt="profileIcon"
              width={500}
              height={500}
              className="rounded-full"
            />
          ) : (
            <Image src={profileIcon} alt="profileIcon" />
          )}
        </div>
        {openUser && (
          <div className="absolute z-10 right-0 top-full bg-white border">
            <nav>
              {status === "authenticated" && (
                <ul className="flex flex-col">
                  <li>
                    <Link href={"/dashboard"}>Dashboard</Link>
                  </li>
                  {session?.user.isAdmin && (
                    <li>
                      <Link href={"/admin"}>Admin</Link>
                    </li>
                  )}
                  <li>
                    <button onClick={async () => await signOut()}>
                      Logout
                    </button>
                  </li>
                </ul>
              )}
              {status === "unauthenticated" && (
                <ul className="flex flex-col">
                  <Link href={"/login"}>Login</Link>
                  <Link href={"/register"}>Create a new Account</Link>
                </ul>
              )}
            </nav>
          </div>
        )}
      </div>
    </div>
  );
}
