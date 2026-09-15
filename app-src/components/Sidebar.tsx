"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { MCKENNA } from "@/lib/data";

const NAV = [
  { href: "/", label: "Home Dashboard" },
  { href: "/today", label: "Today's Plan" },
  { href: "/reading", label: "Reading" },
  { href: "/math", label: "Math" },
  { href: "/ef", label: "Growth" },
  { href: "/progress", label: "Progress" },
  { href: "/parent", label: "Parent Summary" },
];

export default function Sidebar() {
  const path = usePathname();
  return (
    <aside className="hidden md:flex md:flex-col md:w-64 md:flex-shrink-0 md:border-r md:border-sage-100 md:px-5 md:py-10">
      <div className="bg-sage-50 border border-sage-100 rounded-2xl p-4 mb-6">
        <p className="eyebrow">McKenna's Learning Hub</p>
        <p className="text-lg font-semibold text-slate-800 mt-1" style={{ fontFamily: "var(--font-display)" }}>
          {MCKENNA.name}
        </p>
        <p className="text-xs text-slate-500 mt-1 leading-relaxed">
          Calm, confidence-building daily flow
        </p>
      </div>
      <nav className="space-y-1">
        {NAV.map((item) => {
          const active = path === item.href;
          return (
            <Link
              key={item.href}
              href={item.href}
              className={`block px-4 py-2.5 rounded-xl text-sm font-medium transition-colors
                ${active ? "bg-sage-600 text-white" : "text-slate-600 hover:bg-sage-50"}`}
            >
              {item.label}
            </Link>
          );
        })}
      </nav>
    </aside>
  );
}
