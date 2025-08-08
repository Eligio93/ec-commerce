"use client";

import CategoryInterface from "@/interfaces/category.interface";
import Link from "next/link";
import { PencilSquareIcon, TrashIcon } from "@heroicons/react/24/outline";
import { useState } from "react";
import { toast } from "sonner";
import ConfirmationPopUp from "../ConfirmationPopUp";

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
      `${process.env.NEXT_PUBLIC_URL}/api/categories/${category._id}`,
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
        <ConfirmationPopUp
          title="Are you sure you want to delete this category?"
          specifiedElement={category.name}
          setPopUpState={setOpenPopUp}
          confirmAction={handleCategoryDelete}
        />
      )}
    </>
  );
}
