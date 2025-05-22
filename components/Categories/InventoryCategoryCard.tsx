"use client";

import CategoryInterface from "@/interfaces/category.interface";
import Link from "next/link";
import { PencilSquareIcon, TrashIcon } from "@heroicons/react/24/outline";
import { useState } from "react";
import { toast } from "sonner";

type Props = {
  category: CategoryInterface;
};

export default function InventoryCategoryCard({ category }: Props) {
  const [openDescription, setOpenDescription] = useState<boolean>(false);
  const [openPopUp, setOpenPopUp] = useState<boolean>(false);

  function expandDescription() {
    setOpenDescription(!openDescription);
  }

  async function handleCategoryDelete() {
    const res = await fetch(
      `http://localhost:3000/api/categories/${category._id}`,
      {
        method: "DELETE",
      },
    );
    const data = await res.json();
    console.log(res);
    if (!res.ok) {
      toast.error(data.message);
      setOpenPopUp(false);
    } else {
      toast.success("Category deleted successfully");
      setOpenPopUp(false);
    }
  }
  return (
    <>
      <div
        className={`flex cursor-pointer flex-col rounded-lg bg-white p-2 hover:shadow-md`}
      >
        <div
          onClick={expandDescription}
          className="flex items-center justify-between gap-3"
        >
          <h2 className="text-md">{category.name}</h2>
          <div className="flex items-center gap-4">
            <Link
              onClick={(e) => e.stopPropagation()}
              href={`/admin/edit/${category._id}`}
            >
              <PencilSquareIcon
                title="Edit"
                className="size-5 text-violet-600 transition-transform hover:scale-125 md:size-6"
              />
              <p className="hidden">Edit</p>
            </Link>
            <button
              onClick={(e) => {
                e.stopPropagation();
                setOpenPopUp(true);
              }}
              className="text-sm"
            >
              <TrashIcon
                title="Delete"
                className="size-5 text-red-600 transition-transform hover:scale-125 md:size-6"
              />
            </button>
          </div>
        </div>
        <p
          className={`max-h-0 overflow-hidden text-orange-800 opacity-0 transition-all duration-200 ${openDescription ? "max-h-[700px] pt-2 opacity-100" : ""}`}
        >
          {category.description}
        </p>
      </div>
      {openPopUp && (
        <div className="absolute left-0 top-0 z-30 flex h-full w-full items-center justify-center bg-black bg-opacity-50">
          <div className="z-[9999] flex h-[30%] w-4/5 flex-col items-center justify-center gap-5 rounded-lg bg-white p-3 md:w-2/4">
            <p className="text-center">
              Are you sure you want to delete this category?
            </p>
            <p className="font-bold">{category.name}</p>
            <div className="flex gap-5">
              <button
                className="rounded-full bg-red-700 px-6 py-1 font-bold text-white hover:bg-red-500"
                onClick={() => setOpenPopUp(false)}
              >
                Cancel
              </button>
              <button
                className="rounded-full bg-green-900 px-6 py-1 font-bold text-white transition-colors hover:bg-green-700"
                onClick={handleCategoryDelete}
              >
                Confirm
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
