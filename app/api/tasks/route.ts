import connectDB from "@/lib/db";
import { Task } from "@/lib/models/task.model";
import { ITask } from "@/types";
import { NextRequest, NextResponse } from "next/server";

connectDB();

export async function GET() {
  try {
    const tasks = await Task.find();
    return NextResponse.json(tasks);
  } catch (error) {
    return NextResponse.json(
      { error: "Error fetching tasks" },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const body: ITask = await request.json();
    const { id, taskName, description, priority, dueDate } = body;
    const newTask = new Task({ id, taskName, description, priority, dueDate });
    const savedTask = await newTask.save();
    return NextResponse.json(savedTask, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: "Error creating task" }, { status: 500 });
  }
}
