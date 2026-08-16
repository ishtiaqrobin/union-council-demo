"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Navbar } from "@/components/Navbar";
import { CERTIFICATE_MENU_ITEMS } from "@/data/dummyCertificates";
import { 
  FileText, 
  Search, 
  ArrowRight, 
  Printer, 
  PenTool, 
  CheckCircle2, 
  ShieldCheck, 
  Users, 
  UserCheck, 
  UserCheck2, 
  Briefcase, 
  Award, 
  Banknote, 
  MapPinOff, 
  HeartHandshake, 
  FileCheck,
  Sparkles
} from "lucide-react";

const ICON_MAP: Record<string, React.ReactNode> = {
  UserCheck: <UserCheck className="w-6 h-6 text-emerald-400" />,
  Users: <Users className="w-6 h-6 text-blue-400" />,
  UserCheck2: <UserCheck2 className="w-6 h-6 text-indigo-400" />,
  ShieldCheck: <ShieldCheck className="w-6 h-6 text-teal-400" />,
  Home: <CheckCircle2 className="w-6 h-6 text-purple-400" />,
  FileCheck: <FileCheck className="w-6 h-6 text-rose-400" />,
  HeartHandshake: <HeartHandshake className="w-6 h-6 text-amber-400" />,
  Briefcase: <Briefcase className="w-6 h-6 text-sky-400" />,
  Award: <Award className="w-6 h-6 text-slate-300" />,
  Banknote: <Banknote className="w-6 h-6 text-emerald-300" />,
  MapPinOff: <MapPinOff className="w-6 h-6 text-cyan-400" />
};

export default function HomePage() {
  const [searchQuery, setSearchQuery] = useState("");

  const filteredItems = CERTIFICATE_MENU_ITEMS.filter((item) =>
    item.titleBn.toLowerCase().includes(searchQuery.toLowerCase()) ||
    item.titleEn.toLowerCase().includes(searchQuery.toLowerCase()) ||
    item.slug.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="min-h-screen flex flex-col bg-slate-950 font-siliguri text-slate-100">
      {/* Top Navbar */}
      <Navbar />

      {/* Main Content */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 py-8 flex flex-col gap-8">
        
        {/* Hero Banner Section */}
        <section className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-slate-900 via-slate-900 to-slate-800 border border-slate-800 p-8 sm:p-12 shadow-2xl">
          <div className="absolute top-0 right-0 -mt-12 -mr-12 w-96 h-96 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute bottom-0 left-1/3 -mb-12 w-80 h-80 bg-blue-500/10 rounded-full blur-3xl pointer-events-none" />

          <div className="relative z-10 flex flex-col items-start gap-5 max-w-3xl">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs font-bold tracking-wide">
              <Sparkles className="w-3.5 h-3.5 text-amber-400" />
              ডিজিটাল ইউনিয়ন পরিষদ অফিস ব্যবস্থাপনা সিস্টেম
            </div>

            <h1 className="text-3xl sm:text-5xl font-black text-white leading-tight tracking-tight">
              ই-সনদ লাইভ এডিটর ও <br className="hidden sm:inline" />
              <span className="bg-gradient-to-r from-emerald-400 via-teal-300 to-blue-400 bg-clip-text text-transparent">
                প্রিন্ট ডিসাইন টেম্পলেট
              </span>
            </h1>

            <p className="text-slate-300 text-base sm:text-lg leading-relaxed">
              ইউনিয়ন পরিষদের সকল সনদপত্রের লাইভ প্রিভিউ, ফরমের তথ্য পরিবর্তন ও ১:১ পিক্সেল-পারফেক্ট A4 Landscape প্রিন্ট নেওয়ার আধুনিক প্ল্যাটফর্ম। নিচে আপনার কাঙ্ক্ষিত সনদের ফাইলটি নির্বাচন করুন।
            </p>

            {/* Quick Stats Grid */}
            <div className="grid grid-cols-3 gap-4 pt-4 border-t border-slate-800/80 w-full max-w-lg">
              <div className="flex flex-col">
                <span className="text-2xl font-bold text-emerald-400">১১+</span>
                <span className="text-xs text-slate-400">সনদ টেম্পলেট</span>
              </div>
              <div className="flex flex-col">
                <span className="text-2xl font-bold text-blue-400">১:১</span>
                <span className="text-xs text-slate-400">A4 Landscape</span>
              </div>
              <div className="flex flex-col">
                <span className="text-2xl font-bold text-amber-400">১০০%</span>
                <span className="text-xs text-slate-400">লাইভ ডাটা সিঙ্ক</span>
              </div>
            </div>
          </div>
        </section>

        {/* Search & Filter Bar */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 bg-slate-900/90 border border-slate-800 p-4 rounded-2xl">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-xl bg-emerald-500/10 text-emerald-400">
              <FileText className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-lg font-bold text-white">সব সনদের টেম্পলেট</h2>
              <p className="text-xs text-slate-400">যেকোনো সনদে ক্লিক করে লাইভ এডিটর চালনা করুন</p>
            </div>
          </div>

          <div className="relative w-full sm:w-80">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="সনদের নাম লিখে খুঁজুন..."
              className="w-full pl-10 pr-4 py-2 bg-slate-950 border border-slate-700/80 rounded-xl text-sm text-slate-100 placeholder-slate-500 focus:outline-none focus:border-emerald-500 transition-colors"
            />
          </div>
        </div>

        {/* Certificates Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredItems.length > 0 ? (
            filteredItems.map((item) => (
              <div
                key={item.slug}
                className="group relative bg-slate-900/80 hover:bg-slate-900 border border-slate-800 hover:border-emerald-500/50 rounded-2xl p-6 transition-all duration-300 hover:shadow-xl hover:shadow-emerald-500/10 flex flex-col justify-between"
              >
                <div className="flex flex-col gap-4">
                  {/* Top Row: Icon & Badge */}
                  <div className="flex items-center justify-between">
                    <div className="p-3 rounded-2xl bg-slate-800 border border-slate-700/80 group-hover:border-emerald-500/40 group-hover:bg-slate-800/90 transition-colors">
                      {ICON_MAP[item.iconName] || <FileText className="w-6 h-6 text-slate-300" />}
                    </div>

                    <span className="text-[11px] font-bold px-2.5 py-1 rounded-full bg-slate-800 text-slate-300 border border-slate-700 font-mono">
                      {item.slug}.pdf
                    </span>
                  </div>

                  {/* Title & Description */}
                  <div>
                    <h3 className="text-xl font-bold text-white group-hover:text-emerald-300 transition-colors">
                      {item.titleBn}
                    </h3>
                    <span className="text-xs text-slate-400 font-sans block mb-2">
                      {item.titleEn}
                    </span>
                    <p className="text-sm text-slate-300 line-clamp-2 leading-relaxed">
                      {item.description}
                    </p>
                  </div>
                </div>

                {/* Card Action Link */}
                <div className="mt-6 pt-4 border-t border-slate-800/80 flex items-center justify-between">
                  <div className="flex items-center gap-2 text-xs text-slate-400">
                    <PenTool className="w-3.5 h-3.5 text-emerald-400" />
                    <span>লাইভ এডিট</span>
                    <Printer className="w-3.5 h-3.5 text-blue-400 ml-1" />
                    <span>প্রিন্ট</span>
                  </div>

                  <Link
                    href={`/certificates/${item.slug}`}
                    className="inline-flex items-center gap-1.5 text-xs font-bold text-emerald-400 hover:text-emerald-300 group-hover:translate-x-1 transition-transform"
                  >
                    টেম্পলেট ওপেন <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </div>
            ))
          ) : (
            <div className="col-span-full p-12 text-center text-slate-400 text-base font-siliguri bg-slate-900 border border-slate-800 rounded-2xl">
              কোনো সনদপত্র খুঁজে পাওয়া যায়নি
            </div>
          )}
        </div>

      </main>

      {/* Footer */}
      <footer className="no-print border-t border-slate-800 py-6 text-center text-xs text-slate-500 font-siliguri">
        ডিজিটাল ইউনিয়ন পরিষদ অফিস ব্যবস্থাপনা সিস্টেম © ২০২৬। সর্বস্বত্ব সংরক্ষিত।
      </footer>
    </div>
  );
}
