import connectDB from "@/lib/db";
import { Task } from "@/lib/models/task.model";
import { NextRequest, NextResponse } from "next/server";

connectDB();

export async function GET() {
  try {
    const tasks = await Task.find().sort({ createdAt: -1 });
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
    const body: Task = await request.json();
    const { id, taskName, description, priority, dueDate } = body;
    const newTask = new Task({ id, taskName, description, priority, dueDate });
    const savedTask = await newTask.save();
    return NextResponse.json(savedTask, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: "Error creating task" }, { status: 500 });
  }
}

export async function PUT(request: NextRequest) {
  try {
    const body: Task = await request.json();
    const { id, taskName, description, priority, dueDate } = body;

    const updatedTask = await Task.findOneAndUpdate(
      { id: id },
      { taskName, description, priority, dueDate },
      { new: true }
    );

    if (!updatedTask) {
      return NextResponse.json({ error: "Task not found" }, { status: 404 });
    }

    return NextResponse.json(updatedTask, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: "Error updating task" }, { status: 500 });
  }
}

export async function DELETE(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get("id");

    if (!id) {
      console.log("Task ID is missing in the request");
      return NextResponse.json(
        { error: "Task ID is required" },
        { status: 400 }
      );
    }

    const deletedTask = await Task.findOneAndDelete({ id: id });

    if (!deletedTask) {
      return NextResponse.json({ error: "Task not found" }, { status: 404 });
    }
    return NextResponse.json(
      { message: "Task deleted successfully", deletedTask },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error in DELETE handler:", error);
    return NextResponse.json({ error: "Error deleting task" }, { status: 500 });
  }
}
