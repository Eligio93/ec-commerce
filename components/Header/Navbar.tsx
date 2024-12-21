import Link from "next/link";
// interface NavbarProps {
//   openMenu: boolean;
// }

export default function Navbar({ openMenu }: { openMenu: boolean }) {
  return (
    <nav
      className={`bg-white ${
        openMenu ? "block" : "hidden"
      }    absolute top-16 left-0 border border-orange-300 w-full p-3 lg:flex lg:static lg:border-none lg:flex-1 lg:p-0`}
    >
      <ul className="lg:flex lg:justify-between lg:w-full items-center">
        <li>
          <Link href={"/"}>Home</Link>
        </li>
        <li>
          <Link href={"/categories"}>Categories</Link>
        </li>
        <li>
          <Link href={"/products"}>All Products</Link>
        </li>
      </ul>
    </nav>
  );
}
