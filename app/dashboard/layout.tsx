"use client";

import { useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import Link from "next/link";
import { Sidebar } from "@/components/Sidebar";
import { ChevronRight, Settings, HelpCircle, LogOut, User as UserIcon } from "lucide-react";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const router = useRouter();
  const [showProfileMenu, setShowProfileMenu] = useState(false);

  // Helper to determine page title based on route
  const getPageTitle = () => {
    if (pathname === "/dashboard") return "My Vault";
    if (pathname === "/dashboard/settings") return "Settings";
    if (pathname === "/dashboard/profile") return "Profile";
    if (pathname === "/dashboard/trash") return "Trash";
    return "Dashboard";
  };

  const handleLogout = () => {
    // In a real app, you'd clear session/tokens here
    router.push("/");
  };

  return (
    <div className="min-h-screen bg-background-vault text-text-vault flex">
      <Sidebar />
      <main className="flex-1 ml-64 min-h-screen flex flex-col">
        {/* Top bar (Common for all dashboard pages) */}
        <header className="h-16 border-b border-white/5 flex items-center justify-between px-8 bg-black/20 backdrop-blur-md sticky top-0 z-40">
          <div className="flex items-center gap-4">
            <h1 className="text-sm font-bold opacity-40">Clivv Sentinel</h1>
            <ChevronRight className="w-3 h-3 opacity-20" />
            <span className="text-sm font-bold">{getPageTitle()}</span>
          </div>

          <div className="flex items-center gap-6">
            <div className="flex items-center gap-3">
              <Link
                href="/dashboard/settings"
                className="p-2 text-text-vault/40 hover:text-primary transition-all cursor-pointer"
              >
                <Settings className="w-4 h-4" />
              </Link>
            </div>

            {/* Profile Dropdown Container */}
            <div className="relative">
              <button
                onClick={() => setShowProfileMenu(!showProfileMenu)}
                className="w-8 h-8 rounded-lg overflow-hidden border border-white/10 ring-2 ring-primary/20 cursor-pointer hover:ring-primary/40 transition-all"
              >
                <img
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuBxyVXinPRaOE_jozZ3jlyonJqB0isQgbinu_PjAM4BbAYEUj0r1yCbtkqRQGJ9aoPzJyJyi0jEUu4wWuWd41t4mepVLDDlDajiWrs9Q5naKzeKnZjqlgqFsZMNPs-sPjGCxbrtfKiIRgTB91E1rO1eiaTCAMAAvPJkiUit_GaYrbYrP6TzSzxomW0hNYnTeb13oy6FWj5-6lEaltfsl9nC-tQQnQ5xcAcVNaUGNyiC6lqWzJmTpiqa_QLO1_lgHxk44qfSjKWnFIQ"
                  alt="Profile"
                  className="w-full h-full object-cover"
                />
              </button>

              {/* Dropdown Menu */}
              {showProfileMenu && (
                <>
                  <div
                    className="fixed inset-0 z-10"
                    onClick={() => setShowProfileMenu(false)}
                  ></div>
                  <div className="absolute right-0 mt-3 w-56 bg-black border border-white/10 rounded-2xl shadow-2xl z-20 py-2 overflow-hidden animate-in fade-in zoom-in-95 duration-100">
                    <div className="px-4 py-3 border-b border-white/10 mb-1">
                      <p className="text-xs font-bold text-white">Alex Volkov</p>
                      <p className="text-[10px] text-white/30 truncate">alex.v@protonmail.com</p>
                    </div>

                    <Link
                      href="/dashboard/profile"
                      onClick={() => setShowProfileMenu(false)}
                      className="flex items-center gap-3 px-4 py-2.5 text-sm text-text-vault/60 hover:text-white hover:bg-white/7 transition-all"
                    >
                      <UserIcon className="w-4 h-4" />
                      View Profile
                    </Link>

                    <button
                      onClick={handleLogout}
                      className="w-full flex items-center gap-3 px-4 py-2.5 text-sm text-red-500 hover:bg-red-500/10 transition-all cursor-pointer"
                    >
                      <LogOut className="w-4 h-4" />
                      Log Out
                    </button>
                  </div>
                </>
              )}
            </div>
          </div>
        </header>

        {/* Content Area */}
        <div className="p-8 max-w-6xl mx-auto w-full flex-1">
          {children}
        </div>
      </main>
    </div>
  );
}
