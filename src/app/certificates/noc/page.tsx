"use client";

import React, { useState } from "react";
import { SignatureControls } from "@/providers/SignatureModeProvider";
import { Navbar } from "@/components/layout/Navbar";
import { NOCForm } from "@/components/certificates/noc/NOCForm";
import { NOCSheet } from "@/components/certificates/noc/NOCSheet";
import { NOC_INITIAL_DATA } from "@/data/certificates/noc.data";
import { CertificateData } from "@/types/certificate";

/**
 * ============================================================================
 * অনাপত্তি সনদ (NOC) — No Objection Certificate Page
 * ============================================================================
 *
 * Provides a live interactive form drawer paired with the portrait A4 NOCSheet.
 * Supports real-time updates for:
 * - Union & metadata details
 * - Applicant & institution information
 * - NOC subject, purpose & validity
 * - Land schedule (১১। তফসীল বিবরণী)
 * - Financial fee receipt
 * - 3-column signatories (Assistant, Administrative Officer, Chairman)
 */
export default function NOCPage() {
  const [certData, setCertData] = useState<CertificateData>(
    JSON.parse(JSON.stringify(NOC_INITIAL_DATA)),
  );
  const [isDrawerOpen, setIsDrawerOpen] = useState(true);
  const [lang, setLang] = useState<"bn" | "en">("bn");

  const handleReset = () => {
    setCertData(JSON.parse(JSON.stringify(NOC_INITIAL_DATA)));
  };

  return (
    <div className="min-h-screen bg-slate-100 dark:bg-slate-950 text-slate-900 dark:text-slate-100 flex flex-col font-siliguri print:bg-white print:min-h-0 transition-colors duration-200">
      <Navbar
        onToggleDrawer={() => setIsDrawerOpen(!isDrawerOpen)}
        isDrawerOpen={isDrawerOpen}
      />

      <div className="main-wrapper flex flex-1 relative print:block print:m-0 print:p-0">
        <NOCForm
          data={certData}
          onChange={setCertData}
          onReset={handleReset}
          isOpen={isDrawerOpen}
          onClose={() => setIsDrawerOpen(false)}
          lang={lang}
          onLangChange={setLang}
        />

        <main className="certificate-viewport flex-1 p-8 px-4 flex flex-col items-center gap-4 overflow-x-auto print:p-0 print:m-0 print:block print:overflow-visible bg-slate-200/80 dark:bg-slate-900/60 shadow-inner">
          {/* Print controls — language and the digital/manual signature switch. */}
          <div className="no-print w-full max-w-[210mm] flex justify-end mb-2">
            <SignatureControls lang={lang} setLang={setLang} />
          </div>

          <NOCSheet data={certData} lang={lang} />
        </main>
      </div>
    </div>
  );
}
