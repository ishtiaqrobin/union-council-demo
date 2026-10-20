"use client";

import React, { useState, useEffect } from "react";
import { SignatureControls } from "@/providers/SignatureModeProvider";
import { Navbar } from "@/components/layout/Navbar";
import { TradeLicenseForm } from "@/components/licenses/trade-license/TradeLicenseForm";
import { TradeLicenseSheet } from "@/components/licenses/trade-license/TradeLicenseSheet";
import { TRADE_LICENSE_INITIAL_DATA } from "@/data/licenses/trade-license/tradeLicenseData";
import { TradeLicenseData } from "@/types/license";

export default function TradeLicensePage() {
  const [licenseData, setLicenseData] = useState<TradeLicenseData>(
    JSON.parse(JSON.stringify(TRADE_LICENSE_INITIAL_DATA)),
  );
  const [isDrawerOpen, setIsDrawerOpen] = useState(true);
  const [lang, setLang] = useState<"bn" | "en">("bn");

  /**
   * `?lang=en` selects the English sheet on load.
   *
   * 🔴 WHY THE URL AND NOT ONLY THE TOGGLE. A print link gets shared — a clerk sends
   * the holder "this is your licence, in English" and the holder must open the English
   * document, not the Bengali one with an instruction to click a checkbox they may not
   * find. Reading the parameter in an effect rather than with `useSearchParams` keeps
   * the page out of a Suspense boundary it does not otherwise need.
   */
  useEffect(() => {
    const requested = new URLSearchParams(window.location.search).get("lang");
    if (requested === "en" || requested === "bn") setLang(requested);
  }, []);

  const handleReset = () => {
    setLicenseData(JSON.parse(JSON.stringify(TRADE_LICENSE_INITIAL_DATA)));
  };

  return (
    <div className="min-h-screen bg-slate-100 dark:bg-slate-950 text-slate-900 dark:text-slate-100 flex flex-col font-siliguri print:bg-white print:min-h-0 transition-colors duration-200">
      <Navbar
        onToggleDrawer={() => setIsDrawerOpen(!isDrawerOpen)}
        isDrawerOpen={isDrawerOpen}
      />

      <div className="main-wrapper flex flex-1 relative print:block print:m-0 print:p-0">
        <TradeLicenseForm
          data={licenseData}
          onChange={setLicenseData}
          onReset={handleReset}
          isOpen={isDrawerOpen}
          onClose={() => setIsDrawerOpen(false)}
          lang={lang}
          onLangChange={setLang}
        />

        <main className="certificate-viewport flex-1 p-8 px-4 flex justify-center items-start overflow-x-auto print:p-0 print:m-0 print:block print:overflow-visible bg-slate-200/80 dark:bg-slate-900/60 shadow-inner">
          {/* Print controls — language and the digital/manual signature switch. */}
          <div className="no-print w-full max-w-[210mm] flex justify-end mb-2">
            <SignatureControls lang={lang} setLang={setLang} />
          </div>

          <TradeLicenseSheet data={licenseData} lang={lang} />
        </main>
      </div>
    </div>
  );
}
