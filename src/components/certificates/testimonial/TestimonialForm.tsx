"use client";

import React from "react";
import { CertificateData } from "@/types/certificate";
import { X, RotateCcw, Building2, FileText, User, MapPin, PenTool, Info, Sparkles, Globe } from "lucide-react";

interface TestimonialFormProps {
  data: CertificateData;
  onChange: (updated: CertificateData) => void;
  onReset: () => void;
  isOpen: boolean;
  onClose: () => void;
  lang?: "bn" | "en";
  onLangChange?: (lang: "bn" | "en") => void;
}

export function TestimonialForm({
  data,
  onChange,
  onReset,
  isOpen,
  onClose,
  lang = "bn",
  onLangChange,
}: TestimonialFormProps) {
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

  const applyTemplate = (titleBn: string, descBn: string, titleEn: string, descEn: string, closingBn?: string, closingEn?: string) => {
    onChange({
      ...data,
      meta: { ...data.meta, cert_title: titleBn, cert_title_en: titleEn },
      customDescriptionBn: descBn,
      customDescriptionEn: descEn,
      closingWishBn: closingBn || "আমি তার সার্বিক কল্যাণ ও উন্নতি কামনা করি।",
      closingWishEn: closingEn || "I wish him/her all success and prosperity in life."
    });
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
              {isEn ? "Testimonial Live Editor" : "প্রত্যয়নপত্রের লাইভ এডিটর"}
            </h3>
            <span className="text-[11px] text-slate-500 dark:text-slate-400">
              {isEn ? "Create Any Testimonial Certificate" : "যে কোন প্রত্যয়ন তৈরি করুন"}
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

        {/* Templates Quick Selector */}
        <div className="flex flex-col gap-2 p-3 bg-emerald-500/5 dark:bg-emerald-500/10 border border-emerald-500/20 rounded-xl">
          <div className="flex items-center gap-1.5 text-xs font-bold text-emerald-600 dark:text-emerald-400 uppercase tracking-wider">
            <Sparkles className="w-4 h-4" /> {isEn ? "Quick Templates Selector" : "দ্রুত টেমপ্লেট সিলেক্ট করুন"}
          </div>
          <div className="grid grid-cols-2 gap-1.5 mt-1">
            <button
              onClick={() => applyTemplate(
                "ভোটার স্থানান্তর প্রত্যয়ন",
                "তিনি বিগত দিনে মৌজা/মহল্লাঃ মধুপুর, ডাকঘরঃ নারুয়া-7730, বালিয়াকান্দি, রাজবাড়ী স্থায়ীভাবে বসবাস করতেন। বর্তমানে তিনি অত্র ইউনিয়নের ০1 নং ওয়ার্ডের গ্রামঃ গাবলা, ডাকঘরঃ উদয়পুর-৭৮০০, উপজেলাঃ রাজবাড়ী সদর, জেলাঃ রাজবাড়ী- স্থায়ীভাবে বসবাস করছেন। তিনি অত্র ঠিকানায় ভোটার স্থানান্তর করতে ইচ্ছুক। আমার জানা মতে তার নৈতিক চরিত্র ভালো।",
                "Voter Transfer Testimonial",
                "He/She previously resided permanently at Mauza/Mahalla: Madhupur, Post Office: Naruwa-7730, Baliakandi, Rajbari. Currently he/she resides permanently at Ward No: 01, Village: Gabla, Post Office: Udaypur-7800, Upazila: Rajbari Sadar, District: Rajbari of this Union. He/She wishes to transfer voter registration to this present address. To the best of my knowledge, he/she bears a good moral character."
              )}
              className="text-[11px] text-left p-2 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg hover:border-emerald-500 transition-colors font-semibold"
            >
              {isEn ? "1. Voter Transfer" : "১. ভোটার স্থানান্তর"}
            </button>
            <button
              onClick={() => applyTemplate(
                "স্বামীর বাড়িতে বসবাস",
                "তিনি ইতিপূর্বে পিতার বাড়িতে বসবাস করতেন। বর্তমানে তিনি অত্র ইউনিয়নের ০৫ নং ওয়ার্ডের রাজাপুর গ্রামে স্বামীর বাড়িতে স্থায়ীভাবে বসবাস করছেন। আমার জানা মতে তার নৈতিক চরিত্র ভালো।",
                "Residing at Husband's House",
                "She previously resided at her father's house. Currently she resides permanently at her husband's house at Village: Rajapur, Ward No: 05 of this Union Parishad. To the best of my knowledge, she bears a good moral character.",
                "আমি তার সার্বিক কল্যাণ ও উন্নতি কামনা করি।",
                "I wish her all success and prosperity in life."
              )}
              className="text-[11px] text-left p-2 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg hover:border-emerald-500 transition-colors font-semibold"
            >
              {isEn ? "2. Husband's Residence" : "২. স্বামীর বাড়িতে বসবাস"}
            </button>
            <button
              onClick={() => applyTemplate(
                "জাতীয় পরিচয়পত্র সংশোধন প্রত্যয়ন",
                "আমি তাকে ব্যক্তিগতভাবে চিনি ও জানি। তার জাতীয় পরিচয়পত্রে ভূলবশত পিতার নাম এসেছে সাগর আলী শেখ, অপরদিকে তার জন্ম নিবন্ধনে পিতার নাম এবং পিতার জাতীয় পরিচয়পত্রে নাম দেওয়া আছে মোঃ ইসমাইল মোল্লা, যা তার পিতার সঠিক নাম। এমতাবস্থায় তার জাতীয় পরিচয়পত্রের পিতার নাম তার জন্ম নিবন্ধন অনুযায়ী সংশোধন যোগ্য।",
                "NID Correction Testimonial",
                "He/She is personally known to me. In his/her NID card, his/her father's name was mistakenly recorded as Sagar Ali Sheikh, whereas in his/her Birth Certificate and his/her father's NID card it is recorded as Md. Ismail Molla which is the correct father's name. Therefore, his/her father's name in NID is correctable as per Birth Certificate."
              )}
              className="text-[11px] text-left p-2 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg hover:border-emerald-500 transition-colors font-semibold"
            >
              {isEn ? "3. NID Correction" : "৩. NID তথ্য সংশোধন"}
            </button>
            <button
              onClick={() => applyTemplate(
                "নতুন ভোটার নিবন্ধনের প্রত্যয়ন",
                "তিনি ইতিপূর্বে ভোটার নিবন্ধনের সময় এলাকায় না থাকার কারনে ভোটার নিবন্ধন করতে ব্যর্থ হয়। বর্তমানে তিনি নতুন ভোটার হতে ইচ্ছুক। আমার জানা মতে তার নৈতিক চরিত্র ভালো।",
                "New Voter Registration Testimonial",
                "He/She was unable to register as a voter previously due to absence from the area during voter enrollment. Currently he/she wishes to enroll as a new voter. To the best of my knowledge, he/she bears a good moral character.",
                "আমি তার সার্বিক কল্যাণ ও উন্নতি কামনা করি।",
                "I wish him/her all success and prosperity in life."
              )}
              className="text-[11px] text-left p-2 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg hover:border-emerald-500 transition-colors font-semibold"
            >
              {isEn ? "4. New Voter Registration" : "৪. নতুন ভোটার নিবন্ধন"}
            </button>
          </div>
        </div>

        {/* Union Info */}
        <div className="flex flex-col gap-3">
          <div className="flex items-center gap-2 text-xs font-bold text-slate-600 dark:text-slate-400 uppercase tracking-wider pb-1 border-b border-slate-200 dark:border-slate-800">
            <Building2 className="w-4 h-4" /> {isEn ? "Union Parishad Details" : "পরিষদের তথ্য"}
          </div>
          <div className="flex flex-col gap-1">
            <label className="text-xs font-semibold text-slate-700 dark:text-slate-300">
              {isEn ? "Union Parishad Name" : "ইউনিয়ন পরিষদ"}
            </label>
            <input type="text" value={getUnionValue("up_name")} onChange={(e) => updateUnion("up_name", e.target.value)} className={inputClass} />
          </div>
        </div>

        {/* Certificate Meta */}
        <div className="flex flex-col gap-3">
          <div className="flex items-center gap-2 text-xs font-bold text-blue-600 dark:text-blue-400 uppercase tracking-wider pb-1 border-b border-slate-200 dark:border-slate-800">
            <FileText className="w-4 h-4" /> {isEn ? "Certificate Metadata" : "সনদের বিবরণ"}
          </div>
          <div className="flex flex-col gap-1">
            <label className="text-xs font-semibold text-slate-700 dark:text-slate-300">
              {isEn ? "Certificate Title" : "প্রত্যয়নের শিরোনাম (Title)"}
            </label>
            <input type="text" value={getMetaValue("cert_title")} onChange={(e) => updateMeta("cert_title", e.target.value)} className={inputClass} />
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

        {/* Applicant Details */}
        <div className="flex flex-col gap-3">
          <div className="flex items-center gap-2 text-xs font-bold text-amber-600 dark:text-amber-400 uppercase tracking-wider pb-1 border-b border-slate-200 dark:border-slate-800">
            <User className="w-4 h-4" /> {isEn ? "Applicant Details" : "নাগরিকের তথ্য"}
          </div>
          <div className="flex flex-col gap-1">
            <label className="text-xs font-semibold text-slate-700 dark:text-slate-300">
              {isEn ? "Full Name" : "নাম"}
            </label>
            <input type="text" value={getApplicantValue("person_name")} onChange={(e) => updateApplicant("person_name", e.target.value)} className={inputClass} />
          </div>
          <div className="grid grid-cols-2 gap-2.5">
            <div className="flex flex-col gap-1">
              <label className="text-xs font-semibold text-slate-700 dark:text-slate-300">
                {isEn ? "NID / ID No." : "এনআইডি/আইডি নং"}
              </label>
              <input type="text" value={getApplicantValue("nid_no")} onChange={(e) => updateApplicant("nid_no", e.target.value)} className={inputClass} />
            </div>
            <div className="flex flex-col gap-1">
              <label className="text-xs font-semibold text-slate-700 dark:text-slate-300">
                {isEn ? "Photo URL" : "ছবির URL"}
              </label>
              <input type="text" value={getApplicantValue("photo_url")} onChange={(e) => updateApplicant("photo_url", e.target.value)} className={inputClass} placeholder="/assets/image/person.webp" />
            </div>
          </div>
          <div className="grid grid-cols-2 gap-2.5">
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
        </div>

        {/* Dynamic Content */}
        <div className="flex flex-col gap-3">
          <div className="flex items-center gap-2 text-xs font-bold text-indigo-600 dark:text-indigo-400 uppercase tracking-wider pb-1 border-b border-slate-200 dark:border-slate-800">
            <FileText className="w-4 h-4" /> {isEn ? "Dynamic Description & Closing Wish" : "ডাইনামিক প্রত্যয়ন বিবরণ ও শেষ বার্তা"}
          </div>
          <div className="flex flex-col gap-1">
            <label className="text-xs font-semibold text-slate-700 dark:text-slate-300">
              {isEn ? "Custom Description Text" : "মূল প্রত্যয়ন বিবরণ (Custom Text)"}
            </label>
            <textarea
              value={isEn ? (data.customDescriptionEn || data.customDescriptionBn || "") : (data.customDescriptionBn || "")}
              onChange={(e) => {
                const key = isEn ? "customDescriptionEn" : "customDescriptionBn";
                onChange({ ...data, [key]: e.target.value });
              }}
              className={`${inputClass} h-32 leading-relaxed`}
              placeholder={isEn ? "Enter any custom description text..." : "এখানে যে কোন কাস্টম প্রত্যয়ন বিবরণ লিখুন..."}
            />
          </div>
          <div className="flex flex-col gap-1">
            <label className="text-xs font-semibold text-slate-700 dark:text-slate-300">
              {isEn ? "Closing Wish" : "শেষ শুভেচ্ছা বার্তা (Closing Wish)"}
            </label>
            <input
              type="text"
              value={isEn ? (data.closingWishEn || "I wish him/her all success and prosperity in life.") : (data.closingWishBn || "আমি তার সার্বিক কল্যাণ ও উন্নতি কামনা করি।")}
              onChange={(e) => {
                const key = isEn ? "closingWishEn" : "closingWishBn";
                onChange({ ...data, [key]: e.target.value });
              }}
              className={inputClass}
            />
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
