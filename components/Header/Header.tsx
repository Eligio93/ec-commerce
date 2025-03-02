"use client";
import Navbar from "./Navbar";
import Link from "next/link";
import { useEffect, useState, useContext, useRef } from "react";
import { useSession } from "next-auth/react";
import { signOut } from "next-auth/react";
import profileIcon from "@/public/profileIcon.svg";
import cartIcon from "@/public/cartIcon.svg";
import hamburgerIcon from "@/public/hamburgerIcon.svg";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { cartContext } from "@/config/CartProvider";
import Cart from "../Cart/Cart";
import { AnimatePresence } from "motion/react";
import { motion } from 'motion/react'
import { XMarkIcon, LockClosedIcon, ArrowRightStartOnRectangleIcon, UserPlusIcon, KeyIcon } from "@heroicons/react/24/outline";
import { BriefcaseIcon } from "@heroicons/react/24/outline";



export default function Header() {
  const { cartProducts } = useContext(cartContext);
  const [openMenu, setOpenMenu] = useState(false);
  const [openCart, setOpenCart] = useState(false);
  const [openUser, setOpenUser] = useState(false);
  const { data: session, status } = useSession();
  const location = usePathname();
  const menuRef = useRef<HTMLDivElement>(null);
  const cartRef = useRef<HTMLDivElement>(null);
  const userRef = useRef<HTMLDivElement>(null);
  //when change location the menus get closed
  useEffect(() => {
    closeAllMenus();
  }, [location]);

  //close menus when click outside of the menu
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      const cartIcon = document.querySelector('[data-cart-icon]');
      const userIcon = document.querySelector('[data-user-icon]');

      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setOpenMenu(false);
      }
      if (cartRef.current && !cartRef.current.contains(event.target as Node) &&
        !cartIcon?.contains(event.target as Node)) {
        setOpenCart(false);
      }
      if (userRef.current && !userRef.current.contains(event.target as Node) &&
        !userIcon?.contains(event.target as Node)) {
        setOpenUser(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  })
  //invoke this function everytime we open a new menu to close the rest of the menus
  function closeAllMenus() {
    setOpenMenu(false);
    setOpenCart(false);
    setOpenUser(false);
  }
  return (
    <div className="header bg-orange-100 sticky h-16 flex items-center p-3 top-0 z-50">
      <div className="flex-1 justify-start lg:hidden ">
        {/* Hamburger */}
        <div
          onClick={(e) => {
            closeAllMenus();
            setOpenMenu(!openMenu);
          }}
          className="size-6 cursor-pointer transition-opacity "
        >
          {openMenu ? <XMarkIcon className="size-6 stroke-red-500" /> : <Image src={hamburgerIcon} alt="hamburgerIcon" />}
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
      <AnimatePresence initial={false}>
        <Navbar openMenu={openMenu} reference={menuRef as React.RefObject<HTMLDivElement>} />
      </AnimatePresence>



      <div className="flex items-center gap-4 flex-1 justify-end sm:gap-5 md:gap-6 lg:gap-7 ">
        {/*Cart*/}
        <div
          className="size-6 text-orange-400 cursor-pointer lg:size-8 relative"
          data-cart-icon
          onClick={(e) => {
            closeAllMenus();
            setOpenCart(!openCart);
          }}
        >
          <Image src={cartIcon} alt="cartIcon" />
          {cartProducts.length > 0 && <div className="absolute h-3 w-3 bg-orange-800 rounded-full top-0.5 right-0 animate-bounce">
          </div>}
        </div>
        <AnimatePresence initial={false}>
          {openCart && <Cart reference={cartRef as React.RefObject<HTMLDivElement>} />}</AnimatePresence>
        {/*Profile*/}
        <div
          className="size-6 text-orange-400 cursor-pointer relative lg:size-8"
          data-user-icon
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
        <AnimatePresence initial={false}>
          {openUser && (
            <motion.div
              initial={{ opacity: 0, scale: 0 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0 }}
              className="absolute z-10 right-0 top-full bg-white w-[200px] rounded-lg"
              ref={userRef}

            >
              <nav >
                {status === "authenticated" && (
                  <ul className="flex flex-col *:p-2  *:rounded-lg" >

                    <li className=" hover:bg-gray-100" >
                      <Link className="flex items-center gap-2" href={"/dashboard"}>
                        <BriefcaseIcon className="size-5" />
                        Dashboard
                      </Link>
                    </li>

                    {session?.user.isAdmin && (
                      <li className=" hover:bg-gray-100" >
                        <Link className="flex items-center gap-2" href={"/admin"}>
                          <LockClosedIcon className="size-5" />
                          Admin
                        </Link>
                      </li>
                    )}
                    <li className=" hover:bg-gray-100" >

                      <button className="flex items-center gap-2 w-full" onClick={async () => await signOut()}>
                        <ArrowRightStartOnRectangleIcon className="size-5" />
                        Logout
                      </button>
                    </li>
                  </ul>
                )}
                {status === "unauthenticated" && (
                  <ul className="flex flex-col *:p-2  *:rounded-lg" >
                    <li className=" hover:bg-gray-100">
                      <Link className="flex items-center gap-2" href={"/login"}>
                        <KeyIcon className="size-5" />
                        Login
                      </Link>
                    </li>
                    <li className=" hover:bg-gray-100" >
                      <Link className="flex items-center gap-2" href={"/register"}>
                        <UserPlusIcon className="size-5" />
                        Create a new Account
                      </Link>
                    </li>

                  </ul>
                )}
              </nav>
            </motion.div>
          )}
        </AnimatePresence>

      </div>
    </div>
  );
}
