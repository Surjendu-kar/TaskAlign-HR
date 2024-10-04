"use client";

import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { Box } from "@mui/material";
import loadingAnimation from "@/public/assets/loadingV4.json";
import LoadingAnimation from "@/components/LoadingAnimation/LoadingAnimation";

export default function Home() {
  const { status } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (status === "unauthenticated") {
      router.replace("/login");
    } else if (status === "authenticated") {
      router.replace("/today");
    }
  }, [status, router]);

  if (status === "loading" || status === "authenticated") {
    return <LoadingAnimation animationData={loadingAnimation} />;
  }

  return null;
}
