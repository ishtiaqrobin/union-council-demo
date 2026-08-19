"use client";

import React, { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { CERTIFICATE_MENU_ITEMS } from "@/data/dummyCertificates";
import { ThemeToggle } from "@/components/layout/ThemeToggle";
import {
  FileText,
  Search,
  ChevronDown,
  Printer,
  Edit3,
  Home,
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

// Icon mapping helper
const ICON_MAP: Record<string, React.ReactNode> = {
  UserCheck: <UserCheck className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />,
  Users: <Users className="w-4 h-4 text-blue-600 dark:text-blue-400" />,
  UserCheck2: <UserCheck2 className="w-4 h-4 text-indigo-600 dark:text-indigo-400" />,
  ShieldCheck: <ShieldCheck className="w-4 h-4 text-teal-600 dark:text-teal-400" />,
  Home: <Home className="w-4 h-4 text-purple-600 dark:text-purple-400" />,
  FileCheck: <FileCheck className="w-4 h-4 text-rose-600 dark:text-rose-400" />,
  HeartHandshake: <HeartHandshake className="w-4 h-4 text-amber-600 dark:text-amber-400" />,
  Briefcase: <Briefcase className="w-4 h-4 text-sky-600 dark:text-sky-400" />,
  Award: <Award className="w-4 h-4 text-slate-600 dark:text-slate-300" />,
  Banknote: <Banknote className="w-4 h-4 text-emerald-600 dark:text-emerald-300" />,
  MapPinOff: <MapPinOff className="w-4 h-4 text-cyan-600 dark:text-cyan-400" />,
  FileText: <FileText className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
};

interface NavbarProps {
  onToggleDrawer?: () => void;
  isDrawerOpen?: boolean;
}

export function Navbar({ onToggleDrawer, isDrawerOpen }: NavbarProps) {
  const pathname = usePathname();
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  const filteredMenuItems = CERTIFICATE_MENU_ITEMS.filter((item) =>
    item.titleBn.toLowerCase().includes(searchQuery.toLowerCase()) ||
    item.titleEn.toLowerCase().includes(searchQuery.toLowerCase()) ||
    item.slug.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const activeItem = CERTIFICATE_MENU_ITEMS.find(
    (item) => pathname === `/certificates/${item.slug}`
  );

  const handlePrint = () => {
    if (typeof window !== "undefined") {
      window.print();
    }
  };

  return (
    <nav className="no-print sticky top-0 z-[1000] bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800 text-slate-900 dark:text-white shadow-md dark:shadow-xl transition-colors duration-200">
      <div className={`mx-auto px-4 sm:px-6 py-2.5 flex items-center justify-between gap-4 ${activeItem ? "max-w-full" : "max-w-7xl"}`}>

        {/* Left: Brand / Logo */}
        <div className="flex items-center gap-4">
          <Link
            href="/"
            className="flex items-center gap-3 group transition-transform duration-200"
          >
            <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-emerald-600 via-teal-500 to-blue-600 p-0.5 shadow-md group-hover:shadow-emerald-500/20">
              <div className="w-full h-full bg-white dark:bg-slate-900 rounded-full flex items-center justify-center">
                <ShieldCheck className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />
              </div>
            </div>
            <div className="flex flex-col">
              <span className="text-xs font-semibold text-emerald-600 dark:text-emerald-400 tracking-wider font-siliguri flex items-center gap-1">
                <Sparkles className="w-3 h-3 text-amber-500 dark:text-amber-400" /> ই-সনদ প্ল্যাটফর্ম
              </span>
              <span className="text-base font-bold text-slate-900 dark:text-slate-100 font-siliguri leading-tight">
                ডিজিটাল ইউনিয়ন পরিষদ সেবা
              </span>
            </div>
          </Link>

          <div className="hidden lg:block h-6 w-[1px] bg-slate-200 dark:bg-slate-800" />

          {/* Quick Home Link */}
          <Link
            href="/"
            className={`hidden md:flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold font-siliguri transition-colors ${pathname === "/"
              ? "bg-emerald-500/10 dark:bg-emerald-600/20 text-emerald-700 dark:text-emerald-400 border border-emerald-500/30"
              : "text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 border border-slate-200 dark:border-slate-800"
              }`}
          >
            <Home className="w-4 h-4" />
            ড্যাশবোর্ড
          </Link>
        </div>

        {/* Center: Certificate Selector Menu Dropdown */}
        <div className="relative flex-1 max-w-xl">
          <button
            onClick={() => setDropdownOpen(!dropdownOpen)}
            className="w-full flex items-center justify-between gap-2 px-4 py-2 rounded-xl bg-slate-100 dark:bg-slate-800/90 border border-slate-300 dark:border-slate-700/80 text-slate-800 dark:text-slate-200 hover:bg-slate-200 dark:hover:bg-slate-800 hover:border-slate-400 dark:hover:border-slate-600 transition-all text-sm font-medium font-siliguri shadow-inner"
          >
            <div className="flex items-center gap-2.5 truncate">
              <FileText className="w-4 h-4 text-emerald-600 dark:text-emerald-400 shrink-0" />
              <span className="text-slate-500 dark:text-slate-400 text-xs hidden sm:inline">সনদ নির্বাচন:</span>
              <span className="font-semibold text-emerald-700 dark:text-emerald-300 truncate">
                {activeItem ? activeItem.titleBn : "সব সনদের তালিকা দেখুন"}
              </span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-[11px] bg-emerald-500/15 text-emerald-700 dark:text-emerald-300 px-3 py-0.5 rounded-full font-bold">
                {CERTIFICATE_MENU_ITEMS.length} টি টেম্পলেট
              </span>
              <ChevronDown
                className={`w-4 h-4 text-slate-500 dark:text-slate-400 transition-transform duration-200 ${dropdownOpen ? "rotate-180" : ""
                  }`}
              />
            </div>
          </button>

          {/* Dropdown Menu Modal */}
          {dropdownOpen && (
            <>
              {/* Backdrop */}
              <div
                className="fixed inset-0 z-[1100]"
                onClick={() => setDropdownOpen(false)}
              />

              <div className="absolute left-0 right-0 top-full mt-2 z-[1200] bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-2xl shadow-2xl overflow-hidden backdrop-blur-xl animate-in fade-in slide-in-from-top-2 duration-200">
                {/* Search Bar inside Menu */}
                <div className="p-3 bg-slate-50 dark:bg-slate-950/80 border-b border-slate-200 dark:border-slate-800 flex items-center gap-2">
                  <Search className="w-4 h-4 text-slate-400" />
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="সনদের নাম লিখে খুঁজুন..."
                    className="w-full bg-transparent text-sm text-slate-900 dark:text-slate-100 placeholder-slate-400 dark:placeholder-slate-500 focus:outline-none font-siliguri"
                    autoFocus
                  />
                  {searchQuery && (
                    <button
                      onClick={() => setSearchQuery("")}
                      className="text-xs text-slate-400 hover:text-slate-900 dark:hover:text-white px-2 py-1"
                    >
                      মুছুন
                    </button>
                  )}
                </div>

                {/* Menu List */}
                <div className="max-h-[380px] overflow-y-auto p-2 grid grid-cols-1 md:grid-cols-2 gap-1">
                  {filteredMenuItems.length > 0 ? (
                    filteredMenuItems.map((item) => {
                      const isSelected = pathname === `/certificates/${item.slug}`;
                      return (
                        <Link
                          key={item.slug}
                          href={`/certificates/${item.slug}`}
                          onClick={() => setDropdownOpen(false)}
                          className={`flex items-start gap-3 p-2.5 rounded-xl transition-all font-siliguri group ${isSelected
                            ? "bg-emerald-500/10 dark:bg-emerald-600/20 border border-emerald-500/40 text-emerald-700 dark:text-emerald-300 shadow-sm"
                            : "hover:bg-slate-100 dark:hover:bg-slate-800/80 text-slate-800 dark:text-slate-200 hover:text-slate-900 dark:hover:text-white"
                            }`}
                        >
                          <div className="p-2 rounded-lg bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700/60 group-hover:border-slate-300 dark:group-hover:border-slate-600 shrink-0 mt-0.5">
                            {ICON_MAP[item.iconName] || <FileText className="w-4 h-4 text-slate-500 dark:text-slate-400" />}
                          </div>
                          <div className="flex flex-col min-w-0">
                            <div className="flex items-center justify-between gap-2">
                              <span className="font-bold text-sm truncate">
                                {item.titleBn}
                              </span>
                              {isSelected && (
                                <span className="text-[10px] font-bold bg-emerald-500 text-white dark:text-slate-950 px-1.5 py-0.2 rounded">
                                  সক্রিয়
                                </span>
                              )}
                            </div>
                            <span className="text-[11.5px] text-slate-500 dark:text-slate-400 truncate">
                              {item.titleEn}
                            </span>
                          </div>
                        </Link>
                      );
                    })
                  ) : (
                    <div className="col-span-2 p-6 text-center text-slate-500 dark:text-slate-400 text-sm font-siliguri">
                      কোনো সনদ খুঁজে পাওয়া যায়নি
                    </div>
                  )}
                </div>

                {/* Footer status */}
                <div className="px-4 py-2 bg-slate-50 dark:bg-slate-950 text-xs text-slate-500 dark:text-slate-400 font-siliguri flex justify-between items-center border-t border-slate-200 dark:border-slate-800">
                  <span>সব টেম্পলেটে লাইভ এডিটর যুক্ত রয়েছে</span>
                  <span className="text-emerald-600 dark:text-emerald-400 font-medium">100% Dynamic</span>
                </div>
              </div>
            </>
          )}
        </div>

        {/* Right: Actions */}
        <div className="flex items-center gap-2">
          {/* Theme Switcher Toggle */}
          <ThemeToggle />

          {/* Edit Drawer Toggle Button */}
          {pathname.startsWith("/certificates/") && onToggleDrawer && (
            <button
              onClick={onToggleDrawer}
              className={`flex items-center gap-2 px-3.5 py-2 rounded-lg text-xs font-bold font-siliguri transition-all shadow-md ${isDrawerOpen
                ? "bg-slate-200 dark:bg-slate-700 text-slate-800 dark:text-slate-100 hover:bg-slate-300 dark:hover:bg-slate-600 border border-slate-300 dark:border-slate-600"
                : "bg-blue-600 text-white hover:bg-blue-500 shadow-blue-600/20"
                }`}
            >
              <Edit3 className="w-4 h-4" />
              <span className="hidden sm:inline">
                {isDrawerOpen ? "ফরম বন্ধ করুন" : "তথ্য পরিবর্তন করুন"}
              </span>
            </button>
          )}

          {/* Quick Print Button */}
          {pathname.startsWith("/certificates/") && (
            <button
              onClick={handlePrint}
              className="flex items-center gap-2 px-4 py-2 rounded-lg text-xs font-bold font-siliguri bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-600 hover:to-teal-700 text-white shadow-lg shadow-emerald-500/20 transition-all"
            >
              <Printer className="w-4 h-4" />
              <span className="hidden sm:inline">সনদ প্রিন্ট করুন (A4)</span>
            </button>
          )}
        </div>

      </div>
    </nav>
  );
}
