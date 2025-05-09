'use client'

import Link from "next/link";
import { HydratedDocument, set } from "mongoose";
import ProductInterface from "@/interfaces/product.interface";
import InventoryProductCard from "@/components/Products/InventoryProductCard";
import { useState, useEffect } from "react";



export default function Admin() {
  const [query, setQuery] = useState("")
  const [isLoading, setIsLoading] = useState<boolean>(true)
  const [products, setProducts] = useState<HydratedDocument<ProductInterface>[] | null>(null)
  const [filteredProducts, setFilteredProducts] = useState<HydratedDocument<ProductInterface>[]>([])


  useEffect(() => {
    async function getProducts() {
      try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_URL}/api/products`);
        console.log(response)
        const products: HydratedDocument<ProductInterface>[] = await response.json();
        setProducts(products);
      } catch (err) {
        console.error("Errorin fetching products:", err);
      } finally {
        setIsLoading(false)
      }
    }
    getProducts();
  }, [])

  useEffect(() => {
    if (products) {
      if (query.trim() === "") {
        setFilteredProducts(products)
      } else {
        const filteredArray = products.filter((product) => product.name.toLowerCase().includes(query.toLowerCase().trim()));
        setFilteredProducts(filteredArray)
      }
    }
  }, [query, products])

  console.log(filteredProducts)
  return (
    <div className="w-full">
      <h1>Inventory</h1>
      {isLoading ? (<p>Loading...</p>) : (products ? (
        <div className="flex flex-col gap-5 p-2">
          <div className="w-full">
            <input className="w-full rounded-lg p-2" type="text" placeholder="Search for Items" value={query} onChange={(e) => setQuery(e.target.value)} />
          </div>
          {
            filteredProducts.length > 0 ? (
              filteredProducts.map((product) => <InventoryProductCard key={product.name} product={product} />)
            ) : (
              <div>
                <p>No products found</p>
              </div>
            )
          }

        </div>
      ) : (
        <p>No products</p>
      ))}

    </div>
  );
}
