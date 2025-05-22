"use client";
import { useEffect, useState } from "react";
import brands from "@/schemas/json/mainBrands.json";
import CategoryInterface from "@/interfaces/category.interface";

interface FilterBoxProps {
  categories: CategoryInterface[];
  openFilters: boolean;
}

export default function FilterBox({ categories, openFilters }: FilterBoxProps) {
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
  return (
    <div
      className={`absolute top-full z-10 mt-1 max-h-[300px] w-full overflow-y-auto rounded-lg border border-orange-800 bg-white p-1 shadow-lg transition-transform duration-300 lg:w-2/3 ${openFilters ? "scale-100" : "-translate-x-1/2 -translate-y-1/2 scale-0"}`}
    >
      {filters.map((filter, index) => {
        return (
          <fieldset key={index}>
            <legend className="font-bold">{filter.name}</legend>
            <hr />
            {filter.values.map((value, index) => {
              return (
                <div key={index} className="flex gap-2">
                  <input
                    type="checkbox"
                    id={value}
                    name={value}
                    className="checked:bg-orange-800"
                  />
                  <label htmlFor={value}>{value}</label>
                </div>
              );
            })}
          </fieldset>
        );
      })}
    </div>
  );
}
