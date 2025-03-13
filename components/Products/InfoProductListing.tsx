'use client'
import { ChevronUpIcon } from "@heroicons/react/24/outline"
import { useState } from "react"

export default function InfoProductListing({ description }: { description: string }) {
    const [isOpen, setIsOpen] = useState<number | null>(null)
    function toggleInfo(index: number) {
        if (isOpen === index) {
            setIsOpen(null)
        } else {
            setIsOpen(index)
        }
    }

    return (
        <div >
            <ul className="flex flex-col gap-1 ">
                <h2 className="text-xl font-bold mb-4">Information</h2>
                <li>
                    <div className='flex flex-col  border p-2 bg-white rounded-lg' >
                        <div className={`flex justify-between items-center`} onClick={() => toggleInfo(0)}>
                            <p className="font-bold text-orange-800">Description</p>
                            <ChevronUpIcon className={`stroke-orange-800 size-4 ${isOpen === 0 ? 'rotate-180' : ''} transition-all duration-1000`} />
                        </div>
                        <p className={`transition-all  duration-1000 max-h-0 overflow-hidden opacity-0 ${isOpen === 0 ? 'max-h-[700px] opacity-100 mt-2' : ''}`}>{description}</p>
                    </div>
                </li>
                <li>
                    <div className='flex flex-col  border p-2 bg-white rounded-lg' >
                        <div className="flex justify-between items-center" onClick={() => toggleInfo(1)}>
                            <p className="font-bold text-orange-800" >Delivery</p>
                            <ChevronUpIcon className={`stroke-orange-800 size-4 ${isOpen === 0 ? 'rotate-180' : ''} transition-all duration-1000`} />
                        </div>
                        <p className={`transition-all  duration-1000 max-h-0 overflow-hidden opacity-0 ${isOpen === 1 ? 'max-h-[700px] opacity-100 mt-2' : ''}`}>{description}</p>
                    </div>
                </li>
                <li>
                    <div className='flex flex-col  border p-2 bg-white rounded-lg' >
                        <div className={`flex justify-between items-center`} onClick={() => toggleInfo(3)}>
                            <p className="font-bold text-orange-800">Payments</p>
                            <ChevronUpIcon className={`stroke-orange-800 size-4 ${isOpen === 0 ? 'rotate-180' : ''} transition-all duration-1000`} />
                        </div>
                        <p className={`transition-all  duration-1000 max-h-0 overflow-hidden opacity-0 ${isOpen === 3 ? 'max-h-[700px] opacity-100 mt-2' : ''}`}>{description}</p>

                    </div>
                </li>
            </ul>
        </div>
    )
}