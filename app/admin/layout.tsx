import Link from "next/link";

export default function AdminLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return <div className="flex gap-5 border rounded-lg">
        <div className="flex flex-col gap-5 bg-slate-50 p-3 rounded-lg h-[calc(100vh-66px)]">
            <h2>Admin</h2>
            <ul className="flex flex-col gap-2">
                <Link href="/admin">Inventory</Link>
                <Link href="admin/newProduct">Create New Product</Link>
                <Link href="admin/newCategory">Create New Category</Link>
            </ul>



        </div>
        {children}
    </div>;
}