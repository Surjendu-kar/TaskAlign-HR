import React from "react";
import { Metadata } from "next";
import Layout from "@/components/Layout/Layout";
import "@/styles/globals.css";

export const metadata: Metadata = {
  title: "HR Management",
  description:
    "Manage HR tasks efficiently with our comprehensive suite of tools designed for optimizing employee management, payroll processing, and performance reviews.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <Layout>{children}</Layout>
      </body>
    </html>
  );
}
