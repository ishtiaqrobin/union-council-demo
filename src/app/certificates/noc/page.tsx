"use client";

import React, { useState } from "react";
import { Navbar } from "@/components/layout/Navbar";
import { NOCSheet } from "@/components/certificates/noc/NOCSheet";
import { NOC_INITIAL_DATA } from "@/data/certificates/noc.data";
import { CertificateData } from "@/types/certificate";


/**
 * ============================================================================
 * অনাপত্তি সনদ (NOC) — the 15th certificate's page
 * ============================================================================
 *
 * ⚠️ THIS PAGE HAS NO EDIT DRAWER, AND THAT IS DELIBERATE RATHER THAN UNFINISHED. Every other
 * certificate's page pairs a `Form` drawer with its `Sheet`, because a designer needs to type values
 * and watch the paper change. This document's values are a MOUZA, A KHATIAN, A DAG AND A LAND AREA —
 * identifiers copied off a deed — so a drawer of text inputs would be a form for retyping a legal
 * record, not a design control. `noc.data.ts` is where a designer changes them.
 *
 * 🔴 WHAT IT HAS INSTEAD is the one control a designer actually needs here: the language toggle,
 * because this sheet's ENGLISH branch is where the note-rule matters most. An NOC goes to a court
 * or RAJUK, so an English copy with an untranslated Bengali name must SAY SO — and the toggle is
 * how somebody sees that happen without reading the code.
 */
export default function NOCPage() {
  const [certData] = useState<CertificateData>(
    JSON.parse(JSON.stringify(NOC_INITIAL_DATA)),
  );
  const [lang, setLang] = useState<"bn" | "en">("bn");

  return (
    <div className="min-h-screen bg-slate-100 dark:bg-slate-950 text-slate-900 dark:text-slate-100 flex flex-col font-siliguri print:bg-white print:min-h-0 transition-colors duration-200">
      <Navbar onToggleDrawer={() => {}} isDrawerOpen={false} />

      <div className="main-wrapper flex flex-1 relative print:block print:m-0 print:p-0">
        <main className="certificate-viewport flex-1 p-8 px-4 flex flex-col items-center gap-4 overflow-x-auto print:p-0 print:m-0 print:block print:overflow-visible bg-slate-200/80 dark:bg-slate-900/60 shadow-inner">
          <div className="no-print flex items-center gap-2 self-end">
            <button
              type="button"
              onClick={() => setLang("bn")}
              className={`px-3 py-1 rounded text-sm border ${
                lang === "bn"
                  ? "bg-teal-700 text-white border-teal-700"
                  : "bg-white text-slate-700 border-slate-300"
              }`}
            >
              বাংলা
            </button>
            <button
              type="button"
              onClick={() => setLang("en")}
              className={`px-3 py-1 rounded text-sm border ${
                lang === "en"
                  ? "bg-teal-700 text-white border-teal-700"
                  : "bg-white text-slate-700 border-slate-300"
              }`}
            >
              English
            </button>
          </div>
          <NOCSheet data={certData} lang={lang} />
        </main>
      </div>
    </div>
  );
}
