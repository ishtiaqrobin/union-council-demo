"use client";

import React, { useState } from "react";
import { Navbar } from "@/components/layout/Navbar";
import { UnmarriedForm } from "@/components/certificates/unmarried/UnmarriedForm";
import { UnmarriedSheet } from "@/components/certificates/unmarried/UnmarriedSheet";
import { UNMARRIED_INITIAL_DATA } from "@/data/certificates/unmarried.data";
import { CertificateData } from "@/types/certificate";
import { Globe, Printer } from "lucide-react";

export default function UnmarriedPage() {
  const [certData, setCertData] = useState<CertificateData>(
    JSON.parse(JSON.stringify(UNMARRIED_INITIAL_DATA))
  );
  const [isDrawerOpen, setIsDrawerOpen] = useState(true);
  const [lang, setLang] = useState<"bn" | "en">("bn");

  const handleReset = () => {
    setCertData(JSON.parse(JSON.stringify(UNMARRIED_INITIAL_DATA)));
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="min-h-screen bg-slate-100 dark:bg-slate-950 text-slate-900 dark:text-slate-100 flex flex-col font-siliguri print:bg-white print:min-h-0 transition-colors duration-200">
      <Navbar
        onToggleDrawer={() => setIsDrawerOpen(!isDrawerOpen)}
        isDrawerOpen={isDrawerOpen}
      />

      <div className="main-wrapper flex flex-1 relative print:block print:m-0 print:p-0">
        <UnmarriedForm
          data={certData}
          onChange={setCertData}
          onReset={handleReset}
          isOpen={isDrawerOpen}
          onClose={() => setIsDrawerOpen(false)}
          lang={lang}
          onLangChange={setLang}
        />

        <main className="certificate-viewport flex-1 p-6 px-4 flex flex-col justify-start items-center overflow-x-auto print:p-0 print:m-0 print:block print:overflow-visible bg-slate-200/80 dark:bg-slate-900/60 shadow-inner">
          <UnmarriedSheet data={certData} lang={lang} />
        </main>
      </div>
    </div>
  );
}
