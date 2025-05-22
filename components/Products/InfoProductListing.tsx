"use client";
import {
  ChevronUpIcon,
  ShoppingCartIcon,
  RocketLaunchIcon,
  ShoppingBagIcon,
} from "@heroicons/react/24/outline";
import masterCardIcon from "@/public/masterCardIcon.svg";
import visaIcon from "@/public/visaIcon.svg";
import googlePayIcon from "@/public/googlePayIcon.svg";
import applePayIcon from "@/public/applePayIcon.svg";
import payPalIcon from "@/public/payPalIcon.svg";
import amexIcon from "@/public/amexIcon.svg";
import { useState } from "react";
import Image from "next/image";

const paymentsMethod = [
  {
    name: "Mastercard",
    icon: masterCardIcon,
  },
  {
    name: "Visa",
    icon: visaIcon,
  },
  {
    name: "Google Pay",
    icon: googlePayIcon,
  },
  {
    name: "Apple Pay",
    icon: applePayIcon,
  },
  {
    name: "PayPal",
    icon: payPalIcon,
  },
  {
    name: "American Express",
    icon: amexIcon,
  },
];

export default function InfoProductListing({
  description,
}: {
  description: string;
}) {
  const [isOpen, setIsOpen] = useState<number | null>(null);
  function toggleInfo(index: number) {
    if (isOpen === index) {
      setIsOpen(null);
    } else {
      setIsOpen(index);
    }
  }

  return (
    <div>
      <ul className="flex flex-col gap-1 *:cursor-pointer">
        <h2 className="mb-4 text-xl font-bold">Information</h2>
        <li className="lg:hidden">
          <div className="flex flex-col rounded-lg border bg-white p-2">
            <div
              className={`flex items-center justify-between`}
              onClick={() => toggleInfo(0)}
            >
              <p className="font-bold text-orange-800">Description</p>
              <ChevronUpIcon
                className={`size-5 stroke-orange-800 ${isOpen === 0 ? "rotate-180" : ""} transition-all duration-500`}
              />
            </div>
            <p
              className={`max-h-0 overflow-hidden opacity-0 transition-all duration-500 ${isOpen === 0 ? "mt-2 max-h-[700px] opacity-100" : ""}`}
            >
              {description}
            </p>
          </div>
        </li>
        <li>
          <div className="flex flex-col rounded-lg border bg-white p-2">
            <div
              className="flex items-center justify-between"
              onClick={() => toggleInfo(1)}
            >
              <p className="font-bold text-orange-800">Shipping Info</p>
              <ChevronUpIcon
                className={`size-5 stroke-orange-800 ${isOpen === 1 ? "rotate-180" : ""} transition-all duration-500`}
              />
            </div>
            <div
              className={`max-h-0 overflow-hidden opacity-0 transition-all duration-500 ${isOpen === 1 ? "mt-2 max-h-[700px] opacity-100" : ""}`}
            >
              <ul className="flex flex-col gap-3 font-bold">
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
          <div className="flex flex-col rounded-lg border bg-white p-2">
            <div
              className={`flex items-center justify-between`}
              onClick={() => toggleInfo(2)}
            >
              <p className="font-bold text-orange-800">Supported Payments</p>
              <ChevronUpIcon
                className={`size-5 stroke-orange-800 ${isOpen === 2 ? "rotate-180" : ""} transition-all duration-500`}
              />
            </div>
            <div
              className={`flex max-h-0 flex-wrap justify-evenly gap-3 overflow-hidden opacity-0 transition-all duration-500 ${isOpen === 2 ? "mt-2 max-h-[700px] opacity-100 lg:p-3" : ""} `}
            >
              {paymentsMethod.map((payment, index) => (
                <div key={index} className="flex flex-col items-center gap-2">
                  <Image
                    src={payment.icon}
                    title={payment.name}
                    alt={payment.name}
                    className="lg:size-13 size-10 md:size-12"
                  />
                  <p className="hidden lg:block lg:text-sm">{payment.name}</p>
                </div>
              ))}
            </div>
          </div>
        </li>
      </ul>
    </div>
  );
}
