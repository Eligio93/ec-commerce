import { Types } from "mongoose";
import CategoryInterface from "./category.interface";
import { HydratedDocument } from "mongoose";

export default interface ProductInterface {
  name: string;
  description: string;
  brand: string;
  price: number;
  images: string[];
  category: HydratedDocument<CategoryInterface> ;
  gender: "men" | "women" | "unisex";
  stock: number;
  rating: number[];
  discount?: number;
  isFeatured: boolean;
  views: number;
  isLive: boolean;
}
