import connectDB from "@/config/database/connectDB";
import Product from "@/schemas/Product";
import ProductInterface from "@/interfaces/product.interface";
import "@/schemas/Category";
import ProductImageCarousel from "@/components/Products/ProductImageCarousel";
import Link from "next/link";
import AddToCartController from "@/components/Products/AddToCartController";
import calculateDiscountedPrice from "@/utils/calculateDiscountedPrice";
import InfoProductListing from "@/components/Products/InfoProductListing";
import RelatedProducts from "@/components/Products/RelatedProducts";

export default async function ProductPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const id = (await params).id;
  //aggiornare le views del prodotto
  await connectDB();
  const product: ProductInterface | null = await Product.findOne({
    _id: id,
  }).populate("category");
  if (product) {
    return (
      <div className="flex flex-col gap-5 p-5">
        <div className="flex flex-col gap-3 px-3 md:flex-row md:items-center md:justify-evenly md:gap-5">
          {/*Carousel for Product Picture*/}
          <div className="flex flex-col gap-2">
            <ProductImageCarousel images={product.images} />
          </div>
          <div className="flex flex-col gap-3 md:justify-center lg:max-w-[600px]">
            {/*DIV for Product Title HEader*/}
            <div className="flex flex-col">
              <p className="text-sm text-orange-800">{product.brand}</p>
              <h1 className="text-2xl font-bold lg:text-3xl">{product.name}</h1>
              <Link
                href={`/products?category=${product.category.name}`}
                className="text-xs font-bold text-orange-500 hover:underline"
              >
                {product.category.name}
              </Link>
            </div>

            {/*Div for product Price and Cart CTA*/}
            <div className="flex flex-col gap-4 rounded-lg">
              <div className="hidden flex-col gap-2 lg:flex">
                <p className="text-xl font-bold text-orange-800">Description</p>
                <p className="leading-7">{product.description}</p>
              </div>
              <div className="flex flex-wrap items-center gap-2">
                {product.discount ? (
                  <p className="text-gray-400 line-through">${product.price}</p>
                ) : (
                  <p className="text-xl font-bold">${product.price}</p>
                )}
                {product.discount ? (
                  <p className="text-l font-bold text-orange-400">
                    -{product.discount}%
                  </p>
                ) : null}
                {product.discount ? (
                  <p className="text-xl font-bold">
                    ${calculateDiscountedPrice(product.price, product.discount)}
                  </p>
                ) : null}
              </div>
              <AddToCartController {...JSON.parse(JSON.stringify(product))} />
            </div>
          </div>
        </div>
        <InfoProductListing description={product.description} />
        <RelatedProducts product={product} />
      </div>
    );
  } else
    return (
      <div>
        <h1>Product not found</h1>
      </div>
    );
}
