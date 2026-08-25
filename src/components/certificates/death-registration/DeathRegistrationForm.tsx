"use client";

import React from "react";
import { CertificateData } from "@/types/certificate";
import { X, RotateCcw, Building2, FileText, User, PenTool, Info, MapPin, Globe } from "lucide-react";

interface DeathRegistrationFormProps {
  data: CertificateData;
  onChange: (updated: CertificateData) => void;
  onReset: () => void;
  isOpen: boolean;
  onClose: () => void;
  lang?: "bn" | "en";
  onLangChange?: (lang: "bn" | "en") => void;
}

export function DeathRegistrationForm({
  data,
  onChange,
  onReset,
  isOpen,
  onClose,
  lang = "bn",
  onLangChange,
}: DeathRegistrationFormProps) {
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
          <div className="p-1.5 rounded-lg bg-emerald-500/10 dark:bg-emerald-500/20 text-emerald-600 dark:text-emerald-400">
            <PenTool className="w-4 h-4" />
          </div>
          <div>
            <h3 className="text-base font-bold text-slate-900 dark:text-slate-100 leading-none">
              {isEn ? "Death Certificate Form" : "মৃত্যু নিবন্ধন সনদের তথ্য"}
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
          <div className="flex items-center gap-2 text-xs font-bold text-emerald-600 dark:text-emerald-400 uppercase tracking-wider pb-1 border-b border-slate-200 dark:border-slate-800">
            <Building2 className="w-4 h-4" /> {isEn ? "Registrar Office / Union" : "নিবন্ধকের কার্যালয় / ইউনিয়ন"}
          </div>
          <div className="flex flex-col gap-1">
            <label className="text-xs font-semibold text-slate-700 dark:text-slate-300">
              {isEn ? "Union Parishad / Office Name" : "ইউনিয়ন পরিষদ / কার্যালয়ের নাম"}
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
        </div>

        {/* Metadata */}
        <div className="flex flex-col gap-3">
          <div className="flex items-center gap-2 text-xs font-bold text-blue-600 dark:text-blue-400 uppercase tracking-wider pb-1 border-b border-slate-200 dark:border-slate-800">
            <FileText className="w-4 h-4" /> {isEn ? "Registration Details" : "নিবন্ধনের বিবরণ"}
          </div>
          <div className="flex flex-col gap-1">
            <label className="text-xs font-semibold text-slate-700 dark:text-slate-300">
              {isEn ? "Death Reg. No. (17 Digits)" : "মৃত্যু নিবন্ধন নং (১৭ ডিজিট)"}
            </label>
            <input
              type="text"
              value={isEn ? (data.registrationNoEn || data.meta.serial_no_en || data.registrationNoBn || data.meta.serial_no) : (data.registrationNoBn || data.meta.serial_no)}
              onChange={(e) => {
                const key = isEn ? "registrationNoEn" : "registrationNoBn";
                const metaKey = isEn ? "serial_no_en" : "serial_no";
                onChange({ ...data, [key]: e.target.value, meta: { ...data.meta, [metaKey]: e.target.value } });
              }}
              className={inputClass}
            />
          </div>
          <div className="grid grid-cols-2 gap-2.5">
            <div className="flex flex-col gap-1">
              <label className="text-xs font-semibold text-slate-700 dark:text-slate-300">
                {isEn ? "Reg. Date" : "নিবন্ধনের তারিখ"}
              </label>
              <input
                type="text"
                value={isEn ? (data.registrationDateEn || data.registrationDateBn || data.meta.issue_date) : (data.registrationDateBn || data.meta.issue_date)}
                onChange={(e) => {
                  const key = isEn ? "registrationDateEn" : "registrationDateBn";
                  onChange({ ...data, [key]: e.target.value });
                }}
                className={inputClass}
              />
            </div>
            <div className="flex flex-col gap-1">
              <label className="text-xs font-semibold text-slate-700 dark:text-slate-300">
                {isEn ? "Issue Date" : "সনদ প্রদান তারিখ"}
              </label>
              <input type="text" value={getMetaValue("issue_date")} onChange={(e) => updateMeta("issue_date", e.target.value)} className={inputClass} />
            </div>
          </div>
        </div>

        {/* Deceased Person Details */}
        <div className="flex flex-col gap-3">
          <div className="flex items-center gap-2 text-xs font-bold text-rose-600 dark:text-rose-400 uppercase tracking-wider pb-1 border-b border-slate-200 dark:border-slate-800">
            <User className="w-4 h-4" /> {isEn ? "Deceased Person Details" : "মৃত ব্যক্তির তথ্য"}
          </div>
          <div className="flex flex-col gap-1">
            <label className="text-xs font-semibold text-slate-700 dark:text-slate-300">
              {isEn ? "Full Name" : "মৃত ব্যক্তির নাম"}
            </label>
            <input type="text" value={getApplicantValue("person_name")} onChange={(e) => updateApplicant("person_name", e.target.value)} className={inputClass} />
          </div>
          <div className="grid grid-cols-2 gap-2">
            <div className="flex flex-col gap-1">
              <label className="text-xs font-semibold text-slate-700 dark:text-slate-300">
                {isEn ? "Date of Death" : "মৃত্যুর তারিখ"}
              </label>
              <input
                type="text"
                value={isEn ? (data.dateOfDeathEn || data.dateOfDeathBn || "") : (data.dateOfDeathBn || "")}
                onChange={(e) => {
                  const key = isEn ? "dateOfDeathEn" : "dateOfDeathBn";
                  onChange({ ...data, [key]: e.target.value });
                }}
                className={inputClass}
              />
            </div>
            <div className="flex flex-col gap-1">
              <label className="text-xs font-semibold text-slate-700 dark:text-slate-300">
                {isEn ? "Gender" : "লিঙ্গ"}
              </label>
              <input
                type="text"
                value={isEn ? (data.genderEn || data.genderBn || "") : (data.genderBn || "")}
                onChange={(e) => {
                  const key = isEn ? "genderEn" : "genderBn";
                  onChange({ ...data, [key]: e.target.value });
                }}
                className={inputClass}
              />
            </div>
          </div>
          <div className="flex flex-col gap-1">
            <label className="text-xs font-semibold text-slate-700 dark:text-slate-300">
              {isEn ? "Date of Death (In Words)" : "মৃত্যুর তারিখ (কথায়)"}
            </label>
            <input
              type="text"
              value={isEn ? (data.dateOfDeathInWordsEn || data.dateOfDeathInWordsBn || "") : (data.dateOfDeathInWordsBn || "")}
              onChange={(e) => {
                const key = isEn ? "dateOfDeathInWordsEn" : "dateOfDeathInWordsBn";
                onChange({ ...data, [key]: e.target.value });
              }}
              className={inputClass}
            />
          </div>
          <div className="grid grid-cols-2 gap-2">
            <div className="flex flex-col gap-1">
              <label className="text-xs font-semibold text-slate-700 dark:text-slate-300">
                {isEn ? "Father's Name" : "পিতার নাম"}
              </label>
              <input type="text" value={getApplicantValue("father_name")} onChange={(e) => updateApplicant("father_name", e.target.value)} className={inputClass} />
            </div>
            <div className="flex flex-col gap-1">
              <label className="text-xs font-semibold text-slate-700 dark:text-slate-300">
                {isEn ? "Mother's Name" : "মাতার নাম"}
              </label>
              <input type="text" value={getApplicantValue("mother_name")} onChange={(e) => updateApplicant("mother_name", e.target.value)} className={inputClass} />
            </div>
          </div>
          <div className="flex flex-col gap-1">
            <label className="text-xs font-semibold text-slate-700 dark:text-slate-300">
              {isEn ? "Spouse Name" : "স্বামী/স্ত্রীর নাম"}
            </label>
            <input type="text" value={getApplicantValue("spouse_name")} onChange={(e) => updateApplicant("spouse_name", e.target.value)} className={inputClass} />
          </div>
        </div>

        {/* Address */}
        <div className="flex flex-col gap-3">
          <div className="flex items-center gap-2 text-xs font-bold text-purple-600 dark:text-purple-400 uppercase tracking-wider pb-1 border-b border-slate-200 dark:border-slate-800">
            <MapPin className="w-4 h-4" /> {isEn ? "Address & Place" : "ঠিকানা ও স্থান"}
          </div>
          <div className="flex flex-col gap-1">
            <label className="text-xs font-semibold text-slate-700 dark:text-slate-300">
              {isEn ? "Permanent Address" : "স্থায়ী ঠিকানা"}
            </label>
            <input
              type="text"
              value={isEn ? (data.permanentAddressEn || data.permanentAddressBn || "") : (data.permanentAddressBn || "")}
              onChange={(e) => {
                const key = isEn ? "permanentAddressEn" : "permanentAddressBn";
                onChange({ ...data, [key]: e.target.value });
              }}
              className={inputClass}
            />
          </div>
          <div className="flex flex-col gap-1">
            <label className="text-xs font-semibold text-slate-700 dark:text-slate-300">
              {isEn ? "Present Address" : "বর্তমান ঠিকানা"}
            </label>
            <input
              type="text"
              value={isEn ? (data.presentAddressEn || data.presentAddressBn || "") : (data.presentAddressBn || "")}
              onChange={(e) => {
                const key = isEn ? "presentAddressEn" : "presentAddressBn";
                onChange({ ...data, [key]: e.target.value });
              }}
              className={inputClass}
            />
          </div>
          <div className="flex flex-col gap-1">
            <label className="text-xs font-semibold text-slate-700 dark:text-slate-300">
              {isEn ? "Place of Death" : "মৃত্যুর স্থান"}
            </label>
            <input
              type="text"
              value={isEn ? (data.placeOfDeathEn || data.placeOfDeathBn || "") : (data.placeOfDeathBn || "")}
              onChange={(e) => {
                const key = isEn ? "placeOfDeathEn" : "placeOfDeathBn";
                onChange({ ...data, [key]: e.target.value });
              }}
              className={inputClass}
            />
          </div>
          <div className="flex flex-col gap-1">
            <label className="text-xs font-semibold text-amber-600 dark:text-amber-400">
              {isEn ? "Cause of Death" : "মৃত্যুর কারণ"}
            </label>
            <input
              type="text"
              value={isEn ? (data.causeOfDeathEn || data.causeOfDeathBn || "") : (data.causeOfDeathBn || "")}
              onChange={(e) => {
                const key = isEn ? "causeOfDeathEn" : "causeOfDeathBn";
                onChange({ ...data, [key]: e.target.value });
              }}
              className={inputClass}
            />
          </div>
        </div>

        {/* Signatories */}
        <div className="flex flex-col gap-3">
          <div className="flex items-center gap-2 text-xs font-bold text-indigo-600 dark:text-indigo-400 uppercase tracking-wider pb-1 border-b border-slate-200 dark:border-slate-800">
            <Info className="w-4 h-4" /> {isEn ? "Signatories Info" : "স্বাক্ষরকারী তথ্য"}
          </div>
          <div className="grid grid-cols-2 gap-2">
            <div className="flex flex-col gap-1">
              <label className="text-xs font-semibold text-slate-700 dark:text-slate-300">
                {isEn ? "Left Signatory Name" : "বাম স্বাক্ষরকারী"}
              </label>
              <input
                type="text"
                value={isEn ? (data.leftSignatoryNameEn || data.leftSignatoryNameBn || "") : (data.leftSignatoryNameBn || "")}
                onChange={(e) => {
                  const key = isEn ? "leftSignatoryNameEn" : "leftSignatoryNameBn";
                  onChange({ ...data, [key]: e.target.value });
                }}
                className={inputClass}
              />
            </div>
            <div className="flex flex-col gap-1">
              <label className="text-xs font-semibold text-slate-700 dark:text-slate-300">
                {isEn ? "Right Signatory Name" : "ডান স্বাক্ষরকারী"}
              </label>
              <input type="text" value={getSignatoryValue("signatory_name")} onChange={(e) => updateSignatory("signatory_name", e.target.value)} className={inputClass} />
            </div>
          </div>
        </div>
      </div>
    </aside>
  );
}
