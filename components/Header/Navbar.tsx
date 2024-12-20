import Link from "next/link";

export default function Navbar() {
  return (
    <nav className="bg-white absolute top-16 left-0 border border-orange-300 w-full p-3">
      <ul>
        <li>
          <Link href={"/"}>Home</Link>
        </li>
        <li>
          <Link href={"/"}>Categories</Link>
        </li>
        <li>
          <Link href={"/"}>All Products</Link>
        </li>
      </ul>
    </nav>
  );
}
