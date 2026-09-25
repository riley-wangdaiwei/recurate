import type { Metadata } from "next";
import Navigation from "@/components/layout/Navigation";
import "./globals.css";

export const metadata: Metadata = {
  title: "Recurate* / Your Taste World",
  description: "A personal world made from the things you choose.",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body><Navigation />{children}</body>
    </html>
  );
}
