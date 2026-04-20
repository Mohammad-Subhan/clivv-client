"use client";

import { useState, useEffect, useRef } from "react";
import { X, Globe, User, Lock, ImageIcon, Plus, Upload, Eye, EyeOff } from "lucide-react";

interface VaultItem {
  id: number;
  name: string;
  url: string;
  username: string;
  password: string;
  icon: string;
}

interface VaultModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (item: Partial<VaultItem>) => void;
  initialData?: VaultItem | null;
}

export function VaultModal({ isOpen, onClose, onSave, initialData }: VaultModalProps) {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    url: "",
    username: "",
    password: "",
    confirmPassword: "",
    icon: ""
  });

  useEffect(() => {
    if (initialData) {
      setFormData({
        name: initialData.name,
        url: initialData.url,
        username: initialData.username,
        password: initialData.password,
        confirmPassword: initialData.password,
        icon: initialData.icon
      });
    } else {
      setFormData({
        name: "",
        url: "",
        username: "",
        password: "",
        confirmPassword: "",
        icon: ""
      });
    }
    setShowPassword(false);
    setShowConfirmPassword(false);
  }, [initialData, isOpen]);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setFormData({ ...formData, icon: reader.result as string });
      };
      reader.readAsDataURL(file);
    }
  };

  const triggerFileInput = () => {
    fileInputRef.current?.click();
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (formData.password !== formData.confirmPassword) {
      alert("Passwords do not match!");
      return;
    }
    onSave(formData);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-100 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/60 backdrop-blur-sm animate-in fade-in duration-200"
        onClick={onClose}
      ></div>

      {/* Modal Card */}
      <div className="relative w-full max-w-lg bg-background-vault border border-white/10 rounded-[2rem] shadow-2xl overflow-hidden animate-in zoom-in-95 duration-200 pointer-events-auto max-h-[90vh] overflow-y-auto hide-scrollbar">
        <div className="p-8">
          <div className="flex justify-between items-center mb-8">
            <div>
              <h2 className="text-2xl font-bold tracking-tight">
                {initialData ? "Edit Vault Item" : "Add New Secret"}
              </h2>
              <p className="text-text-vault/40 text-sm mt-1">
                Protect your credentials with Clivv Sentinel.
              </p>
            </div>
            <button
              onClick={onClose}
              className="p-2 hover:bg-white/5 rounded-xl text-text-vault/40 transition-all cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          <form className="space-y-5" onSubmit={handleSubmit}>
            <div className="grid grid-cols-2 gap-4">
              <div className="flex flex-col gap-1">
                <label className="text-[10px] font-bold text-text-vault/20 uppercase tracking-widest ml-1">Service Name</label>
                <div className="relative border-none group">
                  <span className="absolute left-4 top-1/2 -translate-y-1/2 text-text-vault/20 group-focus-within:text-primary transition-colors">
                    <Plus className="w-3.5 h-3.5" />
                  </span>
                  <input
                    type="text"
                    placeholder="e.g. Netflix"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full bg-white/5 border border-white/10 rounded-xl py-3 pl-10 pr-4 text-sm focus:outline-none focus:border-primary/50 transition-all"
                    required
                  />
                </div>
              </div>
              <div className="flex flex-col gap-1">
                <label className="text-[10px] font-bold text-text-vault/20 uppercase tracking-widest ml-1">Website URL</label>
                <div className="relative border-none group">
                  <span className="absolute left-4 top-1/2 -translate-y-1/2 text-text-vault/20 group-focus-within:text-secondary transition-colors">
                    <Globe className="w-3.5 h-3.5" />
                  </span>
                  <input
                    type="text"
                    placeholder="netflix.com"
                    value={formData.url}
                    onChange={(e) => setFormData({ ...formData, url: e.target.value })}
                    className="w-full bg-white/5 border border-white/10 rounded-xl py-3 pl-10 pr-4 text-sm focus:outline-none focus:border-primary/50 transition-all"
                  />
                </div>
              </div>
            </div>

            <div className="flex flex-col gap-1">
              <label className="text-[10px] font-bold text-text-vault/20 uppercase tracking-widest ml-1">Username / Email</label>
              <div className="relative border-none group">
                <span className="absolute left-4 top-1/2 -translate-y-1/2 text-text-vault/20 group-focus-within:text-primary transition-colors">
                  <User className="w-3.5 h-3.5" />
                </span>
                <input
                  type="text"
                  placeholder="name@company.com"
                  value={formData.username}
                  onChange={(e) => setFormData({ ...formData, username: e.target.value })}
                  className="w-full bg-white/5 border border-white/10 rounded-xl py-3 pl-10 pr-4 text-sm focus:outline-none focus:border-primary/50 transition-all"
                  required
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="flex flex-col gap-1">
                <label className="text-[10px] font-bold text-text-vault/20 uppercase tracking-widest ml-1">Password</label>
                <div className="relative border-none group">
                  <span className="absolute left-4 top-1/2 -translate-y-1/2 text-text-vault/20 group-focus-within:text-primary transition-colors">
                    <Lock className="w-3.5 h-3.5" />
                  </span>
                  <input
                    type={showPassword ? "text" : "password"}
                    placeholder="••••••••••••"
                    value={formData.password}
                    onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                    className="w-full bg-white/5 border border-white/10 rounded-xl py-3.5 pl-10 pr-12 text-sm focus:outline-none focus:border-primary/50 transition-all"
                    required
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

              <div className="flex flex-col gap-1">
                <label className="text-[10px] font-bold text-text-vault/20 uppercase tracking-widest ml-1">Confirm Password</label>
                <div className="relative border-none group">
                  <span className="absolute left-4 top-1/2 -translate-y-1/2 text-text-vault/20 group-focus-within:text-primary transition-colors">
                    <Lock className="w-3.5 h-3.5" />
                  </span>
                  <input
                    type={showConfirmPassword ? "text" : "password"}
                    placeholder="••••••••••••"
                    value={formData.confirmPassword}
                    onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
                    className="w-full bg-white/5 border border-white/10 rounded-xl py-3.5 pl-10 pr-12 text-sm focus:outline-none focus:border-primary/50 transition-all"
                    required
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
            </div>

            <div className="flex flex-col gap-1">
              <label className="text-[10px] font-bold text-text-vault/20 uppercase tracking-widest ml-1">Service Brand Logo</label>
              <div
                onClick={triggerFileInput}
                className="group relative w-full h-28 bg-white/5 border-2 border-dashed border-white/10 rounded-2xl flex flex-col items-center justify-center gap-2 cursor-pointer hover:bg-white/8 hover:border-primary/40 transition-all overflow-hidden"
              >
                {formData.icon ? (
                  <div className="absolute inset-0 flex items-center justify-center bg-black/40 backdrop-blur-sm opacity-0 group-hover:opacity-100 transition-opacity z-10 rounded-2xl">
                    <Upload className="w-6 h-6 text-white" />
                  </div>
                ) : null}

                {formData.icon ? (
                  <img src={formData.icon} alt="Logo Preview" className="w-full h-full object-contain p-4" />
                ) : (
                  <>
                    <div className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center text-text-vault/20 group-hover:text-primary transition-colors">
                      <ImageIcon className="w-5 h-5" />
                    </div>
                    <p className="text-xs text-text-vault/30 group-hover:text-text-vault/60 font-medium">Click to upload brand logo</p>
                  </>
                )}

                <input
                  type="file"
                  ref={fileInputRef}
                  onChange={handleFileChange}
                  accept="image/*"
                  className="hidden"
                />
              </div>
            </div>

            <div className="pt-4 flex gap-3">
              <button
                type="button"
                onClick={onClose}
                className="flex-1 bg-white/5 hover:bg-white/10 border border-white/5 text-text-vault/60 py-3.5 rounded-xl text-sm font-bold transition-all cursor-pointer"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="flex-2 primary-gradient text-on-primary py-3.5 rounded-xl font-bold text-sm flex items-center justify-center gap-2 btn-elegant cursor-pointer shadow-lg shadow-primary/20"
              >
                {initialData ? "Update Item" : "Secure Secret"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
