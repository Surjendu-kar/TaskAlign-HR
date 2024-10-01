import mongoose, { Model, Document } from "mongoose";

interface IUser extends Document {
  email: string;
  name?: string;
  image?: string;
  createdAt: Date;
}

const UserSchema = new mongoose.Schema<IUser>({
  email: { type: String, required: true, unique: true },
  name: String,
  image: String,
  createdAt: { type: Date, default: Date.now },
});

const User: Model<IUser> =
  mongoose.models.User || mongoose.model<IUser>("User", UserSchema);

export default User;
