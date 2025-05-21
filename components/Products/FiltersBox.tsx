'use client'
import { useEffect, useState } from "react"
import brands from "@/schemas/json/mainBrands.json"
import CategoryInterface from "@/interfaces/category.interface"

interface FilterBoxProps {
    categories: CategoryInterface[]
    openFilters: boolean
}


export default function FilterBox({ categories, openFilters }: FilterBoxProps) {



    const filters = [
        {
            name: "Category",
            values: categories.map((category) => category.name)
        }, {
            name: "Brand",
            values: brands.map((brand) => brand.name)
        }
    ]
    return <div className={`shadow-lg absolute transition-transform duration-300 top-full mt-1 z-10 w-full lg:w-2/3 max-h-[300px] overflow-y-auto border border-orange-800 bg-white rounded-lg p-1 ${openFilters ? 'scale-100' : '-translate-y-1/2 -translate-x-1/2 scale-0'}`}>
        {filters.map((filter, index) => {
            return <fieldset key={index}>
                <legend className="font-bold">{filter.name}</legend>
                <hr />
                {filter.values.map((value, index) => {
                    return <div key={index} className="flex gap-2">
                        <input type="checkbox" id={value} name={value} className="checked:bg-orange-800" />
                        <label htmlFor={value}>{value}</label>
                    </div>
                })}
            </fieldset>
        })}
    </div>
}