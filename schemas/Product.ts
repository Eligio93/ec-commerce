import mongoose from "mongoose";
import { Schema } from "mongoose";
import ProductInterface from "@/interfaces/product.interface";

const ProductSchema = new Schema<ProductInterface>({
  name: { type: String, required: true },
  description: { type: String, required: true },
  brand: { type: String, required: true },
  price: { type: Number, required: true },
  images: [{ type: String, required: true }],
  category: { type: Schema.Types.ObjectId, ref: "Category", required: true },
  gender: { type: String, required: true },
  stock: { type: Number, required: true },
  rating: [{ type: Number, required: true, max: 5 }],
  discount: { type: Number },
  isFeatured: { type: Boolean, required: true },
  views: { type: Number, required: true },
  isLive: { type: Boolean, required: true },
});

const Product =
  mongoose.models.Product ||
  mongoose.model<ProductInterface>("Product", ProductSchema);

export default Product;
