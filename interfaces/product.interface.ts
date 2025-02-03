import { Types } from "mongoose";

export default interface ProductInterface {
  name: string;
  description: string;
  brand: string;
  price: number;
  images: string[];
  category: Types.ObjectId[];
  gender: "men" | "women" | "unisex";
  stock: number;
  rating: number;
  discount?: number;
  isFeatured: boolean;
  views: number;
  isLive: boolean;
}
