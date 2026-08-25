"use client";

import React from "react";
import { CertificateData } from "@/types/certificate";
import { X, RotateCcw, Building2, FileText, User, PenTool, Info, Globe } from "lucide-react";

interface SameNameFormProps {
  data: CertificateData;
  onChange: (updated: CertificateData) => void;
  onReset: () => void;
  isOpen: boolean;
  onClose: () => void;
  lang?: "bn" | "en";
  onLangChange?: (lang: "bn" | "en") => void;
}

export function SameNameForm({
  data,
  onChange,
  onReset,
  isOpen,
  onClose,
  lang = "bn",
  onLangChange,
}: SameNameFormProps) {
  if (!isOpen) return null;

  const isEn = lang === "en";

  const updateUnion = (field: string, value: string) => {
    const key = isEn ? `${field}_en` : field;
    onChange({ ...data, union: { ...data.union, [key]: value, [field]: data.union[field as keyof typeof data.union] || value } });
  };

  const updateMeta = (field: string, value: string) => {
    const key = isEn ? `${field}_en` : field;
    onChange({ ...data, meta: { ...data.meta, [key]: value, [field]: data.meta[field as keyof typeof data.meta] || value } });
  };

  const updateApplicant = (field: string, value: string) => {
    const key = isEn ? `${field}_en` : field;
    onChange({ ...data, applicant: { ...data.applicant, [key]: value, [field]: data.applicant[field as keyof typeof data.applicant] || value } });
  };

  const updateSignatory = (field: string, value: string) => {
    const key = isEn ? `${field}_en` : field;
    onChange({ ...data, signatory: { ...data.signatory, [key]: value, [field]: data.signatory[field as keyof typeof data.signatory] || value } });
  };

  const getUnionValue = (field: "up_name" | "upazila" | "district" | "website") => {
    if (field === "website") return data.union.website;
    return isEn ? (data.union[`${field}_en`] || data.union[field]) : data.union[field];
  };

  const getMetaValue = (field: "serial_no" | "cert_title" | "issue_date") => {
    return isEn ? (data.meta[`${field}_en`] || data.meta[field]) : data.meta[field];
  };

  const getApplicantValue = (field: keyof typeof data.applicant) => {
    if (field === "photo_url") return data.applicant.photo_url || "";
    return isEn ? (data.applicant[`${field}_en` as keyof typeof data.applicant] as string || data.applicant[field] as string) : (data.applicant[field] as string);
  };

  const getSignatoryValue = (field: "signatory_name" | "signatory_role" | "trn_no" | "qr_url") => {
    if (field === "trn_no" || field === "qr_url") return data.signatory[field];
    return isEn ? (data.signatory[`${field}_en`] || data.signatory[field]) : data.signatory[field];
  };

  const inputClass = "px-3 py-2 bg-slate-50 dark:bg-slate-800/90 border border-slate-300 dark:border-slate-700 rounded-lg text-sm text-slate-900 dark:text-slate-100 outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500/80 transition-colors";

  return (
    <aside className="no-print edit-drawer w-full sm:w-[420px] bg-white dark:bg-slate-900 border-r border-slate-200 dark:border-slate-800 text-slate-900 dark:text-slate-100 shadow-2xl h-[calc(100vh-62px)] overflow-y-auto sticky top-[62px] z-[500] flex flex-col font-siliguri transition-colors duration-200">
      <div className="px-5 py-4 bg-slate-50 dark:bg-slate-950/80 border-b border-slate-200 dark:border-slate-800 flex justify-between items-center sticky top-0 z-10 backdrop-blur-md">
        <div className="flex items-center gap-2">
          <div className="p-1.5 rounded-lg bg-rose-500/10 dark:bg-rose-500/20 text-rose-600 dark:text-rose-400">
            <PenTool className="w-4 h-4" />
          </div>
          <div>
            <h3 className="text-base font-bold text-slate-900 dark:text-slate-100 leading-none">
              {isEn ? "Same Name Certificate Form" : "একই নামের প্রত্যয়ন তথ্য"}
            </h3>
            <span className="text-[11px] text-slate-500 dark:text-slate-400">
              {isEn ? "Live English Editor" : "লাইভ ডাটা এডিটর"}
            </span>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <button onClick={onReset} className="flex items-center gap-1 text-xs px-2.5 py-1.5 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300 rounded-lg border border-slate-300 dark:border-slate-700 transition-colors">
            <RotateCcw className="w-3.5 h-3.5" /> {isEn ? "Reset" : "রিসেট"}
          </button>
          <button onClick={onClose} className="p-1.5 text-slate-500 hover:text-slate-900 dark:hover:text-white">
            <X className="w-5 h-5" />
          </button>
        </div>
      </div>

      <div className="p-5 flex flex-col gap-6 overflow-y-auto">
        {/* Language Selector Tab */}
        <div className="flex items-center justify-between p-2.5 bg-slate-100 dark:bg-slate-800/80 rounded-xl border border-slate-200 dark:border-slate-700">
          <div className="flex items-center gap-2 text-xs font-bold text-slate-700 dark:text-slate-300">
            <Globe className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
            <span>{isEn ? "Language Mode:" : "সনদের ভাষা সিলেক্ট করুন:"}</span>
          </div>
          <div className="flex items-center p-0.5 bg-slate-200 dark:bg-slate-900 rounded-lg border border-slate-300 dark:border-slate-700 text-xs font-bold">
            <button
              onClick={() => onLangChange?.("bn")}
              className={`px-3 py-1 rounded-md transition-all ${
                !isEn
                  ? "bg-emerald-600 text-white shadow-sm"
                  : "text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white"
              }`}
            >
              🇧🇩 বাংলা
            </button>
            <button
              onClick={() => onLangChange?.("en")}
              className={`px-3 py-1 rounded-md transition-all ${
                isEn
                  ? "bg-emerald-600 text-white shadow-sm"
                  : "text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white"
              }`}
            >
              🇬🇧 English
            </button>
          </div>
        </div>

        {/* Union Info */}
        <div className="flex flex-col gap-3">
          <div className="flex items-center gap-2 text-xs font-bold text-rose-600 dark:text-rose-400 uppercase tracking-wider pb-1 border-b border-slate-200 dark:border-slate-800">
            <Building2 className="w-4 h-4" /> {isEn ? "Union Parishad Details" : "পরিষদের তথ্য"}
          </div>
          <div className="flex flex-col gap-1">
            <label className="text-xs font-semibold text-slate-700 dark:text-slate-300">
              {isEn ? "Union Parishad Name" : "ইউনিয়ন পরিষদ"}
            </label>
            <input type="text" value={getUnionValue("up_name")} onChange={(e) => updateUnion("up_name", e.target.value)} className={inputClass} />
          </div>
        </div>

        {/* Metadata */}
        <div className="flex flex-col gap-3">
          <div className="flex items-center gap-2 text-xs font-bold text-blue-600 dark:text-blue-400 uppercase tracking-wider pb-1 border-b border-slate-200 dark:border-slate-800">
            <FileText className="w-4 h-4" /> {isEn ? "Certificate Metadata" : "সনদের বিবরণ"}
          </div>
          <div className="grid grid-cols-2 gap-2.5">
            <div className="flex flex-col gap-1">
              <label className="text-xs font-semibold text-slate-700 dark:text-slate-300">
                {isEn ? "Serial No." : "ক্রমিক নং"}
              </label>
              <input type="text" value={getMetaValue("serial_no")} onChange={(e) => updateMeta("serial_no", e.target.value)} className={inputClass} />
            </div>
            <div className="flex flex-col gap-1">
              <label className="text-xs font-semibold text-slate-700 dark:text-slate-300">
                {isEn ? "Issue Date" : "তারিখ"}
              </label>
              <input type="text" value={getMetaValue("issue_date")} onChange={(e) => updateMeta("issue_date", e.target.value)} className={inputClass} />
            </div>
          </div>
        </div>

        {/* Applicant Names */}
        <div className="flex flex-col gap-3">
          <div className="flex items-center gap-2 text-xs font-bold text-rose-600 dark:text-rose-400 uppercase tracking-wider pb-1 border-b border-slate-200 dark:border-slate-800">
            <User className="w-4 h-4" /> {isEn ? "Applicant & Alias Names" : "আবেদনকারীর নামসমূহ"}
          </div>
          <div className="flex flex-col gap-1">
            <label className="text-xs font-semibold text-slate-700 dark:text-slate-300">
              {isEn ? "Primary Name (NID)" : "মূল নাম (এনআইডি অনুযায়ী)"}
            </label>
            <input type="text" value={getApplicantValue("person_name")} onChange={(e) => updateApplicant("person_name", e.target.value)} className={inputClass} />
          </div>
          <div className="flex flex-col gap-1">
            <label className="text-xs font-semibold text-rose-600 dark:text-rose-400">
              {isEn ? "Alias Name / Other Name" : "অন্য নাম / উপনাম"}
            </label>
            <input
              type="text"
              value={isEn ? (data.aliasNameEn || data.aliasNameBn || "") : (data.aliasNameBn || "")}
              onChange={(e) => {
                const key = isEn ? "aliasNameEn" : "aliasNameBn";
                onChange({ ...data, [key]: e.target.value });
              }}
              className={inputClass}
            />
          </div>
          <div className="flex flex-col gap-1">
            <label className="text-xs font-semibold text-slate-700 dark:text-slate-300">
              {isEn ? "NID No." : "এনআইডি নং"}
            </label>
            <input type="text" value={getApplicantValue("nid_no")} onChange={(e) => updateApplicant("nid_no", e.target.value)} className={inputClass} />
          </div>
        </div>

        {/* Signatory */}
        <div className="flex flex-col gap-3">
          <div className="flex items-center gap-2 text-xs font-bold text-purple-600 dark:text-purple-400 uppercase tracking-wider pb-1 border-b border-slate-200 dark:border-slate-800">
            <Info className="w-4 h-4" /> {isEn ? "Signatory Information" : "স্বাক্ষরকারী"}
          </div>
          <div className="flex flex-col gap-1">
            <label className="text-xs font-semibold text-slate-700 dark:text-slate-300">
              {isEn ? "Signatory Name" : "অনুমোদনকারী"}
            </label>
            <input type="text" value={getSignatoryValue("signatory_name")} onChange={(e) => updateSignatory("signatory_name", e.target.value)} className={inputClass} />
          </div>
        </div>
      </div>
    </aside>
  );
}
