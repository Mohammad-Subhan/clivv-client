"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Eye, EyeOff, ArrowRight } from "lucide-react";

export default function RegisterPage() {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  return (
    <div className="min-h-screen bg-background-vault text-text-vault flex items-center justify-center p-6 relative overflow-hidden">
      {/* Dynamic Background Elements */}
      <div className="absolute top-[-10%] right-[-10%] w-[40%] h-[40%] bg-primary/10 rounded-full blur-[120px] pointer-events-none"></div>
      <div className="absolute bottom-[-10%] left-[-10%] w-[40%] h-[40%] bg-secondary/10 rounded-full blur-[120px] pointer-events-none"></div>
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full sentinel-glow opacity-30 pointer-events-none"></div>

      <div className="w-full max-w-md relative z-10">
        {/* Logo */}
        <div className="flex justify-center mb-8">
          <Link href="/" className="flex items-center gap-2 group">
            <span className="text-2xl font-bold tracking-tighter text-primary group-hover:scale-105 transition-transform">Clivv</span>
          </Link>
        </div>

        {/* Register Card */}
        <div className="glass-panel-heavy border border-white/10 p-8 rounded-[2rem] shadow-2xl">
          <div className="mb-8">
            <h1 className="text-3xl font-bold tracking-tight">Join the Shield</h1>
            <p className="text-text-vault/40 text-sm mt-1">Start your journey to digital privacy</p>
          </div>

          <form className="space-y-4">
            <div className="flex flex-col gap-2">
              <label className="text-xs font-medium text-text-vault/30 ml-1">Full Name</label>
              <input
                type="text"
                placeholder="John Doe"
                className="w-full bg-white/5 border border-white/10 rounded-xl py-3.5 px-4 text-sm focus:outline-none focus:border-primary/50 transition-all focus:bg-white/[0.07]"
              />
            </div>

            <div className="flex flex-col gap-2">
              <label className="text-xs font-medium text-text-vault/30 ml-1">Email Address</label>
              <input
                type="email"
                placeholder="name@company.com"
                className="w-full bg-white/5 border border-white/10 rounded-xl py-3.5 px-4 text-sm focus:outline-none focus:border-primary/50 transition-all focus:bg-white/[0.07]"
              />
            </div>

            <div className="flex flex-col gap-2">
              <label className="text-xs font-medium text-text-vault/30 ml-1">Master Password</label>
              <div className="relative group">
                <input
                  type={showPassword ? "text" : "password"}
                  placeholder="••••••••••••"
                  className="w-full bg-white/5 border border-white/10 rounded-xl py-3.5 px-4 text-sm focus:outline-none focus:border-primary/50 transition-all focus:bg-white/[0.07]"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute inset-y-0 right-0 pr-4 flex items-center text-text-vault/20 hover:text-text-vault/50 transition-colors"
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            <div className="flex flex-col gap-2">
              <label className="text-xs font-medium text-text-vault/30 ml-1">Confirm Password</label>
              <div className="relative group">
                <input
                  type={showConfirmPassword ? "text" : "password"}
                  placeholder="••••••••••••"
                  className="w-full bg-white/5 border border-white/10 rounded-xl py-3.5 px-4 text-sm focus:outline-none focus:border-primary/50 transition-all focus:bg-white/[0.07]"
                />
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  className="absolute inset-y-0 right-0 pr-4 flex items-center text-text-vault/20 hover:text-text-vault/50 transition-colors"
                >
                  {showConfirmPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            <button className="w-full primary-gradient text-on-primary py-4 rounded-xl font-bold text-sm btn-elegant flex items-center justify-center gap-2 mt-4 cursor-pointer">
              Create My Vault
              <ArrowRight className="w-4 h-4" />
            </button>
            <button className="w-full bg-white/5 hover:bg-white/10 border border-white/10 py-3.5 rounded-xl text-sm font-semibold transition-all flex items-center justify-center gap-2 cursor-pointer">
              <Image src="/google.png" alt="Google" width={18} height={18} />
              Join with Google
            </button>
          </form>

          <div className="mt-6 pt-5 border-t border-white/5 text-center leading-relaxed">
            <p className="text-sm text-text-vault/40">
              Already have a shield?{" "}
              <Link href="/login" className="text-primary hover:underline underline-offset-4 font-semibold">
                Sign in here
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
