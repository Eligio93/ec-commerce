import { Types } from "mongoose";

export default interface UserInterface {
  _id?: Types.ObjectId;
  name: string;
  lastName: string;
  email: string;
  password?: string;
  profilePicture?: string;
  orders?: Types.ObjectId[];
  address?: {
    country?: string;
    city?: string;
    zipCode?: string;
    street?: {
      address1?: string;
      address2?: string;
    };
  };
  phone?: string;
  isAdmin: boolean;
  isRegistered: boolean;
}
