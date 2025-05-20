import { Types } from "mongoose";

export default interface CategoryInterface {
  _id?:Types.ObjectId
  name: string;
  description: string;
  image: string;
  isFeatured: boolean;
}
