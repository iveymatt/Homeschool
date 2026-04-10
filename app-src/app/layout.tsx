import type { Metadata } from "next";
import "./globals.css";
import NavBar from "@/components/NavBar";

export const metadata: Metadata = {
  title: "McKenna's School",
  description: "Personalized homeschool dashboard for McKenna Ray",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="min-h-screen bg-[#f8f7f4]">
        <main className="max-w-lg mx-auto pb-24 px-4">
          {children}
        </main>
        <NavBar />
      </body>
    </html>
  );
}
