"use client";

import ProductInterface from "@/interfaces/product.interface";
import InventoryProductCard from "@/components/Products/InventoryProductCard";
import { useState, useEffect } from "react";

export default function Admin() {
  const [query, setQuery] = useState("");
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [products, setProducts] = useState<ProductInterface[] | null>(null);
  const [filteredProducts, setFilteredProducts] = useState<ProductInterface[]>(
    [],
  );

  useEffect(() => {
    async function getProducts() {
      try {
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_URL}/api/products`,
        );
        const products: ProductInterface[] = await response.json();
        setProducts(products);
      } catch (err) {
        console.error("Errorin fetching products:", err);
      } finally {
        setIsLoading(false);
      }
    }
    getProducts();
  }, []);

  useEffect(() => {
    if (products) {
      if (query.trim() === "") {
        setFilteredProducts(products);
      } else {
        const filteredArray = products.filter((product) =>
          product.name.toLowerCase().includes(query.toLowerCase().trim()),
        );
        setFilteredProducts(filteredArray);
      }
    }
  }, [query, products]);

  return (
    <div className="w-full">
      <h1 className="rounded-lg bg-orange-800 px-3 py-1 text-xl text-white">
        Inventory
      </h1>
      {isLoading ? (
        <p>Loading...</p>
      ) : products ? (
        <div className="flex flex-col gap-5 p-2">
          <div className="w-full">
            <input
              className="w-full rounded-lg p-2"
              type="text"
              placeholder="Search for Items"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
            />
          </div>
          {filteredProducts.length > 0 ? (
            filteredProducts.map((product) => (
              <InventoryProductCard key={product.name} product={product} />
            ))
          ) : (
            <div>
              <p>No products found</p>
            </div>
          )}
        </div>
      ) : (
        <p>No products</p>
      )}
    </div>
  );
}
