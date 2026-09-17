"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { LayoutGrid, PanelLeftClose, PanelLeftOpen } from "lucide-react";
import Image from "next/image";

const navItems = [
  { name: "Secrets", href: "/dashboard", icon: LayoutGrid },
];

interface SidebarProps {
  isOpen: boolean;
  onToggle: () => void;
}

export function Sidebar({ isOpen, onToggle }: SidebarProps) {
  const pathname = usePathname();
  const isActive = (href: string) => pathname === href;

  return (
    <aside
      className={`
        fixed h-full bg-black/40 backdrop-blur-xl border-r border-white/5
        flex flex-col z-50 overflow-hidden
        transition-[width] duration-300 ease-in-out
        ${isOpen ? "w-64" : "w-16"}
      `}
    >
      <div className="group/header relative flex items-center h-16 border-b border-white/5 shrink-0">

        {isOpen ? (
          <>
            <Link href="/" className="flex items-center gap-3 px-4 min-w-0">
              <div className="w-8 h-8 shrink-0 rounded-lg overflow-hidden flex items-center justify-center">
                <Image src="/lock.png" alt="Clivv" width={32} height={32} className="object-contain" />
              </div>
              <span className="text-xl font-bold tracking-tighter text-primary whitespace-nowrap">
                Clivv
              </span>
            </Link>
            <button
              onClick={onToggle}
              className="ml-auto mr-3 shrink-0 p-1.5 rounded-lg text-text-vault/30 hover:text-text-vault/70 hover:bg-white/8 transition-all duration-200 cursor-pointer"
              title="Collapse sidebar"
            >
              <PanelLeftClose className="w-4 h-4" />
            </button>
          </>
        ) : (
          <div className="w-full flex items-center justify-center">
            <Link
              href="/"
              className="absolute transition-all duration-200 opacity-100 group-hover/header:opacity-0"
              title="Clivv"
            >
              <div className="w-8 h-8 rounded-lg overflow-hidden flex items-center justify-center">
                <Image src="/lock.png" alt="Clivv" width={32} height={32} className="object-contain" />
              </div>
            </Link>
            <button
              onClick={onToggle}
              className="absolute transition-all duration-200 opacity-0 scale-75 group-hover/header:opacity-100 group-hover/header:scale-100 p-1.5 rounded-lg text-text-vault/50 hover:text-text-vault/90 hover:bg-white/8 cursor-pointer"
              title="Expand sidebar"
            >
              <PanelLeftOpen className="w-4 h-4" />
            </button>
          </div>
        )}
      </div>

      <nav className="flex-1 py-4 space-y-1">
        <div
          className={`
            text-[10px] uppercase tracking-widest text-text-vault/20 font-bold px-4 mb-2
            whitespace-nowrap overflow-hidden transition-all duration-300
            ${isOpen ? "opacity-100 max-h-8" : "opacity-0 max-h-0"}
          `}
        >
          Main
        </div>

        {navItems.map((item) => {
          const active = isActive(item.href);
          return (
            <Link
              key={item.href}
              href={item.href}
              title={!isOpen ? item.name : undefined}
              className={`
                flex items-center py-3 rounded-xl mx-2
                transition-all duration-200
                ${isOpen ? "gap-3 px-4" : "justify-center px-0"}
                ${active
                  ? "bg-primary/10 text-primary"
                  : "text-text-vault/40 hover:text-text-vault/80 hover:bg-white/5"
                }
              `}
            >
              <item.icon className="w-4 h-4 shrink-0" />
              <span
                className={`
                  text-sm font-medium whitespace-nowrap overflow-hidden
                  transition-all duration-300
                  ${isOpen ? "opacity-100 max-w-40" : "opacity-0 max-w-0"}
                `}
              >
                {item.name}
              </span>
            </Link>
          );
        })}
      </nav>
    </aside>
  );
}
