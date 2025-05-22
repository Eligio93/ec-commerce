import Link from "next/link";
import {
  ClipboardDocumentListIcon,
  DocumentPlusIcon,
  FolderPlusIcon,
  FolderOpenIcon,
} from "@heroicons/react/24/outline";

export default function AdminLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="flex rounded-lg">
      <div className="flex min-h-[calc(100vh-66px)] w-fit flex-col gap-5 rounded-lg bg-slate-50 p-1 sm:px-2">
        <h2 className="text-center font-bold">Admin</h2>
        <ul className="flex flex-col justify-center gap-3">
          <Link className="flex flex-col items-center gap-2" href="/admin">
            <ClipboardDocumentListIcon className="size-6 sm:size-7" />
            <p className="text-xs">Inventory</p>
          </Link>
          <Link
            className="flex flex-col items-center gap-2"
            href="/admin/categories"
          >
            <FolderOpenIcon className="size-6 sm:size-7" />
            <p className="text-xs">Categories</p>
          </Link>
          <Link
            className="flex flex-col items-center gap-2"
            href="/admin/newProduct"
          >
            <DocumentPlusIcon className="size-6 sm:size-7" />
            <p className="text-center text-xs">New Product</p>
          </Link>
          <Link
            className="flex flex-col items-center gap-2"
            href="/admin/newCategory"
          >
            <FolderPlusIcon className="size-6 sm:size-7" />
            <p className="text-center text-xs">New Category</p>
          </Link>
        </ul>
      </div>
      <div className="w-full px-2">{children}</div>
    </div>
  );
}
