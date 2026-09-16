"use client";

import React from "react";
import { CertificateData } from "@/types/certificate";
import { X, RotateCcw, Building2, FileText, User, PenTool, Info, Sparkles, Globe } from "lucide-react";

interface VoterTransferFormProps {
  data: CertificateData;
  onChange: (updated: CertificateData) => void;
  onReset: () => void;
  isOpen: boolean;
  onClose: () => void;
  lang?: "bn" | "en";
  onLangChange?: (lang: "bn" | "en") => void;
}

export function VoterTransferForm({
  data,
  onChange,
  onReset,
  isOpen,
  onClose,
  lang = "bn",
  onLangChange,
}: VoterTransferFormProps) {
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
    return isEn ? (data.applicant[`${field}_en` as keyof typeof data.applicant] as string || data.applicant[field] as string || "") : (data.applicant[field] as string || "");
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
      closingWishBn: closingBn || "আমি তার ভবিষ্যৎ জীবনের সর্বাঙ্গীন মঙ্গল কামনা করি।",
      closingWishEn: closingEn || "I wish him/her all success and prosperity in future life."
    });
  };

  const inputClass = "px-3 py-2 bg-slate-50 dark:bg-slate-800/90 border border-slate-300 dark:border-slate-700 rounded-lg text-sm text-slate-900 dark:text-slate-100 outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500/80 transition-colors";

  return (
    <aside className="no-print edit-drawer w-full sm:w-[420px] bg-white dark:bg-slate-900 border-r border-slate-200 dark:border-slate-800 text-slate-900 dark:text-slate-100 shadow-2xl h-[calc(100vh-62px)] overflow-y-auto sticky top-[62px] z-[500] flex flex-col font-siliguri transition-colors duration-200">
      <div className="px-5 py-4 bg-slate-50 dark:bg-slate-950/80 border-b border-slate-200 dark:border-slate-800 flex justify-between items-center sticky top-0 z-10 backdrop-blur-md">
        <div className="flex items-center gap-2">
          <div className="p-1.5 rounded-lg bg-blue-500/10 dark:bg-blue-500/20 text-blue-600 dark:text-blue-400">
            <PenTool className="w-4 h-4" />
          </div>
          <div>
            <h3 className="text-base font-bold text-slate-900 dark:text-slate-100 leading-none">
              {isEn ? "Voter Transfer Editor" : "ভোটার স্থানান্তর লাইভ এডিটর"}
            </h3>
            <span className="text-[11px] text-slate-500 dark:text-slate-400">
              {isEn ? "Voter Area Transfer Certificate" : "ভোটার এলাকা স্থানান্তর প্রত্যয়ন"}
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
            <Globe className="w-4 h-4 text-blue-600 dark:text-blue-400" />
            <span>{isEn ? "Language Mode:" : "সনদের ভাষা সিলেক্ট করুন:"}</span>
          </div>
          <div className="flex items-center p-0.5 bg-slate-200 dark:bg-slate-900 rounded-lg border border-slate-300 dark:border-slate-700 text-xs font-bold">
            <button
              onClick={() => onLangChange?.("bn")}
              className={`px-3 py-1 rounded-md transition-all ${
                !isEn
                  ? "bg-blue-600 text-white shadow-sm"
                  : "text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white"
              }`}
            >
              🇧🇩 বাংলা
            </button>
            <button
              onClick={() => onLangChange?.("en")}
              className={`px-3 py-1 rounded-md transition-all ${
                isEn
                  ? "bg-blue-600 text-white shadow-sm"
                  : "text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white"
              }`}
            >
              🇬🇧 English
            </button>
          </div>
        </div>

        {/* Templates Quick Selector */}
        <div className="flex flex-col gap-2 p-3 bg-blue-500/5 dark:bg-blue-500/10 border border-blue-500/20 rounded-xl">
          <div className="flex items-center gap-1.5 text-xs font-bold text-blue-600 dark:text-blue-400 uppercase tracking-wider">
            <Sparkles className="w-4 h-4" /> {isEn ? "Quick Transfer Templates" : "দ্রুত স্থানান্তর টেমপ্লেট"}
          </div>
          <div className="grid grid-cols-1 gap-1.5 mt-1">
            <button
              onClick={() => applyTemplate(
                "ভোটার এলাকা স্থানান্তর প্রত্যয়ন",
                "তিনি সমাজ বা রাষ্ট্রবিরোধী কোন কার্যকলাপের সহিত জড়িত নন। তিনি ইতিপূর্বে অন্য এলাকায় বসবাস ও পূর্বে স্বামীর সহিত অবস্থান করার কারণে উক্ত স্থানে ভোটার হয়েছিলেন। বর্তমানে তার বিবাহ বিচ্ছেদ হয়েছে এবং পুনঃরায় বিবাহ হয়েছে তাই নতুন স্বামীর স্থায়ী ঠিকানায় অত্র ইউনিয়নের ০৮নং ওয়ার্ডভুক্ত রঘুনাথপুর গ্রামে ভোটার স্থানান্তর করবার জন্য সুপারিশ করা হলো।",
                "Voter Area Transfer Certificate",
                "She is not involved in any anti-social or anti-state activities. Previously, she was enrolled as a voter in another area while residing with her former husband. Due to her divorce and subsequent remarriage, it is hereby recommended to transfer her voter registration to her new husband's permanent address at Village: Raghunathpur, Ward No: 08 of this Union Parishad.",
                "আমি তার ভবিষ্যৎ জীবনের সর্বাঙ্গীন মঙ্গল কামনা করি।",
                "I wish her all success and prosperity in her future life."
              )}
              className="text-[11px] text-left p-2 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg hover:border-blue-500 transition-colors font-semibold"
            >
              {isEn ? "1. Remarriage / Husband's Address Transfer" : "১. পুনর্বিবাহ / স্বামীর ঠিকানায় ভোটার স্থানান্তর"}
            </button>
            <button
              onClick={() => applyTemplate(
                "ভোটার এলাকা স্থানান্তর প্রত্যয়ন",
                "তিনি সমাজ বা রাষ্ট্রবিরোধী কোন কার্যকলাপের সহিত জড়িত নন। তিনি ইতিপূর্বে অন্য এলাকায় বসবাসকালীন সময়ে উক্ত স্থানে ভোটার হয়েছিলেন। বর্তমানে তিনি অত্র ইউনিয়নে জমি ও বাড়ি ক্রয় করে সপরিবারে স্থায়ীভাবে বসবাস করছেন। তাই তার ভোটার এলাকা অত্র ইউনিয়নের স্থায়ী ঠিকানায় স্থানান্তর করার জন্য সুপারিশ করা হলো।",
                "Voter Area Transfer Certificate",
                "He/She is not involved in any anti-social or anti-state activities. He/She was previously registered as a voter in another locality while residing there. Currently, he/she has purchased land/house and has been residing permanently with family in this Union Parishad. Therefore, it is recommended to transfer his/her voter area to this permanent address.",
                "আমি তার ভবিষ্যৎ জীবনের সর্বাঙ্গীন মঙ্গল কামনা করি।",
                "I wish him/her all success and prosperity in future life."
              )}
              className="text-[11px] text-left p-2 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg hover:border-blue-500 transition-colors font-semibold"
            >
              {isEn ? "2. Permanent Residence / Land Purchase Transfer" : "২. জমি/বাড়ি ক্রয় করে স্থায়ী বসবাসের কারণে স্থানান্তর"}
            </button>
            <button
              onClick={() => applyTemplate(
                "ভোটার এলাকা স্থানান্তর প্রত্যয়ন",
                "তিনি এ ইউনিয়নের স্থায়ী বাসিন্দা এবং সমাজ বা রাষ্ট্রবিরোধী কোনো কাজে জড়িত নন। তিনি পূর্বে অন্যত্র বসবাস করার কারণে সেখানে ভোটার হয়েছিলেন। বর্তমানে তিনি অত্র ঠিকানায় স্থায়ীভাবে বসবাস করছেন বিধায় ভোটার এলাকা অত্র ইউনিয়নে স্থানান্তর করার জন্য সুপারিশ করা হলো।",
                "Voter Area Transfer Certificate",
                "He/She is a permanent resident of this Union Parishad and bears a good moral character. Having previously resided in another area, he/she was enrolled as a voter there. As he/she is currently residing permanently at this address, it is hereby recommended to transfer his/her voter area to this Union.",
                "আমি তার সার্বিক কল্যাণ ও ভবিষ্যৎ মঙ্গল কামনা করি।",
                "I wish him/her all success and prosperity."
              )}
              className="text-[11px] text-left p-2 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg hover:border-blue-500 transition-colors font-semibold"
            >
              {isEn ? "3. General Voter Transfer Recommendation" : "৩. সাধারণ ভোটার স্থানান্তর প্রত্যয়ন (সংক্ষিপ্ত)"}
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
              <input
                type="text"
                value={getApplicantValue("nid_no")}
                onChange={(e) => updateApplicant("nid_no", e.target.value)}
                className={inputClass}
                placeholder="19951812311000255"
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
                placeholder="/assets/image/person.webp"
              />
            </div>
          </div>
          <div className="grid grid-cols-2 gap-2.5">
            <div className="flex flex-col gap-1">
              <label className="text-xs font-semibold text-slate-700 dark:text-slate-300">
                {isEn ? "Spouse's Name" : "স্বামীর/স্ত্রীর নাম"}
              </label>
              <input type="text" value={getApplicantValue("spouse_name")} onChange={(e) => updateApplicant("spouse_name", e.target.value)} className={inputClass} />
            </div>
            <div className="flex flex-col gap-1">
              <label className="text-xs font-semibold text-slate-700 dark:text-slate-300">
                {isEn ? "Father's Name" : "পিতার নাম"}
              </label>
              <input type="text" value={getApplicantValue("father_name")} onChange={(e) => updateApplicant("father_name", e.target.value)} className={inputClass} />
            </div>
          </div>
          <div className="flex flex-col gap-1">
            <label className="text-xs font-semibold text-slate-700 dark:text-slate-300">
              {isEn ? "Mother's Name" : "মাতার নাম"}
            </label>
            <input type="text" value={getApplicantValue("mother_name")} onChange={(e) => updateApplicant("mother_name", e.target.value)} className={inputClass} />
          </div>
          <div className="grid grid-cols-2 gap-2.5">
            <div className="flex flex-col gap-1">
              <label className="text-xs font-semibold text-slate-700 dark:text-slate-300">
                {isEn ? "Village" : "গ্রাম"}
              </label>
              <input type="text" value={getApplicantValue("village")} onChange={(e) => updateApplicant("village", e.target.value)} className={inputClass} />
            </div>
            <div className="flex flex-col gap-1">
              <label className="text-xs font-semibold text-slate-700 dark:text-slate-300">
                {isEn ? "Ward No." : "ওয়ার্ড নং"}
              </label>
              <input type="text" value={getApplicantValue("ward_no")} onChange={(e) => updateApplicant("ward_no", e.target.value)} className={inputClass} />
            </div>
          </div>
          <div className="grid grid-cols-2 gap-2.5">
            <div className="flex flex-col gap-1">
              <label className="text-xs font-semibold text-slate-700 dark:text-slate-300">
                {isEn ? "Post Office" : "ডাকঘর"}
              </label>
              <input type="text" value={getApplicantValue("post_office")} onChange={(e) => updateApplicant("post_office", e.target.value)} className={inputClass} />
            </div>
            <div className="flex flex-col gap-1">
              <label className="text-xs font-semibold text-slate-700 dark:text-slate-300">
                {isEn ? "House No." : "বাসা নং"}
              </label>
              <input type="text" value={getApplicantValue("house_no")} onChange={(e) => updateApplicant("house_no", e.target.value)} className={inputClass} />
            </div>
          </div>
        </div>

        {/* Dynamic Content */}
        <div className="flex flex-col gap-3">
          <div className="flex items-center gap-2 text-xs font-bold text-indigo-600 dark:text-indigo-400 uppercase tracking-wider pb-1 border-b border-slate-200 dark:border-slate-800">
            <FileText className="w-4 h-4" /> {isEn ? "Transfer Description & Recommendation" : "স্থানান্তর বিবরণ ও সুপারিশ"}
          </div>
          <div className="flex flex-col gap-1">
            <label className="text-xs font-semibold text-slate-700 dark:text-slate-300">
              {isEn ? "Transfer Description / Recommendation Text" : "স্থানান্তর বিবরণ ও সুপারিশ (Custom Text)"}
            </label>
            <textarea
              value={isEn ? (data.customDescriptionEn || data.customDescriptionBn || "") : (data.customDescriptionBn || "")}
              onChange={(e) => {
                const key = isEn ? "customDescriptionEn" : "customDescriptionBn";
                onChange({ ...data, [key]: e.target.value });
              }}
              className={`${inputClass} h-32 leading-relaxed`}
              placeholder={isEn ? "Enter transfer reason and recommendation..." : "স্থানান্তরের কারণ ও সুপারিশের বিবরণ লিখুন..."}
            />
          </div>
          <div className="flex flex-col gap-1">
            <label className="text-xs font-semibold text-slate-700 dark:text-slate-300">
              {isEn ? "Closing Wish" : "শেষ শুভেচ্ছা বার্তা (Closing Wish)"}
            </label>
            <input
              type="text"
              value={isEn ? (data.closingWishEn || "I wish him/her all success and prosperity in future life.") : (data.closingWishBn || "আমি তার ভবিষ্যৎ জীবনের সর্বাঙ্গীন মঙ্গল কামনা করি।")}
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
