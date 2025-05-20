import { Types } from "mongoose";
import CategoryInterface from "./category.interface";

export default interface ProductInterface {
  _id?: Types.ObjectId;
  name: string;
  description: string;
  brand: string;
  price: number;
  images: string[];
  category: CategoryInterface;
  gender: "men" | "women" | "unisex";
  stock: number;
  rating: number[];
  discount?: number;
  isFeatured: boolean;
  views: number;
  isLive: boolean;
}
