import { TodayContent } from "@/components/Today/TodayContent";
import { CircularProgress } from "@mui/material";
import { Suspense } from "react";

async function getTasks() {
  const baseEndPoint = `${process.env.NEXT_PUBLIC_BE_URL}/api/tasks`;
  const res = await fetch(baseEndPoint, {
    cache: "no-store",
  });
  if (!res.ok) {
    throw new Error("Failed to fetch tasks");
  }
  return res.json();
}

export default async function TodayPage() {
  const initialTasks = await getTasks();
  return (
    <Suspense fallback={<CircularProgress />}>
      <TodayContent initialTasks={initialTasks} />
    </Suspense>
  );
}
