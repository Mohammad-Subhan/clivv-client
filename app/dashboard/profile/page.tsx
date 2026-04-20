"use client";

import { UserCircle, Mail, MapPin, Calendar, Camera, ShieldCheck } from "lucide-react";

export default function ProfilePage() {
  return (
    <>
      <div className="mb-10">
        <h2 className="text-4xl font-bold tracking-tight mb-2">Profile</h2>
        <p className="text-text-vault/40 text-sm max-w-md">Your digital identity information across the Clivv network.</p>
      </div>

      <div className="max-w-4xl">
        <div className="relative mb-12">
          <div className="h-48 w-full primary-gradient rounded-3xl opacity-20"></div>
          <div className="absolute -bottom-6 left-8 flex items-end gap-6">
            <div className="relative">
              <div className="w-32 h-32 rounded-[2.5rem] overflow-hidden border-4 border-background-vault ring-2 ring-primary/20 bg-black">
                <img 
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuBxyVXinPRaOE_jozZ3jlyonJqB0isQgbinu_PjAM4BbAYEUj0r1yCbtkqRQGJ9aoPzJyJyi0jEUu4wWuWd41t4mepVLDDlDajiWrs9Q5naKzeKnZjqlgqFsZMNPs-sPjGCxbrtfKiIRgTB91E1rO1eiaTCAMAAvPJkiUit_GaYrbYrP6TzSzxomW0hNYnTeb13oy6FWj5-6lEaltfsl9nC-tQQnQ5xcAcVNaUGNyiC6lqWzJmTpiqa_QLO1_lgHxk44qfSjKWnFIQ" 
                  alt="Avatar" 
                  className="w-full h-full object-cover"
                />
              </div>
              <button className="absolute bottom-1 right-1 p-2 bg-primary text-on-primary rounded-xl shadow-xl hover:scale-110 transition-all">
                <Camera className="w-4 h-4" />
              </button>
            </div>
            <div className="pb-2">
              <div className="flex items-center gap-2">
                <h3 className="text-2xl font-bold">Alex Volkov</h3>
                <ShieldCheck className="w-5 h-5 text-primary" />
              </div>
              <p className="text-text-vault/40 text-sm font-medium">Pro Sentinel Plan</p>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-16">
          <div className="space-y-6">
            <div>
              <label className="text-[10px] uppercase font-bold tracking-widest text-text-vault/20 mb-2 block ml-1">Email Address</label>
              <div className="flex items-center gap-3 p-4 rounded-2xl bg-white/5 border border-white/5">
                <Mail className="w-4 h-4 text-primary" />
                <span className="text-sm font-medium">alex.v@protonmail.com</span>
              </div>
            </div>
            <div>
              <label className="text-[10px] uppercase font-bold tracking-widest text-text-vault/20 mb-2 block ml-1">Location</label>
              <div className="flex items-center gap-3 p-4 rounded-2xl bg-white/5 border border-white/5">
                <MapPin className="w-4 h-4 text-text-vault/30" />
                <span className="text-sm font-medium">San Francisco, CA</span>
              </div>
            </div>
          </div>
          <div className="space-y-6">
            <div>
              <label className="text-[10px] uppercase font-bold tracking-widest text-text-vault/20 mb-2 block ml-1">Member Since</label>
              <div className="flex items-center gap-3 p-4 rounded-2xl bg-white/5 border border-white/5">
                <Calendar className="w-4 h-4 text-text-vault/30" />
                <span className="text-sm font-medium">October 2023</span>
              </div>
            </div>
            <button className="w-full mt-4 bg-white/5 hover:bg-white/10 border border-white/5 py-4 rounded-2xl text-sm font-bold transition-all">
              Update Profile Information
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
