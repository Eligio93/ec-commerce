"use server";
import { RegisterSchema, AuthFormState } from "@/schemas/validation";
import connectDB from "@/config/database/connectDB";
import User from "@/schemas/User";
import UserInterface from "@/interfaces/user.interface";
import bcrypt from "bcryptjs";


export async function register(state: AuthFormState, formData: FormData) {
  const validatedFields = RegisterSchema.safeParse({
    name: formData.get("name"),
    lastName: formData.get("lastName"),
    email: formData.get("email"),
    password: formData.get("password"),
  });
  //returns errors in case of failed validation
  if (!validatedFields.success) {
    return { errors: validatedFields.error.flatten().fieldErrors };
  }
  try {
    await connectDB();
    //check if the user already exists in DB
    const existingUser: UserInterface | null = await User.findOne({
      email: validatedFields.data.email,
    });
    if (existingUser) {
      return {
        errors: { email: ["User already exists"] },
      };
    }
    //hash Password
    const hashedPassword = await bcrypt.hash(validatedFields.data.password, 10);
    //create new User
    const user= new User({
      name: validatedFields.data.name,
      lastName: validatedFields.data.lastName,
      email: validatedFields.data.email,
      password: hashedPassword,
      isRegistered: true,
      isAdmin: false,
    });
    //save user

    await user.save();
    return { message: "User registered successfully", success: true };
  } catch (error) {
    return {
      message: `Impossible to register user with email: ${validatedFields.data.email}`,
    };
  } finally {
    await new Promise((resolve) => setTimeout(resolve, 2000));
  }
}
