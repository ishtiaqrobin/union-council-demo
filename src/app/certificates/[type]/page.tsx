"use client";

import React, { useState, useEffect, use } from "react";
import Link from "next/link";
import { Navbar } from "@/components/Navbar";
import { CertificateFormDrawer } from "@/components/CertificateFormDrawer";
import { CertificateSheet } from "@/components/CertificateSheet";
import { DUMMY_CERTIFICATES_DATA, CERTIFICATE_MENU_ITEMS } from "@/data/dummyCertificates";
import { CertificateData } from "@/types/certificate";
import { ArrowLeft, AlertCircle } from "lucide-react";

interface CertificatePageProps {
  params: Promise<{
    type: string;
  }>;
}

export default function CertificatePage({ params }: CertificatePageProps) {
  const resolvedParams = use(params);
  const typeSlug = resolvedParams.type;

  // Retrieve initial dummy data
  const initialData = DUMMY_CERTIFICATES_DATA[typeSlug] || null;

  const [certData, setCertData] = useState<CertificateData | null>(initialData);
  const [isDrawerOpen, setIsDrawerOpen] = useState(true);

  // Sync state if route changes
  useEffect(() => {
    if (DUMMY_CERTIFICATES_DATA[typeSlug]) {
      setCertData(JSON.parse(JSON.stringify(DUMMY_CERTIFICATES_DATA[typeSlug])));
    } else {
      setCertData(null);
    }
  }, [typeSlug]);

  const handleReset = () => {
    if (DUMMY_CERTIFICATES_DATA[typeSlug]) {
      setCertData(JSON.parse(JSON.stringify(DUMMY_CERTIFICATES_DATA[typeSlug])));
    }
  };

  if (!certData) {
    return (
      <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col font-siliguri">
        <Navbar />
        <div className="flex-1 flex flex-col items-center justify-center p-8 text-center">
          <div className="p-4 rounded-full bg-rose-500/10 text-rose-400 mb-4">
            <AlertCircle className="w-10 h-10" />
          </div>
          <h1 className="text-2xl font-bold text-white mb-2">সনদ পাওয়া যায়নি</h1>
          <p className="text-slate-400 text-sm mb-6">
            &quot;{typeSlug}&quot; নামক কোনো সনদ টেম্পলেট পাওয়া যায়নি।
          </p>
          <Link
            href="/"
            className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-sm transition-colors"
          >
            <ArrowLeft className="w-4 h-4" /> ড্যাশবোর্ডে ফিরে যান
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-100 dark:bg-slate-950 text-slate-900 dark:text-slate-100 flex flex-col font-siliguri print:bg-white print:min-h-0 transition-colors duration-200">
      
      {/* Common Navbar */}
      <Navbar
        onToggleDrawer={() => setIsDrawerOpen(!isDrawerOpen)}
        isDrawerOpen={isDrawerOpen}
      />

      {/* Main Layout Workspace: Edit Drawer + Live Certificate Canvas Viewport */}
      <div className="main-wrapper flex flex-1 relative print:block print:m-0 print:p-0">
        
        {/* Edit Drawer Form */}
        <CertificateFormDrawer
          data={certData}
          onChange={setCertData}
          onReset={handleReset}
          isOpen={isDrawerOpen}
          onClose={() => setIsDrawerOpen(false)}
        />

        {/* Certificate Sheet Viewport (1:1 Print Ready Container) */}
        <main className="certificate-viewport flex-1 p-8 px-4 flex justify-center items-start overflow-x-auto print:p-0 print:m-0 print:block print:overflow-visible bg-slate-200/80 dark:bg-slate-900/60 shadow-inner">
          <CertificateSheet data={certData} />
        </main>

      </div>
    </div>
  );
}
