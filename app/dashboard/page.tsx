"use client";

import { useState, useMemo } from "react";
import {
  Search,
  Copy,
  Edit,
  Eye,
  EyeOff,
  Plus,
  ShieldAlert
} from "lucide-react";
import { VaultModal } from "@/components/VaultModal";

interface VaultItem {
  id: number;
  name: string;
  url: string;
  username: string;
  password: string;
  icon: string;
  strength: string;
}

const initialVaultItems: VaultItem[] = [
  {
    id: 1,
    name: "Google Account",
    url: "google.com",
    username: "alex.v@protonmail.com",
    password: "Password@123",
    icon: "/google.png",
    strength: "Strong"
  },
  {
    id: 2,
    name: "GitHub Personal",
    url: "github.com",
    username: "obsidian_vault_01",
    password: "SecureGitHub789!",
    icon: "/github.png",
    strength: "Strong"
  },
  {
    id: 3,
    name: "Netflix Family",
    url: "netflix.com",
    username: "home_stream@v-vault.io",
    password: "NetflixPassword22",
    icon: "/netflix.png",
    strength: "Medium"
  }
];

export default function VaultPage() {
  const [items, setItems] = useState<VaultItem[]>(initialVaultItems);
  const [searchQuery, setSearchQuery] = useState("");
  const [visiblePasswords, setVisiblePasswords] = useState<Record<number, boolean>>({});
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingItem, setEditingItem] = useState<VaultItem | null>(null);

  // Memoized search logic for performance
  const filteredItems = useMemo(() => {
    const query = searchQuery.toLowerCase().trim();
    if (!query) return items;

    return items.filter(item =>
      item.name.toLowerCase().includes(query) ||
      item.url.toLowerCase().includes(query) ||
      item.username.toLowerCase().includes(query)
    );
  }, [items, searchQuery]);

  const togglePasswordVisibility = (id: number) => {
    setVisiblePasswords((prev) => ({
      ...prev,
      [id]: !prev[id]
    }));
  };

  const handleAddNew = () => {
    setEditingItem(null);
    setIsModalOpen(true);
  };

  const handleEditItem = (item: VaultItem) => {
    setEditingItem(item);
    setIsModalOpen(true);
  };

  const handleSave = (data: Partial<VaultItem>) => {
    if (editingItem) {
      setItems(items.map(item => item.id === editingItem.id ? { ...item, ...data } as VaultItem : item));
    } else {
      const newItem: VaultItem = {
        id: items.length + 1,
        name: data.name || "Untitled",
        url: data.url || "",
        username: data.username || "",
        password: data.password || "",
        icon: data.icon || "/vercel.svg",
        strength: "Strong"
      };
      setItems([...items, newItem]);
    }
    setIsModalOpen(false);
  };

  return (
    <>
      <div className="mb-10 flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div>
          <h2 className="text-4xl font-bold tracking-tight mb-2">My Vaults</h2>
          <p className="text-text-vault/40 text-sm max-w-md">Securely managing your digital identity with military-grade obsidian encryption.</p>
        </div>
        <div className="flex flex-col md:flex-row items-center gap-4 w-full md:w-auto">
          <div className="relative w-full md:w-80 group">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-text-vault/20 group-focus-within:text-primary transition-colors" />
            <input
              type="text"
              placeholder="Search passwords..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-white/5 border border-white/10 rounded-xl pl-12 pr-4 py-3 text-sm focus:outline-none focus:border-primary/50 transition-all font-medium"
            />
          </div>
          <button
            onClick={handleAddNew}
            className="w-full md:w-auto primary-gradient text-on-primary px-6 py-3 rounded-xl font-bold text-sm flex items-center justify-center gap-2 btn-elegant whitespace-nowrap cursor-pointer hover:scale-[1.02] active:scale-[0.98] transition-all"
          >
            <Plus className="w-4 h-4" />
            Add Password
          </button>
        </div>
      </div>

      <div className="space-y-4">
        {/* Table Header */}
        <div className="grid grid-cols-12 px-6 py-2 text-[10px] uppercase tracking-[0.2em] font-bold text-text-vault/20">
          <div className="col-span-4">Service & Name</div>
          <div className="col-span-3">Username</div>
          <div className="col-span-3">Password</div>
          <div className="col-span-2 text-right">Actions</div>
        </div>

        {/* Empty State */}
        {filteredItems.length === 0 && (
          <div className="flex flex-col items-center justify-center py-20 px-6 glass-panel-heavy border border-white/5 rounded-3xl">
            <div className="w-16 h-16 bg-white/5 rounded-2xl flex items-center justify-center mb-4">
              <ShieldAlert className="w-8 h-8 text-text-vault/20" />
            </div>
            <h3 className="text-lg font-bold text-white mb-1">No matches found</h3>
            <p className="text-text-vault/40 text-sm">We couldn't find any items matching "{searchQuery}"</p>
            <button
              onClick={() => setSearchQuery("")}
              className="mt-6 text-primary text-sm font-bold hover:underline underline-offset-4"
            >
              Clear search query
            </button>
          </div>
        )}

        {/* Vault items */}
        {filteredItems.map((item) => (
          <div key={item.id} className="grid grid-cols-12 items-center rounded-2xl px-6 py-4 bg-white/3 border border-white/5 hover:bg-white/6 hover:border-primary/20 transition-all group animate-in fade-in slide-in-from-bottom-2 duration-300">
            <div className="col-span-4 flex items-center gap-4">
              <div className="w-10 h-10 bg-black/40 rounded-xl flex items-center justify-center border border-white/5 shadow-inner overflow-hidden">
                <img
                  src={item.icon}
                  alt={item.name}
                  width={20}
                  height={20}
                  className={item.icon.includes("github") ? "invert" : ""}
                />
              </div>
              <div>
                <h3 className="font-bold text-sm">{item.name}</h3>
                <p className="text-[10px] text-text-vault/40">{item.url}</p>
              </div>
            </div>
            <div className="col-span-3 text-xs text-text-vault/60 font-medium truncate pr-4">
              {item.username}
            </div>
            <div className="col-span-3 pr-4">
              {visiblePasswords[item.id] ? (
                <span className="text-sm font-mono text-white tracking-normal break-all">{item.password}</span>
              ) : (
                <span className="text-lg text-primary/40 tracking-widest font-mono">••••••••••••</span>
              )}
            </div>
            <div className="col-span-2 flex justify-end gap-2">
              <button
                onClick={() => togglePasswordVisibility(item.id)}
                className="p-2 text-text-vault/20 hover:text-primary hover:bg-primary/10 rounded-lg transition-all cursor-pointer"
                title="Toggle Visibility"
              >
                {visiblePasswords[item.id] ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
              <button
                className="p-2 text-text-vault/20 hover:text-primary hover:bg-primary/10 rounded-lg transition-all cursor-pointer"
                title="Copy Password"
              >
                <Copy className="w-4 h-4" />
              </button>
              <button
                onClick={() => handleEditItem(item)}
                className="p-2 text-text-vault/20 hover:text-primary hover:bg-primary/10 rounded-lg transition-all cursor-pointer"
                title="Edit Item"
              >
                <Edit className="w-4 h-4" />
              </button>
            </div>
          </div>
        ))}
      </div>

      <VaultModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSave={handleSave}
        initialData={editingItem}
      />
    </>
  );
}
