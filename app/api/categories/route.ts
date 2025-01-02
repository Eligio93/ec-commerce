import connectDB from "@/config/database/connectDB";
import CategoryInterface from "@/interfaces/category.interface";
import Category from "@/schemas/Category";

export async function GET(request: Request) {
  console.log(request.url);
  await connectDB();
  const categories: CategoryInterface[] = await Category.find({});
  return new Response(JSON.stringify(categories));
}
