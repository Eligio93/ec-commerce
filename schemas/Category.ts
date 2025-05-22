import mongoose from "mongoose";
import { Schema } from "mongoose";
import CategoryInterface from "@/interfaces/category.interface";

const CategorySchema = new Schema<CategoryInterface>({
  name: { type: String, required: true },
  description: { type: String, required: true },
  image: { type: String, required: true },
  isFeatured: { type: Boolean, required: true },
});

const Category =
  mongoose.models.Category ||
  mongoose.model<CategoryInterface>("Category", CategorySchema);

export default Category;
