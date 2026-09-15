"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";

// Makena's own nav — Parent Summary is intentionally left off. That tab is
// parent/administrator-facing only and lives in the desktop Sidebar instead.
const NAV = [
  { href: "/",         label: "Home",    icon: "🏠" },
  { href: "/today",    label: "Today",   icon: "📋" },
  { href: "/reading",  label: "Reading", icon: "📖" },
  { href: "/math",     label: "Math",    icon: "➕" },
  { href: "/ef",       label: "Growth",  icon: "🌱" },
];

export default function NavBar() {
  const path = usePathname();
  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 bg-white border-t border-slate-200 pb-safe md:hidden">
      <div className="flex justify-around items-center h-16 max-w-lg mx-auto px-2">
        {NAV.map((item) => {
          const active = path === item.href;
          return (
            <Link
              key={item.href}
              href={item.href}
              className={`flex flex-col items-center gap-0.5 px-2 py-1 rounded-xl transition-colors min-w-[52px]
                ${active ? "text-sage-600" : "text-slate-400 hover:text-slate-600"}`}
            >
              <span className="text-xl leading-none">{item.icon}</span>
              <span className={`text-[10px] font-medium ${active ? "text-sage-600" : "text-slate-400"}`}>
                {item.label}
              </span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
