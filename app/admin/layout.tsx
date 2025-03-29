import Link from "next/link";
import Image from "next/image";
import { ClipboardDocumentListIcon, DocumentPlusIcon, FolderPlusIcon, FolderOpenIcon } from "@heroicons/react/24/outline";

export default function AdminLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return <div className="flex rounded-lg sm:gap-2">
        <div className="flex flex-col gap-5 bg-slate-50 p-2 rounded-lg min-h-[calc(100vh-66px)]">
            <h2 className="text-center">ADMIN</h2>
            <ul className="flex flex-col gap-3 justify-center">
                <Link className="flex flex-col gap-2 items-center" href="/admin">
                    <ClipboardDocumentListIcon className="size-7" />
                    <p className='text-xs'>Inventory</p>
                </Link>
                <Link className="flex flex-col gap-2 items-center" href="/admin">
                    <FolderOpenIcon className="size-7" />
                    <p className='text-xs'>Categories</p>
                </Link>
                <Link className="flex flex-col gap-2 items-center" href="/admin/newProduct">
                    <DocumentPlusIcon className="size-7" />
                    <p className='text-xs text-center'>New Product</p>
                </Link>
                <Link className="flex flex-col gap-2 items-center" href="/admin/newCategory">
                    <FolderPlusIcon className="size-7" />
                    <p className='text-xs text-center'>New Category</p>
                </Link>
            </ul>
        </div>
        {children}
    </div>;
}