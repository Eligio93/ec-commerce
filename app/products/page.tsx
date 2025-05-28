"use client";
import ProductListingCard from "@/components/ProductListingCard";
import ProductInterface from "@/interfaces/product.interface";
import { useEffect, useState } from "react";
import {
  AdjustmentsHorizontalIcon,
  Bars3BottomRightIcon,
} from "@heroicons/react/24/solid";
import FilterBox from "@/components/Products/FiltersBox";
import CategoryInterface from "@/interfaces/category.interface";
import SortBox from "@/components/Products/SortBox";
import { useSearchParams } from "next/navigation";
import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";
import noProductsFound from "@/public/noProductsFound.png";
import Image from "next/image";
import Link from "next/link";






export default function Products() {
  const [products, setProducts] = useState<ProductInterface[]>([]);
  const [categories, setCategories] = useState<CategoryInterface[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [search, setSearch] = useState<string>("");
  const [filteredProducts, setFilteredProducts] = useState<ProductInterface[]>(
    [],
  );
  const [openFilters, setOpenFilters] = useState<boolean>(false);
  const [openSort, setOpenSort] = useState<boolean>(false);
  const searchParams = useSearchParams();
  const [filtersCount, setFiltersCount] = useState<number>(0)
  // Gets all products
  useEffect(() => {
    async function getProducts() {
      setLoading(true);
      try {
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_URL}/api/products`,
        );
        const products: ProductInterface[] = await response.json();
        setProducts(products);
      } catch (err) {
        console.error("Errorin fetching products:", err);
      } finally {
        setLoading(false);
      }
    }
    getProducts();
  }, []);

  useEffect(() => {
    const categoryParams = searchParams.get("category");
    const brandParams = searchParams.get("brand");
    const priceParams = searchParams.get("price");
    let filteredArray = [...products];

    // filter by category
    if (categoryParams) {
      const categoryParamsArray = categoryParams.split("_");
      filteredArray = filteredArray.filter((product) =>
        categoryParamsArray.includes(product.category.name),
      );
    }
    // filter by brand
    if (brandParams) {
      const brandParamsArray = brandParams.split("_");
      filteredArray = filteredArray.filter((product) =>
        brandParamsArray.includes(product.brand),
      );
    }
    // filter by price
    if (priceParams) {
      if (priceParams === "asc") {
        filteredArray.sort((a, b) => a.price - b.price);
      }
      if (priceParams === "desc") {
        filteredArray.sort((a, b) => b.price - a.price);
      }
    }

    // Filter products base on searching query
    if (search.trim() !== "") {
      filteredArray = filteredArray.filter((product) =>
        product.name.toLowerCase().includes(search.toLowerCase()),
      );

    }
    setFiltersCount((categoryParams ? categoryParams.split("_").length : 0) + (brandParams ? brandParams.split("_").length : 0))
    setFilteredProducts(filteredArray);
  }, [search, products, searchParams]);
  // Gets Categories for filtering
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_URL}/api/categories`,
        );
        const data = await res.json();
        setCategories(data);
      } catch (err) {
        console.log(err);
      }
    };
    fetchCategories();
  }, []);

  if (loading) return <p className="text-center">Loading</p>;
  return (
    <div className="flex flex-col gap-3 p-1">
      <div className="flex items-center gap-2">
        <MagnifyingGlassIcon className="size-6 stroke-orange-800" />
        <input
          type="text"
          placeholder="Search..."
          className="w-full rounded-full px-2 py-1 focus:outline-orange-800"
          onChange={(e) => setSearch(e.target.value)}
        />

      </div>
      <div className="relative flex justify-between">
        <div
          className="flex cursor-pointer items-center gap-2 rounded-lg border border-orange-800 bg-white px-4 py-1"
          onClick={() => {
            setOpenSort(false);
            setOpenFilters(!openFilters);
          }}
        >
          <AdjustmentsHorizontalIcon className="size-5 fill-orange-800" />
          <p>Filters</p>

          <div className={`${filtersCount === 0 ? "hidden" : ""} flex size-4 items-center justify-center rounded-full bg-orange-800`}>
            <p className="text-sm text-white">{filtersCount}</p>
          </div>
        </div>
        <FilterBox categories={categories} openFilters={openFilters} />

        <div
          className="flex cursor-pointer items-center gap-2 rounded-lg border border-orange-800 bg-white px-4 py-1"
          onClick={() => {
            setOpenFilters(false);
            setOpenSort(!openSort);
          }}
        >
          <Bars3BottomRightIcon className="size-5 fill-orange-800" />
          <p>Sort</p>
        </div>
        <SortBox openSort={openSort} setOpenSortAction={setOpenSort} />
      </div>

      {filteredProducts.length > 0 ? <div className="grid grid-cols-2 gap-3 sm:grid-cols-4 lg:grid-cols-4">
        {filteredProducts.map((product) => {
          return <ProductListingCard product={product} key={product.name} />;
        })}
      </div> : <div className="flex flex-col gap-5 items-center w-full">
        <Image src={noProductsFound} alt="no products found" className="size-60" />
        <p className="font-['Rubik_Dirt'] text-orange-800">No Products Found</p>
        <Link href={"/products"} className="font-bold transition-colors rounded-full bg-orange-400 px-4 py-1 hover:bg-orange-800 hover:text-white">All Prodcuts</Link>
        <Link href={"/"} className="font-bold transition-colors rounded-full bg-orange-400 px-4 py-1 hover:bg-orange-800 hover:text-white">Home</Link>
      </div>}

    </div>
  );
}


