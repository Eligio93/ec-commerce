import Link from "next/link";
//show all products and implement search to find them 
// create newProduct and newCategory Link
// give the chance to edit every product and category

export default function Admin() {
  return (
    <div className="flex flex-col gap-5">

      <h1>Admin</h1>
      <Link href="admin/newProduct">Create New Product</Link>
      <Link href="admin/newCategory">Create New Category</Link>
    </div>
  );
}
