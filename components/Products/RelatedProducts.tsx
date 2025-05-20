import connectDB from "@/config/database/connectDB"
import Product from "@/schemas/Product";
import ProductInterface from "@/interfaces/product.interface";
import '@/schemas/Category'
import RelatedProductCarousel from "./RelatedProductsCarousel";



export default async function RelatedProducts({ product }: { product: ProductInterface }) {
    await connectDB();
    // related product are the ones with same category and same gender or just same gender
    let relatedProducts = []
    relatedProducts = await Product.find({ category: product.category, gender: { $in: [product.gender, 'unisex'] }, _id: { $ne: product._id } }).limit(6).populate('category')
    if (relatedProducts.length === 0) {
        relatedProducts = await Product.find({ gender: { $in: [product.gender, 'unisex'] }, _id: { $ne: product._id } }).limit(6).populate('category')
    }

    return (
        <div className="flex flex-col gap-3">
            <h2 className="text-xl font-bold">Related Products</h2>
            <RelatedProductCarousel products={JSON.parse(JSON.stringify(relatedProducts))} />
        </div>

    )
}