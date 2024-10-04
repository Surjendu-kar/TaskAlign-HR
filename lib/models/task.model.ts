import mongoose, { Schema, Model } from "mongoose";

const taskSchema: Schema = new Schema(
  {
    id: {
      type: String,
      required: true,
    },
    taskName: {
      type: String,
      required: true,
    },
    description: {
      type: String,
    },
    priority: {
      type: Number,
      required: true,
    },
    dueDate: {
      type: Date,
      required: true,
    },
  },
  { timestamps: true }
);

export function getUserTaskModel(email: string): Model<Task> {
  const localPart = email.split("@")[0];
  const sanitizedEmail = localPart.replace(/[^a-zA-Z0-9]/g, "_");
  const collectionName = `tasks_${sanitizedEmail}`;

  return (
    mongoose.models[collectionName] ||
    mongoose.model<Task>(collectionName, taskSchema)
  );
}
