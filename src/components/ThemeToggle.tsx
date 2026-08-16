"use client";

import React, { useState } from "react";
import { useTheme } from "@/context/ThemeContext";
import { Sun, Moon, Laptop, ChevronDown } from "lucide-react";

export function ThemeToggle() {
  const { theme, setTheme, resolvedTheme } = useTheme();
  const [open, setOpen] = useState(false);

  const themeOptions = [
    { key: "light", labelBn: "লাইট (Light)", icon: <Sun className="w-4 h-4 text-amber-500" /> },
    { key: "dark", labelBn: "ডার্ক (Dark)", icon: <Moon className="w-4 h-4 text-indigo-400" /> },
    { key: "system", labelBn: "সিস্টেম (System)", icon: <Laptop className="w-4 h-4 text-emerald-500 dark:text-emerald-400" /> }
  ] as const;

  return (
    <div className="relative">
      <button
        onClick={() => setOpen(!open)}
        className="flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-semibold font-siliguri bg-slate-100 dark:bg-slate-800 border border-slate-300 dark:border-slate-700/80 text-slate-800 dark:text-slate-200 hover:bg-slate-200 dark:hover:bg-slate-700/80 transition-all shadow-sm"
        title="থিম পরিবর্তন করুন"
      >
        {resolvedTheme === "dark" ? (
          <Moon className="w-4 h-4 text-indigo-400" />
        ) : (
          <Sun className="w-4 h-4 text-amber-500" />
        )}
        <span className="hidden md:inline font-bold">
          {theme === "dark" ? "ডার্ক" : theme === "light" ? "লাইট" : "সিস্টেম"}
        </span>
        <ChevronDown className={`w-3.5 h-3.5 text-slate-500 dark:text-slate-400 transition-transform duration-200 ${open ? "rotate-180" : ""}`} />
      </button>

      {open && (
        <>
          <div
            className="fixed inset-0 z-[1100]"
            onClick={() => setOpen(false)}
          />
          <div className="absolute right-0 top-full mt-2 w-44 z-[1200] bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-2xl shadow-2xl overflow-hidden p-1.5 font-siliguri backdrop-blur-xl animate-in fade-in slide-in-from-top-2 duration-150">
            {themeOptions.map((opt) => (
              <button
                key={opt.key}
                onClick={() => {
                  setTheme(opt.key);
                  setOpen(false);
                }}
                className={`w-full flex items-center justify-between px-3 py-2 rounded-xl text-xs font-semibold transition-all ${theme === opt.key
                  ? "bg-emerald-500/15 dark:bg-emerald-600/20 text-emerald-700 dark:text-emerald-300 border border-emerald-500/30"
                  : "text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800/90 hover:text-slate-900 dark:hover:text-white"
                  }`}
              >
                <div className="flex items-center gap-2">
                  {opt.icon}
                  <span>{opt.labelBn}</span>
                </div>
                {theme === opt.key && (
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 dark:bg-emerald-400" />
                )}
              </button>
            ))}
          </div>
        </>
      )}
    </div>
  );
}
