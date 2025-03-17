'use client'
import { ChevronUpIcon, ShoppingCartIcon, RocketLaunchIcon, ShoppingBagIcon } from "@heroicons/react/24/outline"
import masterCardIcon from "@/public/masterCardIcon.svg"
import visaIcon from "@/public/visaIcon.svg"
import googlePayIcon from "@/public/googlePayIcon.svg"
import applePayIcon from "@/public/applePayIcon.svg"
import payPalIcon from "@/public/payPalIcon.svg"
import amexIcon from "@/public/amexIcon.svg"
import { useState } from "react"
import Image from "next/image"

const paymentsMethod = [
    {
        name: 'Mastercard',
        icon: masterCardIcon
    }, {
        name: 'Visa',
        icon: visaIcon
    }, {
        name: 'Google Pay',
        icon: googlePayIcon
    }, {
        name: 'Apple Pay',
        icon: applePayIcon
    }, {
        name: 'PayPal',
        icon: payPalIcon
    }, {
        name: 'American Express',
        icon: amexIcon
    }
]

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
                <li className="lg:hidden">
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
                            <ul className="flex flex-col gap-3 font-bold ">
                                <li className="flex items-center gap-2 pl-2">
                                    <ShoppingCartIcon className="size-4 lg:size-6" />
                                    <p>FREE Standard Delivery Over $20</p>
                                </li>
                                <li className="flex items-center gap-2 pl-2">
                                    <RocketLaunchIcon className="size-4 lg:size-6" />
                                    <p>$5.99 EXPRESS Next Day Delivery</p>
                                </li>
                                <li className="flex items-center gap-2 pl-2">
                                    <ShoppingBagIcon className="size-4 lg:size-6" />
                                    <p>FREE Customer Pick-Up</p>
                                </li>
                            </ul>
                        </div>
                    </div>
                </li>
                <li>
                    <div className='flex flex-col  border p-2 bg-white rounded-lg' >
                        <div className={`flex justify-between items-center`} onClick={() => toggleInfo(2)}>
                            <p className="font-bold text-orange-800">Supported Payments</p>
                            <ChevronUpIcon className={`stroke-orange-800 size-5 ${isOpen === 2 ? 'rotate-180' : ''} transition-all duration-500`} />
                        </div>
                        <div className={`transition-all flex flex-wrap gap-3 justify-evenly duration-500 max-h-0 overflow-hidden opacity-0 ${isOpen === 2 ? 'max-h-[700px] opacity-100 mt-2' : ''}`}>
                            {paymentsMethod.map((payment, index) => <div  key={index} className="flex flex-col items-center gap-2">
                                <Image src={payment.icon} title={payment.name} alt={payment.name} className="size-10 md:size-12 lg:size-16" />
                                <p className="hidden lg:block">{payment.name}</p>
                            </div>)}
                        </div>
                    </div>
                </li>
            </ul>
        </div>
    )
}