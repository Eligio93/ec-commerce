import { uploadMultipleImages } from "@/config/cloudinary/upload";
import { productValidation } from "@/schemas/validation/productValidation";
import connectDB from "@/config/database/connectDB";
import Product from "@/schemas/Product";
import ProductInterface from "@/interfaces/product.interface";
import Category from "@/schemas/Category";
//GET ALL PRODUCTS
export async function GET(
  request: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  const id = (await params).id;
  try {
    await connectDB();
    if (!id) {
      const products: ProductInterface[] = await Product.find({}).populate(
        "category",
      );
      return Response.json(products, { status: 200 });
    } else {
      const product: ProductInterface | null = await Product.findOne({
        _id: id,
      }).populate("category");
      if (product) {
        return Response.json(product, { status: 200 });
      }
    }
  } catch (error) {
    return Response.json(
      { message: "Impossible to retrieve Product/s" },
      { status: 404 },
    );
  }
}

//Creates a new product
export async function POST(req: Request) {
  const data = await req.formData();
  const dataObject = Object.fromEntries(data);
  const images = data.getAll("images") as File[];
  if (images.length === 0) {
    return Response.json(
      {
        message: "Please upload at least one image",
      },
      { status: 400 },
    );
  }
  const validatedProduct = productValidation.safeParse(dataObject);
  if (!validatedProduct.success) {
    console.log(validatedProduct.error);
    return Response.json({
      errors: validatedProduct.error.flatten().fieldErrors,
    });
  }
  console.log("VALIDATED PRODUCT", validatedProduct.data);
  try {
    await connectDB();
    //if product exist with the same name
    const existingProduct = await Product.findOne({
      name: validatedProduct.data.title,
    });
    if (existingProduct) {
      return Response.json(
        {
          message: "A Product with the same title already exists",
        },
        { status: 400 },
      );
    }
    //if the category selected exists
    const category = await Category.findOne({
      name: validatedProduct.data.category,
    });
    if (!category) {
      return Response.json(
        {
          message: "Category not found",
        },
        { status: 404 },
      );
    }
    //upload the images to cloudinary
    const imagesUrl = await uploadMultipleImages(
      images,
      validatedProduct.data.title,
    ); //put images in newProduct.title folder in cloudinary
    const newProduct= new Product({
      name: validatedProduct.data.title,
      description: validatedProduct.data.description,
      brand: validatedProduct.data.brand,
      price: validatedProduct.data.price,
      images: imagesUrl,
      category: category,
      gender: validatedProduct.data.gender,
      stock: validatedProduct.data.stock,
      rating: [0],
      discount: validatedProduct.data.discount,
      isFeatured: validatedProduct.data.isFeatured,
      views: 0,
      isLive: validatedProduct.data.isLive,
    });
    console.log("NEW PRoduct", newProduct);
    await newProduct.save();
    return Response.json(
      {
        message: "Product created successfully",
      },
      { status: 201 },
    );
  } catch (error) {
    console.log("SERVER ERROR", error);
    return Response.json({ message: "Something went wrong" }, { status: 500 });
  }
}

export async function PUT(
  req: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  const productId = (await params).id;
  if (!productId) {
    return Response.json(
      {
        message: "Product to edit not found",
      },
      { status: 404 },
    );
  }
  const data = await req.formData();
  const dataObject = Object.fromEntries(data);
  console.log("DATA OBJECT", dataObject);
  const images = data.getAll("images") as File[] | string[];
  if (images.length === 0) {
    return Response.json(
      {
        message: "Please upload at least one image",
      },
      { status: 400 },
    );
  }
  const validatedProduct = productValidation.safeParse(dataObject);
  if (!validatedProduct.success) {
    console.log(validatedProduct.error);
    return Response.json({
      errors: validatedProduct.error.flatten().fieldErrors,
    });
  }

  try {
    await connectDB();
    //if product exist with the same name
    const existingProduct = await Product.findOne({
      name: validatedProduct.data.title,
      _id: { $ne: productId[0] },
    });
    if (existingProduct) {
      return Response.json(
        {
          message: "A Product with the same title already exists",
        },
        { status: 400 },
      );
    }
    //if the category selected exists
    const category = await Category.findOne({
      name: validatedProduct.data.category,
    });
    if (!category) {
      return Response.json(
        {
          message: "Category not found",
        },
        { status: 404 },
      );
    }
    let imagesUrl: string[] = [];
    //upload the images to cloudinary
    if (typeof images[0] !== "string") {
      // if the images are not string means are new images to be uploaded
      imagesUrl = await uploadMultipleImages(
        images as File[],
        validatedProduct.data.title,
      ); //put images in newProduct.title folder in cloudinary
    } else {
      imagesUrl = images as string[];
    }

    const newProduct: ProductInterface = {
      name: validatedProduct.data.title,
      description: validatedProduct.data.description,
      brand: validatedProduct.data.brand,
      price: validatedProduct.data.price,
      images: imagesUrl,
      category: category,
      gender: validatedProduct.data.gender,
      stock: validatedProduct.data.stock,
      rating: [0],
      discount: validatedProduct.data.discount,
      isFeatured: validatedProduct.data.isFeatured as boolean,
      views: 0,
      isLive: validatedProduct.data.isLive as boolean,
    };
    console.log("NEW PRoduct", newProduct);
    await Product.findOneAndUpdate({ _id: productId[0] }, newProduct);
    return Response.json(
      {
        message: "Product created successfully",
      },
      { status: 201 },
    );
  } catch (error) {
    console.log("SERVER ERROR", error);
    return Response.json({ message: "Something went wrong" }, { status: 500 });
  }
}
