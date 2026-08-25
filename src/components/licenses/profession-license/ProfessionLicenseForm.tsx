"use client";

import React from "react";
import { ProfessionLicenseData } from "@/types/license";
import { X, RotateCcw, Building2, FileText, User, Briefcase, PenTool, Info, DollarSign, Globe } from "lucide-react";

interface ProfessionLicenseFormProps {
  data: ProfessionLicenseData;
  onChange: (updated: ProfessionLicenseData) => void;
  onReset: () => void;
  isOpen: boolean;
  onClose: () => void;
  lang?: "bn" | "en";
  onLangChange?: (lang: "bn" | "en") => void;
}

export function ProfessionLicenseForm({
  data,
  onChange,
  onReset,
  isOpen,
  onClose,
  lang = "bn",
  onLangChange,
}: ProfessionLicenseFormProps) {
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

  const updateBusiness = (field: string, value: string) => {
    const key = isEn ? `${field}_en` : field;
    onChange({ ...data, business: { ...data.business, [key]: value, [field]: data.business[field as keyof typeof data.business] || value } });
  };

  const updateOwner = (field: string, value: string) => {
    const key = isEn ? `${field}_en` : field;
    onChange({ ...data, owner: { ...data.owner, [key]: value, [field]: data.owner[field as keyof typeof data.owner] || value } });
  };

  const updateFinancials = (field: string, value: string) => {
    const key = isEn ? `${field}_en` : field;
    onChange({ ...data, financials: { ...data.financials, [key]: value, [field]: data.financials[field as keyof typeof data.financials] || value } });
  };

  const updateSignatory = (field: string, value: string) => {
    const key = isEn ? `${field}_en` : field;
    onChange({ ...data, signatory: { ...data.signatory, [key]: value, [field]: data.signatory[field as keyof typeof data.signatory] || value } });
  };

  const getUnionValue = (field: "up_name" | "upazila" | "district" | "website") => {
    if (field === "website") return data.union.website;
    return isEn ? (data.union[`${field}_en`] || data.union[field]) : data.union[field];
  };

  const getMetaValue = (field: keyof typeof data.meta) => {
    return isEn ? (data.meta[`${field}_en` as keyof typeof data.meta] || data.meta[field]) : data.meta[field];
  };

  const getBusinessValue = (field: keyof typeof data.business) => {
    return isEn ? (data.business[`${field}_en` as keyof typeof data.business] || data.business[field]) : data.business[field];
  };

  const getOwnerValue = (field: keyof typeof data.owner) => {
    return isEn ? (data.owner[`${field}_en` as keyof typeof data.owner] as string || data.owner[field] as string || "") : (data.owner[field] as string || "");
  };

  const getFinancialsValue = (field: keyof typeof data.financials) => {
    return isEn ? (data.financials[`${field}_en` as keyof typeof data.financials] || data.financials[field]) : data.financials[field];
  };

  const getSignatoryValue = (field: keyof typeof data.signatory) => {
    return isEn ? (data.signatory[`${field}_en` as keyof typeof data.signatory] || data.signatory[field]) : data.signatory[field];
  };

  const inputClass = "px-3 py-2 bg-slate-50 dark:bg-slate-800/90 border border-slate-300 dark:border-slate-700 rounded-lg text-sm text-slate-900 dark:text-slate-100 outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500/80 transition-colors";

  return (
    <aside className="no-print edit-drawer w-full sm:w-[420px] bg-white dark:bg-slate-900 border-r border-slate-200 dark:border-slate-800 text-slate-900 dark:text-slate-100 shadow-2xl h-[calc(100vh-62px)] overflow-y-auto sticky top-[62px] z-[500] flex flex-col font-siliguri transition-colors duration-200">
      <div className="px-5 py-4 bg-slate-50 dark:bg-slate-950/80 border-b border-slate-200 dark:border-slate-800 flex justify-between items-center sticky top-0 z-10 backdrop-blur-md">
        <div className="flex items-center gap-2">
          <div className="p-1.5 rounded-lg bg-red-500/10 dark:bg-red-500/20 text-red-600 dark:text-red-400">
            <PenTool className="w-4 h-4" />
          </div>
          <div>
            <h3 className="text-base font-bold text-slate-900 dark:text-slate-100 leading-none">
              {isEn ? "Profession License Form Editor" : "পেশা ও জীবিকা লাইসেন্স এডিটর"}
            </h3>
            <span className="text-[11px] text-slate-500 dark:text-slate-400">
              {isEn ? "Live License Editor" : "ল্যান্ডস্কেপ লাইসেন্স এডিটর"}
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
            <span>{isEn ? "Language Mode:" : "লাইসেন্সের ভাষা সিলেক্ট করুন:"}</span>
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
          <div className="flex items-center gap-2 text-xs font-bold text-red-700 dark:text-red-400 uppercase tracking-wider pb-1 border-b border-slate-200 dark:border-slate-800">
            <Building2 className="w-4 h-4" /> {isEn ? "Union Parishad Details" : "পরিষদের তথ্য"}
          </div>
          <div className="flex flex-col gap-1">
            <label className="text-xs font-semibold text-slate-700 dark:text-slate-300">
              {isEn ? "Union Parishad Name" : "ইউনিয়ন পরিষদ"}
            </label>
            <input type="text" value={getUnionValue("up_name")} onChange={(e) => updateUnion("up_name", e.target.value)} className={inputClass} />
          </div>
          <div className="grid grid-cols-2 gap-2">
            <div className="flex flex-col gap-1">
              <label className="text-xs font-semibold text-slate-700 dark:text-slate-300">
                {isEn ? "Upazila" : "উপজেলা"}
              </label>
              <input type="text" value={getUnionValue("upazila")} onChange={(e) => updateUnion("upazila", e.target.value)} className={inputClass} />
            </div>
            <div className="flex flex-col gap-1">
              <label className="text-xs font-semibold text-slate-700 dark:text-slate-300">
                {isEn ? "District" : "জেলা"}
              </label>
              <input type="text" value={getUnionValue("district")} onChange={(e) => updateUnion("district", e.target.value)} className={inputClass} />
            </div>
          </div>
          <div className="flex flex-col gap-1">
            <label className="text-xs font-semibold text-slate-700 dark:text-slate-300">
              {isEn ? "Fiscal Year" : "অর্থ বছর"}
            </label>
            <input
              type="text"
              value={isEn ? (data.fiscalYearEn || data.fiscalYearBn) : data.fiscalYearBn}
              onChange={(e) => onChange({ ...data, [isEn ? "fiscalYearEn" : "fiscalYearBn"]: e.target.value, fiscalYearBn: data.fiscalYearBn || e.target.value })}
              className={inputClass}
            />
          </div>
        </div>

        {/* License Meta */}
        <div className="flex flex-col gap-3">
          <div className="flex items-center gap-2 text-xs font-bold text-blue-600 dark:text-blue-400 uppercase tracking-wider pb-1 border-b border-slate-200 dark:border-slate-800">
            <FileText className="w-4 h-4" /> {isEn ? "License Metadata" : "লাইসেন্স মেটাডেটা"}
          </div>
          <div className="grid grid-cols-2 gap-2">
            <div className="flex flex-col gap-1">
              <label className="text-xs font-semibold text-slate-700 dark:text-slate-300">
                {isEn ? "License No." : "লাইসেন্স নং"}
              </label>
              <input type="text" value={getMetaValue("license_no")} onChange={(e) => updateMeta("license_no", e.target.value)} className={inputClass} />
            </div>
            <div className="flex flex-col gap-1">
              <label className="text-xs font-semibold text-slate-700 dark:text-slate-300">
                {isEn ? "Issue Date" : "তারিখ"}
              </label>
              <input type="text" value={getMetaValue("issue_date")} onChange={(e) => updateMeta("issue_date", e.target.value)} className={inputClass} />
            </div>
          </div>
          <div className="grid grid-cols-2 gap-2">
            <div className="flex flex-col gap-1">
              <label className="text-xs font-semibold text-slate-700 dark:text-slate-300">
                {isEn ? "Valid Until Date" : "বৈধতার মেয়াদ"}
              </label>
              <input type="text" value={getMetaValue("valid_until_date")} onChange={(e) => updateMeta("valid_until_date", e.target.value)} className={inputClass} />
            </div>
            <div className="flex flex-col gap-1">
              <label className="text-xs font-semibold text-slate-700 dark:text-slate-300">
                {isEn ? "Renewal Date" : "নবায়নের তারিখ"}
              </label>
              <input type="text" value={getMetaValue("renewal_date")} onChange={(e) => updateMeta("renewal_date", e.target.value)} className={inputClass} />
            </div>
          </div>
        </div>

        {/* Business & Owner Info */}
        <div className="flex flex-col gap-3">
          <div className="flex items-center gap-2 text-xs font-bold text-rose-600 dark:text-rose-400 uppercase tracking-wider pb-1 border-b border-slate-200 dark:border-slate-800">
            <Briefcase className="w-4 h-4" /> {isEn ? "Business & Owner Details" : "প্রতিষ্ঠান ও মালিকের বিবরণ"}
          </div>
          <div className="flex flex-col gap-1">
            <label className="text-xs font-semibold text-slate-700 dark:text-slate-300">
              {isEn ? "Institution Name" : "প্রতিষ্ঠানের নাম"}
            </label>
            <input type="text" value={getBusinessValue("institution_name")} onChange={(e) => updateBusiness("institution_name", e.target.value)} className={inputClass} />
          </div>
          <div className="flex flex-col gap-1">
            <label className="text-xs font-semibold text-slate-700 dark:text-slate-300">
              {isEn ? "License Holder Name" : "লাইসেন্সধারীর নাম"}
            </label>
            <input type="text" value={getOwnerValue("name")} onChange={(e) => updateOwner("name", e.target.value)} className={inputClass} />
          </div>
          <div className="flex flex-col gap-1">
            <label className="text-xs font-semibold text-slate-700 dark:text-slate-300">
              {isEn ? "Father/Husband's Name" : "পিতা/স্বামী ও মাতা"}
            </label>
            <input type="text" value={getOwnerValue("father_or_husband_name")} onChange={(e) => updateOwner("father_or_husband_name", e.target.value)} className={inputClass} />
          </div>
          <div className="flex flex-col gap-1">
            <label className="text-xs font-semibold text-slate-700 dark:text-slate-300">
              {isEn ? "Address" : "ঠিকানা"}
            </label>
            <input type="text" value={getOwnerValue("address")} onChange={(e) => updateOwner("address", e.target.value)} className={inputClass} />
          </div>
          <div className="flex flex-col gap-1">
            <label className="text-xs font-semibold text-slate-700 dark:text-slate-300">
              {isEn ? "Business Type" : "ব্যবসার ধরণ"}
            </label>
            <input type="text" value={getBusinessValue("business_type")} onChange={(e) => updateBusiness("business_type", e.target.value)} className={inputClass} />
          </div>
          <div className="flex flex-col gap-1">
            <label className="text-xs font-semibold text-slate-700 dark:text-slate-300">
              {isEn ? "Business Place" : "ব্যবসার স্থান"}
            </label>
            <input type="text" value={getBusinessValue("business_place")} onChange={(e) => updateBusiness("business_place", e.target.value)} className={inputClass} />
          </div>
        </div>

        {/* Financial Info */}
        <div className="flex flex-col gap-3">
          <div className="flex items-center gap-2 text-xs font-bold text-emerald-600 dark:text-emerald-400 uppercase tracking-wider pb-1 border-b border-slate-200 dark:border-slate-800">
            <DollarSign className="w-4 h-4" /> {isEn ? "Fee & Financials" : "ফি সংক্রান্ত তথ্য"}
          </div>
          <div className="flex flex-col gap-1">
            <label className="text-xs font-semibold text-slate-700 dark:text-slate-300">
              {isEn ? "Fee Amount (incl. 15% VAT)" : "ফি প্রদানের পরিমাণ (১৫% ভ্যাটসহ)"}
            </label>
            <input type="text" value={getFinancialsValue("fee_amount")} onChange={(e) => updateFinancials("fee_amount", e.target.value)} className={inputClass} />
          </div>
          <div className="flex flex-col gap-1">
            <label className="text-xs font-semibold text-slate-700 dark:text-slate-300">
              {isEn ? "Amount in Words" : "কথায়"}
            </label>
            <input type="text" value={getFinancialsValue("amount_in_words")} onChange={(e) => updateFinancials("amount_in_words", e.target.value)} className={inputClass} />
          </div>
        </div>

        {/* Signatory Info */}
        <div className="flex flex-col gap-3">
          <div className="flex items-center gap-2 text-xs font-bold text-indigo-600 dark:text-indigo-400 uppercase tracking-wider pb-1 border-b border-slate-200 dark:border-slate-800">
            <Info className="w-4 h-4" /> {isEn ? "Signatory (Chairman)" : "স্বাক্ষরকারী (চেয়ারম্যান)"}
          </div>
          <div className="flex flex-col gap-1">
            <label className="text-xs font-semibold text-slate-700 dark:text-slate-300">
              {isEn ? "Chairman Name" : "চেয়ারম্যানের নাম"}
            </label>
            <input type="text" value={getSignatoryValue("name")} onChange={(e) => updateSignatory("name", e.target.value)} className={inputClass} />
          </div>
        </div>
      </div>
    </aside>
  );
}
