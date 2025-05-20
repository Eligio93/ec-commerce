'use client'

import CategoryInterface from "@/interfaces/category.interface"
import Link from "next/link"
import { PencilSquareIcon, TrashIcon } from "@heroicons/react/24/outline"
import { useState } from "react"
import { toast } from "sonner"

type Props = {
    category: CategoryInterface
}

export default function InventoryCategoryCard({ category }: Props) {
    const [openDescription, setOpenDescription] = useState<boolean>(false)
    const [openPopUp, setOpenPopUp] = useState<boolean>(false)


    function expandDescription() {
        setOpenDescription(!openDescription)

    }

    async function handleCategoryDelete() {
        const res = await fetch(`http://localhost:3000/api/categories/${category._id}`, {
            method: 'DELETE'
        })
        const data = await res.json()
        console.log(res)
        if (!res.ok) {
            toast.error(data.message)
            setOpenPopUp(false)
        } else {
            toast.success('Category deleted successfully')
            setOpenPopUp(false)
        }

        console.log(data)

    }
    return <><div className={`cursor-pointer flex flex-col  bg-white  p-2 rounded-lg hover:shadow-md`}>
        <div onClick={expandDescription} className="flex justify-between gap-3 items-center">
            <h2 className="text-md">{category.name}</h2>
            <div className="flex items-center gap-4">
                <Link onClick={(e) => e.stopPropagation()} href={`/admin/edit/${category._id}`}>
                    <PencilSquareIcon title="Edit" className="transition-transform size-5 md:size-6 text-violet-600 hover:scale-125" />
                    <p className="hidden">Edit</p>
                </Link>
                <button onClick={(e) => { e.stopPropagation(); setOpenPopUp(true); }} className="text-sm">
                    <TrashIcon title="Delete" className="size-5 transition-transform md:size-6 text-red-600 hover:scale-125" />
                </button>
            </div>
        </div>
        <p className={`transition-all text-orange-800 duration-200 max-h-0 overflow-hidden opacity-0 ${openDescription ? 'max-h-[700px] opacity-100 pt-2  ' : ''}`}>{category.description}</p>
    </div>
        {openPopUp && <div className="absolute flex justify-center items-center top-0 left-0 w-full h-full bg-black bg-opacity-50 z-30">
            <div className="h-[30%] w-4/5 md:w-2/4 bg-white rounded-lg flex flex-col gap-5 justify-center items-center z-[9999] p-3">
                <p className="text-center">Are you sure you want to delete this category?</p>
                <p className="font-bold">{category.name}</p>
                <div className="flex gap-5">
                    <button className="bg-red-700 text-white py-1 font-bold px-6 rounded-full hover:bg-red-500" onClick={() => setOpenPopUp(false)}>Cancel</button>
                    <button className="transition-colors bg-green-900 text-white py-1 font-bold px-6 rounded-full hover:bg-green-700" onClick={handleCategoryDelete}>Confirm</button>
                </div>
            </div>
        </div>}
    </>
}