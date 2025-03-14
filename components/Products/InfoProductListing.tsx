'use client'
import { ChevronUpIcon,ShoppingCartIcon,RocketLaunchIcon,ShoppingBagIcon } from "@heroicons/react/24/outline"
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
                            <ChevronUpIcon className={`stroke-orange-800 size-5 ${isOpen === 0 ? 'rotate-180' : ''} transition-all duration-500`} />
                        </div>
                        <p className={`transition-all  duration-500 max-h-0 overflow-hidden opacity-0 ${isOpen === 0 ? 'max-h-[700px] opacity-100 mt-2' : ''}`}>{description}</p>
                    </div>
                </li>
                <li>
                    <div className='flex flex-col  border p-2 bg-white rounded-lg' >
                        <div className="flex justify-between items-center" onClick={() => toggleInfo(1)}>
                            <p className="font-bold text-orange-800" >Delivery</p>
                            <ChevronUpIcon className={`stroke-orange-800 size-5 ${isOpen === 1 ? 'rotate-180' : ''} transition-all duration-500`} />
                        </div>
                        <div className={`transition-all  duration-500 max-h-0 overflow-hidden opacity-0 ${isOpen === 1 ? 'max-h-[700px] opacity-100 mt-2' : ''}`}>
                            <ul className="flex flex-col gap-3">
                                <li className="flex items-center gap-2 pl-2">
                                    <ShoppingCartIcon className="size-4"/>
                                    <p>FREE Standard Delivery Over $20</p>
                                </li>
                                <li className="flex items-center gap-2 pl-2">
                                    <RocketLaunchIcon className="size-4" />
                                    <p>$5.99 EXPRESS Next Day Delivery</p>
                                </li>
                                <li className="flex items-center gap-2 pl-2">
                                    <ShoppingBagIcon className="size-4" />
                                    <p>FREE Customer Pick-Up</p>
                                </li>
                            </ul>
                        </div>
                    </div>
                </li>
                <li>
                    <div className='flex flex-col  border p-2 bg-white rounded-lg' >
                        <div className={`flex justify-between items-center`} onClick={() => toggleInfo(2)}>
                            <p className="font-bold text-orange-800">Payments</p>
                            <ChevronUpIcon className={`stroke-orange-800 size-5 ${isOpen === 2 ? 'rotate-180' : ''} transition-all duration-500`} />
                        </div>
                        <p className={`transition-all  duration-500 max-h-0 overflow-hidden opacity-0 ${isOpen === 2 ? 'max-h-[700px] opacity-100 mt-2' : ''}`}>{description}</p>

                    </div>
                </li>
            </ul>
        </div>
    )
}