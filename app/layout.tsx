import React from "react";
import { Metadata } from "next";
import { getServerSession } from "next-auth/next";
import Layout from "@/components/Layout/Layout";
import "@/styles/globals.css";
import AuthProvider from "./AuthProvider";
import { headers } from "next/headers";

export const metadata: Metadata = {
  title: "HR Management",
  description:
    "Manage HR tasks efficiently with our comprehensive suite of tools designed for optimizing employee management, payroll processing, and performance reviews.",
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getServerSession();
  const headersList = headers();
  const pathname = headersList.get("x-invoke-path") || "";

  return (
    <html lang="en">
      <body>
        <AuthProvider session={session}>
          {pathname === "/login" ? children : <Layout>{children}</Layout>}
        </AuthProvider>
      </body>
    </html>
  );
}
