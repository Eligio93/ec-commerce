'use client'

import ProductInterface from "@/interfaces/product.interface";
import { useEffect, useState } from "react";
import CategoryInterface from "@/interfaces/category.interface";
import Image from "next/image";
import { productValidationState } from "@/schemas/validation/productValidation";
import Dropzone from "react-dropzone";
import { toast } from "sonner";
import { useRouter } from "next/navigation";


type formProps = {
  product?: ProductInterface;
};


export default function ProductForm({ product }: formProps) {
  const [categories, setCategories] = useState<CategoryInterface[]>([]);
  const [files, setFiles] = useState<any[]>([]);
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
      const res = await fetch("http://localhost:3000/api/products", {
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

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-5">
      <div className="flex flex-col">
        <label htmlFor="Title">Title*</label>
        <input className="border" type="text" id="title" name="title" />
        {responseData?.errors?.title && (
          <p className="self-end w-[60%] text-sm text-red-500">
            {responseData?.errors?.title}
          </p>
        )}
      </div>

      <div className="flex flex-col">
        <label htmlFor="description">Description*</label>
        <textarea className="border resize-none h-20" id="description" name="description" />
        {responseData?.errors?.description && (
          <p className="self-end w-[60%] text-sm text-red-500">
            {responseData?.errors?.description}
          </p>
        )}
      </div>
      <div className="flex flex-col">
        <label htmlFor="brand">Brand*</label>
        <input className="border" type="text" id="brand" name="brand" />
        {responseData?.errors?.brand && (
          <p className="self-end w-[60%] text-sm text-red-500">
            {responseData?.errors?.brand}
          </p>
        )}
      </div>
      <div className="flex flex-col">
        <label htmlFor="category">Category*</label>

        <select name="category" id="category">
          {categories.map((category: CategoryInterface) => (
            <option key={category.name} value={category.name}>{category.name}</option>
          ))}
        </select>
        {responseData?.errors?.category && (
          <p className="self-end w-[60%] text-sm text-red-500">
            {responseData?.errors?.category}
          </p>
        )}
      </div>
      <div className="flex flex-col">
        <label htmlFor="price">Price*</label>
        <input className="border" type='number' id="price" name="price" step=".01" />
        {responseData?.errors?.price && (
          <p className="self-end w-[60%] text-sm text-red-500">
            {responseData?.errors?.price}
          </p>
        )}
      </div>
      <div className="flex flex-col">
        <label htmlFor="gender">Gender:</label>
        <select name="gender" id="gender">
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
        <label htmlFor="stock">Stock*</label>
        <input className="border" type="number" id="stock" name="stock" />
        {responseData?.errors?.stock && (
          <p className="self-end w-[60%] text-sm text-red-500">
            {responseData?.errors?.stock}
          </p>
        )}
      </div>
      <div className="flex flex-col">
        <label htmlFor="discount">Discount(%):</label>
        <input className="border" type="number" id="discount" name="discount" />
        {responseData?.errors?.discount && (
          <p className="self-end w-[60%] text-sm text-red-500">
            {responseData?.errors?.discount}
          </p>
        )}
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
        {files.length > 0 && <div className='flex flex-wrap gap-3 justify-center p-2'>
          {files.map((file, index) => (
            <div className=' relative h-[150px] w-2/3' key={file.name}>
              <Image className='object-cover' src={file.preview} alt={file} fill />
              <button type="button" onClick={(e) => removeFileUpload(e, index)} className="absolute w-6 h-6 top-0 right-0 rounded-full translate-x-1/3 -translate-y-1/3 bg-red-500 text-white text-center font-bold shadow-lg">x</button>
            </div>

          ))}
        </div>}
        <Dropzone maxFiles={5} onDrop={(acceptedFiles, rejectedFiles) => handleFileSelection(acceptedFiles, rejectedFiles)}>
          {({ getRootProps, getInputProps }) => (
            <section>
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
      <button type="submit">Submit</button>
    </form>
  );
}