import { ITask } from "@/types";
import mongoose, { Schema, Document } from "mongoose";

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

export const Task =
  mongoose.models.Task || mongoose.model<ITask & Document>("Task", taskSchema);
