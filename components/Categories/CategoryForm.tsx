"use client";

import CategoryInterface from "@/interfaces/category.interface";
import Dropzone from "react-dropzone";
import { useState, useEffect } from "react";
import { toast } from "sonner";
import Image from "next/image";
import { categoryValidationState } from "@/schemas/validation/categoryValidation";
import { useRouter } from "next/navigation";

type CategoryFormProps = {
  category?: CategoryInterface;
};

export default function CategoryForm({ category }: CategoryFormProps) {
  const [files, setFiles] = useState<any[]>(category ? [category.image] : []);
  const [rejectedFiles, setRejectedFiles] = useState<any[]>([]);
  const [responseData, setResponseData] = useState<
    categoryValidationState | undefined
  >();
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  useEffect(() => {
    if (rejectedFiles.length > 0) {
      toast.error("You can ONLY upload 1 image");
    }
  }, [rejectedFiles]);

  function handleFileSelection(acceptedFiles: File[], rejectedFiles: any[]) {
    setRejectedFiles(rejectedFiles); //if true means too many file uploaded
    setFiles(
      acceptedFiles.map((file) =>
        Object.assign(file, {
          preview: URL.createObjectURL(file),
        }),
      ),
    );
  }

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    setResponseData(undefined);
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    formData.set(
      "isFeatured",
      e.currentTarget.isFeatured.checked ? "true" : "false",
    );
    formData.set("image", files[0]);
    try {
      setLoading(true);
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_URL}/api/categories${category ? `/${category._id}` : ""}`,
        {
          method: category ? "PUT" : "POST",
          body: formData,
        },
      );
      const data = await res.json();
      setResponseData(data);
      if (res.status === 400 || res.status === 404) {
        toast.error(data.message);
      }
      if (res.status === 201 || res.status === 200) {
        toast.success(data.message);
        router.push("/admin/categories");
      }
      setLoading(false);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  }

  if (loading) {
    return <p>Loading...</p>;
  }

  return (
    <div className="flex flex-col gap-2">
      <h1 className="rounded-lg bg-orange-800 px-3 py-1 font-bold text-white">
        {category ? "Edit Category" : "New Category"}
      </h1>
      <form
        onSubmit={handleSubmit}
        className="flex flex-col gap-3 rounded-lg bg-white px-3 py-3 shadow-lg [&_input]:w-full [&_input]:rounded-lg [&_input]:border [&_input]:border-orange-300 [&_input]:p-1"
      >
        <div>
          <label htmlFor="name">Name</label>
          <input
            type="text"
            id="name"
            name="name"
            defaultValue={category?.name}
          />
          {responseData?.errors?.name && (
            <p className="text-sm text-red-500">{responseData?.errors?.name}</p>
          )}
        </div>
        <div>
          <label htmlFor="description">Description</label>
          <textarea
            className="w-full resize-none rounded-lg border border-orange-300 p-2"
            id="description"
            name="description"
            defaultValue={category?.description}
          />
          {responseData?.errors?.description && (
            <p className="text-sm text-red-500">
              {responseData?.errors?.description}
            </p>
          )}
        </div>
        <div className="flex flex-col items-center gap-2">
          <label htmlFor="isFeatured">
            Do you want to feature the category in the Home Page?
          </label>
          <input
            className="size-4 lg:size-5"
            type="checkbox"
            id="isFeatured"
            name="isFeatured"
            defaultChecked={category?.isFeatured}
          />
        </div>

        <hr />
        <div className="flex flex-col gap-2">
          <h2 className="text-start">Upload Category Image</h2>

          {files.length > 0 &&
            files.map((file: any) => (
              <div
                className="relative h-[150px] w-[200px] self-center border md:h-[200px] md:w-[250px]"
                key={file.name || file}
              >
                <button
                  type="button"
                  onClick={() => setFiles([])}
                  className="absolute right-0 top-0 z-10 flex h-5 w-5 -translate-y-1/2 translate-x-1/2 items-center justify-center rounded-md bg-red-500 text-sm font-bold text-white"
                >
                  X
                </button>
                <Image
                  src={file.preview || file}
                  fill
                  alt={(category ? category.name : file.name) + "image"}
                  className="object-contain"
                />
              </div>
            ))}
          <Dropzone
            maxFiles={1}
            accept={{ "image/*": [] }}
            onDrop={(acceptedFiles, rejectedFiles) =>
              handleFileSelection(acceptedFiles, rejectedFiles)
            }
          >
            {({ getRootProps, getInputProps }) => (
              <section>
                {files.length == 0 && (
                  <div
                    {...getRootProps()}
                    className="flex h-[150px] items-center justify-center rounded border border-dashed border-orange-300"
                  >
                    <input {...getInputProps()} className="min-w-0" required />
                    {files.length == 0 && (
                      <>
                        <p className="hidden text-sm italic opacity-80 lg:block">
                          Drag &apos;n&apos; drop or click to select an image
                        </p>
                        <p className="text-sm italic opacity-80 lg:hidden">
                          Touch to select an image
                        </p>
                      </>
                    )}
                  </div>
                )}
                {responseData?.errors?.image && (
                  <p className="text-sm text-red-500">
                    {responseData?.errors?.image}
                  </p>
                )}
              </section>
            )}
          </Dropzone>
        </div>
        <button
          type="submit"
          className="text-md rounded-lg bg-orange-700 px-1 py-2 font-bold text-white transition-colors hover:bg-orange-800"
        >
          {category ? "Update" : "Submit"}
        </button>
      </form>
    </div>
  );
}
