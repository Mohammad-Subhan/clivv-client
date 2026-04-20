"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import {
  Laptop,
  Smartphone,
  Watch,
  Radar,
  KeyRound,
  Zap,
  Lock,
  RefreshCw,
  Fingerprint,
  Key,
  CreditCard,
  Search,
  FileEdit,
  Copy,
  EyeOff
} from "lucide-react";

export default function Home() {
  const [activeSection, setActiveSection] = useState("home");

  useEffect(() => {
    const sections = ["home", "features", "testimonials", "download"];
    
    const observerOptions = {
      root: null,
      rootMargin: "-20% 0px -70% 0px",
      threshold: 0
    };

    const observerCallback = (entries: IntersectionObserverEntry[]) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setActiveSection(entry.target.id);
        }
      });
    };

    const observer = new IntersectionObserver(observerCallback, observerOptions);

    sections.forEach((id) => {
      const element = document.getElementById(id);
      if (element) observer.observe(element);
    });

    return () => observer.disconnect();
  }, []);

  const scrollToSection = (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
    e.preventDefault();
    const element = document.getElementById(id);
    if (element) {
      window.scrollTo({
        top: element.offsetTop - 80, // Adjust for fixed header
        behavior: "smooth"
      });
      setActiveSection(id);
    }
  };

  const getNavLinkClass = (id: string) => {
    const isActive = activeSection === id;
    return `transition-all duration-300 ${
      isActive 
        ? "text-primary border-b border-secondary-container pb-1" 
        : "text-text-vault/70 hover:text-primary"
    }`;
  };

  return (
    <div className="min-h-screen">
      {/* SECTION 1: TopNavBar */}
      <nav className="fixed top-4 left-0 right-0 max-w-7xl mx-auto h-[64px] z-50 bg-background-vault/60 backdrop-blur-2xl rounded-xl border border-white/10 shadow-[0_20px_40px_rgba(0,0,0,0.4)]">
        <div className="flex justify-between items-center px-8 max-w-7xl mx-auto w-full h-full">
          <div className="text-2xl font-bold tracking-tighter text-primary flex items-center gap-2">
            Clivv
          </div>
          <div className="hidden md:flex items-center gap-8 font-medium text-sm tracking-tight h-full pt-1">
            <a 
              href="#home" 
              className={getNavLinkClass("home")}
              onClick={(e) => scrollToSection(e, "home")}
            >
              Home
            </a>
            <a 
              href="#features" 
              className={getNavLinkClass("features")}
              onClick={(e) => scrollToSection(e, "features")}
            >
              Features
            </a>
            <a 
              href="#testimonials" 
              className={getNavLinkClass("testimonials")}
              onClick={(e) => scrollToSection(e, "testimonials")}
            >
              Testimonials
            </a>
            <a 
              href="#download" 
              className={getNavLinkClass("download")}
              onClick={(e) => scrollToSection(e, "download")}
            >
              Download
            </a>
          </div>
          <div className="flex items-center gap-4">
            <Link href="/login" className="text-text-vault/70 font-medium text-sm hover:text-primary transition-all duration-300">
              Log In
            </Link>
            <Link href="/register" className="primary-gradient text-on-primary px-6 py-2 rounded-lg font-bold text-sm btn-elegant">
              Get It Free
            </Link>
          </div>
        </div>
      </nav>

      {/* SECTION 2: Hero Section */}
      <section id="home" className="relative pt-40 pb-24 overflow-hidden">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full sentinel-glow pointer-events-none"></div>
        <div className="max-w-7xl mx-auto px-8 grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* Left Column */}
          <div className="z-10">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-lg bg-secondary-container/10 border border-secondary-container/20 text-primary text-xs font-bold tracking-widest uppercase mb-8">
              The Next Generation of Privacy
            </div>
            <h1 className="text-5xl md:text-6xl font-bold tracking-tighter leading-[1.1] mb-8">
              Supercharge Your <span className="text-gradient">Secrets</span> for
              Ultimate Protection
            </h1>
            <p className="text-lg text-text-vault/60 leading-relaxed mb-12 max-w-xl">
              Clivv combines military-grade encryption with a seamless user
              experience. Manage, share, and protect your digital identity across
              all platforms effortlessly.
            </p>
            <div className="flex flex-wrap gap-4 mb-16">
              <Link href="/register" className="primary-gradient text-on-primary rounded-xl font-bold text-lg btn-elegant px-6 py-2.5">
                Try It Free
              </Link>
            </div>
          </div>
          {/* Right Column: 3D Composition */}
          <div className="relative min-h-[500px] flex items-center justify-center">
            <div className="absolute w-[500px] h-[500px] bg-primary/5 rounded-full blur-[100px] -top-20 -right-20"></div>
            <div className="absolute w-[400px] h-[400px] bg-secondary-container/10 rounded-full blur-[100px] -bottom-20 -left-10"></div>
            <div className="absolute top-20 right-0 glass-panel-heavy glass-border-shine p-4 rounded-xl shadow-xl z-30 -translate-y-8 translate-x-4">
              <div className="flex items-center gap-3">
                <div className="w-1.5 h-8 bg-primary rounded-full"></div>
                <div>
                  <p className="text-[9px] font-bold uppercase tracking-wider text-primary">Safety Score</p>
                  <p className="text-sm font-bold">98% Secure</p>
                </div>
              </div>
            </div>
            {/* Main Card */}
            <div className="relative z-20 glass-panel-heavy glass-border-shine p-8 rounded-2xl w-full max-w-md rotate-2">
              <div className="flex justify-between items-center mb-8">
                <h3 className="font-bold text-lg">My Vault</h3>
              </div>
              <div className="space-y-4">
                <div className="flex items-center gap-4 p-3 bg-white/5 rounded-xl border border-white/5">
                  <div className="w-10 h-10 bg-black/40 rounded-lg flex items-center justify-center">
                    <Image
                      alt="Netflix"
                      width={24}
                      height={24}
                      className="w-6"
                      src="/netflix.png"
                    />
                  </div>
                  <div className="flex-1">
                    <p className="text-xs font-bold uppercase tracking-wider text-white/90">Netflix</p>
                    <p className="text-xs text-white/40">••••••••••••</p>
                  </div>
                </div>
                <div className="flex items-center gap-4 p-3 bg-secondary-container/10 border border-secondary-container/20 rounded-xl">
                  <div className="w-10 h-10 bg-secondary-container/20 rounded-lg flex items-center justify-center">
                    <Image
                      alt="GitHub"
                      width={24}
                      height={24}
                      className="w-6"
                      src="/github.png"
                    />
                  </div>
                  <div className="flex-1">
                    <p className="text-xs font-bold uppercase tracking-wider text-white/90">GitHub</p>
                    <p className="text-xs text-white/40">j.doe@clivv.com</p>
                  </div>
                </div>
              </div>
            </div>
            {/* Floating Elements */}
            <div className="absolute bottom-12 left-0 glass-panel-heavy glass-border-shine p-4 rounded-xl shadow-xl z-30 -translate-x-8 -translate-y-4 border-l-4 border-l-orange-500/50">
              <div className="flex items-center gap-3">
                <div>
                  <p className="text-[9px] font-bold uppercase tracking-wider text-orange-500">Alert</p>
                  <p className="text-sm font-bold">1 Data Breach</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 3: Social Proof Bar */}
      <section className="bg-black/20 border-y border-white/5 py-12">
        <div className="max-w-7xl mx-auto px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <div className="text-center">
              <p className="text-3xl font-extrabold text-primary mb-1">2M+</p>
              <p className="text-[10px] uppercase tracking-[0.2em] font-bold text-white/30">
                Active Users
              </p>
            </div>
            <div className="text-center">
              <p className="text-3xl font-extrabold text-secondary mb-1">99.9%</p>
              <p className="text-[10px] uppercase tracking-[0.2em] font-bold text-white/30">
                Uptime SLA
              </p>
            </div>
            <div className="text-center">
              <p className="text-3xl font-extrabold text-secondary-container mb-1">
                AES-256
              </p>
              <p className="text-[10px] uppercase tracking-[0.2em] font-bold text-white/30">
                Encryption
              </p>
            </div>
            <div className="text-center">
              <p className="text-3xl font-extrabold text-white mb-1">4.9</p>
              <p className="text-[10px] uppercase tracking-[0.2em] font-bold text-white/30">
                Store Rating
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 4: Problem/Solution */}
      <section id="why-clivv" className="py-32 bg-background-vault">
        <div className="max-w-7xl mx-auto px-8 grid lg:grid-cols-2 gap-20 items-center">
          <div>
            <h2 className="text-4xl md:text-5xl font-bold mb-8 leading-tight">
              Passwords Suck, <br />
              We Fix That
            </h2>
            <p className="text-lg text-text-vault/50 mb-10 leading-relaxed">
              Recalling complex strings of characters is a chore. Writing them
              down is a risk. Reusing them is a death sentence for your
              security. Clivv eliminates the friction of modern digital life.
            </p>
            <ul className="space-y-6">
              <li className="flex items-start gap-4">
                <div className="mt-1 w-6 h-6 rounded-lg bg-secondary-container/20 flex items-center justify-center shrink-0 border border-secondary-container/30">
                  <Lock className="w-3.5 h-3.5 text-secondary-container" />
                </div>
                <p className="font-medium text-text-vault/80">
                  Zero-knowledge architecture—we can't see your data.
                </p>
              </li>
              <li className="flex items-start gap-4">
                <div className="mt-1 w-6 h-6 rounded-lg bg-secondary-container/20 flex items-center justify-center shrink-0 border border-secondary-container/30">
                  <Zap className="w-3.5 h-3.5 text-secondary-container" />
                </div>
                <p className="font-medium text-text-vault/80">
                  One-click login for millions of sites and apps.
                </p>
              </li>
              <li className="flex items-start gap-4">
                <div className="mt-1 w-6 h-6 rounded-lg bg-secondary-container/20 flex items-center justify-center shrink-0 border border-secondary-container/30">
                  <RefreshCw className="w-3.5 h-3.5 text-secondary-container" />
                </div>
                <p className="font-medium text-text-vault/80">
                  Automatic migration from legacy platforms.
                </p>
              </li>
            </ul>
          </div>
          <div className="glass-panel-heavy glass-border-shine p-1 rounded-2xl overflow-hidden">
            <div className="bg-black/30 rounded-2xl p-12 relative">
              <div className="relative z-10 text-center">
                <h3 className="text-xl font-bold mb-4">Seamless Device Sync</h3>
                <p className="text-white/40 text-sm mb-12">
                  One account, every shield you carry.
                </p>
                <div className="flex justify-center items-center gap-8 relative">
                  {/* Icons */}
                  <div className="grid grid-cols-3 gap-12 relative z-20">
                    <Laptop className="w-12 h-12 text-primary transition-all hover:scale-110" />
                    <Smartphone className="w-12 h-12 text-secondary transition-all hover:scale-110" />
                    <Watch className="w-12 h-12 text-secondary-container transition-all hover:scale-110" />
                  </div>
                  {/* Animation */}
                  <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                    <div className="w-48 h-48 border border-secondary/10 rounded-full animate-[spin_15s_linear_infinite]"></div>
                    <div className="absolute w-32 h-32 border border-secondary/20 rounded-full animate-[spin_10s_linear_infinite_reverse]"></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 5: Feature Bento Grid */}
      <section id="features" className="py-32 bg-background-vault">
        <div className="max-w-7xl mx-auto px-8">
          <div className="mb-20 text-center max-w-2xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              Built for the Digital Fortress
            </h2>
            <p className="text-text-vault/40">
              Every tool you need to stay invisible and invincible online.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Feature Cards */}
            <div className="glass-panel-heavy glass-border-shine p-8 rounded-2xl transition-all group overflow-hidden">
              <div className="w-12 h-12 rounded-xl bg-orange-600/10 border border-orange-600/20 flex items-center justify-center mb-6">
                <Radar className="w-6 h-6 text-orange-600" />
              </div>
              <h3 className="text-lg font-bold mb-3">Dark Web Radar</h3>
              <p className="text-sm text-white/40 mb-8 leading-relaxed">
                We scan the dark web 24/7 for your compromised credentials and
                alert you instantly.
              </p>
              <div className="bg-black/40 p-4 rounded-xl border border-orange-600/20">
                <div className="flex justify-between items-center mb-2">
                  <span className="text-[9px] text-orange-600 font-bold uppercase tracking-wider">
                    Breach Alert
                  </span>
                  <span className="text-[9px] text-white/20">NOW</span>
                </div>
                <p className="text-xs font-mono text-white/60">
                  leak: db_adobe_2024
                </p>
              </div>
            </div>
            <div className="glass-panel-heavy glass-border-shine p-8 rounded-2xl transition-all group overflow-hidden">
              <div className="w-12 h-12 rounded-xl bg-secondary-container/10 border border-secondary-container/20 flex items-center justify-center mb-6">
                <KeyRound className="w-6 h-6 text-secondary-container" />
              </div>
              <h3 className="text-lg font-bold mb-3">Password Generator</h3>
              <p className="text-sm text-white/40 mb-8 leading-relaxed">
                Create unhackable passwords with entropy levels that would take
                supercomputers years to crack.
              </p>
              <div className="flex items-center gap-3">
                <div className="flex-1 bg-white/5 h-1.5 rounded-full overflow-hidden">
                  <div className="bg-secondary-container w-[95%] h-full"></div>
                </div>
                <span className="text-[9px] font-bold text-secondary-container">
                  95% STRENGTH
                </span>
              </div>
            </div>
            <div className="glass-panel-heavy glass-border-shine p-8 rounded-2xl transition-all group overflow-hidden">
              <div className="w-12 h-12 rounded-xl bg-secondary/10 border border-secondary/20 flex items-center justify-center mb-6">
                <Zap className="w-6 h-6 text-secondary" />
              </div>
              <h3 className="text-lg font-bold mb-3">Intelligent Auto-Fill</h3>
              <p className="text-sm text-white/40 mb-8 leading-relaxed">
                No more copy-pasting. Clivv recognizes fields and fills them
                instantly across any browser.
              </p>
              <div className="flex justify-end">
                <div className="bg-secondary/10 px-3 py-1 rounded-lg text-secondary text-[9px] font-bold border border-secondary/20">
                  READY
                </div>
              </div>
            </div>
            <div className="glass-panel-heavy glass-border-shine p-8 rounded-2xl transition-all group overflow-hidden">
              <div className="w-12 h-12 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center mb-6">
                <Lock className="w-6 h-6 text-white/80" />
              </div>
              <h3 className="text-lg font-bold mb-3">End-to-End Encryption</h3>
              <p className="text-sm text-white/40 mb-8 leading-relaxed">
                AES-256 bit encryption ensures that your data never leaves your
                device unencrypted.
              </p>
            </div>
            <div className="glass-panel-heavy glass-border-shine p-8 rounded-2xl transition-all group overflow-hidden">
              <div className="w-12 h-12 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center mb-6">
                <RefreshCw className="w-6 h-6 text-white/80" />
              </div>
              <h3 className="text-lg font-bold mb-3">Cloud-Native Sync</h3>
              <p className="text-sm text-white/40 mb-8 leading-relaxed">
                Real-time synchronization across desktop, mobile, and browser
                extensions without friction.
              </p>
            </div>
            <div className="glass-panel-heavy glass-border-shine p-8 rounded-2xl transition-all group overflow-hidden">
              <div className="w-12 h-12 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center mb-6">
                <Fingerprint className="w-6 h-6 text-white/80" />
              </div>
              <h3 className="text-lg font-bold mb-3">Biometric Lock</h3>
              <p className="text-sm text-white/40 mb-8 leading-relaxed">
                Unlock your entire vault using FaceID, TouchID, or Windows Hello
                for instant access.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 6: Testimonials */}
      <section id="testimonials" className="py-32 bg-background-vault">
        <div className="max-w-7xl mx-auto px-8 overflow-hidden">
          <h2 className="text-center text-3xl md:text-4xl font-bold mb-16">
            Trusted by Security Professionals
          </h2>
          <div className="flex gap-6 overflow-x-auto pb-12 snap-x">
            {/* Testimonial 1 */}
            <div className="min-w-[350px] snap-center glass-panel-heavy glass-border-shine p-8 rounded-2xl">
              <p className="text-white/70 mb-8 leading-relaxed">
                "The only password manager that actually gets the UX right without
                sacrificing a shred of security. Pure gold."
              </p>
              <div className="flex items-center gap-4">
                <img
                  alt="Avatar"
                  className="w-12 h-12 rounded-lg border border-white/10"
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuAQi7ca98B0l7D76p_XwyKldcqgtMDPofIQMhlS4bmksH-Sa4DO2_8jeICvn-xMQaYmW8CDLYW-JKIEYZqgzThcvRyUcSZ4U_l1osICXlBIjuyUOR1nCGUBMZ3orf8_itbjUR057ihfcopaVfMsy221t9P3X2ra6yuTx4oMCE4VkYbYiTs3Xmk5gnLXh8iwShq3YMhNdzuwfPFxW_jvyW_urtALuQY8lNLoVsw7THQaWAVgIPBp6on0y9EdzooW57tFCiVfD8mTUg4"
                />
                <div>
                  <p className="font-bold text-sm">Julian Draxler</p>
                  <p className="text-[9px] text-white/30 uppercase tracking-widest font-bold">
                    CTO @ NexTech
                  </p>
                </div>
              </div>
            </div>
            {/* Testimonial 2 */}
            <div className="min-w-[350px] snap-center glass-panel-heavy glass-border-shine p-8 rounded-2xl">
              <p className="text-white/70 mb-8 leading-relaxed">
                "I've tried them all—1Pass, LastPass, Bitwarden. Clivv is in a
                league of its own for speed and design."
              </p>
              <div className="flex items-center gap-4">
                <img
                  alt="Avatar"
                  className="w-12 h-12 rounded-lg border border-white/10"
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuDwZjVig-T3UEeL6Qr8xpsFH30JDMr8idnPnzyqR4CSvxj9p0mR92xDz1tLwLfcCJYdtO4MaFmc33TzlecWOZiGToZoralI0IC7UrBM_Rc3ZF1KvdJlrJLGhk49sQVLZwKLWHGkcg6ttgs9Nqki5niaqo0Z0ZRBBMcKJ-NyqFVJ5KofAVK8-Tb-Cil8IbgtkFl9vaXfaVRjCH23YlBpvHLh43kCbT_ssT6ghEUBAfjB8Kv4-teh9Bf_gon96bDUmFmWc6vsjYruj1Y"
                />
                <div>
                  <p className="font-bold text-sm">Sarah Miller</p>
                  <p className="text-[9px] text-white/30 uppercase tracking-widest font-bold">
                    Cyber Analyst
                  </p>
                </div>
              </div>
            </div>
            {/* Testimonial 3 */}
            <div className="min-w-[350px] snap-center glass-panel-heavy glass-border-shine p-8 rounded-2xl">
              <p className="text-white/70 mb-8 leading-relaxed">
                "The migration was seamless. I moved 400+ passwords in under 2
                minutes. Outstanding."
              </p>
              <div className="flex items-center gap-4">
                <img
                  alt="Avatar"
                  className="w-12 h-12 rounded-lg border border-white/10"
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuDKwqWhnn7OyE87XWFmGzI3tpIHBe40Vax_Yu16O6t8o8SWJliuomKkjiLMQV59q_Spbb6onkBuqMSgoR8Dvx1MqNj97PvNEeXP9n68m-0shKZyYW-dXmpUWQZrQbgXUbSJa8n6ySECqMawqeldkRisTYg3Z2UI_dj194wN7UA40Mn3yKTstAuv_O2Uhtexf_ChEnxlTe_e2UpY2I81ueNg1Uix3lZUHuR_PPmgI7nPy8kFbGUoXZ1cMaYKFn2mATg0Ds1NemuR31Q"
                />
                <div>
                  <p className="font-bold text-sm">Alex Kenta</p>
                  <p className="text-[9px] text-white/30 uppercase tracking-widest font-bold">
                    DevOps Lead
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 7: Download / Platform */}
      <section id="download" className="py-32 bg-background-vault">
        <div className="max-w-7xl mx-auto px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-8">
            Available on Every Shield You Carry
          </h2>
          <div className="flex justify-center gap-8 mb-16 border-b border-white/5">
            <button className="pb-4 px-4 text-white/30 hover:text-white transition-all text-sm">
              Web
            </button>
            <button className="pb-4 px-4 text-white/30 hover:text-white transition-all text-sm">
              Android
            </button>
          </div>
          {/* macOS App Mockup */}
          <div className="relative max-w-5xl mx-auto glass-panel-heavy glass-border-shine rounded-2xl overflow-hidden shadow-2xl text-left">
            {/* Window Header */}
            <div className="bg-black/40 px-4 py-3 flex items-center justify-between border-b border-white/5">
              <div className="flex gap-1.5">
                <div className="w-3 h-3 rounded-full bg-red-500/30"></div>
                <div className="w-3 h-3 rounded-full bg-yellow-500/30"></div>
                <div className="w-3 h-3 rounded-full bg-green-500/30"></div>
              </div>
              <div className="text-[9px] font-bold text-white/20 tracking-[0.2em] uppercase">
                Clivv Sentinel — v2.4.0
              </div>
              <div className="w-12"></div>
            </div>
            {/* App Body */}
            <div className="flex h-[500px]">
              {/* Sidebar */}
              <div className="w-48 bg-black/10 border-r border-white/5 p-4 space-y-6">
                <div>
                  <p className="text-[9px] font-bold text-white/20 uppercase mb-4 px-2 tracking-widest">
                    Favorites
                  </p>
                  <div className="space-y-1">
                    <div className="flex items-center gap-2 p-2 bg-secondary-container/10 text-primary rounded-lg">
                      <Key className="w-4 h-4" />
                      <span className="text-xs">Passwords</span>
                    </div>
                    <div className="flex items-center gap-2 p-2 text-text-vault/40 rounded-lg hover:bg-white/5">
                      <CreditCard className="w-4 h-4" />
                      <span className="text-xs">Payments</span>
                    </div>
                  </div>
                </div>
              </div>
              {/* List Area */}
              <div className="w-64 border-r border-white/5 p-0 overflow-y-auto">
                <div className="p-4 border-b border-white/5 flex items-center gap-2">
                  <Search className="w-4 h-4 text-white/20" />
                  <span className="text-xs text-white/20">Quick search...</span>
                </div>
                <div className="divide-y divide-white/5">
                  <div className="p-4 hover:bg-white/5 transition-all cursor-pointer">
                    <p className="text-xs font-bold text-white/90">
                      Adobe Creative
                    </p>
                    <p className="text-[10px] text-white/30">
                      m.ross@studio.com
                    </p>
                  </div>
                  <div className="p-4 bg-secondary-container/5 border-l-2 border-secondary-container">
                    <p className="text-xs font-bold text-white/90">
                      Airtable HQ
                    </p>
                    <p className="text-[10px] text-secondary-container/70">
                      security_admin
                    </p>
                  </div>
                  <div className="p-4 hover:bg-white/5 transition-all">
                    <p className="text-xs font-bold text-white/90">
                      Binance Pro
                    </p>
                    <p className="text-[10px] text-white/30">crypto_ops</p>
                  </div>
                </div>
              </div>
              {/* Detail Panel */}
              <div className="flex-1 p-8 bg-black/5">
                <div className="flex justify-between items-start mb-8">
                  <div>
                    <h4 className="text-xl font-bold mb-1">Airtable HQ</h4>
                    <p className="text-xs text-secondary">
                      https://airtable.com
                    </p>
                  </div>
                  <button className="bg-white/5 p-2 rounded-lg border border-white/10 hover:bg-white/10 transition-all">
                    <FileEdit className="w-4 h-4" />
                  </button>
                </div>
                <div className="space-y-6 max-w-sm">
                  <div>
                    <label className="block text-[9px] font-bold text-white/20 uppercase mb-2 tracking-widest">
                      Username
                    </label>
                    <div className="flex justify-between items-center bg-black/30 p-3 rounded-lg border border-white/5">
                      <span className="text-xs">security_admin</span>
                      <Copy className="w-3.5 h-3.5 text-white/20 hover:text-white cursor-pointer" />
                    </div>
                  </div>
                  <div>
                    <label className="block text-[9px] font-bold text-white/20 uppercase mb-2 tracking-widest">
                      Password
                    </label>
                    <div className="flex justify-between items-center bg-black/30 p-3 rounded-lg border border-white/5">
                      <span className="text-xs">••••••••••••••••</span>
                      <EyeOff className="w-3.5 h-3.5 text-white/20 hover:text-white cursor-pointer" />
                    </div>
                  </div>
                  <div className="p-4 bg-orange-500/5 border border-orange-500/10 rounded-xl">
                    <div className="flex items-center gap-2 mb-2">
                      <span className="text-[10px] font-bold text-orange-500 uppercase tracking-widest">
                        Weak Integrity
                      </span>
                    </div>
                    <p className="text-[10px] text-white/40 leading-relaxed">
                      This password has been flagged in a 2024 breach. We
                      recommend an immediate rotate.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <button className="mt-12 primary-gradient text-on-primary px-10 py-4 rounded-xl font-bold text-lg btn-elegant">
            Download for Android
          </button>
        </div>
      </section>

      {/* SECTION 8: Final CTA Banner */}
      <section className="py-24 px-8">
        <div className="max-w-7xl mx-auto">
          <div className="relative overflow-hidden rounded-[2.5rem] p-16 text-center bg-[#11111A] border border-white/5">
            <div className="absolute inset-0 primary-gradient opacity-10 blur-[120px]"></div>
            <div className="relative z-10">
              <h2 className="text-4xl md:text-5xl font-bold mb-8 tracking-tighter">
                Ready to Own Your Security?
              </h2>
              <p className="text-lg text-white/40 mb-12 max-w-2xl mx-auto leading-relaxed">
                Join 2 million users who have stopped worrying about their
                passwords and started owning their digital freedom.
              </p>
              <div className="flex flex-wrap justify-center gap-4">
                <Link href="/register" className="primary-gradient text-on-primary px-10 py-4 rounded-xl font-bold text-lg btn-elegant">
                  Get Started Now
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer id="footer" className="w-full py-12 border-t border-white/5 bg-background-vault">
        <div className="flex flex-col md:flex-row justify-between items-center px-8 max-w-7xl mx-auto w-full gap-8">
          <div className="text-xl font-bold text-primary flex items-center gap-2">
            Clivv
          </div>
          <div className="flex flex-wrap justify-center gap-8 text-[10px] uppercase tracking-[0.2em] font-bold">
            <a className="text-white/30 hover:text-secondary-container transition-all" href="#">
              Privacy Policy
            </a>
            <a className="text-white/30 hover:text-secondary-container transition-all" href="#">
              Terms
            </a>
            <a className="text-white/30 hover:text-secondary-container transition-all" href="#">
              Security
            </a>
            <a className="text-white/30 hover:text-secondary-container transition-all" href="#">
              Contact
            </a>
          </div>
          <div className="text-[10px] text-white/20 uppercase tracking-widest font-bold">
            © 2024 Clivv Sentinel Protocol.
          </div>
        </div>
      </footer>
    </div>
  );
}
