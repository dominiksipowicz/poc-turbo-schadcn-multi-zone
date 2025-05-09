import type React from "react";
import { Inter } from "next/font/google";
import Navbar from "@workspace/ui/components/navbar";

export default function MainLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <Navbar />
      <main className="container mx-auto p-4 mt-20">{children}</main>
    </>
  );
}
