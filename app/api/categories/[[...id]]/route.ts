import connectDB from "@/config/database/connectDB";
import CategoryInterface from "@/interfaces/category.interface";
import Category from "@/schemas/Category";

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
  const categoryId = (await params).id[0];
  if (!categoryId) {
    return Response.json(
      {
        message: "Category ID not found",
      },
      { status: 404 }
    );
  }

  console.log(categoryId);
  await connectDB();
}
