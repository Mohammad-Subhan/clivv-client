"use client";

import { Settings as SettingsIcon, Bell, Shield, Key, Eye, Monitor } from "lucide-react";

export default function SettingsPage() {
  return (
    <>
      <div className="mb-10">
        <h2 className="text-4xl font-bold tracking-tight mb-2">Settings</h2>
        <p className="text-text-vault/40 text-sm max-w-md">Manage your vault preference and security protocols.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="glass-panel-heavy border border-white/5 rounded-2xl p-6 hover:border-primary/20 transition-all group">
          <div className="flex items-center gap-4 mb-6">
            <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center text-primary">
              <Shield className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-bold">Security</h3>
              <p className="text-[10px] text-text-vault/30 uppercase tracking-widest">Auth & Encryption</p>
            </div>
          </div>
          <div className="space-y-4">
            <div className="flex items-center justify-between p-3 rounded-xl bg-white/5 border border-white/5">
              <span className="text-sm font-medium text-text-vault/60">Two-Factor Authentication</span>
              <div className="w-10 h-5 bg-primary/20 rounded-full relative">
                <div className="absolute right-1 top-1 w-3 h-3 bg-primary rounded-full"></div>
              </div>
            </div>
            <div className="flex items-center justify-between p-3 rounded-xl bg-white/5 border border-white/5 text-text-vault/20">
              <span className="text-sm font-medium">Auto-lock Vault</span>
              <span className="text-xs">Immediately</span>
            </div>
          </div>
        </div>

        <div className="glass-panel-heavy border border-white/5 rounded-2xl p-6 hover:border-primary/20 transition-all group">
          <div className="flex items-center gap-4 mb-6">
            <div className="w-10 h-10 rounded-xl bg-secondary/10 flex items-center justify-center text-secondary">
              <Monitor className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-bold">Preferences</h3>
              <p className="text-[10px] text-text-vault/30 uppercase tracking-widest">Interface & Theme</p>
            </div>
          </div>
          <div className="space-y-4">
            <div className="flex items-center justify-between p-3 rounded-xl bg-white/5 border border-white/5">
              <span className="text-sm font-medium text-text-vault/60">Dark Mode</span>
              <div className="w-10 h-5 bg-secondary/20 rounded-full relative">
                <div className="absolute right-1 top-1 w-3 h-3 bg-secondary rounded-full"></div>
              </div>
            </div>
            <div className="flex items-center justify-between p-3 rounded-xl bg-white/5 border border-white/10">
              <span className="text-sm font-medium text-text-vault/60">Glassmorphism Intensity</span>
              <span className="text-xs text-secondary">High</span>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
