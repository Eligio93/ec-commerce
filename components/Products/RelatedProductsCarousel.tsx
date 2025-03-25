'use client'
import useEmblaCarousel from 'embla-carousel-react'
import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/24/outline'
import { HydratedDocument } from 'mongoose'
import ProductInterface from '@/interfaces/product.interface'
import Image from 'next/image'
import Link from 'next/link'

export default function RelatedProductCarousel({ products }: any) {
    const [emblaRef, emblaApi] = useEmblaCarousel({
        loop: true, align: 'start'
    })
    return (
        <div className='flex '>
            <div onClick={() => emblaApi?.scrollPrev()} className='flex items-center'>
                <ChevronLeftIcon className='size-8' />
            </div>

            <div className="embla overflow-hidden flex-1" ref={emblaRef}>
                <div className="embla__container flex ">
                    {products.map((product: HydratedDocument<ProductInterface>) => {
                        return <Link key={product.name} href={`/products/${product._id}`} className="embla__slide mr-5 flex-[0_0_100%] sm:flex-[0_0_48%] md:flex-[0_0_31%] lg:flex-[0_0_20%] p-3 bg-orange-200 lg:mr-5 rounded-lg flex flex-col gap-2 group">
                            <div className='relative h-[150px]'>
                                <Image
                                    src={product.images[0]}
                                    alt={product.name + " image"}
                                    fill
                                    className="object-contain"
                                />
                            </div>
                            <div className='flex flex-col gap-1 group-hover:underline'>
                                <p className='text-xs text-orange-800'>{product.brand}</p>
                                <p>{product.name}</p>
                            </div>

                        </Link>
                            
                    })}

                </div>
            </div>
            <div onClick={() => emblaApi?.scrollNext()} className='flex items-center'>
                <ChevronRightIcon className='size-8' />
            </div>
        </div>
    )
}