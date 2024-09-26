"use client";

import { SessionProvider } from "next-auth/react";
import { useEffect } from "react";

type Props = {
  children: React.ReactNode;
  session: any;
};

export default function AuthProvider({ children, session }: Props) {
  useEffect(() => {
    console.log("Client-side session:", session);
  }, [session]);

  return <SessionProvider session={session}>{children}</SessionProvider>;
}
