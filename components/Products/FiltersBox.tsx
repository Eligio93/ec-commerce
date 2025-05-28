"use client";
import React from "react";
import brands from "@/schemas/json/mainBrands.json";
import CategoryInterface from "@/interfaces/category.interface";
import { useSearchParams, useRouter, usePathname } from "next/navigation";


interface FilterBoxProps {
  categories: CategoryInterface[];
  openFilters: boolean;
}
interface IhandleFilterChange {
  e: React.ChangeEvent<HTMLInputElement>;
  filterName: string;
}

export default function FilterBox({ categories, openFilters }: FilterBoxProps) {
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathName = usePathname();
  const filters = [
    {
      name: "Category",
      values: categories.map((category) => category.name),
    },
    {
      name: "Brand",
      values: brands.map((brand) => brand.name),
    },
  ];
  function handleFilterChange({ e, filterName }: IhandleFilterChange) {
    switch (e.target.checked) {
      // Case we select the checkbox
      case true:
        const currentValues = searchParams.get(filterName)?.split("_") || [];
        const newValues = [...currentValues, e.target.name];
        const newUrl = new URL(window.location.href);
        newUrl.searchParams.set(filterName, newValues.join("_"));
        router.push(newUrl.pathname + newUrl.search);
        break;
      //Case we deselect the checkbox
      case false:
        const filterContent = searchParams.get(filterName);
        const newFilterContent = filterContent
          ?.split("_")
          .filter((query) => query !== e.target.name);
        if (newFilterContent && newFilterContent.length > 0) {
          // Se ci sono ancora altri filtri, aggiorna l'URL mantenendo gli altri parametri
          const newUrl = new URL(window.location.href);
          newUrl.searchParams.set(filterName, newFilterContent.join("_"));
          router.push(newUrl.pathname + newUrl.search);
        } else {
          // Se non ci sono più filtri per questa categoria, rimuovi il parametro
          const newUrl = new URL(window.location.href);
          newUrl.searchParams.delete(filterName);
          router.push(
            newUrl.pathname + (newUrl.search ? newUrl.search : ""),
          );
        }
        break;
    }
  }
  return (
    <div
      className={`absolute top-full z-10 mt-1 max-h-[300px] w-full overflow-y-auto rounded-lg border border-orange-800 bg-white shadow-lg transition-transform duration-300 lg:w-1/3 ${openFilters ? "scale-100" : "-translate-x-1/2 -translate-y-1/2 scale-0"}`}
    >
      {filters.map((filter, index) => {
        return (
          <fieldset key={index}>
            <legend className="p-2 font-bold">{filter.name}</legend>
            <hr />
            {filter.values.map((value, index) => {
              return (
                <div key={index} className="flex gap-2 px-1 hover:bg-slate-100">
                  <input
                    type="checkbox"
                    id={value}
                    name={value}
                    className="checked:bg-orange-800"
                    onChange={(e) =>
                      handleFilterChange({
                        e,
                        filterName: filter.name.toLowerCase(),
                      })
                    }
                    checked={
                      !!searchParams
                        .get(filter.name.toLowerCase())
                        ?.split("_")
                        .includes(value)
                    }
                  />
                  <label className="w-full" htmlFor={value}>
                    {value}
                  </label>
                </div>
              );
            })}
          </fieldset>
        );
      })}
    </div>
  );
}
