import connectDB from "@/config/database/connectDB";
import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import User from "@/schemas/User";
import UserInterface from "@/interfaces/user.interface";
import bcrypt from "bcryptjs";
import GoogleProvider from "next-auth/providers/google";
import GoogleProfile from "@/interfaces/googleProfile.interface";
import { HydratedDocument } from "mongoose";
import type { NextAuthOptions } from "next-auth";

export const authOptions: NextAuthOptions = {
  session: {
    strategy: "jwt",
    maxAge: 15 * 24 * 60 * 60, // 15 days
  },
  //defines the default sign-in page
  pages: {
    signIn: "/login",
  },
  providers: [
    CredentialsProvider({
      id: "credentials",
      name: "Credentials",
      credentials: {},
      async authorize(credentials: any, req) {
        await connectDB();
        try {
          const user = await User.findOne({ email: credentials?.email });
          if (user) {
            const matchingPassword = await bcrypt.compare(
              credentials.password,
              user.password
            );
            if (matchingPassword) {
              return user;
            } else {
              return null;
            }
          }
        } catch (error: any) {
          return new Error(error);
        }
      },
    }),
    GoogleProvider({
      id: "google",
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
      authorization: {
        params: {
          prompt: "consent",
          access_type: "offline",
          response_type: "code",
        },
      },
    }),
  ],
  callbacks: {
    async signIn({ user, account, profile, email, credentials }) {
      //if the user login with Google
      if (account?.provider === "google") {
        const googleProfile = profile as GoogleProfile;
        await connectDB();
        try {
          const existingUser: UserInterface | null = await User.findOne({
            //check if the user is already in the database
            email: googleProfile.email,
          });
          if (!existingUser) {
            //if it s not there creates a new user
            const user: HydratedDocument<UserInterface> = new User({
              name: googleProfile.given_name,
              lastName: googleProfile.family_name,
              email: googleProfile.email,
              profilePicture: googleProfile.picture,
              isRegistered: true,
              isAdmin: false,
            });
            await user.save();
            return true; //return true if the user is created
          }
        } catch (err) {
          console.log(err);
          return false; //if there s any error return false and don t
        }
      }
      if (user) {
        //if the user login with credentials means that user obect exists
        return true; //so return true
      } else {
        return false;
      }
    },
    async jwt({ token, user, account, profile }) {
      if (account?.provider === "credentials") {
        token.userId = (user as HydratedDocument<UserInterface>)._id;
        token.isAdmin = (user as HydratedDocument<UserInterface>).isAdmin;
      }
      if (account?.provider === "google") {
        await connectDB();
        const existingUser: HydratedDocument<UserInterface> | null =
          await User.findOne({
            email: profile?.email,
          });
        token.userId = existingUser?._id;
        token.isAdmin = existingUser?.isAdmin as boolean;
      }

      return token;
    },
    async session({ session, user, token }) {
      if (token) {
        session.user = {
          ...session.user,
          id: token.userId,
          isAdmin: token.isAdmin,
        };
      }
      return session;
    },
    async redirect({ url, baseUrl }) {
      // Allows relative callback URLs
      if (url.startsWith("/")) return `${baseUrl}${url}`;
      // Allows callback URLs on the same origin
      else if (new URL(url).origin === baseUrl) return url;
      return baseUrl;
    },
  },
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
