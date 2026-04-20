"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Lock,
  Star,
  User,
  Briefcase,
  Trash2,
  Plus,
  Settings,
  LayoutGrid,
  UserCircle
} from "lucide-react";

const navItems = [
  { name: "Vault", href: "/dashboard", icon: LayoutGrid }
];

const secondaryNavItems = [
  { name: "Profile", href: "/dashboard/profile", icon: UserCircle },
  { name: "Settings", href: "/dashboard/settings", icon: Settings }
];

export function Sidebar() {
  const pathname = usePathname();

  const isActive = (href: string) => pathname === href;

  return (
    <aside className="w-64 fixed h-full bg-black/40 backdrop-blur-xl border-r border-white/5 flex flex-col z-50">
      <div className="p-6">
        <Link href="/" className="flex items-center gap-3">
          <span className="text-xl font-bold tracking-tighter text-primary">Clivv</span>
        </Link>
      </div>

      <nav className="flex-1 px-4 space-y-1">
        <div className="text-[10px] uppercase tracking-widest text-text-vault/20 font-bold px-4 mb-2">Main</div>
        {navItems.map((item) => {
          const Active = isActive(item.href);
          return (
            <Link
              key={item.href}
              href={item.href}
              className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${Active
                ? "bg-primary/10 text-primary"
                : "text-text-vault/40 hover:text-text-vault/80 hover:bg-white/5"
                }`}
            >
              <item.icon className="w-4 h-4" />
              <span className="text-sm font-medium">{item.name}</span>
            </Link>
          );
        })}

        <div className="pt-6 mt-6 border-t border-white/5">
          <div className="text-[10px] uppercase tracking-widest text-text-vault/20 font-bold px-4 mb-2">System</div>
          {secondaryNavItems.map((item) => {
            const Active = isActive(item.href);
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${Active
                  ? "bg-primary/10 text-primary"
                  : "text-text-vault/40 hover:text-text-vault/80 hover:bg-white/5"
                  }`}
              >
                <item.icon className="w-4 h-4" />
                <span className="text-sm font-medium">{item.name}</span>
              </Link>
            );
          })}
        </div>
      </nav>
    </aside>
  );
}
