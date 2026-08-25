"use client";

import React, { useState } from "react";
import { Navbar } from "@/components/layout/Navbar";
import { DeathRegistrationForm } from "@/components/certificates/death-registration/DeathRegistrationForm";
import { DeathRegistrationSheet } from "@/components/certificates/death-registration/DeathRegistrationSheet";
import { DEATH_REGISTRATION_INITIAL_DATA } from "@/data/certificates";
import { CertificateData } from "@/types/certificate";

export default function DeathRegistrationPage() {
  const [certData, setCertData] = useState<CertificateData>(
    JSON.parse(JSON.stringify(DEATH_REGISTRATION_INITIAL_DATA))
  );
  const [isDrawerOpen, setIsDrawerOpen] = useState(true);
  const [lang, setLang] = useState<"bn" | "en">("bn");

  const handleReset = () => {
    setCertData(JSON.parse(JSON.stringify(DEATH_REGISTRATION_INITIAL_DATA)));
  };

  return (
    <div className="min-h-screen bg-slate-100 dark:bg-slate-950 text-slate-900 dark:text-slate-100 flex flex-col font-siliguri print:bg-white print:min-h-0 transition-colors duration-200">
      <Navbar
        onToggleDrawer={() => setIsDrawerOpen(!isDrawerOpen)}
        isDrawerOpen={isDrawerOpen}
      />

      <div className="main-wrapper flex flex-1 relative print:block print:m-0 print:p-0">
        <DeathRegistrationForm
          data={certData}
          onChange={setCertData}
          onReset={handleReset}
          isOpen={isDrawerOpen}
          onClose={() => setIsDrawerOpen(false)}
          lang={lang}
          onLangChange={setLang}
        />

        <main className="certificate-viewport flex-1 p-8 px-4 flex justify-center items-start overflow-x-auto print:p-0 print:m-0 print:block print:overflow-visible bg-slate-200/80 dark:bg-slate-900/60 shadow-inner">
          <DeathRegistrationSheet data={certData} lang={lang} />
        </main>
      </div>
    </div>
  );
}
