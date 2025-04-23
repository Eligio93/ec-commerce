import connectDB from "@/config/database/connectDB";
import CategoryInterface from "@/interfaces/category.interface";
import Category from "@/schemas/Category";
import Product from "@/schemas/Product";
import { categoryValidation } from "@/schemas/validation/categoryValidation";
import { uploadCategoryImage } from "@/config/cloudinary/upload";

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

//CREATE A NEW CATEGORY
export async function POST(request: Request) {
  const data = await request.formData();
  const dataObject = Object.fromEntries(data);
  const validatedCategory = categoryValidation.safeParse(dataObject);
  if (!validatedCategory.success) {
    console.log(validatedCategory.error);
    return Response.json(
      {
        errors: validatedCategory.error.flatten().fieldErrors,
      },
      { status: 400 }
    );
  }
  try {
    await connectDB();
    const existingCategory = await Category.findOne({
      name: validatedCategory.data.name,
    });
    if (existingCategory) {
      return Response.json(
        {
          message: "Category already exists",
        },
        { status: 400 }
      );
    }
    const imageUrl: string = await uploadCategoryImage(
      validatedCategory.data.image as File,
      validatedCategory.data.name
    );

    const newCategory = new Category({
      name: validatedCategory.data.name,
      description: validatedCategory.data.description,
      image: imageUrl,
      isFeatured: validatedCategory.data.isFeatured,
    });
    await newCategory.save();
    return Response.json(
      { message: "Category created successfully" },
      { status: 201 }
    );
  } catch (error) {
    console.log(error);
    return Response.json({ message: "Something went wrong" }, { status: 500 });
  }
}

// UPDATE A CATEGORY
export async function PUT(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const categoryId = (await params).id;
  console.log(categoryId, "CATEGORY ID");
  const data = await request.formData();
  const dataObject = Object.fromEntries(data);
  const validatedCategory = categoryValidation.safeParse(dataObject);
  if (!validatedCategory.success) {
    console.log(validatedCategory.error);
    return Response.json(
      {
        errors: validatedCategory.error.flatten().fieldErrors,
      },
      { status: 400 }
    );
  }
  try {
    await connectDB();
    const existingCategory = await Category.findOne({
      name: validatedCategory.data.name,
      _id: { $ne: categoryId[0] },
    });
    if (existingCategory) {
      return Response.json(
        {
          message: "Category with the same name already exists",
        },
        { status: 400 }
      );
    }
    let imageUrl: string | File = validatedCategory.data.image;
    if (typeof validatedCategory.data.image !== "string") {
      imageUrl = await uploadCategoryImage(
        validatedCategory.data.image,
        validatedCategory.data.name
      );
    }

    await Category.findByIdAndUpdate(categoryId, {
      name: validatedCategory.data.name,
      description: validatedCategory.data.description,
      image: imageUrl,
      isFeatured: validatedCategory.data.isFeatured,
    });
    return Response.json(
      { message: "Category updated successfully" },
      { status: 200 }
    );
  } catch (error) {
    console.log(error);
    return Response.json({ message: "Something went wrong" }, { status: 500 });
  }
}
