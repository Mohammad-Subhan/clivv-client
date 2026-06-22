"use client";

import { useState, useMemo, useEffect } from "react";
import {
  Search,
  Copy,
  Edit,
  Eye,
  EyeOff,
  Plus,
  ShieldAlert,
  Trash2,
  RefreshCw
} from "lucide-react";
import { CreateSecretModal } from "@/components/CreateSecretModal";
import api from "@/utils/api";
import toast from "react-hot-toast";
import { UpdateSecretModal } from "@/components/UpdateSecretModal";
import { decryptData } from "@/services/crypto.service";

interface SecretItem {
  _id: string;
  name: string;
  website: string;
  username: string;
  password: string;
  logo: string;
}

interface SecretResponseItem {
  _id: string;
  name: string;
  website: string;
  username: string;
  encryptedPassword: string;
  iv: string;
  authTag: string;
  logo: string;
}

interface EditSecretData {
  _id: string;
  name: string;
  website: string;
  username: string;
  logo: string;
}

export default function VaultPage() {
  const [items, setItems] = useState<SecretItem[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [visiblePasswords, setVisiblePasswords] = useState<Record<string, boolean>>({});
  const [isCreating, setIsCreating] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [editingItem, setEditingItem] = useState<EditSecretData | null>(null);
  const [itemToDelete, setItemToDelete] = useState<SecretItem | null>(null);
  const [loading, setLoading] = useState(false);

  // Memoized search logic for performance
  const filteredItems = useMemo(() => {
    const query = searchQuery.toLowerCase().trim();
    if (!query) return items;

    return items.filter(item =>
      item.name.toLowerCase().includes(query) ||
      item.website.toLowerCase().includes(query) ||
      item.username.toLowerCase().includes(query)
    );
  }, [items, searchQuery]);

  const togglePasswordVisibility = (id: string) => {
    setVisiblePasswords((prev) => ({
      ...prev,
      [id]: !prev[id]
    }));
  };

  const handleAddNewModal = () => {
    setIsEditing(false);
    setIsCreating(true);
  };

  const handleEditItem = (item: SecretItem) => {
    setEditingItem({
      _id: item._id,
      name: item.name,
      website: item.website,
      username: item.username,
      logo: item.logo
    });
    setIsEditing(true);
  };

  const handleSave = async () => {
    setIsCreating(false);
    setIsEditing(false);
    setLoading(true);
    try {
      const response = await api.get("/api/secret");
      const decryptedData = await Promise.all(response.data.map(async (item: SecretResponseItem) => ({
        ...item,
        password: await decryptData({ encryptedData: item.encryptedPassword, iv: item.iv })
      })))
      setItems(decryptedData);
    } catch (error: any) {
      const errorMessage = error.response?.data?.message;
      toast.error(errorMessage || "Failed to fetch secrets");
    } finally {
      setLoading(false);
    }
  }

  const handleDeleteItem = async (id: string) => {
    setLoading(true);
    try {
      const response = await api.delete(`/api/secret/${id}`);
      toast.success(response.data.message);
      handleSave();
      setItemToDelete(null);
    } catch (error: any) {
      toast.error(error.response.data.message || "Failed to delete secret");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    handleSave();
  }, []);

  const getIconFromWebsite = (website: string) => {
    return `https://img.logo.dev/${website}?token=${process.env.NEXT_PUBLIC_LOGO_DEV_PUBLISHABLE_KEY}&theme=dark&format=webp`
  }

  return (
    <>
      <div className="mb-10 flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div>
          <h2 className="text-4xl font-bold tracking-tight mb-2">My Secrets</h2>
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
            onClick={handleAddNewModal}
            className="w-full md:w-auto primary-gradient text-on-primary px-6 py-3 rounded-xl font-bold text-sm flex items-center justify-center gap-2 btn-elegant whitespace-nowrap cursor-pointer hover:scale-[1.02] active:scale-[0.98] transition-all"
          >
            <Plus className="w-4 h-4" />
            Add Password
          </button>
          <button
            onClick={handleSave}
            className="w-full md:w-auto px-3 py-3 bg-white/10 rounded-xl font-bold text-sm flex items-center justify-center gap-2 whitespace-nowrap cursor-pointer"
          >
            <RefreshCw className="w-4 h-4" />
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
        {filteredItems.map((item: SecretItem) => (
          <div key={item._id} className="grid grid-cols-12 items-center rounded-2xl px-6 py-4 bg-white/3 border border-white/5 hover:bg-white/6 hover:border-primary/20 transition-all group animate-in fade-in slide-in-from-bottom-2 duration-300">
            <div className="col-span-4 flex items-center gap-4">
              <div className="w-10 h-10 bg-black/40 rounded-xl flex items-center justify-center border border-white/5 shadow-inner overflow-hidden">
                {item.logo && <img
                  src={item.logo}
                  alt={item.name}
                  width={40}
                  height={40}
                />}
                {!item.logo && <img
                  src={getIconFromWebsite(item.website)}
                  alt={item.name}
                  width={30}
                  height={30}
                />}
              </div>
              <div>
                <h3 className="font-bold text-sm">{item.name}</h3>
                <p className="text-[10px] text-text-vault/40">{item.website}</p>
              </div>
            </div>
            <div className="col-span-3 text-xs text-text-vault/60 font-medium truncate pr-4">
              {item.username}
            </div>
            <div className="col-span-3 pr-4">
              {visiblePasswords[item._id] ? (
                <span className="text-sm font-mono text-white tracking-normal break-all">{item.password}</span>
              ) : (
                <span className="text-lg text-primary/40 tracking-widest font-mono">••••••••••••</span>
              )}
            </div>
            <div className="col-span-2 flex justify-end gap-2">
              <button
                onClick={() => togglePasswordVisibility(item._id)}
                className="p-2 text-text-vault/20 hover:text-primary hover:bg-primary/10 rounded-lg transition-all cursor-pointer"
                title="Toggle Visibility"
              >
                {visiblePasswords[item._id] ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
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
              <button
                onClick={() => setItemToDelete(item)}
                className="p-2 text-text-vault/20 hover:text-error-container hover:bg-error-container/10 rounded-lg transition-all cursor-pointer"
                title="Delete Item"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            </div>
          </div>
        ))}
      </div>

      {isCreating && (
        <CreateSecretModal
          onClose={() => setIsCreating(false)}
          onSave={handleSave}
        />
      )}

      {isEditing && (
        <UpdateSecretModal
          onClose={() => setIsEditing(false)}
          onSave={handleSave}
          existingData={editingItem ? {
            _id: editingItem._id,
            name: editingItem.name,
            website: editingItem.website,
            username: editingItem.username,
            logo: editingItem.logo,
          } : null}
        />
      )}

      {/* <VaultModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSave={handleSave}
        initialData={editingItem ? {
          _id: editingItem?._id || "",
          name: editingItem?.name || "",
          website: editingItem?.website || "",
          username: editingItem?.username || "",
          password: editingItem?.password || "",
          logo: editingItem?.logo || "",
        } : null}
      /> */}

      {itemToDelete && (
        <div className="fixed inset-0 z-100 flex items-center justify-center p-4">
          <div
            className="absolute inset-0 bg-black/60 backdrop-blur-sm animate-in fade-in duration-200"
            onClick={() => setItemToDelete(null)}
          ></div>
          <div className="relative w-full max-w-md bg-background-vault border border-white/10 rounded-[2rem] shadow-2xl overflow-hidden animate-in zoom-in-95 duration-200 pointer-events-auto">
            <div className="p-8 text-center">
              <h2 className="text-2xl font-bold tracking-tight mb-2">Delete Password?</h2>
              <p className="text-text-vault/40 text-sm mb-8">
                Are you sure you want to delete the password for <strong className="text-white">{itemToDelete.name}</strong>? This action cannot be undone.
              </p>
              <div className="flex gap-3">
                <button
                  onClick={() => setItemToDelete(null)}
                  className="flex-1 bg-white/5 hover:bg-white/10 border border-white/5 text-text-vault/60 py-3.5 rounded-xl text-sm font-bold transition-all cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  onClick={() => handleDeleteItem(itemToDelete._id)}
                  disabled={loading}
                  className="flex-1 bg-error-container hover:bg-error-container/60 text-white py-3.5 rounded-xl font-bold text-sm transition-all cursor-pointer shadow-lg shadow-error-container/20 disabled:opacity-50"
                >
                  {loading ? "Deleting..." : "Delete"}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
