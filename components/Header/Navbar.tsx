import Link from "next/link";
import { motion } from "motion/react";

export default function Navbar({
  openMenu,
  reference,
}: {
  openMenu: boolean;
  reference: React.RefObject<HTMLDivElement>;
}) {
  return (
    <>
      <nav className="hidden lg:static lg:flex lg:flex-1 lg:border-none lg:p-0">
        <ul className="items-center gap-5 lg:flex lg:w-full lg:justify-between">
          <li>
            <Link className="font-['Rubik_Dirt'] text-orange-800" href={"/"}>
              Home
            </Link>
          </li>
          <li>
            <Link
              className="font-['Rubik_Dirt'] text-orange-800"
              href={"/categories"}
            >
              Categories
            </Link>
          </li>
          <li>
            <Link
              className="font-['Rubik_Dirt'] text-orange-800"
              href={"/products"}
            >
              All Products
            </Link>
          </li>
        </ul>
      </nav>
      {/*mobile menu*/}
      {openMenu && (
        <motion.nav
          initial={{ opacity: 0, scale: 0 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0 }}
          className={`absolute left-0 top-16 w-full bg-white p-3 lg:hidden`}
          ref={reference}
        >
          {/* <ul className="lg:flex lg:justify-between lg:w-full items-center"> */}
          <ul className="flex flex-col gap-10">
            <li>
              <Link className="font-['Rubik_Dirt'] text-orange-800" href={"/"}>
                Home
              </Link>
            </li>
            <li>
              <Link
                className="font-['Rubik_Dirt'] text-orange-800"
                href={"/categories"}
              >
                Categories
              </Link>
            </li>
            <li>
              <Link
                className="font-['Rubik_Dirt'] text-orange-800"
                href={"/products"}
              >
                All Products
              </Link>
            </li>
          </ul>
        </motion.nav>
      )}
    </>
  );
}
