import connectDB from "@/config/database/connectDB";
import CategoryInterface from "@/interfaces/category.interface";
import Category from "@/schemas/Category";
import InventoryCategoryCard from "@/components/Categories/InventoryCategoryCard";

export default async function AdminCategories() {
    await connectDB();
    const categories: CategoryInterface[] = await Category.find({});

    return <div className="flex flex-col gap-2 w-full p-1">
        <h1 className="text-xl px-3 py-1 bg-orange-800 text-white rounded-lg">Categories</h1>
        <div className="p-1 flex flex-col gap-2">
            {categories ? (
                categories.map((category) => {
                    return <InventoryCategoryCard key={category.name} category={JSON.parse(JSON.stringify(category))} />
                })) : (
                <p>No Categories Found</p>
            )}
        </div>
    </div>;
}   