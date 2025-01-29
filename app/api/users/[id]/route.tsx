import connectDB from "@/config/database/connectDB";
import User from "@/schemas/User";
import UserInterface from "@/interfaces/user.interface";
import { HydratedDocument } from "mongoose";
import bcrypt from "bcryptjs";
import { profileValidation } from "@/schemas/validation/profileValidation";
import { addressValidation } from "@/schemas/validation/addressValidation";

export async function GET(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  await connectDB();
  try {
    const userId = (await params).id;
    const user = await User.findOne({ _id: userId });
    if (user) {
      return Response.json(user, { status: 200 });
    }
  } catch (error) {
    return Response.json(
      { message: "Impossible to retrieve User Information" },
      { status: 404 }
    );
  }
}

export async function PUT(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const data = await request.json();
  const userId = (await params).id;
  console.log('Data', data)
  console.log('UserID', userId)
  await connectDB();
  const dbUser = await User.findById(userId);
  if (!dbUser) {
    return Response.json(
      { message: "User not found" },
      { status: 404 }
    )
  }
  //if the data come from the profile form
  if (data.formSource === 'Profile') {
    if (data.oldPassword == '') {
      data.oldPassword = undefined
      data.newPassword = undefined
    }
    const validatedProfile = profileValidation.safeParse(data);
    if (!validatedProfile.success) {
      return Response.json(
        {
          errors: validatedProfile.error.flatten().fieldErrors,
        },
        { status: 400 }
      );
    }
    //check if the new email belong already to someone else
    if (validatedProfile.data.email != dbUser.email) {
      const existingEmail = await User.find({ email: validatedProfile.data.email })
      if (existingEmail.length > 0) {
        return Response.json(
          {
            errors: { email: ["Email already in use by another user"] },
          },
          { status: 400 }
        )
      }
    }
    //check if the old password are matching
    if (validatedProfile.data.oldPassword) {
      const matchingPassword = await bcrypt.compare(validatedProfile.data.oldPassword, dbUser.password);
      if (!matchingPassword) {
        return Response.json(
          {
            errors: { oldPassword: ["Your old password does not match"] },
          },
          { status: 400 }
        );
      } else if (validatedProfile.data.newPassword) {
        const hashedPassword = await bcrypt.hash(validatedProfile.data.newPassword, 10);
        dbUser.password = hashedPassword //set the new password for the user
      }
    }
    dbUser.name = validatedProfile.data.name;
    dbUser.lastName = validatedProfile.data.lastName;
    dbUser.email = validatedProfile.data.email;
    await dbUser.save();
  }
  //if the data come from the address form
  if (data.formSource === 'Address') {
    const validatedAddress = addressValidation.safeParse(data);
    if (!validatedAddress.success) {
      return Response.json(
        {
          errors: validatedAddress.error.flatten().fieldErrors,
        },
        { status: 400 }
      );
    }
  }
  //if data.source == Address
  // await User.updateOne({ _id: userId }, data)
  return Response.json(
    { message: "User Updated Correctly" },
    { status: 200 }
  );

  //   const editedUser = {
  //     name: validatedProfile.data.name,
  //     lastName: validatedProfile.data.lastName,
  //     email: validatedProfile.data.email,
  //     password: validatedProfile.data.newPassword,
  //     address: {
  //       country: validatedProfile.data.country,
  //       city: validatedProfile.data.city,
  //       zipCode: validatedProfile.data.zipCode,
  //       street: {
  //         address1: validatedProfile.data.streetLine1,
  //         address2: validatedProfile.data.streetLine2,
  //       },
  //     },
  //   } as HydratedDocument<UserInterface>;

  //   await User.updateOne({ _id: userId }, editedUser);
  //   return Response.json(
  //     { message: "User Updated Correctly" },
  //     { status: 200 }
  //   );
  // } catch (err) {
  //   return new Error('Something went wrong');
  // }
}
