import connectDB from "@/lib/db";
import { getUserTaskModel } from "@/lib/models/task.model";
import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/auth";

connectDB();

async function getUserEmail(req: NextRequest) {
  const session = await getServerSession(authOptions);
  if (!session || !session.user?.email) {
    throw new Error("User not authenticated");
  }
  return session.user.email;
}

export async function GET(req: NextRequest) {
  try {
    const userEmail = await getUserEmail(req);
    const Task = getUserTaskModel(userEmail);
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
    const userEmail = await getUserEmail(request);
    const Task = getUserTaskModel(userEmail);
    const body = await request.json();
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
    const userEmail = await getUserEmail(request);
    const Task = getUserTaskModel(userEmail);
    const body = await request.json();
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
    const userEmail = await getUserEmail(request);
    const Task = getUserTaskModel(userEmail);
    const { searchParams } = new URL(request.url);
    const id = searchParams.get("id");

    if (!id) {
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
