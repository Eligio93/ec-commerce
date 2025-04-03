import connectDB from "@/config/database/connectDB";
import CategoryInterface from "@/interfaces/category.interface";
import Category from "@/schemas/Category";
import Product from "@/schemas/Product";

//GET ALL CATEGORIES
export async function GET(request: Request) {
  console.log(request.url);
  await connectDB();
  const categories: CategoryInterface[] = await Category.find({});
  return new Response(JSON.stringify(categories));
}

//DELETE CATEGORY
export async function DELETE(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  //check if categoryId exists
  const categoryId = (await params).id;
  if (!categoryId) {
    return Response.json(
      {
        message: "Category ID not found. Try Again!",
      },
      { status: 404 }
    );
  }

  await connectDB();
  //check if the category has some products related to it
  const productsWithCategory = await Product.find({
    category: categoryId,
  });
  if (productsWithCategory.length > 0) {
    return Response.json(
      { message: "Category has some products related to it. Try Again!" },
      { status: 400 }
    );
  }

  await Category.findByIdAndDelete(categoryId);
  return Response.json(
    { message: "Category deleted successfully" },
    { status: 200 }
  );
}
