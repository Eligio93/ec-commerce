'use client'

import ProductInterface from "@/interfaces/product.interface";
import { useEffect, useRef, useState } from "react";
import CategoryInterface from "@/interfaces/category.interface";
import Image from "next/image";
import { headers } from "next/headers";


type formProps = {
  product?: ProductInterface;
};

export default function ProductForm({ product }: formProps) {
  const [categories, setCategories] = useState<CategoryInterface[]>([]);
  const [files, setFiles] = useState<string[]>([]);
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    async function getCategories() {
      const res = await fetch("http://localhost:3000/api/categories");
      const categories = await res.json();
      setCategories(categories)
    }
    getCategories();
  }, [])


  async function handleSubmit(e: any) {
    e.preventDefault();
    const formData = new FormData(e.target);
    const res = await fetch("http://localhost:3000/api/products", {
      method: "POST",
      body: formData,
    },)
    console.log('RES', res)
  }

  function addPreview(e: any) {
    if (e.target.files.length > 5) {
      alert('You can only upload 5 images')
      return
    }
    if (files.length >= 5) {
      alert('You can only upload 5 images')
      return
    }
    let filesArray: string[] = [...files];
    if (!e.target.files) {
      return
    }
    for (let i = 0; i < e.target.files.length; i++) {
      filesArray.push(URL.createObjectURL(e.target.files[i]))
    }
    setFiles(filesArray)
    return
  }
  function removePreview(e: any, index: number) {
    const filesArray = files.filter((_, i) => i !== index)
    setFiles(filesArray);

  }
  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-5">
      <div className="flex flex-col">
        <label htmlFor="Title">Title*</label>
        <input className="border" type="text" id="title" name="title" />
      </div>
      <div className="flex flex-col">
        <label htmlFor="description">Description*</label>
        <input className="border" type="text" id="description" name="description" />
      </div>
      <div className="flex flex-col">
        <label htmlFor="brand">Brand*</label>
        <input className="border" type="text" id="brand" name="brand" />
      </div>
      <div className="flex flex-col">{/**QUi ci sara un select per le categorie */}
        <label htmlFor="category">Category*</label>

        <select name="category" id="category">
          {categories.map((category: CategoryInterface) => (
            <option key={category.name} value={category.name}>{category.name}</option>
          ))}
        </select>
      </div>
      <div className="flex flex-col">
        <label htmlFor="price">Price*</label>
        <input className="border" type="number" id="price" name="price" />
      </div>
      <div className="flex flex-col">
        <label htmlFor="genre">Gender:</label>
        <select name="genre" id="genre">
          <option value="men">Men</option>
          <option value="women">Women</option>
          <option value="unisex">Unisex</option>
        </select>
      </div>
      <div className="flex flex-col">
        <label htmlFor="stock">Stock*</label>
        <input className="border" type="number" id="stock" name="stock" />
      </div>
      <div className="flex flex-col">
        <label htmlFor="discount">Discount(%):</label>
        <input className="border" type="number" id="discount" name="discount" />
      </div>
      <div className="flex flex-col">
        <label htmlFor="isFeatured">Feature it?</label>
        <input className="border" type="checkbox" id="isFeatured" name="isFeatured" />
      </div>
      <div className="flex flex-col">
        <label htmlFor="isLive">Live it?</label>
        <input className="border" type="checkbox" id="isLive" name="isLive" />
      </div>
      <div className="flex flex-col">
        <label htmlFor="files">Images</label>
        {files.length > 0 && <div className='flex flex-wrap gap-3 justify-center p-2'>
          {files.map((file, index) => (
            <div className=' relative h-[150px] w-2/3' key={index}>
              <Image className='object-cover' src={file} alt={file} fill />
              <button type="button" onClick={(e) => removePreview(e, index)} className="absolute w-6 h-6 top-0 right-0 rounded-full translate-x-1/3 -translate-y-1/3 bg-red-500 text-white text-center font-bold shadow-lg">x</button>
            </div>

          ))}
        </div>}

        <input className='text-white' type="file" id="files" name="file" multiple onChange={addPreview} ref={fileInputRef} />

      </div>


      <button type="submit">Submit</button>
    </form>
  );
}

// const ProductSchema = new Schema<ProductInterface>({
//     name: { type: String, required: true },
//     description: { type: String, required: true },
//     brand: { type: String, required: true },
//     price: { type: Number, required: true },
//     images: [{ type: String, required: true }],
//     category: [{ type: Schema.Types.ObjectId, ref: "Category", required: true }],
//     genre: { type: String, required: true },
//     stock: { type: Number, required: true },
//     rating: { type: Number, required: true, max: 5 },
//     specs: {
//       height: Number,
//       width: Number,
//       depth: Number,
//     },
//     discount: { type: Number },
//     isFeatured: { type: Boolean, required: true },
//     views: { type: Number, required: true },
//     isLive: { type: Boolean, required: true },
//   })
