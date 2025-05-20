import ProductInterface from "@/interfaces/product.interface"
import CategoryInterface from "@/interfaces/category.interface"
import connectDB from "@/config/database/connectDB"
import Product from "@/schemas/Product"
import Category from "@/schemas/Category"
import '@/schemas/Category'
import ProductForm from "@/components/Products/ProductForm"
import CategoryForm from "@/components/Categories/CategoryForm"


export default async function Edit({
    params,
}: {
    params: Promise<{ id: string }>
}) {

    const id = (await params).id
    await connectDB();
    const isProduct:ProductInterface | null = await Product.findOne({ _id: id }).populate("category")
    const isCategory: CategoryInterface | null = await Category.findOne({ _id: id })
    if (isProduct) {
        return <ProductForm product={JSON.parse(JSON.stringify(isProduct))} />
    } else if (isCategory) {
        return <CategoryForm category={JSON.parse(JSON.stringify(isCategory))} />
    }
    return <h1>Edit</h1>
}