'use client';

import CategoryInterface from "@/interfaces/category.interface";
import { HydratedDocument, set } from "mongoose";
import Dropzone from "react-dropzone";
import { useState, useEffect } from "react";
import { toast } from "sonner";
import Image from "next/image";
import { categoryValidationState } from "@/schemas/validation/categoryValidation";
import { useRouter } from "next/navigation";


type CategoryFormProps = {
    category?: HydratedDocument<CategoryInterface>;
};


export default function CategoryForm({ category }: CategoryFormProps) {
    const [files, setFiles] = useState<any[]>(category ? [category.image] : []);
    const [rejectedFiles, setRejectedFiles] = useState<any[]>([]);
    const [responseData, setResponseData] = useState<categoryValidationState | undefined>()
    const [loading, setLoading] = useState(false)
    const router = useRouter();

    useEffect(() => {
        if (rejectedFiles.length > 0) {
            toast.error("You can ONLY upload 1 image")
        }
    }, [rejectedFiles])


    function handleFileSelection(acceptedFiles: File[], rejectedFiles: any[]) {
        setRejectedFiles(rejectedFiles);//if true means too many file uploaded
        setFiles(acceptedFiles.map((file) => Object.assign(file, {
            preview: URL.createObjectURL(file)
        })));

    }

    async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
        setResponseData(undefined)
        e.preventDefault();
        const formData = new FormData(e.currentTarget);
        formData.set("isFeatured", e.currentTarget.isFeatured.checked ? 'true' : 'false');
        formData.set("image", files[0]);
        try {
            setLoading(true)
            const res = await fetch(`http://localhost:3000/api/categories${category ? `/${category._id}` : ''}`, {
                method: category ? 'PUT' : 'POST',
                body: formData,
            },)
            const data = await res.json();
            setResponseData(data)
            if (res.status === 400 || res.status === 404) {
                toast.error(data.message)
            }
            if (res.status === 201 || res.status === 200) {
                toast.success(data.message)
                router.push('/admin/categories')
            }
            setLoading(false)
        } catch (error) {
            console.log(error)
            setLoading(false)
        }
    }

    if (loading) {
        return <p>Loading...</p>
    }

    return <div className="flex flex-col gap-2">
        <h1 className="font-bold  px-3 py-1 bg-orange-800 text-white rounded-lg">{category ? 'Edit Category' : 'New Category'}</h1>
        <form onSubmit={handleSubmit} className="flex flex-col gap-3 bg-white px-3 py-3 rounded-lg shadow-lg [&_input]:w-full [&_input]:rounded-lg [&_input]:border [&_input]:border-orange-300 [&_input]:p-1">
            <div>
                <label htmlFor="name">Name</label>
                <input type="text" id="name" name="name" defaultValue={category?.name} />
                {responseData?.errors?.name && <p className="text-red-500 text-sm">{responseData?.errors?.name}</p>}
            </div>
            <div>
                <label htmlFor="description">Description</label>
                <textarea className="resize-none w-full border border-orange-300 rounded-lg p-2" id="description" name="description" defaultValue={category?.description} />
                {responseData?.errors?.description && <p className="text-red-500 text-sm">{responseData?.errors?.description}</p>}

            </div>
            <div className="flex flex-col gap-2  items-center">
                <label htmlFor="isFeatured">Do you want to feature the category in the Home Page?</label>
                <input className="lg:size-5 size-4 " type="checkbox" id="isFeatured" name="isFeatured" defaultChecked={category?.isFeatured} />

            </div>

            <hr />
            <div className="flex flex-col gap-2">
                <h2 className="text-start">Upload Category Image</h2>

                {files.length > 0 && files.map((file: any) => <div className="relative self-center h-[150px] md:h-[200px] md:w-[250px] w-[200px] border " key={file.name || file}>
                    <button type="button" onClick={() => setFiles([])} className="absolute top-0 right-0 bg-red-500 h-5 w-5 z-10 text-white rounded-md translate-x-1/2 -translate-y-1/2 font-bold flex justify-center items-center text-sm">X</button>
                    <Image src={file.preview || file} fill alt={(category ? category.name : file.name) + 'image'} className="object-contain" />
                </div>)}
                <Dropzone maxFiles={1} accept={{ 'image/*': [] }} onDrop={(acceptedFiles, rejectedFiles) => handleFileSelection(acceptedFiles, rejectedFiles)}>
                    {({ getRootProps, getInputProps }) => (
                        <section>
                            {files.length == 0 &&
                                <div {...getRootProps()} className="h-[150px] flex justify-center items-center border border-dashed border-orange-300 rounded">
                                    <input {...getInputProps()} className="min-w-0" required />
                                    {files.length == 0 && <>
                                        <p className="hidden italic opacity-80 text-sm lg:block ">Drag 'n' drop or click to select an image</p>
                                        <p className="lg:hidden italic opacity-80 text-sm">Touch to select an image</p>
                                    </>}

                                </div>}
                            {responseData?.errors?.image && <p className="text-red-500 text-sm">{responseData?.errors?.image}</p>}
                        </section>
                    )}

                </Dropzone>
            </div>
            <button type='submit' className="rounded-lg py-2 px-1 bg-orange-700 text-white font-bold text-md hover:bg-orange-800 transition-colors">{category ? "Update" : "Submit"}</button>

        </form>
    </div>
}