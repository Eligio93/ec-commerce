import connectDB from "@/config/database/connectDB";
import CategoryInterface from "@/interfaces/category.interface";
import Category from "@/schemas/Category";
import InventoryCategoryCard from "@/components/Categories/InventoryCategoryCard";

export default async function AdminCategories() {
  await connectDB();
  const categories: CategoryInterface[] = await Category.find({});

  return (
    <div className="flex w-full flex-col gap-2 p-1">
      <h1 className="rounded-lg bg-orange-800 px-3 py-1 text-xl text-white">
        Categories
      </h1>
      <div className="flex flex-col gap-2 p-1">
        {categories ? (
          categories.map((category) => {
            return (
              <InventoryCategoryCard
                key={category.name}
                category={JSON.parse(JSON.stringify(category))}
              />
            );
          })
        ) : (
          <p>No Categories Found</p>
        )}
      </div>
    </div>
  );
}
