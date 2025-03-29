'use client'

import ProductInterface from "@/interfaces/product.interface";
import { use, useEffect, useState } from "react";
import CategoryInterface from "@/interfaces/category.interface";
import Image from "next/image";
import { productValidationState } from "@/schemas/validation/productValidation";
import Dropzone from "react-dropzone";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { HydratedDocument } from "mongoose";


type formProps = {
  product?: HydratedDocument<ProductInterface>;
};


export default function ProductForm({ product }: formProps) {
  const [categories, setCategories] = useState<CategoryInterface[]>([]);
  const [files, setFiles] = useState<any[]>(product?.images || []);
  const [loading, setLoading] = useState(false)
  const [rejectedFiles, setRejectedFiles] = useState<any[]>([]);
  const [responseData, setResponseData] = useState<productValidationState | undefined>(undefined);
  const router = useRouter();

  //fetch all categories
  useEffect(() => {
    async function getCategories() {
      const res = await fetch("http://localhost:3000/api/categories");
      const categories = await res.json();
      setCategories(categories)
    }
    getCategories();
  }, [])


  async function handleSubmit(e: any) {
    setResponseData(undefined)
    e.preventDefault();
    setLoading(true)
    const formData = new FormData(e.target);
    formData.set("isFeatured", e.target.isFeatured.checked ? 'true' : 'false');
    formData.set("isLive", e.target.isLive.checked ? "true" : "false");
    files.map((file) => {
      formData.append('images', file)
    })
    try {
      const res = await fetch(`http://localhost:3000/api/products${product ? `/${product._id}` : ''}`, {
        method: product ? 'PUT' : 'POST',
        body: formData,
      },)
      const data = await res.json();
      setResponseData(data);
      if (res.status === 400 || res.status === 404) {
        toast.error(data.message)
      }
      if (res.status === 201) {
        toast.success('Product created successfully')
        router.push('/admin')
      }
      setLoading(false)
    } catch (error) {
      console.log(error)
      toast.error('Something went wrong')
      setLoading(false)
    }
  }

  //handle images upload
  function handleFileSelection(acceptedFiles: any[], rejectedFiles: any[]) {
    setRejectedFiles(rejectedFiles);//if true menas too many file uploaded
    setFiles(acceptedFiles.map((file) => Object.assign(file, {
      preview: URL.createObjectURL(file)
    })))
  }

  //remove file from uploading
  function removeFileUpload(e: any, index: number) {
    const filesArray = files.filter((_, i) => i !== index)
    setFiles(filesArray);
  }

  if (loading) return <p className="text-center">Loading</p>

  return (<div className="flex flex-col gap-2 w-full ">
    <h1 className="text-xl px-3 py-1 bg-orange-800 text-white rounded-lg">{product ? 'Edit Product' : 'New Product'}</h1>
    <form onSubmit={handleSubmit} className="[&_input]:rounded-lg [&_input]:border-orange-300 [&_input]:px-1  flex flex-col gap-5 p-2  sm:p-3 border-l border-orange-800 bg-white sm:rounded-lg shadow-lg">
      <div className="flex flex-col">
        <label className="px-1" htmlFor="Title">Title*</label>
        <input className="py-1 border-orange-300 border" type="text" id="title" name="title" defaultValue={product?.name || ''} />
        {responseData?.errors?.title && (
          <p className="self-end w-[60%] text-sm text-red-500">
            {responseData?.errors?.title}
          </p>
        )}
      </div>

      <div className="flex flex-col">
        <label className="px-1" htmlFor="description">Description*</label>
        <textarea className="border px-1 py-1 rounded-lg border-orange-300 resize-none h-20 sm:h-36 lg:min-h-64" id="description" name="description" defaultValue={product?.description || ''} />
        {responseData?.errors?.description && (
          <p className="self-end w-[60%] text-sm text-red-500">
            {responseData?.errors?.description}
          </p>
        )}
      </div>
      <div className="flex flex-col">
        <label className="px-1" htmlFor="brand">Brand*</label>
        <input className="py-1 border" type="text" id="brand" name="brand" defaultValue={product?.brand || ''} />
        {responseData?.errors?.brand && (
          <p className="self-end w-[60%] text-sm text-red-500">
            {responseData?.errors?.brand}
          </p>
        )}
      </div>
      <div className="flex flex-col">
        <label className="px-1" htmlFor="category">Category*</label>
        {categories.length > 0 &&
          <select className="bg-orange-200 px-1 rounded-lg py-2" name="category" id="category" defaultValue={product?.category.name || ''}  >
            {categories.map((category: CategoryInterface) => (
              <option key={category.name} value={category.name}>{category.name}</option>
            ))}
          </select>}
        {responseData?.errors?.category && (
          <p className="self-end w-[60%] text-sm text-red-500">
            {responseData?.errors?.category}
          </p>
        )}
      </div>
      <div className="flex flex-col">
        <label className="px-1" htmlFor="price">Price*</label>
        <input className="py-1 border" type='number' id="price" name="price" step=".01" defaultValue={product?.price || ''} />
        {responseData?.errors?.price && (
          <p className="self-end w-[60%] text-sm text-red-500">
            {responseData?.errors?.price}
          </p>
        )}
      </div>
      <div className="flex flex-col">
        <label className="px-1" htmlFor="gender">Gender:</label>
        <select name="gender" id="gender" defaultValue={product?.gender || ''}>
          <option value="men">Men</option>
          <option value="women">Women</option>
          <option value="unisex">Unisex</option>
        </select>
        {responseData?.errors?.gender && (
          <p className="self-end w-[60%] text-sm text-red-500">
            {responseData?.errors?.gender}
          </p>
        )}
      </div>
      <div className="flex flex-col">
        <label className="px-1" htmlFor="stock">Stock*</label>
        <input className="py-1 border" type="number" id="stock" name="stock" defaultValue={product?.stock || ''} />
        {responseData?.errors?.stock && (
          <p className="self-end w-[60%] text-sm text-red-500">
            {responseData?.errors?.stock}
          </p>
        )}
      </div>
      <div className="flex flex-col">
        <label className="px-1" htmlFor="discount">Discount(%):</label>
        <input className="py-1 border" type="number" id="discount" name="discount" defaultValue={product?.discount || 0} />
        {responseData?.errors?.discount && (
          <p className="self-end w-[60%] text-sm text-red-500">
            {responseData?.errors?.discount}
          </p>
        )}
      </div>
      <div className="flex flex-col">
        <label className="px-1" htmlFor="isFeatured">Feature it?</label>
        <input className="py-1 border h-4 " type="checkbox" id="isFeatured" name="isFeatured" defaultChecked={product?.isFeatured || false} />
      </div>
      <div className="flex flex-col">
        <label className="px-1" htmlFor="isLive">Live it?</label>
        <input className="py-1 border h-4" type="checkbox" id="isLive" name="isLive" defaultChecked={product?.isLive || false} />
      </div>
      <div className="flex flex-col gap-5">
        {files.length > 0 && <div className='flex flex-wrap gap-3 justify-center p-2'>
          {files.map((file, index) => (
            <div className=' relative h-[150px] w-[150px] border border-orange-400 rounded-lg' key={file.name || index}>
              <Image className='object-contain p-2' src={file.preview || file} alt={file} fill />
              <button type="button" onClick={(e) => removeFileUpload(e, index)} className="absolute w-5 h-5 top-0 right-0 rounded-full translate-x-1/3 -translate-y-1/3 bg-red-500 text-white text-center font-bold shadow-lg text-xs">x</button>
            </div>

          ))}
        </div>}
        <Dropzone maxFiles={5} onDrop={(acceptedFiles, rejectedFiles) => handleFileSelection(acceptedFiles, rejectedFiles)}>
          {({ getRootProps, getInputProps }) => (
            <section className="h-[150px] flex justify-center items-center border border-dashed border-gray-400 rounded-lg">
              <div {...getRootProps()}>
                <input {...getInputProps()} />
                <p className="lg:hidden">Touch here to select files</p>
                <p className="hidden lg:block">Drag 'n' drop some files here, or click to select files</p>
              </div>
            </section>
          )}
        </Dropzone>
        {rejectedFiles.length > 0 && (
          <p className="self-end w-[60%] text-sm text-red-500">
            You can upload max 5 images, Try again
          </p>
        )}
      </div>
      <button className="rounded-lg py-2 px-1 bg-orange-700 text-white font-bold text-md hover:bg-orange-800 transition-colors" type="submit">{product ? "Update" : "Submit"}</button>
    </form>
  </div>
  );
}