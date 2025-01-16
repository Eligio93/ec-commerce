import mongoose from "mongoose";
import { Schema } from "mongoose";
import UserInterface from "@/interfaces/user.interface";

const UserSchema = new Schema<UserInterface>(
  {
    name: { type: String, required: true },
    lastName: { type: String, required: true },
    email: { type: String, required: true },
    password: { type: String },
    profilePicture: { type: String },
    phone: { type: String },
    orders: [{ type: Schema.Types.ObjectId, ref: "Order" }],
    address: {
      country: { type: String },
      city: { type: String },
      zipCode: { type: String },
      street: {
        address1: { type: String },
        address2: { type: String },
      },
    },
    isAdmin: { type: Boolean, required: true },
    isRegistered: { type: Boolean, required: true },
  },
  { timestamps: true }
);
const User =
  mongoose.models.User<UserInterface> ||
  mongoose.model<UserInterface>("User", UserSchema);
export default User;
