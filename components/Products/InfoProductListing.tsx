'use client'
import { ChevronUpIcon } from "@heroicons/react/24/outline"

export default function InfoProductListing({ description }: { description: string }) {

    return (
        <div >
            <ul className="flex flex-col gap-5">
                <li>
                    <div >
                        <div className="flex justify-between">
                            <p>Description</p>
                            <ChevronUpIcon className="size-4" />
                        </div>

                        <p>{description}</p>
                    </div>
                </li>
                <li>
                    <div className="flex justify-between">
                        <p>Delivery</p>
                        <ChevronUpIcon className="size-4" />
                    </div>
                </li>
                <li>
                    <div className="flex justify-between">
                        <p>Payments</p>
                        <ChevronUpIcon className="size-4" />
                    </div>
                </li>
            </ul>
        </div>
    )
}