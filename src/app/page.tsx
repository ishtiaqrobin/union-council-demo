"use client";

import React, { useState } from "react";
import certificateData from "@/data/certificates.json";
import { ObibahitoCertificate } from "@/components/certificate-templates/ObibahitoCertificate";
import { NagorikCertificate } from "@/components/certificate-templates/NagorikCertificate";
import { WarishCertificate } from "@/components/certificate-templates/WarishCertificate";
import { CertificateForm } from "@/components/certificate-forms/CertificateForm";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Printer, PanelLeftClose, PanelLeftOpen, FileText, CheckCircle2 } from "lucide-react";

export default function CertificateStudio() {
  const [selectedCertKey, setSelectedCertKey] = useState<string>("obibahito");
  const [showForm, setShowForm] = useState<boolean>(true);

  // Store editable state initialized with dummy JSON
  const [appData, setAppData] = useState({
    council: certificateData.council,
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    certificate: (certificateData.certificates as any)[selectedCertKey],
  });

  // Switch certificate type
  const handleSelectCert = (certKey: string) => {
    setSelectedCertKey(certKey);
    setAppData({
      council: certificateData.council,
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      certificate: (certificateData.certificates as any)[certKey] || (certificateData.certificates as any)["obibahito"],
    });
  };

  // Reset current certificate
  const handleReset = () => {
    setAppData({
      council: certificateData.council,
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      certificate: (certificateData.certificates as any)[selectedCertKey],
    });
  };

  // Handle Print Action
  const handlePrint = () => {
    window.print();
  };

  const certificateOptions = [
    { key: "obibahito", label: "অবিবাহিত সনদ" },
    { key: "nagorik", label: "নাগরিক সনদ" },
    { key: "warish", label: "ওয়ারিশ সনদ" },
    { key: "ekoi_nam", label: "একই নামের প্রত্যয়ন" },
    { key: "barshik_ay", label: "বার্ষিক আয় প্রত্যয়ন" },
    { key: "bhumihin", label: "ভূমিহীন প্রত্যয়ন" },
  ];

  return (
    <div className="min-h-screen flex flex-col">
      {/* Top Navbar (Hidden in Print) */}
      <header className="no-print sticky top-0 z-50 bg-slate-900 text-white px-5 py-3 border-b border-slate-800 shadow-md">
        <div className="max-w-[1600px] mx-auto flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            <Badge variant="brand" className="text-xs px-2.5 py-0.5 uppercase tracking-wider font-bold">
              LGOMS
            </Badge>
            <h1 className="text-base sm:text-lg font-bold font-bengaliSans flex items-center gap-2">
              <FileText className="w-5 h-5 text-emerald-400" />
              ইউনিয়ন পরিষদ ডিজিটাল সনদ স্টুডিও
            </h1>
          </div>

          {/* Certificate Switcher Pills */}
          <div className="flex items-center gap-1.5 overflow-x-auto py-1">
            {certificateOptions.map((opt) => (
              <button
                key={opt.key}
                onClick={() => handleSelectCert(opt.key)}
                className={`px-3 py-1.5 rounded-md text-xs font-semibold font-bengaliSans transition-all flex items-center gap-1 whitespace-nowrap ${
                  selectedCertKey === opt.key
                    ? "bg-blue-600 text-white shadow-sm"
                    : "bg-slate-800 text-slate-300 hover:bg-slate-700 hover:text-white"
                }`}
              >
                {selectedCertKey === opt.key && <CheckCircle2 className="w-3.5 h-3.5" />}
                {opt.label}
              </button>
            ))}
          </div>

          {/* Action Buttons */}
          <div className="flex items-center gap-2">
            <Button
              variant="secondary"
              size="sm"
              onClick={() => setShowForm(!showForm)}
              className="gap-1.5 text-xs font-bengaliSans bg-slate-800 text-slate-200 hover:bg-slate-700 border border-slate-700"
            >
              {showForm ? (
                <>
                  <PanelLeftClose className="w-4 h-4" />
                  এডিটর লুকান
                </>
              ) : (
                <>
                  <PanelLeftOpen className="w-4 h-4" />
                  এডিটর খুলুন
                </>
              )}
            </Button>

            <Button
              onClick={handlePrint}
              className="gap-1.5 text-xs font-bengaliSans font-bold bg-emerald-600 hover:bg-emerald-700 text-white shadow-md"
              size="sm"
            >
              <Printer className="w-4 h-4" />
              সনদ প্রিন্ট করুন (Print A4)
            </Button>
          </div>
        </div>
      </header>

      {/* Main Studio Workspace */}
      <div className="flex-1 flex overflow-hidden">
        {/* Left Form Panel (Hidden in Print) */}
        {showForm && (
          <aside className="no-print w-[380px] xl:w-[420px] shrink-0 border-r border-slate-200 bg-white h-[calc(100vh-61px)] sticky top-[61px]">
            <CertificateForm
              data={appData}
              onChange={(updated) => setAppData(updated)}
              onReset={handleReset}
            />
          </aside>
        )}

        {/* Certificate Preview Viewport */}
        <main className="cert-printable-container flex-1 bg-slate-200/80 p-6 flex justify-center items-start overflow-auto min-h-[calc(100vh-61px)]">
          <div className="shadow-2xl rounded-sm overflow-hidden bg-white">
            {selectedCertKey === "obibahito" && (
              <ObibahitoCertificate data={appData} />
            )}
            {selectedCertKey === "nagorik" && (
              <NagorikCertificate data={appData} />
            )}
            {selectedCertKey === "warish" && (
              <WarishCertificate data={appData} />
            )}
            {/* Fallback to Obibahito style template for other certificates with custom badge */}
            {selectedCertKey !== "obibahito" &&
              selectedCertKey !== "nagorik" &&
              selectedCertKey !== "warish" && (
                <ObibahitoCertificate data={appData} />
              )}
          </div>
        </main>
      </div>
    </div>
  );
}
