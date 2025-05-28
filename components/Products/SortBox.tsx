"use client";
import { Dispatch, SetStateAction } from "react";

import {
  BarsArrowUpIcon,
  BarsArrowDownIcon,
} from "@heroicons/react/24/outline";
import { useRouter } from "next/navigation";

interface SortBoxProps {
  openSort: boolean;
  setOpenSortAction: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function SortBox({ openSort, setOpenSortAction }: SortBoxProps) {
  const router = useRouter();

  const sortOptions = [
    {
      name: "Price Low to High",
      value: "asc",
      icon: BarsArrowUpIcon,
      param: "price",
    },
    {
      name: "Price High to Low",
      value: "desc",
      icon: BarsArrowDownIcon,
      param: "price",
    },
  ];

  function handleSortSelection(param: string, value: string) {
    setOpenSortAction(false)
    const url = new URL(window.location.href);
    url.searchParams.set(param, value);
    router.push(url.pathname + url.search);
  }
  return (
    <div
      className={`absolute right-0 top-full z-10 mt-1 flex max-h-[300px] w-[150px] flex-col gap-2 overflow-y-auto rounded-lg border border-orange-800 bg-white shadow-lg transition-transform duration-300 ${openSort ? "scale-100" : "-translate-y-1/2 translate-x-1/2 scale-0"}`}
    >
      {sortOptions.map((option, index) => {
        return (
          <div
            key={index}
            className="flex cursor-pointer  items-center gap-2 p-2 hover:bg-slate-100"
            onClick={() => handleSortSelection(option.param, option.value)}
          >
            <option.icon className="size-5 stroke-orange-800" />
            <p className="text-sm">{option.name}</p>
          </div>
        );
      })}
    </div>
  );
}
