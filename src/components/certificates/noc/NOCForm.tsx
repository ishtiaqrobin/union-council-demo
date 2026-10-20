"use client";

import React from "react";
import { CertificateData } from "@/types/certificate";
import {
  X,
  RotateCcw,
  Building2,
  FileText,
  User,
  MapPin,
  PenTool,
  Globe,
  Landmark,
  Coins,
} from "lucide-react";

interface NOCFormProps {
  data: CertificateData;
  onChange: (updated: CertificateData) => void;
  onReset: () => void;
  isOpen: boolean;
  onClose: () => void;
  lang?: "bn" | "en";
  onLangChange?: (lang: "bn" | "en") => void;
}

export function NOCForm({
  data,
  onChange,
  onReset,
  isOpen,
  onClose,
  lang = "bn",
  onLangChange,
}: NOCFormProps) {
  if (!isOpen) return null;

  const isEn = lang === "en";

  const updateUnion = (field: string, value: string) => {
    const key = isEn ? `${field}_en` : field;
    onChange({
      ...data,
      union: {
        ...data.union,
        [key]: value,
        [field]: data.union[field as keyof typeof data.union] || value,
      },
    });
  };

  const updateMeta = (field: string, value: string) => {
    const key = isEn ? `${field}_en` : field;
    onChange({
      ...data,
      meta: {
        ...data.meta,
        [key]: value,
        [field]: data.meta[field as keyof typeof data.meta] || value,
      },
    });
  };

  const updateApplicant = (field: string, value: string) => {
    const key = isEn ? `${field}_en` : field;
    onChange({
      ...data,
      applicant: {
        ...data.applicant,
        [key]: value,
        [field]: data.applicant[field as keyof typeof data.applicant] || value,
      },
    });
  };

  const updateSignatory = (field: string, value: string) => {
    const key = isEn ? `${field}_en` : field;
    onChange({
      ...data,
      signatory: {
        ...data.signatory,
        [key]: value,
        [field]: data.signatory[field as keyof typeof data.signatory] || value,
      },
    });
  };

  const getUnionValue = (
    field: "up_name" | "upazila" | "district" | "website"
  ) => {
    if (field === "website") return data.union.website;
    return isEn
      ? data.union[`${field}_en`] || data.union[field]
      : data.union[field];
  };

  const getMetaValue = (
    field:
      | "serial_no"
      | "cert_id"
      | "ward_no"
      | "circle_road_mohalla"
      | "issue_date"
      | "application_date"
  ) => {
    return isEn
      ? data.meta[`${field}_en`] || data.meta[field] || ""
      : data.meta[field] || "";
  };

  const getApplicantValue = (field: keyof typeof data.applicant) => {
    if (field === "photo_url") return data.applicant.photo_url || "";
    return isEn
      ? (data.applicant[`${field}_en` as keyof typeof data.applicant] as string) ||
          (data.applicant[field] as string) ||
          ""
      : (data.applicant[field] as string) || "";
  };

  const inputClass =
    "px-3 py-2 bg-slate-50 dark:bg-slate-800/90 border border-slate-300 dark:border-slate-700 rounded-lg text-sm text-slate-900 dark:text-slate-100 outline-none focus:border-rose-500 focus:ring-1 focus:ring-rose-500/80 transition-colors";

  return (
    <aside className="no-print edit-drawer w-full sm:w-[420px] bg-white dark:bg-slate-900 border-r border-slate-200 dark:border-slate-800 text-slate-900 dark:text-slate-100 shadow-2xl h-[calc(100vh-62px)] overflow-y-auto sticky top-[62px] z-[500] flex flex-col font-siliguri transition-colors duration-200">
      {/* Top Drawer Header */}
      <div className="px-5 py-4 bg-slate-50 dark:bg-slate-950/80 border-b border-slate-200 dark:border-slate-800 flex justify-between items-center sticky top-0 z-10 backdrop-blur-md">
        <div className="flex items-center gap-2">
          <div className="p-1.5 rounded-lg bg-rose-500/10 dark:bg-rose-500/20 text-rose-600 dark:text-rose-400">
            <PenTool className="w-4 h-4" />
          </div>
          <div>
            <h3 className="text-base font-bold text-slate-900 dark:text-slate-100 leading-none">
              {isEn ? "NOC Form" : "অনাপত্তি সনদের তথ্য"}
            </h3>
            <span className="text-[11px] text-slate-500 dark:text-slate-400">
              {isEn ? "Live Data Editor" : "লাইভ ডাটা এডিটর"}
            </span>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={onReset}
            className="flex items-center gap-1 text-xs px-2.5 py-1.5 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300 rounded-lg border border-slate-300 dark:border-slate-700 transition-colors"
          >
            <RotateCcw className="w-3.5 h-3.5" /> {isEn ? "Reset" : "রিসেট"}
          </button>
          <button
            onClick={onClose}
            className="p-1.5 text-slate-500 hover:text-slate-900 dark:hover:text-white"
          >
            <X className="w-5 h-5" />
          </button>
        </div>
      </div>

      <div className="p-5 flex flex-col gap-6 overflow-y-auto">
        {/* Language Selector Tab */}
        <div className="flex items-center justify-between p-2.5 bg-slate-100 dark:bg-slate-800/80 rounded-xl border border-slate-200 dark:border-slate-700">
          <div className="flex items-center gap-2 text-xs font-bold text-slate-700 dark:text-slate-300">
            <Globe className="w-4 h-4 text-rose-600 dark:text-rose-400" />
            <span>{isEn ? "Language Mode:" : "সনদের ভাষা সিলেক্ট করুন:"}</span>
          </div>
          <div className="flex items-center p-0.5 bg-slate-200 dark:bg-slate-900 rounded-lg border border-slate-300 dark:border-slate-700 text-xs font-bold">
            <button
              onClick={() => onLangChange?.("bn")}
              className={`px-3 py-1 rounded-md transition-all ${
                !isEn
                  ? "bg-rose-700 text-white shadow-sm"
                  : "text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white"
              }`}
            >
              🇧🇩 বাংলা
            </button>
            <button
              onClick={() => onLangChange?.("en")}
              className={`px-3 py-1 rounded-md transition-all ${
                isEn
                  ? "bg-rose-700 text-white shadow-sm"
                  : "text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white"
              }`}
            >
              🇬🇧 English
            </button>
          </div>
        </div>

        {/* 1. Union Parishad Info */}
        <div className="flex flex-col gap-3">
          <div className="flex items-center gap-2 text-xs font-bold text-rose-600 dark:text-rose-400 uppercase tracking-wider pb-1 border-b border-slate-200 dark:border-slate-800">
            <Building2 className="w-4 h-4" />{" "}
            {isEn ? "Union Parishad Details" : "পরিষদের তথ্য"}
          </div>
          <div className="flex flex-col gap-1">
            <label className="text-xs font-semibold text-slate-700 dark:text-slate-300">
              {isEn ? "Union Parishad Name" : "ইউনিয়ন পরিষদ"}
            </label>
            <input
              type="text"
              value={getUnionValue("up_name")}
              onChange={(e) => updateUnion("up_name", e.target.value)}
              className={inputClass}
            />
          </div>
          <div className="grid grid-cols-2 gap-2">
            <div className="flex flex-col gap-1">
              <label className="text-xs font-semibold text-slate-700 dark:text-slate-300">
                {isEn ? "Upazila" : "উপজেলা"}
              </label>
              <input
                type="text"
                value={getUnionValue("upazila")}
                onChange={(e) => updateUnion("upazila", e.target.value)}
                className={inputClass}
              />
            </div>
            <div className="flex flex-col gap-1">
              <label className="text-xs font-semibold text-slate-700 dark:text-slate-300">
                {isEn ? "District" : "জেলা"}
              </label>
              <input
                type="text"
                value={getUnionValue("district")}
                onChange={(e) => updateUnion("district", e.target.value)}
                className={inputClass}
              />
            </div>
          </div>
          <div className="grid grid-cols-2 gap-2">
            <div className="flex flex-col gap-1">
              <label className="text-xs font-semibold text-slate-700 dark:text-slate-300">
                {isEn ? "Portal Website" : "ওয়েবসাইট"}
              </label>
              <input
                type="text"
                value={getUnionValue("website")}
                onChange={(e) => updateUnion("website", e.target.value)}
                className={inputClass}
              />
            </div>
            <div className="flex flex-col gap-1">
              <label className="text-xs font-semibold text-slate-700 dark:text-slate-300">
                {isEn ? "Fiscal Year" : "অর্থ বছর"}
              </label>
              <input
                type="text"
                value={
                  isEn
                    ? data.fiscalYearEn || data.fiscalYearBn || "2025-2026"
                    : data.fiscalYearBn || "2025-2026"
                }
                onChange={(e) => {
                  const key = isEn ? "fiscalYearEn" : "fiscalYearBn";
                  onChange({ ...data, [key]: e.target.value });
                }}
                className={inputClass}
              />
            </div>
          </div>
        </div>

        {/* 2. Certificate Metadata */}
        <div className="flex flex-col gap-3">
          <div className="flex items-center gap-2 text-xs font-bold text-blue-600 dark:text-blue-400 uppercase tracking-wider pb-1 border-b border-slate-200 dark:border-slate-800">
            <FileText className="w-4 h-4" />{" "}
            {isEn ? "Certificate Metadata" : "সনদের মেটাডাটা ও তারিখ"}
          </div>
          <div className="grid grid-cols-2 gap-2.5">
            <div className="flex flex-col gap-1">
              <label className="text-xs font-semibold text-slate-700 dark:text-slate-300">
                {isEn ? "Certificate No." : "সনদ নং"}
              </label>
              <input
                type="text"
                value={getMetaValue("serial_no")}
                onChange={(e) => updateMeta("serial_no", e.target.value)}
                className={inputClass}
              />
            </div>
            <div className="flex flex-col gap-1">
              <label className="text-xs font-semibold text-slate-700 dark:text-slate-300">
                {isEn ? "Certificate ID" : "সনদ আইডি"}
              </label>
              <input
                type="text"
                value={getMetaValue("cert_id")}
                onChange={(e) => updateMeta("cert_id", e.target.value)}
                className={inputClass}
              />
            </div>
          </div>
          <div className="grid grid-cols-2 gap-2.5">
            <div className="flex flex-col gap-1">
              <label className="text-xs font-semibold text-slate-700 dark:text-slate-300">
                {isEn ? "Ward No." : "ওয়ার্ড নং"}
              </label>
              <input
                type="text"
                value={getMetaValue("ward_no")}
                onChange={(e) => {
                  updateMeta("ward_no", e.target.value);
                  updateApplicant("ward_no", e.target.value);
                }}
                className={inputClass}
              />
            </div>
            <div className="flex flex-col gap-1">
              <label className="text-xs font-semibold text-slate-700 dark:text-slate-300">
                {isEn ? "Circle/Road/Mohalla" : "সার্কেল/রাস্তা/মহল্লা"}
              </label>
              <input
                type="text"
                value={getMetaValue("circle_road_mohalla")}
                onChange={(e) =>
                  updateMeta("circle_road_mohalla", e.target.value)
                }
                className={inputClass}
              />
            </div>
          </div>
          <div className="grid grid-cols-2 gap-2.5">
            <div className="flex flex-col gap-1">
              <label className="text-xs font-semibold text-slate-700 dark:text-slate-300">
                {isEn ? "Issue Date" : "সনদ ইস্যুর তারিখ"}
              </label>
              <input
                type="text"
                value={getMetaValue("issue_date")}
                onChange={(e) => updateMeta("issue_date", e.target.value)}
                className={inputClass}
              />
            </div>
            <div className="flex flex-col gap-1">
              <label className="text-xs font-semibold text-slate-700 dark:text-slate-300">
                {isEn ? "Application Date" : "আবেদনের তারিখ"}
              </label>
              <input
                type="text"
                value={getMetaValue("application_date")}
                onChange={(e) => updateMeta("application_date", e.target.value)}
                className={inputClass}
              />
            </div>
          </div>
        </div>

        {/* 3. Applicant & Organization Details */}
        <div className="flex flex-col gap-3">
          <div className="flex items-center gap-2 text-xs font-bold text-amber-600 dark:text-amber-400 uppercase tracking-wider pb-1 border-b border-slate-200 dark:border-slate-800">
            <User className="w-4 h-4" />{" "}
            {isEn
              ? "Applicant & Organization"
              : "আবেদনকারী ও প্রতিষ্ঠানের বিবরণ"}
          </div>
          <div className="flex flex-col gap-1">
            <label className="text-xs font-semibold text-slate-700 dark:text-slate-300">
              {isEn ? "Applicant Full Name" : "৩। আবেদনকারীর নাম"}
            </label>
            <input
              type="text"
              value={getApplicantValue("person_name")}
              onChange={(e) => updateApplicant("person_name", e.target.value)}
              className={inputClass}
            />
          </div>
          <div className="flex flex-col gap-1">
            <label className="text-xs font-semibold text-slate-700 dark:text-slate-300">
              {isEn ? "Institution / Business Organization" : "প্রতিষ্ঠানের নাম (যদি থাকে)"}
            </label>
            <input
              type="text"
              value={data.nocOrganization || ""}
              onChange={(e) =>
                onChange({ ...data, nocOrganization: e.target.value })
              }
              className={inputClass}
              placeholder="উদাঃ কবিতা ডক্টর্স ল্যাব"
            />
          </div>
          <div className="grid grid-cols-2 gap-2.5">
            <div className="flex flex-col gap-1">
              <label className="text-xs font-semibold text-slate-700 dark:text-slate-300">
                {isEn ? "Father's Name" : "৪। পিতার নাম"}
              </label>
              <input
                type="text"
                value={getApplicantValue("father_name")}
                onChange={(e) => updateApplicant("father_name", e.target.value)}
                className={inputClass}
              />
            </div>
            <div className="flex flex-col gap-1">
              <label className="text-xs font-semibold text-slate-700 dark:text-slate-300">
                {isEn ? "Spouse Name (Optional)" : "স্বামীর নাম (ঐচ্ছিক)"}
              </label>
              <input
                type="text"
                value={getApplicantValue("spouse_name")}
                onChange={(e) => updateApplicant("spouse_name", e.target.value)}
                className={inputClass}
              />
            </div>
          </div>
          <div className="grid grid-cols-2 gap-2.5">
            <div className="flex flex-col gap-1">
              <label className="text-xs font-semibold text-slate-700 dark:text-slate-300">
                {isEn ? "Mother's Name" : "৫। মাতার নাম"}
              </label>
              <input
                type="text"
                value={getApplicantValue("mother_name")}
                onChange={(e) => updateApplicant("mother_name", e.target.value)}
                className={inputClass}
              />
            </div>
            <div className="flex flex-col gap-1">
              <label className="text-xs font-semibold text-slate-700 dark:text-slate-300">
                {isEn ? "NID No." : "৯। এনআইডি নং"}
              </label>
              <input
                type="text"
                value={getApplicantValue("nid_no")}
                onChange={(e) => updateApplicant("nid_no", e.target.value)}
                className={inputClass}
              />
            </div>
          </div>
          <div className="grid grid-cols-2 gap-2.5">
            <div className="flex flex-col gap-1">
              <label className="text-xs font-semibold text-slate-700 dark:text-slate-300">
                {isEn ? "Mobile No." : "১০। মোবাইল নং"}
              </label>
              <input
                type="text"
                value={getApplicantValue("mobile_no")}
                onChange={(e) => updateApplicant("mobile_no", e.target.value)}
                className={inputClass}
              />
            </div>
            <div className="flex flex-col gap-1">
              <label className="text-xs font-semibold text-slate-700 dark:text-slate-300">
                {isEn ? "Photo URL" : "ছবির URL"}
              </label>
              <input
                type="text"
                value={getApplicantValue("photo_url")}
                onChange={(e) => updateApplicant("photo_url", e.target.value)}
                className={inputClass}
                placeholder="/assets/image/person.jpg"
              />
            </div>
          </div>
        </div>

        {/* 4. NOC Subject & Purpose */}
        <div className="flex flex-col gap-3">
          <div className="flex items-center gap-2 text-xs font-bold text-emerald-600 dark:text-emerald-400 uppercase tracking-wider pb-1 border-b border-slate-200 dark:border-slate-800">
            <FileText className="w-4 h-4" />{" "}
            {isEn ? "NOC Subject & Purpose" : "অনাপত্তির বিবরণ ও বিষয়"}
          </div>
          <div className="flex flex-col gap-1">
            <label className="text-xs font-semibold text-slate-700 dark:text-slate-300">
              {isEn ? "1. Application Subject" : "১। আবেদনের বিষয়"}
            </label>
            <input
              type="text"
              value={
                isEn
                  ? data.nocSubjectEn || data.nocSubjectBn || ""
                  : data.nocSubjectBn || ""
              }
              onChange={(e) => {
                const key = isEn ? "nocSubjectEn" : "nocSubjectBn";
                onChange({ ...data, [key]: e.target.value });
              }}
              className={inputClass}
            />
          </div>
          <div className="flex flex-col gap-1">
            <label className="text-xs font-semibold text-slate-700 dark:text-slate-300">
              {isEn ? "2. Nature of NOC" : "২। অনাপত্তির ধরণ"}
            </label>
            <textarea
              rows={2}
              value={
                isEn
                  ? data.nocPurposeEn || data.nocPurposeBn || ""
                  : data.nocPurposeBn || ""
              }
              onChange={(e) => {
                const key = isEn ? "nocPurposeEn" : "nocPurposeBn";
                onChange({ ...data, [key]: e.target.value });
              }}
              className={`${inputClass} resize-none`}
            />
          </div>
          <div className="grid grid-cols-2 gap-2.5">
            <div className="flex flex-col gap-1">
              <label className="text-xs font-semibold text-slate-700 dark:text-slate-300">
                {isEn ? "6. Structure Location" : "৬। স্থাপনার স্থান"}
              </label>
              <input
                type="text"
                value={
                  isEn
                    ? data.nocPlaceEn || data.nocPlaceBn || ""
                    : data.nocPlaceBn || ""
                }
                onChange={(e) => {
                  const key = isEn ? "nocPlaceEn" : "nocPlaceBn";
                  onChange({ ...data, [key]: e.target.value });
                }}
                className={inputClass}
              />
            </div>
            <div className="flex flex-col gap-1">
              <label className="text-xs font-semibold text-slate-700 dark:text-slate-300">
                {isEn ? "Validity Expiry Date" : "মেয়াদ শেষের তারিখ"}
              </label>
              <input
                type="text"
                value={
                  isEn
                    ? data.expiresAtEn || data.expiresAtBn || ""
                    : data.expiresAtBn || ""
                }
                onChange={(e) => {
                  const key = isEn ? "expiresAtEn" : "expiresAtBn";
                  onChange({ ...data, [key]: e.target.value });
                }}
                className={inputClass}
              />
            </div>
          </div>
        </div>

        {/* 5. Schedule of Land (১১। তফসীল বিবরণী) */}
        <div className="flex flex-col gap-3">
          <div className="flex items-center gap-2 text-xs font-bold text-indigo-600 dark:text-indigo-400 uppercase tracking-wider pb-1 border-b border-slate-200 dark:border-slate-800">
            <Landmark className="w-4 h-4" />{" "}
            {isEn ? "11. Schedule of Land" : "১১। তফসীল বিবরণী (ভূমির তথ্য)"}
          </div>
          <div className="grid grid-cols-2 gap-2.5">
            <div className="flex flex-col gap-1">
              <label className="text-xs font-semibold text-slate-700 dark:text-slate-300">
                {isEn ? "Mouza Name" : "মৌজার নাম"}
              </label>
              <input
                type="text"
                value={data.mouzaName || ""}
                onChange={(e) =>
                  onChange({ ...data, mouzaName: e.target.value })
                }
                className={inputClass}
              />
            </div>
            <div className="flex flex-col gap-1">
              <label className="text-xs font-semibold text-slate-700 dark:text-slate-300">
                {isEn ? "Khatian No." : "খতিয়ান নং"}
              </label>
              <input
                type="text"
                value={data.khatianNo || ""}
                onChange={(e) =>
                  onChange({ ...data, khatianNo: e.target.value })
                }
                className={inputClass}
              />
            </div>
          </div>
          <div className="grid grid-cols-2 gap-2.5">
            <div className="flex flex-col gap-1">
              <label className="text-xs font-semibold text-slate-700 dark:text-slate-300">
                {isEn ? "Hal Dag No." : "হাল দাগ নং"}
              </label>
              <input
                type="text"
                value={data.halDagNo || ""}
                onChange={(e) =>
                  onChange({ ...data, halDagNo: e.target.value })
                }
                className={inputClass}
              />
            </div>
            <div className="flex flex-col gap-1">
              <label className="text-xs font-semibold text-slate-700 dark:text-slate-300">
                {isEn ? "Land Area (Decimals)" : "জমির পরিমাণ (শতক)"}
              </label>
              <input
                type="text"
                value={
                  isEn
                    ? data.landAreaEn || data.landAreaBn || ""
                    : data.landAreaBn || ""
                }
                onChange={(e) => {
                  const key = isEn ? "landAreaEn" : "landAreaBn";
                  onChange({ ...data, [key]: e.target.value });
                }}
                className={inputClass}
              />
            </div>
          </div>
        </div>

        {/* 6. Address Details */}
        <div className="flex flex-col gap-3">
          <div className="flex items-center gap-2 text-xs font-bold text-teal-600 dark:text-teal-400 uppercase tracking-wider pb-1 border-b border-slate-200 dark:border-slate-800">
            <MapPin className="w-4 h-4" />{" "}
            {isEn ? "Address Details" : "ঠিকানা বিবরণ"}
          </div>
          <div className="flex flex-col gap-1">
            <label className="text-xs font-semibold text-slate-700 dark:text-slate-300">
              {isEn ? "7. Permanent Address" : "৭। স্থায়ী ঠিকানা"}
            </label>
            <input
              type="text"
              value={
                isEn
                  ? data.permanentAddressEn || data.permanentAddressBn || ""
                  : data.permanentAddressBn || ""
              }
              onChange={(e) => {
                const key = isEn ? "permanentAddressEn" : "permanentAddressBn";
                onChange({ ...data, [key]: e.target.value });
              }}
              className={inputClass}
            />
          </div>
          <div className="flex flex-col gap-1">
            <label className="text-xs font-semibold text-slate-700 dark:text-slate-300">
              {isEn ? "8. Present Address" : "৮। বর্তমান ঠিকানা"}
            </label>
            <input
              type="text"
              value={
                isEn
                  ? data.presentAddressEn || data.presentAddressBn || ""
                  : data.presentAddressBn || ""
              }
              onChange={(e) => {
                const key = isEn ? "presentAddressEn" : "presentAddressBn";
                onChange({ ...data, [key]: e.target.value });
              }}
              className={inputClass}
            />
          </div>
          <div className="grid grid-cols-2 gap-2.5">
            <div className="flex flex-col gap-1">
              <label className="text-xs font-semibold text-slate-700 dark:text-slate-300">
                {isEn ? "Village" : "গ্রাম"}
              </label>
              <input
                type="text"
                value={getApplicantValue("village")}
                onChange={(e) => updateApplicant("village", e.target.value)}
                className={inputClass}
              />
            </div>
            <div className="flex flex-col gap-1">
              <label className="text-xs font-semibold text-slate-700 dark:text-slate-300">
                {isEn ? "Post Office" : "ডাকঘর"}
              </label>
              <input
                type="text"
                value={getApplicantValue("post_office")}
                onChange={(e) => updateApplicant("post_office", e.target.value)}
                className={inputClass}
              />
            </div>
          </div>
        </div>

        {/* 7. Fee & Financials */}
        <div className="flex flex-col gap-3">
          <div className="flex items-center gap-2 text-xs font-bold text-amber-600 dark:text-amber-400 uppercase tracking-wider pb-1 border-b border-slate-200 dark:border-slate-800">
            <Coins className="w-4 h-4" />{" "}
            {isEn ? "Fee & Acknowledgement" : "ফি ও আর্থিক রশিদ"}
          </div>
          <div className="flex flex-col gap-1">
            <label className="text-xs font-semibold text-slate-700 dark:text-slate-300">
              {isEn ? "Total Fee Amount (BDT)" : "মোট ফি (টাকা)"}
            </label>
            <input
              type="text"
              value={data.nocFeeAmount || ""}
              onChange={(e) =>
                onChange({ ...data, nocFeeAmount: e.target.value })
              }
              className={inputClass}
              placeholder="1000.00"
            />
          </div>
        </div>

        {/* 8. 3-Column Signatories */}
        <div className="flex flex-col gap-3">
          <div className="flex items-center gap-2 text-xs font-bold text-purple-600 dark:text-purple-400 uppercase tracking-wider pb-1 border-b border-slate-200 dark:border-slate-800">
            <PenTool className="w-4 h-4" />{" "}
            {isEn ? "Signatories Info (3 Officers)" : "স্বাক্ষরকারী কর্মকর্তাদের তথ্য"}
          </div>

          {/* Left Signatory */}
          <div className="p-3 bg-slate-50 dark:bg-slate-800/60 rounded-lg border border-slate-200 dark:border-slate-700/80 flex flex-col gap-2">
            <span className="text-[11px] font-bold text-purple-700 dark:text-purple-300">
              {isEn
                ? "1. Left Officer (Accounts Assistant)"
                : "১। বাম কর্মকর্তা (হিসাবসহকারী/প্রস্তুতকারী)"}
            </span>
            <div className="flex flex-col gap-1">
              <label className="text-xs font-semibold text-slate-700 dark:text-slate-300">
                {isEn ? "Name / Title" : "কর্মকর্তার নাম / পদবি"}
              </label>
              <input
                type="text"
                value={
                  isEn
                    ? data.leftSignatoryNameEn || data.leftSignatoryNameBn || ""
                    : data.leftSignatoryNameBn || ""
                }
                onChange={(e) => {
                  const key = isEn
                    ? "leftSignatoryNameEn"
                    : "leftSignatoryNameBn";
                  onChange({ ...data, [key]: e.target.value });
                }}
                className={inputClass}
              />
            </div>
            <div className="flex flex-col gap-1">
              <label className="text-xs font-semibold text-slate-700 dark:text-slate-300">
                {isEn ? "Office / Role" : "দপ্তর / পরিষদ"}
              </label>
              <input
                type="text"
                value={
                  isEn
                    ? data.leftSignatoryRoleEn || data.leftSignatoryRoleBn || ""
                    : data.leftSignatoryRoleBn || ""
                }
                onChange={(e) => {
                  const key = isEn
                    ? "leftSignatoryRoleEn"
                    : "leftSignatoryRoleBn";
                  onChange({ ...data, [key]: e.target.value });
                }}
                className={inputClass}
              />
            </div>
          </div>

          {/* Middle Signatory */}
          <div className="p-3 bg-slate-50 dark:bg-slate-800/60 rounded-lg border border-slate-200 dark:border-slate-700/80 flex flex-col gap-2">
            <span className="text-[11px] font-bold text-purple-700 dark:text-purple-300">
              {isEn
                ? "2. Middle Officer (Administrative Officer / Secretary)"
                : "২। মধ্য কর্মকর্তা (প্রশাসনিক কর্মকর্তা / সচিব)"}
            </span>
            <div className="flex flex-col gap-1">
              <label className="text-xs font-semibold text-slate-700 dark:text-slate-300">
                {isEn ? "Name" : "কর্মকর্তার নাম"}
              </label>
              <input
                type="text"
                value={
                  isEn
                    ? data.middleSignatoryNameEn ||
                      data.middleSignatoryNameBn ||
                      ""
                    : data.middleSignatoryNameBn || ""
                }
                onChange={(e) => {
                  const key = isEn
                    ? "middleSignatoryNameEn"
                    : "middleSignatoryNameBn";
                  onChange({ ...data, [key]: e.target.value });
                }}
                className={inputClass}
              />
            </div>
            <div className="flex flex-col gap-1">
              <label className="text-xs font-semibold text-slate-700 dark:text-slate-300">
                {isEn ? "Role / Designation" : "পদবি"}
              </label>
              <input
                type="text"
                value={
                  isEn
                    ? data.middleSignatoryRoleEn ||
                      data.middleSignatoryRoleBn ||
                      ""
                    : data.middleSignatoryRoleBn || ""
                }
                onChange={(e) => {
                  const key = isEn
                    ? "middleSignatoryRoleEn"
                    : "middleSignatoryRoleBn";
                  onChange({ ...data, [key]: e.target.value });
                }}
                className={inputClass}
              />
            </div>
          </div>

          {/* Right Signatory (Chairman) */}
          <div className="p-3 bg-slate-50 dark:bg-slate-800/60 rounded-lg border border-slate-200 dark:border-slate-700/80 flex flex-col gap-2">
            <span className="text-[11px] font-bold text-purple-700 dark:text-purple-300">
              {isEn
                ? "3. Right Officer (Chairman)"
                : "৩। ডান কর্মকর্তা (চেয়ারম্যান)"}
            </span>
            <div className="flex flex-col gap-1">
              <label className="text-xs font-semibold text-slate-700 dark:text-slate-300">
                {isEn ? "Chairman Name" : "চেয়ারম্যানের নাম"}
              </label>
              <input
                type="text"
                value={
                  isEn
                    ? data.signatory.signatory_name_en ||
                      data.signatory.signatory_name
                    : data.signatory.signatory_name
                }
                onChange={(e) =>
                  updateSignatory("signatory_name", e.target.value)
                }
                className={inputClass}
              />
            </div>
            <div className="flex flex-col gap-1">
              <label className="text-xs font-semibold text-slate-700 dark:text-slate-300">
                {isEn ? "Role / Designation" : "পদবি"}
              </label>
              <input
                type="text"
                value={
                  isEn
                    ? data.signatory.signatory_role_en ||
                      data.signatory.signatory_role
                    : data.signatory.signatory_role
                }
                onChange={(e) =>
                  updateSignatory("signatory_role", e.target.value)
                }
                className={inputClass}
              />
            </div>
            <div className="flex flex-col gap-1">
              <label className="text-xs font-semibold text-slate-700 dark:text-slate-300">
                {isEn ? "TRN No." : "টিআরএন নং"}
              </label>
              <input
                type="text"
                value={data.signatory.trn_no || ""}
                onChange={(e) => updateSignatory("trn_no", e.target.value)}
                className={inputClass}
              />
            </div>
          </div>
        </div>
      </div>
    </aside>
  );
}
