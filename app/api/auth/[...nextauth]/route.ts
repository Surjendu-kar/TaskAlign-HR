import NextAuth, { NextAuthOptions, User as NextAuthUser } from "next-auth";
import { Account } from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import mongoose from "mongoose";
import connectDB from "@/lib/db";

// Define User model
const UserSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true },
  name: String,
  image: String,
  createdAt: { type: Date, default: Date.now },
});

const User = mongoose.models.User || mongoose.model("User", UserSchema);

// Extend the built-in User type
interface ExtendedUser extends NextAuthUser {
  name?: string | null;
  image?: string | null;
}

export const authOptions: NextAuthOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID || "",
      clientSecret: process.env.GOOGLE_CLIENT_SECRET || "",
    }),
  ],
  callbacks: {
    async signIn({
      user,
      account,
    }: {
      user: ExtendedUser;
      account: Account | null;
    }) {
      if (account?.provider === "google" && user.email) {
        await connectDB(); // Ensure database connection

        try {
          // Check if user exists, if not create a new user
          await User.findOneAndUpdate(
            { email: user.email },
            {
              name: user.name,
              image: user.image,
            },
            { upsert: true, new: true, setDefaultsOnInsert: true }
          );

          return true;
        } catch (error) {
          console.error("Error saving user to MongoDB:", error);
          return false;
        }
      }

      return true;
    },
  },
  secret: process.env.NEXTAUTH_SECRET,
  pages: {
    signIn: "/login",
  },
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
