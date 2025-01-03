import { Types } from "mongoose";

export default interface ProductInterface {
  _id: string;
  name: string;
  description: string;
  brand: string;
  price: number;
  images: string[];
  category: Types.ObjectId[];
  genre: "men" | "women" | "unisex";
  stock: number;
  rating: number;
  specs?: {
    height?: number;
    width?: number;
    depth?: number;
  };
  discount?: number;
  isFeatured: boolean;
  views: number;
  isLive: boolean;
}
