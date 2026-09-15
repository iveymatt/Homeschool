import type { Metadata } from "next";
import "./globals.css";
import BottomNav from "@/components/NavBar";
import Sidebar from "@/components/Sidebar";

export const metadata: Metadata = {
  title: "McKenna's School",
  description: "Personalized learning and executive function dashboard for McKenna Ray",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="min-h-screen bg-[var(--background)] md:flex">
        <Sidebar />
        <main className="max-w-lg mx-auto pb-24 px-4 md:max-w-2xl md:flex-1 md:pb-10 md:pt-10 md:px-10">
          {children}
        </main>
        <BottomNav />
      </body>
    </html>
  );
}
