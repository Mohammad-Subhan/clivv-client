"use client";

import { useState } from "react";
import { Eye, EyeOff, LockKeyhole } from "lucide-react";
import { setSession } from "@/services/session.service";
import toast from "react-hot-toast";

interface VaultUnlockModalProps {
  /** The salt stored on the current user object (from cookies/Redux). */
  salt: string;
  /** Called after the user successfully re-enters their master password. */
  onUnlocked: () => void;
  /** Called if the user chooses to log out instead. */
  onLogout: () => void;
}

export function VaultUnlockModal({ salt, onUnlocked, onLogout }: VaultUnlockModalProps) {
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleUnlock = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!password.trim()) {
      toast.error("Please enter your master password");
      return;
    }
    setLoading(true);
    try {
      // Restore the in-memory crypto session from the supplied password + persisted salt
      setSession({ pass: password, saltValue: salt });
      toast.success("Vault unlocked");
      onUnlocked();
    } catch {
      toast.error("Failed to unlock vault");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-200 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black/70 backdrop-blur-md animate-in fade-in duration-300" />

      {/* Card */}
      <div className="relative w-full max-w-sm bg-background-vault border border-white/10 rounded-[2rem] shadow-2xl overflow-hidden animate-in zoom-in-95 duration-300">
        {/* Top glow accent */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-40 h-1 bg-primary/60 rounded-b-full blur-sm" />

        <div className="p-8">
          {/* Icon */}
          <div className="flex justify-center mb-6">
            <div className="w-14 h-14 rounded-2xl primary-gradient flex items-center justify-center shadow-lg shadow-primary/30">
              <LockKeyhole className="w-6 h-6 text-on-primary" />
            </div>
          </div>

          <h2 className="text-2xl font-bold tracking-tight text-center mb-1">
            Unlock Your Vault
          </h2>
          <p className="text-text-vault/40 text-sm text-center mb-8">
            Your session was restored. Re-enter your master password to decrypt your secrets.
          </p>

          <form onSubmit={handleUnlock} className="space-y-4">
            <div className="relative group">
              <input
                type={showPassword ? "text" : "password"}
                placeholder="Master password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                autoFocus
                className="w-full bg-white/5 border border-white/10 rounded-xl py-3.5 px-4 text-sm focus:outline-none focus:border-primary/50 transition-all focus:bg-white/[0.07] pr-12"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute inset-y-0 right-0 pr-4 flex items-center text-text-vault/20 hover:text-text-vault/50 cursor-pointer"
              >
                {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full primary-gradient text-on-primary py-3.5 rounded-xl font-bold text-sm btn-elegant flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50 transition-all hover:scale-[1.02] active:scale-[0.98]"
            >
              {loading ? "Unlocking..." : "Unlock Vault"}
            </button>
          </form>

          <button
            type="button"
            onClick={onLogout}
            className="mt-4 w-full text-center text-xs text-text-vault/30 hover:text-text-vault/60 transition-colors cursor-pointer py-1"
          >
            Sign out instead
          </button>
        </div>
      </div>
    </div>
  );
}
