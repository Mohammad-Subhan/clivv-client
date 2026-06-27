"use client";

import { useState, useEffect, useRef } from "react";
import { X, Globe, User, Lock, ImageIcon, Plus, Upload, Eye, EyeOff } from "lucide-react";
import api from "@/utils/api";
import toast from "react-hot-toast";
import { encryptData } from "@/services/crypto.service";

interface CreateSecretModalProps {
  onSave: () => void;
  onClose: () => void;
}

export function CreateSecretModal({ onSave, onClose }: CreateSecretModalProps) {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [searchResults, setSearchResults] = useState<any[]>([]);
  const [isSearching, setIsSearching] = useState(false);
  const [showDropdown, setShowDropdown] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    website: "",
    username: "",
    password: "",
    confirmPassword: "",
    logo: ""
  });

  useEffect(() => {
    const fetchLogos = async () => {
      if (!formData.website || formData.website.length < 2 || !showDropdown) {
        setSearchResults([]);
        return;
      }
      setIsSearching(true);
      try {
        const res = await fetch(`/api/logos?q=${formData.website}`);
        const data = await res.json();
        setSearchResults(data);
      } catch (e) {
        console.error(e);
      } finally {
        setIsSearching(false);
      }
    };

    const timer = setTimeout(() => {
      fetchLogos();
    }, 500);

    return () => clearTimeout(timer);
  }, [formData.website, showDropdown]);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setFormData({ ...formData, logo: reader.result as string });
      };
      reader.readAsDataURL(file);
    }
  };

  const triggerFileInput = () => {
    fileInputRef.current?.click();
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (formData.password !== formData.confirmPassword) {
      toast.error("Passwords do not match!");
      return;
    }

    try {
      setIsSubmitting(true);
      const submitData = new FormData();
      submitData.append("name", formData.name);
      submitData.append("website", formData.website);
      submitData.append("username", formData.username);

      try {
        const { encryptedData, iv } = await encryptData(formData.password);
        submitData.append("encryptedPassword", encryptedData);
        submitData.append("iv", iv);
      } catch (error) {
        toast.error("Failed to encrypt password. Please try again.");
        return;
      }

      if (formData && formData.logo.startsWith("data:")) {
        try {
          const res = await fetch(formData.logo);
          const blob = await res.blob();
          submitData.append("logo", blob, "logo.png");
        } catch (e) {
          console.warn("Could not fetch logo blob", e);
        }
      }

      try {
        const response = await api.post("/api/secret/create", submitData, {
          headers: {
            "Content-Type": "multipart/form-data",
          }
        });
        toast.success(response.data.message || "Secret created successfully!");
        onSave();
      } catch (error: any) {
        toast.error(error.response?.data?.message || "Failed to save secret. Please try again.")
      }
    } catch (error: any) {
      toast.error(error.response?.data?.message || "Failed to save secret. Please try again.")
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 z-100 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/60 backdrop-blur-sm animate-in fade-in duration-200"
        onClick={onClose}
      ></div>

      {/* Modal Card */}
      <div className="p-8 max-h-[90vh] relative w-full max-w-lg rounded-xl bg-background-vault border border-white/10 shadow-2xl">
        <div className="flex justify-between items-center pb-4">
          <div>
            <h2 className="text-2xl font-bold tracking-tight">
              Add New Secret
            </h2>
            <p className="text-text-vault/40 text-sm mt-1">
              Protect your credentials with Clivv.
            </p>
          </div>
          <button
            onClick={onClose}
            className="p-2 hover:bg-white/5 rounded-xl text-text-vault/40 transition-all cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>
        <div className="overflow-y-scroll max-h-[70vh] animate-in zoom-in-95 duration-200 pointer-events-auto [&::-webkit-scrollbar]:w-0 mt-4">
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
                    value={formData.website}
                    onChange={(e) => {
                      setFormData({ ...formData, website: e.target.value, logo: "" });
                      setShowDropdown(true);
                    }}
                    onFocus={() => setShowDropdown(true)}
                    onBlur={() => setShowDropdown(false)}
                    className="w-full bg-white/5 border border-white/10 rounded-xl py-3 pl-10 pr-4 text-sm focus:outline-none focus:border-primary/50 transition-all"
                  />
                  {showDropdown && (searchResults.length > 0 || isSearching) && (
                    <div className="absolute top-full left-0 z-50 w-full mt-2 shadow-2xl overflow-hidden animate-in fade-in zoom-in-95 max-h-60 overflow-y-auto">
                      {isSearching ? (
                        <div className="p-4 rounded-xl text-sm border border-white/10 bg-background-vault text-text-vault/40 text-center flex items-center justify-center gap-2">
                          <div className="w-3 h-3 border-2 border-primary border-t-transparent rounded-full animate-spin"></div>
                          Searching...
                        </div>
                      ) : (
                        <div className="border border-white/10 bg-background-vault rounded-lg overflow-hidden">
                          <div className="overflow-y-auto overflow-hidden max-h-[200px] [&::-webkit-scrollbar]:w-0.5 [&::-webkit-scrollbar-track]:bg-transparent [&::-webkit-scrollbar-thumb]:bg-white/20 [&::-webkit-scrollbar-thumb]:rounded-full">
                            {searchResults.map((item, idx) => (
                              <div
                                key={idx}
                                className="flex items-center gap-3 p-3 hover:bg-white/5 cursor-pointer transition-colors border-b border-white/5 last:border-0"
                                onMouseDown={(e) => {
                                  e.preventDefault();
                                  setFormData(prev => ({
                                    ...prev,
                                    website: item.domain,
                                    logo: `${item.logo_url}&theme=dark&format=webp`,
                                    name: prev.name ? prev.name : item.name
                                  }));
                                  setShowDropdown(false);
                                }}
                              >
                                <img src={`${item.logo_url}&theme=dark&format=webp`} alt={item.name} className="w-6 h-6 object-contain rounded-md bg-white/5" />
                                <div>
                                  <div className="text-sm font-bold text-white">{item.name}</div>
                                  <div className="text-xs text-text-vault/40">{item.domain}</div>
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>
                  )}
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
                    className="absolute inset-y-0 right-0 pr-4 flex items-center text-text-vault/20 hover:text-text-vault/50 transition-colors cursor-pointer"
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
                    className="absolute inset-y-0 right-0 pr-4 flex items-center text-text-vault/20 hover:text-text-vault/50 transition-colors cursor-pointer"
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
                {formData.logo ? (
                  <div className="absolute inset-0 flex items-center justify-center bg-black/40 backdrop-blur-sm opacity-0 group-hover:opacity-100 transition-opacity z-10 rounded-2xl">
                    <Upload className="w-6 h-6 text-white" />
                  </div>
                ) : null}

                {formData.logo ? (
                  <img src={formData.logo} alt="Logo Preview" className="w-full h-full object-contain p-4" />
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
                disabled={isSubmitting}
                className="flex-2 primary-gradient text-on-primary py-3.5 rounded-xl font-bold text-sm flex items-center justify-center gap-2 btn-elegant cursor-pointer shadow-lg shadow-primary/20 disabled:opacity-50"
              >
                {isSubmitting ? "Saving..." : "Secure Secret"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
