"use client";

import ProductInterface from "@/interfaces/product.interface";
import { use, useEffect, useState } from "react";
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
  const [files, setFiles] = useState<any[]>(product?.images || []);
  const [loading, setLoading] = useState(false);
  const [rejectedFiles, setRejectedFiles] = useState<any[]>([]);
  const [responseData, setResponseData] = useState<
    productValidationState | undefined
  >(undefined);
  const router = useRouter();

  //fetch all categories
  useEffect(() => {
    async function getCategories() {
      const res = await fetch(`${process.env.NEXT_PUBLIC_URL}/api/categories`);
      const categories = await res.json();
      setCategories(categories);
    }
    getCategories();
  }, []);

  async function handleSubmit(e: any) {
    setResponseData(undefined);
    e.preventDefault();
    setLoading(true);
    const formData = new FormData(e.target);
    formData.set("isFeatured", e.target.isFeatured.checked ? "true" : "false");
    formData.set("isLive", e.target.isLive.checked ? "true" : "false");
    files.map((file) => {
      formData.append("images", file);
    });
    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_URL}/api/products${product ? `/${product._id}` : ""}`,
        {
          method: product ? "PUT" : "POST",
          body: formData,
        },
      );
      const data = await res.json();
      setResponseData(data);
      if (res.status === 400 || res.status === 404) {
        toast.error(data.message);
      }
      if (res.status === 201) {
        toast.success("Product created successfully");
        router.push("/admin");
      }
      setLoading(false);
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong");
      setLoading(false);
    }
  }

  //handle images upload
  function handleFileSelection(acceptedFiles: any[], rejectedFiles: any[]) {
    setRejectedFiles(rejectedFiles); //if true menas too many file uploaded
    setFiles(
      acceptedFiles.map((file) =>
        Object.assign(file, {
          preview: URL.createObjectURL(file),
        }),
      ),
    );
  }

  //remove file from uploading
  function removeFileUpload(e: any, index: number) {
    const filesArray = files.filter((_, i) => i !== index);
    setFiles(filesArray);
  }

  if (loading) return <p className="text-center">Loading</p>;

  return (
    <div className="flex w-full flex-col gap-2">
      <h1 className="rounded-lg bg-orange-800 px-3 py-1 font-bold text-white">
        {product ? "Edit Product" : "New Product"}
      </h1>
      <form
        onSubmit={handleSubmit}
        className="flex flex-col gap-5 rounded-lg border-l border-orange-800 bg-white p-2 shadow-lg sm:p-3 [&_input]:w-full [&_input]:rounded-lg [&_input]:border-orange-300 [&_input]:px-1"
      >
        <div className="flex flex-col">
          <label className="px-1" htmlFor="Title">
            Title*
          </label>
          <input
            className="border border-orange-300 py-1"
            type="text"
            id="title"
            name="title"
            defaultValue={product?.name || ""}
          />
          {responseData?.errors?.title && (
            <p className="w-[60%] self-end text-sm text-red-500">
              {responseData?.errors?.title}
            </p>
          )}
        </div>

        <div className="flex flex-col">
          <label className="px-1" htmlFor="description">
            Description*
          </label>
          <textarea
            className="h-20 w-full resize-none rounded-lg border border-orange-300 px-1 py-1 sm:h-36 lg:min-h-64"
            id="description"
            name="description"
            defaultValue={product?.description || ""}
          />
          {responseData?.errors?.description && (
            <p className="w-[60%] self-end text-sm text-red-500">
              {responseData?.errors?.description}
            </p>
          )}
        </div>
        <div className="flex flex-col">
          <label className="px-1" htmlFor="brand">
            Brand*
          </label>
          <input
            className="border py-1"
            type="text"
            id="brand"
            name="brand"
            defaultValue={product?.brand || ""}
          />
          {responseData?.errors?.brand && (
            <p className="w-[60%] self-end text-sm text-red-500">
              {responseData?.errors?.brand}
            </p>
          )}
        </div>
        <div className="flex flex-col">
          <label className="px-1" htmlFor="category">
            Category*
          </label>
          {categories.length > 0 && (
            <select
              className="rounded-lg bg-orange-200 px-1 py-2"
              name="category"
              id="category"
              defaultValue={product?.category.name || ""}
            >
              {categories.map((category: CategoryInterface) => (
                <option key={category.name} value={category.name}>
                  {category.name}
                </option>
              ))}
            </select>
          )}
          {responseData?.errors?.category && (
            <p className="w-[60%] self-end text-sm text-red-500">
              {responseData?.errors?.category}
            </p>
          )}
        </div>
        <div className="flex flex-col">
          <label className="px-1" htmlFor="price">
            Price*
          </label>
          <input
            className="border py-1"
            type="number"
            id="price"
            name="price"
            step=".01"
            defaultValue={product?.price || ""}
          />
          {responseData?.errors?.price && (
            <p className="w-[60%] self-end text-sm text-red-500">
              {responseData?.errors?.price}
            </p>
          )}
        </div>
        <div className="flex flex-col">
          <label className="px-1" htmlFor="gender">
            Gender:
          </label>
          <select
            name="gender"
            id="gender"
            defaultValue={product?.gender || ""}
          >
            <option value="men">Men</option>
            <option value="women">Women</option>
            <option value="unisex">Unisex</option>
          </select>
          {responseData?.errors?.gender && (
            <p className="w-[60%] self-end text-sm text-red-500">
              {responseData?.errors?.gender}
            </p>
          )}
        </div>
        <div className="flex flex-col">
          <label className="px-1" htmlFor="stock">
            Stock*
          </label>
          <input
            className="border py-1"
            type="number"
            id="stock"
            name="stock"
            defaultValue={product?.stock || ""}
          />
          {responseData?.errors?.stock && (
            <p className="w-[60%] self-end text-sm text-red-500">
              {responseData?.errors?.stock}
            </p>
          )}
        </div>
        <div className="flex flex-col">
          <label className="px-1" htmlFor="discount">
            Discount(%):
          </label>
          <input
            className="border py-1"
            type="number"
            id="discount"
            name="discount"
            defaultValue={product?.discount || 0}
          />
          {responseData?.errors?.discount && (
            <p className="w-[60%] self-end text-sm text-red-500">
              {responseData?.errors?.discount}
            </p>
          )}
        </div>
        <div className="flex flex-col">
          <label className="px-1" htmlFor="isFeatured">
            Feature it?
          </label>
          <input
            className="h-4 border py-1"
            type="checkbox"
            id="isFeatured"
            name="isFeatured"
            defaultChecked={product?.isFeatured || false}
          />
        </div>
        <div className="flex flex-col">
          <label className="px-1" htmlFor="isLive">
            Live it?
          </label>
          <input
            className="h-4 border py-1"
            type="checkbox"
            id="isLive"
            name="isLive"
            defaultChecked={product?.isLive || false}
          />
        </div>
        <div className="flex flex-col gap-5">
          {files.length > 0 && (
            <div className="flex flex-wrap justify-center gap-3 p-2">
              {files.map((file, index) => (
                <div
                  className="relative h-[150px] w-[150px] rounded-lg border border-orange-400"
                  key={file.name || index}
                >
                  <Image
                    className="object-contain p-2"
                    src={file.preview || file}
                    alt={file}
                    fill
                  />
                  <button
                    type="button"
                    onClick={(e) => removeFileUpload(e, index)}
                    className="absolute right-0 top-0 h-5 w-5 -translate-y-1/3 translate-x-1/3 rounded-full bg-red-500 text-center text-xs font-bold text-white shadow-lg"
                  >
                    x
                  </button>
                </div>
              ))}
            </div>
          )}
          <Dropzone
            maxFiles={5}
            onDrop={(acceptedFiles, rejectedFiles) =>
              handleFileSelection(acceptedFiles, rejectedFiles)
            }
          >
            {({ getRootProps, getInputProps }) => (
              <section>
                <div
                  {...getRootProps()}
                  className="flex h-[150px] items-center justify-center rounded-lg border border-dashed border-orange-300"
                >
                  <input {...getInputProps()} />
                  <p className="lg:hidden">Touch here to select files</p>
                  <p className="hidden lg:block">
                    Drag 'n' drop some files here, or click to select files
                  </p>
                </div>
              </section>
            )}
          </Dropzone>
          {rejectedFiles.length > 0 && (
            <p className="w-[60%] self-end text-sm text-red-500">
              You can upload max 5 images, Try again
            </p>
          )}
        </div>
        <button
          className="text-md rounded-lg bg-orange-700 px-1 py-2 font-bold text-white transition-colors hover:bg-orange-800"
          type="submit"
        >
          {product ? "Update" : "Submit"}
        </button>
      </form>
    </div>
  );
}
